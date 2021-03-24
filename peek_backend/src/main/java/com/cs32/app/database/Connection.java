package com.cs32.app.database;

import com.cs32.app.poll.Poll;
import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import org.bson.Document;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Connection {

  public static MongoClient mongoClient;
  public static MongoDatabase mongoDatabase;
  public static MongoCollection<Document> userCollection;
  public static MongoCollection<Document> pollCollection;
  public static MongoCollection<Document> responseCollection;

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

  // TODO:
  public static List<Poll> getRandomPolls(int numPolls) {
    List<Poll> randomPolls = new ArrayList<>();
    AggregateIterable<Document> samples = pollCollection.aggregate(Arrays.asList(Aggregates.sample(numPolls)));
    while (samples.iterator().hasNext()) {
      Document document = samples.iterator().next();

    }
    return randomPolls;
  }

}
