const images = [
    './img/imagen1.jpg',
    './img/imagen2.jpg',
    './img/imagen3.jpg',
    './img/imagen4.jpg'
];
let currentindex = 0;

const background = document.getElementById('background');

function changeBackground(){
    currentindex = (currentindex +1 )%images.length;
    background.style.backgroundImage = `url('${images[currentindex]}')`;
}

// cambiar de imagen cada 5 segundos
setInterval(changeBackground, 5000);

// Establecer la primera imagen al cargar
background.style.backgroundImage = `url('${images[0]}')`;