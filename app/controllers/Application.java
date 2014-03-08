package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import models.Task;
import models.UserStoryHandler;

import java.util.*;

public class Application extends Controller {
    
	public static Result addDataPoint(String i) {
		return ok(views.html.index.render("Hello my framwork"+i));
	}
	
    public static Result index() {
    	UserStoryHandler.loadAllUserStorys();
    	List<Task> tasks = Task.find.all();
       	return ok(views.html.index.render("Hello my framwork"+tasks.get(0).name));
    }
    public static Result getUserstories() {
    	List<Task> tasks = Task.find.all();
        return ok(views.html.index.render("Hello my framwork"+tasks.get(0).name));
    }
    public static Result getTests(String userStoryName) {
    	List<Task> tasks = Task.find.all();
        return ok(views.html.index.render("Hello my framwork"+tasks.get(0).name));
    }
        
    
    
}
