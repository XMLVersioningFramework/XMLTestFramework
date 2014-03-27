package models;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import play.libs.Json;

public class UserStoryHandler {

    static String baseUrl = "./public/userStories/";

    public static String loadAllUserStories() {
	List<UserStory> userStories = new ArrayList<UserStory>();
	final File folder = new File(baseUrl);

	String tot = "[";

	for (final File fileEntry : folder.listFiles()) {
	    // System.out.println("check file: "+fileEntry.getName());

	    if (fileEntry.isDirectory()) {
		// System.out.println("is folder:");
		for (final File fileEntry2 : fileEntry.listFiles()) {
		    // System.out.println("fileEntry2 is file compare: "+fileEntry2.getName());
		    if (fileEntry2.getName().equals("userStory.json")) {
			// System.out.println("existing user story:" +
			// fileEntry.getName());
			// userStories.add(new
			// UserStory(fileEntry.getName(),getTotalFile(fileEntry2)));
			ObjectMapper mapper = new ObjectMapper();
			ObjectNode userStory = (ObjectNode) Json
				.parse(getTotalFile(fileEntry2));
			// mapper.writeValue(arg0, userStory);
			// System.out.println("||||||||||||"+userStory.get("uuid").asText()+"|<|");
			getTests(userStory.putArray("tests"),
				userStory.get("uuid").asText());
			// System.out.println(Json.toJson(userStory));
			tot += Json.toJson(userStory) + ",";
		    }
		}
	    }
	}
	tot = tot.substring(0, tot.length() - 1);
	tot += "]";
	return tot;
    }

    public static void getTests(ArrayNode arrayNode, String userStoryUUID) {
	// String Userstory=getTotalFile(new
	// File(baseUrl+arrayNode+"/userStory.html"));

	// UserStory userStory=new UserStory(arrayNode, Userstory);
	// System.out.println(userStoryUUID);
	final File folder = new File(baseUrl + userStoryUUID);

	for (final File fileEntry : folder.listFiles()) {// looping the folder
	    if (fileEntry.isDirectory()) {// tests
		ObjectNode objectNode = arrayNode.addObject();
		objectNode.put("run",getTotalFile(new File(baseUrl + userStoryUUID + "/"
				+ fileEntry.getName() + "/run.js")));
		
		objectNode.put("runFile", userStoryUUID + "/"
				+ fileEntry.getName() + "/run.js");
		objectNode.put("name", fileEntry.getName());

		System.out.println("ett test: " + fileEntry.getName());

		ArrayNode inputArr = objectNode.putArray("input");
		File input = new File(baseUrl + userStoryUUID + "/"
			+ fileEntry.getName() + "/input");
		System.out.println(baseUrl + userStoryUUID + "/"
			+ fileEntry.getName() + "/input");

		if (input.exists()) {
		    for (final File inputFile : input.listFiles()) {// looping
								    // the
								    // folder
			inputArr.add(inputFile.getName());
		    }
		}

		ArrayNode outputArr = objectNode.putArray("output");
		File output = new File(baseUrl + userStoryUUID + "/"
			+ fileEntry.getName() + "/output");
		if (output.exists()) {
		    for (final File outputFile : output.listFiles()) {// looping
								      // the
								      // folder
			outputArr.add(outputFile.getName());
		    }
		}
	    }

	}

    }

    static String getTotalFile(File f) {
	String sCurrentLine;
	String totFile = "";
	BufferedReader br;
	try {
	    br = new BufferedReader(new FileReader(f));
	    while ((sCurrentLine = br.readLine()) != null) {
		totFile += sCurrentLine;
	    }
	    return totFile;
	    // userStorys.add(new UserStory(totFile));
	} catch (IOException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}
	return totFile;
    }

}
