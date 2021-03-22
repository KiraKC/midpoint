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
    JSONObject data = new JSONObject(req.body());
    int pollID = Integer.parseInt(data.getString("pollid"));
    int userID = Integer.parseInt(data.getString("userid"));

    return null;
  }
}
