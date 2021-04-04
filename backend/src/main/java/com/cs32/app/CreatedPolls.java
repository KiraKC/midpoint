package com.cs32.app;

import com.mongodb.BasicDBList;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CreatedPolls {

  private Set<String> createdPolls;

  public void initializeFromMongo(List<String> pollsCreated) {
    createdPolls = new HashSet<>(pollsCreated);
  }

  public Object toBSON() {
    List<Object> mongoAnsweredPollsList = new BasicDBList();
    mongoAnsweredPollsList.addAll(createdPolls);
    return mongoAnsweredPollsList;
  }
}
