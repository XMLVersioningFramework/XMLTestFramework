var file = $("<div>");

var sendingNr = 100;
var commonAPI = new CommonAPI();
var msgFromServer = 0;
/*for (var i = 0; i <= sendingNr; i++) {
*/
	commonAPI.commit("a.txt", file[0].outerHTML,"texts", returnmsg);
	$("<div>").attr("id", i).appendTo(file);
/*};*/

var totalTime = 0;
function returnmsg(data) {
	msgFromServer++;

	var time = data.time;
	console.log(time);
	totalTime += time;
	if (sendingNr === msgFromServer) {
		console.log("all msg resived");
		console.log("totalTime" + totalTime);
		console.log(commonAPI);
		
	}
}
