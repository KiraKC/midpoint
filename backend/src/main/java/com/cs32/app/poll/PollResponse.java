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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PollResponse {

  @Expose
  private String id;
  @Expose
  private String pollId;
  @Expose
  private String answerOptionId;
  @Expose
  private UserMetaData userMetaData;

  public PollResponse(Document mongoPollResponse) {
    id = mongoPollResponse.getString("_id");
    pollId = mongoPollResponse.getString("pollId");
    answerOptionId = mongoPollResponse.getString("answerOptionId");

    // putting user metadata into hashmap
    userMetaData = new UserMetaData((List<Document>) mongoPollResponse.get("userMetaData"));
  }

  public PollResponse(JSONObject jsonReqObject) throws JSONException, MissingDBObjectException, FirebaseAuthException {
    id = new ObjectId().toString();
    pollId = jsonReqObject.getString("pollId");
    answerOptionId = jsonReqObject.getString("answerOptionId");
    String userIdToken = jsonReqObject.getString("userIdToken");
    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
    String userId = decodedToken.getUid();
    User user = Connection.getUserById(userId);
    userMetaData = user.getUserMetaData();
  }

  public String getAnswerOptionId() {
    return answerOptionId;
  }

  public Document toBSON() {
    List<Document> mongoUserMetaData = userMetaData.toBSON();

    Document mongoPollResponse = new Document("_id", id);
    mongoPollResponse.append("pollId", pollId)
          .append("answerOptionId", answerOptionId)
          .append("userMetaData", mongoUserMetaData);

    return mongoPollResponse;
  }

}
