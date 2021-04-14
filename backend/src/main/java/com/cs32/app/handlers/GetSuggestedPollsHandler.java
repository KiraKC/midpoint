package com.cs32.app.handlers;

import com.cs32.app.CategoryPoints;
import com.cs32.app.Constants;
import com.cs32.app.User;
import com.cs32.app.algorithm.ClickRateComparator;
import com.cs32.app.algorithm.RelevancyComparator;
import com.cs32.app.database.Connection;
import com.cs32.app.poll.Poll;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;
import spark.Route;
import org.json.JSONObject;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;
import java.util.Collections;

/**
 * The handle which is responsible for:
 * - sending a list of suggested polls to the frontend.
 *
 * Our suggestion algorithm works as follows. We randomly draw polls from the database,
 * and generate three batches of polls: a batch of polls with highest relevancy, a batch
 * of poll with highest click rate (the trendy ones), and a batch of completely random
 * polls. The ratio of the three batches is .75: .2: .05. We then mix the three batches
 * of polls together and send them to the frontend. As a result, a user will have a poll
 * feed containing mostly the ones they are interested in, plus some trendy ones, plus
 * a few random ones so that their feed won't get monotonous.
 */
public class GetSuggestedPollsHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();
  private final Connection myConnection;

  public GetSuggestedPollsHandler(Connection connection) {
    myConnection = connection;
  }

  /**
   * The handle() method that does the job above.
   * @param request a Json object containing the user ID and number of poll to render
   * @param response doesn't matter
   * @return a Json object of suggested polls
   * @throws Exception exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> variables = new HashMap<>();
    int numPollsRequested;

    boolean status;
    List<Poll> pollsToSend = new ArrayList<>();

    try {
      // Parse request
      JSONObject jsonReqObject = new JSONObject(request.body());
      numPollsRequested = jsonReqObject.getInt("numPollsRequested");

      // Seen polls
      Set<String> seenPollIds = new HashSet<>();
      JSONArray jsonSeenPollsArray = jsonReqObject.getJSONArray("seenPollIds");
      for (int i = 0; i < jsonSeenPollsArray.length(); i++) {
        seenPollIds.add(jsonSeenPollsArray.getString(i));
      }

      boolean loggedIn = jsonReqObject.getString("loggedIn").equals("true");

      // query for user and get their category points + answered polls
      CategoryPoints userCatPts;
      Set<String> pollsToExclude = new HashSet<>(seenPollIds);
      if (loggedIn) {
        String userIdToken = jsonReqObject.getString("userIdToken");
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
        String userId = decodedToken.getUid();
        User user = myConnection.getUserById(userId);
        userCatPts = user.getCategoryPoints();
        System.out.println("USER ANSWERED POLLS: ");
        System.out.println(user.getAnsweredPolls().getSet());
        pollsToExclude.addAll(user.getAnsweredPolls().getSet());
      } else {
        userCatPts = new CategoryPoints(Arrays.asList(Constants.ALL_CATEGORIES));
      }

      // Query for random polls
      List<Poll> randomPolls = new ArrayList<>();
      int previousQuerySize = 1;
      while (randomPolls.size() < numPollsRequested * Constants.NUM_QUERIED_POLLS_PER_REQUESTED
          && previousQuerySize != 0) {
        List<Poll> newPolls = myConnection.getRandomPolls(numPollsRequested
            * Constants.NUM_QUERIED_POLLS_PER_REQUESTED);
        for (int i = 0; i < newPolls.size(); i++) {
          System.out.println("considering poll: " + newPolls.get(i).getId());
          if (pollsToExclude.contains(newPolls.get(i).getId())) {
            System.out.println("removed poll");
            pollsToExclude.add(newPolls.get(i).getId());
            newPolls.remove(i);
            i--;
          } else {
            pollsToExclude.add(newPolls.get(i).getId());
          }
        }
        previousQuerySize = newPolls.size();
        randomPolls.addAll(newPolls);
      }

      // adjusted num requested in case numRequested > randomPolls.size()
      int adjustedNumRequested = Math.min(numPollsRequested, randomPolls.size());


      int numRelevancyIndex = (int) Math.floor(randomPolls.size()
          * Constants.QUERY_RAND_POLLS_RELEVANCY_PORTION);
      int numClickRateIndex = numRelevancyIndex + (int) Math.floor(randomPolls.size()
          * Constants.QUERY_RAND_POLLS_CLICK_RATE_PORTION);
      int numRandomIndex = randomPolls.size();

      List<Poll> relevancyBatch = randomPolls.subList(0, numRelevancyIndex);
      List<Poll> clickRateBatch = randomPolls.subList(numRelevancyIndex, numClickRateIndex);
      List<Poll> randomBatch = randomPolls.subList(numClickRateIndex, numRandomIndex);

      // Get polls with highest relevancy from the first batch
      int numFromRelevancyBatch = (int) Math.floor(adjustedNumRequested
          * Constants.QUERY_RAND_POLLS_RELEVANCY_PORTION);
      Collections.sort(relevancyBatch, new RelevancyComparator(userCatPts));
      List<Poll> byRelevancy = relevancyBatch.subList(0, numFromRelevancyBatch);

      // Get polls with highest click rate from the second batch
      int numFromClickRateBatch = (int) Math.floor(adjustedNumRequested
          * Constants.QUERY_RAND_POLLS_CLICK_RATE_PORTION);
      Collections.sort(clickRateBatch, new ClickRateComparator());
      List<Poll> byClickRate = clickRateBatch.subList(0, numFromClickRateBatch);

      // Get polls randomly from the third batch
      int numFromRandomBatch = adjustedNumRequested - numFromRelevancyBatch - numFromClickRateBatch;
      List<Poll> byRandom = randomBatch.subList(0, numFromRandomBatch);

      // Put the three sets of polls together and shuffle them
      pollsToSend.addAll(byRelevancy);
      pollsToSend.addAll(byClickRate);
      pollsToSend.addAll(byRandom);
      Collections.shuffle(pollsToSend);

      // Return the polls to the frontend as a JSON
      variables.put("suggestedPolls", pollsToSend);

      // Update the polls' num of renders and update polls in MongoDB
      if (loggedIn) {
        for (Poll poll : pollsToSend) {
          // TODO: update poll's number of renders in MongoDB
          poll.rendered();
          myConnection.updatePollNumRenders(poll);
        }
      }

      status = true;
    } catch (JSONException e) {
      e.printStackTrace();
      System.err.println("ERROR: GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send a failure response to frontend
      status = false;
    }

    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
