var playing = false;
var score;
var wrong;
var action;
var timeremaining;
var correctAnswer;
//if we click on start/reset button
document.getElementById("startreset").onclick=function()
{
    //if we are playing
    if(playing == true){
        location.reload(); //reloading page
    }else{//if we are not playing
        //set score to 0
        playing=true;
        score=0;
        wrong=0;
        document.getElementById("scorevalue").innerHTML=score;
        //show countdown box
        show("timeremaining");
        
        timeremaining=60;
 document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        //hide gameOver
        hide("gameOver");
        //reduce button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
        //start Countdown
        
        startCountdown();
        
        //generate Q/A
 
        generateQA();
    }
}

//checking answer boxes
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
        if(playing==true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML=score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                generateQA();
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
                wrong++;
                generateQA();
            }
        }
    }
}



//functionns

//start Countdown
function startCountdown(){
    action = setInterval(function(){
        timeremaining-=1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML="<p>game over!</p><p>your score is "+ score +"</p><p>wrong answers: "+ wrong +"</p>";
            document.getElementById("startreset").innerHTML="Start Game";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing= false;
        }
    },1000)
}
//stop Countdown
function stopCountdown(){
    clearInterval(action);
}
//hide an element
function hide(id){
    document.getElementById(id).style.display="none";
}
//show an element
function show(id){
    document.getElementById(id).style.display="block";
}
//generate Q&A
function generateQA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctAnswer=x*y;
    document.getElementById("questionBox").innerHTML=x + "x" + y;
    var correctPosition = 1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer; //fill one box with te correct answer
    //fill other boxes with wrong answers
    var answers = [correctAnswer];
    for(i=1;i<5;i++)
        {
            if(i!=correctPosition)
                {
                    var wrongAnswer;
                    do{
                        wrongAnswer = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
                    }
                    while(answers.indexOf(wrongAnswer)>-1);
                     document.getElementById("box"+i).innerHTML=wrongAnswer;
                    answers.push(wrongAnswer);
                }
        }
}