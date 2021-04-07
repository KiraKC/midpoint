package com.cs32.app.handlers;

import com.cs32.app.CategoryPoints;
import com.cs32.app.User;
import com.cs32.app.database.Connection;
import com.cs32.app.exceptions.MissingDBObjectException;
import com.cs32.app.poll.AnswerOption;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.BasicDBObject;
import org.bson.Document;
import org.bson.types.ObjectId;
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
    boolean status; String question; String emoji; List<AnswerOption> answerOptions;
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

      //TODO: update user in MongoDB
      String userIdToken = jsonReqObject.getString("creatorId");
      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
      String userId = decodedToken.getUid();
      User user = Connection.getUserById(userId);
      user.created(newPoll.getId());
      BasicDBObject searchQuery = new BasicDBObject("_id", userId);
      BasicDBObject updateFields = new BasicDBObject("createdPolls", user.getCreatedPolls().toBSON());
      BasicDBObject setQuery = new BasicDBObject("$set", updateFields);
      Connection.userCollection.updateOne(searchQuery, setQuery);

      variables.put("newPoll", newPoll);
    } catch (JSONException | MissingDBObjectException e) {
      e.printStackTrace();
      System.err.println("JSON request not properly formatted");
      status = false;
    } catch (FirebaseAuthException e) {
      e.printStackTrace();
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
