

CommonAPI=function (){
  self=this;
  var server="localhost";
  var port="9001";
  var userId="0";


  self.connect=function(server, port){

  }
  self.setUser=function(tUserId) {
    userId=tUserId;
  }


  self.commit = function(url,content,message,async){
    return new Promise(function(resolve, reject) {
      var data={url:url,content:content,message:message,user:userId,backend:currentBackend};
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

  self.commitFile = function(url,commitFileUrl,message,async){
    return new Promise(function(resolve, reject) {
      var data={url:url,commitFileUrl:commitFileUrl,message:message,user:userId,backend:currentBackend};
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


  self.getLog=function(){
    return new Promise(function(resolve, reject) {
      var data={user:0,backend:currentBackend};
      var ajaxRequest=$.ajax({
        type: "POST",
        url: "http://"+server+":"+port+"/getLog",
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

