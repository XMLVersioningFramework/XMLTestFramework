userStory = function(id, obj) {
  var self = this;
  self.id = id;
  console.log(obj);
  self.title = obj.title;
  self.uuid = obj.uuid;
  self.useCase = obj.useCase;
  self.preConditions = obj.preConditions;
  self.actors = obj.actors;
  self.scenario = obj.scenario;
  self.alternativeScenario = obj.alternativeScenario;
  self.outcome = obj.outcome;
  self.tags = obj.tags;
  self.refHtml=null;

  self.tests = obj.tests;

  self.getTitle = function() {
    return self.title;
  }
  self.getUuid = function() {
    return self.uuid;
  }
  self.getHTML = function() {

    var panel = $("<div>").addClass("panel panel-default")
    var panelHeading = $("<div>").addClass("panel-heading").appendTo(panel);
    var panelTitle = $("<h4>").addClass("panel-title").appendTo(panelHeading);
    var collapseTopic = $("<a>").attr("data-toggle", "collapse").attr(
        "data-parent", "#accordion").attr("href", "#" + self.id).html(
        self.title).appendTo(panelTitle);

    // var
    // collapseTopic=$("<a>").attr("data-toggle","collapse").attr("data-parent","#accordion").attr("href","#"+self.id).html(self.title).appendTo(panelTitle);
    var collapseBody = $("<div>").addClass("panel-collapse collapse").attr(
        "id", self.id).appendTo(panel);
    var row = $("<div>").addClass("row").appendTo(collapseBody);
    // var
    // left=$("<div>").addClass("col-md-6").attr("id","rigth").html("adhjsad").appendTo("row");
    var left = $("<div>").addClass("col-md-6").attr("id", "rigth").append(
        self.getRigthColumn()).appendTo(row);
    var left = $("<div>").addClass("col-md-6").attr("id", "left").append(
        self.getTagsHtml()).appendTo(row);
    var row2 = $("<div>").addClass("row").appendTo(collapseBody);
    var testes = $("<div>").addClass("col-md-12").append(self.getTestHTML())
        .appendTo(row2);
    self.refHtml=panel;
    return panel;
  }
  self.getTagsHtml = function() {
    var wraper = $('<div />').html("Tags");
    var headUl = $('<ul/>').appendTo(wraper);

    var whereLi = $('<li/>').appendTo(headUl);
    $("<div/>").html("Where").appendTo(whereLi);
    var whereUl = $('<ul/>').appendTo(whereLi);
    $.each(self.tags.where, function(i, data) {
      var li = $('<li/>').text(data).appendTo(whereUl);
    });
    var howLi = $('<li/>').appendTo(headUl);
    $("<div/>").html("How").appendTo(howLi);
    var howUl = $('<ul/>').appendTo(howLi);
    $.each(self.tags.how, function(i, data) {
      var li = $('<li/>').text(data).appendTo(howUl);
    });
    var whatLi = $('<li/>').appendTo(headUl);
    $("<div/>").html("What").appendTo(whatLi);
    var whatUl = $('<ul/>').appendTo(whatLi);
    $.each(self.tags.what, function(i, data) {
      var li = $('<li/>').text(data).appendTo(whatUl);
    });
    return wraper;
  }
  self.getTestHTML = function() {
    if (self.tests.length > 0) {
      var wraper = $('<div />').html("Tests<br />");
      $.each(self.tests, function(i, data) {
        console.log(data);
        var button = $("<button id='" + i + "'/>").html(data.name)
        button.appendTo(wraper);
        this.refHtml=button;
        button.click(function(argument) {
          reportIn(self.uuid,self.tests[$(this).attr("id")].name,"pending");
          $.getScript("assets/userStories/"+self.tests[$(this).attr("id")].runFile, function(){
          });

        });
      });
      return wraper;
    } else {
      return "";
    }
  }
  self.getRigthColumn = function() {
    var returnMsg = '<div class="use-case">\
                     <h5>Use Case</h5><p>'
                     + self.useCase
                   + '</p>\
                    </div>\
                   <div class="pre-conditions">\
                    <h5>Pre-Conditions</h5>\
                    <ul>';
    /* APPEND THE PRECONDITIONS */
    var preConditionList = '';
    $(self.preConditions).each(function(nr, preCondition) {
      preConditionList += "<li>" + preCondition.toString() + "</li>";
    });
    returnMsg += preConditionList;

    /* CONTINUE WITH THE HTML */
    returnMsg += '</ul>\
  </div>\
  <div class="actors">\
  <h5>Actors</h5>\
  <ul>';
    /* APPEND THE ACTORS */
    var actorList = '';
    $(self.actors).each(function(nr, actor) {
      actorList += "<li>" + actor.toString() + "</li>";
    });
    returnMsg += actorList;

    /* CONTINUE WITH THE HTML */
    returnMsg += '</ul>\
  </div>\
  <div class="scenario">\
  <h5>Scenario</h5>\
  <ol>';
    /* APPEND THE SCENARIOS */
    var scenarioStepList = '';
    $(self.scenario).each(function(nr, step) {
      scenarioStepList += "<li>" + step.toString() + "</li>";
    });
    returnMsg += scenarioStepList;

    /* CONTINUE WITH THE HTML */
    returnMsg += '</ol>\
  </div>';

    /* APPEND THE ALTERNATIVE SCENARIOS */
    if ($(self.alternativeScenario) != null
        && $(self.alternativeScenario).length > 0) {
      returnMsg += '<div class="alt-scenario">\
  <h5>Alternative Scenario</h5>\
  <ol>';

      var altScenarioStepList = '';
      $(self.alternativeScenario).each(function(nr, step) {
        altScenarioStepList += "<li>" + step.toString() + "</li>";
      });
      returnMsg += altScenarioStepList;

      /* CONTINUE WITH THE HTML */
      returnMsg += '</ol></div>';
    }

    returnMsg += '<div class="outcome">\
                  <h5>Expected Outcome</h5>\
                  <p>'
                  + self.outcome + '</p>\
</div>';
    return returnMsg;
  }

  self.getTags = function() {
    return self.tags;
  }
  self.updateStatus=function() {
    var worst="notRun";
    console.log(self.refHtml);
    

    for (var i = self.tests.length - 1; i >= 0; i--) {
      console.log("test i: "+i);
      console.log(self.tests[i].status);
      if(self.tests[i].status=="fail"){
        worst="fail";
        self.tests[i].refHtml.css("background-color", "red");
      }else if(self.tests[i].status=="pending"){
        self.tests[i].refHtml.css("background-color", "blue");
        if(worst!="fail"){
          worst="pending";
        }
      }else if(self.tests[i].status=="success"){
         self.tests[i].refHtml.css("background-color", "green");
        if(worst!="fail"&& worst!="pending"){
          worst="success";
        }
      }
      if(worst=="success"){
        self.refHtml.find(".panel-heading").css({'background-image': '-webkit-linear-gradient(top,rgb(12, 194, 85) 0,rgb(114, 248, 25) 100%)'});
      }else if(worst=="pending"){
        self.refHtml.find(".panel-heading").css({'background-image': '-webkit-linear-gradient(top,rgb(64, 166, 247) 0px,rgb(25, 239, 248) 100%)'});
   
      }else if(worst=="fail"){
        self.refHtml.find(".panel-heading").css({'background-image': '-webkit-linear-gradient(top, rgb(179, 2, 2) 0px, rgb(248, 44, 44) 100%)'});
      }




    };
  }


}
