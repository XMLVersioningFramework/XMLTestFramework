//import userstory
getUserStories();
var userstories=[];
function getUserStories(){
	$.ajax({
	  dataType: "json",
	  url: "/getUserStories",
	  success: success,
	  error: error
	});
	function success(data){
		
		$(data).each(function(nr,story){
			userstories.push(new userStory(story,story.test));
			$("#listUserStories").append(story.name+"<br />");
		});
		//$("#listUserStories").html(data);
		
	}
	function error(data){
		alert("error listUserStories");
		console.log(data);
	}
}

function getaUserStory(story){
	$.ajax({
	  dataType: "json",
	  url: "/getAUserStory/"+story,
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