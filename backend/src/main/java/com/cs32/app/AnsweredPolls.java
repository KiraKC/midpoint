package com.cs32.app;

import com.mongodb.BasicDBList;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * AnsweredPolls class that stores the polls a user has answered.
 */
public class AnsweredPolls {
  private Set<String> answeredPolls;

  /**
   * Constructor that instantiates an empty AnsweredPolls.
   */
  public AnsweredPolls() {
    answeredPolls = new HashSet<>();
  }

  /**
   * Constructor that takes in a list of poll IDs.
   * @param pollsAnswered a list of poll IDs
   */
  public AnsweredPolls(List<String> pollsAnswered) {
    answeredPolls = new HashSet<>();
    if (pollsAnswered != null) {
      answeredPolls.addAll(pollsAnswered);
    }
  }

  /**
   * Constructor that takes in a Json object of answered polls.
   * @param jsonArrayAnsweredPolls a Json object of answered polls
   * @throws JSONException
   */
  public AnsweredPolls(JSONArray jsonArrayAnsweredPolls) throws JSONException {
    answeredPolls = new HashSet<>();
    for(int i = 0; i < jsonArrayAnsweredPolls.length(); i++){
      answeredPolls.add(jsonArrayAnsweredPolls.getString(i));
    }
  }

  /**
   * Method for adding a newly answered poll.
   * @param pollId
   */
  public void add(String pollId) {
    answeredPolls.add(pollId);
  }

  /**
   * Getter method for answered polls.
   * @return a defensive copy of the answered polls.
   */
  public Set<String> getAnsweredPolls() {
    return (new HashSet<>(answeredPolls));
  }

  /**
   * Method for transforming the AnsweredPolls object to Bson object.
   * @return a Bson object of answered polls
   */
  public Object toBSON() {
    List<Object> mongoAnsweredPollsList = new BasicDBList();
    mongoAnsweredPollsList.addAll(answeredPolls);
    return mongoAnsweredPollsList;
  }

  public Set<String> getSet() {
    return answeredPolls;
  }
}
