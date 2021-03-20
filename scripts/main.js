var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var modeButtons = document.querySelectorAll(".mode");
var mode = 1;
var timerDisplay = document.getElementById("time");
var timerInterval;
var flashInterval;

function init() {
    buttonSet();
    initCards();
    reset();
}

function buttonSet() {
    for (var i = 0; i < modeButtons.length; i++) {
        if (i != mode) {
            modeButtons[i].style.backgroundColor = "white";
            modeButtons[i].style.color = "#484848";
        }else {
            modeButtons[mode].style.backgroundColor = "steelblue";
            modeButtons[mode].style.color = "white";
        }
    }
}

function setMode(i) {
    return function() {
        mode = i;
        init();
    }
}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                timerDisplay.textContent = null;
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                resetButton.style.display = "block";
                gameOver = true;
                clearInterval(timerInterval);
                clearInterval(flashInterval);
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    timerDisplay.textContent = "";
    if (timerInterval != null) clearInterval(timerInterval);
    if (flashInterval != null) clearInterval(flashInterval);
    if (mode == 0) {
        gameOver = false;
        numCards = 3;
        colors = generateRandomColors(numCards);
        //pick a new random color from array
        pickedColor = pickColor();
        //change colorDisplay to match picked Color
        colorDisplay.textContent = pickedColor;
        resetDisplay.textContent = "New Color"
        messageDisplay.textContent = "What's the Color?";
        resetButton.style.display = "block";
        //change colors of cards
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.opacity = 1;
            if (colors[i]) {
                cards[i].style.display = "block"
                cards[i].style.backgroundColor = colors[i];
            } else {
                cards[i].style.display = "none";
            }
        }
        body.style.backgroundColor = "#232323";
    }else if (mode == 1) {
        gameOver = false;
        numCards = 6;
        colors = generateRandomColors(numCards);
        //pick a new random color from array
        pickedColor = pickColor();
        //change colorDisplay to match picked Color
        colorDisplay.textContent = pickedColor;
        resetDisplay.textContent = "New Color"
        messageDisplay.textContent = "What's the Color?";
        resetButton.style.display = "block";
        //change colors of cards
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.opacity = 1;
            if (colors[i]) {
                cards[i].style.display = "block"
                cards[i].style.backgroundColor = colors[i];
            } else {
                cards[i].style.display = "none";
            }
        }
        body.style.backgroundColor = "#232323";
    }else if (mode == 2) {
        gameOver = false;
        numCards = 6;
        colors = generateRandomColors(numCards);
        //pick a new random color from array
        pickedColor = pickColor();
        //change colorDisplay to match picked Color
        colorDisplay.textContent = pickedColor;
        resetDisplay.textContent = "New Color";
        messageDisplay.textContent = "What's the Color?";
        resetButton.style.display = "none";
        //change colors of cards
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.opacity = 1;
            if (colors[i]) {
                cards[i].style.display = "block"
                cards[i].style.backgroundColor = colors[i];
            } else {
                cards[i].style.display = "none";
            }
        }
        body.style.backgroundColor = "#232323";
        var time = 5;
        timerDisplay.textContent = " 5";
        timerInterval = setInterval(function() {
            if (gameOver) return;

            // flash
            body.style.backgroundColor = "#838383";
            flashInterval = setTimeout(function() {
                if (time == 0) body.style.backgroundColor = pickedColor;
                else body.style.backgroundColor = "#232323";
            }, 200);

            time--;
            timerDisplay.textContent = " " + time;

            // timeout
            if (time == 0) {
                gameOver = true;
                messageDisplay.textContent = "Timeout!";
                timerDisplay.textContent = null;
                resetDisplay.textContent = "Try Again";
                body.style.backgroundColor = pickedColor;
                changeColors("#FFF");
                clearInterval(timerInterval);
                resetButton.style.display = "block";
            }
        }, 1000);

    }
}

resetButton.addEventListener("click", function() {
    reset();
})

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

window.onload = function() {
    init();
    for (var i = 0; i < modeButtons.length; i++) modeButtons[i].addEventListener("click", setMode(i));
};