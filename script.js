let cards = [];
let history = [];
let historyIndex = 0;
let numberOfCards = localStorage.getItem('numberOfCards') ?? 5;
let isPlaying = false;

const resetRendered = () => {
  const winAlertElement = document.getElementById('win-alert');
  const loseAlertElement = document.getElementById('lose-alert');
  winAlertElement.classList.add('hidden');
  loseAlertElement.classList.add('hidden');
  document.getElementById('root').style.opacity = 1;
  document.getElementById('unsolvable').style.opacity = 1;
  isPlaying = true;
};

const showingResult = () => {
  document.getElementById('root').style.opacity = 0.5;
  document.getElementById('unsolvable').style.opacity = 0;
  isPlaying = false;
};

const updateScrollInput = () => {
  const scrollInputElement = document.getElementById('scroll-input');
  const scrollInputNumberInputElement = document.getElementById('scroll-value');
  scrollInputNumberInputElement.value = scrollInputElement.value;
  numberOfCards = Number(scrollInputElement.value);

  startGame();
};

const updateNumberInput = () => {
  const scrollInputElement = document.getElementById('scroll-input');
  const scrollNumberElement = document.getElementById('scroll-value');
  if (scrollNumberElement.value < 1 || scrollNumberElement.value > 10) return;

  scrollInputElement.value = scrollNumberElement.value;
  numberOfCards = Number(scrollNumberElement.value);

  startGame();
};

const unsolvable = () => {
  const winElement = document.getElementById('win-alert');
  const loseElement = document.getElementById('lose-alert');
  showingResult();

  if (history[0].filter((card) => card === 'up').length % 2 === 0) {
    winElement.classList.remove('hidden');
    loseElement.classList.add('hidden');
  } else {
    loseElement.classList.remove('hidden');
    winElement.classList.add('hidden');
  }
};

const undo = () => {
  if (historyIndex === 0) {
    resetRendered();
    return;
  }
  cards = [...history[historyIndex]];
  historyIndex -= 1;

  checkWin();
  renderCards();
};

const checkWin = () => {
  if (cards.every((card) => card === 'removed')) {
    document.getElementById('win-alert').classList.remove('hidden');
    showingResult();
    return;
  }

  resetRendered();

  const cardsLeft = cards.filter((card) => card !== 'removed');
  if (cardsLeft.every((card) => card === 'down')) {
    document.getElementById('lose-alert').classList.remove('hidden');
    showingResult();
  }
};

const removeCard = (index) => {
  history = [...history.slice(0, historyIndex + 1), [...cards]];
  historyIndex += 1;
  cards[index] = 'removed';

  if (index > 0 && cards[index - 1] !== 'removed') {
    cards[index - 1] = cards[index - 1] === 'up' ? 'down' : 'up';
  }
  if (index < cards.length - 1 && cards[index + 1] !== 'removed') {
    cards[index + 1] = cards[index + 1] === 'up' ? 'down' : 'up';
  }

  const cardElements = document.querySelectorAll('.card');
  cardElements[index].classList.add('card--removed');
  cardElements[index].classList.remove('card--up');

  if (index > 0 && cards[index - 1] !== 'removed') {
    cardElements[index - 1].classList.toggle('card--up');
  }
  if (index < cards.length - 1 && cards[index + 1] !== 'removed') {
    cardElements[index + 1].classList.toggle('card--up');
  }

  checkWin();
};

const renderCards = () => {
  const root = document.getElementById('root');
  root.innerHTML = '';

  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    if (card !== 'down') cardElement.classList.add(`card--${card}`);

    cardElement.addEventListener('click', () => {
      if (cards[index] !== 'up') return;
      if (!isPlaying) return;

      removeCard(index);
    });

    const frontElement = document.createElement('div');
    frontElement.classList.add('card__front');
    frontElement.textContent = 'Front';

    const backElement = document.createElement('div');
    backElement.classList.add('card__back');
    backElement.textContent = 'Back';

    cardElement.appendChild(frontElement);
    cardElement.appendChild(backElement);

    root.appendChild(cardElement);
  });
};

const startGame = () => {
  resetRendered();

  cards = Array.from({ length: numberOfCards }, () =>
    Math.random() > 0.5 ? 'up' : 'down'
  );
  history = [[...cards]];
  historyIndex = 0;

  isPlaying = true;
  checkWin();
  renderCards();
};

window.addEventListener('beforeunload', () => {
  localStorage.setItem('numberOfCards', JSON.stringify(numberOfCards));
});

window.onload = () => {
  const undoButtonElement = document.getElementById('undo-button');
  undoButtonElement.addEventListener('click', undo);

  const newGameButtonElement = document.getElementById('new-game-button');
  newGameButtonElement.addEventListener('click', startGame);

  const unsolvableElement = document.getElementById('unsolvable');
  unsolvableElement.addEventListener('click', unsolvable);

  const scrollInputElement = document.getElementById('scroll-input');
  const scrollNumberElement = document.getElementById('scroll-value');
  scrollInputElement.value = scrollNumberElement.value = numberOfCards;
  updateScrollInput();
  updateNumberInput();
  scrollInputElement.addEventListener('input', updateScrollInput);
  scrollNumberElement.addEventListener('input', updateNumberInput);

  startGame();
};
