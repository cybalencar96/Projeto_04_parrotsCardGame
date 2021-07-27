let qtdSelectedCards = 0;
let backFace1;
let backFace2;
let frontFace1;
let frontFace2;
let gif1;
let gif2;
let counterPlays = 0;
let counterRights = 0;
let gameStarted = false;
let min=0;
let sec=0;
let centisec=0
let strSec="00";
let strMin="00";
let strCentisec="00"

const timer = document.querySelector('.timer');
setInterval(cronometer,10);

function selectCard(element) {
    gameStarted = true;
    const elementBack = element.querySelector('.back-face')

    qtdSelectedCards += 1;

    if (qtdSelectedCards === 1) {
        // garda a imagem e espera até selecionar outra
        frontFace1 = element.querySelector('.front-face');
        backFace1 = element.querySelector('.back-face');
        frontFace1.style.transform = 'rotateY(-180deg)';

        backFace1.style.transform = 'rotateY(0deg)';
        gif1 = backFace1.querySelector('img').getAttribute('src');      

    } else if (qtdSelectedCards === 2) {
        frontFace2 = element.querySelector('.front-face');
        backFace2 = element.querySelector('.back-face');
        frontFace2.style.transform = 'rotateY(-180deg)';
        backFace2.style.transform = 'rotateY(0deg)';
        gif2 = backFace2.querySelector('img').getAttribute('src');
        
        // verifica se deu match
        if (gif1 === gif2) {
            counterRights += 1;

            if (counterRights === (qtdTotalCards/2)) {
                const timeEnd = timer.innerHTML;
                gameStarted = false;;
                // Envia mensagem de vitória
                setTimeout(function(){
                    alert(`Você ganhou em ${counterPlays} rodada(s)! \n A melhor pontuação possível é ${qtdTotalCards/2} \n Tempo de jogo: ${timeEnd}`);

                    newGame = prompt('Deseja iniciar um novo jogo? s/n');
                    if (newGame === 's') {
                        starting();
                    } else {
                        //faz oq?
                    }

                },500,{
                    once:true
                });



            }

        } else {
            //  se não deu match, delay 1 seg e desvira as cartas
             setTimeout(function(){
                 backFace1.style.transform = 'rotateY(180deg)';
                 backFace2.style.transform = 'rotateY(180deg)';
                 frontFace1.style.transform = 'rotateY(0deg)';
                 frontFace2.style.transform = 'rotateY(0deg)';
             },1000)
        }
        counterPlays += 1;
        qtdSelectedCards = 0;
    }
}

function  cronometer() {
    
    
    if (gameStarted){
        if (centisec < 100) {
            centisec += 1;
        } else {
            if (sec < 60) {
                centisec = 0;
                sec += 1;
            } else {    
                sec = 0;
                min += 1;
                if (min === 60) {
                    min = 0;
                }
            }
        }

        strCentisec = ("00" + centisec).slice(-2);
        strSec = ("00" + sec).slice(-2);
        strMin = ("00" + min).slice(-2);
        
        timer.innerHTML = `${strMin}:${strSec}:${strCentisec}`
    } else {
        timer.innerHTML = `00:00:00`
    }
    

    
    
}
