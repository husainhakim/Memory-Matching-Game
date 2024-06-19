

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const attemptCounter = document.createElement('div');
    attemptCounter.id = 'attempt-counter';
    attemptCounter.style.marginBottom = '20px';
    document.querySelector('.game-container').insertBefore(attemptCounter, gameBoard);
  
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let attempts = 0;
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function createBoard() {
      cards = shuffle(cardValues).map(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        return card;
      });
      updateAttemptCounter();
    }
  
    function flipCard() {
      if (flippedCards.length < 2 && !this.classList.contains('flipped') && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);
  
        if (flippedCards.length === 2) {
          attempts++;
          updateAttemptCounter();
          checkForMatch();
        }
      }
    }
  
    function checkForMatch() {
      const [card1, card2] = flippedCards;
  
      if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
  
        if (matchedCards.length === cards.length) {
          setTimeout(() => alert(`You win! Total attempts: ${attempts}`), 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          card1.textContent = '';
          card2.textContent = '';
          flippedCards = [];
        }, 1000);
      }
    }
  
    function resetGame() {
      gameBoard.innerHTML = '';
      matchedCards = [];
      flippedCards = [];
      attempts = 0;
      createBoard();
    }
  
    function updateAttemptCounter() {
      attemptCounter.textContent = `Attempts: ${attempts}`;
    }
  
    resetButton.addEventListener('click', resetGame);
    createBoard();
  });
  
