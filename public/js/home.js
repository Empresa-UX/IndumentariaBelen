document.addEventListener("DOMContentLoaded", function () {
    const categoriasTooltip = document.querySelector(".tooltip-categorias");
    const whatsappTooltip = document.querySelector(".tooltip-whatsapp");
    
    // Mostrar los globos con un pequeño retraso
    setTimeout(() => {
        categoriasTooltip.classList.add("show");
        whatsappTooltip.classList.add("show");
    }, 500); // Aparecen 0.5 segundos después de cargar la página

    // Ahora establecemos que los globos se oculten después de 10 segundos
    setTimeout(() => {
        categoriasTooltip.classList.remove("show");
        whatsappTooltip.classList.remove("show");
    }, 10500); // 10.5 segundos después de mostrar (por lo que se mantiene durante 10 segundos completos)

    // Selecciona todos los tooltips
    const tooltips = document.querySelectorAll('.tooltip');
    
    // Agrega un evento para cada tooltip
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('animationend', () => {
            // Elimina el tooltip después de la animación
            tooltip.remove();
        });
    });
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

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");
    const categoryItems = document.querySelectorAll(".category-item");
    const subcategoryItems = document.querySelectorAll(".subcategory-item");

    // Abrir/Cerrar el sidebar
    menuIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        sidebar.classList.toggle("active");
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && event.target !== menuIcon) {
            sidebar.classList.remove("active");
        }
    });

    // Función para limpiar el nombre de la categoría correctamente
    function getCleanText(element) {
        return element.firstChild.textContent.trim();
    }

    // Verificar si cada categoría tiene subcategorías
    categoryItems.forEach((category) => {
        const subcategoryList = category.querySelector(".subcategory-list");

        if (!subcategoryList || subcategoryList.children.length === 0) {
            // Si no hay subcategorías, agrega el mensaje
            const noSubcategory = document.createElement("span");
            noSubcategory.classList.add("no-subcategory");
            noSubcategory.textContent = "Sin subcategorías";
            category.appendChild(noSubcategory);
        } else {
            // Agregar evento de clic para expandir subcategorías
            category.addEventListener("click", function (event) {
                event.stopPropagation();
                subcategoryList.classList.toggle("visible");
            });
        }
    });

    // Detectar doble clic en una categoría para redirigir a productos.html
    categoryItems.forEach((category) => {
        category.addEventListener("dblclick", function () {
            const categoria = getCleanText(this);
            console.log("🟢 Categoría seleccionada:", categoria);

            const url = `/html/productos.html?categoria=${encodeURIComponent(categoria)}`;
            window.location.href = url;
        });
    });

    // Detectar doble clic en una subcategoría para redirigir a productos.html con subcategoría
    subcategoryItems.forEach((subcategory) => {
        subcategory.addEventListener("dblclick", function () {
            const subcategoria = subcategory.textContent.trim();
            const categoria = getCleanText(subcategory.closest(".category-item"));
            
            console.log("🟢 Subcategoría seleccionada:", categoria, "->", subcategoria);

            const url = `/html/productos.html?categoria=${encodeURIComponent(categoria)}&subcategoria=${encodeURIComponent(subcategoria)}`;
            window.location.href = url;
        });
    });
});

document.addEventListener("DOMContentLoaded", async function () {
    const productosGrid = document.getElementById("productos-grid");
    const categoriaTitulo = document.getElementById("categoria-titulo");
    const categoriaDescripcion = document.getElementById("categoria-descripcion");
    const sliderContainer = document.getElementById("slider-container");

    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");
    const subcategoria = params.get("subcategoria");

    async function cargarProductosDesdeJSON() {
        try {
            const response = await fetch("/data/productos.json");
            if (!response.ok) throw new Error("Error al cargar el JSON");
            const productosData = await response.json();

            let productosMostrar = [];

            if (categoria && subcategoria) {
                categoriaTitulo.textContent = subcategoria;
                productosMostrar = productosData[categoria]?.[subcategoria] || [];
            } else if (categoria) {
                categoriaTitulo.textContent = categoria;
                Object.values(productosData[categoria] || {}).forEach(arr => productosMostrar.push(...arr));
            }

            if (productosMostrar.length > 0) {
                categoriaDescripcion.textContent = productosMostrar[0].descripcion || "Sin descripción.";
                cargarSlider(productosMostrar[0].imagenes);
            } else {
                categoriaDescripcion.textContent = "No hay productos disponibles.";
            }
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    }

    function cargarSlider(imagenes) {
        sliderContainer.innerHTML = "";
        imagenes.forEach(img => {
            const imgElement = document.createElement("img");
            imgElement.src = img;
            imgElement.alt = "Imagen del producto";
            sliderContainer.appendChild(imgElement);
        });
    }

    // Función para controlar el slider
    function moverSlider(direccion) {
        const desplazamiento = 100; // Cantidad de desplazamiento en px
        sliderContainer.style.transform = `translateX(${direccion * desplazamiento}px)`;
    }

    document.querySelector(".left-btn").addEventListener("click", () => moverSlider(1));
    document.querySelector(".right-btn").addEventListener("click", () => moverSlider(-1));

    cargarProductosDesdeJSON();
});
