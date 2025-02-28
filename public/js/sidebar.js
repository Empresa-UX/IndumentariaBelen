function initSidebar() {
    const menuIcon = document.getElementById("menu-icon");
    const sidebar = document.getElementById("sidebar");
    const categoryLinks = document.querySelectorAll(".category-link");
    const subcategoryLinks = document.querySelectorAll(".subcategory-link");

    if (!menuIcon || !sidebar) {
        console.error("🔴 Sidebar o menú no encontrado.");
        return;
    }

    // Abrir/Cerrar el sidebar
    menuIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && event.target !== menuIcon) {
            sidebar.classList.remove("active");
        }
    });

// Expande la categoría cuando se hace clic con animación suave
categoryLinks.forEach(categoryLink => {
    categoryLink.addEventListener("click", function (event) {
        event.preventDefault();
        const subcategoryList = this.parentElement.querySelector(".subcategory-list");

        if (subcategoryList) {
            if (subcategoryList.classList.contains("visible")) {
                subcategoryList.style.maxHeight = "0"; // 🔹 Oculta más rápido
                subcategoryList.classList.remove("visible");
            } else {
                subcategoryList.style.maxHeight = subcategoryList.scrollHeight + "px"; // 🔹 Expande suavemente
                subcategoryList.classList.add("visible");
            }
        }
    });
});


    // Detectar clic en una subcategoría y redirigir correctamente
    subcategoryLinks.forEach((subcategoryLink) => {
        subcategoryLink.addEventListener("click", function (event) {
            event.preventDefault();

            const subcategoria = this.dataset.subcategory;
            const categoria = this.closest(".category-item").querySelector(".category-link").dataset.category;

            if (!categoria || !subcategoria) {
                console.error("❌ Error: No se pudo obtener la categoría o subcategoría.");
                return;
            }

            console.log("🟢 Redirigiendo a:", categoria, "->", subcategoria);
            const url = `/html/productosDesc.html?categoria=${encodeURIComponent(categoria)}&subcategoria=${encodeURIComponent(subcategoria)}`;
            window.location.href = url;
        });
    });
}

document.addEventListener("DOMContentLoaded", initSidebar);

