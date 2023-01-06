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

var nodoNavBar;
var nodoHamburgerMenu;

function gestoreLoad() {
  try {
    nodoHamburgerMenu = document.getElementById("hamburgerMenu");
    nodoNavBar = document.getElementById("navBar");
    nodoHamburgerMenu.onclick = gestoreNavBar;
  } catch ( e ) {
    alert("gestoreLoad " + e);
  }
}

window.onload = gestoreLoad;
