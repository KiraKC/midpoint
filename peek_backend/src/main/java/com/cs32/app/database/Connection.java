package com.cs32.app.database;

import com.cs32.app.CategoryPoints;
import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.Poll;
import com.mongodb.BasicDBList;
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

    // Transform MongoDB documents into poll objects
    while (mongoRandomPolls.iterator().hasNext()) {
      Document mongoPoll = mongoRandomPolls.iterator().next();

      // Get question
      String question = mongoPoll.getString("question");

      // Get emoji
      String emoji = mongoPoll.getString("emoji");

      // Get answer options
      List<AnswerOption> answerOptions = new ArrayList<>();
      BasicDBList mongoAnswerOptions = (BasicDBList) mongoPoll.get("answerOptions");
      for (Object object : mongoAnswerOptions) {
        Document option = (Document) object;
        answerOptions.add(new AnswerOption(option.getString("value"), option.getString("emoji")));
      }

      // Get category points
      CategoryPoints categoryPoints = new CategoryPoints();
      BasicDBList mongoCatPts = (BasicDBList) mongoPoll.get("catPts");
      for (Object object : mongoCatPts) {
        Document catPtsPair = (Document) object;
        categoryPoints.updateCatPts(catPtsPair.getString("categoryName"), catPtsPair.getDouble("points"));
      }

      // Create and add poll
      randomPolls.add(new Poll(question, emoji, answerOptions, categoryPoints));
    }

    return randomPolls;
  }

}
