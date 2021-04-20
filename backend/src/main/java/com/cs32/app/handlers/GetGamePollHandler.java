package com.cs32.app.handlers;

import com.cs32.app.Constants;
import com.cs32.app.database.Connection;
import com.cs32.app.poll.AnswerOption;
import com.cs32.app.poll.Poll;
import com.cs32.app.poll.PollResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.*;

/**
 * The handler which is responsible for the followings.
 * - generating random polls for the frontend game page
 */
public class GetGamePollHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();

  /**
   * The handle() method that does the job above.
   * @param request a Json object containing the seen polls of a user
   * @param response doesn't matter
   * @return a Json object containing the polls to display on the frontend game page
   * @throws Exception exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> variables = new HashMap<>();

    boolean status;

    try {
      // Parse request
      JSONObject jsonReqObject = new JSONObject(request.body());

      // Seen polls
      Set<String> seenPollIds = new HashSet<>();
      JSONArray jsonSeenPollsArray = jsonReqObject.getJSONArray("seenPollIds");
      for (int i = 0; i < jsonSeenPollsArray.length(); i++) {
        seenPollIds.add(jsonSeenPollsArray.getString(i));
      }

      // Query for random poll
      Poll pollToSend = Connection.getRandomPolls(1).get(0);
      while (seenPollIds.contains(pollToSend.getId()) || pollToSend.getNumClicks() == 0) {
        pollToSend = Connection.getRandomPolls(1).get(0);
      }

      List<AnswerOption> answerOptions = pollToSend.getAnswerOptions();
      List<PollResponse> allResponses = Connection.getResponses(pollToSend.getId());

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

      // Return the poll to the frontend as a JSON
      variables.put("poll", pollToSend);


      // calculate strongly correlated with
      List<Map.Entry<String, Double>> categoriesRankedByCorrelation = new ArrayList<>(pollToSend.getCatPts().getMap().entrySet());
      categoriesRankedByCorrelation.sort(Map.Entry.comparingByValue());
      Collections.reverse(categoriesRankedByCorrelation);
      List<String> rankedCategoriesToSend = new ArrayList<>();
      for (Map.Entry<String, Double> entry : categoriesRankedByCorrelation) {
        rankedCategoriesToSend.add(entry.getKey());
      }

      variables.put("categoriesRankedByCorrelation", rankedCategoriesToSend);

      status = true;
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println("ERROR: GetSuggestedPollsHandler JSON request not properly formatted");
      // TODO: send a failure response to frontend
      status = false;
    }
    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
