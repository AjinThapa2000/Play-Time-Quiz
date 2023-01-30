let questions=[
    { 
        q: "Inside which HTML element do we put the JavaScript?",
        choice:['script','scripting','html','js'],
        a:'script'
    },
    {
        q: "What is the correct syntax for referring to an external script called xxx.js?",
        choice:['script src=xxx.js','script href=xxx.js','script link=xxx.js','scripting src=xxx.js'],
        a:'script src=xxx.js'
    },
    {
        q: "The external JavaScript file must contain the <script> tag.?",
        choice:['yes','no','maybe','may not be'],
        a:'yes'
    },
    {
        q: "How do you write Hello World in an alert box?",
        choice:['alert("hello world")','msg("hello world")','msgbox("hello world")','alertBox("hello world")'],
        a:'alert("hello world")'

    }
]

let currentQues;
var time;
let timeInterval;

//Dom element
let startEl=document.querySelector('#start-screen');
let questionEl=document.querySelector("#question-title");
let scoreEl=document.querySelector('#end-screen');
let highScoreEl=document.querySelector('#wrapper')
let timerEl=document.getElementById("time");
let makeChoice=document.getElementById("choose-ans");
let submitBtn=document.getElementById("submit");
let startBtn=document.getElementById("start");
let initalEl=document.getElementById("intials");
let feedBackEl=document.getElementById("feedback");
let resultEl=document.querySelector("#resultShow");
let totalScore=document.querySelector("#final-score");
let btn=document.querySelector("#buttonEl")
let titleEl=document.querySelector("#highScoreTitle");

let soundEffect= new Audio("assets/sfx/correct.wav");
scoreEl.setAttribute('hidden',true);
makeChoice.setAttribute('hidden',true);
btn.setAttribute("hidden",true);
titleEl.setAttribute("hidden",true);

function hideAll(){
    startEl.setAttribute("hidden", true);
    scoreEl.setAttribute("hidden",true);
    makeChoice.removeAttribute('hidden', true);
    btn.setAttribute('hidden',true);

    

}
//shows ans either correct or incorrect
const resultD = document.querySelector("#result-d");
const resultT = document.querySelector("#result-t");


function optionIsCorrect(optionButton) {
    //return correct answer
    return optionButton.textContent == questions[currentQues].a;
  }
  

function answerSelect(eventObject){
    //return target object
    let optionButton = eventObject.target;
    resultD.style.display = "block";
    //check target object to define choice
    if (optionIsCorrect(optionButton)) {
        soundEffect.play();
        resultT.textContent = "Correct!";
        //if choice is made different
    } else {
        resultT.textContent = "Incorrect!";
        if (time >= 10) {
            time = time - 10;
            clockDisplay();
        } else {
            time = 0;
            clockDisplay();
            gameEnd();
        }
    }
    currentQues++;
    //Display remaining question
    if (currentQues < questions.length) {
      readQuestions();
      
    } else {
        resultD.style.display='';
        gameEnd();
    }
}
//time strats to decrease as game start
function clockTime(){
    time--;
    //display clock at the top right corner of page
    clockDisplay();
    //As time finished gameEnd function is called to stop game.
    if (time < 1) {
        gameEnd();
    }



}
// Game start from here
function quizStart(){
    //call hide function to hide all other display part to start question and ans part.
    hideAll();
    //hidden attribute is remove to display questions and option
    questionEl.removeAttribute("hidden");

    currentQues=0;
    //question is retrive using readQuestion function
    readQuestions();
    //set amount of time 
    time = questions.length * 10;

    //setting up time interval for time running
    timeInterval = setInterval(clockTime, 1000);
  
    //Time starts as start of quiz
    clockDisplay();








}
//initialize time display variable to display time
const displayTime = document.querySelector("#time");
function clockDisplay(){
    //set content time on display variable 
    displayTime.textContent = time;


}
//question retrive function
function readQuestions(){
    //question starts from index 0
    let question=questions[currentQues];
    //choice are display based on given question
    let choices=question.choice;
    //questionElement variable is set to id question-text to trace element in html for insertion of question
    let questionElement=questionEl;
    //questions are set on traced element.
    questionElement.textContent=question.q;
    //loop are created to set ans choices on 4 different listed element
    for (let i = 0; i < choices.length; i++) {
        //options on ith index
        let option = choices[i];
        //option botton elment are selected and answer choice are set based on ith index
        let optionButton = document.querySelector("#option" + i);
        optionButton.textContent = option;
        

  
      }
    








}

function gameEnd(){
    clearInterval(timeInterval);
    questionEl.setAttribute("hidden", true);
    makeChoice.setAttribute('hidden',true);
    resultD.setAttribute('hidden',true);
    resultT.setAttribute('hidden',true);
    scoreEl.removeAttribute('hidden',true);

    totalScore.textContent=time;
}

const submitBt = document.querySelector("#submit");
const inputEl = document.querySelector("#initials");

function getHighScore(event) {
    //stop default behaviour
    event.preventDefault();
  
    //check for input if null
    if (!inputEl.value) {
      alert("Please enter your name!");
      return;
    }
  
    //store score and name of player
    let leaderBoardValue = {
      name: inputEl.value,
      point: time,
    };

    leadingBoard(leaderBoardValue);
   
    //hide all to display leadingBoard
    startEl.setAttribute("hidden", true);
    scoreEl.setAttribute("hidden",true);
    makeChoice.setAttribute('hidden', true);
    feedBackEl.removeAttribute('hidden', true);
    titleEl.removeAttribute('hidden',true);

    //display list of highscore
    displayScoreList();
}
function leadingBoard(leaderBoardValue) {
    let arryOfScore = highScoreList();
    //append new score to the highscore list
    arryOfScore.push(leaderBoardValue);
    localStorage.setItem("arryOfScore", JSON.stringify(arryOfScore));
}


function highScoreList(){
    let storedScore = localStorage.getItem("arryOfScore");
    if (storedScore !== null) {
      let arryOfScore = JSON.parse(storedScore);
      return arryOfScore;
    } else {
      arryOfScore = [];
    }
    return arryOfScore;


}

function displayScoreList() {
    let sortedPoint = sortedScore();
    const highScore = document.querySelector("#resultShow");
    highScore.innerHTML = "";
    for (let i = 0; i < sortedPoint.length; i++) {
      let scoreEntry = sortedPoint[i];
      let newScore = document.createElement("li");
      newScore.textContent =
        scoreEntry.name + " - " + scoreEntry.point;
      highScore.append(newScore);
    }
    btn.removeAttribute('hidden',true);

}

function sortedScore() {
    let listArry = highScoreList();
    if (!listArry) {
      return;
    }
  
    listArry.sort(function (x, y) {
      return x.point - y.point;
    });
    return listArry;
}

function clearHighScore(){
    localStorage.clear()
    displayScoreList();
}

function startAgain(){
    hideAll();
    startEl.removeAttribute('hidden',true);
    makeChoice.setAttribute('hidden',true);
    feedBackEl.setAttribute('hidden',true);
    


}

function showPoints(){
    hideAll();
    feedBackEl.removeAttribute("hidden");
    makeChoice.setAttribute('hidden',true);

  
    //stop countdown
    clearInterval(timeInterval);
  
    //assign undefined to time and display that, so that time does not appear on page
    time = undefined;
    clockDisplay();
  
    //display leaderboard on leaderboard card
    displayScoreList();
    titleEl.removeAttribute('hidden');
    

}





startBtn.addEventListener("click", quizStart);
document.querySelector("#choose-ans").addEventListener("click", answerSelect);
submitBt.addEventListener("click", getHighScore);
document.querySelector('#clearScore').addEventListener('click', clearHighScore);
document.querySelector('#goBack').addEventListener('click', startAgain);
document.querySelector('#leaderboard-link').addEventListener('click', showPoints);

