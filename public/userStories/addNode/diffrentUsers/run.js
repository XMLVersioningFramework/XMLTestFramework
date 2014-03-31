(function(){
	console.log("run longTest");
	var userStoryUuid="addNode";
	var testName="diffrentUsers";

	var commonAPI = new CommonAPI();

	var file = $("<div>");
	$("<div>").html("hej").appendTo(file);

	commonAPI.initRepo().then(
		function(data) {
			return commonAPI.commit("a.txt", file[0].outerHTML, "texts");
		},
		function(data) {
			reportIn(userStoryUuid,testName,"fail");
		}
	).then(
		function(data) {
			commonAPI.setUser(1);
			$("<div>").html("Detta är bob").appendTo(file);
			return commonAPI.commit("a.txt", file[0].outerHTML, "texts");
		},
		function(data) {
			reportIn(userStoryUuid,testName,"fail");
		}
	).then(
		function(data) {
			return commonAPI.getHEAD();
		},function(data) {
			reportIn(userStoryUuid,testName,"fail");
		}
	).then(
		function(data) {
			return compare(file[0].outerHTML, data.files[0].fileContent);
		},function(data) {
			alert("get head dont work");
			reportIn(userStoryUuid,testName,"fail");
		}
	).then(
	    function(fromServer) {
	    	console.log(fromServer);
	    	reportIn(userStoryUuid,testName,"success");

	    },function(data) {
	    	alert("compare dont work");
	    	reportIn(userStoryUuid,testName,"fail");
	    }
	)
})()



