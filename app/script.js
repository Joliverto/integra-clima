// Menu Hamburguer
const hamburguer = document.querySelector('#burguer');
const nav = document.querySelector(".nav");

hamburguer.addEventListener("click", () => nav.classList.toggle("active"));

// Galeria de Fotos

const modal = document.getElementById("modal")
const modalImg = document.getElementById("modal-img")
const itemsGaleria = document.querySelectorAll(".item-galeria")
const closeBtn = document.getElementsByClassName("close")[0];
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")

let currentImageIndex

const openModal = (index) => {
    modal.style.display = "block"
    modalImg.src = itemsGaleria[index].querySelector("img").src
    currentImageIndex = index
}

itemsGaleria.forEach((item, index) => {
    item.addEventListener("click", () => {
        openModal(index)
    })
});

const closeModal = () => {
    modal.style.display = "none"
}
closeBtn.onclick = closeModal

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal()
    }
}

const showPreviousImage = () => {
    currentImageIndex = (currentImageIndex - 1 + itemsGaleria.length) % itemsGaleria.length
    modalImg.src = itemsGaleria[currentImageIndex].querySelector("img").src
}

const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % itemsGaleria.length
    modalImg.src = itemsGaleria[currentImageIndex].querySelector("img").src
}

prevBtn.addEventListener("click", showPreviousImage)
nextBtn.addEventListener("click", showNextImage)
