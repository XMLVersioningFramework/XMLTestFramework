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
		var panelGroup=$('<div class="panel-group" id="accordion">');
			$("#listUserStories").append(panelGroup);
				
		$(data).each(function(nr,story){
			var tempUserStory=new userStory(nr,story)
			userStories.push(tempUserStory);
			//console.log(tempUserStory);
			panelGroup.append(tempUserStory.getHTML());
			
		});
		//$("#listUserStories").html(data);
		paintGraph();
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

function paintGraph() {
	//summirize tags 
	var hows=[];
	var wheres=[];
	var whats=[];
	var bigTopics=[];
	
	$(userStories).each(function(nr,story){
		console.log("..userStories..");
		$(story.getTags().what).each(function(nr,what){
			if(typeof whats[what] === 'undefined'){
				whats[what]={};
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
	console.log("tags");


	console.log("whats");
	$(whats).each(function(id,data){
		console.log(id);
		bigTopics.push(id);
	});
	console.log("where");
	$(wheres).each(function(id,data){
		console.log(id);
		
	});
	console.log("hows");
	$(hows).each(function(id,data){
		console.log(id);
	});

    $('#container').highcharts({
        chart: {
            type: 'column',
            margin: [ 50, 50, 100, 80]
        },
        title: {
            text: 'User storys what'
        },
        xAxis: {
            categories: [
                'Tokyo',
                'Jakarta',
                'New York',
                'Seoul',
                'Manila',
                'Mumbai',
                'Sao Paulo',
                'Mexico City',
                'Dehli',
                'Osaka',
                'Cairo',
                'Kolkata',
                'Los Angeles',
                'Shanghai',
                'Moscow',
                'Beijing',
                'Buenos Aires',
                'Guangzhou',
                'Shenzhen',
                'Istanbul'
            ],
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
                text: 'Population (millions)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>',
        },
        series: [{
            name: 'Population',
            data: [34.4, 21.8, 20.1, 20, 19.6, 19.5, 19.1, 18.4, 18,
                17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,
                11.7, 11.2],
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