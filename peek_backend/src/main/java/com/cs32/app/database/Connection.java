package com.cs32.app.database;

import com.cs32.app.CategoryPoints;
import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.Poll;
import com.mongodb.BasicDBList;
import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import org.bson.Document;

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

  // TODO: Test if this works
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
      Document mongoPoll = aggregateIterable.next();

      // Get question
      String question = mongoPoll.getString("question");

      // Get emoji
      String emoji = mongoPoll.getString("emoji");

      // Get answer options
      List<AnswerOption> answerOptions = new ArrayList<>();
      List<Document> mongoAnswerOptions = (List<Document>) mongoPoll.get("answerOptions");
      for (Document doc : mongoAnswerOptions) {
        answerOptions.add(new AnswerOption(doc.getString("value"), doc.getString("emoji")));
      }

      // Get category points
      CategoryPoints categoryPoints = new CategoryPoints();
      List<Document> mongoCatPts = (List<Document>) mongoPoll.get("catPts");
      for (Document doc : mongoCatPts) {
        categoryPoints.updateCatPts(doc.getString("categoryName"), doc.getDouble("points"));
      }

      // Create and add poll
      randomPolls.add(new Poll(question, emoji, answerOptions, categoryPoints));
    }

    return randomPolls;
  }

}
