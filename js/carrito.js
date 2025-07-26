// Carrito de compras
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
        this.init();
    }

    init() {
        this.actualizarContador();
        this.bindEvents();
    }

    bindEvents() {
        // Abrir carrito
        document.getElementById('carritoIcon').addEventListener('click', () => {
            this.mostrarCarrito();
        });

        // Cerrar carrito
        document.getElementById('carritoClose').addEventListener('click', () => {
            this.cerrarCarrito();
        });

        // Vaciar carrito
        document.getElementById('vaciarCarrito').addEventListener('click', () => {
            this.vaciarCarrito();
        });

        // Cerrar modal al hacer click fuera
        document.getElementById('carritoModal').addEventListener('click', (e) => {
            if (e.target.id === 'carritoModal') {
                this.cerrarCarrito();
            }
        });

        // Finalizar compra
        const btnComprar = document.querySelector('.btn-comprar');
        if (btnComprar) {
            btnComprar.addEventListener('click', () => {
                this.finalizarCompra();
            });
        }
    }

    agregarItem(taller) {
        // Verificar si el item ya existe
        const itemExistente = this.items.find(item => item.id === taller.id);
        
        if (itemExistente) {
            // Si ya existe, mostrar mensaje
            this.mostrarMensaje('Este taller ya está en tu carrito', 'warning');
            return;
        }

        // Agregar nuevo item
        this.items.push({
            id: taller.id,
            titulo: taller.titulo,
            precio: taller.precio,
            imagen: taller.imagen
        });

        this.guardarEnStorage();
        this.actualizarContador();
        this.mostrarMensaje('¡Taller agregado al carrito!', 'success');
    }

    eliminarItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarEnStorage();
        this.actualizarContador();
        this.renderizarCarrito();
    }

    vaciarCarrito() {
        this.items = [];
        this.guardarEnStorage();
        this.actualizarContador();
        this.renderizarCarrito();
        this.mostrarMensaje('Carrito vaciado', 'info');
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + item.precio, 0);
    }

    actualizarContador() {
        const contador = document.getElementById('carritoCount');
        contador.textContent = this.items.length;
        contador.style.display = this.items.length > 0 ? 'flex' : 'none';
    }

    mostrarCarrito() {
        this.renderizarCarrito();
        document.getElementById('carritoModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    cerrarCarrito() {
        document.getElementById('carritoModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    renderizarCarrito() {
        const carritoItems = document.getElementById('carritoItems');
        const carritoTotal = document.getElementById('carritoTotal');

        if (this.items.length === 0) {
            carritoItems.innerHTML = `
                <div class="carrito-vacio">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            carritoTotal.textContent = '0';
            return;
        }

        carritoItems.innerHTML = this.items.map(item => `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.titulo}" class="carrito-item-image">
                <div class="carrito-item-info">
                    <div class="carrito-item-name">${item.titulo}</div>
                    <div class="carrito-item-precio">$${item.precio.toLocaleString()}</div>
                </div>
                <button class="carrito-item-remove" onclick="carrito.eliminarItem(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        carritoTotal.textContent = this.calcularTotal().toLocaleString();
    }

    guardarEnStorage() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    mostrarMensaje(mensaje, tipo = 'info') {
        // Crear elemento de mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-flotante mensaje-${tipo}`;
        mensajeDiv.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check' : tipo === 'warning' ? 'exclamation' : 'info'}-circle"></i>
            ${mensaje}
        `;

        // Agregar estilos si no existen
        if (!document.querySelector('#mensaje-styles')) {
            const styles = document.createElement('style');
            styles.id = 'mensaje-styles';
            styles.textContent = `
                .mensaje-flotante {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 600;
                    z-index: 3000;
                    animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .mensaje-success { background: #4CAF50; }
                .mensaje-warning { background: #FF9800; }
                .mensaje-info { background: #2196F3; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(mensajeDiv);

        // Eliminar después de 3 segundos
        setTimeout(() => {
            if (mensajeDiv.parentNode) {
                mensajeDiv.parentNode.removeChild(mensajeDiv);
            }
        }, 3000);
    }

    finalizarCompra() {
        if (this.items.length === 0) {
            this.mostrarMensaje('Tu carrito está vacío', 'warning');
            return;
        }

        // Verificar si solo hay talleres online
        const soloTalleresOnline = this.items.every(item => item.tipo === 'online');

        if (soloTalleresOnline) {
            this.procesarCompraOnline();
        } else {
            this.procesarCompraTradicional();
        }
    }

    procesarCompraOnline() {
        // Solicitar email para envío de códigos
        const email = prompt('Ingresa tu email para recibir los códigos de acceso a los talleres:');
        
        if (!email) {
            this.mostrarMensaje('Email requerido para talleres online', 'warning');
            return;
        }

        if (!this.validarEmail(email)) {
            this.mostrarMensaje('Por favor ingresa un email válido', 'warning');
            return;
        }

        let codigosGenerados = [];
        let mensajeCodigos = '🎥 *Códigos de Acceso a Talleres Online*\n\n';
        
        // Generar códigos para cada taller
        this.items.forEach(item => {
            const codigo = videoAccess.purchaseCourse(item.id);
            codigosGenerados.push({
                taller: item.titulo,
                codigo: codigo,
                precio: item.precio
            });
            
            // Simular envío de email
            videoAccess.sendAccessEmail(item.id, email);
        });

        // Crear mensaje con códigos
        codigosGenerados.forEach((item, index) => {
            mensajeCodigos += `${index + 1}. *${item.taller}*\n`;
            mensajeCodigos += `   🔑 Código: \`${item.codigo}\`\n`;
            mensajeCodigos += `   💰 Precio: $${item.precio}\n\n`;
        });

        const total = this.calcularTotal();
        mensajeCodigos += `💰 *Total: $${total}*\n\n`;
        mensajeCodigos += `📧 *Email:* ${email}\n`;
        mensajeCodigos += `📅 *Fecha:* ${new Date().toLocaleDateString('es-UY')}\n\n`;
        mensajeCodigos += `🎬 *Accede a tus videos en:*\n`;
        mensajeCodigos += `${window.location.origin}/video-access.html\n\n`;
        mensajeCodigos += `✅ *Instrucciones:*\n`;
        mensajeCodigos += `1. Ve al enlace de acceso\n`;
        mensajeCodigos += `2. Ingresa tu código\n`;
        mensajeCodigos += `3. ¡Disfruta tu taller!\n\n`;
        mensajeCodigos += `💬 *Soporte:* ¿Dudas? ¡Contáctame por WhatsApp!\n\n`;
        mensajeCodigos += `¡Gracias por elegir Delicias Luciana! 🧁`;

        // Enviar por WhatsApp para confirmación
        const whatsappUrl = `https://wa.me/59898199850?text=${encodeURIComponent(mensajeCodigos)}`;
        
        // Mostrar códigos al usuario
        this.mostrarModalCodigos(codigosGenerados, email);
        
        // Abrir WhatsApp en segundo plano
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);

        // Limpiar carrito
        this.vaciarCarrito();
    }

    procesarCompraTradicional() {
        // Lógica original para productos físicos
        let mensaje = `🧁 *Nuevo pedido desde Delicias Luciana*\n\n`;
        mensaje += `📋 *Detalle del pedido:*\n`;
        
        this.items.forEach((item, index) => {
            mensaje += `${index + 1}. ${item.titulo} - $${item.precio}\n`;
        });
        
        mensaje += `\n💰 *Total: $${this.calcularTotal()}*\n\n`;
        mensaje += `📅 *Fecha del pedido:* ${new Date().toLocaleDateString('es-UY')}\n`;
        mensaje += `⏰ *Recordatorio:* Los pedidos requieren 48hs de anticipación\n\n`;
        mensaje += `¡Gracias por elegir Delicias Luciana! 🎂`;

        // Abrir WhatsApp con el mensaje
        const whatsappUrl = `https://wa.me/59898199850?text=${encodeURIComponent(mensaje)}`;
        window.open(whatsappUrl, '_blank');

        // Mostrar mensaje de confirmación
        this.mostrarMensaje('Redirigiendo a WhatsApp para finalizar tu pedido...', 'success');
        
        // Cerrar carrito
        setTimeout(() => {
            this.cerrarCarrito();
        }, 1500);
    }

    mostrarModalCodigos(codigos, email) {
        // Crear modal personalizado para mostrar códigos
        const modalHTML = `
            <div class="modal-codigos" id="modalCodigos">
                <div class="modal-codigos-content">
                    <div class="modal-header">
                        <h3>🎉 ¡Compra Exitosa!</h3>
                        <p>Tus códigos de acceso han sido generados</p>
                    </div>
                    <div class="modal-body">
                        <div class="email-info">
                            <i class="fas fa-envelope"></i>
                            <span>Códigos enviados a: <strong>${email}</strong></span>
                        </div>
                        <div class="codigos-list">
                            ${codigos.map(item => `
                                <div class="codigo-item">
                                    <h4>${item.taller}</h4>
                                    <div class="codigo-box">
                                        <span class="codigo">${item.codigo}</span>
                                        <button onclick="copiarCodigo('${item.codigo}')" class="btn-copy">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="acceso-info">
                            <p><strong>Accede a tus videos en:</strong></p>
                            <div class="url-box">
                                <span>${window.location.origin}/video-access.html</span>
                                <button onclick="abrirAcceso()" class="btn-acceso">
                                    <i class="fas fa-play"></i> Ir a Videos
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button onclick="cerrarModalCodigos()" class="btn-cerrar">
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Agregar modal al DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Mostrar modal
        document.getElementById('modalCodigos').style.display = 'flex';
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + parseFloat(item.precio), 0);
    }
}

// Inicializar carrito
const carrito = new Carrito();

// Funciones globales para el modal de códigos
window.copiarCodigo = function(codigo) {
    navigator.clipboard.writeText(codigo).then(function() {
        // Mostrar feedback visual
        const btn = event.target.closest('.btn-copy');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = '#4caf50';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 1000);
    }).catch(function() {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = codigo;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Mostrar mensaje
        alert('Código copiado: ' + codigo);
    });
};

window.abrirAcceso = function() {
    window.open('video-access.html', '_blank');
};

window.cerrarModalCodigos = function() {
    const modal = document.getElementById('modalCodigos');
    if (modal) {
        modal.remove();
    }
};
