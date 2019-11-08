/*
-2 players, playing in rounds
-Each turn, a player rolls a dice as many times
as they want. The points are added to their round score
-BUT if the player rolls a 1, all their round score
is lost. Then the next player's turn starts
-The player can choose to hold, adding their round score to
their global score. After that it's the other player's turn
-The first player to reach 100 global score wins
*/
var scores, roundScore, activePlayer, finalScore, gamePlaying, prevRoll, dice;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gamePlaying) {
        //1. Random number
        dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //3. Update the round score IF the rolled # was not a 1
        if(dice === 6 && prevRoll === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice > 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        prevRoll = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
        //1. Add current score to the player's global score
        scores[activePlayer] += roundScore;
        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('.dice').style.display = 'none';

        var input = document.querySelector('.final-score').value;
        
        if(input) {
            finalScore = input;
        } else {
            finalScore = 100;
        }
        //3. Check if the player won
        if(scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = '0';

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevRoll = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

//Clicking on New Game
document.querySelector('.btn-new').addEventListener('click', init); 

//Initialize the board
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    prevRoll = 0;
    dice = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}