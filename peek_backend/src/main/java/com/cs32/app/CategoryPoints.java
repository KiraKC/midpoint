package com.cs32.app;

import com.google.gson.annotations.Expose;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    for(String category : Constants.ALL_CATEGORIES) {
      if (!catPtsMap.containsKey(category)) {
        catPtsMap.put(category, 0.0);
      }
    }
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
}
