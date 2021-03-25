package com.cs32.app.handlers;

import com.cs32.app.database.Connection;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONException;
import spark.Request;
import spark.Response;
import spark.Route;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;


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
    int[] seenPollIds;
    boolean status;
    // Parse request
    try {
      JSONObject JSONReqObject = new JSONObject(request.body());
//      userId = JSONReqObject.getInt("userId");
      numPollsRequested = JSONReqObject.getInt("numPollsRequested");
//      JSONArray JSONSeenPollIds = JSONReqObject.getJSONArray("seenPollIds");
//      seenPollIds = new int[JSONSeenPollIds.length()];
//      for (int i = 0; i< JSONSeenPollIds.length(); i++){
//        seenPollIds[i] = JSONSeenPollIds.getJSONObject(i).getInt("pollid");
//      }
      variables.put("suggestedPolls", Connection.getRandomPolls(numPollsRequested));
      status = true;
    } catch (JSONException e) {
      System.err.println("GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send to failure response to frontend
      status = false;
    }

    // Query for user's Category Points
    // Query for 100 random polls
    // Sort these polls based on their relevancy score
    // Return the x most relevant polls to the frontend as a JSON
    // return null;
    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
