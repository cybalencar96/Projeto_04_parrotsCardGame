let qtdCards;
do {
    qtdCards = Number(prompt("Digite a quantidade de cartas para jogar (apenas numeros inteiro e pares entre 4 e 14)"))
} while (((qtdCards % 2) !== 0 || qtdCards < 4 || qtdCards > 14) && qtdCards !== -1)
console.log(qtdCards);

for (let i = 1; i < qtdCards; i++) {
    const card = document.querySelector('.card');
    const cards = document.querySelector('.cards');
    // Need to create a new card div with all of its childs (arg true)
    const newCard = card.cloneNode(true);
    // append new card div
    cards.appendChild(newCard);
}

function selectCard(element) {
    const frontFace = element.querySelector('.front-face');
    const backFace = element.querySelector('.back-face');


    frontFace.style.transform = 'rotateY(-180deg)';
    backFace.style.transform = 'rotateY(0deg)';
}