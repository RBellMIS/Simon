let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).on("keypress", function startGame() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    gameStarted = true;
    console.log(gameStarted);
    nextSequence();
  }
});

$(".btn").click(function userClick() {
  var colorChoice = $(this).attr("id");
  userClickedPattern.push(colorChoice);
  var audio = new Audio("sounds/" + colorChoice + ".mp3");
  audio.play();
  console.log(userClickedPattern);

  if (userClickedPattern.length === gamePattern.length) {
    checkAnswer(gamePattern, userClickedPattern);
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSequence();
  userClickedPattern = [];
}

function checkAnswer(gamePattern, userClickedPattern) {
  let userCorrect = true;
  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      userCorrect = false;
      console.log(`Mismatch found at index ${i}`);
      break;
    }
  }
  if (userCorrect) {
    console.log("user click pattern");
    console.log(userClickedPattern);
    console.log("user sequence = game sequence.");
    setTimeout(nextSequence, 1000);
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");

  console.log("Game Over");
  console.log("game pattern");
  console.log(gamePattern);
  console.log("userClickedPattern");
  console.log(userClickedPattern);
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  gameStarted = false;
}

function playSequence() {
  let i = 0;
  const interval = setInterval(function () {
    const color = gamePattern[i];
    $("#" + color)
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

    i++;
    if (i >= gamePattern.length) {
      clearInterval(interval);
    }
  }, 600);
}
