package com.cs32.app.poll;

import com.cs32.app.CategoryPoints;
import com.google.gson.annotations.Expose;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

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
  private List<String> responseIds;
  private int numRenders;
  private int numClicks;

  public Poll(String question, String emoji, List<AnswerOption> answerOptions, CategoryPoints categoryPoints) {
    this.id = new ObjectId().toString();
    this.question = question;
    this.emoji = emoji;
    this.answerOptions = answerOptions;
    this.categoryPoints = categoryPoints;
    this.responseIds = new ArrayList<>();
    this.numRenders = 0;
    this.numClicks = 0;
  }

  public Poll(String id, String question, String pollEmoji, List<AnswerOption> answerOptions, CategoryPoints categoryPoints, List<String> responseIds) {
    this.id = id;
    this.question = question;
    this.answerOptions = answerOptions;
    this.categoryPoints = categoryPoints;
    this.responseIds = responseIds;
    this.numRenders = numRenders;
    this.numClicks = numClicks;
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

  public List<String> getResponseIds() {
    return responseIds;
  }

  public int getNumRenders() {
    return numRenders;
  }

  public int getNumClicks() {
    return numClicks;
  }
}
