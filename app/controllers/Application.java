package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import models.Task;
import models.UserStory;
import models.UserStoryHandler;
import play.libs.Json;
import play.mvc.BodyParser;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.*;

public class Application extends Controller {
    
	public static Result addDataPoint() {
        final Map<String, String[]> post = request().body().asFormUrlEncoded();
        
        String valure=post.get("valure")[0];
        String userSenario=post.get("test")[0];
        String test=post.get("test")[0];

        new 
        System.out.println(post.get("valure")[0]);

		return ok();
	}
	@BodyParser.Of(BodyParser.Json.class)
	public static Result index() {
		//JsonNode json = request().body().asJson();
		//ObjectNode result = Json.newObject();
    	//List<UserStory> userStories = UserStoryHandler.loadAllUserStories();
    	//for (UserStory userStory : userStorys) {
    //		System.out.println(userStory);
	//	}
    	return ok(views.html.index.render("Hello my framwork"));
    	//List<Task> tasks = Task.find.all();
     // 	return ok(views.html.index.render("Hello my framwork"));

    }
    public static Result getUserStories() {
    	String userStories = UserStoryHandler.loadAllUserStories();
    	return ok(userStories);
    }
    
    public static Result getTests(String userStoryName) {
    	//List<Task> tasks = Task.find.all();
    	//UserStory userStory = UserStoryHandler.getTests(userStoryName);
    	return ok();
    }
}
