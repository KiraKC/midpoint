package com.cs32.app.handlers;

import com.cs32.app.Constants;
import com.cs32.app.User;
import com.cs32.app.database.Connection;
import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.Poll;
import com.cs32.app.poll.PollResponse;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 *
 */
public class SearchPollsHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();

  /**
   * The handle() method that does the job above.
   * @param request a Json object containing the search string and user ID
   * @param response doesn't matter
   * @return
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> variables = new HashMap<>();

    boolean status;

    try {
      // Parse request
      JSONObject jsonReqObject = new JSONObject(request.body());

      // search for polls according to searchString
      String searchString = jsonReqObject.getString("searchString");
      System.out.println("SEARCH STRING: " + searchString);
      List<Poll> searchResults = Connection.searchPolls(searchString);
      System.out.println(searchResults);
      variables.put("searchResults", searchResults);

      // instantiate list of answeredPollIds and createdPollIds
      List<String> answeredPollIdsToSend = new ArrayList<>();
      Map<String, Map<String, Double>> miniStats = new HashMap<>();

      boolean loggedIn = jsonReqObject.getString("loggedIn").equals("true");
      if (loggedIn) {
        // get user from userIdToken
        String userIdToken = jsonReqObject.getString("userIdToken");
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
        String userId = decodedToken.getUid();
        User user = Connection.getUserById(userId);

        // set list of answeredPollIds and createdPollIds
        for (Poll poll : searchResults) {
          poll.rendered();
          Connection.updatePollNumRenders(poll);
          if (user.getAnsweredPolls().getSet().contains(poll.getId())) {
            // add pollId to list of answeredPollIdsToSend
            answeredPollIdsToSend.add(poll.getId());

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
              miniStat.put(answerOption.getId(), percentage * Constants.PERCENTAGE);
            }
            // add miniStat to miniStats
            miniStats.put(poll.getId(), miniStat);
          }
        }
      }

      variables.put("answeredPollIds", answeredPollIdsToSend);
      variables.put("miniStats", miniStats);

      status = true;
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println("ERROR: SearchPollHandler JSON request not properly formatted");
      // TODO: send a failure response to frontend
      status = false;
    }

    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
