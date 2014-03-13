package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.commons.lang3.text.WordUtils;

import au.com.bytecode.opencsv.CSVReader;

public class App {
	
	public static void main(String[] args) {
		//location of the input file (relative to the user's home folder location)
		String csvInputFilePath = "/Desktop/test.csv";
		
		//collects the user's home folder location
		String userHome = System.getProperty("user.home");
		
		/**
		 * output location for the folder structure relative to the user's home location
		 * 
		 * use the format "/PATH/" format
		 */
		String saveOutput = userHome + "/Desktop/userStories/";
		
		String fullInputPath = userHome + csvInputFilePath;

		/**
		 * ArrayList of string arrays with the content of the csv input file
		 */
		ArrayList<String[]> myEntries = csvParser(fullInputPath);

		for (String[] row : myEntries) {
			//Create folder
			String entry = WordUtils.capitalizeFully(row[1].trim()).replaceAll(" ", "");
			System.out.println("Entry:"+ entry);
			
			String entryPath = saveOutput + entry;
			FileManager.createFolder(entryPath);
			
			
			//Create 'userStory.html' based on the row
			HTMLGenerator generator = new HTMLGenerator(row);
			generator.getHtml();
			
			String userStoryPath = entryPath + "/userStory.html";
			String userStoryContent = generator.getHtml();
			
			FileManager.createFile(userStoryPath, userStoryContent);
			
		}
		
	}

	private static ArrayList<String[]> csvParser(String fullInputPath) {
		CSVReader reader;
		ArrayList<String[]> myEntries = new ArrayList<String[]>();
		try {
			reader = new CSVReader(new FileReader(fullInputPath));
			myEntries = (ArrayList<String[]>) reader.readAll();
			reader.close();
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return myEntries;
	}
}
