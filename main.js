let randomNumber = 0
const buttonColours = ["red", "blue", "green", "yellow"]
let randomChosenColour = 0
let gamePattern = []
let userChosenColor = 0
let userClickedPattern = []
let level = 0

$(document).keypress(nextSequence)

function titleChange() {
    $('#level-title').text("Level " + level)
}

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4)
    randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    titleChange()
    level += 1

    btnClick(randomChosenColour)
    playSound(randomChosenColour)

    userClickedPattern = []
}
$('.btn').click(clicked)


function clicked() {
    console.log("clicked")
    userChosenColor = $(this).attr("id")

    console.log(userChosenColor)
    userClickedPattern.push(userChosenColor)

    console.log(userClickedPattern)

    btnClick(userChosenColor)
    playSound(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
}

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

function btnClick(btnName) {
    $('#' + btnName).fadeIn(100).fadeOut(100).fadeIn(100).addClass("pressed")
    setTimeout(function () {
        $("#" + btnName).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success")


        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000)

        }

    } else {
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart!")
        let audio = new Audio('sounds/wrong.mp3')
        audio.play()
        console.log("wrong")
        startOver()
    }

}


function startOver() {
    level = 0
    gamePattern = []
}


