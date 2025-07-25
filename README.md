# Delicias Luciana - Sitio Web de Pastelería

Una página web elegante y responsive para la pastelería "Delicias Luciana", diseñada con HTML5, CSS3 y JavaScript vanilla.

## 🎯 Características

- **Diseño Responsive**: Optimizado para dispositivos móviles
- **Estructura Modular**: CSS y JS organizados por secciones
- **Carrito de Compras**: Funcionalidad completa con localStorage
- **Galería Interactiva**: Modal para ver imágenes en pantalla completa
- **Animaciones Suaves**: Efectos de scroll y transiciones elegantes
- **Datos Dinámicos**: Contenido cargado desde JSON

## 📁 Estructura del Proyecto

```
delicias_luciana/
├── index.html              # Página principal
├── css/                    # Estilos CSS
│   ├── main.css           # Estilos principales y variables
│   ├── header.css         # Estilos del header
│   ├── talleres.css       # Estilos de la sección talleres
│   ├── galeria.css        # Estilos de la galería
│   ├── sobre-mi.css       # Estilos de la sección sobre mí
│   ├── footer.css         # Estilos del footer
│   └── carrito.css        # Estilos del carrito de compras
├── js/                     # Scripts JavaScript
│   ├── data.js            # Datos de talleres y galería (JSON)
│   ├── carrito.js         # Lógica del carrito de compras
│   ├── talleres.js        # Gestión de talleres
│   ├── galeria.js         # Gestión de la galería
│   └── main.js            # Funcionalidades principales
├── img/                    # Imágenes del sitio
│   ├── luciana_logo_horizontal.png
│   ├── luciana_logo.png
│   └── sobreMi.jpeg
└── README.md              # Documentación del proyecto
```

## 🚀 Funcionalidades

### 🎂 Sección de Talleres
- Grid responsivo de talleres
- Cards con imagen, título, descripción y precio
- Botón "Agregar al carrito" funcional
- Badges de popularidad y novedad
- Animaciones de aparición al hacer scroll

### 🛒 Carrito de Compras
- Modal con diseño elegante
- Agregar/eliminar productos
- Contador en el header
- Persistencia con localStorage
- Cálculo automático del total
- Mensajes de confirmación

### 🖼️ Galería de Fotos
- Grid responsivo tipo masonry
- Modal para ver imágenes en tamaño completo
- Navegación con teclado (flechas y Escape)
- Overlay con efecto hover
- Lazy loading opcional

### 👩‍🍳 Sección Sobre Mí
- Layout con imagen y texto
- Diseño responsivo
- Animaciones de entrada

### 📱 Footer
- Enlaces a redes sociales (WhatsApp e Instagram)
- Diseño elegante con gradientes
- Totalmente responsive

## 🎨 Paleta de Colores

La paleta está basada en los logos proporcionados:

- **Primary Color**: `#E697A8` (Rosa principal)
- **Secondary Color**: `#D87394` (Rosa secundario)
- **Accent Color**: `#C4567A` (Rosa acentuado)
- **Text Dark**: `#2C2C2C` (Texto oscuro)
- **Text Light**: `#666` (Texto claro)
- **Light Pink**: `#F8F0F2` (Rosa claro para fondos)

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, Grid y Flexbox
- **JavaScript ES6+**: Funcionalidad interactiva con clases
- **Font Awesome**: Iconos
- **Google Fonts**: Typography (Dancing Script + Lato)

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: > 1200px
- **Tablet**: 768px - 1199px
- **Mobile Large**: 481px - 767px
- **Mobile Small**: < 480px

## 🚀 Instrucciones de Uso

1. **Abrir el sitio**: Simplemente abre `index.html` en tu navegador
2. **Explorar talleres**: Navega por los diferentes talleres disponibles
3. **Agregar al carrito**: Haz clic en "Agregar" para añadir talleres al carrito
4. **Ver galería**: Haz clic en cualquier imagen para verla en tamaño completo
5. **Navegación**: Usa el menú del header para ir a diferentes secciones

## ⚙️ Personalización

### Agregar Nuevos Talleres
Edita el archivo `js/data.js` y agrega nuevos objetos al array `talleresData`:

```javascript
{
    id: 7,
    titulo: "Nuevo Taller",
    descripcion: "Descripción del taller",
    precio: 2500,
    imagen: "url_de_la_imagen",
    badge: "Nuevo" // opcional
}
```

### Agregar Nuevas Fotos a la Galería
Edita el archivo `js/data.js` y agrega nuevos objetos al array `galeriaData`:

```javascript
{
    id: 10,
    imagen: "url_de_la_imagen",
    alt: "Descripción de la imagen"
}
```

### Modificar Colores
Edita las variables CSS en `css/main.css`:

```css
:root {
    --primary-color: #TU_COLOR;
    --secondary-color: #TU_COLOR;
    /* ... más variables */
}
```

## 🔮 Funcionalidades Futuras

- [ ] Sistema de búsqueda de talleres
- [ ] Filtros por categoría
- [ ] Integración con pasarela de pagos
- [ ] Sistema de reservas online
- [ ] Blog de recetas
- [ ] Testimonios de clientes
- [ ] Menú hamburguesa para móvil
- [ ] Modo oscuro

## 📞 Contacto

- **WhatsApp**: [Configurar en footer.css]
- **Instagram**: [Configurar en footer.css]

---

**Desarrollado con ❤️ para Delicias Luciana**
