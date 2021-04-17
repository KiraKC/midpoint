package com.cs32.app.handlers;

import com.cs32.app.Constants;
import com.cs32.app.database.Connection;
import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.PollResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * The handler which is responsible for the followings.
 * - inserting the response into MongoDB response collection
 * - sending back the mini-stats to the frontend
 */
public class AnonymousAnswerHandler implements Route {
  private static final Gson GSON = new
      GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

  /**
   * The handle() method that does the job above.
   * @param request a Json object containing user ID and poll ID
   * @param response doesn't matter
   * @return a Json object containing the mini-stats
   * @throws Exception exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {

    Map<String, Object> variables = new HashMap<>();
    Boolean status;

    /*
      Front end sends us the pollId, answerOptionId, userMetaData.
      userMetaData will come as a list of json objects like so:
        {
         pollId: "asdjflasd",
         answerOptionId: "asdfajsdf",
         userMetaData: "asdlfasdf"
         }
     */

    try {
      // Insert new response to MongoDB database
      JSONObject jsonReqObject = new JSONObject(request.body());
      PollResponse pollResponse = new PollResponse(jsonReqObject);
      Connection.addPollResponseToDB(pollResponse);

      // Get all answer options and all responses of the poll being answered
      String pollId = jsonReqObject.getString("pollId");
      variables.put("pollId", pollId);
      List<AnswerOption> answerOptions = Connection.getPollById(pollId).getAnswerOptions();
      List<PollResponse> allResponses = Connection.getResponses(pollId);

      // Initialize a map for counting the occurrence of every answer option
      Map<String, Double> counts = new HashMap<>();
      for (AnswerOption answerOption : answerOptions) {
        counts.put(answerOption.getId(), 0.0);
      }

      // count the number of responses for each answer option
      for (PollResponse everyResponse : allResponses) {
        counts.put(everyResponse.getAnswerOptionId(),
            counts.get(everyResponse.getAnswerOptionId()) + 1);
      }

      // Send mini-stats to front end
      Map<String, Double> miniStats = new HashMap<>();
      int numResponses = allResponses.size();
      for (AnswerOption answerOption : answerOptions) {
        double percentage;
        if (numResponses == 0) {
          percentage = 0;
        } else {
          percentage = counts.get(answerOption.getId()) / allResponses.size();
        }
        miniStats.put(answerOption.getId(), percentage * Constants.PERCENTAGE);
      }
      variables.put("miniStats", miniStats);
      variables.put("answerOptions", answerOptions);
      status = true;
    } catch (Exception e) {
      e.printStackTrace();
      status = false;
    }

    variables.put("status", status);
//    System.out.println(GSON.toJson(variables));
    return GSON.toJson(variables);
  }


}
