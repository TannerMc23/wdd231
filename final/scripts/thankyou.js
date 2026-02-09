const params = new URLSearchParams(window.location.search);
const storedData = JSON.parse(localStorage.getItem("casualGameSubscriber"));

document.getElementById("displayName").textContent =
    params.get("name") || storedData?.name || "N/A";

document.getElementById("displayEmail").textContent =
    params.get("email") || storedData?.email || "N/A";

document.getElementById("displayPlatform").textContent =
    params.get("platform") || storedData?.platform || "Any";

document.getElementById("displayStyle").textContent =
    params.get("style") || storedData?.style || "Any";
