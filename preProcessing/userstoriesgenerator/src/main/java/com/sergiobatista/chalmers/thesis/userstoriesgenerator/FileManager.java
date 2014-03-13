package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

import java.io.File;

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

}
