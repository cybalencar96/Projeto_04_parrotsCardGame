let qtdTotalCards;
let qtdSelectedCards = 0;
let backFace1;
let backFace2;
let frontFace1;
let frontFace2;
let gif1;
let gif2;

do {
    qtdTotalCards = Number(prompt("Digite a quantidade de cartas para jogar (apenas numeros inteiro e pares entre 4 e 14)"))
} while (((qtdTotalCards % 2) !== 0 || qtdTotalCards < 4 || qtdTotalCards > 14) && qtdTotalCards !== -1)

for (let i = 1; i < qtdTotalCards; i++) {
    const card = document.querySelector('.card');
    const cards = document.querySelector('.cards');
    // Need to create a new card div with all of its childs (arg true)
    const newCard = card.cloneNode(true);
    // append new card div
    cards.appendChild(newCard);
}

function selectCard(element) {
    

    qtdSelectedCards += 1;

    if (qtdSelectedCards === 1) {
        // garda a imagem e espera até selecionar outra
        frontFace1 = element.querySelector('.front-face');
        backFace1 = element.querySelector('.back-face');
        frontFace1.style.transform = 'rotateY(-180deg)';

        backFace1.style.transform = 'rotateY(0deg)';
        gif1 = backFace1.querySelector('img').getAttribute('src');      
        console.log(gif1); // retorna string

    } else if (qtdSelectedCards === 2) {
        frontFace2 = element.querySelector('.front-face');
        backFace2 = element.querySelector('.back-face');
        frontFace2.style.transform = 'rotateY(-180deg)';
        backFace2.style.transform = 'rotateY(0deg)';

        gif2 = backFace2.querySelector('img').getAttribute('src');
        gif2 = "sdsa";

        // verifica se deu match
        if (gif1 === gif2) {
            console.log('igual');

        } else {
            //  se não deu match, delay 1 seg e desvira as cartas
             setTimeout(function(){
                 backFace1.style.transform = 'rotateY(180deg)';
                 backFace2.style.transform = 'rotateY(180deg)';
                 frontFace1.style.transform = 'rotateY(0deg)';
                 frontFace2.style.transform = 'rotateY(0deg)';
             },1000)
        }

        qtdSelectedcards = 0;
    }
}