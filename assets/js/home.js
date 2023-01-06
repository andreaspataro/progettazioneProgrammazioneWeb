function slideShow() {
  //funzione per le immagini in scorrimento automatico nella home
  try {
  	var i;
   	for (i = 0; i < nodoImmagini.length; i++) {
      	nodoImmagini[i].style.display = "none";  
    	}
    	index++;
    	if (index > nodoImmagini.length) {
    		index = 1;
    	}    
    	nodoImmagini[index-1].style.display = "block";  
    	setTimeout(slideShow, 3000); 
  } catch ( e ) {
    alert("slideShow " + e);
  }
}	

function gestoreButton() {
  //gestore del bottone "gioca ora"
  try {
    location.href = "gioco.html";
  } catch ( e ) {
    alert("gestoreButton " + e);
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


var index;
var nodoButtonGioca;
var nodoImmagini;
var nodoNavBar;
var nodoHamburgerMenu;

function gestoreLoad() {
  try {
    nodoButtonGioca = document.getElementById("button");
    nodoImmagini = document.getElementsByClassName("images");
    nodoHamburgerMenu = document.getElementById("hamburgerMenu");
    nodoNavBar = document.getElementById("navBar");
    nodoHamburgerMenu.onclick = gestoreNavBar;
    index = 0;
    nodoButtonGioca.onclick = gestoreButton;
	  slideShow();
  } catch ( e ) {
    alert("gestoreLoad " + e);
  }
}

window.onload = gestoreLoad;

