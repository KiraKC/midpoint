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
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;
import spark.Route;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * The CheckOffHandler class takes in the com.cs32.app.poll id and the user id from the frontend
 * when a com.cs32.app.poll is answered by the user. It then
 * 1) checks off the com.cs32.app.poll for this user in the database so that this com.cs32.app.poll won't show
 * up again on the feed page,
 * 2) updates the category points for both the com.cs32.app.poll and the user.
 */
public class CheckOffHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
  /**
   * The handle() method.
   * @param req a JSON object containing the com.cs32.app.poll id and the user id
   * @param res
   * @return a success message
   * @throws Exception
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
          userCatPts.updateCatPts(category, currUserPts + 30 * currPollPts / currPollTotalPts);
          pollCatPts.updateCatPts(category, currPollPts + 100 * currUserPts / currUserTotalPts);
        }

        // Update user's answered polls and category points in MongoDB
        BasicDBObject searchQuery = new BasicDBObject("_id", userId);
        BasicDBObject updateFields = new BasicDBObject();
        updateFields.append("answeredPolls", user.getAnsweredPolls().toBSON());
        updateFields.append("categoryPoints", userCatPts.toBSON());
        Connection.updateUsers(searchQuery, updateFields);

        // TODO: update poll's number of clicks and category points in MongoDB
        poll.clicked();
        searchQuery = new BasicDBObject("_id", pollId);
        updateFields = new BasicDBObject();
        updateFields.append("numClicks", poll.getNumClicks());
        updateFields.append("catPts", poll.getCatPts().toBSON());
        BasicDBObject setQuery = new BasicDBObject("$set", updateFields);
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
