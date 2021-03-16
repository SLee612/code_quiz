
let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");

var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 5;
var questionSecElapsed = 0;
var questionInterval;

var jsQuestions = [
  {
    title: "Which two values does the Boolean data type accept:",
    choices: ["right/left", "plus/minus", "true/false", "right/wrong"],
    answer: "true/false"
  },
  {
    title: "Containers for storing data values are called:",
    choices: ["variables", "script", "loops", "boxes"],
    answer: "variables"
  },
  {
    title: "Finding and fixing problems in code is known as:",
    choices: ["coding", "debugging", "automating", "programming"],
    answer: "debugging"
  },
  {
    title: "What is a common naming convention used in programming that writes phrases without spaces or puncuation? Examples incluede, 'iPhone' and 'eBay.' ",
    choices: ["objectMode", "conditionalStatement", "concatenation", "camelCase"],
    answer: "camelCase"
  },
  {
    title: "Bad code is better than no code?",
    choices: ["True!", "False!"],
    answer: "True!"
  },
  {
    title: "JavaScript variable names are case-sensitive",
    choices: ["True", "False"],
    answer: "True"
  }
];

init();

function init() {
  clearDetails();
  reset();

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");


  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " You have five seconds for each question. The faster you answer correctly, the more points you earn. Wrong answers speed up the timer!"; 

  let startJsQuiz = document.createElement("button");
  startJsQuiz.setAttribute("id", "startJSQuiz");
  startJsQuiz.setAttribute("class", "btn btn-secondary");
  startJsQuiz.textContent= "Start Quiz";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startJsQuiz);


  startJsQuiz.addEventListener("click", function () {
    quizType = "Java Script";
    playQuiz(jsQuestions);
  });
}

function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  quizType = "";
  score = 0;

  gameDuration = 0;
  gameSecElapsed = 0;
  gameInterval;

  questionDuration = 5;
  questionSecElapsed = 0;
  questionInterval;
}

function playQuiz(questionSet) {
  if (test) { console.log("--- playQuiz ---"); }
  
  quiz = setUpQuestions(questionSet);
  
  timerTab.setAttribute("style", "visibility: visible;");

  gameDuration = quiz.length * 5;
  if (test) { console.log("duration g,q:",gameDuration,questionDuration); }

  startGameTimer();
  renderTime();
  presentQuestion();
}

function setUpQuestions(arr) {
  if (test) {console.log("--- setUpQuestions ---");}
  let ranQuest = [];
  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

function presentQuestion() {
  if (test) {console.log("--- presentQuestion ---");}
  questionSecElapsed = 0;

  if ( quiz.length === 0 ) {
    endOfGame();
    return;
  }

  curQuestion = quiz.pop();

  clearDetails();
   
  let question = document.createElement("h1");

  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);

  for( let i=0; i<curQuestion.choices.length; i++ ) {
    let listChoice = document.createElement("li");
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.textContent = curQuestion.choices[i];
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur", curQuestion);}

  choiceBox.addEventListener("click", function (){
    scoreAnswer(curQuestion);
  });
}

function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---");}
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    if ( selectedItem === cur.answer ) {
      score += questionDuration - questionSecElapsed;
    } else {
      if (test) { console.log("wrong answer");}
      gameDuration -= 10;
    }
  if (test) { console.log("sselected ",selectedItem);}
    showAnswers(cur);
  }
}

function showAnswers(cur) {
  // if (test) { console.log("--- showAnswer ---"); }
  // if (test) { console.log("sa qanda",cur);}
  // if (test) { console.log("sselected ",selectedItem);}


  for (let i=0; i<cur.choices.length; i++) {
    if (test) { console.log("sa in for ",i);}

    let questid = "#questionNum-" + i;
    let questrow = document.querySelector(questid);
    // if (test) { console.log("saf selected" + selectedItem + "<");}
    // if (test) { console.log("saf color test >" +  cur.choices[i] +"<");}

    if ( cur.choices[i] !== cur.answer ) {
      // if (test) { console.log("color test flase");}
      questrow.setAttribute("style","background-color: goldenrod");
    } else {
      // if (test) { console.log("color test true");}
      questrow.setAttribute("style","background-color: darkgreen");
    }
  }
  setTimeout(presentQuestion,500);
}


function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }
  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}


function renderTime() {


  gameTimerEl.textContent = gameDuration - gameSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;

  if ( (questionDuration - questionSecElapsed) < 1 ) {
    gameDuration -= 10;
    if (test) { console.log("too slow"); }
    presentQuestion();
  } 
  if ( (gameDuration - gameSecElapsed) < 1 ) {
   endOfGame();
  }
}

function startGameTimer () {
  if (test) { console.log("--- startGameTimer ---"); }
  setGameTime();

  gameInterval = setInterval(function() {
    gameSecElapsed++; 
    questionSecElapsed++; 
    renderTime();
  }, 1000);
}

function stopTime() {
  // if (test) { console.log("--- stopTime --- ");}
  gameSeconds = 0;
  questionSeconds = 0;
  clearInterval(gameInterval);
}

function endOfGame() {
  // if (test) { console.log("--- endOfGame ---"); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Game Over!";

 
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score " + score; 

 
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play again?";

  
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for","userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("maxlength","3");
  initialsInput.setAttribute("size","3");


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(par);
  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) { 
      let thisScore = [ { type: quizType, name: initialsInput.value, score: score } ]; 
      let storedScores = JSON.parse(localStorage.getItem("highScores")); 
      // if (test) { console.log("storedScore",storedScores); }

      if (storedScores !== null) { 
        storedScores.push(thisScore[0]); 
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function highScores() {
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let storedScores = JSON.parse(localStorage.getItem("highScores")); 

  let heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Top 5 High Score Hall of Fame";

  mainEl.appendChild(heading);

  if ( storedScores !== null ) {
   
    storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);

    let numScores2Display = 5;
    if ( storedScores.length < 5 ) { 
      numScores2Display = storedScores.length; 
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
      mainEl.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent =  "Your Initials Here!"
    mainEl.appendChild(p);
  }

  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play!";

  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);