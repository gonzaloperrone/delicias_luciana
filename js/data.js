// Datos de talleres online
const talleresData = [
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
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Video de prueba
        codigoAcceso: null, // Se genera después de la compra
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
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Video de prueba
        codigoAcceso: null,
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
        titulo: "Tortas de Diseño",
        descripcion: "Crea tortas espectaculares con técnicas de modelado, fondant y decoración artística.",
        precio: 4500,
        imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        duracion: "4 horas",
        participantes: "Hasta 10 personas",
        fecha: "Acceso inmediato",
        modalidad: "Online",
        nivel: "Avanzado",
        tipo: "online",
        tieneVideo: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Video de prueba
        codigoAcceso: null,
        incluye: [
            "Video HD completo del taller",
            "Plantillas de diseños para imprimir",
            "Guía de colores y combinaciones",
            "Técnicas de modelado paso a paso",
            "Soporte por WhatsApp durante 15 días",
            "Bonus: Video de técnicas avanzadas"
        ]
    },
    {
        id: 4,
        titulo: "Postres Sin TACC",
        descripcion: "Aprende a preparar deliciosos postres libres de gluten sin sacrificar sabor ni textura.",
        precio: 2800,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        duracion: "2.5 horas",
        participantes: "Hasta 25 personas",
        fecha: "Acceso inmediato",
        modalidad: "Online",
        nivel: "Principiante",
        tipo: "online",
        tieneVideo: false,
        videoUrl: null,
        codigoAcceso: null,
        incluye: [
            "Video HD completo del taller",
            "Guía de harinas sin TACC",
            "5 recetas adaptadas",
            "Lista de proveedores recomendados",
            "Soporte por WhatsApp durante 7 días"
        ]
    },
    {
        id: 5,
        titulo: "Cookies Artísticas",
        descripcion: "Descubre el arte de decorar cookies con royal icing y técnicas de pintado.",
        precio: 2200,
        imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        duracion: "2 horas",
        participantes: "Hasta 30 personas",
        fecha: "Acceso inmediato",
        modalidad: "Online",
        nivel: "Principiante",
        tipo: "online",
        tieneVideo: false, 
        videoUrl: null,
        codigoAcceso: null,
        incluye: [
            "Video HD completo del taller",
            "Plantillas de diseños descargables",
            "Receta de royal icing perfecta",
            "Técnicas de pintado con colorantes",
            "Soporte por WhatsApp durante 7 días"
        ]
    },
    {
        id: 6,
        titulo: "Cheesecakes Gourmet",
        descripcion: "Perfecciona la técnica del cheesecake perfecto con variadas texturas y sabores.",
        precio: 3000,
        imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        duracion: "3 horas",
        nivel: "Intermedio",
        tipo: "online",
        videoUrl: null,
        codigoAcceso: null,
        incluye: [
            "Video HD completo del taller",
            "3 recetas de cheesecake diferentes",
            "Técnicas para evitar grietas",
            "Variedades de toppings y salsas",
            "Soporte por WhatsApp durante 10 días"
        ]
    },
    {
        id: 7,
        titulo: "Brownies Premium",
        descripcion: "Aprende los secretos para hacer brownies perfectos con diferentes texturas y sabores.",
        precio: 2300,
        imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        duracion: "2 horas",
        nivel: "Principiante",
        tipo: "online",
        videoUrl: null,
        codigoAcceso: null,
        incluye: [
            "Video HD completo del taller",
            "4 variaciones de brownies",
            "Técnicas para texturas perfectas",
            "Decoraciones y presentaciones",
            "Soporte por WhatsApp durante 7 días"
        ]
    },
    {
        id: 8,
        titulo: "Tartas Francesas",
        descripcion: "Domina las técnicas clásicas francesas para crear tartas elegantes y sofisticadas.",
        precio: 3800,
        imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        titulo: "Donuts Artesanales",
        descripcion: "Crea donuts caseros únicos con masas especiales y glazeados creativos.",
        precio: 2100,
        imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        titulo: "Cakes Pops Decorados",
        descripcion: "Aprende a hacer cake pops perfectos con decoraciones temáticas y creativas.",
        precio: 1800,
        imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        duracion: "1.5 horas",
        nivel: "Principiante",
        tipo: "online",
        videoUrl: null,
        codigoAcceso: null,
        incluye: [
            "Video HD completo del taller",
            "Moldes y palitos recomendados",
            "Técnicas de cobertura perfecta",
            "Decoraciones temáticas",
            "Soporte por WhatsApp durante 5 días"
        ]
    }
];

// Sistema de acceso a videos
class VideoAccess {
    constructor() {
        this.purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses')) || {};
        this.videoDatabase = {
            'DL-CUPCAKES01': {
                tallerId: 1,
                videoUrl: 'videos/cupcakes-gourmet.mp4',
                title: 'Cupcakes Gourmet',
                materials: [
                    { name: 'Receta Cupcakes Gourmet.pdf', url: 'materials/receta-cupcakes-gourmet.pdf' },
                    { name: 'Lista de Ingredientes.pdf', url: 'materials/ingredientes-cupcakes.pdf' },
                    { name: 'Técnicas de Decoración.pdf', url: 'materials/decoracion-cupcakes.pdf' }
                ]
            },
            'DL-MACARONS02': {
                tallerId: 2,
                videoUrl: 'videos/macarons-franceses.mp4',
                title: 'Macarons Franceses',
                materials: [
                    { name: 'Receta Macarons Perfectos.pdf', url: 'materials/receta-macarons.pdf' },
                    { name: 'Troubleshooting Macarons.pdf', url: 'materials/troubleshooting-macarons.pdf' },
                    { name: 'Plantillas de Medidas.pdf', url: 'materials/plantillas-macarons.pdf' }
                ]
            },
            'DL-TORTAS03': {
                tallerId: 3,
                videoUrl: 'videos/tortas-diseno.mp4',
                title: 'Tortas de Diseño',
                materials: [
                    { name: 'Técnicas de Modelado.pdf', url: 'materials/modelado-fondant.pdf' },
                    { name: 'Plantillas de Diseños.pdf', url: 'materials/plantillas-tortas.pdf' },
                    { name: 'Guía de Colores.pdf', url: 'materials/guia-colores.pdf' }
                ]
            }
            // Se pueden agregar más códigos según sea necesario
        };
    }

    // Simula la compra y genera código de acceso
    purchaseCourse(tallerId) {
        const accessCode = this.generateAccessCode(tallerId);
        const purchaseData = {
            tallerId: tallerId,
            accessCode: accessCode,
            purchaseDate: new Date().toISOString(),
            emailSent: false,
            expirationDate: null // Los videos no expiran
        };

        this.purchasedCourses[tallerId] = purchaseData;
        localStorage.setItem('purchasedCourses', JSON.stringify(this.purchasedCourses));
        
        return accessCode;
    }

    // Genera código único de acceso basado en el taller
    generateAccessCode(tallerId) {
        const taller = talleresData.find(t => t.id === tallerId);
        let prefix = 'DL-';
        
        if (taller) {
            if (taller.titulo.includes('Cupcakes')) prefix += 'CUPCAKES';
            else if (taller.titulo.includes('Macarons')) prefix += 'MACARONS';
            else if (taller.titulo.includes('Tortas')) prefix += 'TORTAS';
            else if (taller.titulo.includes('Sin TACC')) prefix += 'SINTACC';
            else if (taller.titulo.includes('Cookies')) prefix += 'COOKIES';
            else if (taller.titulo.includes('Cheesecakes')) prefix += 'CHEESE';
            else if (taller.titulo.includes('Brownies')) prefix += 'BROWNIE';
            else prefix += 'TALLER';
        }
        
        const randomStr = Math.random().toString(36).substr(2, 2).toUpperCase();
        const timestamp = Date.now().toString().slice(-2);
        
        return prefix + randomStr + timestamp;
    }

    // Verifica si el usuario tiene acceso
    hasAccess(tallerId) {
        return this.purchasedCourses.hasOwnProperty(tallerId);
    }

    // Obtiene el código de acceso
    getAccessCode(tallerId) {
        return this.purchasedCourses[tallerId]?.accessCode || null;
    }

    // Verifica un código de acceso
    verifyAccessCode(code) {
        return this.videoDatabase[code] || null;
    }

    // Simula envío de email con el código
    sendAccessEmail(tallerId, email) {
        const courseData = this.purchasedCourses[tallerId];
        if (!courseData) return false;

        // En producción, aquí se haría la llamada real al servidor para enviar el email
        console.log(`Email enviado a ${email} con código: ${courseData.accessCode}`);
        
        // Marcar como email enviado
        courseData.emailSent = true;
        courseData.emailAddress = email;
        localStorage.setItem('purchasedCourses', JSON.stringify(this.purchasedCourses));
        
        return true;
    }

    // Obtiene todos los cursos comprados por el usuario
    getPurchasedCourses() {
        return Object.values(this.purchasedCourses);
    }
}

// Instancia global del sistema de acceso
const videoAccess = new VideoAccess();

// Datos de galería
const galeriaData = [
    {
        id: 1,
        imagen: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Torta de chocolate decorada"
    },
    {
        id: 2,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Cupcakes variados"
    },
    {
        id: 3,
        imagen: "https://images.unsplash.com/photo-1558312657-b2dead03d494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Macarons coloridos"
    },
    {
        id: 4,
        imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Torta de bodas elegante"
    },
    {
        id: 5,
        imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Cookies decoradas"
    },
    {
        id: 6,
        imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Cheesecake de frutos rojos"
    },
    {
        id: 7,
        imagen: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Cupcakes gourmet"
    },
    {
        id: 8,
        imagen: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Mesa dulce completa"
    },
    {
        id: 9,
        imagen: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Donuts artesanales"
    },
    {
        id: 10,
        imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Tarta de frutas frescas"
    },
    {
        id: 11,
        imagen: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Croissants dorados"
    },
    {
        id: 12,
        imagen: "https://images.unsplash.com/photo-1516584799557-d4cb3a16bb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Eclairs de chocolate"
    },
    {
        id: 13,
        imagen: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Torta red velvet"
    },
    {
        id: 14,
        imagen: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Muffins de arándanos"
    },
    {
        id: 15,
        imagen: "https://images.unsplash.com/photo-1549312524-d59ac4fe2de2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Profiteroles elegantes"
    },
    {
        id: 16,
        imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Brownies gourmet"
    },
    {
        id: 17,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Pastel de limón"
    },
    {
        id: 18,
        imagen: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Torta de vainilla decorada"
    }
];
