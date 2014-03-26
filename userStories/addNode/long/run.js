console.log("run longTest");
var commonAPI = new CommonAPI();

var file = $("<div>");
$("<div>").html("hej").appendTo(file);

commonAPI.initRepo().then(
	function(data) {
		return commonAPI.commit("a.txt", file[0].outerHTML, "texts");
	},
	function(data) {
		alert("init dont work");
	}
).then(
	function(data) {
		return commonAPI.getHEAD();
	},function(data) {
		alert("commit dont work");
	}
).then(
	function(data) {
		return compare(file[0].outerHTML, data.files[0].fileContent);
	},function(data) {
		alert("get head dont work");
	}
).then(
    function(fromServer) {
    	console.log(fromServer);
    },function(data) {
    	alert("compare dont work");
    }
)