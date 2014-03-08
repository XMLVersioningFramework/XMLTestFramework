package models;

import java.io.File;

public class UserStoryHandler {
	static String baseUrl="../userStories/";
	
	public static void loadAllUserStories(){
		final File folder = new File(baseUrl);
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isDirectory()) {
				System.out.println("folder"+fileEntry.getName());
	        } else {
	            System.out.println(fileEntry.getName());
	        }
		}
	}
	
}
