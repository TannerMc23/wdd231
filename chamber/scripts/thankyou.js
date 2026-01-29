const params = new URLSearchParams(window.location.search);

function formatDate(isoString) {
    if (!isoString) return "Not available";

    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short"
    });
}

["fname", "lname", "email", "phone", "business"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = params.get(id) || "Not provided";
    }
});

const timestampSpan = document.getElementById("timestamp");
if (timestampSpan) {
    timestampSpan.textContent = formatDate(params.get("timestamp"));
}