var gameInput = $("#game-input");
var gameOutput  = $("#game-output");
gameInput.keydown(function(keydownEvent) {
  // the key code for enter is 13

  if (keydownEvent.keyCode == 13) {      
    parseText(gameInput.val()); 
    gameInput.val("");
  }  
})

function parseText(text) {  
  if (text === "hello") {
    gameOutput.html("Hi there!");
  }
  else if (text.indexOf("/gif") > -1) {
    var split = text.split("/gif ")
    getWikiIntro(split[1], function(text) {      
      return text
    })
  } 

  else if (text.indexOf("cat") > -1) {
    gameOutput.html("<img src='http://25.media.tumblr.com/tumblr_m4jkvpAPds1rv3b62o1_500.gif'>");
  }
  else if (text.indexOf("dog") > -1) {
    gameOutput.html("<img src='http://www.doggifpage.com/gifs/142.gif'>");
  } else if (text.indexOf("name") > -1){
    gameOutput.html("Dog")
  }
  else  {
    var responses = [
      "IDK",
      "who am I?",
      "Stop asking me questions!",
    ]
    var responses = responses[Math.floor(Math.random()*responses.length)];
    gameOutput.html(responses);


  }    
}

function getWikiIntro(title, processor) {
  $.ajax({
    method: "GET",
    url: "http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=" + title,    
    dataType: "jsonp",
    jsonp: "callback",
    success: function(res) {
      var pages = res.query && res.query.pages
      if (pages) {
        var pageKeys = Object.keys(pages);
        var text = pages[pageKeys[0]].extract;          
        var processed = processor(text);
        gameOutput.html(processed);
      }                
    }
  })
}