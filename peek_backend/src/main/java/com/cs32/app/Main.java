package com.cs32.app;

import com.cs32.app.database.Connection;
import com.cs32.app.handlers.AddPollHandler;
import com.cs32.app.handlers.AddUserHandler;
import com.cs32.app.handlers.GetSuggestedPollsHandler;
import spark.Spark;

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
    Spark.options("/*", (request, response) -> {
      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");

      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }

      return "OK";
    });

    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
//    Spark.externalStaticFileLocation("src/main/resources/static");
//    Spark.exception(Exception.class, new ExceptionPrinter());
    Spark.get("/get-suggested-polls", new GetSuggestedPollsHandler());
    Spark.post("/user/new", new AddUserHandler());
    Spark.post("/poll/new", new AddPollHandler());
  }
}