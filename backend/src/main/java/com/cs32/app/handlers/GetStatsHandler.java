package com.cs32.app.handlers;

import com.cs32.app.poll.PollResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import spark.Route;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.cs32.app.database.Connection.getResponses;

/**
 * The handler which is responsible for:
 * - sending the statistics for a poll to the frontend.
 */
public class GetStatsHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();

  @Override
  public Object handle(Request req, Response res) {
    Map<String, Object> variables = new HashMap<>();
    boolean status;
    try {
      JSONObject data = new JSONObject(req.body());
      String pollId = data.getString("pollId");
      // TODO: Change this to return some real stuffs
      List<PollResponse> responses = getResponses(pollId);
      variables.put("responses", responses);
      status = true;
    } catch (org.json.JSONException e) {
      System.err.println("ERROR: Incorrect JSON object formatting");
      status = false;
      // TODO: send the error message to the frontend
    }
    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
