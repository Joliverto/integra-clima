// Menu Hamburguer
const hamburguer = document.querySelector('#burguer');
const nav = document.querySelector(".nav");
const menuLinks = document.querySelectorAll('.menu-link')
const body = document.body

hamburguer.addEventListener("click", () => {
    nav.classList.toggle("active")
    body.classList.toggle("no-rolagem")
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.toggle('active')
            body.classList.toggle('no-rolagem')
        }
    })
})

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

// Função para atualizar todos os contadores
function updateCounters() {
    // E-books
    const ebookCounterElement = document.querySelector('.produto a[href="ebooks.html"] p span');
    const ebookCount = localStorage.getItem('ebookCount') || 0;
    if (ebookCounterElement) {
        ebookCounterElement.innerHTML = `<span style="color: white;">${ebookCount}`;
    }

    // Artigos
    const articleCounterElement = document.querySelector('.produto a[href="artigos.html"] p span');
    const articleCount = localStorage.getItem('articleCount') || 0;
    if (articleCounterElement) {
        articleCounterElement.innerHTML = `<span style="color: white;">${articleCount}`;
    }

}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', updateCounters);

// Atualiza quando a página for recarregada
window.addEventListener('storage', updateCounters);

