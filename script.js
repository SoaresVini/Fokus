//Contexto
const  html = document.querySelector('html')
const  focuBt = document.querySelector('.app__card-button--foco');
const  curtoBt = document.querySelector('.app__card-button--curto');
const  longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const  title = document.querySelector('.app__title');

//musica
const  musicaFocuInput = document.querySelector('#alternar-musica');
const  music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true;

//Temporizador
const  startPauseBt = document.querySelector('#start-pause');
let tempoDecorricoEmSegundos = 5;
let intervaloId = null;

//Contexto
function alterarContexto(button, value) {
    button.addEventListener('click', () => {
        html.setAttribute('data-contexto', value );
        banner.setAttribute('src', `/imagens/${value}.png`)
        switch (value) {
            case 'foco':
                title.innerHTML = 'Otimize sua produtividade,<br>\n' +
                    '<strong class="app__title-strong">mergulhe no que importa.</strong>'
                break;
            case 'descanso-curto':
                title.innerHTML = 'Que tal dar uma respirada?<br>\n' +
                    '<strong class="app__title-strong">Faça uma pausa curta!</strong>'
                break;
            case 'descanso-longo':
                title.innerHTML = 'Hora de voltar à superfície.<br>\n' +
                    '<strong class="app__title-strong">Faça uma pausa longa.</strong>'
                break;
        }
    });

    button.addEventListener('focus', () => {
        button.classList.add('active')
    })

    button.addEventListener('blur', () => {
        button.classList.remove('active')
    })
}

alterarContexto(focuBt,'foco', 'foco.png' );
alterarContexto(curtoBt,'descanso-curto');
alterarContexto(longoBt,'descanso-longo');

//Musica
musicaFocuInput.addEventListener('change', () => {
    if(music.paused) {
        music.play();
    }else {
        music.pause();
    }
})

//Temporizador


const  contagemRegressiva = () => {
    inicar();
    tempoDecorricoEmSegundos -= 1;
    console.log(tempoDecorricoEmSegundos)
}

startPauseBt.addEventListener('click', contagemRegressiva)

function inicar() {
    intervaloId = setInterval(contagemRegressiva, 1000)
}