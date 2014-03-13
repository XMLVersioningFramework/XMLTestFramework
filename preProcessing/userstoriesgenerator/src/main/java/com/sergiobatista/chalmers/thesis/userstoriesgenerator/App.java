package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import org.apache.commons.lang3.text.WordUtils;

import au.com.bytecode.opencsv.CSVReader;

public class App {
	
	public static void main(String[] args) {
		String csvInputFilePath = "/Desktop/test.csv";
		String userHome = System.getProperty("user.home");
		
		/**
		 * use the format "/PATH/" format
		 */
		String saveOutput = userHome + "/Desktop/userStories/";
		
		String fullInputPath = userHome + csvInputFilePath;

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

		for (String[] row : myEntries) {
			//Create folder
			String entry = WordUtils.capitalizeFully(row[1].trim()).replaceAll(" ", "");
			System.out.println("Entry:"+ entry);
			
			String entryPath = saveOutput + entry;
			FileManager.createFolder(entryPath);
			
			
			//Create 'userStory.html'
			HTMLGenerator generator = new HTMLGenerator(row);
			generator.getHtml();
			
			PrintWriter out;
			try {
				out = new PrintWriter(entryPath + "/userStory.html");
				out.write(generator.getHtml());
				out.close();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
	}
}
