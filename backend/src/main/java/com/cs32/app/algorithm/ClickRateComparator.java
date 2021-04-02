package com.cs32.app.algorithm;

import com.cs32.app.poll.Poll;

import java.util.Comparator;

public class ClickRateComparator implements Comparator<Poll> {
  @Override
  public int compare(Poll p1, Poll p2) {
    return Double.compare(p2.getClickRate(), p1.getClickRate());
  }
}
