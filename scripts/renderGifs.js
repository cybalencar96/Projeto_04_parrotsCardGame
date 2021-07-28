let qtdTotalCards = 0;

// --- gif array with duplicated gifs
let gifArr = ["bobrossparrot.gif","bobrossparrot.gif","explodyparrot.gif","explodyparrot.gif","fiestaparrot.gif","fiestaparrot.gif","metalparrot.gif","metalparrot.gif","revertitparrot.gif","revertitparrot.gif","tripletsparrot.gif","tripletsparrot.gif","unicornparrot.gif","unicornparrot.gif"];
starting();


function starting(){
    do {
        qtdTotalCards = Number(prompt("Digite a quantidade de cartas para jogar (apenas numeros inteiro e pares entre 4 e 14)"))
    } while (((qtdTotalCards % 2) !== 0 || qtdTotalCards < 4 || qtdTotalCards > 14) && qtdTotalCards !== -1);

    setGame();
}

function setGame(){
    // cut array to size the game and shuffle it
    partialGifArr = gifArr.slice(0,qtdTotalCards);
    partialGifArr = partialGifArr.sort(comparador);

    for (let i = 0; i < qtdTotalCards; i++) {
        const cards = document.querySelector('.cards');
        const card = document.querySelector('.card');
    
        // Need to create a new card div witch is a copy of the existing one (with all of its childs (arg true))
        const newCard = card.cloneNode(true);

        // set a random gif to newCard using src attribute
        newCard.querySelector('.back-face img').src = `/assets/${partialGifArr[i]}`;
        newCard.classList.add('new-card');

        // append new card div
        cards.appendChild(newCard);
        
        // hide model card
        if (i === qtdTotalCards - 1) {
            card.style.display = "none";
        }
    }    
}

function restart() {
    const newCards = document.querySelectorAll(".new-card");
    const cards = document.querySelector('.cards');
    const card = document.querySelector('.card');

    // remove all new Cards
    for (let i = 0; i < newCards.length; i++){
        cards.removeChild(newCards[i]);
    }

    card.style.display = "initial";

    // reseting global variables
    qtdTotalCards = 0;
    qtdSelectedCards = 0;
    counterPlays = 0;
    counterRights = 0;
    min=0;
    sec=0;
    centisec=0;

    // start new game
    starting();
}


function comparador() { 
	return Math.random() - 0.5; 
}