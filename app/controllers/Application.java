package controllers;

import java.util.Map;

import com.fasterxml.jackson.databind.node.ObjectNode;

import models.TestResult;
import models.UserStoryHandler;
import play.libs.Json;
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
    public static Result compareXML() {
    	final Map<String, String[]> post = request().body().asFormUrlEncoded();
    	String expected=post.get("expected")[0];
        String actual=post.get("actual")[0];
    	System.out.println(expected);
    	System.out.println(actual);
    	
    	
    	ObjectNode returnJson=Json.newObject();
    	if(expected.equals(actual)){
    		returnJson.put("simularity", "100%");
    	}else{
    		returnJson.put("simularity", "not 100%");
    	}

    	return ok(returnJson);
    }
    
    
    
}
