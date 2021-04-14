package com.cs32.app.handlers;


import com.cs32.app.database.Connection;
import com.cs32.app.exceptions.FailedDBWriteException;
import com.cs32.app.poll.Poll;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Request;
import spark.Response;
import spark.Route;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class DeletePollHandler implements Route {
  private static final Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
      .create();
  private final Connection myConnection;

  public DeletePollHandler(Connection connection) {
    myConnection = connection;
  }

  @Override
  public Object handle(Request req, Response res) throws Exception {
    Map<String, Object> variables = new HashMap<>();
    boolean status;
    try {
      // parse JSON
      JSONObject jsonReqObject = new JSONObject(req.body());
      String pollId = jsonReqObject.getString("pollId");
      String userIdToken = jsonReqObject.getString("userIdToken");
      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(userIdToken);
      String userId = decodedToken.getUid();

      // check if user has already answered this poll
      Poll poll = myConnection.getPollById(pollId);
      String creatorId = poll.getCreatorId();
      if (creatorId.equals(userId)) {
        myConnection.deleteResponses(pollId);
        myConnection.deletePoll(pollId);
        status = true;
      } else {
        status = false;
      }

    } catch (org.json.JSONException e) {
      e.printStackTrace();
      System.err.println("ERROR: Incorrect JSON object formatting");
      // TODO: send the error message to the frontend
      status = false;
    } catch (NumberFormatException e) {
      e.printStackTrace();
      System.err.println("ERROR: Incorrect ID data type");
      // TODO: send the error message to the frontend
      status = false;
    } catch (FailedDBWriteException e) {
      e.printStackTrace();
      status = false;
    }
    variables.put("status", status);
    return GSON.toJson(variables);
  }
}
