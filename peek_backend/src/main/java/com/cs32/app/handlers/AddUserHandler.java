package com.cs32.app.handlers;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.Map;

import static com.cs32.app.database.Connection.dummyAddQuery;

public class AddUserHandler implements Route {
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
    int userId; String password; boolean status;
    // Parse request
    try {
      JSONObject JSONReqObject = new JSONObject(request.body());
      userId = JSONReqObject.getInt("userId");
      password = JSONReqObject.getString("password");
      dummyAddQuery(password);
      status = true;
    } catch (JSONException e) {
      e.printStackTrace();
      System.err.println("JSON request not properly formatted");
      status = false;
    }
    Map<String, Boolean> variables = ImmutableMap.of(
        "success", status
    );
    return GSON.toJson(variables);
  }
}
