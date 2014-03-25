var file = $("<div>");

var sendingNr = 100;
var commonAPI = new CommonAPI();
var msgFromServer = 0;

commonAPI.initRepo();
console.log("stared 100 tests test");

for (var i = 0; i < sendingNr; i++) {
    commonAPI.commit("a.txt", file[0].outerHTML, "texts", returnmsg);
    $("<div>").attr("id", i).appendTo(file);
};

var totalTime = 0;
function returnmsg(data) {
    msgFromServer++;
    var time = data.time;
    totalTime += time;
    if (sendingNr === msgFromServer) {
	console.log("all msg resived");
	console.log("totalTime" + totalTime);
	commonAPI.getHEAD().then(
		function(data) {
		    alert("first promess okej");
		    console.log(data.files[0].fileContent);
		    console.log("vs");
		    console.log(file[0].outerHTML);
		    compare(file[0].outerHTML, data.files[0].fileContent).then(
			    function(fromServer) {
				if (fromServer.simularity == "100%") {
				    alert("samme");
				    addDataPoinOnServer("100TestsTest",
					    totalTime);
				}
				{
				    alert("not samme");
				}
			    }, function(argument) {
				alert("adding to server");
			    })
		}, function(argument) {
		    alert("fail");
		});

    }
}
