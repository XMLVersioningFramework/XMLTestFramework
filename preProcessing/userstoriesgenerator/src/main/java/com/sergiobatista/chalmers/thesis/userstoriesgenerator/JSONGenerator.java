package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

import org.apache.commons.lang3.text.WordUtils;
import org.json.JSONArray;
import org.json.JSONObject;

public class JSONGenerator {

	private JSONObject json = new JSONObject();

	/**
	 * input: [0] Timestamp, [1] Title, [2] Use Case, [3] Preconditions, [4]
	 * Actors, [5] Scenario, [6] Alternative Scenario, [7] Desired Outcome, [8]
	 * tags, [9] Where, [10] How, [11] What
	 */
	public JSONGenerator(String[] input) {
		String uuid = WordUtils.capitalizeFully(input[1].trim()).replaceAll(
				" ", "");
		json.put("uuid", uuid);

		this.setTitle(input[1]);
		this.setUseCase(input[2]);
		this.setPreConditions(input[3]);
		this.setActors(input[4]);
		this.setScenarios(input[5]);
		this.setAltScenarios(input[6]);
		this.setOutcome(input[7]);

		/**
		 * uncomment for the old version
		 */
		// this.setTags(input[8]);

		JSONObject tags = new JSONObject();
		this.setWhere(input[9], tags);
		this.setHow(input[10], tags);
		this.setWhat(input[11], tags);
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

		breakIntoListItems(input, ", ", arr);

		tags.put("what", arr);

	}

	private void setHow(String input, JSONObject tags) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ", ", arr);

		tags.put("how", arr);

	}

	private void setWhere(String input, JSONObject tags) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ", ", arr);

		tags.put("where", arr);

	}

	/**
	 * @deprecated
	 * @param input
	 */
	private void setTags(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ", ", arr);

		json.put("tags", arr);
	}

	private void setOutcome(String input) {
		json.put("outcome", input);
	}

	private void setAltScenarios(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ", ", arr);

		json.put("alternativeScenarios", arr);
	}

	private void setScenarios(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ", ", arr);

		json.put("scenarios", arr);
	}

	private void setActors(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ", ", arr);

		json.put("actors", arr);
	}

	private void setPreConditions(String input) {
		JSONArray arr = new JSONArray();

		breakIntoListItems(input, ", ", arr);

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
		for (String element : elements)
			if (!element.equalsIgnoreCase(""))
				arr.put(element);
	}

}
