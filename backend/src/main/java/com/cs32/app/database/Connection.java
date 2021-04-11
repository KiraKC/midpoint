package com.cs32.app.database;

import com.cs32.app.User;
import com.cs32.app.exceptions.MissingDBObjectException;
import com.cs32.app.poll.Poll;
import com.cs32.app.poll.PollResponse;
import com.google.firestore.admin.v1.Index;
import com.mongodb.BasicDBObject;
import com.mongodb.client.*;
import com.mongodb.client.model.*;

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

  public Connection(Boolean isTesting) {
    mongoClient = MongoClients.create(System.getenv("MONGODB_URI"));
    mongoDatabase = mongoClient.getDatabase("main");
    if (isTesting) {
      userCollection = mongoDatabase.getCollection("user_test");
      pollCollection = mongoDatabase.getCollection("poll_test");
      responseCollection = mongoDatabase.getCollection("response_test");
    } else {
      if (System.getenv("MODE").equals("PRODUCTION")) {
        userCollection = mongoDatabase.getCollection("user");
        pollCollection = mongoDatabase.getCollection("poll");
        responseCollection = mongoDatabase.getCollection("response");
      } else {
        userCollection = mongoDatabase.getCollection("user");
        pollCollection = mongoDatabase.getCollection("poll_staging");
        responseCollection = mongoDatabase.getCollection("response_staging");
      }
    }
    List<IndexModel> indexModels  = new ArrayList<>();
    indexModels.add(new IndexModel(new Document().append("question", "text").append("answerOptions.value", "text").append("catPts.categoryName","text")));
    pollCollection.createIndexes(indexModels);
  }

  /**
   * Method for generating random polls.
   * @param numPolls num of polls to generate
   * @return a List of polls
   */
  public static List<Poll> getRandomPolls(int numPolls) throws Exception {
    List<Poll> randomPolls = new ArrayList<>();

    // Randomly sample from the MongoDB collection
    AggregateIterable<Document> mongoRandomPolls = pollCollection.aggregate(Arrays.asList(Aggregates.sample(numPolls)));
    Iterator<Document> aggregateIterable = mongoRandomPolls.iterator();
    // Transform MongoDB documents into poll objects
    int i = 0;
    while (aggregateIterable.hasNext()) {
      // Create and add poll
      System.out.println(i++);
      randomPolls.add(new Poll(aggregateIterable.next()));
    }

    return randomPolls;
  }


  public static Poll getPollById(String pollId) throws Exception {
    Document document = pollCollection.find(Filters.eq("_id", pollId)).first();
    if (document != null) {
      return (new Poll(document));
    } else {
      throw new MissingDBObjectException("Poll", "_id", pollId, "poll");
    }
  }


  public static List<PollResponse> getResponses(String pollId) {
    MongoCursor<Document> cursor = responseCollection.find(Filters.eq("pollId", pollId)).iterator();
    List<PollResponse> responses = new ArrayList<>();
    while(cursor.hasNext()) {
      responses.add(new PollResponse(cursor.next()));
    }
    return responses;
  }


  public static boolean addPollResponseToDB(PollResponse pollResponse) {
    try {
      responseCollection.insertOne(pollResponse.toBSON());
      System.out.println("adding com.cs32.app.pollResponse to db was SUCCESSFUL");
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("adding com.cs32.app.pollResponse to db failed");
      return false;
    }
    return true;
  }

  public static boolean addUserToDB(User user) {
    try {
      System.out.println("USER: " + user.toBSON());
      userCollection.insertOne(user.toBSON());
      System.out.println("adding com.cs32.app.user to db was SUCCESSFUL, userId: " + user.getId());
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("adding com.cs32.app.user to db failed, userId: \" + user.getId()");
      return false;
    }
    return true;
  }


  public static User getUserById(String id) throws MissingDBObjectException {
    BasicDBObject query = new BasicDBObject();
    query.put("_id", id);
    MongoCursor<Document> cursor = userCollection.find(query).limit(1).iterator();
    if (!cursor.hasNext()) {
      throw new MissingDBObjectException("User", "_id", id, "user");
    }
    return (new User(cursor.next()));
  }

  public static void replacePoll(Poll poll) {
    pollCollection.replaceOne(Filters.eq("_id", poll.getId()), poll.toBSON());
  }

  public static List<Poll> searchPolls(String searchString) throws Exception {
    List<Poll> searchResults = new ArrayList<>();
    MongoCursor<Document> cursor = pollCollection.find(Filters.text(searchString))
          .projection(Projections.metaTextScore("score"))
          .sort(Sorts.metaTextScore("score")).iterator();
    while (cursor.hasNext()) {
      // Create and add poll
      searchResults.add(new Poll(cursor.next()));
    }
    return searchResults;
  }

  public static List<Poll> getPollsById(Set<String> pollIds) throws Exception {
    BasicDBObject query = new BasicDBObject();
    query.put("_id", new BasicDBObject("$in", pollIds));

    List<Poll> pollsFound = new ArrayList<>();
    MongoCursor<Document> cursor = pollCollection.find(query).iterator();
    while (cursor.hasNext()) {
      // Create and add poll
      pollsFound.add(new Poll(cursor.next()));
    }
    return pollsFound;
  }

  public static void updatePollNumRenders(Poll poll) {
    BasicDBObject searchQuery = new BasicDBObject("_id", poll.getId());
    BasicDBObject updateFields = new BasicDBObject("numRenders", poll.getNumRenders());
    BasicDBObject setQuery = new BasicDBObject("$set", updateFields);
    pollCollection.updateOne(searchQuery, setQuery);
  }
}
