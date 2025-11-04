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

// Adicione estas variáveis no início da seção da galeria
let startX = 0;
let endX = 0;

// Atualiza a função openModal
const openModal = (index) => {
    modal.style.display = "block";
    modalImg.src = itemsGaleria[index].querySelector("img").src;
    currentImageIndex = index;
    document.body.style.overflow = 'hidden'; // Impede rolagem do body
}

// Atualiza a função closeModal
const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = ''; // Restaura rolagem do body
}

const showPreviousImage = () => {
    currentImageIndex = (currentImageIndex - 1 + itemsGaleria.length) % itemsGaleria.length
    modalImg.src = itemsGaleria[currentImageIndex].querySelector("img").src
}

const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % itemsGaleria.length
    modalImg.src = itemsGaleria[currentImageIndex].querySelector("img").src
}

itemsGaleria.forEach((item, index) => {
    item.addEventListener("click", () => {
        openModal(index)
    })
});

// Adicione os eventos de touch para mobile
modal.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

modal.addEventListener('touchmove', (e) => {
    if (!startX) return;
    
    e.preventDefault(); // Previne rolagem da página
    endX = e.touches[0].clientX;
});

modal.addEventListener('touchend', () => {
    if (!startX || !endX) return;
    
    const diffX = startX - endX;
    const threshold = 50; // Mínimo de pixels para considerar como swipe
    
    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // Swipe para esquerda
            showNextImage();
        } else {
            // Swipe para direita
            showPreviousImage();
        }
    }
    
    startX = 0;
    endX = 0;
});

// Adicione evento de teclado para desktop
document.addEventListener('keydown', (e) => {
    if (modal.style.display === "block") {
        if (e.key === "ArrowLeft") {
            showPreviousImage();
        } else if (e.key === "ArrowRight") {
            showNextImage();
        } else if (e.key === "Escape") {
            closeModal();
        }
    }
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede propagação do clique
    closeModal();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede propagação do clique
    showPreviousImage();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede propagação do clique
    showNextImage();
});

// Atualiza o evento de clique fora do modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

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

// Função para rolagem suave
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 70; // Subtrai a altura do header
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Função de easing
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Atualizar o evento de clique dos links do menu
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Fecha o menu mobile imediatamente
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            body.classList.remove('no-rolagem');
        }

        // Inicia a rolagem suave após o menu fechar
        smoothScroll(href, 1000);
    });
});

// Otimizar o controle de scroll do header
let lastScrollTop = 0;
const scrollThreshold = 5;
let ticking = false;

function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Não faz nada se o menu mobile estiver aberto
    if (nav.classList.contains('active')) return;

    // Verifica se passou do threshold
    if (Math.abs(currentScrollTop - lastScrollTop) < scrollThreshold) return;

    // Controla a visibilidade do header
    if (currentScrollTop > lastScrollTop && currentScrollTop > 70) {
        // Rolando para baixo
        header.classList.add('hide');
    } else {
        // Rolando para cima
        header.classList.remove('hide');
    }

    lastScrollTop = currentScrollTop;
    ticking = false;
}

// Otimizar o evento de scroll com requestAnimationFrame
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
        });
        ticking = true;
    }
});

