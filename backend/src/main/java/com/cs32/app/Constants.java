package com.cs32.app;

/**
 * Constants class.
 */
public class Constants {
  // All category tags
  public static final String[] ALL_CATEGORIES = {"sports", "politics", "funny", "culture",
      "entertainment", "food", "education", "serious", "relationship", "cute", "lifestyle",
      "news", "nature", "health", "beauty", "entrepreneurship", "gaming", "movies",
      "celebrities", "science", "business", "books", "design", "technology", "fashion",
      "history", "music", "languages", "religion", "personal"};

  // Constants for initializing category points
  public static final double INITIAL_NEW_POLL_CAT_PTS = 1000.0;
  public static final double UNTAGGED_CAT_STARTING_PTS = INITIAL_NEW_POLL_CAT_PTS
      / ALL_CATEGORIES.length;

  // Constants for updating category points
  public static final double UPDATE_CAT_PTS_FACTOR_USER = 30.0;
  public static final double UPDATE_CAT_PTS_FACTOR_POLL = 100.0;

  // Constants for generating poll feeds
  public static final int NUM_QUERIED_POLLS_PER_REQUESTED = 3;
  public static final double QUERY_RAND_POLLS_RELEVANCY_PORTION = 0.7;
  public static final double QUERY_RAND_POLLS_CLICK_RATE_PORTION = 0.2;
  public static final String[] ALL_COLORS = {"#2274A5", "#D83282", "#0B5EA9", "#13BE8B",
      "#494848", "#464D77", "#E26D5A", "#F24343", "#274690", "#7F5A83", "#B33951",
      "#264779", "#B36A5E", "#344966", "#A4303F", "#CF5C36", "#70A288", "#2ABC88", "#86BBEC",
      "#246A73"};

  // Percentage
  public static final double PERCENTAGE = 100.0;

  // Constants for testing
  public static final double DELTA = 1e-5;
}
