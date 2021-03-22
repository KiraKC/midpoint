package com.cs32.app;

public class Main {

  private static final int DEFAULT_PORT = 4567;
  private String[] args;

  public Main(String[] args) {
    this.args = args;
  }

  public void run() {
    // Parse command line arguments
//    OptionParser parser = new OptionParser();
//    parser.accepts("gui");
//    parser.accepts("port").withRequiredArg().ofType(Integer.class)
//          .defaultsTo(DEFAULT_PORT);
//    OptionSet options = parser.parse(args);
    System.out.println("hi");
  }

}