package com.cs32.app.poll;

import com.cs32.app.CategoryPoints;
import com.cs32.app.Constants;
import com.cs32.app.database.Connection;
import com.google.gson.annotations.Expose;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

/**
 * Poll class that literally stands for a poll.
 */
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
  private String color;
  @Expose
  private String imageUrl;
  private CategoryPoints categoryPoints;
  private int numRenders;
  @Expose
  private int numClicks;

  /**
   * Poll constructor.
   * @param question poll question
   * @param emoji poll emoji
   * @param answerOptions answer options
   * @param categoryPoints category points
   * @param color poll color
   */
  public Poll(String question, String emoji, List<AnswerOption> answerOptions, CategoryPoints categoryPoints, String color, String imageUrl) {
    this.id = new ObjectId().toString();
    this.question = question;
    this.emoji = emoji;
    this.answerOptions = answerOptions;
    this.categoryPoints = categoryPoints;
    this.numRenders = 0;
    this.numClicks = 0;
    this.color = color;
    this.imageUrl = imageUrl;
  }

  /**
   * Poll constructor that transforms a MongoDB document for a poll to a Poll object.
   * @param mongoPoll MongoDB document for a poll
   * @throws Exception
   */
  public Poll(Document mongoPoll) throws Exception {
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
    categoryPoints.initializeFromMongo((List<Document>) mongoPoll.get("catPts"));

    // color
    color = mongoPoll.getString("color");

    // imageURL
    imageUrl = mongoPoll.getString("imageURL");

    // Get numRenders
    numRenders = mongoPoll.getInteger("numRenders");

    // Get numClicks
    numClicks = mongoPoll.getInteger("numClicks");

    // autofixing
    boolean needsAutofixing = false;
    if (color == null) {
      color = Constants.ALL_COLORS[(int) Math.floor(Math.random()*Constants.ALL_COLORS.length)];
      needsAutofixing = true;
    }
    if (imageUrl == null) {
      imageUrl = "";
      needsAutofixing = true;
    }
    if (needsAutofixing) {
      Connection.replacePoll(this);
    }
  }

  /**
   * Getter method for poll id.
   * @return poll id
   */
  public String getId() {
    return id;
  }

  /**
   * Getter method for answer options.
   * @return a list of answer options
   */
  public List<AnswerOption> getAnswerOptions() {
    return answerOptions;
  }

  /**
   * Getter method for category points.
   * @return a map of category points
   */
  public CategoryPoints getCatPts() {
    return categoryPoints;
  }

  /**
   * Getter method for number of renders.
   * @return number of renders
   */
  public int getNumRenders() {
    return numRenders;
  }

  /**
   * Getter method for number of clicks.
   * @return number of clicks
   */
  public int getNumClicks() {
    return numClicks;
  }

  /**
   * Getter method for click rate.
   * @return click rate
   */
  public double getClickRate() {
    if (numRenders == 0) {
      return Constants.STARTING_CLICKRATE;
    } else {
      return (double) numClicks / (double) numRenders;
    }
  }

  /**
   * Method for calculating disparity between the poll and a given user's category points.
   * The lower the disparity, the higher the relevancy.
   * @param userCatPts a given user's category points
   * @return disparity
   */
  public double calculateDisparity(CategoryPoints userCatPts) {
    double disparity = 0;
    for(String category : Constants.ALL_CATEGORIES) {
      disparity += Math.abs(userCatPts.getNormPts(category) - categoryPoints.getNormPts(category));
    }
//    return (1-this.getClickRate()) * disparity;
    return disparity;
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

  /**
   * Method for transforming a Poll object into a Bson object.
   * @return a Bson object of the poll
   */
  public Document toBSON() {
    List<Document> mongoAnswers = new ArrayList<>();
    for (AnswerOption answerOption : answerOptions) {
      Document pollOptions = new Document("answerOptionId", answerOption.getId())
            .append("emoji", answerOption.getEmoji())
            .append("value", answerOption.getValue());
      mongoAnswers.add(pollOptions);
    }

    List<Document> mongoCatPts = categoryPoints.toBSON();

    // preparing main poll BSON object
    Document mongoPoll = new Document("_id", id);
    mongoPoll.append("question", question)
          .append("emoji", emoji)
          .append("answerOptions", mongoAnswers)
          .append("catPts", mongoCatPts)
          .append("numClicks", numClicks)
          .append("numRenders", numRenders)
          .append("color", color)
          .append("imageURL", imageUrl);
    return mongoPoll;
  }
}
