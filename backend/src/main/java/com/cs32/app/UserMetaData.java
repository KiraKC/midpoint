package com.cs32.app;

import com.google.gson.annotations.Expose;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserMetaData {

  @Expose
  private Map<String, String> userMetaDataMap;

  public UserMetaData(JSONArray jsonUserMetaDataArray) throws JSONException {
    userMetaDataMap = new HashMap<>();
    for (int i = 0; i < jsonUserMetaDataArray.length(); i++) {
      JSONObject jsonUserMetaDataObject = jsonUserMetaDataArray.getJSONObject(i);
      String key = jsonUserMetaDataObject.getString("key");
      String value = jsonUserMetaDataObject.getString("value");
      userMetaDataMap.put(key, value);
    }
  }

  public UserMetaData(List<Document> mongoListUserMetaData) {
    userMetaDataMap = new HashMap<>();
    for (Document doc : mongoListUserMetaData) {
      userMetaDataMap.put(doc.getString("key"), doc.getString("value"));
    }
  }

  public Map<String, String> getMap() {
    return userMetaDataMap;
  }

  public List<Document> toBSON() {
    List<Document> mongoUserMetaData = new ArrayList<>();
    for (Map.Entry<String, String> entry : userMetaDataMap.entrySet()) {
      Document mongoUserMetaDatum = new Document("key", entry.getKey())
            .append("value", entry.getValue());
      mongoUserMetaData.add(mongoUserMetaDatum);
    }
    return mongoUserMetaData;
  }
}
