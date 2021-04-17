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

/**
 * The handler which is responsible for the followings.
 * - creating and inserting new polls to MongoDB
 * - updating user's created polls
 */
public class NewPollHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();

  /**
   * The handle() method that does the job above.
   * @param request a Json object containing information of a new poll
   * @param response doesn't matter
   * @return a Json object of the new poll
   */
  @Override
  public Object handle(Request request, Response response) {
    boolean status; String question; String emoji; String color; String imageUrl;
    List<AnswerOption> answerOptions;
    Map<String, Object> variables = new HashMap<>();
    // Parse request
    try {
      JSONObject jsonReqObject = new JSONObject(request.body());

      String userIdToken = jsonReqObject.getString("creatorId");
      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
      String userId = decodedToken.getUid();
      User user = Connection.getUserById(userId);
      question = jsonReqObject.getString("question");
      emoji = jsonReqObject.getString("emoji");
      color = jsonReqObject.getString("color");
      imageUrl = jsonReqObject.getString("imageUrl");

      // create ArrayList of AnswerOption objects
      JSONArray jsonAnswerOptions = jsonReqObject.getJSONArray("answerOptions");
      answerOptions = new ArrayList<>();
      for (int i = 0; i < jsonAnswerOptions.length(); i++) {
        JSONObject jsonAnswerObject = jsonAnswerOptions.getJSONObject(i);
        String answerOptionString = jsonAnswerObject.getString("value");
        String answerOptionEmoji = jsonAnswerObject.getString("emoji");
        answerOptions.add(new AnswerOption(answerOptionString, answerOptionEmoji));
      }

      // calculate initial values for categoryWrapper and initialize categoryWrapper
      JSONArray jsonTaggedCategories = jsonReqObject.getJSONArray("taggedCategories");
      CategoryPoints newCategoryPoints = new CategoryPoints(jsonTaggedCategories);

      Poll newPoll = new Poll(question, emoji, answerOptions, newCategoryPoints, color, imageUrl, user.getId());

      status = this.addPollToDB(newPoll);

      // Update user's created polls in MongoDB
      user.created(newPoll.getId());
      BasicDBObject searchQuery = new BasicDBObject("_id", userId);
      BasicDBObject updateFields = new BasicDBObject("createdPolls",
          user.getCreatedPolls().toBSON());
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
