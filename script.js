
let dealerSuma = 0;
let TuSuma = 0;

let dealerAs = 0;
let TuAs = 0; 

let escondido;
let Mazo;

let PuedeSacar = true;

window.onload = function() {
    armarMazo();
    BarajarMazo();
    Iniciar();
}

function armarMazo() {
    let Valor = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let Tipo = ["C", "D", "H", "S"];
    Mazo = [];

    for (let i = 0; i < Tipo.length; i++) {
        for (let j = 0; j < Valor.length; j++) {
            Mazo.push(Valor[j] + "-" + Tipo[i]); 
        }
    }
    // console.log(Mazo);
}

function BarajarMazo() {
    for (let i = 0; i < Mazo.length; i++) {
        let j = Math.floor(Math.random() * Mazo.length);
        let temp = Mazo[i];
        Mazo[i] = Mazo[j];
        Mazo[j] = temp;
    }
    //console.log(Mazo);
}

function Iniciar() {
    escondido = Mazo.pop();
    dealerSuma += DevolverValor(escondido);
    dealerAs += VerificarAs(escondido);
    //console.log(escondido);
    //console.log(dealerSuma);

    while (dealerSuma < 17) {
        let cartaImg = document.createElement("img");
        let carta = Mazo.pop();
        
        cartaImg.src = "./cartas/" + carta + ".png";
        dealerSuma += DevolverValor(carta);
        dealerAs += VerificarAs(carta);
        document.getElementById("dealer-cartas").append(cartaImg);
    }
    //console.log(dealerSuma);

    for (let i = 0; i < 2; i++) {
        let cartaImg = document.createElement("img");
        let carta = Mazo.pop();

        cartaImg.src = "./cartas/" + carta + ".png";
        TuSuma += DevolverValor(carta);
        TuAs += VerificarAs(carta);
        document.getElementById("Tus-Cartas").append(cartaImg);
    }

    //console.log(TuSuma);
    document.getElementById("dar").addEventListener("click", dar);
    document.getElementById("plantar").addEventListener("click", plantar);
    document.getElementById("Tu-suma").innerText = TuSuma;

}

function dar() {
    
    if (!PuedeSacar) {
        return;
    }

    let cartaImg = document.createElement("img");
    let carta = Mazo.pop();

    cartaImg.src = "./cartas/" + carta + ".png";
    TuSuma += DevolverValor(carta);
    TuAs += VerificarAs(carta);

    document.getElementById("Tus-Cartas").append(cartaImg);
    document.getElementById("Tu-suma").innerText = TuSuma;

    if (BajarAs(TuSuma, TuAs) >= 21) {
        PuedeSacar = false;
        plantar()
    }
}

function plantar() {
    dealerSuma = BajarAs(dealerSuma, dealerAs);
    TuSuma = BajarAs(TuSuma, TuAs);

    PuedeSacar = false;
    document.getElementById("escondido").src = "./cartas/" + escondido + ".png";

    let mensaje = "";
    if (TuSuma > 21) {
        mensaje = "Perdiste!";
    }
    else if (dealerSuma > 21) {
        mensaje = "Ganaste!";
    }

    else if (TuSuma == dealerSuma) {
        mensaje = "Empate!";
    }
    else if (TuSuma > dealerSuma) {
        mensaje = "Ganaste!";
    }
    else if (TuSuma < dealerSuma) {
        mensaje = "Perdiste!";
    }

    document.getElementById("dealer-suma").innerText = dealerSuma;
    document.getElementById("Tu-suma").innerText = TuSuma;
    document.getElementById("Resultado").innerText = mensaje;

    document.getElementById("reiniciar").style.display = "block";
}

function DevolverValor(carta) {
    let data = carta.split("-"); // "4-C" -> ["4", "C"]
    let valor = data[0];

    if (isNaN(valor)) { //A J Q K
        if (valor == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(valor);
}

function VerificarAs(carta) {
    if (carta[0] == "A") {
        return 1;
    }
    return 0;
}

function BajarAs(SumaJugador, AsDeJugador) {
    while (SumaJugador > 21 && AsDeJugador > 0) {
        SumaJugador -= 10;
        AsDeJugador -= 1;
    }
    return SumaJugador;
} 

function reiniciarJuego(){
    dealerSuma = 0;
    TuSuma = 0;
    dealerAs = 0;
    TuAs = 0;
    PuedeSacar = true;

    document.getElementById("dealer-cartas").innerHTML = '<img id="escondido" src="./cartas/BACK.png">';
    document.getElementById("Tus-Cartas").innerHTML = "";
    document.getElementById("dealer-suma").innerHTML = "";
    document.getElementById("Tu-suma").innerHTML = "";
    document.getElementById("Resultado").innerHTML = "";

    armarMazo();
    BarajarMazo();
    Iniciar();

    document.getElementById("reiniciar").style.display = "none";

}