let qtdSelectedCards = 0;
let backFace1;
let backFace2;
let frontFace1;
let frontFace2;
let gif1;
let gif2;
let counterPlays = 0;
let counterRights = 0;

function selectCard(element) {

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
                setTimeout(function(){
                    alert(`Você ganhou em ${counterPlays} rodada(s)! \n A melhor pontuação possível é ${qtdTotalCards/2}`);
                },500);
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
