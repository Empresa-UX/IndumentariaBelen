/* Maneja efectos y animaciones en imágenes de productos */

function initProductAnimations() {
    const images = document.querySelectorAll('.producto-imagen');

    images.forEach((image, index) => {
        image.addEventListener('mouseenter', () => {
            images.forEach((img, i) => {
                if (i !== index) img.style.opacity = '0';
            });
            image.style.transition = 'opacity 2s ease, transform 2s ease-in-out';
            image.style.transform = 'scale(1.2)';
        });

        image.addEventListener('mouseleave', () => {
            images.forEach((img) => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                img.style.transition = 'opacity 2s ease, transform 2s ease-in-out';
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", initProductAnimations);
