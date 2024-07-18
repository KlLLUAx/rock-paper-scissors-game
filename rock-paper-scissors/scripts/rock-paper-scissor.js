let isAutoPlay = false;
let intervalId;

//buttons
const rockButton = document.querySelector(".js-rock-button");
const paperButton = document.querySelector(".js-paper-button");
const scissorButton = document.querySelector(".js-scissor-button");
const resetButton = document.querySelector(".js-reset-button");
const autoPlayButton = document.querySelector(".js-auto-play-button");

//buttons events
rockButton.addEventListener("click", () => {
  playGame('rock');
});

paperButton.addEventListener("click", () => {
  playGame('paper');
});

scissorButton.addEventListener("click", () => {
  playGame('scissor');
});

resetButton.addEventListener("click", () => {
  resetPoints();
});



autoPlayButton.addEventListener("click",()=>{
  autoplay();
})

function autoplay(){
  if(!isAutoPlay){
    
    intervalId = setInterval(()=>{
      let autoChoice = computersPlay();
      playGame(autoChoice);
      isAutoPlay = true;
    },1200)

    autoPlayButton.classList.add("auto-play-activated");
    autoPlayButton.innerHTML = 'Stop Auto Play';

    return;
  }
  clearInterval(intervalId)
  isAutoPlay = false;
  autoPlayButton.classList.remove("auto-play-activated");
  autoPlayButton.innerHTML = 'Auto Play';

}
//data storage
let gameData = JSON.parse(localStorage.getItem('gameData')) || {

  wins: 0,
  losses: 0,
  ties: 0,
  playersMove: '',
  computersChoice: '',
  result: ''

}

//update screen first load
updateData();

let result = '';

function playGame(playersMove) {

  computersChoice = computersPlay();

  gameData.playersMove = playersMove;



  //rock
  if (playersMove === "rock") {
    if (computersChoice === 'rock') {
      result = 'ties.';

    } else if (computersChoice === 'paper') {
      result = 'you loose.';

    } else if (computersChoice === 'scissor') {
      result = 'you won.'

    }
    //paper
  } else if (playersMove === "paper") {

    if (computersChoice === 'rock') {

      result = 'you won.';

    } else if (computersChoice === 'paper') {

      result = 'ties.';

    } else if (computersChoice === 'scissor') {

      result = 'you loose.';

    }
    //scissor
  } else if (playersMove === "scissor") {

    if (computersChoice === 'rock') {
      result = 'you loose.';

    } else if (computersChoice === 'paper') {
      result = 'you won.';

    } else if (computersChoice === 'scissor') {
      result = 'ties.';
    }
  }
  //set result
  if (result === 'you won.') {
    gameData.wins += 1;
  } else if (result === 'you loose.') {
    gameData.losses += 1;
  } else if (result === 'ties.') {
    gameData.ties += 1;
  }
  console.log(result)
  gameData.result = result;

  //save everything to local storage
  localStorage.setItem('gameData', JSON.stringify(gameData));


  //display result
  updateData();
}


//computers play 
function computersPlay() {
  const randomNum = Math.random();
  let computersChoice = "";

  if (randomNum >= 0 && randomNum < 1 / 3) {
    computersChoice = 'rock';

  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computersChoice = 'paper';

  } else if (randomNum >= 2 / 3 && randomNum < 1) {
    computersChoice = 'scissor';
  }

  gameData.computersChoice = computersChoice;

  return computersChoice;


}

function resetPoints() { //reset all data in screen.
  gameData.wins = 0;
  gameData.losses = 0;
  gameData.ties = 0;
  gameData.result = '';
  gameData.playersMove = '';
  gameData.computersChoice = '';

  updateData();

  localStorage.removeItem('gameData');

}

//display results
function updateData() {
  if (!(gameData.playersMove && gameData.computersChoice)) {
    document.querySelector('.js-score').innerHTML = `Wins: ${gameData.wins}, Losses: ${gameData.losses}, Ties: ${gameData.ties}`;

    document.querySelector('.js-result').innerHTML = `Result: ${gameData.result} `

    document.querySelector('.js-moves').innerHTML = `You: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Computer: `
  } else {

    document.querySelector('.js-score').innerHTML = `Wins: ${gameData.wins}, Losses: ${gameData.losses}, Ties: ${gameData.ties}`;

    document.querySelector('.js-result').innerHTML = `Result: ${gameData.result} `

    document.querySelector('.js-moves').innerHTML = `You: <img src="images/${gameData.playersMove}-emoji.png" class="move-icon">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Computer: <img src="images/${gameData.computersChoice}-emoji.png" class="move-icon"> `

  }

}