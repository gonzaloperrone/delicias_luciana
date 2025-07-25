// Gestión de galería
class Galeria {
    constructor() {
        this.modal = null;
        this.modalImg = null;
        this.closeBtn = null;
        this.fotosPerPage = this.getFotosPerPage();
        this.currentPage = 1;
        this.totalPages = 1;
        this.init();
        this.setupResponsive();
    }

    getFotosPerPage() {
        if (window.innerWidth <= 768) {
            return 6; // 6 fotos por página en móvil
        } else {
            return 12; // 12 fotos por página en desktop/tablet
        }
    }

    setupResponsive() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newFotosPerPage = this.getFotosPerPage();
                if (newFotosPerPage !== this.fotosPerPage) {
                    this.fotosPerPage = newFotosPerPage;
                    this.currentPage = 1;
                    this.calculatePages();
                    this.renderizarGaleria();
                    this.renderizarPaginacion();
                }
            }, 250);
        });
    }

    init() {
        this.calculatePages();
        this.renderizarGaleria();
        this.renderizarPaginacion();
        this.configurarModal();
    }

    calculatePages() {
        this.totalPages = Math.ceil(galeriaData.length / this.fotosPerPage);
    }

    getCurrentPageFotos() {
        const startIndex = (this.currentPage - 1) * this.fotosPerPage;
        const endIndex = startIndex + this.fotosPerPage;
        return galeriaData.slice(startIndex, endIndex);
    }

    renderizarGaleria() {
        const galeriaGrid = document.getElementById('galeriaGrid');
        
        if (!galeriaGrid) return;

        const fotosActuales = this.getCurrentPageFotos();

        galeriaGrid.innerHTML = fotosActuales.map(foto => `
            <div class="galeria-item" onclick="galeria.abrirModal('${foto.imagen}', '${foto.alt}')">
                <img src="${foto.imagen}" alt="${foto.alt}" class="galeria-image">
                <div class="galeria-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `).join('');

        // Agregar animación de aparición
        this.animarGaleria();
    }

    renderizarPaginacion() {
        const paginationContainer = document.getElementById('galeriaPagination');
        
        if (!paginationContainer) return;

        // Mostrar paginación si hay más de 12 fotos o más de una página
        if (galeriaData.length > 12 || this.totalPages > 1) {
            paginationContainer.style.display = 'flex';

            let paginationHTML = `
                <button class="pagination-btn" onclick="galeria.cambiarPagina(${this.currentPage - 1})" 
                        ${this.currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
            `;

            // Páginas numéricas
            for (let i = 1; i <= this.totalPages; i++) {
                if (i === this.currentPage) {
                    paginationHTML += `<button class="pagination-btn active">${i}</button>`;
                } else {
                    paginationHTML += `<button class="pagination-btn" onclick="galeria.cambiarPagina(${i})">${i}</button>`;
                }
            }

            paginationHTML += `
                <button class="pagination-btn" onclick="galeria.cambiarPagina(${this.currentPage + 1})" 
                        ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;

            paginationContainer.innerHTML = paginationHTML;
        } else {
            paginationContainer.style.display = 'none';
        }
    }

    cambiarPagina(nuevaPagina) {
        if (nuevaPagina < 1 || nuevaPagina > this.totalPages) return;
        
        this.currentPage = nuevaPagina;
        this.renderizarGaleria();
        this.renderizarPaginacion();
        
        // Scroll suave al inicio de la sección
        document.getElementById('galeria').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    configurarModal() {
        this.modal = document.getElementById('galeriaModal');
        this.modalImg = document.getElementById('modalImg');
        this.closeBtn = document.getElementById('closeModal');

        if (!this.modal || !this.modalImg || !this.closeBtn) return;

        // Cerrar modal
        this.closeBtn.addEventListener('click', () => {
            this.cerrarModal();
        });

        // Cerrar modal al hacer click fuera de la imagen
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.cerrarModal();
            }
        });

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.cerrarModal();
            }
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    this.imagenAnterior();
                } else if (e.key === 'ArrowRight') {
                    this.imagenSiguiente();
                }
            }
        });
    }

    abrirModal(imagenSrc, alt) {
        if (!this.modal || !this.modalImg) return;

        this.modalImg.src = imagenSrc;
        this.modalImg.alt = alt;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Guardar índice de imagen actual para navegación (basado en todas las fotos, no solo la página actual)
        this.indiceActual = galeriaData.findIndex(foto => foto.imagen === imagenSrc);
    }

    cerrarModal() {
        if (!this.modal) return;

        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    imagenAnterior() {
        if (this.indiceActual > 0) {
            this.indiceActual--;
            const foto = galeriaData[this.indiceActual];
            this.modalImg.src = foto.imagen;
            this.modalImg.alt = foto.alt;
        }
    }

    imagenSiguiente() {
        if (this.indiceActual < galeriaData.length - 1) {
            this.indiceActual++;
            const foto = galeriaData[this.indiceActual];
            this.modalImg.src = foto.imagen;
            this.modalImg.alt = foto.alt;
        }
    }

    animarGaleria() {
        const items = document.querySelectorAll('.galeria-item');
        
        // Configurar Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Aplicar estilos iniciales y observar
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }

    // Método para agregar más imágenes dinámicamente (funcionalidad futura)
    agregarImagen(nuevaFoto) {
        galeriaData.push(nuevaFoto);
        this.renderizarGaleria();
    }

    // Método para filtrar galería por categorías (funcionalidad futura)
    filtrarPorCategoria(categoria) {
        console.log('Filtrar galería por:', categoria);
    }
}

// Inicializar galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.galeria = new Galeria();
});
