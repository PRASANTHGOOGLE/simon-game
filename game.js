var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = []; 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level += 1;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").on("click", function (e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1); 
});


function animatePress(id) {
    $("." + id).addClass("pressed");

    setTimeout(function () {
        $("." + id).removeClass("pressed");
    }, 100);
}


$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
        
    }
});
function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(); 
            }, 1000);
        }
    }
    else{
       playSound('wrong');
       $("body").addClass("game-over");
       $("h1").text("Game Over, Press Any Key to Restart");
       setTimeout(function () {
                $("body").removeClass("game-over"); 
            }, 200);
        startOver();
    }
}
function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
    
}