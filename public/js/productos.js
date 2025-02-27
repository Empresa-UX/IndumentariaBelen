document.addEventListener("DOMContentLoaded", async function () {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const categoriaTitulo = document.getElementById("categoria-titulo");
    const categoriaDescripcion = document.getElementById("categoria-descripcion");
    const productoInfo = document.querySelector(".producto-info");
    const volverBtn = document.getElementById("volver-btn");

    let productosData = {};
    let imagenes = [];
    let currentImageIndex = 0;
    let sliderInterval;

    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria")?.trim();
    const subcategoria = params.get("subcategoria")?.trim();

    console.log("🟢 Parámetros recibidos:");
    console.log("   Categoría:", categoria);
    console.log("   Subcategoría:", subcategoria);

    async function cargarProductosDesdeJSON() {
        try {
            const response = await fetch("/data/productos.json");
            if (!response.ok) throw new Error("Error al cargar el JSON");
            productosData = await response.json();
            console.log("📂 JSON cargado correctamente:", productosData);
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
                console.log("🟢 Productos encontrados para la subcategoría:", productosSeleccionados);
            } else {
                console.log("🚫 No se encontraron productos para la subcategoría:", subcategoria);
                categoriaDescripcion.textContent = "🚫 No hay productos disponibles.";
                return;
            }
        } else {
            categoriaTitulo.textContent = `📌 ${categoria}`;
            if (productosData[categoria]) {
                Object.values(productosData[categoria]).forEach((subcat) => {
                    productosSeleccionados.push(...subcat);
                });
                console.log("🟢 Productos encontrados para la categoría:", productosSeleccionados);
            }
        }

        if (productosSeleccionados.length === 0) {
            categoriaDescripcion.textContent = "🚫 No hay productos disponibles.";
            return;
        }

        const producto = productosSeleccionados[0]; // Tomar el primer producto
        categoriaDescripcion.textContent = producto.descripcion;
        imagenes = producto.imagenes || [];

        // ✅ Mostrar imágenes correctamente
        if (imagenes.length > 0) {
            sliderWrapper.innerHTML = imagenes.map((img, index) => `
                <img src="${img}" class="slider-img ${index === 0 ? 'active' : ''}" alt="${producto.nombre}">
            `).join('');
        } else {
            sliderWrapper.innerHTML = `<p class="sin-imagen">🚫 No hay imágenes disponibles</p>`;
        }

        // ✅ Mostrar la información detallada del producto
        productoInfo.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p class="descripcion">${producto.descripcion}</p>
            <p class="precio"><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
            <p class="material"><strong>Material:</strong> ${producto.material}</p>
            <p class="colores"><strong>Colores:</strong> ${producto.colores.join(", ")}</p>
            <p class="talles"><strong>Talles:</strong> ${producto.talles.join(", ")}</p>
        `;

        iniciarAnimacionAutomatica();
    }

    function cambiarImagen(direccion) {
        const images = document.querySelectorAll(".slider-img");
        if (images.length === 0) return;

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
        }, 2500);
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
