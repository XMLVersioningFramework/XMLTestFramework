(function(){
	/* compare (expected, actual) */
	var userStoryUuid="addNode";
	var testName="short";

	compare("<abc></abc>", "<abc></abc>").then(function(response) {
	//reportIn(userStoryUuid,testName,"success");
		reportIn(userStoryUuid,testName,"success");
	}, function(error) {
		reportIn(userStoryUuid,testName,"fail");
	  	alert("Failed!");
	});
})();