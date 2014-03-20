package controllers;

import java.util.Map;

import models.TestResult;
import models.UserStoryHandler;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {
    
	public static Result addDataPoint() {
        final Map<String, String[]> post = request().body().asFormUrlEncoded();
        
        String value=post.get("value")[0];
        String backend=post.get("backend")[0];
        String testName=post.get("testName")[0];

       TestResult tr=new TestResult();
        tr.setValue(value);
        tr.setTestName(testName);
        tr.setBackEnd(backend);
        tr.save();
       
        //System.out.println(post.get("value")[0]);
        
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
