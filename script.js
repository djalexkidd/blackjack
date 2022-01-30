let suits = ['COEUR', 'TREFLE', 'CARREAU', 'PIQUE'];
let values = ['AS', 'ROI', 'REINE', 'VALET',
  'DIX', 'NEUF', 'HUIT', 'SEPT', 'SIX',
  'CINQ', 'QUATRE', 'TROIS', 'DEUX', 'UN'
];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

hitButton.style.display = 'none';
stayButton.style.display = 'none';

let gameStart = false,
  gameOver = false,
  playWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})

function createDeck() {
  let deck = []
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      }
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let i=0; i<deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function checkForEndOfGame(){
  updateScores();
  
  if(gameOver){
    while(dealerScore<playerScore &&
          playerScore <=21 &&
          dealerScore <=21){
            dealerCards.push(getNextCard());
            updateScores();
    }
  }
    
    if(playerScore>21){
      playerWon=false;
      gameOver = true;
    }
    
    else if(dealerScore>21){
      playerWon = true;
      gameOver = true;
    }
    
    else if(gameOver){
      if(playerScore>dealerScore){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}

function getCardString(card) {
  return card.value + " de " + card.suit;
}
function getCardNumericValue(card){
  switch(card.value){
    case 'AS':
      return 1;
    case 'DEUX':
      return 2;
    case 'TROIS':
      return 3;
    case 'QUATRE':
      return 4;
    case 'CINQ':
      return 5;
    case 'SIX':
      return 6;
    case 'SEPT':
      return 7;
    case 'HUIT':
      return 8;
    case 'NEUF':
      return 9;
    default:
      return 10; 
  }
}
function showStatus()
{ 
  let dealerCardString = '';
  for(let i=0; i<dealerCards.length; i++)
  {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  let playerCardString='';
  for(let i=0; i<playerCards.length; i++)
  {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText = 'le CROUPIER a:\n' +
                        dealerCardString + 
                        '(score: ' + dealerScore + ')\n\n' +
                        
                        'VOUS avez:\n' +
                        playerCardString + 
                        '(score: ' + playerScore + ')\n\n';
                        
  if(gameOver){
    if(playerWon)
    {
      textArea.innerText += "VOUS REMPORTEZ LA VICTOIRE!";
    }
    else{
      textArea.innerText += "LE CROUPIER REMPORTE LA VICTOIRE!";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value == 'AS'){
      hasAce = true;
    }
    
    if(hasAce && score+10<=21){
      return score+10;
    }
  }
   return score; 
}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards); 
}


function getNextCard() {
  return deck.shift();
}
