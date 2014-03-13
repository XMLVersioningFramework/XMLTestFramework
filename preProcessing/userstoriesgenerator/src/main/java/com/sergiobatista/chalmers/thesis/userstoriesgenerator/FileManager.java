package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class FileManager {
	public FileManager() {
	}

	public static void createFolder(String fullPath) {

		File theDir = new File(fullPath);

		// if the directory does not exist, create it
		if (!theDir.exists()) {
			boolean result = theDir.mkdir();

			if (result) {
				System.out.println("Dir: " + fullPath + " created");
			}
		} else
			System.out.println("Dir: " + fullPath
					+ " already exists, skipped creation");
	}

	public static void createFile(String filePath, String fileContent) {
		PrintWriter out;
		try {
			out = new PrintWriter(filePath);
			out.write(fileContent);
			out.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
