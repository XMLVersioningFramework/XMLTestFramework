package models;

import java.util.ArrayList;
import java.util.List;

import play.libs.Json;

public class UserStory {
	String html="";
	List<Test> tests = new ArrayList<Test>();
	public UserStory(String tHtml,List<Test> tTests) {
		html=tHtml;
		tests=tTests;
		//System.out.println("file"+ s);
		// TODO Auto-generated constructor stub
	}
	public String getHtml(){
		return html;
	}
	public List<Test> getTests(){
		return tests;
	}
	
	
	@Override
	public String toString() {
		return html;
	}
	
}
