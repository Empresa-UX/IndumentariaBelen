/* Maneja la barra de búsqueda */

function initSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");

    if (!searchInput || !searchIcon) {
        console.error("🔴 No se encontraron los elementos de búsqueda.");
        return;
    }

    searchIcon.addEventListener("click", function () {
        searchInput.classList.add("active");
        searchIcon.classList.add("hidden");
        searchInput.focus();
    });

    document.addEventListener("click", function (event) {
        const isClickInside = searchInput.contains(event.target) || searchIcon.contains(event.target);

        if (!isClickInside) {
            searchInput.classList.remove("active");
            searchIcon.classList.remove("hidden");
        }
    });

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            searchInput.classList.remove("active");
            searchIcon.classList.remove("hidden");
        }
    });
}

document.addEventListener("DOMContentLoaded", initSearch);
