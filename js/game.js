const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    'beth',
    'jerry',
    /*'jessica',*/
    'morty',
    'pessoa-passaro',
    /*'pickle-rick',*/
    'rick',
    'summer',
    'meeseeks',
    /*'scroopy',*/
    'snowball',
    /*'tammy',*/
    /*'krombopulos',*/
    'mr-nimbus',
    'mr-poopybutthole'
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
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Parece que você não é tão bostinha, assim! Seu tempo foi: ${timer.innerHTML}`);
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

const startTime = () => {

    /*ele vai fazer um loop, de a cada segundo(1000), ocorrer um acrescimo */
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {
    /*span.inner, é a passagem do valor dentro do HTML e localStorage é recuperação do valor na caixa do jogador*/
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadgame();
}