// =====================================
// SISTEMA DE ACCESO A VIDEOS
// =====================================

class VideoAccessSystem {
    constructor() {
        this.accessCodeInput = document.getElementById('accessCode');
        this.codeForm = document.getElementById('codeForm');
        this.accessForm = document.getElementById('accessForm');
        this.videoPlayer = document.getElementById('videoPlayer');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createDemoCodes();
    }

    createDemoCodes() {
        // Crear códigos de demo para pruebas
        const demoCodes = {
            'DEMO1234': {
                tallerId: 1,
                tallerTitle: 'Cupcakes Gourmet',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                userEmail: 'maria@demo.com'
            },
            'MACARON01': {
                tallerId: 2,
                tallerTitle: 'Macarons Franceses',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                userEmail: 'maria@demo.com'
            },
            'TORTAS99': {
                tallerId: 3,
                tallerTitle: 'Tortas de Diseño',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                userEmail: 'maria@demo.com'
            }
        };

        // Guardar códigos demo en localStorage si no existen
        if (!localStorage.getItem('demo_codes')) {
            localStorage.setItem('demo_codes', JSON.stringify(demoCodes));
        }
    }

    setupEventListeners() {
        this.codeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.verifyAccessCode();
        });

        // Formatear código mientras se escribe
        this.accessCodeInput.addEventListener('input', (e) => {
            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            e.target.value = value;
        });

        // Auto-submit si se pega un código completo
        this.accessCodeInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                if (this.accessCodeInput.value.length >= 6) {
                    this.verifyAccessCode();
                }
            }, 100);
        });
    }

    async verifyAccessCode() {
        const code = this.accessCodeInput.value.trim();
        
        if (!code) {
            this.showError('Por favor, ingresa tu código de acceso');
            return;
        }

        // Mostrar estado de carga
        this.showLoading();

        try {
            // Verificar en códigos demo
            const demoCodes = JSON.parse(localStorage.getItem('demo_codes') || '{}');
            if (demoCodes[code]) {
                await this.grantAccess(demoCodes[code]);
                return;
            }

            // Verificar en compras reales del usuario
            const userPurchases = JSON.parse(localStorage.getItem('user_purchases') || '{}');
            let foundPurchase = null;

            Object.keys(userPurchases).forEach(userId => {
                const purchases = userPurchases[userId];
                const purchase = purchases.find(p => p.accessCode === code);
                if (purchase) {
                    foundPurchase = purchase;
                }
            });

            if (foundPurchase) {
                // Buscar el taller en los datos
                const taller = window.talleresData?.find(t => t.id == foundPurchase.tallerId);
                if (taller && taller.videoUrl) {
                    await this.grantAccess({
                        tallerId: foundPurchase.tallerId,
                        tallerTitle: foundPurchase.tallerTitle,
                        videoUrl: taller.videoUrl,
                        userEmail: 'usuario'
                    });
                    return;
                }
            }

            // Código no encontrado
            this.showError('Código de acceso inválido. Verifica que esté escrito correctamente.');

        } catch (error) {
            console.error('Error al verificar código:', error);
            this.showError('Error al verificar el código. Intenta nuevamente.');
        }
    }

    async grantAccess(accessData) {
        // Simular verificación en servidor
        await this.simulateLoading(1500);

        // Ocultar formulario
        this.accessForm.style.display = 'none';

        // Mostrar reproductor
        this.showVideoPlayer(accessData);
    }

    showVideoPlayer(accessData) {
        if (!this.videoPlayer) {
            this.createVideoPlayer();
        }

        // Configurar información del taller
        document.getElementById('tallerTitle').textContent = accessData.tallerTitle;
        document.getElementById('videoElement').src = accessData.videoUrl;
        
        // Mostrar reproductor
        this.videoPlayer.style.display = 'block';
        this.videoPlayer.classList.add('show');

        // Scroll suave al reproductor
        this.videoPlayer.scrollIntoView({ behavior: 'smooth' });

        // Configurar controles del video
        this.setupVideoControls();
    }

    createVideoPlayer() {
        this.videoPlayer = document.createElement('div');
        this.videoPlayer.id = 'videoPlayer';
        this.videoPlayer.className = 'video-player-container';
        this.videoPlayer.innerHTML = `
            <div class="video-header">
                <div class="video-info">
                    <h2 id="tallerTitle"></h2>
                    <div class="video-meta">
                        <span><i class="fas fa-play-circle"></i> Video del Taller</span>
                        <span><i class="fas fa-hd-video"></i> Alta Calidad</span>
                    </div>
                </div>
                <button class="btn-back" onclick="videoAccessSystem.backToForm()">
                    <i class="fas fa-arrow-left"></i> Volver
                </button>
            </div>
            
            <div class="video-container">
                <video 
                    id="videoElement" 
                    controls 
                    preload="metadata"
                    poster="img/luciana_logo.png">
                    Tu navegador no soporta el elemento video.
                </video>
                
                <div class="video-overlay" id="videoOverlay">
                    <div class="play-button" onclick="videoAccessSystem.playVideo()">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
            
            <div class="video-resources">
                <h3><i class="fas fa-download"></i> Recursos del Taller</h3>
                <div class="resources-grid">
                    <div class="resource-item">
                        <i class="fas fa-file-pdf"></i>
                        <span>Recetas en PDF</span>
                        <button class="btn-download">Descargar</button>
                    </div>
                    <div class="resource-item">
                        <i class="fas fa-list"></i>
                        <span>Lista de Ingredientes</span>
                        <button class="btn-download">Descargar</button>
                    </div>
                    <div class="resource-item">
                        <i class="fas fa-tools"></i>
                        <span>Utensilios Necesarios</span>
                        <button class="btn-download">Descargar</button>
                    </div>
                </div>
            </div>
            
            <div class="support-section">
                <h3><i class="fas fa-headset"></i> ¿Necesitas Ayuda?</h3>
                <p>Si tienes dudas sobre el taller, puedes contactarme:</p>
                <div class="support-buttons">
                    <a href="https://wa.me/59898199850?text=Hola! Tengo una consulta sobre el taller online" 
                       class="btn-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    <a href="mailto:luciana@deliciasluciana.com?subject=Consulta sobre taller online" 
                       class="btn-email">
                        <i class="fas fa-envelope"></i> Email
                    </a>
                </div>
            </div>
        `;
        
        document.querySelector('.video-access-container').appendChild(this.videoPlayer);
    }

    setupVideoControls() {
        const video = document.getElementById('videoElement');
        const overlay = document.getElementById('videoOverlay');

        video.addEventListener('loadedmetadata', () => {
            overlay.style.display = 'flex';
        });

        video.addEventListener('play', () => {
            overlay.style.display = 'none';
        });

        video.addEventListener('pause', () => {
            if (video.currentTime < video.duration) {
                overlay.style.display = 'flex';
            }
        });

        video.addEventListener('ended', () => {
            overlay.style.display = 'flex';
            this.showCompletionMessage();
        });
    }

    playVideo() {
        const video = document.getElementById('videoElement');
        video.play();
    }

    backToForm() {
        this.videoPlayer.style.display = 'none';
        this.accessForm.style.display = 'block';
        this.accessCodeInput.value = '';
        this.clearMessages();
    }

    showLoading() {
        const submitBtn = this.codeForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
        this.clearMessages();
    }

    async simulateLoading(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showError(message) {
        this.clearMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        this.codeForm.appendChild(errorDiv);
        this.resetSubmitButton();
    }

    showSuccess(message) {
        this.clearMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        this.codeForm.appendChild(successDiv);
    }

    clearMessages() {
        const messages = this.codeForm.querySelectorAll('.error-message, .success-message');
        messages.forEach(msg => msg.remove());
    }

    resetSubmitButton() {
        const submitBtn = this.codeForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-play-circle"></i> Acceder al Video';
    }

    showCompletionMessage() {
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-message';
        completionDiv.innerHTML = `
            <div class="completion-content">
                <i class="fas fa-trophy"></i>
                <h3>¡Taller Completado!</h3>
                <p>Esperamos que hayas disfrutado el taller. Recuerda que puedes volver a verlo cuando quieras.</p>
                <div class="completion-actions">
                    <button onclick="videoAccessSystem.playVideo()" class="btn-replay">
                        <i class="fas fa-redo"></i> Ver de Nuevo
                    </button>
                    <a href="index.html#talleres" class="btn-more-courses">
                        <i class="fas fa-plus"></i> Más Talleres
                    </a>
                </div>
            </div>
        `;
        
        this.videoPlayer.appendChild(completionDiv);
        
        setTimeout(() => {
            completionDiv.classList.add('show');
        }, 500);
    }
}

// Funciones de ayuda para códigos demo
function fillDemoCode(code) {
    document.getElementById('accessCode').value = code;
    document.getElementById('accessCode').focus();
}

// Inicializar sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de talleres si no están disponibles
    if (!window.talleresData) {
        // Intentar cargar desde el script data.js
        const script = document.createElement('script');
        script.src = 'js/data.js';
        script.onload = () => {
            window.videoAccessSystem = new VideoAccessSystem();
        };
        document.head.appendChild(script);
    } else {
        window.videoAccessSystem = new VideoAccessSystem();
    }
});
