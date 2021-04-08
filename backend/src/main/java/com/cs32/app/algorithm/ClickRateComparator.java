package com.cs32.app.algorithm;

import com.cs32.app.poll.Poll;

import java.util.Comparator;

/**
 * The comparator which compares polls' click rates for sorting polls in
 * descending order by click rate.
 */
public class ClickRateComparator implements Comparator<Poll> {
  /**
   * The compare() method which compares polls' click rates.
   * @param p1 the first poll
   * @param p2 the second poll
   * @return 1 if p1 has a smaller click rate and -1 otherwise
   */
  @Override
  public int compare(Poll p1, Poll p2) {
    return Double.compare(p2.getClickRate(), p1.getClickRate());
  }
}
