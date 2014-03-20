

CommonAPI=function (){
	self=this;
	var server="localhost";
	var port="9001";

	self.connect=function(server, port){

	}
	self.commit = function(url,content,returnFunction){
		var returnFromCommonAPIJson = {};
		returnFromCommonAPIJson.time=12;
		returnFromCommonAPIJson.succsess=1;

		var data={url:url,content:content,user:0,backend:"git"};
		$.ajax({
		  type: "POST",
		  url: "http://"+server+":"+port,
		  data: data,
		  success: sucsess
		});
		var sucsess=function(data) {
		  	console.log("sending datapoint to server");
		}

		returnFunction(returnFromCommonAPIJson);

	}
	self.test= function () {
		
	}
		
		
	


}

