package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

import org.apache.commons.lang3.text.WordUtils;
import org.json.JSONArray;
import org.json.JSONObject;

public class JSONGenerator {

	private JSONObject json = new JSONObject();

	/**
	 * input: [0] Timestamp,[1]ID, [2] User Story Title, [3] Use Case, [4]
	 * Preconditions, [5] Actors, [6] Scenario, [7] Alternative Scenario, [8]
	 * Desired Outcome, [9] tags,
	 * [10]What, [11] Where, [12] How
	 */
	public JSONGenerator(String[] input) {
		String uuid = WordUtils.capitalizeFully(input[2].trim()).replaceAll(
				" ", "");
		json.put("uuid", uuid);

		this.setTitle(input[2]);
		this.setUseCase(input[3]);
		this.setPreConditions(input[4]);
		this.setActors(input[5]);
		this.setScenario(input[6]);
		this.setAltScenario(input[7]);
		this.setOutcome(input[8]);

		/**
		 * uncomment for the old version
		 */
		// this.setTags(input[8]);

		JSONObject tags = new JSONObject();
		this.setWhat(input[10], tags);
		this.setWhere(input[11], tags);
		this.setHow(input[12], tags);
		
		json.put("tags", tags);

	}

	@Override
	public String toString() {
		return json.toString();
	}

	public JSONObject getJson() {
		return json;
	}

	private void setWhat(String input, JSONObject tags) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ",", arr);

		tags.put("what", arr);

	}

	private void setHow(String input, JSONObject tags) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ",", arr);

		tags.put("how", arr);

	}

	private void setWhere(String input, JSONObject tags) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ",", arr);

		tags.put("where", arr);

	}

	/**
	 * @deprecated
	 * @param input
	 */
	private void setTags(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ",", arr);

		json.put("tags", arr);
	}

	private void setOutcome(String input) {
		json.put("outcome", input);
	}

	private void setAltScenario(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ";", arr);

		json.put("alternativeScenario", arr);
	}

	private void setScenario(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ";", arr);

		json.put("scenario", arr);
	}

	private void setActors(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ",", arr);

		json.put("actors", arr);
	}

	private void setPreConditions(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ",", arr);

		json.put("preConditions", arr);
	}

	private void setUseCase(String input) {
		json.put("useCase", input);
	}

	private void setTitle(String input) {
		json.put("title", input);
	}

	private void breakIntoListItems(String input, String delimiter,
			JSONArray arr) {
		String[] elements = input.trim().split(delimiter);
		for (String element : elements) {
			element = element.trim();
			if (!element.equalsIgnoreCase(""))
				arr.put(element);
		}
	}

}
