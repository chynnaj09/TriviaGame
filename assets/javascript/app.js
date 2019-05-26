$(document).ready(function () {

    // start the game when user clicks on Start button
    $("#start-button").on("click", gameState.startTimer);

});

// information about the state of game play
var gameState = {

    // set the time at 120 seconds, and count down by 1 second
    timeRemaining: 120,

    // start the timer, hide the start page, show the questions
    startTimer: function () {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        trivia.displayQuestions();
    },

    // decrement the timer and  stop the timer at 0
    countdown: function () {
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    // stop the timer and check the answers
    stopTimer: function () {
        clearInterval();
        trivia.checkAnswers();
    },

    // hide the questions and display the end page with results
    showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
        $("#end-page").text();
        $("#questions-box").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct answers: " + numCorrect);
        $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
        $("#unanswered").text("Skipped questions: " + numUnanswered);
    }
}

// functions to handle the building questions page and scoring
var trivia = {

    // pull questions from the array of questions, loop through them
    displayQuestions: function () {
        var divContainer = $("#questions-box");
        var answerGroup = $(".form-check");
        divContainer.append('<h2>Answer the following questions:</h2>');

        for (var i = 0; i < questionBank.length; i++) {

            divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

            var answer1 = questionBank[i].answers[0];
            var answer2 = questionBank[i].answers[1];
            var answer3 = questionBank[i].answers[2];
            var answer4 = questionBank[i].answers[3];


            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer4 + '</label></div>');

        }

        // add a Done button to the end of the page and register its click handler
        var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
        divContainer.append(doneButton);
        $("#done-button").on("click", gameState.stopTimer);
    },

    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function () {
        var correctAnswer;
        var userAnswer;
        var numCorrect = 0;
        var numIncorrect = 0;
        var numUnanswered = 0;

        // loop through to compare the text of the label with the user answers
        // increment score counts appropriately
        for (var i = 0; i < questionBank.length; i++) {
            correctAnswer = questionBank[i].correct;
            userAnswer = $('input[id=radio' + i + ']:checked + label').text();

            if (userAnswer === correctAnswer) {
                numCorrect++;
            } else if (userAnswer === "") {
                numUnanswered++;
            } else if (userAnswer !== correctAnswer) {
                {
                    numIncorrect++;
                }
            }
        }

        // show the end page with the score tally
        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
}

// array of objects with the questions, possible answers, and the correct answer
var questionBank =
    [
        {
            question: "Who does Pam kiss after becoming intoxicated during the season 2 episode The Dundies?",
            answers: ["Roy", "Jim", "Michael", "Ryan"],
            correct: "Jim"
        },
        {
            question: "What is Erin's first name, which she happens to share with a co-worker",
            answers: ["Kelly", "Phyllis", "Nelly", "Angela"],
            correct: "Kelly"
        },
        {
            question: "Who is revealed to have a second job as a tele marketer in the season 4 episode Money?",
            answers: ["Meredith", "Dwight", "Creed", "Michael"],
            correct: "Michael"
        },
        {
            question: "What was Stanley's car hit by in the season 3 episode Safety Training?",
            answers: ["The trampoline", "Michael", "A watermelon", "A bounce house"],
            correct: "A watermelon"
        },
        {
            question: "In the season 3 episode Grief Counseling Michael organizes a funeral for which animal?",
            answers: ["Lil Sebastian", "A bird", "Sprinkles", "A rat"],
            correct: "A bird"
        },
        {
            question: "How much do 6 warehouse workers win in a lottery pool in the season 8 episode Lotto?",
            answers: ["1 million", "850,000", "750,000", "950,000"],
            correct: "950,000"
        },
        {
            question: "What is the name of Dwight's sister?",
            answers: ["Frannie", "Edith", "Fannie", "Ethel"],
            correct: "Fannie"
        },
        {
            question: "What game do Jim and Darryl play in the season 4 episode the Deposition?",
            answers: ["Basketball", "Racketball", "Tennis", "Ping Pong"],
            correct: "Ping Pong"
        },

    ];
