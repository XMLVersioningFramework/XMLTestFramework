

CommonAPI=function (){
	self=this;
	var server="localhost";
	var port="9001";

	self.connect=function(server, port){

	}
	self.commit = function(url,content,message,returnFunction){
		var data={url:url,content:content,message:message,user:0,backend:"git"};
		$.ajax({
		  type: "POST",
		  url: "http://"+server+":"+port+"/commit",
		  data: data,
		  success: sucsess
		});
		var sucsess=function(data) {
		  	returnFunction(data);
		}

	}
	self.initRepo =function(){
		$.ajax({
		  type: "POST",
		  url: "http://"+server+":"+port+"/initRepository",
		  success: sucsess
		});
		var sucsess=function(data) {
		}
	}
	commonAPI.
	self.test= function () {
		
	}
		
}
