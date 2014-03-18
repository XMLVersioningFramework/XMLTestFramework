package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.commons.lang3.text.WordUtils;

import au.com.bytecode.opencsv.CSVReader;

public class App {
	/**
	 * Path of the desktop of the user
	 */
	static final String DESKTOP_PATH = System.getProperty("user.home")
			+ "/Desktop/";

	/**
	 * Path for the repository location
	 */
	static final String REPOSITORY_PATH = "../../userStories/";

	/**
	 * File name of the csv used for input
	 */
	static final String CSV_INPUT_FILE_NAME = "./userStories.csv";

	/**
	 * File name of the html output
	 */
	static final String HTML_OUTPUT_FILE_NAME = "./userStory.html";

	/**
	 * File name of the JSON output
	 */
	static final String JSON_OUTPUT_FILE_NAME = "./userStory.json";

	/**
	 * Relative output path for the user stories
	 */
	static final String OUTPUT_PATH = "./";

	/**
	 * are we exporting/importing from the desktop? (set to false to use the
	 * path of the app)
	 */
	static final boolean USE_DESKTOP = false;

	public static void main(String[] args) {

		String fullInputPath = setInputPath();

		String saveOutput = setSaveOutputPath();

		/**
		 * ArrayList of string arrays with the content of the csv input file
		 */
		ArrayList<String[]> myEntries = csvParser(fullInputPath);

		/**
		 * Skip the title row as it is not needed
		 */
		myEntries.remove(0);

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

			/**
			 * Create 'userStory.json' based on the row and entry path
			 */
			generateJSONFile(row, entryPath);
		}
	}

	/**
	 * sets the input path according to the global settings
	 * 
	 * @return
	 */
	private static String setInputPath() {
		if (USE_DESKTOP)
			return DESKTOP_PATH + CSV_INPUT_FILE_NAME;
		else
			return REPOSITORY_PATH + CSV_INPUT_FILE_NAME;
	}

	/**
	 * sets the save output path according to the global settings
	 * 
	 * @return
	 */
	private static String setSaveOutputPath() {
		if (USE_DESKTOP)
			return DESKTOP_PATH + OUTPUT_PATH;
		else
			return REPOSITORY_PATH + OUTPUT_PATH;
	}

	/**
	 * creates the folder for the entry (userStory) based on their title
	 * 
	 * @param saveOutput
	 * @param row
	 * @return
	 */
	private static String createEntryPath(String saveOutput, String[] row) {
		String entry = WordUtils.capitalizeFully(row[1].trim()).replaceAll(" ",
				"");
		System.out.println("Entry:" + entry);

		String entryPath = saveOutput + entry + "/";
		FileManager.createFolder(entryPath);
		return entryPath;
	}

	/**
	 * generates the descriptive JSON file for the entry
	 * 
	 * @param row
	 * @param entryPath
	 */
	private static void generateJSONFile(String[] row, String entryPath) {
		JSONGenerator jsonGenerator = new JSONGenerator(row);

		String userStoryFileName = JSON_OUTPUT_FILE_NAME;
		String userStoryPath = entryPath;
		String userStoryContent = jsonGenerator.toString();

		FileManager.createFile(userStoryContent, userStoryFileName,
				userStoryPath);
	}

	/**
	 * generates the descriptive HTML file for the entry
	 * 
	 * @param row
	 * @param entryPath
	 */
	private static void generateHTMLFile(String[] row, String entryPath) {
		HTMLGenerator htmlGenerator = new HTMLGenerator(row);

		String userStoryContent = htmlGenerator.getHtml();
		String userStoryFileName = HTML_OUTPUT_FILE_NAME;
		String userStoryPath = entryPath;

		FileManager.createFile(userStoryContent, userStoryFileName,
				userStoryPath);
	}

	/**
	 * Parses the csv to an arraylist of string arrays, where each string array
	 * is a row
	 * 
	 * @param fullInputPath
	 * @return
	 */
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
