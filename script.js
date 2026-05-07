
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};



let isAutoPlaying = false;
let intervalId;



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } 
  else if (event.key === 'p') {
    playGame('paper');
  } 
  else if (event.key === 's') {
    playGame('scissors');
  }
});

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');

  updateScoreElement();
}

updateScoreElement();



function autoPlay() {
  if (!isAutoPlaying) {

    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoPlaying = true;

  } else {

    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}



function playGame(playerMove) {

  const computerMove = pickComputerMove();
  let result = '';

  
  if (playerMove === 'scissors') {

    if (computerMove === 'rock') {
      result = 'lose';

    } else if (computerMove === 'paper') {
      result = 'win';

    } else if (computerMove === 'scissors') {
      result = 'tie';
    }
  }

 
  else if (playerMove === 'paper') {

    if (computerMove === 'rock') {
      result = 'win';

    } else if (computerMove === 'paper') {
      result = 'tie';

    } else if (computerMove === 'scissors') {
      result = 'lose';
    }
  }

  else if (playerMove === 'rock') {

    if (computerMove === 'rock') {
      result = 'tie';

    } else if (computerMove === 'paper') {
      result = 'lose';

    } else if (computerMove === 'scissors') {
      result = 'win';
    }
  }


  if (result === 'win') {
    score.wins++;

  } else if (result === 'lose') {
    score.losses++;

  } else if (result === 'tie') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));


  
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML =
    `You <img  class="move" src="${playerMove}.png" alt="${playerMove}"> - <img class="move" src="${computerMove}.png" alt="${computerMove}"> Computer`;
}



function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}



function pickComputerMove() {

  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';

  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';

  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}