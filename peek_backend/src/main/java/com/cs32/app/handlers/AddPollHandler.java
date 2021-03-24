package com.cs32.app.handlers;

import com.cs32.app.CatPts;
import org.bson.Document;
import org.bson.types.ObjectId;
import poll.AnswerOption;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import poll.Poll;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.cs32.app.database.Connection.pollCollection;

//import static com.cs32.app.database.Connection.addPoll;

public class AddPollHandler implements Route {
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
    boolean status; int userId; String question; List<AnswerOption> answerOptions; List<String> taggedCategories;
    Map<String, Object> variables = new HashMap<>();
    // Parse request
    try {
      JSONObject jsonReqObject = new JSONObject(request.body());
      userId = jsonReqObject.getInt("creatorId");
      question = jsonReqObject.getString("question");

      // create ArrayList of AnswerOption objects
      JSONArray jsonAnswerOptions = jsonReqObject.getJSONArray("answerOptions");
      answerOptions = new ArrayList<>();
      for (int i = 0; i < jsonAnswerOptions.length(); i++){
        JSONObject jsonAnswerObject = jsonAnswerOptions.getJSONObject(i);
        int answerOptionId = jsonAnswerObject.getInt("id");
        String answerOptionString = jsonAnswerObject.getString("value");
        String answerOptionEmoji = jsonAnswerObject.getString("emoji");
        answerOptions.add(new AnswerOption(answerOptionId, answerOptionString, answerOptionEmoji));
        System.out.println(answerOptions.get(i).getValue());
      }

      // calculate initial values for categoryWrapper and initialize categoryWrapper
      JSONArray jsonTaggedCategories = jsonReqObject.getJSONArray("taggedCategories");
      taggedCategories = new ArrayList<>();
      for (int i = 0; i < jsonTaggedCategories.length(); i++) {
        taggedCategories.add(jsonTaggedCategories.getString(i));
      }
      System.out.println (taggedCategories);
      CatPts newCatPts = new CatPts(taggedCategories);

      //TODO: RANDOMIZE POLL ID LATER (HAVE THIS AS PART OF THE DB CONNECTION CLASS?)
      Poll newPoll = new Poll(new ObjectId(), question, answerOptions, newCatPts);

      boolean databaseResponse = this.addToDatabase(newPoll);


      System.out.println(newPoll);
      status = databaseResponse;
      variables.put("newPoll", newPoll);
    } catch (JSONException e) {
      e.printStackTrace();
      System.err.println("JSON request not properly formatted");
      status = false;
    }
    variables.put("status", status);
    return GSON.toJson(variables);
  }

  private boolean addToDatabase(Poll poll) {
    try {
      Document mongoPoll = new Document("_id", poll.getId());
      mongoPoll.append("question", poll.getQuestion())
            .append("answerOptions", poll.getAnswerOptions())
            .append("catPts", poll.getCatPts())
            .append("responseIds", poll.getResponseIds());
      pollCollection.insertOne(mongoPoll);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("adding poll to db failed");
      return false;
    }
    return true;
  }
}
