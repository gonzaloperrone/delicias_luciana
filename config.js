// Configuración de la página - Delicias Luciana
// Modifica estos valores para personalizar tu página

const CONFIG = {
    // Información de contacto
    contacto: {
        email: "info@deliciasluciana.com",
        whatsapp: "+598 98 199 850",
        instagram: "@delicias_luciana_",
        whatsappLink: "https://wa.me/59898199850",
        instagramLink: "https://www.instagram.com/delicias_luciana_/"
    },
    
    // Configuración del slider
    slider: {
        autoplay: false,
        autoplayInterval: 5000,
        transitionDuration: 500
    },
    
    // Configuración de colores (actualiza también en CSS)
    colores: {
        primario: "#e91e63",
        secundario: "#f8bbd9",
        acento: "#ff6b9d",
        oscuro: "#2c2c2c",
        claro: "#f9f9f9",
        blanco: "#ffffff"
    },
    
    // Configuración responsive
    responsive: {
        talleresDesktop: 3,
        talleresMobile: 1,
        galeriaDesktop: 4,
        galeriaMobile: 1
    },
    
    // Textos personalizables
    textos: {
        heroSubtitle: "Pastelería artesanal con amor y dedicación",
        heroButton: "Conoce nuestros talleres",
        sobreMi: {
            titulo: "Sobre Mí",
            contenido: [
                "Hola, soy Luciana, una pastelera apasionada que comenzó este hermoso camino hace más de 10 años. Mi amor por la repostería nació en la cocina de mi abuela, donde aprendí que cada postre debe ser preparado con amor y dedicación.",
                "En mis talleres, comparto no solo técnicas y recetas, sino también la pasión por crear momentos dulces que perduran en el tiempo. Cada macaron, cada pastel, es una pequeña obra de arte que lleva consigo toda mi experiencia y cariño.",
                "Te invito a sumergirte en el maravilloso mundo de la pastelería artesanal, donde cada detalle cuenta y cada sabor cuenta una historia."
            ]
        }
    },
    
    // Configuración de animaciones
    animaciones: {
        enabled: true,
        duration: 600,
        easing: "ease-out"
    }
};

// Función para aplicar configuración
function aplicarConfiguracion() {
    // Aplicar textos
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = CONFIG.textos.heroSubtitle;
    }
    
    const heroButton = document.querySelector('.btn-primary');
    if (heroButton) {
        heroButton.textContent = CONFIG.textos.heroButton;
    }
    
    // Aplicar información de contacto
    const whatsappLink = document.querySelector('.contact-link.whatsapp');
    if (whatsappLink) {
        whatsappLink.href = CONFIG.contacto.whatsappLink;
        const whatsappValue = whatsappLink.querySelector('.contact-value');
        if (whatsappValue) {
            whatsappValue.textContent = CONFIG.contacto.whatsapp;
        }
    }
    
    const instagramLink = document.querySelector('.contact-link.instagram');
    if (instagramLink) {
        instagramLink.href = CONFIG.contacto.instagramLink;
        const instagramValue = instagramLink.querySelector('.contact-value');
        if (instagramValue) {
            instagramValue.textContent = CONFIG.contacto.instagram;
        }
    }
}

// Aplicar configuración cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', aplicarConfiguracion);

// Exportar configuración para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
