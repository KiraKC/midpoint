package com.cs32.app;

import com.mongodb.BasicDBList;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class AnsweredPolls {
  private Set<String> answeredPolls;
  public void initializeFromMongo(List<String> pollsAnswered) {
    answeredPolls = new HashSet<>(pollsAnswered);
  }

  public Object toBSON() {
    List<Object> mongoAnsweredPollsList = new BasicDBList();
    mongoAnsweredPollsList.addAll(answeredPolls);
    return mongoAnsweredPollsList;
  }
}
