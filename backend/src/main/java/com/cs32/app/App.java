package com.cs32.app;

/**
 * Hello world!
 */
public final class App {
  /**
   * Private constructor never called.
   */
  private App() { }

  /**
   * Hello world!
   * @param args arguments
   */
  public static void main(String[] args) {
    try {
      new Main(args).run();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      System.exit(-1);
    }
  }
}
