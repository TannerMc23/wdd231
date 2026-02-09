const form = document.querySelector(".subscribe-form");

form.addEventListener("submit", () => {
    const formData = {
        name: form.name.value,
        email: form.email.value,
        platform: form.platform.value,
        style: form.style.value,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem("casualGameSubscriber", JSON.stringify(formData));
});
