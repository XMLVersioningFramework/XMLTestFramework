userStory=function (id,obj){
	var self=this;
	self.id=id;
	console.log(obj);
	self.title=obj.title;
	self.useCase=obj.useCase;
	self.preConditions=obj.preConditions;
	self.actors=obj.actors;
	self.scenario=obj.scenario;
	self.alternativeScenario = obj.alternativeScenario;
	self.outcome=obj.outcome;
	self.tags=obj.tags;
	self.tests=obj.tests;

	self.getTitle=function () {
		return title+"<br />";
	}
	self.getHTML=function () {
		var returnMsg='\
		<div class="panel panel-default">\
		    <div class="panel-heading">\
		      <h4 class="panel-title">\
		        <a data-toggle="collapse" data-parent="#accordion" href="#'+self.id+'">\
		   			'+self.title+'\
		        </a>\
		      </h4>\
		    </div>\
		    <div id="'+self.id+'" class="panel-collapse collapse">\
				<div class="use-case">\
					<h5>Use Case</h5>\
					<p>'+self.useCase+'</p>\
				</div>\
				<div class="pre-conditions">\
					<h5>Pre-Conditions</h5>\
					<ul>';
		/* APPEND THE PRECONDITIONS */
		var preConditionList = '';
 		$(self.preConditions).each(function(nr, preCondition){
 			console.log(preCondition.toString());
 			preConditionList += "<li>"+preCondition.toString()+"</li>";
		});
 		returnMsg+=preConditionList;
 		
 		/* CONTINUE WITH THE HTML */
 		returnMsg+=	'</ul>\
				</div>\
				<div class="actors">\
					<h5>Actors</h5>\
					<ul>';
		/* APPEND THE ACTORS */
		var actorList = '';
 		$(self.actors).each(function(nr, actor){
 			console.log(actor.toString());
 			actorList += "<li>"+actor.toString()+"</li>";
		});
 		returnMsg+=actorList;
 		
 		/* CONTINUE WITH THE HTML */
 		returnMsg+=	'</ul>\
				</div>\
				<div class="scenario">\
					<h5>Scenario</h5>\
					<ol>';
 			/* APPEND THE SCENARIOS */
 			var scenarioStepList = '';
 	 		$(self.scenario).each(function(nr, step){
 	 			console.log("Scenario:" + step.toString());
 	 			scenarioStepList += "<li>"+step.toString()+"</li>";
 			});
 	 		returnMsg+=scenarioStepList;
 	 		
 	 		/* CONTINUE WITH THE HTML */
 	 		returnMsg+=	'</ol>\
				</div>';

			/* APPEND THE ALTERNATIVE SCENARIOS */
			if($(self.alternativeScenario)!=null && $(self.alternativeScenario).length > 0){
				returnMsg+= '<div class="alt-scenario">\
				<h5>Alternative Scenario</h5>\
				<ol>';

				var altScenarioStepList = '';
	 	 		$(self.alternativeScenario).each(function(nr, step){
	 	 			console.log("alternativeScenario:" + step.toString());
	 	 			altScenarioStepList += "<li>"+step.toString()+"</li>";
	 			});
	 	 		returnMsg+=altScenarioStepList;

	 	 		/* CONTINUE WITH THE HTML */
	 	 		returnMsg+=	'\
	 	 			</ol>\
	 	 		</div>';
			}

	 		returnMsg+='\
				<div class="outcome">\
		 			<h5>Expected Outcome</h5>\
					<p>'+self.outcome+'</p>\
				</div>\
				<div class="tags">\
			    	<h5>Tags</h5>\
			    	<ul>';

			/* APPEND THE TAGS */
			var tagsList = '';
			/* APPEND THE WHERE TAGS*/
			tagsList+='\
						<li>Where<ul>'
 	 		$(self.tags.where).each(function(nr, tag){
 				console.log("Tag:" + tag.toString());
				tagsList += '\
							<li>'+tag.toString()+'</li>';
			});
			tagsList+='\
						</ul></li>';
			/* APPEND THE HOW TAGS*/
			tagsList+='\
						<li>How<ul>'
 	 		$(self.tags.how).each(function(nr, tag){
 				console.log("Tag:" + tag.toString());
				tagsList += '\
							<li>'+tag.toString()+'</li>';
			});
			tagsList+='\
						</ul></li>';

			/* APPEND THE WHAT TAGS*/
			tagsList+='\
						<li>What<ul>'
 	 		$(self.tags.what).each(function(nr, tag){
 				console.log("Tag:" + tag.toString());
				tagsList += '\
							<li>'+tag.toString()+'</li>';
			});
			tagsList+='\
						</ul></li>';

			returnMsg+=tagsList;

			/* CONTINUE WITH THE HTML */
			returnMsg+='\
					</ul>\
				</div>\
			</div>\
		</div>';
  		return returnMsg;
	}

	self.getTags=function(){
		return self.tags;
	}

	
}