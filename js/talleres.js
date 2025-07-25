// Gestión de talleres
class Talleres {
    constructor() {
        this.talleresPerPage = this.getTalleresPerPage();
        this.currentPage = 1;
        this.totalPages = 1;
        this.init();
        this.setupResponsive();
    }

    getTalleresPerPage() {
        if (window.innerWidth <= 768) {
            return 3; // 3 talleres por página en móvil
        } else if (window.innerWidth <= 1024) {
            return 4; // 4 talleres por página en tablet
        } else {
            return 6; // 6 talleres por página en desktop
        }
    }

    setupResponsive() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newTalleresPerPage = this.getTalleresPerPage();
                if (newTalleresPerPage !== this.talleresPerPage) {
                    this.talleresPerPage = newTalleresPerPage;
                    this.currentPage = 1; // Resetear a primera página
                    this.calculatePages();
                    this.renderizarTalleres();
                    this.renderizarPaginacion();
                }
            }, 250);
        });
    }

    init() {
        this.calculatePages();
        this.renderizarTalleres();
        this.renderizarPaginacion();
    }

    calculatePages() {
        this.totalPages = Math.ceil(talleresData.length / this.talleresPerPage);
    }

    getCurrentPageTalleres() {
        const startIndex = (this.currentPage - 1) * this.talleresPerPage;
        const endIndex = startIndex + this.talleresPerPage;
        return talleresData.slice(startIndex, endIndex);
    }

    renderizarTalleres() {
        const talleresGrid = document.getElementById('talleresGrid');
        
        if (!talleresGrid) return;

        const talleresActuales = this.getCurrentPageTalleres();

        talleresGrid.innerHTML = talleresActuales.map(taller => `
            <div class="taller-card" data-id="${taller.id}">
                <img src="${taller.imagen}" alt="${taller.titulo}" class="taller-image">
                <div class="taller-content">
                    <h3 class="taller-title">${taller.titulo}</h3>
                    <p class="taller-description">${taller.descripcion}</p>
                    <div class="taller-footer">
                        <div class="taller-precio">$${taller.precio.toLocaleString()}</div>
                        <button class="btn-comprar" onclick="talleres.agregarAlCarrito(${taller.id})">
                            <i class="fas fa-shopping-cart"></i> Comprar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Agregar animación de aparición
        this.animarTalleres();
    }

    renderizarPaginacion() {
        const paginationContainer = document.getElementById('talleresPagination');
        
        if (!paginationContainer || this.totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }

        paginationContainer.style.display = 'flex';

        let paginationHTML = `
            <button class="pagination-btn" onclick="talleres.cambiarPagina(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Páginas numéricas
        for (let i = 1; i <= this.totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="pagination-btn active">${i}</button>`;
            } else {
                paginationHTML += `<button class="pagination-btn" onclick="talleres.cambiarPagina(${i})">${i}</button>`;
            }
        }

        paginationHTML += `
            <button class="pagination-btn" onclick="talleres.cambiarPagina(${this.currentPage + 1})" 
                    ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        paginationContainer.innerHTML = paginationHTML;
    }

    cambiarPagina(nuevaPagina) {
        if (nuevaPagina < 1 || nuevaPagina > this.totalPages) return;
        
        this.currentPage = nuevaPagina;
        this.renderizarTalleres();
        this.renderizarPaginacion();
        
        // Scroll suave al inicio de la sección
        document.getElementById('talleres').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    agregarAlCarrito(tallerId) {
        const taller = talleresData.find(t => t.id === tallerId);
        if (taller && carrito) {
            carrito.agregarItem(taller);
        }
    }

    animarTalleres() {
        const cards = document.querySelectorAll('.taller-card');
        
        // Configurar Intersection Observer para animaciones
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Aplicar estilos iniciales y observar
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    filtrarTalleres(categoria) {
        // Funcionalidad futura para filtros
        console.log('Filtrar por:', categoria);
    }

    buscarTalleres(termino) {
        // Funcionalidad futura para búsqueda
        console.log('Buscar:', termino);
    }
}

// Inicializar talleres cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.talleres = new Talleres();
});
