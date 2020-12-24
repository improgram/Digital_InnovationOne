const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    console.log('Clicou.')
    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//Quantidade de cliques
let count = 0 ;

//função que checa se as cartas são iguais
function checkForMatch() {
    count ++;
    console.log('Tentativas: ' + count);
    document.getElementById("contagem").textContent = count;

    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        console.log('ACERTOU.')
        return;
    }
    console.log('ERROU.')
    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1400);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();//funcao automaticamente invocada

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

//Refresh na pagina
function reloadPage() {
    window.location.reload();
}
