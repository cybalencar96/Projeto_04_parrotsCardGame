// card variables
let backFace1;
let backFace2;
let frontFace1;
let frontFace2;
let gif1;
let gif2;
let lastElementId2;

// counters and controllers
let playerName;
let qtdTotalCards = 0;
let counterPlays = 0;
let counterRights = 0;
let qtdSelectedCards = 0;
let gameStarted = false;
let selectedCards = [];

// cronometer variables
let min=0;
let sec=0;
let centisec=0;
let strSec="00";
let strMin="00";
let strCentisec="00"
let idInterval;


// --- gif array with duplicated gifs
let gifArr = ["bobrossparrot.gif","bobrossparrot.gif","explodyparrot.gif","explodyparrot.gif","fiestaparrot.gif","fiestaparrot.gif","metalparrot.gif","metalparrot.gif","revertitparrot.gif","revertitparrot.gif","tripletsparrot.gif","tripletsparrot.gif","unicornparrot.gif","unicornparrot.gif"];
starting();

const timer = document.querySelector('.timer');


function starting(){
    do {
        playerName = prompt("Digite seu nome");
        qtdTotalCards = Number(prompt("Digite a quantidade de cartas para jogar (apenas numeros inteiro e pares entre 4 e 14)"));
    } while (((qtdTotalCards % 2) !== 0 || qtdTotalCards < 4 || qtdTotalCards > 14) && qtdTotalCards !== -1);

    setRanking("", "",qtdTotalCards,'load');
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
        newCard.setAttribute('id',i)

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
        elementId1 = Number(element.getAttribute('id'));

        //if this condition is true, the id doens't exist on array of flipped cards. Only if so, execute flip code
        if (selectedCards.indexOf(elementId1) === -1) {
            frontFace1 = element.querySelector('.front-face');
            backFace1 = element.querySelector('.back-face');

            frontFace1.style.transform = 'rotateY(-180deg)';
            backFace1.style.transform = 'rotateY(0deg)';

            // stores id in array of flipped cards
            selectedCards.push(elementId1);
            gif1 = backFace1.querySelector('img').getAttribute('src');
        } else {
            qtdSelectedCards--;
        }
    }
    // if its the second card selected
    else if (qtdSelectedCards === 2) {
        elementId2 = Number(element.getAttribute('id'));

        //if this condition is true, the id doens't exist on array of flipped cards. Only if so, execute flip code
        if (selectedCards.indexOf(elementId2) === -1) {
            frontFace2 = element.querySelector('.front-face');
            backFace2 = element.querySelector('.back-face');

            frontFace2.style.transform = 'rotateY(-180deg)';
            backFace2.style.transform = 'rotateY(0deg)';

            gif2 = backFace2.querySelector('img').getAttribute('src');
            // stores id in array of flipped cards
            selectedCards.push(elementId2);
            counterPlays++;
            // check if gifs match, preventing from clicking the same card
            if (gif1 === gif2) {
                // reset variable of cards selecteds
                qtdSelectedCards = 0;
                // if match, increment counter of right moves
                counterRights += 1;
                // verifies if game is over
                if (counterRights === (qtdTotalCards/2)) { gameOver(); }

            } 
            else {
                //  if not match, rotate cards back after 1 second (1000ms)
                setTimeout(function(){
                    backFace1.style.transform = 'rotateY(180deg)';
                    backFace2.style.transform = 'rotateY(180deg)';
                    frontFace1.style.transform = 'rotateY(0deg)';
                    frontFace2.style.transform = 'rotateY(0deg)';

                    //remove from array of flipped cards. Preventing bug os multiple clicks on same cards
                    let indexElementId1 = selectedCards.indexOf(elementId1);
                    selectedCards.splice(indexElementId1,1);
                    let indexElementId2 = selectedCards.indexOf(elementId2);
                    selectedCards.splice(indexElementId2,1);

                    // reset variable of cards selecteds
                    qtdSelectedCards = 0;
                },1000);

            }
        } else {
            qtdSelectedCards--;
        }


    }
}

function gameOver() {

    let timeEnd = timer.innerHTML;

    // stop timer
    clearInterval(idInterval);
    // saving ranking results
    setRanking(playerName,timeEnd, qtdTotalCards,'save');
    
    // send victory message
    setTimeout(function(){
        alert(`Você ganhou em ${counterPlays} rodada(s)! \n A melhor pontuação possível é ${qtdTotalCards/2} \n Tempo de jogo: ${timeEnd}`);
        setRanking("", "",qtdTotalCards,'load');

        // question to restart the game
        newGame = prompt('Deseja iniciar um novo jogo? s/n');
        if (newGame === 's') {restart();}
    },500,{ 
        once:true 
    });

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
    selectedCards = [];
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
function setRanking(playerName = "",timeFinish = "", qtdCardsPlay,operation) {
    let gameRanks = [
        {},{},{},{},
        {
            //using index 4 to represent game with 4 cards
            names: ["","","","","","","","","","",],
            times:["0","0","0","0","0","0","0","0","0","0"]
        },{},
        {
            //using index 6 to represent game with 6 cards
            names: ["","","","","","","","","","",],
            times:["0","0","0","0","0","0","0","0","0","0"]
        },{},
        {
            //using index 8 to represent game with 8 cards
            names: ["","","","","","","","","","",],
            times:["0","0","0","0","0","0","0","0","0","0"]
        },{},
        {
            //using index 10 to represent game with 10 cards
            names: ["","","","","","","","","","",],
            times:["0","0","0","0","0","0","0","0","0","0"]
        },{},
        {
            //using index 12 to represent game with 12 cards
            names: ["","","","","","","","","","",],
            times:["0","0","0","0","0","0","0","0","0","0"]
        },{},
        {
            //using index 14 to represent game with 14 cards
            names: ["","","","","","","","","","",],
            times:["0","0","0","0","0","0","0","0","0","0"]
        }

    ]

    let timeEndPure = Number(timeFinish.replaceAll(":",""));

    if (operation === 'save') {
        if (localStorage.gameRanks !== undefined){
            gameRanks = JSON.parse(localStorage.gameRanks);
        }
        const arrLen = gameRanks[qtdCardsPlay].names.length

        // percorre array para inserir valores de vitoria (nome e tempo)
        for (let i = 0; i < 10; i++){

            let timeVal = Number(gameRanks[qtdCardsPlay].times[i].replaceAll(":",""));

            if (timeVal === 0) { timeVal = 1000000; }

            if (timeEndPure < timeVal) {
                // função splice inserindo valores ordenadamente em array sem excluir valores
                gameRanks[qtdCardsPlay].times.splice(i,0,timeFinish);
                gameRanks[qtdCardsPlay].names.splice(i,0,playerName);
                break;
            }
        }

        gameRanks[qtdCardsPlay].names = gameRanks[qtdCardsPlay].names.slice(0,10);
        gameRanks[qtdCardsPlay].times = gameRanks[qtdCardsPlay].times.slice(0,10);

        localStorage.setItem('gameRanks',JSON.stringify(gameRanks));

    }
    else if (operation === 'load') {
        const titleTop10 = document.querySelector('.title-top10');
        titleTop10.innerHTML = `Ranking Top 10 (${qtdCardsPlay} cards game)`;

        if (localStorage.gameRanks !== undefined){
            gameRanks = JSON.parse(localStorage.gameRanks);
            const ranking = document.querySelector('.ranking');
            ranking.innerHTML = "";
            for(let i = 0; i < 10; i++) {
                ranking.innerHTML +=    `<li class="ranked">
                                            <div>
                                                <div class="name">${i+1}º - ${gameRanks[qtdCardsPlay].names[i]}</div>
                                                <div class="time-to-win">${gameRanks[qtdCardsPlay].times[i]}</div>
                                            </div>
                                        </li>` ;
            }
        }

    }
    else {
        return (console.log('error - operation undefined'))
    }
}

function comparador() {
	return Math.random() - 0.5;
}

// localStorage.clear();
