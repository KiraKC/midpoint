package com.cs32.app;

import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.Poll;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/**
 * JUnit tests for Poll and AnswerOption.
 */
public class PollTest {
  /**
   * JUnit test for Poll.
   */
  @Test
  public void testPoll() {
    List<AnswerOption> answerOptions = new ArrayList<>();
    answerOptions.add(new AnswerOption("answer 1", "some emoji"));
    answerOptions.add(new AnswerOption("answer 2", "some emoji"));
    List<String> pollTags = new ArrayList<>();
    pollTags.add("sports");
    pollTags.add("politics");
    pollTags.add("funny");
    CategoryPoints pollCatPts = new CategoryPoints(pollTags);
    Poll poll = new Poll("some question", "some emoji", answerOptions, pollCatPts,
        "some color", "some image url", "some creator id", null);

    assertFalse(poll.getId() == null);
    assertEquals(poll.getAnswerOptions().size(), 2);
    assertTrue(poll.getCatPts().getMap().get("sports") > 0);
    assertFalse(poll.getCatPts().getMap().get("culture") > 0);

    assertEquals(poll.getNumRenders(), 1);
    assertEquals(poll.getNumClicks(), 0);
    assertEquals(poll.getClickRate(), 0, Constants.DELTA);

    poll.clicked();
    assertEquals(poll.getNumRenders(), 1);
    assertEquals(poll.getNumClicks(), 1);
    assertEquals(poll.getClickRate(), 1, Constants.DELTA);

    poll.rendered();
    assertEquals(poll.getNumRenders(), 2);
    assertEquals(poll.getNumClicks(), 1);
    assertEquals(poll.getClickRate(), 0.5, Constants.DELTA);

    poll.rendered();
    assertEquals(poll.getNumRenders(), 3);
    assertEquals(poll.getNumClicks(), 1);
    assertEquals(poll.getClickRate(), 1.0 / 3.0, Constants.DELTA);

    assertEquals(poll.calculateDisparity(pollCatPts), 0, Constants.DELTA);

    List<String> userTags = new ArrayList<>();
    userTags.add("sports");
    userTags.add("politics");
    userTags.add("culture");
    CategoryPoints userCatPts = new CategoryPoints(userTags);
    assertEquals(poll.calculateDisparity(userCatPts), 2.0/3.0, Constants.DELTA);
  }

  /**
   * JUnit test for AnswerOption.
   */
  @Test
  public void testAnswerOption() {
    AnswerOption o1 = new AnswerOption("option 1", "some emoji");
    AnswerOption o2 = new AnswerOption("606e8afb5cd92f1e571bfc42", "option 2", "some emoji");

    assertFalse(o1.getId() == null);
    assertEquals(o1.getValue(), "option 1");
    assertEquals(o1.getEmoji(), "some emoji");

    assertEquals(o2.getId(), "606e8afb5cd92f1e571bfc42");
    assertEquals(o2.getValue(), "option 2");
    assertEquals(o2.getEmoji(), "some emoji");
  }
}
