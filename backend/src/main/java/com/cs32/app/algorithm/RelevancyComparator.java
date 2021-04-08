package com.cs32.app.algorithm;

import com.cs32.app.CategoryPoints;
import com.cs32.app.poll.Poll;
import java.util.Comparator;

/**
 * The comparator which compares polls' relevancy with regard to a given user
 * for sorting poll in descending order by relevance (i.e. in ascending order
 * by disparity).
 */
public class RelevancyComparator implements Comparator<Poll> {
  private CategoryPoints userCatPts;

  /**
   * Constructor that takes in a given user's category points.
   * @param userCatPts
   */
  public RelevancyComparator(CategoryPoints userCatPts) {
    this.userCatPts = userCatPts;
  }

  /**
   * The comopare() method that does the job above.
   * @param p1 the first poll
   * @param p2 the second poll
   * @return 1 if p1 has smaller relevancy (i.e. greater disparity) and -1 otherwise
   */
  @Override
  public int compare(Poll p1, Poll p2) {
    return Double.compare(p1.calculateDisparity(userCatPts), p2.calculateDisparity(userCatPts));
  }
}
