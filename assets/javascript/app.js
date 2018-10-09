// Variables

var startScreen;
var timer = 30;
var questions = ["In 1 Samuel, God orders the Israelites to attack the people of Amalek. Who did he command to be killed?", 
                    "Abraham's nephew, Lot, once had two angel visitors disguised as men visit. When the men of Sodom demanded that Lot let them rape the visitors, what did Lot offer to them instead?", 
                    "The prophet Elisha was once teased by a group of children for being bald as he was making his way down the road. He cursed the boys and the Lord did what?", 
                    "Judah's first-born son, Er, was killed by the Lord. So Judah of course asked his second son, Onan, to sleep with Er's widow to give her a child. Onan refused to conceive with his sister-in-law, \"spilling his seed on the ground.\" How did the Lord punish Onan?", 
                    "According to Leviticus, God welcomed the blind, lame, crippled, and disabled at his alter.", 
                    "If a woman saves her husband in a brawl, pulverizing his attacker's peanuts - According to the Lord, what should be done?"];
var answers = [["Just the men", "The men and the women", "The men, women, and children", "The men, women, children, nursing babies, and livestock"], 
                ["Some chicken noodle soup.","$100 in today's dollars.","His two daughters instead.","A WWE style smackdown."], 
                ["Sent bears out of the forest to maul all the children to death.", "Told Elisha to grow some thicker skin.", "Boomed down at the children to be kind and follow the Golden Rule.", "Decided to not get involved with such trivial matters."], 
                ["Making Onan, himself, pregnant.","Killing Onan as well.","He made Onan lactose intolerant.","Decided not to punish him after all, because really that was a pretty disgusting request on the part of his father, Judah."], 
                ["True", "False", "Only on the Sabbath.", "As long as they aksed forgiveness before entering the temple."], 
                ["Apologize to her husband for interferring.","She gets free chicken tenders for a year.","Her husband should buy her a beer.","Chop off her hand."]];
var images = ["<img class='center-block img-right' src='assets/images/baby.jpg'>", 
                "<img class='center-block img-right' src='assets/images/lot.jpg'>", 
                "<img class='center-block img-right' src='assets/images/bears.jpg'>", 
                "<img class='center-block img-right' src='assets/images/seed.jpg'>", 
                "<img class='center-block img-right' src='assets/images/lame.jpg'>", 
                "<img class='center-block img-right' src='assets/images/woman.jpg'>"];
var correctAnswers = ["D. The men, women, children, nursing babies, and livestock", 
                        "C. His two daughters instead.", 
                        "A. Sent bears out of the forest to maul all the children to death.", 
                        "B. Killing Onan as well.", 
                        "B. False", 
                        "D. Chop off her hand."];
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
        htmlLink = "<p class='text-center clockClass'>Time: <span class='timer'>30</span></p><p>" + questions[counter] + "</p><p class='first-answer answer'>A. " + answers[counter][0] + "</p><p class='answer'>B. "+answers[counter][1]+"</p><p class='answer'>C. "+answers[counter][2]+"</p><p class='answer'>D. "+answers[counter][3]+"</p>";
        $(".javascriptClass").html(htmlLink);
    }
    
    // Timer guts
    function wait() {
        if (counter < 5) {
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
        htmlLink = "<p class='clockClass'>Time: <span class='timer'>" + timer + "</span></p>" + "<p>Well done my good and faithful servant <3" + "</p>" + "<p class='summary'>Correct: " + wins + "</p>" + "<p>Wrong: " + losses + "</p>" + "<p>Unanswered: " + timedOut + "</p>" + "<p class='reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Try Again!</a></p>";
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
    

    