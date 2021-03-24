package com.cs32.app.poll;

import com.cs32.app.CategoryPoints;
import com.google.gson.annotations.Expose;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class Poll {
  @Expose
  private ObjectId id;
  @Expose
  private String question;
  @Expose
  private List<AnswerOption> answerOptions;
  @Expose
  private CategoryPoints categoryPoints;
  private List<String> responseIds;

  public Poll(String question, List<AnswerOption> answerOptions, CategoryPoints categoryPoints) {
    this.id = new ObjectId();
    this.question = question;
    this.answerOptions = answerOptions;
    this.categoryPoints = categoryPoints;
    this.responseIds = new ArrayList<>();
  }

  public Poll(ObjectId id, String question, List<AnswerOption> answerOptions, CategoryPoints categoryPoints, List<String> responseIds) {
    this.id = id;
    this.question = question;
    this.answerOptions = answerOptions;
    this.categoryPoints = categoryPoints;
    this.responseIds = responseIds;
  }

  public ObjectId getId() {
    return id;
  }


  public String getQuestion() {
    return question;
  }


  public List<AnswerOption> getAnswerOptions() {
    return answerOptions;
  }


  public CategoryPoints getCatPts() {
    return categoryPoints;
  }

  public List<String> getResponseIds() {
    return responseIds;
  }
}
