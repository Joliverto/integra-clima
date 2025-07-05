const hamburguer = document.querySelector('#burguer');
const nav = document.querySelector(".nav");

hamburguer.addEventListener("click", () => nav.classList.toggle("active"));