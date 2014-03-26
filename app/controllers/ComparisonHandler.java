package controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.custommonkey.xmlunit.DetailedDiff;
import org.custommonkey.xmlunit.Diff;
import org.custommonkey.xmlunit.XMLUnit;
import org.xml.sax.SAXException;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import com.fasterxml.jackson.databind.node.ObjectNode;

public class ComparisonHandler extends Controller {

	public static Result compareXML() {
		final Map<String, String[]> post = request().body().asFormUrlEncoded();
		String expected = post.get("expected")[0];
		String actual = post.get("actual")[0];
		System.out.println(expected);
		System.out.println(actual);

		ObjectNode returnJson = Json.newObject();
		if (expected.equals(actual)) {
			returnJson.put("similarity", "100%");
		} else {
			returnJson.put("similarity", "not 100%");
		}

		return ok(returnJson);
	}

	public static Result compareWithXMLUnit() {
		/**
		 * Process request
		 */
		final Map<String, String[]> jsonReceived = request().body()
				.asFormUrlEncoded();
		String expected = jsonReceived.get("expected")[0];
		String actual = jsonReceived.get("actual")[0];

		/**
		 * The returning object
		 */
		ObjectNode returnJson = Json.newObject();

		/**
		 * Setup the eval conditions
		 */
		String evalResult = "not evaluated";
		setupXMLUnit();

		Diff d;
		DetailedDiff dd;
		try {
			d = new Diff(expected, actual);
			dd = new DetailedDiff(d);
			dd.overrideElementQualifier(null);
			if (dd.identical()) {
				evalResult = "identical";
			} else if (dd.similar()) {
				evalResult = "similar but not identical";
				printDifferences(dd);
			} else {
				evalResult = "not similar";
				printDifferences(dd);
			}

		} catch (SAXException e) {
			evalResult = "failed to test, malformed XML";
			e.printStackTrace();
			return ok(returnJson.put("similarity", evalResult));
		} catch (IOException e) {
			evalResult = "failed to test, IO Exception";
			e.printStackTrace();
			return ok(returnJson.put("similarity", evalResult));
		} finally {
			returnJson.put("similarity", evalResult);
			System.out.print("Evaluation Result: " + evalResult);
		}
		return ok(returnJson);
	}

	private static void printDifferences(DetailedDiff dd) {
		System.out.println("Differences: ");
		@SuppressWarnings("rawtypes")
		List l = dd.getAllDifferences();
		for (Object object : l) {
			System.out.println(object);
		}
	}
	private static void setupXMLUnit() {
		XMLUnit.setCompareUnmatched(false);
		XMLUnit.setExpandEntityReferences(true);
		XMLUnit.setIgnoreComments(false);
		XMLUnit.setIgnoreAttributeOrder(true);
		XMLUnit.setIgnoreDiffBetweenTextAndCDATA(true);
		XMLUnit.setIgnoreWhitespace(true);
		XMLUnit.setNormalize(true);
		XMLUnit.setNormalizeWhitespace(false);
	}
}