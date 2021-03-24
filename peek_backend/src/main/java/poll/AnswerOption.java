package poll;

import com.google.gson.annotations.Expose;

public class AnswerOption {
  @Expose
  private int id;
  @Expose
  private String value;
  @Expose
  private String emoji;

  public AnswerOption(int id, String value, String emoji) {
    this.id = id;
    this.value = value;
    this.emoji = emoji;
  }

  public String getValue() {
    return value;
  }

}
