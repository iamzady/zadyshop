document.addEventListener("DOMContentLoaded", function () {
    console.log("ZADY website loaded successfully");
});
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");

    if (loader) {
        loader.style.display = "none";
    }
});
