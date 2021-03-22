package com.cs32.app;

import com.cs32.app.database.Connection;
import spark.Spark;

import java.net.UnknownHostException;

public class Main {

  private static final int DEFAULT_PORT = 4567;
  private final String[] args;

  public Main(String[] args) {
    this.args = args;
  }

  public void run() {
    Connection conn = new Connection();
    System.out.println("correctly executed");
    this.runSparkServer(DEFAULT_PORT);
  }


  private void runSparkServer(int port) {
    Spark.port(port);
//    Spark.externalStaticFileLocation("src/main/resources/static");
//    Spark.exception(Exception.class, new ExceptionPrinter());
    Spark.post("/get-suggested-polls", new GetSuggestedPollsHandler());
    Spark.post("/user/new", new AddUserHandler());
  }
}