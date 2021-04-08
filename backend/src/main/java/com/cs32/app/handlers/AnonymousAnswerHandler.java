package com.cs32.app.handlers;

import com.cs32.app.database.Connection;
import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.Poll;
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
 * This handler is responsible for:
 * - inserting the response into the response collection
 * - sending back the mini-stats for the frontend to render
 */
public class AnonymousAnswerHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

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
         userIdToken: "asdlfasdf"
     */

    try{
      // Update database with new response
      JSONObject jsonReqObject = new JSONObject(request.body());
      PollResponse pollResponse = new PollResponse(jsonReqObject);
      Connection.addPollResponseToDB(pollResponse);

      // Get all answer options and all responses
      String pollId = jsonReqObject.getString("pollId");
      variables.put("pollId", pollId);
      List<AnswerOption> answerOptions = Connection.getPollById(pollId).getAnswerOptions();
      List<PollResponse> allResponses = Connection.getResponses(pollId);

      // Initialize a map for counting the occurrence of every answer option
      Map<String, Double> counts = new HashMap<>();
      for (AnswerOption answerOption : answerOptions) {
        counts.put(answerOption.getId(), 0.0);
      }

      System.out.println("ALLRESPONSES.size(): " + allResponses.size());
      // Count
      for (PollResponse everyResponse : allResponses) {
        System.out.println("EVERYRESPONSE: " + everyResponse.toBSON());
        counts.put(everyResponse.getAnswerOptionId(), counts.get(everyResponse.getAnswerOptionId()) + 1);
      }

      // Send mini-stats to front end
      Map<String, Double> miniStats = new HashMap<>();
      for (AnswerOption answerOption : answerOptions) {
        double percentage = counts.get(answerOption.getId()) / allResponses.size();
        miniStats.put(answerOption.getValue(), percentage);
      }
      variables.put("miniStats", miniStats);
      status = true;
    } catch (Exception e) {
      e.printStackTrace();
      status = false;
    }

    variables.put("status", status);
    System.out.println(GSON.toJson(variables));
    return GSON.toJson(variables);
  }


}
