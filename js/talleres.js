// =====================================
// SISTEMA DE AUTENTICACIÓN Y TALLERES
// =====================================

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('delicias_users')) || [];
        this.userPurchases = JSON.parse(localStorage.getItem('user_purchases')) || {};
        this.init();
    }

    init() {
        console.log('Iniciando AuthSystem...');
        // Verificar si hay una sesión activa
        const savedUser = localStorage.getItem('current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            console.log('Usuario existente encontrado:', this.currentUser.nombre);
            // Actualizar navbar después de que el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.updateNavbar();
                });
            } else {
                this.updateNavbar();
            }
        } else {
            console.log('No hay usuario logueado');
            // Asegurar que el navbar se actualice para mostrar botones de guest
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.updateNavbar();
                });
            } else {
                this.updateNavbar();
            }
        }
        this.setupAuthEvents();
        console.log('AuthSystem inicializado');
    }

    // Crear usuario demo para pruebas
    createDemoUser() {
        const demoUser = {
            id: 'demo_user_001',
            nombre: 'María',
            apellido: 'González',
            email: 'maria@demo.com',
            password: '123456',
            fechaRegistro: new Date().toISOString(),
            avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=E287A0&color=fff'
        };
        
        if (!this.users.find(u => u.email === demoUser.email)) {
            this.users.push(demoUser);
            localStorage.setItem('delicias_users', JSON.stringify(this.users));
            console.log('Usuario demo creado: maria@demo.com / 123456');
        }
    }

    register(userData) {
        const { nombre, apellido, email, password } = userData;
        
        // Validar que el email no exista
        if (this.users.find(u => u.email === email)) {
            throw new Error('Este email ya está registrado');
        }

        const newUser = {
            id: 'user_' + Date.now(),
            nombre,
            apellido,
            email,
            password, // En producción se debería hashear
            fechaRegistro: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${nombre}+${apellido}&background=E287A0&color=fff`
        };

        this.users.push(newUser);
        localStorage.setItem('delicias_users', JSON.stringify(this.users));
        
        // Hacer login automático después del registro
        this.currentUser = newUser;
        localStorage.setItem('current_user', JSON.stringify(newUser));
        this.updateNavbar();
        this.hideAuthModals();
        
        // Disparar evento personalizado para notificar el login
        const loginEvent = new CustomEvent('userLoggedIn', {
            detail: newUser
        });
        document.dispatchEvent(loginEvent);
        
        // Mostrar mensaje de bienvenida
        this.showWelcomeMessage();
        
        return newUser;
    }

    login(credentials) {
        const { email, password } = credentials;
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Email o contraseña incorrectos');
        }

        this.currentUser = user;
        localStorage.setItem('current_user', JSON.stringify(user));
        this.updateNavbar();
        this.hideAuthModals();
        
        // Disparar evento personalizado para notificar el login
        const loginEvent = new CustomEvent('userLoggedIn', {
            detail: user
        });
        document.dispatchEvent(loginEvent);
        
        // Mostrar mensaje de bienvenida
        this.showWelcomeMessage();
        
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('current_user');
        this.updateNavbar();
        
        // Ocultar carrito
        const carritoIcon = document.getElementById('carritoIcon');
        if (carritoIcon) {
            carritoIcon.style.display = 'none';
        }
        
        // Cerrar sidebar del carrito si está abierto
        const carritoSidebar = document.querySelector('.carrito-sidebar');
        if (carritoSidebar) {
            carritoSidebar.classList.remove('show');
        }
        
        // Los talleres se siguen mostrando sin necesidad de login
        console.log('Usuario deslogueado');
    }

    updateNavbar() {
        const header = document.querySelector('.header .container');
        if (!header) {
            console.error('No se encontró el header');
            return;
        }

        // Remover elementos de auth existentes
        const existingAuth = header.querySelector('.auth-container');
        if (existingAuth) existingAuth.remove();

        if (this.currentUser) {
            // Usuario logueado - mostrar menú de usuario
            const authContainer = document.createElement('div');
            authContainer.className = 'auth-container user-logged';
            authContainer.innerHTML = `
                <div class="user-menu">
                    <div class="user-info" onclick="toggleUserDropdown()">
                        <img src="${this.currentUser.avatar}" alt="Avatar" class="user-avatar">
                        <span class="user-name">${this.currentUser.nombre}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="user-dropdown" id="userDropdown">
                        <div class="dropdown-item" onclick="showUserPurchases()">
                            <i class="fas fa-video"></i>
                            <span>Mis Talleres</span>
                        </div>
                        <div class="dropdown-item" onclick="toggleCarrito()">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Carrito</span>
                            <span class="cart-count" id="cartCount">0</span>
                        </div>
                        <div class="dropdown-item logout" onclick="authSystem.logout()">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Cerrar Sesión</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Insertar antes del elemento header-right
            const headerRight = header.querySelector('.header-right');
            if (headerRight) {
                header.insertBefore(authContainer, headerRight);
            } else {
                header.appendChild(authContainer);
            }
            
            // Mostrar carrito si existe
            const carritoIcon = document.getElementById('carritoIcon');
            if (carritoIcon) {
                carritoIcon.style.display = 'flex';
            }
        } else {
            // Usuario no logueado - mostrar solo botón de iniciar sesión
            const authContainer = document.createElement('div');
            authContainer.className = 'auth-container guest';
            authContainer.innerHTML = `
                <button class="btn-login-main" onclick="mostrarModalLogin()">
                    <i class="fas fa-user"></i>
                    <span>Iniciar Sesión</span>
                </button>
            `;
            
            // Insertar antes del elemento header-right
            const headerRight = header.querySelector('.header-right');
            if (headerRight) {
                header.insertBefore(authContainer, headerRight);
            } else {
                header.appendChild(authContainer);
            }
            
            // Ocultar carrito
            const carritoIcon = document.getElementById('carritoIcon');
            if (carritoIcon) {
                carritoIcon.style.display = 'none';
            }
        }
        
        console.log('Navbar actualizado, usuario logueado:', !!this.currentUser);
    }

    showWelcomeMessage() {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-content">
                <i class="fas fa-check-circle"></i>
                <span>¡Bienvenida ${this.currentUser.nombre}!</span>
            </div>
        `;
        document.body.appendChild(welcomeMsg);
        
        setTimeout(() => {
            welcomeMsg.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            welcomeMsg.classList.remove('show');
            setTimeout(() => welcomeMsg.remove(), 300);
        }, 3000);
    }

    hideAuthModals() {
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        if (loginModal) loginModal.classList.remove('show');
        if (registerModal) registerModal.classList.remove('show');
    }

    setupAuthEvents() {
        // Crear usuario demo al cargar
        console.log('Configurando eventos de auth...');
        this.createDemoUser();
        console.log('Usuario demo verificado');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUserPurchases() {
        if (!this.currentUser) return [];
        return this.userPurchases[this.currentUser.id] || [];
    }

    addPurchase(tallerData, accessCode) {
        if (!this.currentUser) return;
        
        if (!this.userPurchases[this.currentUser.id]) {
            this.userPurchases[this.currentUser.id] = [];
        }
        
        const purchase = {
            id: 'purchase_' + Date.now(),
            tallerId: tallerData.id,
            tallerTitle: tallerData.titulo,
            accessCode: accessCode,
            purchaseDate: new Date().toISOString(),
            price: tallerData.precio
        };
        
        this.userPurchases[this.currentUser.id].push(purchase);
        localStorage.setItem('user_purchases', JSON.stringify(this.userPurchases));
    }
}

// =====================================
// GESTOR DE TALLERES
// =====================================

class TalleresManager {
    constructor() {
        this.talleres = [];
        this.modalTaller = null;
        this.modalConfirmacion = null;
        this.modalCodigos = null;
        this.sortOrder = 'desc'; // Por defecto precio descendente
        this.currentPage = 1;
        this.talleresPerPage = 6;
        this.init();
    }

    init() {
        console.log('Iniciando TalleresManager...');
        this.loadTalleres();
        this.createModals();
        this.setupEventListeners();
        
        // Asegurar que los talleres se muestren después de que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('DOM cargado, mostrando talleres...');
                setTimeout(() => {
                    this.mostrarTalleres();
                }, 500);
            });
        } else {
            console.log('DOM ya cargado, mostrando talleres inmediatamente...');
            setTimeout(() => {
                this.mostrarTalleres();
            }, 100);
        }
    }

    loadTalleres() {
        // Usar los datos de talleres de data.js
        console.log('Cargando talleres...');
        console.log('window.talleresData existe:', !!window.talleresData);
        
        this.talleres = window.talleresData || [];
        
        console.log('Talleres asignados:', this.talleres);
        console.log('Cantidad de talleres:', this.talleres.length);
        
        if (this.talleres.length === 0) {
            console.error('No se encontraron datos de talleres. Verificar que data.js esté cargado.');
            // Intentar cargar datos de ejemplo si no hay datos
            this.talleres = this.createSampleTalleres();
            console.log('Datos de ejemplo creados:', this.talleres.length);
        }
        
        console.log('Talleres cargados:', this.talleres.length);
        
        // Ordenar por precio descendente por defecto
        this.sortTalleresByPrice();
        
        // Agregar videos de prueba a algunos talleres
        this.agregarVideosPrueba();
        
        // Inicializar el botón de ordenar
        setTimeout(() => this.updateSortButton(), 100);
    }

    sortTalleresByPrice() {
        if (this.sortOrder === 'desc') {
            this.talleres.sort((a, b) => b.precio - a.precio);
        } else {
            this.talleres.sort((a, b) => a.precio - b.precio);
        }
        console.log('Talleres ordenados por precio:', this.sortOrder);
        // Resetear a la primera página cuando se ordena
        this.currentPage = 1;
    }

    // Método de renderizado que usa la paginación
    renderTalleres() {
        this.mostrarTalleres();
    }

    toggleSortOrder() {
        this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
        this.sortTalleresByPrice();
        this.mostrarTalleres();
        this.updateSortButton();
    }

    updateSortButton() {
        const sortBtn = document.getElementById('sortBtn');
        if (sortBtn) {
            const icon = sortBtn.querySelector('i');
            if (this.sortOrder === 'desc') {
                icon.className = 'fas fa-sort-amount-down';
            } else {
                icon.className = 'fas fa-sort-amount-up';
            }
        }
    }

    // Métodos de paginación
    getTotalPages() {
        return Math.ceil(this.talleres.length / this.talleresPerPage);
    }

    getCurrentPageTalleres() {
        const startIndex = (this.currentPage - 1) * this.talleresPerPage;
        const endIndex = startIndex + this.talleresPerPage;
        return this.talleres.slice(startIndex, endIndex);
    }

    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderTalleres();
            this.updatePagination();
            // Scroll suave hacia la sección de talleres
            document.getElementById('talleres').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    nextPage() {
        this.goToPage(this.currentPage + 1);
    }

    prevPage() {
        this.goToPage(this.currentPage - 1);
    }

    updatePagination() {
        const totalPages = this.getTotalPages();
        const paginationContainer = document.getElementById('talleres-pagination');
        
        if (!paginationContainer || totalPages <= 1) {
            if (paginationContainer) {
                paginationContainer.style.display = 'none';
            }
            return;
        }

        paginationContainer.style.display = 'flex';
        paginationContainer.innerHTML = '';

        // Botón anterior
        const prevBtn = document.createElement('button');
        prevBtn.className = `pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.onclick = () => this.prevPage();
        prevBtn.disabled = this.currentPage === 1;
        paginationContainer.appendChild(prevBtn);

        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => this.goToPage(i);
            paginationContainer.appendChild(pageBtn);
        }

        // Botón siguiente
        const nextBtn = document.createElement('button');
        nextBtn.className = `pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.onclick = () => this.nextPage();
        nextBtn.disabled = this.currentPage === totalPages;
        paginationContainer.appendChild(nextBtn);
    }

    createSampleTalleres() {
        return [
            {
                id: 1,
                titulo: "Cupcakes Gourmet",
                descripcion: "Aprende a crear cupcakes elegantes con técnicas profesionales de decoración y sabores únicos.",
                precio: 2500,
                imagen: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "2.5 horas",
                participantes: "Hasta 20 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Principiante",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Recetas en PDF descargables", 
                    "Lista de ingredientes y utensilios",
                    "Soporte por WhatsApp durante 7 días",
                    "Acceso de por vida al contenido"
                ]
            },
            {
                id: 2,
                titulo: "Macarons Franceses",
                descripcion: "Domina la técnica francesa para crear macarons perfectos con rellenos deliciosos.",
                precio: 3200,
                imagen: "https://images.unsplash.com/photo-1558312657-b2dead03d494?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "3 horas",
                participantes: "Hasta 15 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Intermedio",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Guía de troubleshooting para macarons",
                    "Plantillas de medidas exactas",
                    "Recetas de 5 rellenos diferentes",
                    "Soporte por WhatsApp durante 10 días"
                ]
            },
            {
                id: 3,
                titulo: "Tortas Temáticas",
                descripcion: "Crea tortas increíbles para celebraciones especiales con decoraciones profesionales.",
                precio: 4000,
                imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "4 horas",
                participantes: "Hasta 12 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Avanzado",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Plantillas y moldes digitales",
                    "Técnicas de fondant y buttercream",
                    "Guía de colorantes y saborizantes",
                    "Soporte por WhatsApp durante 15 días"
                ]
            },
            {
                id: 4,
                titulo: "Cookies Decoradas",
                descripcion: "Aprende las técnicas para decorar cookies con glasa real y diseños únicos.",
                precio: 1800,
                imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "2 horas",
                participantes: "Hasta 25 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Principiante",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Receta base de cookies",
                    "Técnicas de glasa real",
                    "Plantillas de diseños",
                    "Soporte por WhatsApp durante 5 días"
                ]
            },
            {
                id: 5,
                titulo: "Cheesecakes Sin Horno",
                descripcion: "Deliciosos cheesecakes fríos con diferentes sabores y presentaciones elegantes.",
                precio: 2200,
                imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "2.5 horas",
                participantes: "Hasta 18 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Principiante",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "5 recetas diferentes",
                    "Técnicas de decoración",
                    "Lista de ingredientes",
                    "Soporte por WhatsApp durante 7 días"
                ]
            },
            {
                id: 6,
                titulo: "Panes Artesanales",
                descripcion: "Aprende a hacer panes caseros con masa madre y técnicas tradicionales.",
                precio: 3500,
                imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "5 horas",
                participantes: "Hasta 10 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Intermedio",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Guía de masa madre",
                    "Técnicas de amasado",
                    "Recetas de 4 tipos de pan",
                    "Soporte por WhatsApp durante 14 días"
                ]
            },
            {
                id: 7,
                titulo: "Postres Sin Azúcar",
                descripcion: "Deliciosos postres saludables sin azúcar refinada, perfectos para dietas especiales.",
                precio: 2800,
                imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "3.5 horas",
                participantes: "Hasta 15 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Intermedio",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Guía de edulcorantes naturales",
                    "8 recetas de postres saludables",
                    "Técnicas de sustitución",
                    "Soporte por WhatsApp durante 10 días"
                ]
            },
            {
                id: 8,
                titulo: "Chocolatería Profesional",
                descripcion: "Técnicas avanzadas para trabajar con chocolate: templado, moldeado y decoración.",
                precio: 4500,
                imagen: "https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "6 horas",
                participantes: "Hasta 8 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Avanzado",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Técnicas de templado profesional",
                    "Moldeado y decoración",
                    "Recetas de bombones gourmet",
                    "Soporte por WhatsApp durante 21 días"
                ]
            },
            {
                id: 9,
                titulo: "Tartas Francesas",
                descripcion: "Elegantes tartas francesas con cremas clásicas y presentación profesional.",
                precio: 3800,
                imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "4.5 horas",
                participantes: "Hasta 12 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Avanzado",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Técnicas de hojaldre",
                    "Cremas clásicas francesas",
                    "Decoración profesional",
                    "Soporte por WhatsApp durante 15 días"
                ]
            },
            {
                id: 10,
                titulo: "Muffins y Cupcakes Básicos",
                descripcion: "Curso introductorio para aprender las bases de muffins y cupcakes perfectos.",
                precio: 1500,
                imagen: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                duracion: "1.5 horas",
                participantes: "Hasta 30 personas",
                fecha: "Acceso inmediato",
                modalidad: "Online",
                nivel: "Principiante",
                tipo: "online",
                tieneVideo: true,
                incluye: [
                    "Video HD completo del taller",
                    "Recetas básicas",
                    "Tips para esponjado perfecto",
                    "Decoración simple",
                    "Soporte por WhatsApp durante 3 días"
                ]
            }
        ];
    }

    agregarVideosPrueba() {
        // Videos de prueba para algunos talleres
        const videosPrueba = [
            'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
            'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            'https://www.w3schools.com/html/mov_bbb.mp4'
        ];

        // Agregar videos a los primeros 3 talleres para pruebas
        this.talleres.forEach((taller, index) => {
            if (index < 3) {
                taller.videoUrl = videosPrueba[index % videosPrueba.length];
                taller.tieneVideo = true;
            }
        });
    }

    mostrarTalleres() {
        const container = document.getElementById('talleres-container');
        if (!container) {
            console.error('No se encontró el contenedor talleres-container');
            return;
        }

        if (this.talleres.length === 0) {
            console.error('No hay talleres para mostrar');
            container.innerHTML = `
                <div class="no-talleres-message">
                    <h3>¡Próximamente nuevos talleres!</h3>
                    <p>Estamos preparando contenido increíble para ti.</p>
                </div>
            `;
            return;
        }

        console.log('Mostrando talleres - Página', this.currentPage, 'de', this.getTotalPages());
        
        try {
            // Obtener talleres de la página actual
            const currentPageTalleres = this.getCurrentPageTalleres();
            const talleresHTML = currentPageTalleres.map(taller => this.createTallerCard(taller)).join('');
            container.innerHTML = talleresHTML;
            
            // Actualizar paginación
            this.updatePagination();
            console.log('Talleres insertados en el DOM exitosamente');
        } catch (error) {
            console.error('Error al crear las cards de talleres:', error);
            container.innerHTML = `
                <div class="error-talleres-message">
                    <h3>Error al cargar talleres</h3>
                    <p>Por favor, recarga la página.</p>
                </div>
            `;
        }
    }

    createLoginRequiredMessage() {
        return `
            <div class="login-required-message">
                <div class="login-required-content">
                    <i class="fas fa-lock"></i>
                    <h3>Inicia Sesión para Ver los Talleres</h3>
                    <p>Para acceder a nuestros talleres online necesitas tener una cuenta.</p>
                    <div class="login-required-actions">
                        <button class="btn-auth btn-login" onclick="showLoginModal()">
                            <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </button>
                        <button class="btn-auth btn-register" onclick="showRegisterModal()">
                            <i class="fas fa-user-plus"></i> Crear Cuenta
                        </button>
                    </div>
                    <div class="demo-info">
                        <p><strong>Para probar:</strong> Email: maria@demo.com | Contraseña: 123456</p>
                    </div>
                </div>
            </div>
        `;
    }

    createTallerCard(taller) {
        return `
            <div class="taller-card" data-taller-id="${taller.id}">
                <div class="taller-image-container">
                    <img src="${taller.imagen}" alt="${taller.titulo}" class="taller-image">
                </div>
                <div class="taller-content">
                    <h3 class="taller-title">${taller.titulo}</h3>
                    <p class="taller-description">${taller.descripcion}</p>
                    <div class="taller-info">
                        <div class="taller-duration">
                            <i class="fas fa-clock"></i>
                            <span>${taller.duracion}</span>
                        </div>
                        <div class="taller-price">$${taller.precio}</div>
                    </div>
                    <button class="btn-comprar" onclick="mostrarModalCompra('${taller.id}')">
                        <i class="fas fa-shopping-cart"></i>
                        Comprar
                    </button>
                </div>
            </div>
        `;
    }

    // Función para mostrar modal de compra (nueva)
    mostrarModalCompra(tallerId) {
        console.log('=== mostrarModalCompra called with ID:', tallerId);
        
        // Convertir a número para la comparación
        const targetId = parseInt(tallerId);
        console.log('Target ID parsed:', targetId);
        
        const taller = this.talleres.find(t => t.id === targetId);
        if (!taller) {
            console.error('Taller not found with ID:', targetId);
            console.log('Available talleres:', this.talleres.map(t => ({id: t.id, nombre: t.nombre})));
            return;
        }
        
        console.log('Taller found:', taller);
        
        // Buscar el container del modal
        let modalContainer = document.getElementById('modalContainer');
        if (!modalContainer) {
            console.error('No se encontró el modalContainer');
            // Crear el container si no existe
            modalContainer = document.createElement('div');
            modalContainer.id = 'modalContainer';
            document.body.appendChild(modalContainer);
            console.log('modalContainer creado y agregado al body');
        }

        // Limpiar contenido previo
        modalContainer.innerHTML = '';

        const modalHTML = `
            <div id="tallerModal" class="auth-modal show">
                <div class="auth-modal-content">
                    <span class="auth-close">&times;</span>
                    <div class="taller-modal-content">
                        <img src="${taller.imagen}" alt="${taller.titulo || taller.nombre}" class="taller-modal-img">
                        <h3>${taller.titulo || taller.nombre}</h3>
                        <p class="taller-precio">$${taller.precio}</p>
                        <div class="taller-modal-descripcion">
                            <p><strong>Descripción:</strong></p>
                            <p>${taller.descripcion}</p>
                            <p><strong>Incluye:</strong></p>
                            <ul>
                                ${taller.incluye.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                            <p><strong>Duración:</strong> ${taller.duracion}</p>
                            <p><strong>Modalidad:</strong> ${taller.modalidad}</p>
                        </div>
                        <div class="taller-modal-actions">
                            <button class="btn-comprar-modal">
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalContainer.innerHTML = modalHTML;
        console.log('Modal HTML creado e insertado');

        // Agregar eventos
        const modal = document.getElementById('tallerModal');
        const closeBtn = modal.querySelector('.auth-close');
        const buyBtn = modal.querySelector('.btn-comprar-modal');
        
        if (closeBtn) {
            closeBtn.onclick = () => {
                console.log('Cerrando modal por click en X');
                modal.classList.remove('show');
                setTimeout(() => {
                    modalContainer.innerHTML = '';
                }, 300);
            };
        }

        if (buyBtn) {
            buyBtn.onclick = () => {
                console.log('Botón comprar clickeado');
                this.intentarCompra(taller);
            };
        }

        // Cerrar al hacer click fuera del modal
        modal.onclick = (e) => {
            if (e.target === modal) {
                console.log('Cerrando modal por click fuera');
                modal.classList.remove('show');
                setTimeout(() => {
                    modalContainer.innerHTML = '';
                }, 300);
            }
        };

        console.log('Modal mostrado y eventos agregados');
    }

    intentarCompra(taller) {
        // Verificar si el usuario está logueado solo al intentar comprar
        if (!window.authSystem.isLoggedIn()) {
            // Cerrar modal de taller y mostrar login
            const modal = document.getElementById('tallerModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.getElementById('modalContainer').innerHTML = '';
                }, 300);
            }
            this.mostrarModalLoginParaCompra(taller);
            return;
        }

        // Si está logueado, proceder con la compra directa
        this.procesarCompraDirecta(taller);
    }

    procesarCompraDirecta(taller) {
        // Simular procesamiento de compra
        const btnConfirmar = document.querySelector('.btn-comprar-modal');
        if (!btnConfirmar) return;
        
        const originalText = btnConfirmar.innerHTML;
        btnConfirmar.disabled = true;
        btnConfirmar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

        setTimeout(() => {
            this.confirmarCompra(taller);
            btnConfirmar.disabled = false;
            btnConfirmar.innerHTML = originalText;
        }, 2000);
    }

    confirmarCompra(taller) {
        // Generar código de acceso
        const accessCode = this.generateAccessCode();
        
        // Guardar compra en el perfil del usuario
        window.authSystem.addPurchase(taller, accessCode);
        
        // Cerrar modal de taller
        const modal = document.getElementById('tallerModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                document.getElementById('modalContainer').innerHTML = '';
            }, 300);
        }
        
        // Mostrar mensaje de éxito
        this.mostrarMensajeExito(taller, accessCode);
    }

    mostrarMensajeExito(taller, accessCode) {
        const successMessage = document.createElement('div');
        successMessage.className = 'purchase-success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>¡Compra exitosa!</h3>
                <p>Ya tienes acceso a <strong>${taller.titulo}</strong></p>
                <div class="success-actions">
                    <button class="btn-view-courses" onclick="showUserPurchases(); this.parentElement.parentElement.parentElement.remove();">
                        Ver Mis Talleres
                    </button>
                    <button class="btn-close-success" onclick="this.parentElement.parentElement.parentElement.remove();">
                        Continuar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100);
        
        // Auto-remove después de 8 segundos
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.classList.remove('show');
                setTimeout(() => successMessage.remove(), 300);
            }
        }, 8000);
    }

    mostrarModalLoginParaCompra(taller) {
        // Guardar taller para después del login
        window.tallerPendienteCompra = taller;
        
        // Mostrar mensaje personalizado y modal de login
        const loginMessage = document.createElement('div');
        loginMessage.className = 'login-for-purchase-message';
        loginMessage.innerHTML = `
            <div class="login-message-content">
                <i class="fas fa-info-circle"></i>
                <h3>Inicia sesión para comprar</h3>
                <p>Necesitas tener una cuenta para realizar la compra de <strong>${taller.titulo}</strong></p>
            </div>
        `;
        
        // Insertar mensaje antes del modal de login
        document.body.appendChild(loginMessage);
        
        // Mostrar modal de login
        showAuthModal();
        
        // Remover mensaje después de 3 segundos
        setTimeout(() => {
            if (loginMessage.parentNode) {
                loginMessage.remove();
            }
        }, 5000);
    }

    mostrarModalConfirmacion(taller) {
        this.modalTaller.classList.remove('show');
        
        this.modalConfirmacion.querySelector('.modal-confirmacion-body').innerHTML = `
            <div class="taller-selected">
                <h4>${taller.titulo}</h4>
                <p class="precio-selected">$${taller.precio}</p>
            </div>
            
            <div class="form-group">
                <label for="emailCompra">Email de confirmación:</label>
                <input type="email" id="emailCompra" value="${window.authSystem.getCurrentUser().email}" readonly>
            </div>
            
            <div class="payment-options">
                <h4><i class="fas fa-credit-card"></i> Método de Pago</h4>
                <div class="payment-method">
                    <input type="radio" id="mercadopago" name="payment" value="mercadopago" checked>
                    <label for="mercadopago">
                        <i class="fab fa-cc-visa"></i>
                        MercadoPago (Próximamente)
                    </label>
                </div>
                <div class="payment-demo">
                    <p><i class="fas fa-info-circle"></i> Esta es una compra de prueba. No se realizará cobro real.</p>
                </div>
            </div>
            
            <div class="email-info">
                <i class="fas fa-envelope"></i>
                <p>Recibirás el código de acceso en tu email registrado</p>
            </div>
        `;

        this.modalConfirmacion.querySelector('.btn-confirmar').onclick = () => this.procesarCompraDirecta(taller);
        this.modalConfirmacion.classList.add('show');
    }

    procesarCompraDirecta(taller) {
        const emailInput = document.getElementById('emailCompra');
        const email = emailInput.value;

        if (!email || !this.validateEmail(email)) {
            alert('Por favor, verifica tu email');
            return;
        }

        // Simular procesamiento
        const btnConfirmar = this.modalConfirmacion.querySelector('.btn-confirmar');
        btnConfirmar.disabled = true;
        btnConfirmar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

        setTimeout(() => {
            this.confirmarCompra(taller, email);
        }, 2000);
    }

    confirmarCompra(taller, email) {
        // Generar código de acceso
        const accessCode = this.generateAccessCode();
        
        // Guardar compra en el perfil del usuario
        window.authSystem.addPurchase(taller, accessCode);
        
        // Mostrar modal de éxito
        this.mostrarModalCodigos(taller, accessCode, email);
        
        this.modalConfirmacion.classList.remove('show');
    }

    mostrarModalCodigos(taller, accessCode, email) {
        this.modalCodigos.querySelector('.modal-codigos-body').innerHTML = `
            <div class="email-enviado">
                <i class="fas fa-envelope"></i>
                <h3>Email Enviado</h3>
                <p>Hemos enviado tu código de acceso a <span class="email-address">${email}</span></p>
            </div>
            
            <div class="codigos-lista">
                <h3><i class="fas fa-key"></i> Tu Código de Acceso</h3>
                <div class="codigo-item">
                    <div class="codigo-info">
                        <h4>${taller.titulo}</h4>
                        <div class="codigo-acceso">${accessCode}</div>
                    </div>
                    <button class="btn-copiar" onclick="copiarCodigo('${accessCode}')">
                        <i class="fas fa-copy"></i> Copiar
                    </button>
                </div>
            </div>
            
            <div class="instrucciones">
                <h4><i class="fas fa-info-circle"></i> ¿Cómo acceder?</h4>
                <ol>
                    <li>Ve a la página <a href="video-access.html" target="_blank">Acceso a Videos</a></li>
                    <li>Ingresa tu código de acceso</li>
                    <li>¡Disfruta tu taller!</li>
                </ol>
            </div>
            
            <div class="whatsapp-notif">
                <i class="fab fa-whatsapp"></i>
                <p>También te enviamos el código por WhatsApp</p>
            </div>
        `;

        this.modalCodigos.classList.add('show');
    }

    generateAccessCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    createModals() {
        // Modal Taller
        this.modalTaller = document.createElement('div');
        this.modalTaller.className = 'modal-taller';
        this.modalTaller.innerHTML = `
            <div class="modal-taller-content">
                <div class="modal-taller-header">
                    <img src="" alt="" class="modal-taller-image">
                    <button class="modal-close" onclick="cerrarModalTaller()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header-text">
                        <h2 class="modal-taller-title"></h2>
                        <p class="modal-taller-description"></p>
                    </div>
                </div>
                <div class="modal-taller-body">
                    <div class="modal-taller-info"></div>
                    <div class="modal-taller-incluye">
                        <h4><i class="fas fa-check-circle"></i> Este taller incluye</h4>
                        <div class="modal-incluye-grid"></div>
                    </div>
                </div>
                <div class="modal-taller-footer">
                    <div class="modal-precio">
                        <span class="modal-precio-label">Precio total:</span>
                        <span class="modal-precio-valor"></span>
                    </div>
                    <button class="btn-comprar-modal">
                        <i class="fas fa-credit-card"></i> Confirmar Compra
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modalTaller);

        // Modal Confirmación
        this.modalConfirmacion = document.createElement('div');
        this.modalConfirmacion.className = 'modal-confirmacion';
        this.modalConfirmacion.innerHTML = `
            <div class="modal-confirmacion-content">
                <div class="modal-confirmacion-header">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Confirmar Compra</h3>
                </div>
                <div class="modal-confirmacion-body"></div>
                <div class="modal-confirmacion-footer">
                    <button class="btn-cancelar" onclick="cerrarModalConfirmacion()">Cancelar</button>
                    <button class="btn-confirmar">Confirmar Compra</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modalConfirmacion);

        // Modal Códigos
        this.modalCodigos = document.createElement('div');
        this.modalCodigos.className = 'modal-codigos';
        this.modalCodigos.innerHTML = `
            <div class="modal-codigos-content">
                <div class="modal-codigos-header">
                    <i class="success-icon fas fa-check-circle"></i>
                    <h2>¡Compra Exitosa!</h2>
                    <p>Tu taller ha sido comprado exitosamente</p>
                </div>
                <div class="modal-codigos-body"></div>
                <div class="modal-codigos-footer">
                    <button class="btn-entendido" onclick="cerrarModalCodigos()">
                        ¡Entendido!
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modalCodigos);
    }

    setupEventListeners() {
        // Click fuera del modal para cerrar
        [this.modalTaller, this.modalConfirmacion, this.modalCodigos].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });
    }
}

// =====================================
// FUNCIONES GLOBALES
// =====================================

// Instancias globales
window.authSystem = new AuthSystem();
window.talleresManager = new TalleresManager();

// Funciones de autenticación
function showAuthModal() {
    const modal = document.getElementById('authModal') || createAuthModal();
    modal.classList.add('show');
}

function showLoginModal() {
    const modal = document.getElementById('loginModal') || createLoginModal();
    modal.classList.add('show');
}

function showRegisterModal() {
    const modal = document.getElementById('registerModal') || createRegisterModal();
    modal.classList.add('show');
}

function createAuthModal() {
    const modal = document.createElement('div');
    modal.id = 'authModal';
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <div class="auth-modal-header">
                <h2>Mi Cuenta</h2>
                <button class="modal-close" onclick="hideAuthModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="auth-modal-body">
                <div class="auth-options">
                    <div class="auth-option" onclick="switchToLoginFromAuth()">
                        <div class="auth-option-icon">
                            <i class="fas fa-sign-in-alt"></i>
                        </div>
                        <div class="auth-option-content">
                            <h3>Iniciar Sesión</h3>
                            <p>¿Ya tienes una cuenta? Ingresa aquí</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    
                    <div class="auth-option" onclick="switchToRegisterFromAuth()">
                        <div class="auth-option-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="auth-option-content">
                            <h3>Crear Cuenta</h3>
                            <p>¿Nuevo aquí? Regístrate gratis</p>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                
                <div class="auth-demo">
                    <div class="demo-separator">
                        <span>o prueba con una cuenta demo</span>
                    </div>
                    <div class="demo-credentials">
                        <p><strong>Usuario de prueba:</strong></p>
                        <p>📧 maria@demo.com</p>
                        <p>🔑 123456</p>
                        <button class="btn-demo" onclick="fillDemoAndLogin()">Probar Ahora</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function createLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <div class="auth-modal-header">
                <h2>Iniciar Sesión</h2>
                <button class="modal-close" onclick="hideLoginModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="auth-modal-body">
                <form id="loginForm" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label for="loginEmail">Email:</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Contraseña:</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit" class="btn-auth-submit">Iniciar Sesión</button>
                </form>
                <div class="auth-demo">
                    <p><strong>Usuario de prueba:</strong></p>
                    <p>Email: maria@demo.com</p>
                    <p>Contraseña: 123456</p>
                    <button class="btn-demo" onclick="fillDemoCredentials()">Usar Demo</button>
                </div>
                <div class="auth-switch">
                    <p>¿No tienes cuenta? <a href="#" onclick="switchToRegister()">Regístrate aquí</a></p>
                    <p><a href="#" onclick="backToAuthModal()">← Volver a opciones</a></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function createRegisterModal() {
    const modal = document.createElement('div');
    modal.id = 'registerModal';
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <div class="auth-modal-header">
                <h2>Crear Cuenta</h2>
                <button class="modal-close" onclick="hideRegisterModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="auth-modal-body">
                <form id="registerForm" onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label for="registerNombre">Nombre:</label>
                        <input type="text" id="registerNombre" required>
                    </div>
                    <div class="form-group">
                        <label for="registerApellido">Apellido:</label>
                        <input type="text" id="registerApellido" required>
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email:</label>
                        <input type="email" id="registerEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Contraseña:</label>
                        <input type="password" id="registerPassword" required>
                    </div>
                    <button type="submit" class="btn-auth-submit">Crear Cuenta</button>
                </form>
                <div class="auth-switch">
                    <p>¿Ya tienes cuenta? <a href="#" onclick="switchToLogin()">Inicia sesión aquí</a></p>
                    <p><a href="#" onclick="backToAuthModal()">← Volver a opciones</a></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Funciones de manejo de modales de auth
function hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function hideRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function switchToLoginFromAuth() {
    hideAuthModal();
    showLoginModal();
}

function switchToRegisterFromAuth() {
    hideAuthModal();
    showRegisterModal();
}

function fillDemoAndLogin() {
    hideAuthModal();
    try {
        window.authSystem.login({ email: 'maria@demo.com', password: '123456' });
        window.talleresManager.mostrarTalleres();
    } catch (error) {
        alert(error.message);
    }
}

function switchToRegister() {
    hideLoginModal();
    showRegisterModal();
}

function switchToLogin() {
    hideRegisterModal();
    showLoginModal();
}

function backToAuthModal() {
    hideLoginModal();
    hideRegisterModal();
    showAuthModal();
}

function fillDemoCredentials() {
    document.getElementById('loginEmail').value = 'maria@demo.com';
    document.getElementById('loginPassword').value = '123456';
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        window.authSystem.login({ email, password });
        window.talleresManager.mostrarTalleres();
    } catch (error) {
        alert(error.message);
    }
}

function handleRegister(event) {
    event.preventDefault();
    const nombre = document.getElementById('registerNombre').value;
    const apellido = document.getElementById('registerApellido').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        window.authSystem.register({ nombre, apellido, email, password });
        window.talleresManager.mostrarTalleres();
    } catch (error) {
        alert(error.message);
    }
}

// Funciones del menú de usuario
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

function showUserPurchases() {
    const purchases = window.authSystem.getUserPurchases();
    const modal = document.getElementById('userPurchasesModal') || createUserPurchasesModal();
    
    // Actualizar contenido del modal
    const modalBody = modal.querySelector('.user-purchases-body');
    
    if (purchases.length === 0) {
        modalBody.innerHTML = `
            <div class="no-purchases">
                <i class="fas fa-shopping-bag"></i>
                <h3>No tienes talleres comprados</h3>
                <p>¡Explora nuestros talleres y comienza a aprender!</p>
                <button class="btn-explore" onclick="hideUserPurchasesModal(); document.getElementById('talleres').scrollIntoView();">
                    Ver Talleres Disponibles
                </button>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="purchases-list">
                ${purchases.map(purchase => `
                    <div class="purchase-item">
                        <div class="purchase-info">
                            <h4>${purchase.tallerTitle}</h4>
                            <p class="purchase-date">Comprado el ${new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                            <p class="purchase-price">$${purchase.price}</p>
                        </div>
                        <div class="purchase-actions">
                            <div class="access-code">
                                <span class="code-label">Código:</span>
                                <span class="code-value">${purchase.accessCode}</span>
                                <button class="btn-copy-code" onclick="copiarCodigo('${purchase.accessCode}')">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <a href="video-access.html" target="_blank" class="btn-watch">
                                <i class="fas fa-play"></i> Ver Taller
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    modal.classList.add('show');
}

function createUserPurchasesModal() {
    const modal = document.createElement('div');
    modal.id = 'userPurchasesModal';
    modal.className = 'auth-modal user-purchases-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <div class="auth-modal-header">
                <h2>Mis Talleres Comprados</h2>
                <button class="modal-close" onclick="hideUserPurchasesModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="user-purchases-body">
                <!-- Contenido dinámico -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Click fuera del modal para cerrar
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    return modal;
}

function hideUserPurchasesModal() {
    const modal = document.getElementById('userPurchasesModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function toggleCarrito() {
    // Verificar si el usuario está logueado
    if (!window.authSystem.isLoggedIn()) {
        // Mostrar modal de login si no está logueado
        showLoginModal();
        return;
    }
    
    // Si está logueado, mostrar/ocultar carrito
    const carritoSidebar = document.querySelector('.carrito-sidebar');
    if (carritoSidebar) {
        carritoSidebar.classList.toggle('show');
    }
    console.log('Toggle carrito para usuario logueado');
}

// Funciones de modales de talleres
function mostrarModalCompra(tallerId) {
    window.talleresManager.mostrarModalCompra(tallerId);
}

function mostrarModalTaller(tallerId) {
    window.talleresManager.mostrarModalTaller(tallerId);
}

function cerrarModalTaller() {
    window.talleresManager.modalTaller.classList.remove('show');
}

function toggleSortOrder() {
    window.talleresManager.toggleSortOrder();
}

function cerrarModalConfirmacion() {
    window.talleresManager.modalConfirmacion.classList.remove('show');
}

function cerrarModalCodigos() {
    window.talleresManager.modalCodigos.classList.remove('show');
}

function copiarCodigo(codigo) {
    navigator.clipboard.writeText(codigo).then(() => {
        const btn = event.target.closest('.btn-copiar');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        btn.classList.add('copiado');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copiado');
        }, 2000);
    });
}

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu && !userMenu.contains(event.target)) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
});

// Función para mostrar modal de login
function mostrarModalLogin() {
    console.log('mostrarModalLogin called');
    const modal = document.getElementById('loginModal');
    if (modal) {
        // Solo agregar la clase show, el CSS maneja display, opacity y visibility
        modal.classList.add('show');
        console.log('Login modal shown');
    } else {
        console.error('Login modal not found');
    }
}

// Función para cerrar modal de login
function cerrarModalLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Función para rellenar credenciales demo
function fillDemoCredentials() {
    document.getElementById('loginEmail').value = 'maria@demo.com';
    document.getElementById('loginPassword').value = '123456';
    
    // Efecto visual para mostrar que se rellenó
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    emailInput.style.background = '#E8F5E8';
    passwordInput.style.background = '#E8F5E8';
    
    setTimeout(() => {
        emailInput.style.background = '';
        passwordInput.style.background = '';
    }, 1000);
}

// Event listeners para el modal de login
document.addEventListener('DOMContentLoaded', function() {
    // Modal de login
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        // Cerrar modal
        const closeBtn = loginModal.querySelector('.auth-close');
        if (closeBtn) {
            closeBtn.onclick = cerrarModalLogin;
        }

        // Cerrar al hacer click fuera
        loginModal.onclick = function(e) {
            if (e.target === loginModal) {
                cerrarModalLogin();
            }
        };

        // Tabs
        const tabBtns = loginModal.querySelectorAll('.auth-tab-btn');
        const forms = loginModal.querySelectorAll('.auth-form');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                
                // Update tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update forms
                forms.forEach(f => f.classList.remove('active'));
                document.getElementById(`${tab}Form`).classList.add('active');
            });
        });

        // Login form
        const loginSubmit = document.getElementById('loginSubmit');
        if (loginSubmit) {
            loginSubmit.addEventListener('click', () => {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const errorDiv = document.getElementById('loginError');

                if (!email || !password) {
                    errorDiv.textContent = 'Por favor completa todos los campos';
                    return;
                }

                if (window.authSystem.login(email, password)) {
                    cerrarModalLogin();
                    // Limpiar form
                    document.getElementById('loginEmail').value = '';
                    document.getElementById('loginPassword').value = '';
                    errorDiv.textContent = '';
                } else {
                    errorDiv.textContent = 'Email o contraseña incorrectos';
                }
            });
        }

        // Register form
        const registerSubmit = document.getElementById('registerSubmit');
        if (registerSubmit) {
            registerSubmit.addEventListener('click', () => {
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;
                const errorDiv = document.getElementById('registerError');

                if (!name || !email || !password || !confirmPassword) {
                    errorDiv.textContent = 'Por favor completa todos los campos';
                    return;
                }

                if (password !== confirmPassword) {
                    errorDiv.textContent = 'Las contraseñas no coinciden';
                    return;
                }

                if (window.authSystem.register(name, email, password)) {
                    cerrarModalLogin();
                    // Limpiar form
                    document.getElementById('registerName').value = '';
                    document.getElementById('registerEmail').value = '';
                    document.getElementById('registerPassword').value = '';
                    document.getElementById('registerConfirmPassword').value = '';
                    errorDiv.textContent = '';
                } else {
                    errorDiv.textContent = 'El email ya está registrado';
                }
            });
        }
    }
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARGADO ===');
    console.log('window.talleresData disponible:', !!window.talleresData);
    if (window.talleresData) {
        console.log('Cantidad de talleres en data:', window.talleresData.length);
    }
    
    // Los sistemas ya se inicializan al crear las instancias
    console.log('Sistema de talleres con autenticación inicializado');
    
    // Forzar la carga de talleres después de un breve delay
    setTimeout(() => {
        console.log('Verificando sistemas...');
        if (window.talleresManager) {
            console.log('TalleresManager existe, forzando mostrar talleres...');
            window.talleresManager.mostrarTalleres();
        } else {
            console.error('TalleresManager no existe');
        }
        
        if (window.authSystem) {
            console.log('AuthSystem existe, forzando actualización navbar...');
            window.authSystem.updateNavbar();
        } else {
            console.error('AuthSystem no existe');
        }
    }, 1000);
    
    // Agregar event listener al carrito del header
    const carritoIcon = document.getElementById('carritoIcon');
    if (carritoIcon) {
        carritoIcon.addEventListener('click', function() {
            toggleCarrito();
        });
        console.log('Event listener del carrito agregado');
    } else {
        console.error('carritoIcon no encontrado');
    }
    
    // Escuchar cuando un usuario se loguea para continuar compra pendiente
    document.addEventListener('userLoggedIn', function(event) {
        const user = event.detail;
        console.log('Usuario logueado:', user.nombre);
        
        // Si hay un taller pendiente de compra, continuarlo
        if (window.tallerPendienteCompra) {
            const taller = window.tallerPendienteCompra;
            window.tallerPendienteCompra = null; // Limpiar
            
            // Pequeño delay para mejor UX
            setTimeout(() => {
                hideAuthModal();
                hideLoginModal(); // Cerrar modal de login
                if (window.talleresManager) {
                    window.talleresManager.mostrarModalConfirmacion(taller);
                }
            }, 500);
        }
    });
});

// Función global para el botón de ordenar
function toggleSortOrder() {
    if (window.talleresManager) {
        window.talleresManager.toggleSortOrder();
    }
}
