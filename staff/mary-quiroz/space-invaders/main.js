var ship = document.getElementById('ship');
var contador = 0;

ship.style.left = 0 + 'vw';


document.onkeydown = function (event) {
    if (event.key === 'ArrowLeft'){
        contador = contador - 1;      
    } 
    else if (event.key === 'ArrowRight') {
        contador = contador + 1;      
    }
    

        ship.style.left = contador + 'vw';

   var rect = ship.getBoundingClientRect
}
