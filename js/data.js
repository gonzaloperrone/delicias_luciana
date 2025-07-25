// Datos de talleres
const talleresData = [
    {
        id: 1,
        titulo: "Cupcakes Gourmet",
        descripcion: "Aprende a crear cupcakes elegantes con técnicas profesionales de decoración y sabores únicos.",
        precio: 2500,
        imagen: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        titulo: "Macarons Franceses",
        descripcion: "Domina la técnica francesa para crear macarons perfectos con rellenos deliciosos.",
        precio: 3200,
        imagen: "https://images.unsplash.com/photo-1558312657-b2dead03d494?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        titulo: "Tortas de Diseño",
        descripcion: "Crea tortas espectaculares con técnicas de modelado, fondant y decoración artística.",
        precio: 4500,
        imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        titulo: "Postres Sin TACC",
        descripcion: "Aprende a preparar deliciosos postres libres de gluten sin sacrificar sabor ni textura.",
        precio: 2800,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        titulo: "Cookies Artísticas",
        descripcion: "Descubre el arte de decorar cookies con royal icing y técnicas de pintado.",
        precio: 2200,
        imagen: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        titulo: "Cheesecakes Gourmet",
        descripcion: "Perfecciona la técnica del cheesecake perfecto con variadas texturas y sabores.",
        precio: 3000,
        imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        titulo: "Brownies Premium",
        descripcion: "Aprende los secretos para hacer brownies perfectos con diferentes texturas y sabores.",
        precio: 2300,
        imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
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
        imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

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
