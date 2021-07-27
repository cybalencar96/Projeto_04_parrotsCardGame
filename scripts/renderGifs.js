let qtdTotalCards;

do {
    qtdTotalCards = Number(prompt("Digite a quantidade de cartas para jogar (apenas numeros inteiro e pares entre 4 e 14)"))
} while (((qtdTotalCards % 2) !== 0 || qtdTotalCards < 4 || qtdTotalCards > 14) && qtdTotalCards !== -1)


let gifArr = ["bobrossparrot.gif","bobrossparrot.gif","explodyparrot.gif","explodyparrot.gif","fiestaparrot.gif","fiestaparrot.gif","metalparrot.gif","metalparrot.gif","revertitparrot.gif","revertitparrot.gif","tripletsparrot.gif","tripletsparrot.gif","unicornparrot.gif","unicornparrot.gif"];

gifArr = gifArr.slice(0,qtdTotalCards);
gifArr = gifArr.sort(comparador);

for (let i = 0; i < qtdTotalCards; i++) {
    const cards = document.querySelector('.cards');
    const card = document.querySelector('.card');

    // Need to create a new card div with all of its childs (arg true)
    const newCard = card.cloneNode(true);
    // set new gif to newCard
    newCard.querySelector('.back-face img').src = `/assets/${gifArr[i]}`;
    console.log(newCard);
    // append new card div
    cards.appendChild(newCard);
    if (i === qtdTotalCards - 1) {
        cards.removeChild(card);
    }
}


function comparador() { 
	return Math.random() - 0.5; 
}