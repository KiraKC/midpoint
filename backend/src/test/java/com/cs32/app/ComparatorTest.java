package com.cs32.app;

import com.cs32.app.algorithm.ClickRateComparator;
import com.cs32.app.algorithm.RelevancyComparator;
import com.cs32.app.poll.Poll;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * JUnit tests for comparators.
 */
public class ComparatorTest {
  /**
   * Junit test for ClickRateComparator.
   */
  @Test
  public void testClickRateComparator() {
    ClickRateComparator comparator = new ClickRateComparator();
    Poll p1 = new Poll("poll 1", "some emoji", new ArrayList<>(), new CategoryPoints(), "some color", "some image url");
    Poll p2 = new Poll("poll 2", "some emoji", new ArrayList<>(), new CategoryPoints(), "some color", "some image url");

    // p1 and p2 both have starting click rate of 0.5
    assertEquals(comparator.compare(p1, p1), 0);
    assertEquals(comparator.compare(p1, p2), 0);

    p1.rendered();
    p1.clicked();
    // p1 now has a click rate of 1
    assertEquals(comparator.compare(p1, p2), -1);

    p1.rendered();
    // p1 again has a click rate of 0.5
    assertEquals(comparator.compare(p1, p2), 0);

    p1.rendered();
    // p1 now has a click rate of 0.3333
    assertEquals(comparator.compare(p1, p2), 1);
  }

  /**
   * JUnit test for RelevancyComparator.
   */
  @Test
  public void testRelevancyComparator() {
    // Create a user interested in sports, politics and funny
    List<String> userTags = new ArrayList<>();
    userTags.add("sports");
    userTags.add("politics");
    userTags.add("funny");
    CategoryPoints userCatPts = new CategoryPoints(userTags);

    RelevancyComparator comparator = new RelevancyComparator(userCatPts);

    // Create a poll very very very related to the user
    Poll p1 = new Poll("poll 1", "some emoji", new ArrayList<>(), userCatPts, "some color", "some image url");

    // Create a poll kind of related to the user
    List<String> p2Tags = new ArrayList<>();
    p2Tags.add("sports");
    p2Tags.add("politics");
    p2Tags.add("culture");
    CategoryPoints p2CatPts = new CategoryPoints(p2Tags);
    Poll p2 = new Poll("poll 2", "some emoji", new ArrayList<>(), p2CatPts, "some color", "some image url");

    // Create a poll not related to the user
    List<String> p3Tags = new ArrayList<>();
    p3Tags.add("culture");
    p3Tags.add("entertainment");
    p3Tags.add("food");
    CategoryPoints p3CatPts = new CategoryPoints(p3Tags);
    Poll p3 = new Poll("poll 3", "some emoji", new ArrayList<>(), p3CatPts, "some color", "some image url");

    // By relevancy, p1 > p2 > p3
    assertEquals(comparator.compare(p1, p1), 0);
    assertEquals(comparator.compare(p1, p2), -1);
    assertEquals(comparator.compare(p2, p3), -1);
  }
}
