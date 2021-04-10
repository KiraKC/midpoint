package com.cs32.app;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/**
 * JUnit tests for CreatedPolls.
 */
public class CreatedPollsTest {
  @Test
  public void testCreatedPollsWithConstructor1() {
    CreatedPolls createdPolls = new CreatedPolls();
    assertFalse(createdPolls.getCreatedPolls() == null);
    assertEquals(createdPolls.getCreatedPolls().size(), 0);

    createdPolls.add("ID of poll 1");
    assertEquals(createdPolls.getCreatedPolls().size(), 1);
    assertTrue(createdPolls.getCreatedPolls().contains("ID of poll 1"));
  }

  @Test
  public void testCreatedPollsWithConstructor2() {
    CreatedPolls createdPolls1 = new CreatedPolls(new ArrayList<>());
    assertFalse(createdPolls1.getCreatedPolls() == null);
    assertEquals(createdPolls1.getCreatedPolls().size(), 0);

    List<String> pollsCreated = new ArrayList<>();
    pollsCreated.add("ID of poll 1");
    pollsCreated.add("ID of poll 2");
    pollsCreated.add("ID of poll 3");
    CreatedPolls createdPolls2 = new CreatedPolls(pollsCreated);
    assertEquals(createdPolls2.getCreatedPolls().size(), 3);
    assertTrue(createdPolls2.getCreatedPolls().contains("ID of poll 1"));
    assertTrue(createdPolls2.getCreatedPolls().contains("ID of poll 2"));
    assertTrue(createdPolls2.getCreatedPolls().contains("ID of poll 3"));

    createdPolls2.add("ID of poll 4");
    assertEquals(createdPolls2.getCreatedPolls().size(), 4);
    assertTrue(createdPolls2.getCreatedPolls().contains("ID of poll 1"));
    assertTrue(createdPolls2.getCreatedPolls().contains("ID of poll 2"));
    assertTrue(createdPolls2.getCreatedPolls().contains("ID of poll 3"));
    assertTrue(createdPolls2.getCreatedPolls().contains("ID of poll 4"));
  }
}
