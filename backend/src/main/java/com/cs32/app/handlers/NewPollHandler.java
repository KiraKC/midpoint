package com.cs32.app.handlers;

import com.cs32.app.CategoryPoints;
import com.cs32.app.poll.AnswerOption;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.BasicDBObject;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.cs32.app.poll.Poll;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.cs32.app.database.Connection.pollCollection;
import static com.cs32.app.database.Connection.userCollection;

public class NewPollHandler implements Route {
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
    boolean status; int userId; String question; String emoji; List<AnswerOption> answerOptions; List<String> taggedCategories;
    Map<String, Object> variables = new HashMap<>();
    // Parse request
    try {
      JSONObject jsonReqObject = new JSONObject(request.body());

      question = jsonReqObject.getString("question");
      emoji = jsonReqObject.getString("emoji");

      // create ArrayList of AnswerOption objects
      JSONArray jsonAnswerOptions = jsonReqObject.getJSONArray("answerOptions");
      answerOptions = new ArrayList<>();
      for (int i = 0; i < jsonAnswerOptions.length(); i++){
        JSONObject jsonAnswerObject = jsonAnswerOptions.getJSONObject(i);
        String answerOptionString = jsonAnswerObject.getString("value");
        String answerOptionEmoji = jsonAnswerObject.getString("emoji");
        answerOptions.add(new AnswerOption(answerOptionString, answerOptionEmoji));
        System.out.println(answerOptions.get(i).getValue());
      }

      // calculate initial values for categoryWrapper and initialize categoryWrapper
      JSONArray jsonTaggedCategories = jsonReqObject.getJSONArray("taggedCategories");
      CategoryPoints newCategoryPoints = new CategoryPoints(jsonTaggedCategories);

      Poll newPoll = new Poll(question, emoji, answerOptions, newCategoryPoints);

      System.out.println(newPoll);
      status = this.addPollToDB(newPoll);
      //TODO: add pollId to user's created polls field in database (so user can see all polls they created)
      userId = jsonReqObject.getInt("creatorId");
      BasicDBObject findQuery = new BasicDBObject("_id", userId);
      BasicDBObject newPollIdToAdd = new BasicDBObject("createdPolls", newPoll.getId());
      Document updateQuery = new Document().append("$push", newPollIdToAdd);
      userCollection.updateOne(findQuery, updateQuery);

      variables.put("newPoll", newPoll);
    } catch (JSONException e) {
      e.printStackTrace();
      System.err.println("JSON request not properly formatted");
      status = false;
    }
    variables.put("status", status);
    return GSON.toJson(variables);
  }

  private boolean addPollToDB(Poll poll) {
    try {
      pollCollection.insertOne(poll.toBSON());
      System.out.println("adding com.cs32.app.poll to db was SUCCESSFUL");
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("adding com.cs32.app.poll to db failed");
      return false;
    }
    return true;
  }
}
