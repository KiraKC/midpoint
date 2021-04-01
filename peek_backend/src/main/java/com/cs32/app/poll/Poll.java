package com.cs32.app.poll;

import com.cs32.app.CategoryPoints;
import com.cs32.app.Constants;
import com.google.gson.annotations.Expose;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.net.StandardSocketOptions;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Poll {
  @Expose
  private String id;
  @Expose
  private String question;
  @Expose
  private String emoji;
  @Expose
  private List<AnswerOption> answerOptions;
  @Expose
  private CategoryPoints categoryPoints;
  private int numRenders;
  private int numClicks;

  public Poll(String question, String emoji, List<AnswerOption> answerOptions, CategoryPoints categoryPoints) {
    this.id = new ObjectId().toString();
    this.question = question;
    this.emoji = emoji;
    this.answerOptions = answerOptions;
    this.categoryPoints = categoryPoints;
    this.numRenders = 0;
    this.numClicks = 0;
  }

  public Poll(String id, String question, String emoji, List<AnswerOption> answerOptions, CategoryPoints categoryPoints, int numRenders, int numClicks) {
    this.id = id;
    this.question = question;
    this.emoji = emoji;
    this.answerOptions = answerOptions;
    this.categoryPoints = categoryPoints;
    this.numRenders = numRenders;
    this.numClicks = numClicks;
  }

  public Poll(Document mongoPoll) {
    id = mongoPoll.getString("_id");

    // Get question
    question = mongoPoll.getString("question");

    // Get emoji
    emoji = mongoPoll.getString("emoji");

    // Get answer options
    answerOptions = new ArrayList<>();
    List<Document> mongoAnswerOptions = (List<Document>) mongoPoll.get("answerOptions");
    for (Document doc : mongoAnswerOptions) {
      answerOptions.add(new AnswerOption(doc.getString("answerOptionId"), doc.getString("value"), doc.getString("emoji")));
    }

    // Get category points
    categoryPoints = new CategoryPoints();
    List<Document> mongoCatPts = (List<Document>) mongoPoll.get("catPts");
    for (Document doc : mongoCatPts) {
      categoryPoints.updateCatPts(doc.getString("categoryName"), doc.getDouble("points"));
    }

    // Get numRenders
    numRenders = mongoPoll.getInteger("numRenders");

    // Get numClicks
    numClicks = mongoPoll.getInteger("numClicks");
  }

  public String getId() {
    return id;
  }

  public String getQuestion() {
    return question;
  }

  public String getEmoji() { return emoji; }

  public List<AnswerOption> getAnswerOptions() {
    return answerOptions;
  }

  public CategoryPoints getCatPts() {
    return categoryPoints;
  }

  public int getNumRenders() {
    return numRenders;
  }

  public int getNumClicks() {
    return numClicks;
  }

  /**
   * Getter method for click rate.
   * @return
   */
  public double getClickRate() {
    if (numRenders == 0) {
      return Constants.STARTING_CLICKRATE;
    } else {
      return numClicks / numRenders;
    }
  }

  /**
   * Method for calculating disparity between the poll and a given user's category points.
   * The lower the disparity, the more relevant the poll is to the user.
   * @param userCatPts a given user's category points
   * @return disparity
   */
  public double calculateDisparity(CategoryPoints userCatPts) {
    double categoryDisparity = 0;
    double clickRate = this.getClickRate();
    Double userTotal = userCatPts.getTotalPts();
    System.out.println("USERCATPTS:" + userTotal);
    Double pollTotal = categoryPoints.getTotalPts();
    System.out.println("POLLCATPTS:" + question + pollTotal);
    for(String category : Constants.ALL_CATEGORIES) {
      categoryDisparity += Math.abs(userCatPts.getNormPts(category, userTotal) - categoryPoints.getNormPts(category, pollTotal));
    }
    return (1-clickRate) * categoryDisparity;
  }

  /**
   * Method for increasing num of renders by 1 when the poll is rendered.
   */
  public void rendered() {
    numRenders += 1;
  }

  /**
   * Method for increasing num of clicks by 1 when the poll is clicked.
   */
  public void clicked() {
    numClicks += 1;
  }

  public Document toBSON() {
    List<Document> mongoAnswers = new ArrayList<>();
    for (AnswerOption answerOption : answerOptions) {
      Document pollOptions = new Document("answerOptionId", answerOption.getId())
            .append("emoji", answerOption.getEmoji())
            .append("value", answerOption.getValue());
      mongoAnswers.add(pollOptions);
    }

    List<Document> mongoCatPts = new ArrayList<>();
    for (Map.Entry<String,Double> entry : categoryPoints.getMap().entrySet()) {
      mongoCatPts.add(new Document("categoryName", entry.getKey())
            .append("points", entry.getValue()));
    }

    // preparing main poll BSON object
    Document mongoPoll = new Document("_id", id);
    mongoPoll.append("question", question)
          .append("emoji", emoji)
          .append("answerOptions", mongoAnswers)
          .append("catPts", mongoCatPts)
          .append("numClicks", numClicks)
          .append("numRenders", numRenders);
    return mongoPoll;
  }

}
