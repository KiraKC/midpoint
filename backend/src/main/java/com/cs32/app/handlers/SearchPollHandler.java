package com.cs32.app.handlers;

import com.cs32.app.database.Connection;
import com.cs32.app.poll.Poll;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.*;

public class SearchPollHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

  /**
   * Provides the frontend with the most relevant polls to display.
   * @param request A JSON object that contains the userId, list of pollIds that the user
   *                has seen in their current browsing session, number of polls that the
   *                frontend wants.
   * @param response Doesn't do much here.
   * @return JSON objects representing the polls that the frontend should display.
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> variables = new HashMap<>();

    boolean status;

    try {
      // Parse request
      JSONObject jsonReqObject = new JSONObject(request.body());

      String searchString = jsonReqObject.getString("searchString");
      System.out.println("SEARCH STRING: " + searchString);
      List<Poll> searchResults = Connection.searchPolls(searchString);
      System.out.println(searchResults);
      variables.put("searchResults", searchResults);
      status = true;
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println("ERROR: SearchPollHandler JSON request not properly formatted");
      // TODO: send a failure response to frontend
      status = false;
    }

    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
