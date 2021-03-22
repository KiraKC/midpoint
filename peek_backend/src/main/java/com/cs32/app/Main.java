package com.cs32.app;

import joptsimple.OptionParser;
import joptsimple.OptionSet;
import spark.Request;
import spark.Spark;

public class Main {

  private static final int DEFAULT_PORT = 4567;
  private String[] args;

  public Main(String[] args) {
    this.args = args;
  }

  public void run() {
    // Parse command line arguments
//    Spark.get("/stars", null);
    OptionParser parser = new OptionParser();
    parser.accepts("gui");
    parser.accepts("port").withRequiredArg().ofType(Integer.class)
          .defaultsTo(DEFAULT_PORT);
    OptionSet options = parser.parse(args);
    System.out.println("hi");
  }

  private void runSparkServer(int port) {
    Spark.port(port);
//    Spark.externalStaticFileLocation("src/main/resources/static");
//    Spark.exception(Exception.class, new ExceptionPrinter());
  }
}