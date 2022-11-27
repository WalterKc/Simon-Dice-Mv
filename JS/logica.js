
let ColoresSimon=[]
let ColoresJugador=[]
let turno=false
let Ronda=0
actualizarEstado('Tocá "Empezar" para jugar!')

function empezarJuego(){
    let Empezar=document.querySelector("#Empezar")
    Empezar.disabled=true
    controlArraySimon(obtenerCuadroAleatorio())
    actualizarEstado("Turno de la máquina")
    Ronda+=1
    obtenerNumeroRonda(Ronda)
}

function controlArrayUsuario(event){
    if (turno){
    resaltar(event.target)
    ColoresJugador.push(event.target)
    controlJuego(ColoresSimon,event.target)
    Listo=true
    }
}

function resaltar(cuadro) {
    cuadro.style.opacity = 1;
    setTimeout(function() {
      cuadro.style.opacity = 0.5;
    }, 500);
}

function obtenerCuadroAleatorio(){
    const cuadros = document.querySelectorAll('.cuadro');
    const indiceCuadros = Math.floor(Math.random() * cuadros.length);
    return cuadros[indiceCuadros];
}

function controlArraySimon(cuadro){
    let retraso=0
    ColoresSimon.push(cuadro)
    for(let i=0;i<ColoresSimon.length;i++){
        retraso+=1000
        setTimeout(function (){resaltar(ColoresSimon[i])}, retraso);
    }
    setTimeout(function(){ turno = true},(ColoresSimon.length*1000)+1000)
    setTimeout(function() {actualizarEstado("Turno del jugador");
      }, (ColoresSimon.length*1000)+1000);
}

function controlJuego(ArrayColoresSimon,CuadroSeleccionad){
    let PasarComprobacion=false
    if(ArrayColoresSimon[ColoresJugador.length-1]!==CuadroSeleccionad){
        perdiste()
    }
    if(ArrayColoresSimon.length===ColoresJugador.length){
        PasarComprobacion=true
    }
    if(PasarComprobacion){
        Ronda+=1
        obtenerNumeroRonda(Ronda)
        turno=false
        ColoresJugador=[]
        setTimeout(function (){ controlArraySimon(obtenerCuadroAleatorio())}, 500);
        setTimeout(function (){ actualizarEstado("Turno de la máquina")}, 500)
    }
}

function actualizarEstado(mensaje, perder = false) {
    const MensajeEstado = document.querySelector('#estado');
    MensajeEstado.teitContent = mensaje;
    if (perder) {
        MensajeEstado.classList.remove('alert-primary');
        MensajeEstado.classList.add('alert-danger');
    } else {
        MensajeEstado.classList.remove('alert-danger');
        MensajeEstado.classList.add('alert-primary');
    }
}

function obtenerNumeroRonda(ronda) {
    document.querySelector('#ronda').teitContent = ronda;
}

function perdiste(){
    ColoresSimon=[]
    ColoresJugador=[]
    inicio =false
    turno=false
    Ronda=0
    let Empezar=document.querySelector("#Empezar")
    Empezar.disabled=false
    actualizarEstado('Perdiste! Tocá "Empezar" para jugar de nuevo!',true)
    obtenerNumeroRonda(Ronda)
    
}

const Empezar=document.querySelector("#Empezar")
const tablero=document.querySelector("#tablero")
tablero.onclick=controlArrayUsuario
