// Assigning HTML elements to variables
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("home");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var InputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Question Object
var quizQuestions = [{
    question: "What is primarily used to add logic to a webpage",
    choiceA: "javaScript",
    choiceB: "CSS",
    choiceC: "HTML",
    choiceD: "Chrome",
    correctAnswer: "a"
},
{
    question: "What does HTML stand for?",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hyper Tag Markup Language",
    choiceC: "Hyperlinking Text Marking Language",
    choiceD: "Hyperlinks Text Markup Language",
    correctAnswer: "a"
},
{
    question: "What symbols indicate the opening and closing of a tag?",
    choiceA: "<>",
    choiceB: "[]",
    choiceC: "{}",
    choiceD: "()",
    correctAnswer: "a"
},
{
    question: "Which symtax is correct for linking a class element to CSS?",
    choiceA: ".class",
    choiceB: "#class",
    choiceC: "*class",
    choiceD: "(class)",
    correctAnswer: "a"
},
{
    question: "Which would call a function defined as startQuiz?",
    choiceA: "startQuiz();",
    choiceB: "startQuiz[]",
    choiceC: "startQuiz()",
    choiceD: "startQuiz<>",
    correctAnswer: "a"
},

];
// Global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 120;
var timerInterval;
var score = 0;
var correct;

// Function to cycle through the object array in order to display questions and answers subsequently
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = currentQuestion.question;
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Starts the timer, displays first quiz question and hides the start and previous scores and the header
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Remaining Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "inline";
}
// Display score once the quiz has been completed or the timer has expired
function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    InputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + "/" + quizQuestions.length + " correct!";
}

// On click of submit button, the highscore function is ran, saving and stringifying the array of high scores saved to local storage
// Pushes the new user name and score into the array in local storage. Then generateHighscores is ran to show
submitScoreBtn.addEventListener("click", function highscore() {


    if (InputName.value === "") {
        alert("Initials cannot be blank");
        return;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = InputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// Clears scores and updates list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Displays scores and hides other elements
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clears scores from local storage and clears scoreboard
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Restarts the quiz, resets timer, and goes back to question 1
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 120;
    score = 0;
    currentQuestionIndex = 0;
}

// Checks answers against key, asks if you're sure
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
        //ask if you're sure and display next question
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
            timeLeft = timeLeft -40; 
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                showScore();
            }
        currentQuestionIndex++;
        generateQuizQuestion();
        // show final score if last question
    } else {
        showScore();
    }
}

// Starts the quiz
startQuizButton.addEventListener("click", startQuiz);
