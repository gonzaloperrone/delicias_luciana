// Funcionalidades principales del sitio
class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.configurarNavegacion();
        this.configurarScrollSuave();
        this.configurarAnimacionesScroll();
        this.configurarHeader();
        this.configurarLazyLoading();
        this.configurarHamburgerMenu();
    }

    configurarNavegacion() {
        // Navegación suave a secciones
        const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight + 20; // Extra padding
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    configurarScrollSuave() {
        // Mejorar el scroll en navegadores que lo soporten
        if ('scrollBehavior' in document.documentElement.style) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    configurarAnimacionesScroll() {
        // Animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos para animación
        const animateElements = document.querySelectorAll('.section-title, .sobre-mi-content');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Agregar estilos de animación
        this.agregarEstilosAnimacion();
    }

    configurarHeader() {
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Agregar/quitar clase para header con sombra
            if (currentScrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Header siempre visible - comentado el comportamiento de ocultar
            // if (currentScrollY > lastScrollY && currentScrollY > 100) {
            //     header.style.transform = 'translateY(-100%)';
            // } else {
            //     header.style.transform = 'translateY(0)';
            // }
        });

        // Agregar estilos para el header con scroll
        this.agregarEstilosHeader();
    }

    configurarLazyLoading() {
        // Lazy loading para imágenes
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    agregarEstilosAnimacion() {
        if (document.querySelector('#animation-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'animation-styles';
        styles.textContent = `
            .section-title, .sobre-mi-content {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .section-title.animate-in, .sobre-mi-content.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .sobre-mi-content.animate-in .sobre-mi-image {
                animation: slideInLeft 0.8s ease 0.2s both;
            }
            
            .sobre-mi-content.animate-in .sobre-mi-text {
                animation: slideInRight 0.8s ease 0.4s both;
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }

    agregarEstilosHeader() {
        if (document.querySelector('#header-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'header-styles';
        styles.textContent = `
            .header {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .header.header-scrolled {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
            }
        `;
        document.head.appendChild(styles);
    }

    // Método para mostrar loading
    mostrarLoading() {
        const loading = document.createElement('div');
        loading.id = 'loading';
        loading.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Cargando...</p>
            </div>
        `;
        
        document.body.appendChild(loading);
        this.agregarEstilosLoading();
    }

    ocultarLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.remove();
        }
    }

    agregarEstilosLoading() {
        if (document.querySelector('#loading-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'loading-styles';
        styles.textContent = `
            #loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            
            .loading-spinner {
                text-align: center;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--light-pink);
                border-top: 4px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styles);
    }

    // Método para manejar errores de carga de imágenes
    manejarErrorImagen(img) {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        img.alt = 'Imagen no disponible';
    }

    configurarHamburgerMenu() {
        const navToggle = document.getElementById('navToggle');
        const nav = document.getElementById('nav');
        
        if (navToggle && nav) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                nav.classList.toggle('active');
            });

            // Cerrar menú al hacer click en un enlace
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    nav.classList.remove('active');
                });
            });

            // Cerrar menú al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !nav.contains(e.target)) {
                    navToggle.classList.remove('active');
                    nav.classList.remove('active');
                }
            });
        }
    }
}

// Inicializar aplicación principal
document.addEventListener('DOMContentLoaded', () => {
    window.mainApp = new MainApp();
    
    // Manejar errores de imágenes
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            mainApp.manejarErrorImagen(e.target);
        }
    }, true);
});

// Función para scroll al inicio
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Agregar botón de scroll al inicio si se desea (funcionalidad opcional)
window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        if (scrollButton) {
            scrollButton.style.display = 'block';
        }
    } else {
        if (scrollButton) {
            scrollButton.style.display = 'none';
        }
    }
});
