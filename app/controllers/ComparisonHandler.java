package controllers;

import java.util.Map;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import com.fasterxml.jackson.databind.node.ObjectNode;

public class ComparisonHandler extends Controller {

    public static Result compareXML() {
	final Map<String, String[]> post = request().body().asFormUrlEncoded();
	String expected = post.get("expected")[0];
	String actual = post.get("actual")[0];
	System.out.println(expected);
	System.out.println(actual);

	ObjectNode returnJson = Json.newObject();
	if (expected.equals(actual)) {
	    returnJson.put("similarity", "100%");
	} else {
	    returnJson.put("similarity", "not 100%");
	}

	return ok(returnJson);
    }

}
