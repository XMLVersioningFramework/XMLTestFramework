var userStories=[];
getUserStories();
function getUserStories(){
	$.ajax({
	  dataType: "json",
	  url: "/getUserStories",
	  success: success,
	  error: error
	});
	function success(data){
		
		$(data).each(function(nr,story){
			console.log(story);
			var tempUserStory=new userStory(story)
			userStories.push(tempUserStory);
			console.log(tempUserStory);
			
			$("#listUserStories").append(tempUserStory.getHTML());
		});
		//$("#listUserStories").html(data);
		
	}
	function error(data){
		alert("error listUserStories");
		console.log(data);
	}
}

function getUserStory(story){
	$.ajax({
	  dataType: "json",
	  url: "/getUserStory/"+story,
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