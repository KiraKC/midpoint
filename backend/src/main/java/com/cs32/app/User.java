package com.cs32.app;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.List;

/**
 * User class that stands for a user.
 */
public class User {
  private final String id;
  private final UserMetaData userMetaData;
  private final CategoryPoints categoryPoints;
  private final AnsweredPolls answeredPolls;
  private final CreatedPolls createdPolls;
  private int highScore;

  /**
   * Constructor for creating entirely new user from registration.
   * @param jsonReqObject Json object of a user
   * @throws JSONException Json exception
   * @throws FirebaseAuthException firebase exception
   */
  public User(JSONObject jsonReqObject) throws JSONException, FirebaseAuthException {
    // decrypt userId
    String userIdToken = jsonReqObject.getString("userIdToken");
    System.out.println("USERIDTOKEN: " + userIdToken);
    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
    id = decodedToken.getUid();
    System.out.println("USERID: " + id);

    // calculate and add user category points
    JSONArray jsonTaggedCategories = jsonReqObject.getJSONArray("selectedCategories");
    categoryPoints = new CategoryPoints(jsonTaggedCategories);

    // userMetaData
    userMetaData = new UserMetaData(jsonReqObject.getJSONArray("userMetaData"));

    // answeredPolls
    answeredPolls = new AnsweredPolls();

    // createdPolls
    createdPolls = new CreatedPolls();

    // highScore
    highScore = 0;
  }

  /**
   * Constructor for creating user from MongoDB.
   * @param mongoUser MongoDB document of a user
   */
  public User(Document mongoUser) {
    id = mongoUser.getString("_id");
    categoryPoints = new CategoryPoints();
    categoryPoints.initializeFromMongo((List<Document>) mongoUser.get("categoryPoints"));
    answeredPolls = new AnsweredPolls((List<String>) mongoUser.get("answeredPolls"));
    createdPolls = new CreatedPolls((List<String>) mongoUser.get("createdPolls"));
    userMetaData = new UserMetaData((List<Document>) mongoUser.get("userMetaData"));
    highScore = mongoUser.getInteger("highScore");
  }

  /**
   * Method for transforming the User object to a Bson object.
   * @return a Bson object of a user
   */
  public Document toBSON() {
    Document mongoUser = new Document("_id", id);
    mongoUser.append("categoryPoints", categoryPoints.toBSON())
          .append("userMetaData", userMetaData.toBSON())
          .append("answeredPolls", answeredPolls.toBSON())
          .append("createdPolls", createdPolls.toBSON())
          .append("highScore", highScore);
    return mongoUser;
  }

  /**
   * Getter method for user ID.
   * @return user ID
   */
  public String getId() {
    return id;
  }

  /**
   * Getter method for user meta data.
   * @return user meta data
   */
  public UserMetaData getUserMetaData() {
    return userMetaData;
  }

  /**
   * Getter method for user category points.
   * @return user category points
   */
  public CategoryPoints getCategoryPoints() {
    return categoryPoints;
  }

  /**
   * Getter method for user answered polls.
   * @return user answered polls
   */
  public AnsweredPolls getAnsweredPolls() {
    return answeredPolls;
  }

  /**
   * Getter method for user created polls.
   * @return user created polls
   */
  public CreatedPolls getCreatedPolls() {
    return createdPolls;
  }

  /**
   * Getter method for user high score.
   * @return high score
   */
  public int getHighScore() {
    return highScore;
  }

  /**
   * Method for adding newly answered polls.
   * @param pollId ID of the newly answered poll
   */
  public void answered(String pollId) {
    answeredPolls.add(pollId);
  }

  /**
   * Method for adding newly created polls.
   * @param pollId ID of the newly created poll
   */
  public void created(String pollId) {
    createdPolls.add(pollId);
  }
}
