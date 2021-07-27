let qtdCards;
do {
    qtdCards = Number(prompt("Digite a quantidade de cartas para jogar (apenas numeros inteiro e pares entre 4 e 14)"))
} while (((qtdCards % 2) !== 0 || qtdCards < 4 || qtdCards > 14) && qtdCards !== -1)

function selectCard(element) {
    const frontFace = element.querySelector('.front-face');
    const backFace = element.querySelector('.back-face');


    frontFace.style.transform = 'rotateY(-180deg)';
    backFace.style.transform = 'rotateY(0deg)';


}