document.addEventListener("DOMContentLoaded", async function () {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const categoriaTitulo = document.getElementById("categoria-titulo");
    const categoriaDescripcion = document.getElementById("categoria-descripcion");
    const volverBtn = document.getElementById("volver-btn");

    let productosData = {};
    let imagenes = [];
    let currentImageIndex = 0;
    let sliderInterval;

    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");
    const subcategoria = params.get("subcategoria");

    async function cargarProductosDesdeJSON() {
        try {
            const response = await fetch("/data/productos.json");
            if (!response.ok) throw new Error("Error al cargar el JSON");
            productosData = await response.json();

            mostrarProductos();
        } catch (error) {
            console.error("❌ Error al cargar el JSON:", error);
            categoriaTitulo.textContent = "Error al cargar los productos.";
        }
    }

    function mostrarProductos() {
        if (!categoria) {
            categoriaTitulo.textContent = "⚠ Error: No se seleccionó una categoría.";
            return;
        }

        let productosSeleccionados = [];

        if (subcategoria) {
            categoriaTitulo.textContent = `📌 ${subcategoria}`;
            if (productosData[categoria] && productosData[categoria][subcategoria]) {
                productosSeleccionados = productosData[categoria][subcategoria];
            }
        } else {
            categoriaTitulo.textContent = `📌 ${categoria}`;
            if (productosData[categoria]) {
                Object.values(productosData[categoria]).forEach((subcat) => {
                    productosSeleccionados.push(...subcat);
                });
            }
        }

        if (productosSeleccionados.length === 0) {
            categoriaDescripcion.textContent = "🚫 No hay productos disponibles.";
            return;
        }

        const producto = productosSeleccionados[0]; 
        categoriaDescripcion.textContent = producto.descripcion;

        imagenes = producto.imagenes || [];

        sliderWrapper.innerHTML = imagenes.map((img, index) => `
            <img src="${img}" class="slider-img ${index === 0 ? 'active' : ''}" alt="${producto.nombre}">
        `).join('');

        iniciarAnimacionAutomatica();
    }

    function cambiarImagen(direccion) {
        const images = document.querySelectorAll(".slider-img");
        images[currentImageIndex].classList.remove("active");

        currentImageIndex += direccion;
        if (currentImageIndex < 0) currentImageIndex = images.length - 1;
        if (currentImageIndex >= images.length) currentImageIndex = 0;

        images[currentImageIndex].classList.add("active");
    }

    function iniciarAnimacionAutomatica() {
        if (sliderInterval) clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            cambiarImagen(1);
        }, 2500); // Cambia cada 2 segundos
    }

    rightBtn.addEventListener("click", () => {
        cambiarImagen(1);
        iniciarAnimacionAutomatica();
    });

    leftBtn.addEventListener("click", () => {
        cambiarImagen(-1);
        iniciarAnimacionAutomatica();
    });

    volverBtn.addEventListener("click", () => window.history.back());

    cargarProductosDesdeJSON();
});
