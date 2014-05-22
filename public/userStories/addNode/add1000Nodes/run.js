(function(){
  console.log("run longTest");
  var userStoryUuid="addNode";
  var testName="add1000Nodes";


  var commonAPI = new CommonAPI();

  var file = $("<a>");
  $("<div>").html("hej").appendTo(file);

  commonAPI.initRepo().then(
    function(data) {
      return commonAPI.commit("a.txt", file[0].outerHTML, "texts");
    },
    function(data) {
      reportIn(userStoryUuid,testName,"error");
      alert("init dont work");
    }
  ).then(
    function(data) {
      return commonAPI.getHEAD();
    },function(data) {
      reportIn(userStoryUuid,testName,"error");
      alert("commit dont work");
    }
  ).then(
    function(data) {
      return compare(file[0].outerHTML, data.files[0].fileContent);
    },function(data) {
      reportIn(userStoryUuid,testName,"error");
      alert("get head dont work");
    }
  ).then(
      function(fromServer) {
        reportIn(userStoryUuid,testName,"success");
        return commonAPI.getLog();
      },function(data) {
        reportIn(userStoryUuid,testName,"error");
        alert("compare dont work");
      }
  );
})();
