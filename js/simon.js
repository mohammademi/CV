var buttonColors= ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];


function nextSequence(){
  userClickedPattern=[];
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("."+randomChosenColor).fadeOut(50).fadeIn(50);
  for (var level=1; level<gamePattern.length+1; level++){
    $("h1").text("Level "+level);
  }
}


function playSound(name){
  switch(name){
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
  }
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}


function userClicks(){
  var userChosenColor = this.id ;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
}



function checkAnswer(currentLevel){
  
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("correct");
    
    if (userClickedPattern.length===gamePattern.length){
      $("body").addClass("passed");
      setTimeout(function(){
        $("body").removeClass("passed");
      },500)
      setTimeout(function(){
        nextSequence();
      },1000);
    } 
  }else {
    console.log("wrong");
    wrong();
    startOver();
    $("button").on("click",function(){
      var userChosenColor = this.id ;
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length-1);
    } )
  }
}



  function wrong(){
    $("body").addClass("wrong");
    setTimeout(function(){
    $("body").removeClass("wrong");
  },200)
    var wrong= new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over, Press Any key to Start");
    $("button").off("click");
    
  }



  function startOver(){
    gamePattern=[];
    $(document).one("keydown",function(){
    gamePattern=[];
    nextSequence();
  })
  }



// LEVEL 1

$(document).one("keydown",function(){
  nextSequence();
});


$("button").on("click",function(){
  var userChosenColor = this.id ;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
} )

