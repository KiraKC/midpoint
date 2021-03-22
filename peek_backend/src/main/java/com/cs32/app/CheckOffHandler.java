package com.cs32.app;

import spark.Request;
import spark.Response;
import spark.Route;

import org.json.JSONObject;

/**
 * The CheckOffHandler class takes in the poll id and the user id from the frontend
 * when a poll is answered by the user. It then
 * 1) checks off the poll for this user in the database so that this poll won't show
 * up again on the feed page,
 * 2) updates the category points for both the poll and the user.
 */
public class CheckOffHandler implements Route {
  /**
   * The handle() method.
   * @param req a JSON object containing the poll id and the user id
   * @param res
   * @return a success message
   * @throws Exception
   */
  @Override
  public Object handle(Request req, Response res) throws Exception {
    try {
      JSONObject data = new JSONObject(req.body());
      int pollId = Integer.parseInt(data.getString("pollId"));
      int userId = Integer.parseInt(data.getString("userId"));
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
