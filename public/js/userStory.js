userStory=function (id,obj){
	var self=this;
	self.id=id;
	console.log(obj);
	self.title=obj.title;
	self.useCase=obj.useCase;
	self.preConditions=obj.preConditions;
	self.actors=obj.actors;
	self.scenario=obj.scenario;
	self.outcome=obj.outcome;
	self.tags=obj.tags;
//	console.log(self.tags);

	self.getTitle=function () {
		return title+"<br />";
	}
	self.getHTML=function () {
		var returnMsg='<div class="panel panel-default">\
		    <div class="panel-heading">\
		      <h4 class="panel-title">\
		        <a data-toggle="collapse" data-parent="#accordion" href="#'+self.id+'">\
		   			'+self.title+'\
		        </a>\
		      </h4>\
		    </div>\
		    <div id="'+self.id+'" class="panel-collapse collapse">\
		      <div class="panel-body">\
		         '+self.actors+'<br />'+self.scenario+'\
		      </div>\
		    </div>\
		  </div>';
		  return returnMsg;
	}

	self.getTags=function(){
		return self.tags;
	}

	
}