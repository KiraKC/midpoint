package com.cs32.app.handlers;

import com.cs32.app.CategoryPoints;
import com.cs32.app.Constants;
import com.cs32.app.algorithm.ClickRateComparator;
import com.cs32.app.algorithm.RelevancyComparator;
import com.cs32.app.database.Connection;
import com.cs32.app.poll.Poll;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
    int userId;
    int numPollsRequested;
    Set seenPollIds;
    boolean status;
    List<Poll> pollsToSend = new ArrayList<>();

    try {
      // Parse request
      JSONObject JSONReqObject = new JSONObject(request.body());
      numPollsRequested = JSONReqObject.getInt("numPollsRequested");
//      userId = JSONReqObject.getInt("userId");
//      JSONArray JSONSeenPollIds = JSONReqObject.getJSONArray("seenPollIds");
//      seenPollIds = new HashSet();
//      for (int i = 0; i< JSONSeenPollIds.length(); i++){
//        seenPollIds.add(JSONSeenPollIds.getJSONObject(i).getInt("pollid"));
//      }

      // TODO: Query for the user's Category Points
      CategoryPoints userCatPts = new CategoryPoints(new ArrayList<>(Arrays.asList(Constants.ALL_CATEGORIES[0],
          Constants.ALL_CATEGORIES[1], Constants.ALL_CATEGORIES[2])));
      System.out.println(userCatPts.getNormPts(Constants.ALL_CATEGORIES[0], userCatPts.getTotalPts()));

      // Query for random polls
      List<Poll> randomPolls = Connection.getRandomPolls(
          numPollsRequested * Constants.QUERY_RAND_POLLS_NUM_BATCH);

      // Get polls with highest relevancy from the first batch
      List<Poll> batch = randomPolls.subList(0, numPollsRequested);
      Collections.sort(batch, new RelevancyComparator(userCatPts));
      int numRelevancy = (int) Math.floor(numPollsRequested * Constants.QUERY_RAND_POLLS_RELEVANCY_PORTION);
      List<Poll> byRelevancy = batch.subList(0, numRelevancy);

      // Get polls with highest click rate from the second batch
      batch = randomPolls.subList(numPollsRequested, 2 * numPollsRequested);
      Collections.sort(batch, new ClickRateComparator());
      int numClickRate = (int) Math.floor(numPollsRequested * Constants.QUERY_RAND_POLLS_CLICK_RATE_PORTION);
      List<Poll> byClickRate = batch.subList(0, numClickRate);

      // Get polls randomly from the third batch
      int numRandom = numPollsRequested - numRelevancy - numClickRate;
      List<Poll> byRandom = randomPolls.subList(2 * numPollsRequested,
          2 * numPollsRequested + numRandom);

      // Put the three sets of polls together and shuffle them
      pollsToSend.addAll(byRelevancy);
      pollsToSend.addAll(byClickRate);
      pollsToSend.addAll(byRandom);
      Collections.shuffle(pollsToSend);

      // Return the polls to the frontend as a JSON
      variables.put("suggestedPolls", pollsToSend);

      // Update the polls' num of renders
      for (Poll poll : pollsToSend) {
        poll.rendered();
      }

      status = true;
    } catch (JSONException e) {
      System.err.println("ERROR: GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send a failure response to frontend
      status = false;
    }

    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
