package com.cs32.app;

import spark.Request;
import spark.Response;
import spark.Route;

import org.json.JSONObject;

/**
 * The GetStatsHandler class takes in the poll id and the user response when a poll
 * is answered by a user. It then updates the database and returns the statistics for
 * this poll.
 */
public class GetStatsHandler implements Route {
  /**
   * The handle() method.
   * @param req a JSON object containing the poll id and the user response
   * @param res
   * @return the statistics for this poll
   * @throws Exception
   */
  @Override
  public Object handle(Request req, Response res) throws Exception {
    JSONObject data = new JSONObject(req.body());
    int pollID = Integer.parseInt(data.getString("pollid"));
    String response = data.getString("response");
    
    return null;
  }
}
