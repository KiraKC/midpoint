package com.cs32.app;

public class Constants {
  public static final String[] ALL_CATEGORIES = {"cute", "funny", "lifestyle", "news", "nature",
      "politics", "health", "beauty", "entrepreneurship", "gaming", "movies", "celebrities", "sports",
      "science", "business", "books", "culture", "design", "technology", "fashion", "history", "music",
      "languages"};
  public static final Double INITIAL_NEW_POLL_CAT_PTS = 1000.0;
  public static final Integer ALGORITHM_RANDOM_POLL_BATCH_SZ = 70;
  public static final Double STARTING_CLICKRATE = 0.5;
  public static final Double UNTAGGED_CAT_STARTING_PTS = INITIAL_NEW_POLL_CAT_PTS/ALL_CATEGORIES.length;

  // Constants for generating poll feeds
  public static final int NUM_QUERIED_POLLS_PER_REQUESTED = 3;
  public static final Double QUERY_RAND_POLLS_RELEVANCY_PORTION = 0.5;
  public static final Double QUERY_RAND_POLLS_CLICK_RATE_PORTION = 0.25;
  public static final Double QUERY_RAND_POLLS_RANDOM_PORTION = 0.25;
}
