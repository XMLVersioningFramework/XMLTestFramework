var userStories=[];
var backends=["git","Xcronicler"];
var currentBackend="git";

$( document ).ready(function() {
	$(backends).each(function(i,data){
		$("#backends").append('<option value='+i+'>'+data+'</option>');
	})
	$("#backends").change(function() {
		currentBackend=backends[$(this).val()];
	});

	getUserStories();
	$("#runAllTests").click(function (arg) {
		alert("running all tests");
		$(userStories).each(function (i,story) {
			$(story.tests).each(function (j,test) {
				eval(test.run);
			})
			
		});
	});
	$(".menuRunTest").click(function (a) {
		console.log(a);
		var userstory=$(a.target).attr("userstory");
		var test=$(a.target).attr("test");
		$(userStories).each(function (i,aStory) {
			//console.log(aStory.getUuid());
			if(aStory.getUuid()==userstory){
				$(aStory.tests).each(function (j,aTest) {
			//		console.log(aTest.name);
					if(test==aTest.name){
						eval(aTest.run);
					}
				});
			}

		})

	});
});
function getUserStories(){
	$.ajax({
	  dataType: "json",
	  url: "/getUserStories",
	  success: success,
	  error: error
	});
	function success(data){
		var panelGroup=$('<div class="panel-group" id="accordion">');
		$("#listUserStories").append(panelGroup);
				
		$(data).each(function(nr,story){
			var tempUserStory=new userStory(nr,story);
			userStories.push(tempUserStory);
			panelGroup.append(tempUserStory.getHTML());
			//tempUserStory.setDomListners();
		});
		paintGraph();

	}
	function error(data){
		alert("error listUserStories");
		console.log(data);
	}
}
function addDataPoinOnServer(testName,value) {
	var data={testName:testName,value:value,backend:"git"}
	$.ajax({
	  type: "POST",
	  url: "./addDataPoint",
	  data: data,
	  success: function(data) {
	  	console.log("sending datapoint to server");
	  }
	});
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
function compare(orginalText,newText){
	return new Promise(function(resolve, reject) {
		var data={orginalText:orginalText,newText:newText};
		 var ajaxRequest=$.ajax({
		  type: "POST",
		  url: "./compareXML",
		  data: data
		});
		
		ajaxRequest.done(function (response, textStatus, jqXHR){
			resolve(response);
		});
		
		ajaxRequest.fail(function (response, textStatus, jqXHR){
			reject(response);
		});
	}); 
}

function paintGraph() {
	//summirize tags 
	var hows={};
	var wheres={};
	var whats={};

	
	$(userStories).each(function(nr,story){
		$(story.getTags().what).each(function(nr,what){
			if(typeof whats[what] === 'undefined'){
				whats[what]=0;
			}
			whats[what]++;
		});
		$(story.getTags().where).each(function(nr,where){
			if(typeof wheres[where] === 'undefined'){
				wheres[where]=0;
			}
			wheres[where]++;
		});
		$(story.getTags().how).each(function(nr,how){
			if(typeof hows[how] === 'undefined'){
				hows[how]=0;
			}
			hows[how]++;
		});
	});
	
	
	var data=[];
	var topics=[];
	$.each( whats, function( index, value ){
		topics.push(index);
		data.push(value);
	});
	createAGraph(topics,data,"what");

	var data=[];
	var topics=[];
	$.each( wheres, function( index, value ){
		topics.push(index);
		data.push(value);
	});
	createAGraph(topics,data,"where");

	var data=[];
	var topics=[];
	$.each( hows, function( index, value ){
		topics.push(index);
		data.push(value);
	});
	createAGraph(topics,data,"how");

	function createAGraph(topics,data,name){
		$('#container').append("<div id='"+name+"'>")
	    $('#'+name).highcharts({
	        chart: {
	            type: 'column',
	            margin: [ 50, 50, 100, 80]
	        },
	        title: {
	            text: 'User storys '+name
	        },
	        xAxis: {
	            categories: topics,
	            labels: {
	                rotation: -45,
	                align: 'right',
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, sans-serif'
	                }
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'userStories'
	            }
	        },
	        legend: {
	            enabled: false
	        }
	        ,
	        series: [{
	            name: 'userStories',
	            data: data,
	            dataLabels: {
	                enabled: true,
	                rotation: -90,
	                color: '#FFFFFF',
	                align: 'right',
	                x: 4,
	                y: 10,
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, sans-serif',
	                    textShadow: '0 0 3px black'
	                }
	            }
	        }]
	    });
	}    
}