const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");

openModalBtn.addEventListener("click", () => {
    modalOverlay.classList.add("open");
});

closeModalBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("open");
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("open");
    }
});
