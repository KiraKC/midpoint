package com.cs32.app.handlers;

import com.cs32.app.CategoryPoints;
import com.cs32.app.Constants;
import com.cs32.app.User;
import com.cs32.app.database.Connection;
import com.cs32.app.poll.Poll;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.BasicDBObject;
import spark.Request;
import spark.Response;
import spark.Route;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * The handler which is responsible for the followings.
 * - checking off the poll newly answered by a user
 * - updating category points for both the user and the poll
 */
public class CheckOffHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();
  /**
   * The handle() method that does the job above.
   * @param req a JSON object containing the user ID and the poll ID
   * @param res doesn't matter
   * @return a success message
   * @throws Exception exception
   */
  @Override
  public Object handle(Request req, Response res) throws Exception {
    Map<String, Object> variables = new HashMap<>();
    boolean alreadyAnswered; boolean status;
    try {
      // parse JSON
      JSONObject jsonReqObject = new JSONObject(req.body());
      String pollId = jsonReqObject.getString("pollId");
      String userIdToken = jsonReqObject.getString("userIdToken");
      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
      String userId = decodedToken.getUid();

      // check if user has already answered this poll
      User user = Connection.getUserById(userId);
      if (user.getAnsweredPolls().getSet().contains(pollId)) {
        alreadyAnswered = true;
        status = true;
      } else {
        // get poll
        Poll poll = Connection.getPollById(pollId);

        // Update user's list of answered polls
        user.answered(pollId);

        // Update user's and poll's category points
        CategoryPoints userCatPts = user.getCategoryPoints();
        double currUserTotalPts = userCatPts.getTotalPts();
        CategoryPoints pollCatPts = poll.getCatPts();
        double currPollTotalPts = pollCatPts.getTotalPts();

        for (String category : Constants.ALL_CATEGORIES) {
          double currUserPts = userCatPts.getPts(category);
          double currPollPts = pollCatPts.getPts(category);
          userCatPts.updateCatPts(category, currUserPts
              + Constants.UPDATE_CAT_PTS_FACTOR_USER * currPollPts / currPollTotalPts);
          pollCatPts.updateCatPts(category, currPollPts
              + Constants.UPDATE_CAT_PTS_FACTOR_POLL * currUserPts / currUserTotalPts);
        }

        // Update user's answered polls and category points in MongoDB
        BasicDBObject searchQuery = new BasicDBObject("_id", userId);
        BasicDBObject updateFields = new BasicDBObject();
        updateFields.append("answeredPolls", user.getAnsweredPolls().toBSON());
        updateFields.append("categoryPoints", userCatPts.toBSON());
        BasicDBObject setQuery = new BasicDBObject("$set", updateFields);
        Connection.updateUsers(searchQuery, setQuery);

        // TODO: update poll's number of clicks and category points in MongoDB
        poll.clicked();
        searchQuery = new BasicDBObject("_id", pollId);
        updateFields = new BasicDBObject();
        updateFields.append("numClicks", poll.getNumClicks());
        updateFields.append("catPts", poll.getCatPts().toBSON());
        setQuery = new BasicDBObject("$set", updateFields);
        Connection.pollCollection.updateOne(searchQuery, setQuery);
        System.out.println("Updating poll data SUCCESSFUL.");

        alreadyAnswered = false;
        status = true;
      }

    } catch (org.json.JSONException e) {
      e.printStackTrace();
      System.err.println("ERROR: Incorrect JSON object formatting");
      // TODO: send the error message to the frontend
      alreadyAnswered = false;
      status = false;
    } catch (NumberFormatException e) {
      e.printStackTrace();
      System.err.println("ERROR: Incorrect ID data type");
      // TODO: send the error message to the frontend
      alreadyAnswered = false;
      status = false;
    }
    variables.put("alreadyAnswered", alreadyAnswered);
    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
