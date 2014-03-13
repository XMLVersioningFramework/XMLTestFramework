package models;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class UserStoryHandler {
	

static String baseUrl="./userStories/";

	public static String loadAllUserStories(){
		List<UserStory> userStories =new ArrayList<UserStory>();
		final File folder = new File(baseUrl);
		
		
		String tot="[";
		
		for (final File fileEntry : folder.listFiles()) {
			//System.out.println("check file: "+fileEntry.getName());

			if (fileEntry.isDirectory()) {
				//System.out.println("is folder:");
				for (final File fileEntry2 : fileEntry.listFiles()) {
					//System.out.println("fileEntry2 is file compare: "+fileEntry2.getName());
					if(fileEntry2.getName().equals("userStory.json")){
					//	System.out.println("existing user story:" + fileEntry.getName());
						//userStories.add(new UserStory(fileEntry.getName(),getTotalFile(fileEntry2)));
						tot+=getTotalFile(fileEntry2)+",";
					}
				}
	        }
		}
		tot = tot.substring(0, tot.length()-1);
		tot+="]";
		return tot;
	}
	public static UserStory getTests(String url){
		String Userstory=getTotalFile(new File(baseUrl+url+"/userStory.html"));
		
		UserStory userStory=new UserStory(url, Userstory);
		
		final File folder = new File(baseUrl+url);
		
	
		
		for (final File fileEntry : folder.listFiles()) {//looping the folder
			if (fileEntry.isDirectory()) {//tests
				System.out.println("ett test: "+fileEntry.getName());
				
				Test test=new Test(fileEntry.getName());
				userStory.addTests(test);
				test.setRunFile(getTotalFile(new File(baseUrl+url+fileEntry.getName()+"/run.js")));
				File input=new File(baseUrl+url+fileEntry.getName()+"/input");
				for (final File inputFile : input.listFiles()) {//looping the folder
					test.addInput( getTotalFile(inputFile));
				}
				
				File output=new File(baseUrl+url+fileEntry.getName()+"/output");
				for (final File outputFile : output.listFiles()) {//looping the folder
					test.addOutput( getTotalFile(outputFile));
				}
			}
			
		}
		return userStory;
	}
	
	static String getTotalFile(File f){
		String sCurrentLine;
		String totFile="";
		BufferedReader br;
		try {
			br = new BufferedReader(new FileReader(f));
			while ((sCurrentLine = br.readLine()) != null) {
				totFile+=sCurrentLine;
			}
			return totFile;
			//userStorys.add(new UserStory(totFile));
		} catch ( IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return totFile;	 
	}
	
}
