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

// Função para contar itens iniciais
function countInitialItems() {
    // Faz uma requisição para cada página HTML
    fetch('historinhas.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const storiesCount = doc.querySelectorAll('.card').length;
            localStorage.setItem('storiesCount', storiesCount);
        });

    fetch('ebooks.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const ebookCount = doc.querySelectorAll('.ebook-item').length;
            localStorage.setItem('ebookCount', ebookCount);
        });

    fetch('artigos.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const articleCount = doc.querySelectorAll('.article-item').length;
            localStorage.setItem('articleCount', articleCount);
        })
        .finally(() => {
            updateCounters(); // Atualiza os contadores após todas as contagens
        });
}

// Função para atualizar todos os contadores
function updateCounters() {
    // E-books
    const ebookCounterElement = document.querySelector('.produto a[href="ebooks.html"] p');
    const ebookCount = localStorage.getItem('ebookCount') || 0;
    if (ebookCounterElement) {
        ebookCounterElement.innerHTML = `<span style="color: white;">${ebookCount}</span> E-book${ebookCount === '1' ? '' : 's'}`;
    }

    // Artigos
    const articleCounterElement = document.querySelector('.produto a[href="artigos.html"] p');
    const articleCount = localStorage.getItem('articleCount') || 0;
    if (articleCounterElement) {
        articleCounterElement.innerHTML = `<span style="color: white;">${articleCount}</span> Artigo${articleCount === '1' ? '' : 's'} Científico${articleCount === '1' ? '' : 's'}`;
    }

    // Historinhas
    const storiesCounterElement = document.querySelector('.produto a[href="historinhas.html"] p');
    const storiesCount = localStorage.getItem('storiesCount') || 0;
    if (storiesCounterElement) {
        storiesCounterElement.innerHTML = `<span style="color: white;">${storiesCount}</span> Historinha${storiesCount === '1' ? '' : 's'}`;
    }
}

// Executa a contagem inicial quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    countInitialItems();
});

// Atualiza quando a página for recarregada ou houver mudanças no localStorage
window.addEventListener('storage', updateCounters);

