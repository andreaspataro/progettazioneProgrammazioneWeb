function creaPezzi(){
	/*funzione che crea i pezzi attraverso l'uso di array
	ad ogni numero corrisponde un colore*/
	try {
		pezzoT = [
			[ 	
				[0,1,0], 
				[1,1,1],
			], 
			[ 	
				[1,0], 
				[1,1],
				[1,0],
			], 
			[ 	
				[1,1,1], 
				[0,1,0],
			], 
			[ 	
				[0,1], 
				[1,1],
				[0,1],
			], 
		];

		pezzoO = [
			[
				[2,2],
				[2,2]
			],
			[
				[2,2],
				[2,2]
			],
			[
				[2,2],
				[2,2]
			],
			[
				[2,2],
				[2,2]
			]
		];
		pezzoS = [
			[ 	
				[0,3,3], 
				[3,3,0],
			], 
			[ 	
				[3,0], 
				[3,3],
				[0,3],
			], 
			[ 	
				[0,3,3], 
				[3,3,0],
			], 
			[ 	
				[3,0], 
				[3,3],
				[0,3],
			], 
		];
		pezzoZ = [
			[ 	
				[7,7,0], 
				[0,7,7],
			], 
			[ 	
				[0,7], 
				[7,7],
				[7,0],
			], 
			[ 	
				[7,7,0], 
				[0,7,7],
			], 
			[ 	
				[0,7], 
				[7,7],
				[7,0],
			], 
		];
		pezzoI = [
			[ 	
				[4], 
				[4],
				[4],
				[4]
			], 
			[ 	
				[4,4,4,4], 
			], 
			[ 	
				[4], 
				[4],
				[4],
				[4]
			], 
			[ 	
				[4,4,4,4], 
			], 
		];
		pezzoL = [
			[ 	
				[5,0],
				[5,0],
				[5,5]	
			], 
			[ 	
				[5,5,5],
				[5,0,0] 
			], 
			[ 	
				[5,5],
				[0,5],
				[0,5]
			], 
			[ 	
				[0,0,5],
				[5,5,5]  
			], 
		];
		pezzoJ = [
			[ 	
				[0,6],
				[0,6],
				[6,6]	
			], 
			[ 	
				[6,0,0],
				[6,6,6] 
			], 
			[ 	
				[6,6],
				[6,0],
				[6,0]
			], 
			[ 	
				[6,6,6],
				[0,0,6]  
			], 
		];
	} catch ( e ) {
		alert ("creaPezzi " + e);
	}	
}

function randomPick () {
	//funzione che seleziona randomicamente il pezzo da far scendere
	try {
		var i = Math.floor(Math.random() * pezzi.length);
		pezzoScelto = pezzi[i];
	} catch ( e ) {
		alert ("randomPick " + e);
	}	
}

function creaMatrice () {
	//funzione che crea la matrice del campo di gioco
	try {
		campoGioco = new Array(NUMERO_RIGHE);
		for (var i = 0; i < NUMERO_RIGHE; i++) { 
			var nodoRiga = document.createElement("tr"); 
			campoGioco[i] = new Array(NUMERO_COLONNE);
			nodoMatrice.appendChild(nodoRiga);
			for (var j = 0; j< NUMERO_COLONNE; j++) { 
				var nodoCella = document.createElement("td"); 
				campoGioco[i][j] = {nodo: nodoCella, pezzo: 0};  
				nodoRiga.appendChild(nodoCella);
			}
		}
		for (var i = 0; i < NUMERO_RIGHE; i++) {
			campoGioco[i][0].pezzo = COLORE_BORDO_INDEX; 
			campoGioco[i][0].nodo.className = "bordino";
			campoGioco[i][NUMERO_COLONNE-1].pezzo = COLORE_BORDO_INDEX;
			campoGioco[i][NUMERO_COLONNE-1].nodo.className = "bordino";
		}
		for (var i = 0; i < NUMERO_COLONNE; i++) {
			campoGioco[NUMERO_RIGHE-1][i].pezzo = COLORE_BORDO_INDEX;
			campoGioco[NUMERO_RIGHE-1][i].nodo.className = "bordino";
		}
	} catch ( e ) {
		alert ("creaMatrice " + e);
	}	
}

function disegnaPezzo(x, y, pezzo){
	//funzione che disegna il pezzo sul campo
	//alla funzione vanno passate la x e la y ovvero dove posizionare il pezzo e il tipo di pezzo
	try {
		for (var yy = 0; yy < pezzo.length; yy++) { 
			for (var xx = 0; xx < pezzo[yy].length; xx++) {  
				if (pezzo[yy][xx] != 0) {  
					campoGioco[y+yy][x+xx].nodo.style.backgroundColor = coloriPezzi[pezzo[yy][xx]];
				}
			}
		}
	} catch ( e ) {
		alert ("disegnaPezzo " + e);
	}	
}

function disegnaCampo  () {
	//funzione che disegna il campo di gioco
	try { 
		for (var i = 0; i < campoGioco.length; i++) { 
			for (var j = 0; j< campoGioco[i].length; j++) {
				var nodoCella = campoGioco[i][j].nodo;  
				nodoCella.style.backgroundColor = coloriPezzi[campoGioco[i][j].pezzo]; 
				nodoCella.className = "pezzo";
			}
		}
	} catch ( e ) {
		alert ("disegnaCampo " + e);
	}	
}

function gameLoop(){
	//funzione che tiene aggiornato il campo
	try {
		disegnaCampo(); 
		disegnaPezzo(pezzoPosX, pezzoPosY, pezzoScelto[rotazione]);
		speedTimeout--; 
		if(speedTimeout == 0){ 
			pezzoPosY += 1; 
			if (collisione(pezzoPosX, pezzoPosY, pezzoScelto[rotazione])) {
				posizionaPezzo(pezzoPosX, pezzoPosY-1);
				pezzoPosY = 0; 
				pezzoPosX = NUMERO_COLONNE / 2 - 1;
				while (eliminaRigaPiena()) {
					var score = Number(nodoScore.value) + 100;
					nodoScore.value = score;
					if(score % 1000 == 0) {
						levelUp();
					}
				}
				randomPick();
				if (collisione(pezzoPosX, pezzoPosY, pezzoScelto[rotazione])) {
					gameOver();
				} 
			}
			speedTimeout = speed; 
		}
	} catch ( e ) {
		alert ("gameLoop " + e);
	}	
}

function levelUp() {
	//aumento di velocità di discesa all'aumentare del livello
	try {
		speed -= 4;
		if (speed < 1) {
			speed = 1;
		}
	} catch ( e ) {
		alert ("levelUp " + e);
	}	
}

function eliminaRigaPiena() {
	//funzione che elimina la riga piena e ritorna un valore booleano
	try {
		for (var i = campoGioco.length-2; i>=0; i--) {
			if (controllaRiga(i)) {
				for (var j = i; j>0; j--) {
					for (var jx = 1; jx<NUMERO_COLONNE-1; jx++) {
						campoGioco[j][jx].pezzo = campoGioco[j-1][jx].pezzo;
					}
				}
				return true;
			}
		}
		return false;
	} catch ( e ) {
		alert ("eliminaRigaPiena " + e);
	}	
}

function posizionaPezzo(xx,yy) {
	//funzione che posiziona il pezzo all'interno del campo
	try {
		var p = pezzoScelto[rotazione];
		for (var y = 0; y < p.length; y++) { 
			for (var x = 0; x < p[y].length; x++) { 
				if (p[y][x] != 0) { 
					campoGioco[y+yy][x+xx].pezzo = p[y][x];
				}
			}
		}
	} catch ( e ) {
		alert ("posizionaPezzo " + e);
	}	
}

function gameOver() {
	//funzione di gameOver che ferma l'interval e quindi l'aggiornamento del campo
	try {
		clearInterval(timer);
		nodoGameOver.style.display = "block";
	} catch ( e ) {
		alert ("gameOver " + e);
	}	
}

function tastoPremuto(tasto) {
	//funzione che gestice i tasti premuti e agisce se non c'è stata collisione
	try{
		if (tasto.keyCode == 38) { // UP
			tasto.preventDefault();
			if (!collisione(pezzoPosX, pezzoPosY, pezzoScelto[(rotazione + 1) % 4])) {
				rotazione = (rotazione + 1) % 4;
			}
		}
		if (tasto.keyCode == 40) { // DOWN
			tasto.preventDefault();
			if (!collisione(pezzoPosX, pezzoPosY+1, pezzoScelto[rotazione])) {
				pezzoPosY += 1;
			}
		}
		if (tasto.keyCode == 37) { // LEFT
			if (!collisione(pezzoPosX-1, pezzoPosY, pezzoScelto[rotazione])) {
				pezzoPosX -= 1;
			}
			
		}
		if (tasto.keyCode == 39) { // RIGHT
			if (!collisione(pezzoPosX+1, pezzoPosY, pezzoScelto[rotazione])) {
				pezzoPosX += 1;
			}
		}
	} catch ( e ) {
		alert ("tastoPremuto " + e);
	}	
}

function collisione(x, y, pezzo) { 
	//funzione che controlla le collisioni
	try {
		for (var yy = 0; yy < pezzo.length; yy++) { 
			for (var xx = 0; xx < pezzo[yy].length; xx++) { 
				if (pezzo[yy][xx] != 0 && campoGioco[y+yy][x+xx].pezzo != 0) {
					return true;
				}
			}
		}
		return false;
	} catch ( e ) {
		alert ("collisione " + e);
	}	
}

function controllaRiga(y) {
	/*funzione che scorre e controlla la riga e restituisce un valore booleano
	true se trova tutte le cellette della riga occupate da pezzi, false se trova
	almeno una celletta non occupata*/
	try {
		for (var x = 1; x < NUMERO_COLONNE-1; x++) {
			if (campoGioco[y][x].pezzo == 0) {
				return false;
			}
		}
		return true;
	} catch ( e ) {
		alert ("controllaRiga " + e);
	}	
}

function gestoreButton() {
	//gestore del bottone riprova che appare al game over
	try {
		location.href = "gioco.html";
	} catch ( e ) {
		alert ("gestoreButton " + e);
	}	
}


function gestoreNavBar() {
	//gestore della barra di navigazione 
	try {
    	if (nodoNavBar.className === "navBar") {
      		nodoNavBar.className += " responsive";
    	} else {
      		nodoNavBar.className = "navBar";
    	}
  	} catch ( e ) {
    	alert("gestoreNavBar " + e);
  	}
}

const NUMERO_COLONNE = 12;
const NUMERO_RIGHE = 21;
const BASSO = "ArrowDown";
const ALTO = "ArrowUp";
const DESTRA = "ArrowRight";
const SINISTRA = "ArrowLeft";
const COLORE_SFONDO = "black";
const COLORE_PEZZO_T = "purple";
const COLORE_PEZZO_L = "orange";
const COLORE_PEZZO_J = "blue";
const COLORE_PEZZO_I = "lightblue";
const COLORE_PEZZO_Z = "green";
const COLORE_PEZZO_S = "red";
const COLORE_PEZZO_O = "yellow";
const COLORE_BORDO = "#202020";
const RITARDO = 60;
const COLORE_BORDO_INDEX = 8;

var nodoMatrice;
var nodoCanvas;
var nodoGameOver;
var nodoScore;
var nodoRestartButton;
var nodoContent;
var nodoNavBar;
var nodoHamburgerMenu;
var direzione;
var speed;
var pezzoT;
var pezzoL;
var pezzoJ;
var pezzoI;
var pezzoZ;
var pezzoS;
var pezzoO;
var finePartita;
var campoGioco;
var rotazione;
var coloriPezzi;
var pezzi;
var pezzoPosY;
var pezzoPosX;
var speedTimeout;
var pezzoScelto;
var timer;

function gestoreLoad() {
	try {
		nodoCanvas = document.getElementById("canvas");
		nodoMatrice = document.getElementById("matrice");
		nodoGameOver = document.getElementById("gameOver");
		nodoScore = document.getElementById("score");
		nodoRestartButton = document.getElementById("restartButton");
		nodoContent = document.getElementById("content");
		nodoHamburgerMenu = document.getElementById("hamburgerMenu");
    	nodoNavBar = document.getElementById("navBar");
		campoGioco = [];
		speed = 15; 
		rotazione = 0; 
		pezzoPosX = NUMERO_COLONNE / 2 - 1; 
		pezzoPosY = 0;
		speedTimeout = speed;
		coloriPezzi = [COLORE_SFONDO, COLORE_PEZZO_T, COLORE_PEZZO_L, COLORE_PEZZO_J,COLORE_PEZZO_I,COLORE_PEZZO_Z,COLORE_PEZZO_S,COLORE_PEZZO_O, COLORE_BORDO];
		document.onkeydown = tastoPremuto;
		creaMatrice();
		creaPezzi();
		pezzi = [pezzoL, pezzoO, pezzoT, pezzoZ, pezzoS, pezzoJ, pezzoI]; 
		randomPick();
		disegnaCampo ();
		timer = setInterval (gameLoop, 1000 / 15);
		nodoHamburgerMenu.onclick = gestoreNavBar;
		nodoRestartButton.onclick = gestoreButton;
	} catch ( e ) {
		alert ("gestoreLoad " + e);
	}
}

window.onload = gestoreLoad;