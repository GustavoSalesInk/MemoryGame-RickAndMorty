const grid = document.querySelector('.grid');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        alert('Parabéns, parece que você não é tão bostinha, assim!');
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
  
    if (firstCharacter === secondCharacter) {
  
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        firstCard = '';
        secondCard = '';
        
        checkEndGame();
  
    } else {
        setTimeout(() => {
    
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
    
            firstCard = '';
            secondCard = '';
    
        }, 500);
    }
  
  }

const revealCard = ({ target }) => {

    //(condição) = efeito de ao clicar na carta ela será revelada
    //rever includes... ****************
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    
    if (firstCard === '') {
        //ao clicar na carta, ele irá revelar e esse 'se' é o primeiro click
        target.parentNode.classList.add('reveal-card');
        //ele irá guardar a variavel click, na variavel firstCard
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        //processo de cima, na agora, quando clica na segunda carta
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (character) => {
    //com a const de criação de elementos, alteramos nosso código
    //criação das div's com java script, recebe elementos
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    
    //linha para mostrar a imagem no fundo da carta
    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)
    return card;
}

//carrega o jogo
const loadgame = () => {
    //duplicando os characters, para o jogo ter cada personagem duplicado
    const duplicateCharacter = [ ...characters, ...characters ];

    //deixa de forma aleatoria os personagens
    const shuffledArray = duplicateCharacter.sort(() => Math.random() - 0.5);

    //array que cria um personagem no momento que acionado o jogo
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

loadgame();