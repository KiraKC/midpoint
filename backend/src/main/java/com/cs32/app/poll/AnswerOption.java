package com.cs32.app.poll;

import com.google.gson.annotations.Expose;
import org.bson.types.ObjectId;

/**
 * AnswerOption class that stands for an answer option of a poll.
 */
public class AnswerOption {
  @Expose
  private String id;
  @Expose
  private String value;
  @Expose
  private String emoji;

  /**
   * Constructor that takes in a value and an emoji.
   * @param value value
   * @param emoji emoji
   */
  public AnswerOption(String value, String emoji) {
    this.id = new ObjectId().toString();
    this.value = value;
    this.emoji = emoji;
  }

  /**
   * Constructor that takes in an id, a value, and an emoji.
   * @param answerOptionId id
   * @param value value
   * @param emoji emoji
   */
  public AnswerOption(String answerOptionId, String value, String emoji) {
    this.id = answerOptionId;
    this.value = value;
    this.emoji = emoji;
  }

  /**
   * Getter method for the id.
   * @return
   */
  public String getId() {
    return id;
  }

  /**
   * Getter method for the value.
   * @return value
   */
  public String getValue() {
    return value;
  }

  /**
   * Getter method for the emoji.
   * @return emoji
   */
  public String getEmoji() {
    return emoji;
  }

}
