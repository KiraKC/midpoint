package com.cs32.app;

import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

/**
 * JUnit tests for CategoryPoints.
 */
public class CategoryPointsTest {
  @Test
  public void testCategoryPointsConstructorWithEmptyList() {
    CategoryPoints categoryPoints = new CategoryPoints(new ArrayList<>());
    assertFalse(categoryPoints.getMap() == null);
    assertEquals(categoryPoints.getMap().size(), Constants.ALL_CATEGORIES.length);
    assertEquals(categoryPoints.getPts("sports"), Constants.UNTAGGED_CAT_STARTING_PTS, Constants.DELTA);
    assertEquals(categoryPoints.getNormPts("sports"), 1.0/Constants.ALL_CATEGORIES.length, Constants.DELTA);
    assertEquals(categoryPoints.getTotalPts(), Constants.INITIAL_NEW_POLL_CAT_PTS, Constants.DELTA);

    categoryPoints.updateCatPts("sports", 0);
    assertEquals(categoryPoints.getMap().size(), Constants.ALL_CATEGORIES.length);
    assertEquals(categoryPoints.getPts("sports"), 0, Constants.DELTA);
    assertEquals(categoryPoints.getNormPts("sports"), 0, Constants.DELTA);
    assertEquals(categoryPoints.getPts("politics"), Constants.UNTAGGED_CAT_STARTING_PTS, Constants.DELTA);
    assertEquals(categoryPoints.getNormPts("politics"), 1.0/(Constants.ALL_CATEGORIES.length-1), Constants.DELTA);
    assertEquals(categoryPoints.getTotalPts(), Constants.INITIAL_NEW_POLL_CAT_PTS - Constants.UNTAGGED_CAT_STARTING_PTS, Constants.DELTA);
  }

  @Test
  public void testCategoryPointsConstructorForMongoDB() {
    CategoryPoints categoryPoints = new CategoryPoints();
    assertFalse(categoryPoints.getMap() == null);
    assertEquals(categoryPoints.getMap().size(), 0);
  }
}
