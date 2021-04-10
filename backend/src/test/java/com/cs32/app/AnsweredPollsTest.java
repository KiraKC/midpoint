package com.cs32.app;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/**
 * JUnit tests for AnsweredPolls.
 */
public class AnsweredPollsTest {
  /**
   * JUnit test for the AnsweredPolls constructor that takes in nothing.
   */
  @Test
  public void testAnsweredPollsWithConstructor1() {
    AnsweredPolls answeredPolls = new AnsweredPolls();
    assertFalse(answeredPolls.getAnsweredPolls() == null);
    assertEquals(answeredPolls.getAnsweredPolls().size(), 0);

    answeredPolls.add("ID of poll 1");
    assertEquals(answeredPolls.getAnsweredPolls().size(), 1);
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 1"));
  }

  /**
   * JUnit test for the AnsweredPolls constructor that takes in a list of poll IDs.
   */
  @Test
  public void testAnsweredPollsWithConstructor2() {
    List<String> pollsAnswered = new ArrayList<>();
    pollsAnswered.add("ID of poll 1");
    pollsAnswered.add("ID of poll 2");
    pollsAnswered.add("ID of poll 3");
    AnsweredPolls answeredPolls = new AnsweredPolls(pollsAnswered);
    assertEquals(answeredPolls.getAnsweredPolls().size(), 3);
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 1"));
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 2"));
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 3"));

    answeredPolls.add("ID of poll 4");
    assertEquals(answeredPolls.getAnsweredPolls().size(), 4);
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 1"));
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 2"));
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 3"));
    assertTrue(answeredPolls.getAnsweredPolls().contains("ID of poll 4"));
  }
}
