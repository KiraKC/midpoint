package com.cs32.app.handlers;

import com.cs32.app.User;
import com.cs32.app.database.Connection;
import com.google.common.collect.ImmutableMap;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.Map;

public class NewUserHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

  /**
   * Provides the frontend with the most relevant polls to display.
   * @param request A JSON object that contains the userId, list of pollIds that the user
   *                has seen in their current browsing session, number of polls that the
   *                frontend wants.
   * @param response Doesn't do much here.
   * @return JSON objects representing the polls that the frontend should display.
   */
  @Override
  public Object handle(Request request, Response response) {
    boolean status;
    // Parse request
    try {
      JSONObject jsonReqObject = new JSONObject(request.body());
      User user = new User(jsonReqObject);

      // add user to database
      status = Connection.addUserToDB(user);
    } catch (JSONException e) {
      e.printStackTrace();
      System.out.println("JSON request not properly formatted");
      status = false;
    } catch (FirebaseAuthException e) {
      e.printStackTrace();
      System.out.println("Firebase Auth Exception");
      status = false;
    }
    Map<String, Boolean> variables = ImmutableMap.of(
        "success", status
    );
    return GSON.toJson(variables);
  }
}