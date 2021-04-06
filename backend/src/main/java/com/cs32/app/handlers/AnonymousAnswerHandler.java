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
      System.out.println("HIHIHI 0");
      JSONObject jsonReqObject = new JSONObject(request.body());
      System.out.println("HIHIHI 1");
      PollResponse pollResponse = new PollResponse(jsonReqObject);
      System.out.println("HIHIHI 1");
      Connection.addPollResponseToDB(pollResponse);
      System.out.println("HIHIHI 1");

      // Get all answer options and all responses
      String pollId = jsonReqObject.getString("pollId");
      variables.put("pollId", pollId);
      List<AnswerOption> answerOptions = Connection.getPollById(pollId).getAnswerOptions();
      List<PollResponse> allResponses = Connection.getResponses(pollId);
      System.out.println("HIHIHI 2");
      // Initialize a map for counting the occurrence of every answer option
      Map<String, Double> counts = new HashMap<>();
      for (AnswerOption answerOption : answerOptions) {
        counts.put(answerOption.getId(), 0.0);
      }

      // Count
      for (PollResponse everyResponse : allResponses) {
        counts.put(everyResponse.getAnswerOptionId(), counts.get(everyResponse.getAnswerOptionId()) + 1);
      }
      System.out.println("HIHIHI 3");
      // Send mini-stats to front end
      Map<String, Double> miniStats = new HashMap<>();
      for (AnswerOption answerOption : answerOptions) {
        // TODO: fix this because we need to send the poll req first. that way, we don't have 0 as allResponses.size().
        if (allResponses.size() == 0) {
          miniStats.put(answerOption.getValue(), (double) 1/answerOptions.size());
        } else {
          double percentage = counts.get(answerOption.getId()) / allResponses.size();
          System.out.println("ANSWEROPTION NUM: " + answerOption.getId());
          System.out.println("ALL RESPONSES: " + allResponses.size());
          System.out.println("PERCENTAGE: " + percentage);
          miniStats.put(answerOption.getValue(), percentage);
        }
      }
      System.out.println("ministats here!!!");
      System.out.println(miniStats);
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
