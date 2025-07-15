// Datos de los talleres
const talleresData = [
    {
        id: 1,
        titulo: "Macarons Básicos",
        descripcion: "Aprende a crear los deliciosos macarons franceses desde cero. Técnicas básicas, merengue italiano y rellenos clásicos.",
        precio: 8500,
        imagen: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        titulo: "Macarons Avanzados",
        descripcion: "Perfecciona tu técnica con macarons de sabores únicos, colores vibrantes y decoraciones especiales.",
        precio: 12000,
        imagen: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        titulo: "Decoración",
        descripcion: "Técnicas profesionales de decoración para pasteles y postres. Flores de buttercream, escritura y más.",
        precio: 9500,
        imagen: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        titulo: "Postres Sin Gluten",
        descripcion: "Deliciosos postres aptos para celíacos. Aprende técnicas y ingredientes alternativos sin sacrificar el sabor.",
        precio: 10500,
        imagen: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        titulo: "Chocolatería Artesanal",
        descripcion: "Desde bombones hasta trufas, descubre el arte de trabajar con chocolate de calidad premium.",
        precio: 11000,
        imagen: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];

// Datos de la galería
const galeriaData = [
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
];

// Variables globales
let currentSlide = 0;
let currentGaleriaSlide = 0;
let cart = [];

// Elementos del DOM
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeTalleres();
    initializeGaleria();
    initializeEventListeners();
    updateCartDisplay();
    
    // Smooth scrolling para los enlaces del nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Inicializar talleres
function initializeTalleres() {
    const container = document.getElementById('talleres-container');
    
    talleresData.forEach(taller => {
        const card = createTallerCard(taller);
        container.appendChild(card);
    });
    
    // Inicializar slider
    initializeTalleresSlider();
}

// Crear card de taller
function createTallerCard(taller) {
    const card = document.createElement('div');
    card.className = 'taller-card';
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${taller.titulo}</h3>
        </div>
        <div class="card-body">
            <div class="card-image">
                <img src="${taller.imagen}" alt="${taller.titulo}">
            </div>
            <div class="card-content">
                <p class="card-description">${taller.descripcion}</p>
                <div class="card-footer">
                    <span class="card-price">$${taller.precio.toLocaleString()}</span>
                    <button class="btn-comprar" onclick="addToCart(${taller.id})">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Inicializar slider de talleres
function initializeTalleresSlider() {
    const container = document.getElementById('talleres-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let visibleCards = window.innerWidth > 768 ? 3 : 1;
    let maxSlide = Math.max(0, talleresData.length - visibleCards);
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSliderPosition();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateSliderPosition();
        }
    });
    
    function updateSliderPosition() {
        if (window.innerWidth > 768) {
            const cardWidth = 370; // width + gap
            const offset = currentSlide * cardWidth;
            container.style.transform = `translateX(-${offset}px)`;
        } else {
            const cardWidth = window.innerWidth - 40; // full width minus padding
            const offset = currentSlide * cardWidth;
            container.style.transform = `translateX(-${offset}px)`;
        }
        
        // Actualizar estado de los botones
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === maxSlide ? '0.5' : '1';
    }
    
    // Responsive updates
    window.addEventListener('resize', () => {
        visibleCards = window.innerWidth > 768 ? 3 : 1;
        maxSlide = Math.max(0, talleresData.length - visibleCards);
        currentSlide = Math.min(currentSlide, maxSlide);
        updateSliderPosition();
    });
    
    // Inicializar posición
    updateSliderPosition();
}

// Inicializar galería
function initializeGaleria() {
    const container = document.getElementById('galeria-container');
    
    galeriaData.forEach((imagen, index) => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.innerHTML = `<img src="${imagen}" alt="Galería ${index + 1}">`;
        item.addEventListener('click', () => openImageModal(imagen));
        container.appendChild(item);
    });
    
    // Inicializar slider de galería
    initializeGaleriaSlider();
}

// Inicializar slider de galería
function initializeGaleriaSlider() {
    const container = document.getElementById('galeria-container');
    const prevBtn = document.getElementById('galeria-prev');
    const nextBtn = document.getElementById('galeria-next');
    
    function getVisibleItems() {
        if (window.innerWidth <= 480) {
            return 3; // 3 imágenes visibles en móviles
        } else if (window.innerWidth <= 768) {
            return 2; // 2 imágenes visibles en tablets
        } else {
            return 4; // 4 imágenes visibles en desktop
        }
    }
    
    function getItemWidth() {
        if (window.innerWidth <= 480) {
            return (window.innerWidth - 30) / 3; // 3 imágenes por fila con padding
        } else if (window.innerWidth <= 768) {
            return (window.innerWidth - 40) / 2; // 2 imágenes por fila con padding
        } else {
            return 320; // width fijo para desktop
        }
    }
    
    function updateMaxSlide() {
        const visibleItems = getVisibleItems();
        return Math.max(0, galeriaData.length - visibleItems);
    }
    
    let maxSlide = updateMaxSlide();
    
    prevBtn.addEventListener('click', () => {
        if (currentGaleriaSlide > 0) {
            currentGaleriaSlide--;
            updateGaleriaPosition();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentGaleriaSlide < maxSlide) {
            currentGaleriaSlide++;
            updateGaleriaPosition();
        }
    });
    
    function updateGaleriaPosition() {
        const itemWidth = getItemWidth();
        const gap = window.innerWidth <= 480 ? 5 : (window.innerWidth <= 768 ? 10 : 15);
        const offset = currentGaleriaSlide * (itemWidth + gap);
        container.style.transform = `translateX(-${offset}px)`;
        
        // Actualizar estado de los botones
        prevBtn.style.opacity = currentGaleriaSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentGaleriaSlide === maxSlide ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentGaleriaSlide === 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = currentGaleriaSlide === maxSlide ? 'none' : 'auto';
    }
    
    // Responsive updates
    window.addEventListener('resize', () => {
        maxSlide = updateMaxSlide();
        currentGaleriaSlide = Math.min(currentGaleriaSlide, maxSlide);
        updateGaleriaPosition();
    });
    
    // Inicializar posición
    updateGaleriaPosition();
}

// Inicializar event listeners
function initializeEventListeners() {
    // Menú hamburguesa
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Carrito
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar modal al hacer click fuera
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Modal de imagen
    closeModal.addEventListener('click', () => {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar modales con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cartModal.classList.remove('active');
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Agregar al carrito
function addToCart(tallerId) {
    const taller = talleresData.find(t => t.id === tallerId);
    if (taller) {
        // Verificar si el item ya está en el carrito
        const existingItem = cart.find(item => item.id === tallerId);
        
        if (existingItem) {
            // Si ya existe, incrementar cantidad
            existingItem.quantity += 1;
        } else {
            // Si no existe, agregar nuevo item
            cart.push({
                id: taller.id,
                titulo: taller.titulo,
                precio: taller.precio,
                imagen: taller.imagen,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        showNotification('Taller agregado al carrito');
    }
}

// Actualizar display del carrito
function updateCartDisplay() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Actualizar items del carrito
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Tu carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.titulo}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.titulo}</div>
                    <div class="cart-item-price">$${item.precio.toLocaleString()} x ${item.quantity}</div>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #e91e63; cursor: pointer; font-size: 1.2rem;">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

// Remover del carrito
function removeFromCart(tallerId) {
    cart = cart.filter(item => item.id !== tallerId);
    updateCartDisplay();
    showNotification('Taller eliminado del carrito');
}

// Abrir modal de imagen
function openImageModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #e91e63 0%, #ff6b9d 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 4px 20px rgba(233, 30, 99, 0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Touch/swipe support para mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - siguiente slide
            document.getElementById('next-btn').click();
        } else {
            // Swipe right - slide anterior
            document.getElementById('prev-btn').click();
        }
    }
}

// Agregar eventos touch a los sliders
document.addEventListener('DOMContentLoaded', function() {
    const talleresSlider = document.querySelector('.talleres-slider');
    const galeriaSlider = document.querySelector('.galeria-slider');
    
    if (talleresSlider) {
        talleresSlider.addEventListener('touchstart', handleTouchStart, false);
        talleresSlider.addEventListener('touchend', handleTouchEnd, false);
    }
    
    if (galeriaSlider) {
        galeriaSlider.addEventListener('touchstart', handleTouchStart, false);
        galeriaSlider.addEventListener('touchend', handleTouchEnd, false);
    }
});

// Preload de imágenes para mejor performance
document.addEventListener('DOMContentLoaded', function() {
    const images = [...talleresData.map(t => t.imagen), ...galeriaData];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
