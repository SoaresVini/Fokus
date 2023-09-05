//Variaveis

//de Contexto
const  html = document.querySelector('html')
const  focuBt = document.querySelector('.app__card-button--foco');
const  curtoBt = document.querySelector('.app__card-button--curto');
const  longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const  title = document.querySelector('.app__title');

//de musica
const  musicaFocuInput = document.querySelector('#alternar-musica');
const  music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true;

//de Temporizador
const  startPauseBt = document.querySelector('#start-pause');
let tempoDecorricoEmSegundos = 1500;
let intervaloId = null;
const playAudio = new Audio('/sons/play.wav')
const pauseAudio = new Audio('/sons/pause.mp3')
const finalTemp = new Audio('sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imgBt = document.querySelector('#start-pause img')
const timer = document.querySelector('#timer')

//Functions
//de Contexto
function alterarContexto(button, value) {
    button.addEventListener('click', () => {
        html.setAttribute('data-contexto', value );
        banner.setAttribute('src', `/imagens/${value}.png`)
        switch (value) {
            case 'foco':
                tempoDecorricoEmSegundos = 1500;
                mostrarTimer();
                title.innerHTML = 'Otimize sua produtividade,<br>\n' +
                    '<strong class="app__title-strong">mergulhe no que importa.</strong>'
                break;
            case 'descanso-curto':
                tempoDecorricoEmSegundos = 300;
                mostrarTimer();
                title.innerHTML = 'Que tal dar uma respirada?<br>\n' +
                    '<strong class="app__title-strong">Faça uma pausa curta!</strong>'
                break;
            case 'descanso-longo':
                tempoDecorricoEmSegundos = 900;
                mostrarTimer();
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

//de Musica
musicaFocuInput.addEventListener('change', () => {
    if(music.paused) {
        music.play();
    }else {
        music.pause();
    }
})

//de Temporizador

const  contagemRegressiva = () => {
    if (tempoDecorricoEmSegundos <= 0) {
        //finalTemp.play();
        alert("Acabou maninho");
        zerar();
        return
    }
    tempoDecorricoEmSegundos -= 1;
    mostrarTimer();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId){
        pauseAudio.play();
        zerar()
        return
    }
    playAudio.play();
    iniciarOuPausarBt.textContent = "Pausar"
    imgBt.src = '/imagens/pause.png'
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    iniciarOuPausarBt.textContent = "Começar"
    imgBt.src = '/imagens/play_arrow.png'
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTimer() {
    const tempo = new Date(tempoDecorricoEmSegundos * 1000);
    const formaterTimer = tempo.toLocaleTimeString('pt-BR',{minute: '2-digit', second: '2-digit'});

    timer.innerHTML = `${formaterTimer}`
}
mostrarTimer();