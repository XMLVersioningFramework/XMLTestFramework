(function(){
  var userStoryUuid="CheckoutARevisionOfADocument";
  var testName="simple";

  console.log("Running " + userStoryUuid + ":" + testName);

  //getInputFiles(userStoryUuid,testName);

  var commonAPI = new CommonAPI();

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
      alert("commit didnt work");
      reportIn(userStoryUuid,testName,"fail");
    }
  ).then(
    function(fromServer) {
      console.log(fromServer);
      reportIn(userStoryUuid,testName,"success");
      return commonAPI.getLog();

    },function(data) {
      alert("commit didnt work");
      reportIn(userStoryUuid,testName,"fail");
    }
  ).then(
    function(fromServer) {
      console.log(fromServer);
      reportIn(userStoryUuid,testName,"success");
      return commonAPI.getRevision(fromServer.logs[1].id);

    },function(data) {
      alert("get log work");
      reportIn(userStoryUuid,testName,"fail");
    }
  );
})();
