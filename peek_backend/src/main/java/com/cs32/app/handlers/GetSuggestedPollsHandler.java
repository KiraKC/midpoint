package com.cs32.app.handlers;

import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;
import spark.Route;
import org.json.JSONObject;


public class GetSuggestedPollsHandler implements Route {

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
    int userId;
    int numPollsRequested;
    int[] seenPollIds;
    // Parse request
    try {
      JSONObject JSONReqObject = new JSONObject(request.body());
      userId = JSONReqObject.getInt("userId");
      numPollsRequested = JSONReqObject.getInt("numPollsRequested");
      JSONArray JSONSeenPollIds = JSONReqObject.getJSONArray("seenPollIds");
      seenPollIds = new int[JSONSeenPollIds.length()];
      for (int i = 0; i< JSONSeenPollIds.length(); i++){
        seenPollIds[i] = JSONSeenPollIds.getJSONObject(i).getInt("pollid");
      }
      return null;
    } catch (JSONException e) {
      System.err.println("GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send to failure response to frontend
      return ("hihi");
    }

    // Query for user's Category Points
    // Query for 100 random polls
    // Sort these polls based on their relevancy score
    // Return the x most relevant polls to the frontend as a JSON
    // return null;
  }

}
