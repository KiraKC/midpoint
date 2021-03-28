package com.cs32.app;

import com.google.gson.annotations.Expose;

import java.util.*;

public class CategoryPoints {
  @Expose
  Map<String, Double> catPtsMap;
  /**
   * Constructor when creating CatPtsWrapper with only tagged categories from user.
   */
  public CategoryPoints(List<String> taggedCategories) {
    catPtsMap = new HashMap<>();
    for(String taggedCategory : taggedCategories) {
      catPtsMap.put(taggedCategory, Constants.INITIAL_NEW_POLL_CAT_PTS/taggedCategories.size());
    }
    Double startingPts = 0.0;
    if (taggedCategories.size() == 0) {
      startingPts = Constants.UNTAGGED_CAT_STARTING_PTS;
    }
    for(String category : Constants.ALL_CATEGORIES) {
      if (!catPtsMap.containsKey(category)) {
        catPtsMap.put(category, startingPts);
      }
    }
  }

  /**
   * Constructor when creating CatPtsWrapper from MongoDB Database.
   */
  public CategoryPoints() {
    catPtsMap = new HashMap<>();
  }

  /**
   * Method for updating category points.
   * @param category category name
   * @param points category points
   */
  public void updateCatPts (String category, double points) {
    catPtsMap.put(category, points);
  }

  /**
   * Getter method for the map.
   * @return
   */
  public Map<String, Double> getMap() {
    return catPtsMap;
  }

  // TODO: use getTotalPts()
  public Double getNormPts(String category, Double totalPts) {
    return catPtsMap.get(category)/totalPts;
  }

  public Double getTotalPts() {
    Double totalPts = 0.0;
    for(Double pts : catPtsMap.values()) {
      totalPts += pts;
    }
    return totalPts;
  }

}
