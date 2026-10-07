// =====================================================
// ZADY ACCESSORIES - COMPLETE SCRIPT.JS
// =====================================================

const WHATSAPP_NUMBER = "916385558452";

let bag = JSON.parse(localStorage.getItem("zadyBag")) || [];
let wishlist = JSON.parse(localStorage.getItem("zadyWishlist")) || [];
let orders = JSON.parse(localStorage.getItem("zadyOrders")) || [];
let reviews = JSON.parse(localStorage.getItem("zadyReviews")) || [];
let coupons = JSON.parse(localStorage.getItem("zadyCoupons")) || [];

let currentGender = "men";
let currentCategory = "all";
let selectedPayment = "UPI";
let appliedCoupon = null;


// =====================================================
// PRODUCTS
// =====================================================

const products = [
    {
        id: 1,
        name: "Urban Black Shirt",
        category: "dresses",
        gender: "men",
        price: 2999,
        oldPrice: 3999,
        image: ""
    },
    {
        id: 2,
        name: "Classic Silver Chain",
        category: "chains",
        gender: "men",
        price: 2999,
        oldPrice: 3999,
        image: ""
    },
    {
        id: 3,
        name: "Titanium Ring",
        category: "rings",
        gender: "men",
        price: 5999,
        oldPrice: 6999,
        image: ""
    },
    {
        id: 4,
        name: "Premium Black Dress",
        category: "dresses",
        gender: "women",
        price: 5999,
        oldPrice: 7999,
        image: ""
    },
    {
        id: 5,
        name: "Elegant Gold Chain",
        category: "chains",
        gender: "women",
        price: 5999,
        oldPrice: 6999,
        image: ""
    },
    {
        id: 6,
        name: "Elegant Silver Ring",
        category: "rings",
        gender: "women",
        price: 9999,
        oldPrice: 11999,
        image: ""
    },
    {
        id: 7,
        name: "Streetwear Oversized Tee",
        category: "dresses",
        gender: "men",
        price: 2999,
        oldPrice: 3499,
        image: ""
    },
    {
        id: 8,
        name: "Minimal Chain",
        category: "chains",
        gender: "men",
        price: 5999,
        oldPrice: 6999,
        image: ""
    },
    {
        id: 9,
        name: "Luxury Ring",
        category: "rings",
        gender: "men",
        price: 9999,
        oldPrice: 11999,
        image: ""
    },
    {
        id: 10,
        name: "Women Premium Top",
        category: "dresses",
        gender: "women",
        price: 2999,
        oldPrice: 3999,
        image: ""
    },
    {
        id: 11,
        name: "Heart Pendant Chain",
        category: "chains",
        gender: "women",
        price: 5999,
        oldPrice: 7499,
        image: ""
    },
    {
        id: 12,
        name: "Premium Fashion Ring",
        category: "rings",
        gender: "women",
        price: 9999,
        oldPrice: 12999,
        image: ""
    }
];


// =====================================================
// PAGE LOADER
// =====================================================

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.display = "none";
    }

});


// =====================================================
// INITIALIZE WEBSITE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    renderProducts();
    renderNewArrivals();
    updateBagCount();
    updateWishlistCount();
    updateAdminStats();
    generateFakeQR();

    setTimeout(function () {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.style.display = "none";
        }

    }, 1500);

});


// =====================================================
// RENDER PRODUCTS
// =====================================================

function createProductCard(product) {

    const isWishlisted = wishlist.includes(product.id);

    return `
        <div class="product-card">

            <div class="product-image">

                ${
                    product.image
                    ?
                    `<img src="${product.image}" alt="${product.name}">`
                    :
                    `<div class="product-placeholder">
                        <span>◇</span>
                    </div>`
                }

                <button
                    class="wishlist-btn"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.gender.toUpperCase()} / ${product.category.toUpperCase()}
                </div>

                <h3>${product.name}</h3>

                <div class="product-price">

                    <strong>₹${product.price.toLocaleString("en-IN")}</strong>

                    ${
                        product.oldPrice
                        ?
                        `<del>₹${product.oldPrice.toLocaleString("en-IN")}</del>`
                        :
                        ""
                    }

                </div>

                <div class="product-actions">

                    <button
                        class="btn"
                        onclick="viewProduct(${product.id})"
                    >
                        VIEW
                    </button>

                    <button
                        class="btn cyan"
                        onclick="addToBag(${product.id})"
                    >
                        ADD TO BAG
                    </button>

                </div>

            </div>

        </div>
    `;
}


function renderProducts() {

    const bestSellers = document.getElementById("bestSellers");

    if (bestSellers) {

        bestSellers.innerHTML = products
            .slice(0, 6)
            .map(createProductCard)
            .join("");

    }

}


function renderNewArrivals() {

    const newMen = document.getElementById("newMen");
    const newWomen = document.getElementById("newWomen");

    if (newMen) {

        newMen.innerHTML = products
            .filter(product => product.gender === "men")
            .slice(0, 4)
            .map(createProductCard)
            .join("");

    }

    if (newWomen) {

        newWomen.innerHTML = products
            .filter(product => product.gender === "women")
            .slice(0, 4)
            .map(createProductCard)
            .join("");

    }

}


// =====================================================
// CATEGORY
// =====================================================

function showCategory(gender, category) {

    currentGender = gender;
    currentCategory = category;

    const overlay = document.getElementById("categoryOverlay");

    const title = document.getElementById("categoryTitle");

    const kicker = document.getElementById("categoryKicker");

    const categoryProducts = document.getElementById("categoryProducts");

    if (!overlay || !categoryProducts) return;

    const filteredProducts = products.filter(function (product) {

        const genderMatch = product.gender === gender;

        const categoryMatch =
            category === "all" ||
            product.category === category;

        return genderMatch && categoryMatch;

    });

    if (title) {

        title.textContent =
            gender.toUpperCase() +
            (category !== "all"
                ? " — " + category.toUpperCase()
                : "");

    }

    if (kicker) {

        kicker.textContent =
            gender.toUpperCase() + " COLLECTION";

    }

    categoryProducts.innerHTML =
        filteredProducts.length
        ?
        filteredProducts.map(createProductCard).join("")
        :
        `<p>No products found.</p>`;

    overlay.classList.add("active");

}


function categoryFilter(category) {

    showCategory(currentGender, category);

}


// =====================================================
// HERO BUTTON
// =====================================================

function goToGender(gender) {

    const section = document.getElementById(gender);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// PRODUCT DETAIL
// =====================================================

function viewProduct(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    const productView =
        document.getElementById("productView");

    if (!productView) return;

    productView.innerHTML = `

        <div class="product-detail">

            <div class="product-detail-image">

                ${
                    product.image
                    ?
                    `<img src="${product.image}" alt="${product.name}">`
                    :
                    `<div class="product-placeholder">
                        <span>◇</span>
                    </div>`
                }

            </div>

            <div class="product-detail-info">

                <div class="kicker">
                    ${product.gender.toUpperCase()}
                </div>

                <h2>${product.name}</h2>

                <div class="product-price">
                    <strong>
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>

                    ${
                        product.oldPrice
                        ?
                        `<del>
                            ₹${product.oldPrice.toLocaleString("en-IN")}
                        </del>`
                        :
                        ""
                    }

                </div>

                <p>
                    Premium ZADY ${product.category}
                    designed for your everyday style.
                </p>

                <button
                    class="btn cyan"
                    onclick="addToBag(${product.id})"
                >
                    ADD TO BAG
                </button>

            </div>

        </div>
    `;

    openOverlay("productOverlay");

}


// =====================================================
// BAG
// =====================================================

function addToBag(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    bag.push({
        id: product.id,
        name: product.name,
        price: product.price
    });

    saveData();

    updateBagCount();

    showToast(product.name + " added to bag");

}


function removeFromBag(index) {

    bag.splice(index, 1);

    saveData();

    updateBagCount();

    renderBag();

}


function updateBagCount() {

    const count = document.getElementById("bagCount");

    if (count) {

        count.textContent = bag.length;

    }

}


function openBag() {

    renderBag();

    const panel = document.getElementById("bagPanel");

    if (panel) {

        panel.classList.add("active");

    }

}


function closeBag() {

    const panel = document.getElementById("bagPanel");

    if (panel) {

        panel.classList.remove("active");

    }

}


function renderBag() {

    const items = document.getElementById("bagItems");

    const footer = document.getElementById("bagFooter");

    if (!items) return;

    if (bag.length === 0) {

        items.innerHTML = `
            <div style="padding:30px;text-align:center;">
                <h3>Your bag is empty.</h3>
                <p>Add something you love.</p>
            </div>
        `;

        if (footer) footer.innerHTML = "";

        return;

    }

    items.innerHTML = bag.map(function (item, index) {

        return `

            <div class="bag-item">

                <div>

                    <strong>${item.name}</strong>

                    <div>
                        ₹${item.price.toLocaleString("en-IN")}
                    </div>

                </div>

                <button
                    class="icon-btn"
                    onclick="removeFromBag(${index})"
                >
                    ×
                </button>

            </div>

        `;

    }).join("");

    const total = getBagTotal();

    if (footer) {

        footer.innerHTML = `

            <div style="padding:20px;">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:15px;
                ">
                    <strong>TOTAL</strong>
                    <strong>
                        ₹${total.toLocaleString("en-IN")}
                    </strong>
                </div>

                <button
                    class="btn cyan"
                    style="width:100%;"
                    onclick="openCheckout()"
                >
                    CHECKOUT
                </button>

            </div>

        `;

    }

}


function getBagTotal() {

    return bag.reduce(function (total, item) {

        return total + Number(item.price);

    }, 0);

}


// =====================================================
// WISHLIST
// =====================================================

function toggleWishlist(id) {

    const index = wishlist.indexOf(id);

    if (index === -1) {

        wishlist.push(id);

        showToast("Added to wishlist");

    } else {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist");

    }

    saveData();

    updateWishlistCount();

    renderProducts();

}


function updateWishlistCount() {

    const count =
        document.getElementById("wishlistCount");

    if (count) {

        count.textContent = wishlist.length;

    }

}


function openWishlist() {

    const panel =
        document.getElementById("wishlistPanel");

    const items =
        document.getElementById("wishlistItems");

    if (!panel || !items) return;

    const wishProducts =
        products.filter(product =>
            wishlist.includes(product.id)
        );

    if (wishProducts.length === 0) {

        items.innerHTML = `
            <div style="padding:30px;text-align:center;">
                <h3>Your wishlist is empty.</h3>
            </div>
        `;

    } else {

        items.innerHTML =
            wishProducts
                .map(createProductCard)
                .join("");

    }

    panel.classList.add("active");

}


function closeWishlist() {

    const panel =
        document.getElementById("wishlistPanel");

    if (panel) {

        panel.classList.remove("active");

    }

}


// =====================================================
// SEARCH
// =====================================================

function openSearch() {

    openOverlay("searchOverlay");

    const input =
        document.getElementById("searchInput");

    if (input) {

        setTimeout(function () {
            input.focus();
        }, 200);

    }

}


function searchProducts() {

    const input =
        document.getElementById("searchInput");

    const results =
        document.getElementById("searchResults");

    if (!input || !results) return;

    const query =
        input.value.toLowerCase().trim();

    if (!query) {

        results.innerHTML = "";

        return;

    }

    const found =
        products.filter(function (product) {

            return (
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.gender.toLowerCase().includes(query)
            );

        });

    if (found.length === 0) {

        results.innerHTML = `
            <p>No products found.</p>
        `;

        return;

    }

    results.innerHTML =
        found.map(createProductCard).join("");

}


// =====================================================
// ACCOUNT
// =====================================================

function openAccount() {

    const overlay =
        document.getElementById("accountOverlay");

    const content =
        document.getElementById("accountContent");

    if (!overlay || !content) return;

    content.innerHTML = `

        <div class="auth">

            <div class="kicker">
                ZADY ACCESSORIES
            </div>

            <h2>WELCOME.</h2>

            <p>
                Your ZADY account is ready.
            </p>

            <button
                class="btn cyan"
                onclick="showToast('Account feature coming soon')"
            >
                CONTINUE
            </button>

        </div>

    `;

    openOverlay("accountOverlay");

}


// =====================================================
// CHECKOUT
// =====================================================

function openCheckout() {

    if (bag.length === 0) {

        showToast("Your bag is empty");

        return;

    }

    closeBag();

    renderCheckout();

    openOverlay("checkoutOverlay");

}


function renderCheckout() {

    const summary =
        document.getElementById("checkoutSummary");

    if (!summary) return;

    let subtotal = getBagTotal();

    let discount = 0;

    if (appliedCoupon) {

        discount =
            Math.round(
                subtotal * appliedCoupon.discount / 100
            );

    }

    const total =
        Math.max(0, subtotal - discount);

    summary.innerHTML = `

        ${bag.map(function (item) {

            return `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:10px;
                ">

                    <span>${item.name}</span>

                    <strong>
                        ₹${item.price.toLocaleString("en-IN")}
                    </strong>

                </div>

            `;

        }).join("")}

        <hr>

        <div style="
            display:flex;
            justify-content:space-between;
            margin-top:15px;
        ">
            <span>Subtotal</span>
            <strong>
                ₹${subtotal.toLocaleString("en-IN")}
            </strong>
        </div>

        ${
            discount > 0
            ?
            `
            <div style="
                display:flex;
                justify-content:space-between;
                margin-top:10px;
            ">
                <span>Discount</span>
                <strong>
                    -₹${discount.toLocaleString("en-IN")}
                </strong>
            </div>
            `
            :
            ""
        }

        <div style="
            display:flex;
            justify-content:space-between;
            margin-top:15px;
            font-size:18px;
        ">
            <strong>TOTAL</strong>
            <strong>
                ₹${total.toLocaleString("en-IN")}
            </strong>
        </div>

    `;

    renderCoupons();

}


function choosePayment(payment) {

    selectedPayment = payment;

    const upiButton =
        document.getElementById("upiPayment");

    const codButton =
        document.getElementById("codPayment");

    const upiArea =
        document.getElementById("upiArea");

    const codArea =
        document.getElementById("codArea");

    if (upiButton) {

        upiButton.classList.toggle(
            "active",
            payment === "UPI"
        );

    }

    if (codButton) {

        codButton.classList.toggle(
            "active",
            payment === "COD"
        );

    }

    if (upiArea) {

        upiArea.style.display =
            payment === "UPI"
            ? "block"
            : "none";

    }

    if (codArea) {

        codArea.style.display =
            payment === "COD"
            ? "block"
            : "none";

    }

}


// =====================================================
// COUPONS
// =====================================================

function renderCoupons() {

    const container =
        document.getElementById("checkoutCoupons");

    if (!container) return;

    const defaultCoupons = [

        {
            code: "ZADY10",
            discount: 10
        },

        {
            code: "WELCOME",
            discount: 5
        }

    ];

    const allCoupons =
        [...defaultCoupons, ...coupons];

    container.innerHTML =
        allCoupons.map(function (coupon) {

            return `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    padding:10px 0;
                ">

                    <span>
                        <strong>${coupon.code}</strong>
                        — ${coupon.discount}% OFF
                    </span>

                    <button
                        class="btn"
                        onclick="useCoupon('${coupon.code}')"
                    >
                        USE
                    </button>

                </div>

            `;

        }).join("");

}


function useCoupon(code) {

    const allCoupons = [

        {
            code: "ZADY10",
            discount: 10
        },

        {
            code: "WELCOME",
            discount: 5
        },

        ...coupons

    ];

    const coupon =
        allCoupons.find(function (item) {

            return item.code.toUpperCase() ===
                code.toUpperCase();

        });

    if (!coupon) {

        showToast("Invalid coupon");

        return;

    }

    appliedCoupon = coupon;

    renderCheckout();

    showToast(
        coupon.code + " applied successfully"
    );

}


function applyCoupon() {

    const input =
        document.getElementById("couponInput");

    if (!input) return;

    const code =
        input.value.trim().toUpperCase();

    if (!code) {

        showToast("Enter coupon code");

        return;

    }

    useCoupon(code);

}


// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder() {

    const name =
        document.getElementById("checkoutName")?.value.trim();

    const phone =
        document.getElementById("checkoutPhone")?.value.trim();

    const address =
        document.getElementById("checkoutAddress")?.value.trim();

    const pincode =
        document.getElementById("checkoutPincode")?.value.trim();

    const city =
        document.getElementById("checkoutCity")?.value.trim();

    const state =
        document.getElementById("checkoutState")?.value.trim();

    if (
        !name ||
        !phone ||
        !address ||
        !pincode ||
        !city ||
        !state
    ) {

        alert(
            "Please fill all delivery details."
        );

        return;

    }

    if (bag.length === 0) {

        alert("Your bag is empty.");

        return;

    }

    const subtotal = getBagTotal();

    const discount =
        appliedCoupon
        ?
        Math.round(
            subtotal *
            appliedCoupon.discount /
            100
        )
        :
        0;

    const total =
        Math.max(0, subtotal - discount);

    const orderId =
        "ZADY" +
        Date.now().toString().slice(-6);

    const order = {

        id: orderId,

        customer: {
            name,
            phone,
            address,
            pincode,
            city,
            state
        },

        items: [...bag],

        subtotal,

        discount,

        total,

        payment: selectedPayment,

        date: new Date().toLocaleString("en-IN")

    };

    orders.push(order);

    saveData();

    sendOrderToWhatsApp(order);

}


// =====================================================
// WHATSAPP ORDER
// =====================================================

function sendOrderToWhatsApp(order) {

    let message =
        "🛍️ *ZADY ACCESSORIES ORDER*\n\n";

    message +=
        "Order ID: " +
        order.id +
        "\n\n";

    message +=
        "👤 *CUSTOMER DETAILS*\n";

    message +=
        "Name: " +
        order.customer.name +
        "\n";

    message +=
        "Phone: " +
        order.customer.phone +
        "\n";

    message +=
        "Address: " +
        order.customer.address +
        "\n";

    message +=
        "City: " +
        order.customer.city +
        "\n";

    message +=
        "State: " +
        order.customer.state +
        "\n";

    message +=
        "Pincode: " +
        order.customer.pincode +
        "\n\n";

    message +=
        "🛒 *ORDER ITEMS*\n";

    order.items.forEach(function (item, index) {

        message +=
            `${index + 1}. ${item.name} - ₹${item.price}\n`;

    });

    message += "\n";

    message +=
        "Subtotal: ₹" +
        order.subtotal +
        "\n";

    message +=
        "Discount: ₹" +
        order.discount +
        "\n";

    message +=
        "*TOTAL: ₹" +
        order.total +
        "*\n\n";

    message +=
        "Payment: " +
        order.payment +
        "\n\n";

    message +=
        "Thank you for shopping with ZADY ❤️";

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");

    bag = [];

    appliedCoupon = null;

    saveData();

    updateBagCount();

    closeOverlay("checkoutOverlay");

    showToast("Order created successfully");

}


// =====================================================
// FAKE QR
// =====================================================

function generateFakeQR() {

    const qr =
        document.getElementById("fakeQR");

    if (!qr) return;

    qr.innerHTML = "";

    for (let i = 0; i < 81; i++) {

        const cell =
            document.createElement("div");

        const random =
            Math.random() > 0.5;

        cell.style.background =
            random
            ? "#111"
            : "#fff";

        qr.appendChild(cell);

    }

}


// =====================================================
// OVERLAYS
// =====================================================

function openOverlay(id) {

    const overlay =
        document.getElementById(id);

    if (overlay) {

        overlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }

}


function closeOverlay(id) {

    const overlay =
        document.getElementById(id);

    if (overlay) {

        overlay.classList.remove("active");

        document.body.style.overflow = "";

    }

}


// =====================================================
// INSTAGRAM
// =====================================================

function instagramPlaceholder(event) {

    if (event) {

        event.preventDefault();

    }

    alert(
        "Instagram link will be added soon."
    );

}


// =====================================================
// ADMIN
// =====================================================

function openAdmin() {

    openOverlay("adminLoginOverlay");

}


function adminLogin() {

    const username =
        document.getElementById("adminUsername")?.value;

    const password =
        document.getElementById("adminPassword")?.value;

    if (
        username === "admin" &&
        password === "zady123"
    ) {

        closeOverlay("adminLoginOverlay");

        openOverlay("adminOverlay");

        renderAdminProducts();

        updateAdminStats();

        showToast("Admin login successful");

    } else {

        alert("Wrong username or password.");

    }

}


function adminLogout() {

    closeOverlay("adminOverlay");

}


function adminTab(tab, button) {

    document
        .querySelectorAll(".admin-tab")
        .forEach(function (item) {

            item.classList.remove("active");

        });

    if (button) {

        button.classList.add("active");

    }

    const content =
        document.getElementById("adminContent");

    if (!content) return;

    if (tab === "products") {

        renderAdminProducts();

    }

    if (tab === "orders") {

        renderAdminOrders();

    }

    if (tab === "reviews") {

        renderAdminReviews();

    }

    if (tab === "coupons") {

        renderAdminCoupons();

    }

}


function renderAdminProducts() {

    const content =
        document.getElementById("adminContent");

    if (!content) return;

    content.innerHTML = `

        <div class="form-box">

            <h3>PRODUCTS</h3>

            <p>
                Total products:
                <strong>${products.length}</strong>
            </p>

            ${products.map(function (product) {

                return `

                    <div style="
                        padding:12px 0;
                        border-bottom:1px solid #222;
                        display:flex;
                        justify-content:space-between;
                    ">

                        <span>
                            ${product.name}
                        </span>

                        <strong>
                            ₹${product.price}
                        </strong>

                    </div>

                `;

            }).join("")}

        </div>

    `;

}


function renderAdminOrders() {

    const content =
        document.getElementById("adminContent");

    if (!content) return;

    if (orders.length === 0) {

        content.innerHTML = `
            <div class="form-box">
                <h3>ORDERS</h3>
                <p>No orders yet.</p>
            </div>
        `;

        return;

    }

    content.innerHTML = `

        <div class="form-box">

            <h3>ORDERS</h3>

            ${orders.map(function (order) {

                return `

                    <div style="
                        padding:15px 0;
                        border-bottom:1px solid #222;
                    ">

                        <strong>
                            ${order.id}
                        </strong>

                        <p>
                            ${order.customer.name}
                        </p>

                        <p>
                            ₹${order.total}
                        </p>

                        <small>
                            ${order.date}
                        </small>

                    </div>

                `;

            }).join("")}

        </div>

    `;

}


function renderAdminReviews() {

    const content =
        document.getElementById("adminContent");

    if (!content) return;

    content.innerHTML = `

        <div class="form-box">

            <h3>REVIEWS</h3>

            <p>
                Total reviews:
                ${reviews.length}
            </p>

        </div>

    `;

}


function renderAdminCoupons() {

    const content =
        document.getElementById("adminContent");

    if (!content) return;

    content.innerHTML = `

        <div class="form-box">

            <h3>ADD COUPON</h3>

            <input
                class="input"
                id="newCouponCode"
                placeholder="Coupon code"
            >

            <input
                class="input"
                id="newCouponDiscount"
                type="number"
                placeholder="Discount %"
                style="margin-top:10px;"
            >

            <button
                class="btn cyan"
                style="margin-top:10px;"
                onclick="addCoupon()"
            >
                ADD COUPON
            </button>

            <div style="margin-top:20px;">

                ${coupons.map(function (coupon) {

                    return `
                        <p>
                            <strong>${coupon.code}</strong>
                            — ${coupon.discount}% OFF
                        </p>
                    `;

                }).join("")}

            </div>

        </div>

    `;

}


function addCoupon() {

    const code =
        document.getElementById("newCouponCode")?.value
            .trim()
            .toUpperCase();

    const discount =
        Number(
            document.getElementById("newCouponDiscount")?.value
        );

    if (!code || !discount) {

        alert("Enter coupon details.");

        return;

    }

    coupons.push({
        code,
        discount
    });

    saveData();

    renderAdminCoupons();

    updateAdminStats();

    showToast("Coupon added");

}


function updateAdminStats() {

    const statProducts =
        document.getElementById("statProducts");

    const statOrders =
        document.getElementById("statOrders");

    const statReviews =
        document.getElementById("statReviews");

    const statCoupons =
        document.getElementById("statCoupons");

    if (statProducts) {

        statProducts.textContent =
            products.length;

    }

    if (statOrders) {

        statOrders.textContent =
            orders.length;

    }

    if (statReviews) {

        statReviews.textContent =
            reviews.length;

    }

    if (statCoupons) {

        statCoupons.textContent =
            coupons.length + 2;

    }

}


// =====================================================
// TOAST
// =====================================================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) {

        alert(message);

        return;

    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


// =====================================================
// LOCAL STORAGE
// =====================================================

function saveData() {

    localStorage.setItem(
        "zadyBag",
        JSON.stringify(bag)
    );

    localStorage.setItem(
        "zadyWishlist",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "zadyOrders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "zadyReviews",
        JSON.stringify(reviews)
    );

    localStorage.setItem(
        "zadyCoupons",
        JSON.stringify(coupons)
    );

}


// =====================================================
// ESC KEY
// =====================================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        document
            .querySelectorAll(".overlay.active")
            .forEach(function (overlay) {

                overlay.classList.remove("active");

            });

        document
            .querySelectorAll(".side-panel.active")
            .forEach(function (panel) {

                panel.classList.remove("active");

            });

        document.body.style.overflow = "";

    }

});


// =====================================================
// OVERLAY BACKDROP CLICK
// =====================================================

document.addEventListener("click", function (event) {

    if (
        event.target.classList.contains("overlay")
    ) {

        event.target.classList.remove("active");

        document.body.style.overflow = "";

    }

});


// =====================================================
// FINAL SAFETY LOADER
// =====================================================

setTimeout(function () {

    const loader =
        document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

}, 3000);
