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

        // Crear mensaje para WhatsApp
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

    calcularTotal() {
        return this.items.reduce((total, item) => total + parseFloat(item.precio), 0);
    }
}

// Inicializar carrito
const carrito = new Carrito();
