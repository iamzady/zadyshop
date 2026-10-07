// ZADY ACCESSORIES - JavaScript

const products = [
  { name: "Premium Watch", price: 2999 },
  { name: "Classic Sunglasses", price: 5999 },
  { name: "Luxury Wallet", price: 9999 }
];

let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    alert(name + " added to cart!");
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function openCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "🛍️ ZADY ACCESSORIES ORDER\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
        total += item.price;
    });

    message += `\nTotal: ₹${total}`;
    message += "\n\nThank you for shopping with ZADY ACCESSORIES ❤️";

    const phone = "916385558452";
    const whatsappURL =
        "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

function buyNow(name, price) {
    const message =
        `🛍️ ZADY ACCESSORIES ORDER\n\n` +
        `Product: ${name}\n` +
        `Price: ₹${price}\n\n` +
        `I want to order this product.`;

    const phone = "916385558452";
    const whatsappURL =
        "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

function searchProducts() {
    const searchInput = document.getElementById("search");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();

        if (text.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("active");
    }
}

function closeMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.remove("active");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateCart();

    const searchInput = document.getElementById("search");

    if (searchInput) {
        searchInput.addEventListener("input", searchProducts);
    }

    const menuButton = document.getElementById("menu-button");

    if (menuButton) {
        menuButton.addEventListener("click", toggleMenu);
    }

    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});
