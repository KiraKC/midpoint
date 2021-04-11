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

/**
 * The handler which is responsible for:
 * - creating and inserting new users to MongoDB.
 */
public class NewUserHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();

  /**
   * The handle() method that does the job above.
   * @param request a Json object containing the information of a new user
   * @param response doesn't matter
   * @return a success message
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
