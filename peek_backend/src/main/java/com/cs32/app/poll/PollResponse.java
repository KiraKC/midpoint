package com.cs32.app.poll;

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
  private Map<String, String> userMetaData;

  public PollResponse(Document mongoPollResponse) {
    id = mongoPollResponse.getString("_id");
    pollId = mongoPollResponse.getString("pollId");
    answerOptionId = mongoPollResponse.getString("answerOptionId");

    // putting user metadata into hashmap
    userMetaData = new HashMap<>();
    List<Document> mongoMetaData = (List<Document>) mongoPollResponse.get("userMetaData");
    for (Document doc : mongoMetaData) {
      userMetaData.put(doc.getString("key"), doc.getString("value"));
    }
  }

  public PollResponse(JSONObject jsonReqObject) throws JSONException {
    id = jsonReqObject.getString("answerOptionId");
    pollId = jsonReqObject.getString("pollId");
    JSONArray jsonUserMetaDataArray = jsonReqObject.getJSONArray("userMetaData");
    userMetaData = new HashMap<>();
    for (int i = 0; i < jsonUserMetaDataArray.length(); i++){
      JSONObject jsonUserMetaDataObject = jsonUserMetaDataArray.getJSONObject(i);
      String key = jsonUserMetaDataObject.getString("key");
      String value = jsonUserMetaDataObject.getString("value");
      userMetaData.put(key, value);
    }
  }

  public Document toBSON() {
    List<Document> mongoUserMetaData = new ArrayList<>();
    for (Map.Entry<String, String> entry : userMetaData.entrySet()) {
      Document mongoUserMetaDatum = new Document("key", entry.getKey())
            .append("value", entry.getValue());
      mongoUserMetaData.add(mongoUserMetaDatum);
    }

    Document mongoPollResponse = new Document("_id", id);
    mongoPollResponse.append("pollId", pollId)
          .append("answerOptionId", answerOptionId)
          .append("userMetaData", mongoUserMetaData);

    return mongoPollResponse;
  }

}
