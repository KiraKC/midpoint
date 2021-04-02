package com.cs32.app.algorithm;

import com.cs32.app.CategoryPoints;
import com.cs32.app.poll.Poll;
import java.util.Comparator;

public class RelevancyComparator implements Comparator<Poll> {

  private CategoryPoints userCatPts;

  public RelevancyComparator(CategoryPoints userCatPts) {
    this.userCatPts = userCatPts;
  }

  @Override
  public int compare(Poll p1, Poll p2) {
    return Double.compare(p1.calculateDisparity(userCatPts), p2.calculateDisparity(userCatPts));
  }
}
