package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

public class HTMLGenerator {

	private String html = "";

	public String getHtml() {
		return html;
	}

	/**
	 * input: [0] Timestamp,[1]ID, [2] User Story Title, [3] Use Case, [4]
	 * Preconditions, [5] Actors, [6] Scenario, [7] Alternative Scenario, [8]
	 * Desired Outcome, [9] tags
	 */
	public HTMLGenerator(String[] input) {

		html += getOpeningTag();

		html += getUserStoryTitle(input[2]);
		html += getUseCase(input[3]);
		html += getPreConditions(input[4]);
		html += getActors(input[5]);
		html += getScenario(input[6]);
		html += getAltScenario(input[7]);
		html += getOutcome(input[8]);
		html += getTags(input[9]);

		html += getClosingTag();
	}

	private String getClosingTag() {
		return "</div>";
	}

	private String getOpeningTag() {
		return "<div class=\"user-scenario\">";
	}

	/**
	 * <div class="user-story-title"><h1>$title</h1></div>
	 * 
	 * @param input
	 * @return
	 */
	private String getUserStoryTitle(String input) {
		String openTag = "<div class=\"user-story-title\"><h1>";
		String closeTag = "</h1></div>";

		return openTag + input + closeTag;
	}

	/**
	 * <div class="use-case">
	 * <p>
	 * $text
	 * </p>
	 * </div>
	 * 
	 * @param input
	 * @return
	 */
	private String getUseCase(String input) {
		String openTag = "<div class=\"use-case\"><p>";
		String closeTag = "</p></div>";

		return openTag + input + closeTag;
	}

	/**
	 * <div class="pre-conditions"><ul>
	 * <li>
	 * $text
	 * </li>
	 * </ul>
	 * </div>
	 * 
	 * @param outcome
	 * @return
	 */
	private String getPreConditions(String input) {
		String openTag = "<div class=\"pre-conditions\"><ul>";
		String closeTag = "</ul></div>";
		
		String output = breakIntoListItems(input, ",");

		return openTag + output + closeTag;
	}

	/**
	 * <div class="actors">
	 * <ul>
	 * <li>....</li>
	 * </ul>
	 * </div>
	 * 
	 */
	private String getActors(String input) {
		String openTag = "<div class=\"actors\"><ul>";
		String closeTag = "</ul></div>";

		String output = breakIntoListItems(input, ",");

		return openTag + output + closeTag;
	}

	/**
	 * <div class="scenario">
	 * <ol>
	 * <li>....</li>
	 * </ol>
	 * </div>
	 * 
	 */
	private String getScenario(String input) {
		String openTag = "<div class=\"scenario\"><ol>";
		String closeTag = "</ol></div>";

		String output = breakIntoListItems(input, ";");

		return openTag + output + closeTag;
	}

	/**
	 * <div class="alt-scenario">
	 * <ol>
	 * <li>....</li>
	 * </ol>
	 * </div>
	 * 
	 */
	private String getAltScenario(String input) {
		if (!input.equalsIgnoreCase("")) {
			String openTag = "<div class=\"alt-scenario\"><ol>";
			String closeTag = "</ol></div>";

			String output = breakIntoListItems(input, ";");

			return openTag + output + closeTag;
		} else
			return "";
	}

	/**
	 * <div class="outcome"> TEXT </div>
	 * 
	 * @param outcome
	 * @return
	 */
	private String getOutcome(String input) {
		String openTag = "<div class=\"outcome\"><p>";
		String closeTag = "</p></div>";

		return openTag + input + closeTag;
	}

	/**
	 * <div class="tags">
	 * <ul>
	 * <li>tag1</li>
	 * </ul>
	 * </div>
	 */
	private String getTags(String input) {
		String openTag = "<div class=\"tags\"><ol>";
		String closeTag = "</ol></div>";

		String output = breakIntoListItems(input, ",");

		return openTag + output + closeTag;
	}

	private String breakIntoListItems(String input, String delimiter) {
		String output = "";
		String[] elements = input.trim().split(delimiter);
		for (String element : elements){
			element = element.trim();
			output += "<li>" + element + "</li>";
		}
		return output;
	}
}
