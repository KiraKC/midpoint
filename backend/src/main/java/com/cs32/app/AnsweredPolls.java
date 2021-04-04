package com.cs32.app;

import com.mongodb.BasicDBList;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class AnsweredPolls {
  private Set<String> answeredPolls;

  public AnsweredPolls(JSONArray jsonArrayAnsweredPolls) throws JSONException {
    answeredPolls = new HashSet<>();
    for(int i = 0; i < jsonArrayAnsweredPolls.length(); i++){
      answeredPolls.add(jsonArrayAnsweredPolls.getString(i));
    }
  }

  public AnsweredPolls() {
    answeredPolls = new HashSet<>();
  }

  public AnsweredPolls(List<String> pollsAnswered) {
    answeredPolls = new HashSet<>();
    if (pollsAnswered != null) {
      answeredPolls.addAll(pollsAnswered);
    }
  }

  public Object toBSON() {
    List<Object> mongoAnsweredPollsList = new BasicDBList();
    mongoAnsweredPollsList.addAll(answeredPolls);
    return mongoAnsweredPollsList;
  }
}
