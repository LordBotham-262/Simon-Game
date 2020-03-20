var buttonColours = ["red", "blue", "green", "yellow"];
gameStart();
var level = "0";
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  var randomNumber1 = Math.floor(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber1];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
};

$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length) - 1);
});

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(xyz) {
  switch (xyz) {
    case "red":
      var redtone = new Audio('sounds/red.mp3');
      redtone.play();

    case "blue":
      var bluetone = new Audio('sounds/blue.mp3');
      bluetone.play();

    case "green":
      var greentone = new Audio('sounds/green.mp3');
      greentone.play();

    case "yellow":
      var yellowtone = new Audio('sounds/yellow.mp3');
      yellowtone.play();

      break;
    default:
      console.log(xyz);

  }

}

function checkAnswer(xyz) {
  if (userClickedPattern[xyz] == gamePattern[xyz]){
    if (userClickedPattern.length == gamePattern.length) {
      level++;
      setTimeout(function(){
        nextSequence();
      }, 1000);
      $("#level-title").text("Level " + level);
      userClickedPattern = [];
    }
}
  else {
    $("#level-title").text("Failure, click again to restart");
    // $('.btn').off('click');
    var wrongtone = new Audio('sounds/wrong.mp3');
    wrongtone.play();
    $('body').addClass("game-over");
    gameStart();
    // $(document).on('keypress');

  }
}

function gameStart(){
  $(document).on('keypress', (function() {
    $(document).off('keypress');
    // $('.btn').on('click');
    $("#level-title").text("Level 0");
    $('body').removeClass("game-over");
    gamePattern=[];
    level = 0;
    userClickedPattern = [];
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }));

}
