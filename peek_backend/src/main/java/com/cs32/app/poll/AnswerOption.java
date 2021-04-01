package com.cs32.app.poll;

import com.google.gson.annotations.Expose;
import org.bson.types.ObjectId;

public class AnswerOption {
  @Expose
  private String id;
  @Expose
  private String value;
  @Expose
  private String emoji;

  // TODO: probably need an overloaded constructor
  public AnswerOption(String value, String emoji) {
    this.id = new ObjectId().toString();
    this.value = value;
    this.emoji = emoji;
  }

  public AnswerOption(String answerOptionId, String value, String emoji) {
    this.id = answerOptionId;
    this.value = value;
    this.emoji = emoji;
  }

  public String getValue() {
    return value;
  }

  public String getId() {
    return id;
  }

  public String getEmoji() {
    return emoji;
  }

}
