package com.cs32.app.poll;

import com.cs32.app.UserMetaData;
import com.google.gson.annotations.Expose;
import org.bson.Document;
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

  public PollResponse(JSONObject jsonReqObject) throws JSONException {
    id = jsonReqObject.getString("answerOptionId");
    pollId = jsonReqObject.getString("pollId");
    JSONArray jsonUserMetaDataArray = jsonReqObject.getJSONArray("userMetaData");
    userMetaData = new UserMetaData(jsonUserMetaDataArray);
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
