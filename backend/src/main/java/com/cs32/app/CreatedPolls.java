package com.cs32.app;

import com.mongodb.BasicDBList;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CreatedPolls {

  private Set<String> createdPolls;

  public CreatedPolls(JSONArray jsonArrayPollsCreated) throws JSONException {
    createdPolls = new HashSet<>();
    for(int i = 0; i < jsonArrayPollsCreated.length(); i++){
      createdPolls.add(jsonArrayPollsCreated.getString(i));
    }
  }

  public CreatedPolls() {
    createdPolls = new HashSet<>();
  }

  public CreatedPolls(List<String> pollsCreated) {
    createdPolls = new HashSet<>();
    if (pollsCreated != null) {
      createdPolls.addAll(pollsCreated);
    }
  }

  public void add(String pollId) {
    createdPolls.add(pollId);
  }

  public Object toBSON() {
    List<Object> mongoAnsweredPollsList = new BasicDBList();
    mongoAnsweredPollsList.addAll(createdPolls);
    return mongoAnsweredPollsList;
  }

  public Set<String> getSet() {
    return createdPolls;
  }
}
