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
		
		String fullInputPath = userHome + csvInputFilePath;
		
		/**
		 * Set output location for the folder structure relative to the user's home location
		 * 
		 * use the format "/PATH/" format
		 */
		String saveOutput = userHome + "/Desktop/userStories/";

		/**
		 * ArrayList of string arrays with the content of the csv input file
		 */
		ArrayList<String[]> myEntries = csvParser(fullInputPath);

		/**
		 * iterate the rows, parse them, and create folder and files 
		 */
		for (String[] row : myEntries) {
			/**
			 * Create folder
			 */
			String entryPath = createEntryPath(saveOutput, row);
						
			/**
			 * Create 'userStory.html' based on the row and entry path
			 */
			generateHTMLFile(row, entryPath);
			
		}
		
	}

	private static String createEntryPath(String saveOutput, String[] row) {
		String entry = WordUtils.capitalizeFully(row[1].trim()).replaceAll(" ", "");
		System.out.println("Entry:"+ entry);
		
		String entryPath = saveOutput + entry;
		FileManager.createFolder(entryPath);
		return entryPath;
	}

	private static void generateHTMLFile(String[] row, String entryPath) {
		HTMLGenerator htmlGenerator = new HTMLGenerator(row);
		htmlGenerator.getHtml();
		
		String userStoryPath = entryPath + "/userStory.html";
		String userStoryContent = htmlGenerator.getHtml();
		
		FileManager.createFile(userStoryPath, userStoryContent);
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
