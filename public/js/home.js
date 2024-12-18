document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar los elementos del campo de búsqueda
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");

    // Mostrar el campo de búsqueda
    searchIcon.addEventListener("click", function () {
        searchInput.classList.add("active");
        searchIcon.classList.add("hidden");
        searchInput.focus(); // Llevar el foco al input
    });

    // Ocultar el campo de búsqueda al hacer clic fuera
    document.addEventListener("click", function (event) {
        const isClickInside = searchInput.contains(event.target) || searchIcon.contains(event.target);

        if (!isClickInside) {
            searchInput.classList.remove("active");
            searchIcon.classList.remove("hidden");
        }
    });

    // Ocultar el campo al presionar Escape
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            searchInput.classList.remove("active");
            searchIcon.classList.remove("hidden");
        }
    });

    // Seleccionar todas las imágenes con la clase '.producto-imagen'
    const images = document.querySelectorAll('.producto-imagen');
    let currentImageIndex = 0;

    // Agregar efectos de hover a las imágenes
    images.forEach((image, index) => {
        image.addEventListener('mouseenter', () => {
            images.forEach((img, i) => {
                if (i !== index) {
                    img.style.opacity = '0';
                }
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
});