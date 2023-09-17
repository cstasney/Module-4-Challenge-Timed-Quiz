var timerElement = document.querySelector(".timer-count");
var startbutton = document.querySelector(".start-button");
var correct = document.querySelector("correct-answers");


var questions = "Which of the following is correct?"

// Initiate quiz function
function startQuiz() {
    startTimer();
}


// The setTimer function starts the timer
function startTimer() {
    startbutton.disabled = true;
    var timeLeft = 3;
    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerElement.textContent = timeLeft + " Seconds Remaining";
            timeLeft--;
        } else if (timeLeft === 1) {
            timerElement.textContent = timeLeft = " 1 Second Remaining";
        } else {
            timerElement.textContent = "";
            clearInterval(timeInterval)
            endQuiz();
        }
    }, 1000);
}

// Function to end Quiz

function endQuiz() {
}

// Click button to start quiz function
startbutton.addEventListener('click', startQuiz);