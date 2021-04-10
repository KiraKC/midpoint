package com.cs32.app;

import com.mongodb.BasicDBList;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * CreatedPolls class that stores all the polls created by a user.
 */
public class CreatedPolls {
  private Set<String> createdPolls;

  /**
   * Constructor that instantiates an empty CreatedPolls.
   */
  public CreatedPolls() {
    createdPolls = new HashSet<>();
  }

  /**
   * Constructor that takes in a list of poll IDs created by a user.
   * @param pollsCreated a list of poll IDs
   */
  public CreatedPolls(List<String> pollsCreated) {
    createdPolls = new HashSet<>();
    if (pollsCreated != null) {
      createdPolls.addAll(pollsCreated);
    }
  }

  /**
   * Constructor that takes in a Json object of created polls.
   * @param jsonArrayPollsCreated a Json object of created polls
   * @throws JSONException
   */
  public CreatedPolls(JSONArray jsonArrayPollsCreated) throws JSONException {
    createdPolls = new HashSet<>();
    for(int i = 0; i < jsonArrayPollsCreated.length(); i++){
      createdPolls.add(jsonArrayPollsCreated.getString(i));
    }
  }

  /**
   * Getter method for the set of created polls.
   * @return a defensive copy of created polls
   */
  public Set<String> getCreatedPolls() {
    return (new HashSet<>(createdPolls));
  }

  /**
   * Method for adding newly created polls.
   * @param pollId
   */
  public void add(String pollId) {
    createdPolls.add(pollId);
  }

  /**
   * Method for transforming a CreatedPolls object to Bson object.
   * @return
   */
  public Object toBSON() {
    List<Object> mongoAnsweredPollsList = new BasicDBList();
    mongoAnsweredPollsList.addAll(createdPolls);
    return mongoAnsweredPollsList;
  }

  public Set<String> getSet() {
    return createdPolls;
  }
}
