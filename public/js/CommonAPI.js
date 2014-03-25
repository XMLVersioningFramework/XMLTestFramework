CommonAPI = function() {
    self = this;
    var server = "localhost";
    var port = "9001";

    self.connect = function(server, port) {

    }
    self.commit = function(url, content, message, returnFunction) {
	var data = {
	    url : url,
	    content : content,
	    message : message,
	    user : 0,
	    backend : "git"
	};
	var ajaxRequest = $.ajax({
	    type : "POST",
	    url : "http://" + server + ":" + port + "/commit",
	    data : data
	});

	ajaxRequest.done(function(response, textStatus, jqXHR) {
	    returnFunction(response);
	});

	ajaxRequest.fail(function(response, textStatus, jqXHR) {

	    console.log("error");
	    console.log(data);
	});

    }

    self.getHEAD = function() {
	return new Promise(function(resolve, reject) {
	    var ajaxRequest = $.ajax({
		type : "POST",
		url : "http://" + server + ":" + port + "/getHEAD",
	    });
	    ajaxRequest.done(function(response, textStatus, jqXHR) {
		resolve(response);
	    });
	    ajaxRequest.fail(function(response, textStatus, jqXHR) {
		reject(response);
	    });
	});
    }

    self.initRepo = function() {
	$.ajax({
	    type : "POST",
	    url : "http://" + server + ":" + port + "/initRepository",
	    success : success
	});
	var success = function(data) {
	    console.log("init repo");
	}
    }
}
