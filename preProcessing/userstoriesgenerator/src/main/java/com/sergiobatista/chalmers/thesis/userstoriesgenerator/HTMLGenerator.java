package com.sergiobatista.chalmers.thesis.userstoriesgenerator;

public class HTMLGenerator {

	private String html = "";

	public String getHtml() {
		return html;
	}

	/**
	 * input: [0] Timestamp, [1] User Story Title, [2] Use Case, [3]
	 * Preconditions, [4] Actors, [5] Scenario, [6] Alternative Scenario, [7]
	 * Desired Outcome, [8] tags
	 */
	public HTMLGenerator(String[] input) {

		html += getOpeningTag();

		html += getUserStoryTitle(input[1]);
		html += getUseCase(input[2]);
		html += getPreConditions(input[3]);
		html += getActors(input[4]);
		html += getScenarios(input[5]);
		html += getAltScenarios(input[6]);
		html += getOutcome(input[7]);
		html += getTags(input[8]);

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
		
		String output = breakIntoListItems(input, ", ");

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

		String output = breakIntoListItems(input, ", ");

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
	private String getScenarios(String input) {
		String openTag = "<div class=\"scenario\"><ol>";
		String closeTag = "</ol></div>";

		String output = breakIntoListItems(input, "; ");

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
	private String getAltScenarios(String input) {
		if (!input.equalsIgnoreCase("")) {
			String openTag = "<div class=\"alt-scenario\"><ol>";
			String closeTag = "</ol></div>";

			String output = breakIntoListItems(input, "; ");

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

		String output = breakIntoListItems(input, ", ");

		return openTag + output + closeTag;
	}

	private String breakIntoListItems(String input, String delimiter) {
		String output = "";
		String[] elements = input.trim().split(delimiter);
		for (String element : elements)
			output += "<li>" + element + "</li>";
		return output;
	}
}
