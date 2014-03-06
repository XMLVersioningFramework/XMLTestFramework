package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import models.Task;
import java.util.*;

public class Application extends Controller {
    
	public static Result addDataPoint() {
		return ok(views.html.index.render("Hello my framwork"));
	}
	
    public static Result index() {
	List<Task> tasks = Task.find.all();
        return ok(views.html.index.render("Hello my framwork"+tasks.get(0).name));
    }
    
}
