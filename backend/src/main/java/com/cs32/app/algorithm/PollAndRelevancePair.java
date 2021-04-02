package com.cs32.app.algorithm;

import com.cs32.app.CategoryPoints;
import com.cs32.app.Constants;
import com.cs32.app.poll.Poll;

public class PollAndRelevancePair {

  private Poll poll;
  private CategoryPoints userCatPts;
  private Double categoryDisparity;

  public PollAndRelevancePair(Poll poll, CategoryPoints userCatPts) {
    this.poll = poll;
    this.userCatPts = userCatPts;
    this.calculateDisparity();
  }

  private void calculateDisparity() {
    double clickrate;
    if (poll.getNumRenders() != 0) {
      clickrate = poll.getNumClicks()/poll.getNumRenders();
    } else {
      clickrate = Constants.STARTING_CLICKRATE;
    }
    double categoryDisparity = 0;
    Double userTotal = userCatPts.getTotalPts();
    System.out.println("USERCATPTS:" + userTotal);
    Double pollTotal = poll.getCatPts().getTotalPts();
    System.out.println("Pollcatpts:" + pollTotal + poll.getQuestion());
    for(String category : Constants.ALL_CATEGORIES) {
      categoryDisparity += Math.abs(userCatPts.getNormPts(category, userTotal) - poll.getCatPts().getNormPts(category, pollTotal));
    }
    this.categoryDisparity = (1-clickrate) * categoryDisparity;
  }

  public Double getCategoryDisparity() {
    return categoryDisparity;
  }

  public Poll getPoll() {
    return poll;
  }
}
