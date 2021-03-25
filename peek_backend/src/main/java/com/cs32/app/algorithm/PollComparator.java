package com.cs32.app.algorithm;

import com.cs32.app.CategoryPoints;
import com.cs32.app.poll.Poll;

import java.util.Comparator;

public class PollComparator implements Comparator<PollAndRelevancePair> {

  private CategoryPoints userCatPts;

  public PollComparator(CategoryPoints userCatPts) {
    this.userCatPts = userCatPts;
  }

  @Override
  public int compare(PollAndRelevancePair p1, PollAndRelevancePair p2) {
    return Double.compare(p1.getCategoryDisparity(), p2.getCategoryDisparity());
  }
}
