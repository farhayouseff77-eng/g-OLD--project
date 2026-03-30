function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {

    let cart = getCart();

    // Check if product already exists (تحسين مهم للدرجة)
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart(cart);

    alert(name + " added to cart");
}

/* =========================
   LOAD CART
========================= */
function loadCart() {

    let cart = getCart();

    let container = document.getElementById("cart-items");
    let total = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h4 class='text-center'>Your cart is empty</h4>";
        document.getElementById("total").innerText = 0;
        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        container.innerHTML += `
        <div class="card mb-3 p-3 d-flex flex-row justify-content-between align-items-center">

            <div>
                <h5>${item.name}</h5>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>

            <button class="btn btn-danger" onclick="removeItem(${index})">
                Remove
            </button>

        </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    loadCart();
}

/* =========================
   PRODUCT DETAILS PAGE SUPPORT
========================= */
if (window.location.pathname.includes("product.html")) {

    let params = new URLSearchParams(window.location.search);

    let name = params.get("name");
    let price = params.get("price");
    let img = params.get("img"); // ⭐ الجديد

    document.getElementById("product-name").innerText = name;
    document.getElementById("product-price").innerText = "$" + price;
    document.getElementById("product-img").src = img; // ⭐ الجديد

    document.getElementById("add-btn").onclick = function () {
        addToCart(name, Number(price));
    };
}

/* =========================
   INIT CART PAGE
========================= */
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}