package com.cs32.app.poll;

import com.cs32.app.User;
import com.cs32.app.UserMetaData;
import com.cs32.app.database.Connection;
import com.cs32.app.exceptions.MissingDBObjectException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.annotations.Expose;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
 * PollResponse class that stands for a poll response.
 */
public class PollResponse {

  @Expose
  private final String id;
  @Expose
  private final String pollId;
  @Expose
  private final String answerOptionId;
  @Expose
  private final UserMetaData userMetaData;

  /**
   * Constructor for transforming a MongoDB document to a PollResponse object.
   * @param mongoPollResponse MongoDB document of a poll response
   */
  public PollResponse(Document mongoPollResponse) {
    id = mongoPollResponse.getString("_id");
    pollId = mongoPollResponse.getString("pollId");
    answerOptionId = mongoPollResponse.getString("answerOptionId");

    // putting user metadata into hashmap
    userMetaData = new UserMetaData((List<Document>) mongoPollResponse.get("userMetaData"));
  }

  /**
   * Constructor for transforming a Json object to a PollResponse object.
   * @param jsonReqObject Json object of a poll response
   * @throws JSONException Json exception
   * @throws MissingDBObjectException missing MongoDB object exception
   * @throws FirebaseAuthException firebase exception
   */
  public PollResponse(JSONObject jsonReqObject) throws JSONException,
      MissingDBObjectException, FirebaseAuthException {
    id = new ObjectId().toString();
    pollId = jsonReqObject.getString("pollId");
    answerOptionId = jsonReqObject.getString("answerOptionId");
    String userIdToken = jsonReqObject.getString("userIdToken");
    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
    String userId = decodedToken.getUid();
    User user = Connection.getUserById(userId);
    System.out.println("USER: " + user.toBSON());
    userMetaData = user.getUserMetaData();
  }

  /**
   * Getter method for answer option id of the poll response.
   * @return answer option id
   */
  public String getAnswerOptionId() {
    return answerOptionId;
  }

  /**
   * Method for transforming a poll response to a Bson object.
   * @return a Bson object of a poll response.
   */
  public Document toBSON() {
    List<Document> mongoUserMetaData = userMetaData.toBSON();

    Document mongoPollResponse = new Document("_id", id);
    mongoPollResponse.append("pollId", pollId)
          .append("answerOptionId", answerOptionId)
          .append("userMetaData", mongoUserMetaData);

    return mongoPollResponse;
  }

}
