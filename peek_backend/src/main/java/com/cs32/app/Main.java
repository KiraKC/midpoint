<<<<<<< HEAD
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
=======
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
//    Spark.externalStaticFileLocation("src/main/resources/static");
//    Spark.exception(Exception.class, new ExceptionPrinter());
    Spark.post("/get-suggested-polls", new GetSuggestedPollsHandler());
    Spark.post("/user/new", new AddUserHandler());
    Spark.post("/poll/new", new AddPollHandler());
  }
>>>>>>> 6c2bd631eefbfc29e6a01907e292e74085157b4b
}