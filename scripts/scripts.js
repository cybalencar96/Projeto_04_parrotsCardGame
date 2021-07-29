
// card variables
let backFace1;
let backFace2;
let frontFace1;
let frontFace2;
let gif1;
let gif2;

// counters and controllers
let qtdTotalCards = 0;
let counterPlays = 0;
let counterRights = 0;
let qtdSelectedCards = 0;
let gameStarted = false;

// cronometer variables
let min=0;
let sec=0;
let centisec=0;
let strSec="00";
let strMin="00";
let strCentisec="00"
let intervalID;


// --- gif array with duplicated gifs
let gifArr = ["bobrossparrot.gif","bobrossparrot.gif","explodyparrot.gif","explodyparrot.gif","fiestaparrot.gif","fiestaparrot.gif","metalparrot.gif","metalparrot.gif","revertitparrot.gif","revertitparrot.gif","tripletsparrot.gif","tripletsparrot.gif","unicornparrot.gif","unicornparrot.gif"];
starting();

const timer = document.querySelector('.timer');


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
    idInterval = setInterval(cronometer,10);

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

function selectCard(element) {
    gameStarted = true;
    qtdSelectedCards += 1;

    // if its the first card selected
    if (qtdSelectedCards === 1) {
        // get front and back face of element selected
        frontFace1 = element.querySelector('.front-face');
        backFace1 = element.querySelector('.back-face');
        // rotate element
        frontFace1.style.transform = 'rotateY(-180deg)';
        backFace1.style.transform = 'rotateY(0deg)';
        // store gif string
        gif1 = backFace1.querySelector('img').getAttribute('src');      

    } 
    // if its the second card selected
    else if (qtdSelectedCards === 2) {
        // get front and back face of element selected
        frontFace2 = element.querySelector('.front-face');
        backFace2 = element.querySelector('.back-face');
        // rotate element
        frontFace2.style.transform = 'rotateY(-180deg)';
        backFace2.style.transform = 'rotateY(0deg)';
        // store gif string
        gif2 = backFace2.querySelector('img').getAttribute('src');
        
        // check if gifs match
        if (gif1 === gif2) {
            // if match, increment counter of right moves
            counterRights += 1;
            // verifies if game is over
            if (counterRights === (qtdTotalCards/2)) {
                // stop timer
                const timeEnd = timer.innerHTML;
                clearInterval(intervalID);

                setTimeout(function(){
                    // send victory message
                    alert(`Você ganhou em ${counterPlays} rodada(s)! \n A melhor pontuação possível é ${qtdTotalCards/2} \n Tempo de jogo: ${timeEnd}`);

                    // question to restart the game
                    newGame = prompt('Deseja iniciar um novo jogo? s/n');
                    if (newGame === 's') {restart();}
                },500,{ once:true });
            }
        } else {
            //  if not match, rotate cards back after 1 second (1000ms)
             setTimeout(function(){
                 backFace1.style.transform = 'rotateY(180deg)';
                 backFace2.style.transform = 'rotateY(180deg)';
                 frontFace1.style.transform = 'rotateY(0deg)';
                 frontFace2.style.transform = 'rotateY(0deg)';
             },1000)
        }
        // counting plays by each two cards selected
        counterPlays += 1;
        // reset variable of cards selecteds
        qtdSelectedCards = 0;
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
    gameStarted = false;


    // start new game
    starting();
}

function  cronometer() {
    if (gameStarted){
        if (centisec < 100) {centisec += 1;}
        if (sec < 60 && centisec === 100) {sec += 1;}
        if(min < 60 && sec === 60 && centisec === 100) {min += 1;}

        if (centisec === 100) {centisec = 0};
        if (sec === 60) {sec = 0};
        if (min === 60) {min = 0};

        // formating left zeros
        strCentisec = ("00" + centisec).slice(-2);
        strSec = ("00" + sec).slice(-2);
        strMin = ("00" + min).slice(-2);
        
        timer.innerHTML = `${strMin}:${strSec}:${strCentisec}`
    } else {
        // if game ended
        timer.innerHTML = `00:00:00`
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}