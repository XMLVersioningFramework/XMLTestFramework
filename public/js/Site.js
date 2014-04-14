var userStories=[];
var backends=["git","XChronicler"];
var currentBackend="git";
var nrSuccess=0;
var nrPending=0;
var nrFail=0;
var nrNotRunned=0;

$( document ).ready(function() {
  $(backends).each(function(i,data){
    $("#backends").append('<option value='+i+'>'+data+'</option>');
  })
  $("#backends").change(function() {
    $(userStories).each(function (i,story) {
      $(story.tests).each(function (j,test) {
        test.status=null;
      });
    });
    updateStatus();
    currentBackend=backends[$(this).val()];
  });

  loadUserStories();
  $(".runAllTests").click(function (arg) {
    alert("running all tests");
    $(userStories).each(function (i,story) {
      $(story.tests).each(function (j,test) {
        var millisecondsToWait = 100;
        var refreshInterval = setInterval(function() {
           if(nrPending==0){
              clearInterval(refreshInterval);
              reportIn(story.getUuid(),test.name,"pending");
              $.getScript("assets/userStories/"+test.runFile, function(){
                });
            }

        }, millisecondsToWait);
      })
      
    });
  });
  $(".menuRunTest").click(function (a) {
    console.log(a);
    var userstory=$(a.target).attr("userstory");
    var test=$(a.target).attr("test");
    console.log(userstory);
    var aStory=getUserStory(userstory);
    console.log(aStory);
    console.log(test);
    var aTest = getTest(aStory,test);
    reportIn(userstory,test,"pending");
    $.getScript("assets/userStories/"+aTest.runFile, function(a,b,c){
        
    })

  });
});
function loadUserStories() {
  $.ajax({
   dataType : "json",
   url : "/getUserStories",
   success : success,
   error : error
 });
  function success(data) {
   var panelGroup = $('<div class="panel-group" id="accordion">');
   $("#listUserStories").append(panelGroup);

   $(data).each(function(nr, story) {
     var tempUserStory = new userStory(nr, story);
     userStories.push(tempUserStory);
     panelGroup.append(tempUserStory.getHTML());
          // tempUserStory.setDomListners();

        });
   updateStatus();
   paintGraph();

 }
 function error(data) {
   alert("error listUserStories");
   console.log(data);
 }
}
function getUserStory(userStoryUuid){
  var returnStory=null;
  $(userStories).each(function (i,aStory) {
    if(aStory.getUuid()==userStoryUuid){
      returnStory=aStory;
    }
  });
  return returnStory;
}
function getTest(userStory,testName){
  var returnTest=null;
  $(userStory.tests).each(function (j,aTest) {
    console.log(aTest.name+" --- "+testName);
      if(testName==aTest.name){ 
        returnTest=aTest;
       
      }
  })
  return returnTest;
}


function reportIn(userStoryUuid,testName,status){
  console.log(userStoryUuid+" | "+testName);
  var userStory=getUserStory(userStoryUuid);
  var test=getTest(userStory,testName);
  console.log("test set: ");
  console.log(test);
  if(status=="success"){
    test.status="success";
  }else if(status=="pending"){
    test.status="pending";
  }else if(status=="fail"){
    test.status="fail";
  }else{
    alert("unknown status : "+status);
  }
  userStory.updateStatus();
  updateStatus();
}

function updateStatus() {
  nrSuccess=0;
  nrPending=0;
  nrFail=0;
  nrNotRunned=0;
  $(userStories).each(function (i,aStory) {
    $(aStory.tests).each(function (j,aTest) {
      if(aTest.status=="success"){
        nrSuccess++;
      }else if(aTest.status=="pending"){
        nrPending++;
      }else if(aTest.status=="fail"){
        nrFail++;
      }else{
        nrNotRunned++;
      }
    });
  });
  // console.log($(".testCounter"));
  $(".testCounter").html(nrSuccess+" / "+nrPending+" / "+nrFail+" / "+nrNotRunned);
} 


function addDataPoinOnServer(testName, value) {
  var data = {
   testName : testName,
   value : value,
   backend : "git"
 }
 $.ajax({
   type : "POST",
   url : "./addDataPoint",
   data : data,
   success : function(data) {
     console.log("sending datapoint to server");
   }
 });
}

function compare(expected, actual) {
  return new Promise(function(resolve, reject) {
   var data = {
     actual : actual,
     expected : expected
   };
   var ajaxRequest = $.ajax({
     type : "POST",
     url : "./compareXML",
     data : data
   });

   ajaxRequest.done(function(response, textStatus, jqXHR) {
     resolve(response);
   });

   ajaxRequest.fail(function(response, textStatus, jqXHR) {
     reject(response);
   });
 });
}

function paintGraph() {
    // summarize tags
    var hows = {};
    var wheres = {};
    var whats = {};

    $(userStories).each(function(nr, story) {
     $(story.getTags().what).each(function(nr, what) {
       if (typeof whats[what] === 'undefined') {
        whats[what] = 0;
      }
      whats[what]++;
    });
     $(story.getTags().where).each(function(nr, where) {
       if (typeof wheres[where] === 'undefined') {
        wheres[where] = 0;
      }
      wheres[where]++;
    });
     $(story.getTags().how).each(function(nr, how) {
       if (typeof hows[how] === 'undefined') {
        hows[how] = 0;
      }
      hows[how]++;
    });
   });

    var data = [];
    var topics = [];
    $.each(whats, function(index, value) {
     topics.push(index);
     data.push(value);
   });
    createAGraph(topics, data, "what");

    var data = [];
    var topics = [];
    $.each(wheres, function(index, value) {
     topics.push(index);
     data.push(value);
   });
    createAGraph(topics, data, "where");

    var data = [];
    var topics = [];
    $.each(hows, function(index, value) {
     topics.push(index);
     data.push(value);
   });
    createAGraph(topics, data, "how");

    function createAGraph(topics, data, name) {
     $('#container').append("<div id='" + name + "'>")
     $('#' + name).highcharts({
       chart : {
        type : 'column',
        margin : [ 50, 50, 100, 80 ]
      },
      title : {
        text : 'User storys ' + name
      },
      xAxis : {
        categories : topics,
        labels : {
          rotation : -45,
          align : 'right',
          style : {
           fontSize : '13px',
           fontFamily : 'Verdana, sans-serif'
         }
       }
     },
     yAxis : {
      min : 0,
      title : {
        text : 'userStories'
      }
    },
    legend : {
      enabled : false
    },
    series : [ {
      name : 'userStories',
      data : data,
      dataLabels : {
        enabled : true,
        rotation : -90,
        color : '#FFFFFF',
        align : 'right',
        x : 4,
        y : 10,
        style : {
         fontSize : '13px',
         fontFamily : 'Verdana, sans-serif',
         textShadow : '0 0 3px black'
       }
     }
   } ]
 });
   }
 }