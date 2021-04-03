package com.cs32.app.handlers;

import com.cs32.app.database.Connection;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import spark.Route;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * The CheckOffHandler class takes in the com.cs32.app.poll id and the user id from the frontend
 * when a com.cs32.app.poll is answered by the user. It then
 * 1) checks off the com.cs32.app.poll for this user in the database so that this com.cs32.app.poll won't show
 * up again on the feed page,
 * 2) updates the category points for both the com.cs32.app.poll and the user.
 */
public class CheckOffHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
  /**
   * The handle() method.
   * @param req a JSON object containing the com.cs32.app.poll id and the user id
   * @param res
   * @return a success message
   * @throws Exception
   */
  @Override
  public Object handle(Request req, Response res) throws Exception {
    Map<String, Object> variables = new HashMap<>();
    boolean status;
    try {
      JSONObject data = new JSONObject(req.body());
      String pollId = data.getString("pollId");
      String userId = data.getString("userId");

      // TODO: update user's list of answered polls
      // TODO: update user's category points


      // TODO: update poll's list of responders
      // TODO: update poll's numClicks
      // TODO: update poll's category points
      Connection.getPollById(pollId);


      status = true;
    } catch (org.json.JSONException e) {
      System.err.println("ERROR: Incorrect JSON object formatting");
      // TODO: send the error message to the frontend
      status = false;
    } catch (NumberFormatException e) {
      System.err.println("ERROR: Incorrect ID data type");
      // TODO: send the error message to the frontend
      status = false;
    }
    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
