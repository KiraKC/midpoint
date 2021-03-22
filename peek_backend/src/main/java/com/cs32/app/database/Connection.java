package com.cs32.app.database;

import com.mongodb.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.net.UnknownHostException;

public class Connection {

  public static MongoClient mongoClient;
  public static MongoDatabase mongoDatabase;

  public Connection() {
    String connectionString = System.getProperty("mongodb.uri");
    mongoClient = MongoClients.create(connectionString);
    mongoDatabase = mongoClient.getDatabase("main");
    dummyQuery();
  }

  public static void dummyQuery() {
    MongoCollection<Document> collection = mongoDatabase.getCollection("user");
    System.out.println(collection);
    System.out.println("adding new document");
    Document user = new Document("_id", "jeeeeo1sdfsdfsdfsfdsdf11");
    user.append("name", "Jo Bloggs");
    collection.insertOne(user);
  }
}
