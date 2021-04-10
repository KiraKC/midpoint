package com.cs32.app.handlers;

import com.cs32.app.User;
import com.cs32.app.database.Connection;
import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.Poll;
import com.cs32.app.poll.PollResponse;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONException;
import spark.Request;
import spark.Response;
import spark.Route;
import org.json.JSONObject;

import java.util.*;


public class AnsweredPollsHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

  /**
   * Provides the frontend with the most relevant polls to display.
   * @param request A JSON object that contains the userId, list of pollIds that the user
   *                has seen in their current browsing session, number of polls that the
   *                frontend wants.
   * @param response Doesn't do much here.
   * @return JSON objects representing the polls that the frontend should display.
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> variables = new HashMap<>();

    boolean status;
    try {
      // Parse request
      JSONObject jsonReqObject = new JSONObject(request.body());

      // query for user and get their + answered polls
      String userIdToken = jsonReqObject.getString("userIdToken");
      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
      String userId = decodedToken.getUid();
      User user = Connection.getUserById(userId);
      Set<String> answeredPolls = user.getAnsweredPolls().getSet();

      // Query for answeredPolls
      System.out.println("ANSWERED: " + answeredPolls);
      List<Poll> pollsToSend = Connection.getPollsById(answeredPolls);
      System.out.println(pollsToSend.size());

      // Return the polls to the frontend as a JSON
      variables.put("answeredPolls", pollsToSend);

      // instantiate list of answeredPollIds and createdPollIds
      Map<String, Map<String, Double>> miniStats = new HashMap<>();

      // set list of createdPollIds
      for (Poll poll : pollsToSend) {
        poll.rendered();
        if (user.getAnsweredPolls().getSet().contains(poll.getId())) {
          // calculate mini-stats to send
          Map<String, Double> miniStat = new HashMap<>();
          for (AnswerOption answerOption : poll.getAnswerOptions()) {
            miniStat.put(answerOption.getId(), 0.0);
          }
          // count the number of responses for each answer option
          List<PollResponse> allResponses = Connection.getResponses(poll.getId());
          for (PollResponse everyResponse : allResponses) {
            String answerOptionId = everyResponse.getAnswerOptionId();
            miniStat.put(answerOptionId, miniStat.get(answerOptionId) + 1);
          }
          // convert to percentages
          for (AnswerOption answerOption : poll.getAnswerOptions()) {
            double percentage = miniStat.get(answerOption.getId()) / allResponses.size();
            miniStat.put(answerOption.getId(), percentage * 100);
          }
          // add miniStat to miniStats
          miniStats.put(poll.getId(), miniStat);
        }
      }

      variables.put("miniStats", miniStats);

      status = true;
    } catch (JSONException e) {
      e.printStackTrace();
      System.err.println("ERROR: GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send a failure response to frontend
      status = false;
    }

    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
