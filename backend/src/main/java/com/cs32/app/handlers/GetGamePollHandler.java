package com.cs32.app.handlers;

import com.cs32.app.database.Connection;
import com.cs32.app.poll.Poll;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.Set;
import java.util.Map;
import java.util.HashMap;
import java.util.HashSet;

/**
 * The handler which is responsible for the followings.
 * - generating random polls for the frontend game page
 */
public class GetGamePollHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();
  private final Connection myConnection;

  public GetGamePollHandler(Connection connection) {
    myConnection = connection;
  }

  /**
   * The handle() method that does the job above.
   * @param request a Json object containing the seen polls of a user
   * @param response doesn't matter
   * @return a Json object containing the polls to display on the frontend game page
   * @throws Exception exception
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
      Poll pollToSend = myConnection.getRandomPolls(1).get(0);
      while (seenPollIds.contains(pollToSend.getId())) {
        pollToSend = myConnection.getRandomPolls(1).get(0);
      }

      // Return the poll to the frontend as a JSON
      variables.put("gamePoll", pollToSend);
      status = true;
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println("ERROR: GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send a failure response to frontend
      status = false;
    }

    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
