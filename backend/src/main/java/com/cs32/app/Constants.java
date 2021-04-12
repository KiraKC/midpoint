package com.cs32.app;

import java.util.*;

/**
 * Constants class.
 */
public final class Constants {
  /**
   * Private constructor never called.
   */
  private Constants() { }

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
  public static final List<String> ALL_COLORS = new ArrayList<>(Arrays.asList("#2274A5", "#D83282", "#0B5EA9", "#13BE8B",
        "#494848", "#464D77", "#E26D5A", "#F24343", "#274690", "#7F5A83", "#B33951",
        "#264779", "#B36A5E", "#344966", "#A4303F", "#CF5C36", "#70A288", "#2ABC88", "#86BBEC",
        "#246A73"));

  // Constants for get stats
  public static final String UNIDENTIFIED = "Unidentified";
  public static final Map<String, String[]> USER_GROUPINGS = new HashMap<String, String[]>() {{
      put("education", new String[]{"Elementary School", "Middle School", "High School", "Bachelors", "Masters", "PhD"});
      put("gender", new String[]{"Male", "Female", "Others"});
      put("age", new String[]{"0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"});
      put("politicalLeaning", new String[]{"Left Leaning", "Neutral", "Right Leaning"});
      put("maritalStatus", new String[]{"Married", "Unmarried"});
  }};

  // Percentage
  public static final double PERCENTAGE = 100.0;

  // Constants for testing
  public static final double DELTA = 1e-5;
}
