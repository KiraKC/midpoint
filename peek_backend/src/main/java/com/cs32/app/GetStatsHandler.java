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
    try {
      JSONObject data = new JSONObject(req.body());
      int pollId = Integer.parseInt(data.getString("pollId"));
      String response = data.getString("response");
      // TODO: Change this to return some real stuffs
      return null;
    } catch (org.json.JSONException e) {
      System.err.println("ERROR: Incorrect JSON object formatting");
      // TODO: send the error message to the frontend

    } catch (NumberFormatException e) {
      System.err.println("ERROR: Incorrect ID data type");
      // TODO: send the error message to the frontend
      
    }

    return null;
  }
}
