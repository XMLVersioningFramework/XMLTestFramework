(function() {
  var userStoryUuid = "ParallelEditWithoutConflicts";
  var testName = "basic";
  console.log("Running " + userStoryUuid + ":" + testName);

  var testResult = false;

  var commonAPI = new CommonAPI();
  var userStory = getUserStory(userStoryUuid);
  var test = getTest(userStory,testName);
  var inputFolder = "/" + userStoryUuid + "/" + testName + "/input/";

  console.log("input files");
  console.log(test.input);

  var fileName = testName,
  initialFile = test.input[0],
  initialFileMessage = "I HAVE 3 ELEMENTS: a,b,c",
  alicesFile = test.input[1],
  alicesFileMessage = "I HAVE 2 ELEMENTS: a,c",
  bobsFile = test.input[2],
  bobsFileMessage = "I HAVE 3 ELEMENTS: a,b,c AND d WITHIN a",
  expectedFile = test.input[3],
  expectedFileMessage = "I HAVE 2 ELEMENTS: a,c AND d WITHIN a",
  actualFile;

  // console.log("initialFile:" + initialFile);
  // console.log("alicesFile:" + alicesFile);
  // console.log("bobsFile:" + bobsFile);
  // console.log("expectedFile:" + expectedFile);

  //PRECONDITIONS
  // "Repository exists"
  commonAPI.initRepo().then(
    function(data){
      // "File exists" and "File Content exists"
      return commonAPI.commitFile(fileName, inputFolder+initialFile, initialFileMessage, 0);
    },
    function(data){
      console.log("Failed to initRepo");
      reportIn(userStoryUuid,testName,"error");
    }
  ).then(
    //SCENARIO
    // "Alice checkouts repository" and "Alice edits file" -> alicesFile
    // "Bob checkouts repository" and "Bob edits same file in different place" -> bobsFile
    function(data) {
      // "Alice commits changes"
      return commonAPI.commitFile(fileName, inputFolder+alicesFile, alicesFileMessage, 0);
    },
    function(data){
      console.log("Failed to commit initialFile");
      reportIn(userStoryUuid,testName,"error");
    }
  ).then(
    function(data){
      // "Bob commits changes"
      return commonAPI.commitFile(fileName, inputFolder+bobsFile, bobsFileMessage, 1);
    },
    function(data){
      console.log("Failed to commit alicesFile");
      reportIn(userStoryUuid,testName,"error");
    }
  ).then(
  //OUTCOME
  //testResult is true iff both commits are successful and Bob's commit includes Alice's changes as well.
    function(data) {
      return commonAPI.getHEAD();
    },
    function(data){
      console.log("Failed to commit bobsFile");
      reportIn(userStoryUuid,testName,"error");
    }
  ).then(
    function(data){
      //do comparison with expectedFile and actualFile
      //TODO: get the contents of the expected and actualFile
      return compare(expected, actual);
    },
    function(data){
      console.log("Failed to getHEAD");
      reportIn(userStoryUuid,testName,"error");
    }
  ).then(
    function(data){reportIn(userStoryUuid,testName,"success");},
    function(data){
      console.log("Failed to Compare");
      reportIn(userStoryUuid,testName,"error");
    }
  );
}());
