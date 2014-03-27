

CommonAPI=function (){
  self=this;
  var server="localhost";
  var port="9001";

  self.connect=function(server, port){

  }
  self.commit = function(url,content,message,async){
    return new Promise(function(resolve, reject) {
      var data={url:url,content:content,message:message,user:0,backend:currentBackend};
      var ajaxRequest=$.ajax({
        type: "POST",
        url: "http://"+server+":"+port+"/commit",
        data: data,
        async: async
      });


      ajaxRequest.done(function (response, textStatus, jqXHR){
         resolve(response);
      });
      
      ajaxRequest.fail(function (response, textStatus, jqXHR){
        
        console.log("error");
        console.log(response);
        reject(response);
      });

    });
  }


  self.getHEAD=function(){
    return new Promise(function(resolve, reject) {
      var data={user:0,backend:currentBackend};
      var ajaxRequest=$.ajax({
        type: "POST",
        url: "http://"+server+":"+port+"/getHEAD",
        data: data
      });
      ajaxRequest.done(function (response, textStatus, jqXHR){
        resolve(response);
      });
      ajaxRequest.fail(function (response, textStatus, jqXHR){
        reject(response);
      });
    }); 
  }

  self.initRepo =function(){
    return new Promise(function(resolve, reject) {
      var data={user:0,backend:currentBackend};
      var ajaxRequest=$.ajax({
        type: "POST",
        url: "http://"+server+":"+port+"/initRepository",
        data: data
      });
      ajaxRequest.done(function (response, textStatus, jqXHR){
        resolve(response);
      });
      ajaxRequest.fail(function (response, textStatus, jqXHR){
        reject(response);
      });
    }); 
  }

}

