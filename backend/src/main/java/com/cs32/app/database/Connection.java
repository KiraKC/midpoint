package com.cs32.app.database;

import com.cs32.app.AnsweredPolls;
import com.cs32.app.CreatedPolls;
import com.cs32.app.User;
import com.cs32.app.exceptions.FailedDBWriteException;
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
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
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

  private final MongoClient mongoClient;
  private final MongoDatabase mongoDatabase;
  private final MongoCollection<Document> userCollection;
  private final MongoCollection<Document> pollCollection;
  private final MongoCollection<Document> responseCollection;

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
        .append("answerOptions.value", "text")));
    pollCollection.createIndexes(indexModels);

    // ONLY COMMENT OUT FOR RESETTING DATABASE
//    Connection.resetDatabase("V77u9JfMcjZDfPAlqpU5ldbMkyV2");
  }

  /**
   * Getter method for user collection.
   * @return user collection
   */
  public MongoCollection<Document> getUserCollection() {
    return userCollection;
  }

  /**
   * Getter method for poll collection.
   * @return poll collection
   */
  public MongoCollection<Document> getPollCollection() {
    return pollCollection;
  }

  /**
   * Method for generating random polls.
   * @param numPolls num of polls to generate
   * @return a List of polls
   */
  public List<Poll> getRandomPolls(int numPolls) throws Exception {
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
      randomPolls.add(new Poll(aggregateIterable.next(), this));
    }

    return randomPolls;
  }

  /**
   * Method for getting a poll by ID from MongoDB.
   * @param pollId poll ID
   * @return a Poll object instantiated from a MongoDB document
   * @throws Exception exception
   */
  public Poll getPollById(String pollId) throws MissingDBObjectException {
    Document document = pollCollection.find(Filters.eq("_id", pollId)).first();
    if (document != null) {
      return (new Poll(document, this));
    } else {
      throw new MissingDBObjectException("Poll", "_id", pollId, "poll");
    }
  }

  /**
   * Method for getting all the responses for a poll by ID.
   * @param pollId poll ID
   * @return a list of PollResponse objects
   */
  public List<PollResponse> getResponses(String pollId) {
    MongoCursor<Document> cursor = responseCollection.find(Filters.eq("pollId", pollId)).iterator();
    List<PollResponse> responses = new ArrayList<>();
    while (cursor.hasNext()) {
      responses.add(new PollResponse(cursor.next(), this));
    }
    return responses;
  }

  /**
   * Method for adding a poll response to MongoDB.
   * @param pollResponse a PollResponse object
   * @return a boolean indicating whether the process is successful
   */
  public boolean addPollResponseToDB(PollResponse pollResponse) {
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
  public boolean addUserToDB(User user) {
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
  public User getUserById(String id) throws MissingDBObjectException {
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
  public void replacePoll(Poll poll) {
    pollCollection.replaceOne(Filters.eq("_id", poll.getId()), poll.toBSON());
  }

  /**
   * Method for searching polls in MongoDB given a search string.
   * @param searchString a string to search
   * @return a list of Poll objects
   * @throws Exception exception
   */
  public List<Poll> searchPolls(String searchString) throws Exception {
    List<Poll> searchResults = new ArrayList<>();
    MongoCursor<Document> cursor = pollCollection.find(Filters.text(searchString))
          .projection(Projections.metaTextScore("score"))
          .sort(Sorts.metaTextScore("score")).iterator();
    while (cursor.hasNext()) {
      // Create and add poll
      searchResults.add(new Poll(cursor.next(), this));
    }
    return searchResults;
  }

  /**
   * Method for getting polls by IDs.
   * @param pollIds a set of poll IDs
   * @return a list of Poll objects
   * @throws Exception exception
   */
  public List<Poll> getPollsById(Set<String> pollIds) throws Exception {
    BasicDBObject query = new BasicDBObject();
    query.put("_id", new BasicDBObject("$in", pollIds));

    List<Poll> pollsFound = new ArrayList<>();
    MongoCursor<Document> cursor = pollCollection.find(query).iterator();
    while (cursor.hasNext()) {
      // Create and add poll
      pollsFound.add(new Poll(cursor.next(), this));
    }
    return pollsFound;
  }

  /**
   * Method for updating a poll's number of renders.
   * @param poll a poll object
   */
  public void updatePollNumRenders(Poll poll) {
    BasicDBObject searchQuery = new BasicDBObject("_id", poll.getId());
    BasicDBObject updateFields = new BasicDBObject("numRenders", poll.getNumRenders());
    BasicDBObject setQuery = new BasicDBObject("$set", updateFields);
    pollCollection.updateOne(searchQuery, setQuery);
  }

  public boolean deleteResponses(String pollId) throws FailedDBWriteException {
    BasicDBObject query = new BasicDBObject();
    query.put("pollId", pollId);
    DeleteResult deleteResult = this.responseCollection.deleteMany(query);
    if (deleteResult.wasAcknowledged()) {
      return true;
    } else {
      throw new FailedDBWriteException("response", "delete", "responseCollection");
    }
  }

  public boolean deletePoll(String pollId) throws FailedDBWriteException {
    BasicDBObject pollSearchQuery = new BasicDBObject();
    pollSearchQuery.put("_id", pollId);
    DeleteResult deleteResult = this.pollCollection.deleteOne(pollSearchQuery);
    if (!deleteResult.wasAcknowledged()) {
      throw new FailedDBWriteException("response", "delete", "responseCollection");
    }
    BasicDBObject userSearchQuery = new BasicDBObject();
    BasicDBObject updateFields = new BasicDBObject();
    updateFields.append("createdPolls", pollId);
    updateFields.append("answeredPolls", pollId);
    BasicDBObject updateQuery = new BasicDBObject("$pull", updateFields);
    this.updateUsers(userSearchQuery, updateQuery);
    return true;
  }

  public boolean updateUsers(BasicDBObject searchQuery, BasicDBObject updateQuery) throws
      FailedDBWriteException {
    UpdateResult updateResult = userCollection.updateMany(searchQuery, updateQuery);
    if (updateResult.wasAcknowledged()) {
      System.out.println("Updating user data SUCCESSFUL.");
      return true;
    } else {
      throw new FailedDBWriteException("user", "update", "userCollection");
    }
  }

  public void resetDatabase(String megaCreatorId) {
    try {
      // reset all user answeredPolls
      BasicDBObject searchQuery = new BasicDBObject();
      BasicDBObject updateFields = new BasicDBObject("answeredPolls", new AnsweredPolls().toBSON());
      updateFields.append("createdPolls", new CreatedPolls().toBSON());
      BasicDBObject updateQuery = new BasicDBObject("$pull", updateFields);
      this.updateUsers(searchQuery, updateQuery);

      // give all polls to megaUser
      CreatedPolls megaUsersCreatedPolls = new CreatedPolls();
      MongoCursor<Document> pollCursor = pollCollection.find().iterator();
      List<Poll> allPolls = new ArrayList<>();
      List<String> allPollIds = new ArrayList<>();
      while (pollCursor.hasNext()) {
        Poll newPoll = new Poll(pollCursor.next(), this);
        allPolls.add(newPoll);
        megaUsersCreatedPolls.add(newPoll.getId());
        allPollIds.add(newPoll.getId());
      }
      searchQuery = new BasicDBObject("_id", megaCreatorId);
      updateFields = new BasicDBObject("createdPolls", megaUsersCreatedPolls.toBSON());
      updateQuery = new BasicDBObject("$set", updateFields);
      this.updateUsers(searchQuery, updateQuery);

      // delete all responses by dropping collection
      responseCollection.drop();

      // reset all numClicks and numRenders
      searchQuery = new BasicDBObject();
      updateFields = new BasicDBObject("numClicks", 0).append("numRenders", 0);
      updateQuery = new BasicDBObject("$set", updateFields);
      pollCollection.updateMany(searchQuery, updateQuery);

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
