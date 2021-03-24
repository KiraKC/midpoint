package com.cs32.app.poll;

import com.google.gson.annotations.Expose;
import org.bson.types.ObjectId;

public class AnswerOption {
  @Expose
  private ObjectId id;
  @Expose
  private String value;
  @Expose
  private String emoji;

  // TODO: probably need an overloaded constructor
  public AnswerOption(int id, String value, String emoji) {
    this.id = new ObjectId();
    this.value = value;
    this.emoji = emoji;
  }

  public String getValue() {
    return value;
  }

  public String getEmoji() {
    return emoji;
  }

  public ObjectId getId() {
    return id;
  }

}
