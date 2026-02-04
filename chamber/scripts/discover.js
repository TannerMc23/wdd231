document.addEventListener("DOMContentLoaded", () => {
  const visitMessage = document.querySelector("#visit-message");

  if (!visitMessage) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const currentDate = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor(
      (currentDate - Number(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (daysBetween < 1) {
      visitMessage.textContent = "Welcome back! You visited today.";
    } else if (daysBetween === 1) {
      visitMessage.textContent = "Welcome back! You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `Welcome back! You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentDate);
});