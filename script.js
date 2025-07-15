// Datos de los talleres
const talleresData = [
    {
        id: 1,
        titulo: "Macarons Básicos",
        descripcion: "Aprende a crear los deliciosos macarons franceses desde cero. Técnicas básicas, merengue italiano y rellenos clásicos.",
        precio: 8500,
        imagen: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        titulo: "Macarons Avanzados",
        descripcion: "Perfecciona tu técnica con macarons de sabores únicos, colores vibrantes y decoraciones especiales.",
        precio: 12000,
        imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        titulo: "Decoración",
        descripcion: "Técnicas profesionales de decoración para pasteles y postres. Flores de buttercream, escritura y más.",
        precio: 9500,
        imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        titulo: "Postres Sin Gluten",
        descripcion: "Deliciosos postres aptos para celíacos. Aprende técnicas y ingredientes alternativos sin sacrificar el sabor.",
        precio: 10500,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        titulo: "Chocolatería Artesanal",
        descripcion: "Desde bombones hasta trufas, descubre el arte de trabajar con chocolate de calidad premium.",
        precio: 11000,
        imagen: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
];

// Datos de la galería
const galeriaData = [
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
];

// Variables globales
let currentGaleriaSlide = 0;
let cart = [];
let currentPage = 1;
let itemsPerPage = 6; // PC: 6 items (3x2), tablets: 4 items (2x2), mobile: 2 items (1x2)
let sortOrder = 'desc'; // desc = mayor a menor, asc = menor a mayor
let talleresSorted = [...talleresData];

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

// Función para actualizar items por página según el tamaño de pantalla
function updateItemsPerPage() {
    if (window.innerWidth <= 480) {
        itemsPerPage = 2; // Móvil: 2 items (1x2)
    } else if (window.innerWidth <= 768) {
        itemsPerPage = 4; // Tablet: 4 items (2x2)
    } else {
        itemsPerPage = 6; // PC: 6 items (3x2)
    }
}

// Función para ordenar talleres
function sortTalleres() {
    talleresSorted = [...talleresData].sort((a, b) => {
        if (sortOrder === 'desc') {
            return b.precio - a.precio; // Mayor a menor
        } else {
            return a.precio - b.precio; // Menor a mayor
        }
    });
}

// Función para renderizar talleres
function renderTalleres() {
    const grid = document.getElementById('talleres-grid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = talleresSorted.slice(startIndex, endIndex);
    
    grid.innerHTML = pageItems.map(taller => `
        <div class="taller-card">
            <div class="card-header">
                <h3 class="card-title">${taller.titulo}</h3>
            </div>
            <div class="card-body">
                <div class="card-image">
                    <img src="${taller.imagen}" alt="${taller.titulo}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zNTAgMzAwTDQwMCAyNTBMNDUwIDMwMEw0NTAgMzUwTDM1MCAzNTBaIiBmaWxsPSIjREREIi8+CjxjaXJjbGUgY3g9IjM3NSIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiNEREQiLz4KPC9zdmc+'; this.style.backgroundColor='#f8f9fa';">
                </div>
                <div class="card-content">
                    <p class="card-description">${taller.descripcion}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-price">$${taller.precio.toLocaleString()}</div>
                <button class="btn-comprar" onclick="addToCart(${taller.id})">
                    Comprar
                </button>
            </div>
        </div>
    `).join('');
}

// Función para renderizar paginación
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(talleresSorted.length / itemsPerPage);
    
    let paginationHTML = '';
    
    // Botón anterior
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
    </button>`;
    
    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    
    // Botón siguiente
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
    </button>`;
    
    pagination.innerHTML = paginationHTML;
}

// Función para cambiar página
function changePage(page) {
    const totalPages = Math.ceil(talleresSorted.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderTalleres();
    renderPagination();
}

// Función para manejar el sorting
function handleSort() {
    sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    const sortBtn = document.getElementById('sort-btn');
    const icon = sortBtn.querySelector('i');
    
    // Actualizar icono
    if (sortOrder === 'desc') {
        icon.className = 'fas fa-sort-amount-down';
    } else {
        icon.className = 'fas fa-sort-amount-up';
    }
    
    // Reorganizar y renderizar
    sortTalleres();
    currentPage = 1; // Volver a la primera página
    renderTalleres();
    renderPagination();
}

// Inicializar talleres
function initializeTalleres() {
    updateItemsPerPage();
    sortTalleres();
    renderTalleres();
    renderPagination();
    
    // Event listener para el botón de sort
    document.getElementById('sort-btn').addEventListener('click', handleSort);
}

// Actualizar en resize
window.addEventListener('resize', () => {
    const oldItemsPerPage = itemsPerPage;
    updateItemsPerPage();
    
    if (oldItemsPerPage !== itemsPerPage) {
        currentPage = 1; // Reiniciar a la primera página
        renderTalleres();
        renderPagination();
    }
});
// Inicializar galería
function initializeGaleria() {
    const container = document.getElementById('galeria-container');
    
    galeriaData.forEach((imagen, index) => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.innerHTML = `<img src="${imagen}" alt="Galería ${index + 1}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zNTAgMzAwTDQwMCAyNTBMNDUwIDMwMEw0NTAgMzUwTDM1MCAzNTBaIiBmaWxsPSIjREREIi8+CjxjaXJjbGUgY3g9IjM3NSIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiNEREQiLz4KPC9zdmc+'; this.style.backgroundColor='#f8f9fa';">`;
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
        closeImageModal();
    });
    
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // Cerrar modales con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cartModal.classList.remove('active');
            closeImageModal();
            document.body.style.overflow = 'auto';
        }
    });
}

// Función para cerrar el modal de imagen con transición
function closeImageModal() {
    imageModal.style.opacity = '0';
    setTimeout(() => {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 300);
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
    modalImage.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zNTAgMzAwTDQwMCAyNTBMNDUwIDMwMEw0NTAgMzUwTDM1MCAzNTBaIiBmaWxsPSIjREREIi8+CjxjaXJjbGUgY3g9IjM3NSIgY3k9IjI3NSIgcj0iMTUiIGZpbGw9IiNEREQiLz4KPC9zdmc+';
        this.style.backgroundColor = '#f8f9fa';
    };
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Pequeño delay para que la transición se vea correctamente
    setTimeout(() => {
        imageModal.style.opacity = '1';
    }, 10);
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
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                // Calcular la posición del final de la sección anterior
                const targetRect = target.getBoundingClientRect();
                const targetTop = window.pageYOffset + targetRect.top;
                const navHeight = document.querySelector('.navbar').offsetHeight;
                
                // Scroll al final de la sección anterior (inicio de la sección actual menos la altura del nav)
                window.scrollTo({
                    top: targetTop - navHeight - 20, // 20px de espacio adicional
                    behavior: 'smooth'
                });
            }
        });
    });
});
