const element={
    horizontalRule: document.getElementsByClassName('horizontalRule'),
    gameTitle: document.getElementById("title"),
    gameContainer: document.getElementById("gameContainer"),
    startButton: document.getElementById("startGame"),
    round: document.getElementById("round"),
    playerSelect: document.getElementById("playerSelect"), 
    rockImage: document.getElementById("rockImage"),
    paperImage: document.getElementById("paperImage"),
    scissorsImage: document.getElementById("scissorsImage"),
    nextRoundButton: document.getElementById("nextRound"),
    showCurrent: document.getElementById("showCurrent"),
    playerChoice: document.getElementById("playerChoice"),
    computerChoice: document.getElementById("computerChoice"),
    result:document.getElementById("result"),
    gameScore: document.getElementById("gameScore"),
    playerScore: document.getElementById("playerScore"),
    computerScore: document.getElementById("computerScore"),
    endGame: document.getElementById("endGame"),
    finalScorePlayer: document.getElementById("finalScorePlayer"),
    finalScoreComputer: document.getElementById("finalScoreComputer"),
    finalScoreTies: document.getElementById("finalScoreTies"),
    finalText:document.getElementById("finalText"),
    finalImage: document.getElementById("finalImage")
}

//1 means rock, 2 means paper, 3 means scissors and 4 means tie

const gameStats={
    computerSelection: 0,
    playerSelection: 0,
    enable: false,
    round: 1,
    playerScore: 0,
    computerScore: 0,
    ties:0,
    nextButton: false,
}

function computerSelection(){
    gameStats.computerSelection= Math.floor(Math.random() * 3) + 1;
}

function updateRound(){
    element.playerScore.innerHTML=`You- ${gameStats.playerScore}`;
    element.computerScore.innerHTML=`Computer- ${gameStats.computerScore}`;
}

function startAnimation(){
    element.gameContainer.classList.add('StartGameAnimation');
    element.gameContainer.style.height="100vh";
    element.gameContainer.style.width="100vw";

    element.startButton.style.display="none";   
    element.gameTitle.style.display="none";

    element.round.style.display="block";
    element.playerSelect.style.display="block";
    element.nextRoundButton.style.display="block";
    element.gameScore.style.display="flex";
    element.horizontalRule[0].style.display="block";
    element.horizontalRule[1].style.display="block";
}

function startGame(){
    startAnimation();
    updateRound();
    nextButton(false);
    element.round.innerHTML=`Round ${gameStats.round}`;
    gameStats.enable=true;
}

function playRound(value){
    nextButton(false);
    if(gameStats.enable){
        gameStats.playerSelection=value;
        computerSelection();
        calcResult();
        updateRound();
    }
}

//for result, 0 means tie, 1 means won, 2 means lost
function calcResult(){
    gameStats.enable=false;
    if(gameStats.playerSelection==1){
        if(gameStats.computerSelection==1){
            showGame(0);
            gameStats.ties++;
        }
        if(gameStats.computerSelection==2){
            gameStats.computerScore++;
            showGame(2);
        }
        if(gameStats.computerSelection==3){
            gameStats.playerScore++;
            showGame(1);
        }
    }
    if(gameStats.playerSelection==2){
        if(gameStats.computerSelection==2){
            showGame(0);
            gameStats.ties++;
        }
        if(gameStats.computerSelection==3){
            gameStats.computerScore++;
            showGame(2);
        }
        if(gameStats.computerSelection==1){
            gameStats.playerScore++;
            showGame(1);
        }
    }
    if(gameStats.playerSelection==3){
        if(gameStats.computerSelection==3){
            showGame(0);
            gameStats.ties++;
        }
        if(gameStats.computerSelection==1){
            gameStats.computerScore++;
            showGame(2);
        }
        if(gameStats.computerSelection==2){
            gameStats.playerScore++;
            showGame(1);
        }
    }
}

function showGame(value){
    element.playerSelect.style.display='none';
    element.showCurrent.style.display='block';

    switch (gameStats.playerSelection) {
        case 1:
            element.playerChoice.src='media/rock.jpeg';
            break;
        case 2:
            element.playerChoice.src='media/paper.jpeg';
            break;
        case 3:
            element.playerChoice.src='media/scissors.jpeg';
    }
    switch (gameStats.computerSelection) {
        case 1:
            element.computerChoice.src='media/rock.jpeg';
            break;
        case 2:
            element.computerChoice.src='media/paper.jpeg';
            break;
        case 3:
            element.computerChoice.src='media/scissors.jpeg';
    }
    if(value==1)
        element.result.innerHTML='You Won';
    else if(value==2)
        element.result.innerHTML='Computer Won';
    else{
        element.result.innerHTML='Its a Tie';
        gameStats.round--;
    }
    nextButton(true);
    if(value==0){
        element.nextRoundButton.innerHTML='Retry';
    }
}

function nextButton(value,val1){
    element.nextRoundButton.innerHTML='Next Round';
    if(value==true)
        element.nextRoundButton.style.backgroundColor='rgb(26,135,13)';
    else
        element.nextRoundButton.style.backgroundColor='gray';
    
    gameStats.nextButton=val1;
}

function nextRound(){
    nextButton(false,true);
    if(gameStats.nextButton && gameStats.round<3){
        gameStats.round++;
        element.round.innerHTML=`Round ${gameStats.round}`;

        gameStats.enable=true;
        element.showCurrent.style.display='none';
        element.playerSelect.style.display='block';
    }
    else{
        element.nextRoundButton.innerHTML='Show Result'
        result();
    }
}

function result(){
    element.gameContainer.style.display='none';
    element.endGame.style.display='flex';

    element.finalScorePlayer.innerHTML=`Player Score: ${gameStats.playerScore}`;
    element.finalScoreComputer.innerHTML=`Computer Score: ${gameStats.computerScore}`;
    element.finalScoreTies.innerHTML=`Ties: ${gameStats.ties}`;
    
    if(gameStats.playerScore>gameStats.computerScore){
        element.finalText.innerHTML='You Won';
        element.finalImage.src='media/happy.jpeg';
    }
    else{
        element.finalText.innerHTML='Computer Won';
        element.finalImage.src='media/sad.jpg';
    }
}