const sarah = document.querySelector('.sarah');
const gover = document.querySelector('.gover')
const elemento = document.getElementById("cronometro");
const playgame = document.querySelector('[data-playgame]');
const gameover = document.querySelector('[data-gameover]');
const bush = document.querySelector('.bush');
const bush2 = document.querySelector('.bush2');
const obstaculo1 = document.querySelector('.obstaculo1');
const obstaculo = document.querySelector('.obstaculo'); 
const pgameover = document.querySelector('p');
const biblia = document.querySelector('.biblia');
const tempo = 50000;
let somJump=new Audio('audio/jump.ogg');
let somChoro=new Audio('audio/choro.ogg');
let somAtivo = true;
let restante = ((tempo/1000)+6);
let contando = restante
var endGame = false;
var endGameInterval;


//AO ABRIR A PAGINA O JOGO
function inicio () {
    gover.style.display = 'flex';
    playgame.classList.add('playgame');
    gameover.classList.add('gameover');
    obstaculo1.style.animationPlayState = 'paused';
    obstaculo.style.animationPlayState = 'paused';
    biblia.style.animationPlayState='paused';
};

//BOTÃO PARA INICIAR O JOGO
function play(){
    document.addEventListener('keydown',jump);
    somChoro.pause()

    obstaculo1.style.animation='none'
    void document.querySelector('.obstaculo1').offsetWidth;
    obstaculo1.style.animation=''
    obstaculo1.style.animationPlayState = 'running';   

    obstaculo.style.animation='none'
    void document.querySelector('.obstaculo').offsetLeft;
    obstaculo.style.animation=''
    obstaculo.style.animationPlayState = 'running';
     
    bush.style.animationPlayState = 'running';
    bush2.style.animationPlayState = 'running';   

    sarah.src = './imagens/sarah.gif'
    sarah.style.animation = 'none'; 
    sarah.style.bottom = '0px';
    
    sarah.style.animation='none';
    void document.querySelector('.sarah').offsetWidth 
    sarah.style.animation='';
    sarah.style.animationPlayState = 'running';

    gover.style.display = 'none';
    playgame.classList.remove('playgame');
    gameover.classList.remove('gameover');

    biblia.style.animation='none'
    void document.querySelector('.biblia').offsetLeft;
    biblia.style.animation=''
    biblia.style.animationPlayState = 'running'
    biblia.style.animationDelay = `${tempo}ms`;
    
    endGame = false;

    endGameInterval = setInterval(() => {    
        setInterval(() => {
         var obstaculo1Positon = (obstaculo.offsetLeft/window.innerWidth)*100;
         var obstaculoPositon = (obstaculo.offsetLeft/window.innerWidth)*100; 
         var bibliaPositon = (biblia.offsetLeft/window.innerWidth)*100;
          if(obstaculo1Positon <= -10  && obstaculoPositon <= -10 && bibliaPositon <= 52){
            obstaculo1.style.animation = 'none'; 
            obstaculo.style.animation = 'none';
        }
           
        }, 10);
    },`${tempo}ms`);

    const intervalo = setInterval(() => {
        let segundos = contando
        elemento.textContent = `Time: ${segundos}s`;
        contando -= 1;        
        if (contando < 0) {
          elemento.textContent=''  
          clearInterval(intervalo);
          contando=restante;
        }
        else if (endGame===true){
        elemento.textContent='';
        clearInterval(intervalo);
        contando=restante
        };
      }, 1000);
    
};
//Desativar audio
  botao.addEventListener("mousedown", function () {
    somAtivo = !somAtivo;
    somChoro.muted = !somAtivo;
    somJump.muted = !somAtivo;
    botao.textContent = somAtivo ? "🔈" : "🔇";
    botao.style.width = "2vw";
  });

//Pular os obstaculos
const  jump = () =>{
    somJump.play()
    somJump.currentTime=0
    let sarahPosition = +window.getComputedStyle(sarah).bottom.replace('px','');
    if(sarahPosition == 0 && endGame == false){
    sarah.classList.add('jump')
    sarah.src = "./imagens/sarahsalto.gif"

    setTimeout(() => {
        sarah.classList.remove('jump')    
        let sarahPosit = +window.getComputedStyle(sarah).bottom.replace('px','');
        if(sarahPosit == 0){
        sarah.src = "./imagens/sarah.gif"
        }       
    }, 700);
   }  
}

//VERIFICAR A CADA 10MS SE PERDEU
const loop = setInterval(() => {
    if(!endGame){
    const obstaculo1Position = (obstaculo1.offsetLeft/window.innerWidth)*100;
    const obstaculoPosition = (obstaculo.offsetLeft/window.innerWidth)*100;
    var sarahPosition = (+window.getComputedStyle(sarah).bottom.replace('px','')/window.innerHeight)*100;
    var bibliaPosition = (biblia.offsetLeft/window.innerWidth)*100;
    textoGameover = "GAME OVER"
    
     if(obstaculo1Position <= 10 && obstaculo1Position > 0  && sarahPosition <12 || obstaculoPosition <=10 && obstaculoPosition > 0 && sarahPosition <12)
        {
        document.removeEventListener('keydown',jump);
        somJump.pause();
        somChoro.play();
        somChoro.loop= true;
        somChoro.currentTime = 0;
        pgameover.textContent = textoGameover;
        bush.style.animationPlayState = 'paused';
        bush2.style.animationPlayState = 'paused'; 
        obstaculo.style.animationPlayState = 'paused';
        obstaculo1.style.animationPlayState = 'paused'; 
        
        sarah.src = "./imagens/sarahgameover.gif"
        sarah.style.animation = 'none'; 
        sarah.style.bottom = `${sarahPosition}vh`;    
        sarah.style.animationPlayState = 'paused';

        gover.style.display = 'flex';
        playgame.classList.add('playgame');
        gameover.classList.add('gameover');

        biblia.style.animationPlayState='paused';

        clearInterval(endGameInterval);
        endGame = true;
        }
        
        else if(bibliaPosition <= 30){
            textoTheEnd = "Jesus é o caminho, a verdade e a vida! \n Com Jesus a caminhada fica mais fácil!"
            pgameover.textContent=textoTheEnd;
            gover.style.display = 'flex';
            gover.style.whiteSpace = "pre-line";
            playgame.classList.add('playgame');
            gameover.classList.add('gameover');
        }
    }
    
}, 10)

document.addEventListener('keydown',jump);

inicio();