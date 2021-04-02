package com.cs32.app.database;

import com.cs32.app.exceptions.MissingDBObjectException;
import com.cs32.app.poll.Poll;
import com.cs32.app.poll.PollResponse;
import com.mongodb.BasicDBObject;
import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Connection {

  public static MongoClient mongoClient;
  public static MongoDatabase mongoDatabase;
  public static MongoCollection<Document> userCollection;
  public static MongoCollection<Document> pollCollection;
  public static MongoCollection<Document> responseCollection;

  // TODO: @Jacqueline Change connection from static class to regular non-static class that needs to be instantiated and passed around like a normal class.
  // this change allows us to have a test and production version of our Connection class. (rmbr to change both instance variables and methods to non-static)

  public Connection() {
    String connectionString = System.getProperty("mongodb.uri");
    mongoClient = MongoClients.create(connectionString);
    mongoDatabase = mongoClient.getDatabase("main");
    userCollection = mongoDatabase.getCollection("user");
    pollCollection = mongoDatabase.getCollection("poll");
    responseCollection = mongoDatabase.getCollection("response");
    dummyGetQuery();
  }

  public static void dummyAddQuery(String password) {
    System.out.println("adding new document");
    try {
      Document user = new Document("_id", (int) (Math.random() * 100000));
      user.append("password", password);
      userCollection.insertOne(user);
    } catch (Exception e) {
      System.out.println("failed");
    }
    System.out.println("success in insertion");
  }

  public static void dummyGetQuery() {
    Document user = userCollection.find(new Document("_id", 10003)).first();
    System.out.println("User 1: " + user.toJson());
  }

  /**
   * Method for generating random polls.
   * @param numPolls num of polls to generate
   * @return a List of polls
   */
  public static List<Poll> getRandomPolls(int numPolls) {
    List<Poll> randomPolls = new ArrayList<>();

    // Randomly sample from the MongoDB collection
    AggregateIterable<Document> mongoRandomPolls = pollCollection.aggregate(Arrays.asList(Aggregates.sample(numPolls)));
    Iterator<Document> aggregateIterable = mongoRandomPolls.iterator();
    // Transform MongoDB documents into poll objects
    while (aggregateIterable.hasNext()) {
      // Create and add poll
      randomPolls.add(new Poll(aggregateIterable.next()));
    }

    return randomPolls;
  }


  public static Poll getPollById(String pollId) throws MissingDBObjectException {
    BasicDBObject query = new BasicDBObject();
    query.put("_id", new ObjectId(pollId));
    MongoCursor<Document> cursor = pollCollection.find(query).limit(1).iterator();
    if (!cursor.hasNext()) {
      throw new MissingDBObjectException("Poll", "_id", pollId, "poll");
    }
    return (new Poll(cursor.next()));
  }


  // TODO: test this
  public static List<PollResponse> getResponses(String pollId) {
    BasicDBObject query = new BasicDBObject();
    query.put("pollId", pollId);
    MongoCursor<Document> cursor = pollCollection.find(query).iterator();
    List<PollResponse> listOfResponses = new ArrayList<>();
    while(cursor.hasNext()) {
      listOfResponses.add(new PollResponse(cursor.next()));
    }
    return listOfResponses;
  }


  public static boolean addPollResponseToDB(PollResponse pollResponse) {
    try {
      pollCollection.insertOne(pollResponse.toBSON());
      System.out.println("adding com.cs32.app.pollResponse to db was SUCCESSFUL");
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("adding com.cs32.app.pollResponse to db failed");
      return false;
    }
    return true;
  }

}
