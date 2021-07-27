let qtdSelectedCards = 0;
let backFace1;
let backFace2;
let frontFace1;
let frontFace2;
let gif1;
let gif2;

function selectCard(element) {

    const elementBack = element.querySelector('.back-face')
    // verifies if last element is the same as the new one
    if (elementBack === backFace1 || elementBack === backFace2) {
        return;
    }
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

        qtdSelectedCards = 0;
    }
}
