package com.cs32.app.handlers;

import com.cs32.app.database.Connection;
import com.cs32.app.poll.PollResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.HashMap;
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
    boolean status;
    /*
      Front end sends us the pollId, answerOptionId, userMetaData.
      userMetaData will come as a list of json objects like so:
        {
         pollId: "asdjflasd",
         answerOptionId: "asdfajsdf",
         userMetaData: {
                        {key: "age", value: "18"},
                        {key: "gender", value: "F"},
                        ...
                        }
        }
     */

    // update database with new response
    JSONObject jsonReqObject = new JSONObject(request.body());
    PollResponse pollResponse = new PollResponse(jsonReqObject);
    Connection.addPollResponseToDB(pollResponse);
    status = Connection.addPollResponseToDB(pollResponse);

    // TODO: get mini-stats (NOTE: STATUS SHOULD BE UPDATED TO REFLECT MINI-STATS SUCCESS/FAILURE)


    variables.put("status", status);
    return GSON.toJson(variables);
  }


}
