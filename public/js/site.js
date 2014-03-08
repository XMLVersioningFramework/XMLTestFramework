
getUserStories();
function getUserStories(){
	$.ajax({
	  dataType: "json",
	  url: "/getUserstories",
	  success: success,
	  error: error
	});
	function success(data){
		console.log(data);
		
	}
	function error(data){
		alert("error");
		console.log(data);
	}
}

function getaUserStory(String story){
	$.ajax({
	  dataType: "json",
	  url: "/getAUserstory/"+story,
	  success: success,
	  error: error
	});
	function success(data){
		console.log(data);
		
	}
	function error(data){
		alert("error");
		console.log(data);
	}
}