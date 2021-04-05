package com.cs32.app.handlers;

import com.cs32.app.database.Connection;
import com.cs32.app.poll.Poll;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.*;

public class GetGamePollHandler implements Route{

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

    boolean status;

    try {
      // Parse request
      JSONObject jsonReqObject = new JSONObject(request.body());

      // Seen polls
      Set<String> seenPollIds = new HashSet<>();
      JSONArray jsonSeenPollsArray = jsonReqObject.getJSONArray("seenPollIds");
      for (int i = 0; i < jsonSeenPollsArray.length(); i++) {
        seenPollIds.add(jsonSeenPollsArray.getString(i));
      }

      // Query for random poll
      Poll pollToSend = Connection.getRandomPolls(1).get(0);
      while (seenPollIds.contains(pollToSend.getId())) {
        pollToSend = Connection.getRandomPolls(1).get(0);
      }

      // Return the poll to the frontend as a JSON
      variables.put("gamePoll", pollToSend);
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
