package com.cs32.app.handlers;

import com.cs32.app.CategoryPoints;
import com.cs32.app.Constants;
import com.cs32.app.algorithm.PollAndRelevancePair;
import com.cs32.app.algorithm.PollComparator;
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
    // Parse request
    try {
      JSONObject JSONReqObject = new JSONObject(request.body());
//      userId = JSONReqObject.getInt("userId");
      numPollsRequested = JSONReqObject.getInt("numPollsRequested");
//      JSONArray JSONSeenPollIds = JSONReqObject.getJSONArray("seenPollIds");
//      seenPollIds = new HashSet();
//      for (int i = 0; i< JSONSeenPollIds.length(); i++){
//        seenPollIds.add(JSONSeenPollIds.getJSONObject(i).getInt("pollid"));
//      }

      // Query for user's Category Points
      CategoryPoints userCatPts = new CategoryPoints(new ArrayList<>(Arrays.asList(Constants.ALL_CATEGORIES[0], Constants.ALL_CATEGORIES[1], Constants.ALL_CATEGORIES[2])));
      System.out.println(userCatPts.getNormPts(Constants.ALL_CATEGORIES[0], userCatPts.getTotalPts()));
//      while(pollsToSend.size() < numPollsRequested) {
        // Query for random polls
        List<Poll> randomPolls = Connection.getRandomPolls(numPollsRequested*Constants.QUERY_RAND_POLLS_NUM_BATCH);

        List<Poll> byClickrate = randomPolls.subList(0, Constants.ALGORITHM_RANDOM_POLL_BATCH_SZ);

        List<Poll> byRelevancy = randomPolls.subList(Constants.ALGORITHM_RANDOM_POLL_BATCH_SZ, 2*Constants.ALGORITHM_RANDOM_POLL_BATCH_SZ);

        List<Poll> byRandom = randomPolls.subList(2*Constants.ALGORITHM_RANDOM_POLL_BATCH_SZ, 3*Constants.ALGORITHM_RANDOM_POLL_BATCH_SZ);

        // Sort these polls based on their relevancy score
        List<PollAndRelevancePair> pollAndRelevancePairList = new ArrayList<>();
        for (Poll poll : randomPolls) {
          pollAndRelevancePairList.add(new PollAndRelevancePair(poll, userCatPts));
        }



        Collections.sort(pollAndRelevancePairList, new PollComparator(userCatPts));

        for (PollAndRelevancePair p : pollAndRelevancePairList) {
          System.out.println(p.getPoll().getQuestion());
          System.out.println(p.getCategoryDisparity());
        }

//      System.out.println(pollAndRelevancePairList.get(0).getPoll().getQuestion());
        pollsToSend.add(pollAndRelevancePairList.get(0).getPoll());
        pollsToSend.add(pollAndRelevancePairList.get(1).getPoll());
        pollsToSend.add(pollAndRelevancePairList.get(2).getPoll());
        pollsToSend.add(pollAndRelevancePairList.get(3).getPoll());
        pollsToSend.add(pollAndRelevancePairList.get(4).getPoll());
//      }

      // Return the x most relevant polls to the frontend as a JSON
      variables.put("suggestedPolls", pollsToSend);
      // TODO: update poll's numRenders
      status = true;
    } catch (JSONException e) {
      System.err.println("GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send to failure response to frontend
      status = false;
    }


    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
