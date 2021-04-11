package com.cs32.app.database;

import com.cs32.app.User;
import com.cs32.app.exceptions.MissingDBObjectException;
import com.cs32.app.poll.Poll;
import com.cs32.app.poll.PollResponse;
import com.mongodb.BasicDBObject;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.model.IndexModel;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;
import org.bson.Document;

import java.util.List;
import java.util.Set;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

/**
 * Connection class that has access to our MongoDB database.
 */
public class Connection {

  public static MongoClient mongoClient;
  public static MongoDatabase mongoDatabase;
  public static MongoCollection<Document> userCollection;
  public static MongoCollection<Document> pollCollection;
  public static MongoCollection<Document> responseCollection;

  /**
   * Constructor.
   * @param isTesting a boolean indicating whether to access the test dataset
   */
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
    indexModels.add(new IndexModel(new Document().append("question", "text")
        .append("answerOptions.value", "text").append("catPts.categoryName", "text")));
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
    AggregateIterable<Document> mongoRandomPolls = pollCollection
        .aggregate(Arrays.asList(Aggregates.sample(numPolls)));
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

  /**
   * Method for getting a poll by ID from MongoDB.
   * @param pollId poll ID
   * @return a Poll object instantiated from a MongoDB document
   * @throws Exception exception
   */
  public static Poll getPollById(String pollId) throws Exception {
    Document document = pollCollection.find(Filters.eq("_id", pollId)).first();
    if (document != null) {
      return (new Poll(document));
    } else {
      throw new MissingDBObjectException("Poll", "_id", pollId, "poll");
    }
  }

  /**
   * Method for getting all the responses for a poll by ID.
   * @param pollId poll ID
   * @return a list of PollResponse objects
   */
  public static List<PollResponse> getResponses(String pollId) {
    MongoCursor<Document> cursor = responseCollection.find(Filters.eq("pollId", pollId)).iterator();
    List<PollResponse> responses = new ArrayList<>();
    while (cursor.hasNext()) {
      responses.add(new PollResponse(cursor.next()));
    }
    return responses;
  }

  /**
   * Method for adding a poll response to MongoDB.
   * @param pollResponse a PollResponse object
   * @return a boolean indicating whether the process is successful
   */
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

  /**
   * Method for adding a user to MongoDB.
   * @param user a User object
   * @return a boolean indicating whether the process is successful
   */
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

  /**
   * Method for getting a user by ID.
   * @param id user ID
   * @return a User object instantiated from a MongoDB document
   * @throws MissingDBObjectException missing MongoDB object exception
   */
  public static User getUserById(String id) throws MissingDBObjectException {
    BasicDBObject query = new BasicDBObject();
    query.put("_id", id);
    MongoCursor<Document> cursor = userCollection.find(query).limit(1).iterator();
    if (!cursor.hasNext()) {
      throw new MissingDBObjectException("User", "_id", id, "user");
    }
    return (new User(cursor.next()));
  }

  /**
   * Method for replacing a poll in MongoDB.
   * @param poll a Poll object
   */
  public static void replacePoll(Poll poll) {
    pollCollection.replaceOne(Filters.eq("_id", poll.getId()), poll.toBSON());
  }

  /**
   * Method for searching polls in MongoDB given a search string.
   * @param searchString a string to search
   * @return a list of Poll objects
   * @throws Exception exception
   */
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

  /**
   * Method for getting polls by IDs.
   * @param pollIds a set of poll IDs
   * @return a list of Poll objects
   * @throws Exception exception
   */
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

  /**
   * Method for updating a poll's number of renders.
   * @param poll a poll object
   */
  public static void updatePollNumRenders(Poll poll) {
    BasicDBObject searchQuery = new BasicDBObject("_id", poll.getId());
    BasicDBObject updateFields = new BasicDBObject("numRenders", poll.getNumRenders());
    BasicDBObject setQuery = new BasicDBObject("$set", updateFields);
    pollCollection.updateOne(searchQuery, setQuery);
  }
}
