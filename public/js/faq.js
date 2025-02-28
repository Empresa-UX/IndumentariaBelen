document.addEventListener("DOMContentLoaded", function () {
    const faqBtn = document.getElementById("faq-btn");
    const faqModal = document.getElementById("faq-modal");
    const closeFaq = document.querySelector(".close-faq");
    const faqQuestions = document.querySelectorAll(".faq-question");

    // Verifica si los elementos existen antes de añadir eventos
    if (!faqBtn || !faqModal || !closeFaq) {
        console.error("❌ No se encontró el modal de preguntas frecuentes.");
        return;
    }

    // Mostrar el modal FAQ
    faqBtn.addEventListener("click", function (event) {
        event.preventDefault();
        faqModal.classList.add("active");
    });

    // Cerrar el modal con la X
    closeFaq.addEventListener("click", function () {
        faqModal.classList.remove("active");
    });

    // Cerrar haciendo clic fuera del modal
    faqModal.addEventListener("click", function (event) {
        if (event.target === faqModal) {
            faqModal.classList.remove("active");
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            faqModal.classList.remove("active");
        }
    });

    // Mostrar/Ocultar respuestas al hacer clic en la pregunta
    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            answer.classList.toggle("active");
        });
    });

    console.log("🟢 FAQ.js cargado correctamente.");
});
