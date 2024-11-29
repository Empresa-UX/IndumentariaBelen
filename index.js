const express = require('express');
const path = require('path');
const app = express();

// Configurar la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const images = document.querySelectorAll('.producto-imagen');
let currentImageIndex = 0;

// Cambiar imagen al pasar el mouse sobre las imágenes
images.forEach((image, index) => {
    image.addEventListener('mouseenter', () => {
        images.forEach((img, i) => {
            if (i !== index) {
                img.style.opacity = '0'; // Ocultar imágenes que no están seleccionadas
            }
        });
        image.style.transition = 'opacity 2s ease, transform 2s ease-in-out'; // Hacer la transición más lenta
        image.style.transform = 'scale(1.2)'; // Ampliar la imagen
    });

    image.addEventListener('mouseleave', () => {
        images.forEach((img) => {
            img.style.opacity = '1'; // Mostrar todas las imágenes al quitar el mouse
            img.style.transform = 'scale(1)';
            img.style.transition = 'opacity 2s ease, transform 2s ease-in-out'; // Mantener la transición más lenta
        });
    });
});
