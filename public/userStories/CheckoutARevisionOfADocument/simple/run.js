(function(){
  console.log("run simple test");
  var userStoryUuid="CheckoutARevisionOfADocument";
  var testName="simple";
  //getInputFiles(userStoryUuid,testName);
  
  var commonAPI = new CommonAPI();
  console.log(userStoryUuid);
  console.log(testName);
  var userStory=getUserStory(userStoryUuid);
  console.log(userStory);
  var test=getTest(userStory,testName);
  var inputFolder="/"+userStoryUuid+"/"+testName+"/input/";
  console.log("input files");
  console.log(test.input);
  commonAPI.initRepo().then(
    function(data) {
      console.log(inputFolder+test.input[0]);
      return commonAPI.commitFile("a.txt", inputFolder+test.input[0], "texts");
    },
    function(data) {
      reportIn(userStoryUuid,testName,"fail");
    }
  ).then(
    function(data) {
      console.log(inputFolder+test.input[1]);

      return commonAPI.commitFile("a.txt", inputFolder+test.input[1], "texts");
    },function(data) {
      reportIn(userStoryUuid,testName,"fail");
    }
  ).then(
    function(data) {
      console.log(inputFolder+test.input[2]);
      return commonAPI.commitFile("a.txt", inputFolder+test.input[2], "texts");
    },function(data) {
      alert("get head dont work");
      reportIn(userStoryUuid,testName,"fail");
    }
  ).then(
    function(fromServer) {
      console.log(fromServer);
      reportIn(userStoryUuid,testName,"success");
      return commonAPI.getLog();

    },function(data) {
      alert("compare dont work");
      reportIn(userStoryUuid,testName,"fail");
    }
  ).then(
    function(fromServer) {
      console.log(fromServer);
      reportIn(userStoryUuid,testName,"success");
      return commonAPI.getrevision(fromServer.logs[1].id);

    },function(data) {
      alert("compare dont work");
      reportIn(userStoryUuid,testName,"fail");
    }
  );
})();
