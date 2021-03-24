package poll;

import com.cs32.app.CatPts;
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
  private CatPts catPts;
  private List<String> responseIds;

  public Poll(ObjectId id, String question, List<AnswerOption> answerOptions, CatPts catPts) {
    this.id = id;
    this.question = question;
    this.answerOptions = answerOptions;
    this.catPts = catPts;
    this.responseIds = new ArrayList<>();
  }

  public Poll(ObjectId id, String question, List<AnswerOption> answerOptions, CatPts catPts, List<String> responseIds) {
    this.id = id;
    this.question = question;
    this.answerOptions = answerOptions;
    this.catPts = catPts;
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


  public CatPts getCatPts() {
    return catPts;
  }

  public List<String> getResponseIds() {
    return responseIds;
  }
}
