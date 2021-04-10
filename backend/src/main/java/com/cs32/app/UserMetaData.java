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

/**
 * UserMetaData class that stores meta data of a user.
 */
public class UserMetaData {
  @Expose
  private Map<String, String> userMetaDataMap;

  /**
   * Constructor that instantiate UserMetaData from a Json object.
   * @param jsonUserMetaDataArray a Json object of user meta data
   * @throws JSONException
   */
  public UserMetaData(JSONArray jsonUserMetaDataArray) throws JSONException {
    userMetaDataMap = new HashMap<>();
    for (int i = 0; i < jsonUserMetaDataArray.length(); i++) {
      JSONObject jsonUserMetaDataObject = jsonUserMetaDataArray.getJSONObject(i);
      String key = jsonUserMetaDataObject.getString("key");
      String value = jsonUserMetaDataObject.getString("value");
      userMetaDataMap.put(key, value);
    }
  }

  /**
   * Constructor that instantiates UserMetaData from MongoDB.
   * @param mongoListUserMetaData a MongoDB document of user meta data
   */
  public UserMetaData(List<Document> mongoListUserMetaData) {
    userMetaDataMap = new HashMap<>();
    for (Document doc : mongoListUserMetaData) {
      userMetaDataMap.put(doc.getString("key"), doc.getString("value"));
    }
  }

  /**
   * Getter method for the map of user mata data.
   * @return the map of user mata data
   */
  public Map<String, String> getMap() {
    return userMetaDataMap;
  }

  /**
   * Method for transforming UserMetaData to a Bson object.
   * @return a Bson object of user meta data
   */
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
