// Variables

var startScreen;
var timer = 30;
var questions = ["Who was the first aviator to fly across the Atlantic ocean in 1928?", 
                    "Which American chemist invented Kevlar?", 
                    "Who did the Germans dub the \"most dangerous of all allied spies\" in WWII?", 
                    "Which Harvard computer engineer coined the words \"bug\" and \"debugging\"?", 
                    "Who was the first person to win two Nobel Prizes?"];
var answers = [["Jim Mollison", "Robert Newton", "Erich Hartmann", "Amelia Earhart"], 
                ["Leo Baekeland","Linus Pauling","Stephanie Kwolek","Henry Eyring"], 
                ["Virginia Hall", "Roman Czerniawski", "Peter Smithers", "William J. Donovan"], 
                ["Howard Aiken","Grace Hopper","Steven J. Gortler","Mark Zuckerberg"], 
                ["Theodore Roosevelt", "Marie Curie", "Albert Einstein", "Winston Churchill"]];
var images = ["<img class='center-block img-right' src='assets/images/earhart.jpg'>", 
                "<img class='center-block img-right' src='assets/images/kwolek.jpg'>", 
                "<img class='center-block img-right' src='assets/images/hall.jpg'>", 
                "<img class='center-block img-right' src='assets/images/hopper.jpg'>", 
                "<img class='center-block img-right' src='assets/images/curie.jpg'>"];
var correctAnswers = ["D. Amelia Earhart", 
                        "C. Stephanie Kwolek", 
                        "A. Virginia Hall", 
                        "B. Grace Hopper", 
                        "B. Marie Curie"];
var counter = 0;
var selecterAnswer;
var clock;
var wins = 0;
var losses = 0;
var timedOut = 0;
var htmlLink;


// Ready on load
$(document).ready(function() {

    // Starting Screen
    function initialize() {
        startScreen = "<p class='text-center answer-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".javascriptClass").html(startScreen);
    }
    
    initialize();
    
    //Create a function triggered by the start button that calls the html
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();
        callHTML();
        timeFunction();
    
    });
    
    // Function to check if answer was correct and within the alotted time
    $("body").on("click", ".answer", function(event){
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[counter]) {
            clearInterval(clock);
            generateWin();
        }
        else {
            clearInterval(clock);
            generateLoss();
        }
    }); 
    
    // Function to reset game
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    });
    
    });
    
    // Timeout function
    function timeoutLoss() {
        timedOut++;
        htmlLink = "<p class='text-center clockClass'>Time: <span class='timer'>" + timer + "</span></p>" + "<p>You ran out of time!  The correct answer was: " + correctAnswers[counter] + "</p>" + images[counter];
        $(".javascriptClass").html(htmlLink);
        setTimeout(wait, 4000);
    }
    
    // Win function
    function generateWin() {
        wins++;
        htmlLink = "<p class='text-center clockClass'>Time: <span class='timer'>" + timer + "</span></p>" + "<p>Correct! The answer is: " + correctAnswers[counter] + "</p>" + images[counter];
        $(".javascriptClass").html(htmlLink);
        setTimeout(wait, 4000);
    }
    
    // Loss Function
    function generateLoss() {
        losses++;
        htmlLink = "<p class='text-center clockClass'>Time: <span class='timer'>" + timer + "</span></p>" + "<p>Wrong! The correct answer is: "+ correctAnswers[counter] + "</p>" + images[counter];
        $(".javascriptClass").html(htmlLink);
        setTimeout(wait, 4000);
    }
    
    // HTML insert
    function callHTML() {
        htmlLink = "<p class='text-center clockClass'>Time: <span class='timer'>30</span></p><p>" + "<div class='textBox'>" + questions[counter] + "</div>" + "</p><p class='first-answer answer'>A. " + answers[counter][0] + "</p><p class='answer'>B. "+answers[counter][1]+"</p><p class='answer'>C. "+answers[counter][2]+"</p><p class='answer'>D. "+answers[counter][3]+"</p>";
        $(".javascriptClass").html(htmlLink);
    }
    
    // Timer guts
    function wait() {
        if (counter < 4) {
        counter++;
        callHTML();
        timer = 30;
        timeFunction();
        }
        else {
            finalScreen();
        }
    }
    function timeFunction() {
        clock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (timer === 0) {
                clearInterval(clock);
                timeoutLoss();
            }
            if (timer > 0) {
                timer--;
            }
            $(".timer").html(timer);
        }
    }
    
    // Last page
    function finalScreen() {
        htmlLink = "<p class='clockClass'>Time: <span class='timer'>" + timer + "</span></p>" + "<p>Great Job!" + "</p>" + "<p class='summary'>Correct: " + wins + "</p>" + "<p>Wrong: " + losses + "</p>" + "<p>Unanswered: " + timedOut + "</p>" + "<p class='reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Try Again!</a></p>";
        $(".javascriptClass").html(htmlLink);
    }
    
    // Resets values
    function resetGame() {
        counter = 0;
        wins = 0;
        losses = 0;
        timedOut = 0;
        timer = 30;
        callHTML();
        timeFunction();
    }
    

    