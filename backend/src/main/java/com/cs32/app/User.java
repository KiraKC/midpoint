package com.cs32.app;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.List;

public class User {

  private String id;
  private UserMetaData userMetaData;
  private CategoryPoints categoryPoints;
  private AnsweredPolls answeredPolls;
  private CreatedPolls createdPolls;

  /**
   * Constructor for creating entirely new user from registration
   * @param jsonReqObject
   * @throws JSONException
   * @throws FirebaseAuthException
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
  }

  public User(Document mongoUser) {
    id = mongoUser.getString("_id");
    categoryPoints = new CategoryPoints();
    categoryPoints.initializeFromMongo((List<Document>) mongoUser.get("categoryPoints"));
    answeredPolls = new AnsweredPolls((List<String>) mongoUser.get("answeredPolls"));
    createdPolls = new CreatedPolls((List<String>) mongoUser.get("answeredPolls"));
  }

  public Document toBSON() {
    Document mongoUser = new Document("_id", id);
    mongoUser.append("categoryPoints", categoryPoints.toBSON())
          .append("userMetaData", userMetaData.toBSON())
          .append("answeredPolls", answeredPolls.toBSON())
          .append("createdPolls", createdPolls.toBSON());
    return mongoUser;
  }

  public CategoryPoints getCategoryPoints() {
    return categoryPoints;
  }

}
