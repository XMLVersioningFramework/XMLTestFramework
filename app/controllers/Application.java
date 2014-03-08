package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import models.Task;
import java.util.*;

public class Application extends Controller {
    
	public static Result addDataPoint(String i) {
		return ok(views.html.index.render("Hello my framwork"+i));
	}
	
    public static Result index() {
	List<Task> tasks = Task.find.all();
        return ok(views.html.index.render("Hello my framwork"+tasks.get(0).name));
    }
    public static Result getUserstories() {
    	List<Task> tasks = Task.find.all();
        return ok(views.html.index.render("Hello my framwork"+tasks.get(0).name));
    }
    public static Result getTests(int userStoriesId) {
    	List<Task> tasks = Task.find.all();
        return ok(views.html.index.render("Hello my framwork"+tasks.get(0).name));
    }
        
    
    
}
