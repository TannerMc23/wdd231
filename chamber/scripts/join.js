document.addEventListener("DOMContentLoaded", () => {

    const modalLinks = document.querySelectorAll(".modal-link");

    modalLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const modalId = link.dataset.modal;
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.showModal();
            }
        });
    });

    const closeButtons = document.querySelectorAll(".close-modal");

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const dialog = button.closest("dialog");
            if (dialog) {
                dialog.close();
            }
        });
    });

});

