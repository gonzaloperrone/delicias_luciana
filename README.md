# Delicias Luciana - Página Web de Pastelería

## Descripción
Página web 100% responsive para la pastelería "Delicias Luciana" con las siguientes características:

### Funcionalidades Principales:
- **Navbar responsivo** con menú hamburguesa en mobile
- **Sección Hero** con animaciones y efectos decorativos
- **Sección Talleres** con slider de cards que se cargan dinámicamente desde JavaScript
- **Galería de fotos** con slider y modal de expansión
- **Sección Sobre Mí** con información personal
- **Carrito de compras** funcional con cálculo de totales
- **Footer** con información de contacto (Instagram, Email, WhatsApp)

### Características Técnicas:
- Diseño mobile-first y completamente responsive
- Sliders con soporte touch/swipe en mobile
- Modales para carrito y visualización de imágenes
- Animaciones CSS y JavaScript
- Efectos decorativos elegantes
- Optimización de performance con preload de imágenes
- Debounce en eventos de resize

### Estructura de Archivos:
```
delicias_luciana/
├── index.html          # Estructura principal
├── styles.css          # Estilos y diseño responsive
├── script.js           # Funcionalidad JavaScript
├── images/             # Carpeta para imágenes
└── README.md          # Este archivo
```

### Instalación y Uso:
1. Descarga todos los archivos en una carpeta
2. Guarda las imágenes del logo en la carpeta `images/`
3. Actualiza las rutas de las imágenes en el HTML si es necesario
4. Abre `index.html` en tu navegador

### Personalización:
- **Talleres**: Modifica el array `talleresData` en `script.js` para agregar/editar talleres
- **Galería**: Actualiza el array `galeriaData` en `script.js` con las URLs de tus fotos
- **Colores**: Cambia las variables CSS en `:root` en `styles.css`
- **Información de contacto**: Modifica los enlaces en la sección footer del HTML

### Datos de Talleres:
Los talleres se cargan dinámicamente desde el archivo JavaScript. Cada taller tiene:
- ID único
- Título
- Descripción
- Precio
- Imagen

### Funcionalidades del Carrito:
- Agregar talleres al carrito
- Mostrar cantidad de items
- Calcular total automáticamente
- Eliminar items del carrito
- Notificaciones de acciones

### Responsive Design:
- Desktop: 3 talleres visibles en slider, 4 fotos en galería
- Mobile: 1 taller visible, 1 foto visible
- Navegación con botones y soporte touch

### Animaciones:
- Fade in al scroll
- Efectos hover en botones y cards
- Transiciones suaves en sliders
- Animaciones de loading

### Tecnologías Utilizadas:
- HTML5 semántico
- CSS3 con variables y grid/flexbox
- JavaScript vanilla (ES6+)
- Font Awesome para iconos
- Google Fonts (Dancing Script, Poppins)

### Notas:
- Todas las imágenes actualmente usan placeholders de Unsplash
- Reemplaza las URLs con tus propias imágenes
- Los enlaces de contacto son ejemplos, actualízalos con tu información real
- La funcionalidad de "Finalizar Compra" puede expandirse según necesidades
