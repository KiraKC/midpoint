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
import com.mongodb.BasicDBObject;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;
import spark.Route;
import org.json.JSONObject;

import java.util.*;


public class GetSuggestedPollsHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

  /**
   * Provides the frontend with the most relevant polls to display.
   * @param request A JSON object that contains the userId, list of pollIds that the user
   *                has seen in their current browsing session, number of polls that the
   *                frontend wants.
   * @param response Doesn't do much here.
   * @return JSON objects representing the polls that the frontend should display.
   * @throws Exception
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
        User user = Connection.getUserById(userId);
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
      while (randomPolls.size() < numPollsRequested * Constants.NUM_QUERIED_POLLS_PER_REQUESTED && previousQuerySize != 0) {
        List<Poll> newPolls = Connection.getRandomPolls(numPollsRequested * Constants.NUM_QUERIED_POLLS_PER_REQUESTED);
        for(int i = 0; i<newPolls.size(); i++) {
          System.out.println("considering poll: " + newPolls.get(i).getId());
          System.out.println(pollsToExclude);
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


      int numRelevancyIndex = (int) Math.floor(randomPolls.size() * Constants.QUERY_RAND_POLLS_RELEVANCY_PORTION);
      int numClickRateIndex = numRelevancyIndex + (int) Math.floor(randomPolls.size() * Constants.QUERY_RAND_POLLS_CLICK_RATE_PORTION);
      int numRandomIndex = randomPolls.size();

      List<Poll> relevancyBatch = randomPolls.subList(0, numRelevancyIndex);
      List<Poll> clickRateBatch = randomPolls.subList(numRelevancyIndex, numClickRateIndex);
      List<Poll> randomBatch = randomPolls.subList(numClickRateIndex, numRandomIndex);

      // Get polls with highest relevancy from the first batch
      int numFromRelevancyBatch = (int) Math.floor(adjustedNumRequested * Constants.QUERY_RAND_POLLS_RELEVANCY_PORTION);
      Collections.sort(relevancyBatch, new RelevancyComparator(userCatPts));
      List<Poll> byRelevancy = relevancyBatch.subList(0, numFromRelevancyBatch);

      // Get polls with highest click rate from the second batch
      int numFromClickRateBatch = (int) Math.floor(adjustedNumRequested * Constants.QUERY_RAND_POLLS_CLICK_RATE_PORTION);
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
          poll.rendered();
          // TODO: update poll's number of renders in MongoDB
          BasicDBObject searchQuery = new BasicDBObject("_id", poll.getId());
          BasicDBObject updateFields = new BasicDBObject("numRenders", poll.getNumRenders());
          BasicDBObject setQuery = new BasicDBObject("$set", updateFields);
          Connection.pollCollection.updateOne(searchQuery, setQuery);
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
