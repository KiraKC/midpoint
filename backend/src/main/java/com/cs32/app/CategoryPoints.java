package com.cs32.app;

import com.google.gson.annotations.Expose;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.*;

/**
 * CategoryPoints class that stores category points for users and polls.
 */
public class CategoryPoints {
  @Expose
  Map<String, Double> catPtsMap;

  /**
   * Constructor when creating CatPtsWrapper with only tagged categories
   * for users and polls.
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
   * Constructor when creating CatPtsWrapper with Json object.
   * @param jsonTaggedCategories
   * @throws JSONException
   */
  public CategoryPoints(JSONArray jsonTaggedCategories) throws JSONException {
    List<String> taggedCategories = new ArrayList<>();
    for (int i = 0; i < jsonTaggedCategories.length(); i++) {
      taggedCategories.add(jsonTaggedCategories.getString(i));
    }
    System.out.println(taggedCategories);
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
   * Method for initializing the category points from MongoDB.
   * @param mongoCatPts a list of MongoDB document of category points
   */
  public boolean initializeFromMongo(List<Document> mongoCatPts) {
    Set<String> categories = new HashSet<>(Arrays.asList(Constants.ALL_CATEGORIES));
    for (Document doc : mongoCatPts) {
      updateCatPts(doc.getString("categoryName"), doc.getDouble("points"));
      categories.remove(doc.getString("categoryName"));
    }
    // autofix
    if (categories.size() > 0) {
      for (String remainingCategories : categories) {
        updateCatPts(remainingCategories, 0.0);
      }
      return true;
    }
    return false;
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
   * @return the map of category points
   */
  public Map<String, Double> getMap() {
    return catPtsMap;
  }

  /**
   * Getter method for the points of a certain category.
   * @param category category
   * @return the points of a certain category
   */
  public Double getPts(String category) {
    return catPtsMap.get(category);
  }

  /**
   * Getter method for the normalized points of a certain category.
   * @param category category
   * @return the normalized points of a certain category
   */
  public Double getNormPts(String category) {
    return catPtsMap.get(category)/this.getTotalPts();
  }

  /**
   * Getter method for total points.
   * @return total points
   */
  public Double getTotalPts() {
    Double totalPts = 0.0;
    for(Double pts : catPtsMap.values()) {
      totalPts += pts;
    }
    return totalPts;
  }

  /**
   * Method for transforming the CategoryPoints object to Bson object.
   * @return a Bson object of category points
   */
  public List<Document> toBSON() {
    List<Document> mongoCatPts = new ArrayList<>();
    for (Map.Entry<String,Double> entry : catPtsMap.entrySet()) {
      mongoCatPts.add(new Document("categoryName", entry.getKey())
            .append("points", entry.getValue()));
    }
    return mongoCatPts;
  }
}
