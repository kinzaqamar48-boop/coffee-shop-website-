// =========================
// SHOPPING CART
// =========================

let cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];


// =========================
// SAVE CART
// =========================

function saveCart() {
    localStorage.setItem("coffeeCart", JSON.stringify(cart));
}


// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    const cartSection = document.getElementById("cart");

    if (cartSection) {
        cartSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// =========================
// UPDATE CART
// =========================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        updateCheckout();
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty ☕
            </p>
        `;

        if (cartCount) {
            cartCount.textContent = "0";
        }

        const navCartCount =
         document.getElementById("nav-cart-count");

        if (navCartCount) {
            navCartCount.textContent = "0";
        }

        if (cartTotal) {
            cartTotal.textContent = "Rs. 0";
        }

        updateCheckout();

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        totalItems += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Rs. ${item.price} × ${item.quantity}
                </p>

            </div>


            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <div class="cart-item-price">

                Rs. ${item.price * item.quantity}

            </div>


            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    const navCartCount =
    document.getElementById("nav-cart-count");

if (navCartCount) {
    navCartCount.textContent = totalItems;
}

    if (cartTotal) {
        cartTotal.textContent = `Rs. ${total}`;
    }


    updateCheckout();
}


// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    updateCart();
}


// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    updateCart();
}


// =========================
// REMOVE ITEM
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();
}


// =========================
// CATEGORY FILTER
// =========================

function filterMenu(category, button) {

    const cards = document.querySelectorAll(".menu-card");

    const buttons = document.querySelectorAll(".category-btn");


    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    if (button) {
        button.classList.add("active");
    }


    cards.forEach(card => {

        const cardCategory = card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// =========================
// UPDATE CHECKOUT
// =========================

function updateCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const totalElement =
        document.getElementById("checkout-total");


    if (!checkoutItems) {
        return;
    }


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="empty-summary">
                Your cart is empty.
            </p>
        `;

        subtotalElement.textContent = "Rs. 0";
        totalElement.textContent = "Rs. 0";

        return;
    }


    checkoutItems.innerHTML = "";


    let subtotal = 0;


    cart.forEach(item => {

        subtotal += item.price * item.quantity;


        const itemElement =
            document.createElement("div");


        itemElement.classList.add("checkout-item");


        itemElement.innerHTML = `

            <div class="checkout-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>


            <div class="checkout-item-price">

                Rs. ${item.price * item.quantity}

            </div>

        `;


        checkoutItems.appendChild(itemElement);

    });


    const delivery = 150;

    const total = subtotal + delivery;


    subtotalElement.textContent =
        `Rs. ${subtotal}`;

    totalElement.textContent =
        `Rs. ${total}`;

}


// =========================
// PLACE ORDER
// =========================

const orderForm =
    document.getElementById("order-form");


if (orderForm) {

    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a coffee first ☕"
            );

            return;
        }


        const name =
            document.getElementById("name").value;


        alert(
            `Thank you, ${name}! ☕🤎\n\n` +
            `Your order has been placed successfully.\n\n` +
            `We will contact you shortly.`
        );


        cart = [];

        saveCart();

        updateCheckout();

        orderForm.reset();

    });

}


// =========================
// PAGE LOAD
// =========================

document.addEventListener("DOMContentLoaded", function() {

    updateCart();

    updateCheckout();

});
// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const successMessage =
            document.getElementById("contact-success");

        successMessage.classList.add("show");

        contactForm.reset();

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}
// =========================
// MOBILE MENU
// =========================

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function() {

        navMenu.classList.toggle("show");

    });

} 
// =========================
// EMPTY CART
// =========================

const emptyCartBtn =
    document.getElementById("empty-cart-btn");

if (emptyCartBtn) {

    emptyCartBtn.addEventListener("click", function() {

        if (cart.length === 0) {
            alert("Your cart is already empty.");
            return;
        }

        const confirmClear =
            confirm("Are you sure you want to empty your cart?");

        if (confirmClear) {

            cart = [];

            localStorage.setItem(
                "coffeeCart",
                JSON.stringify(cart)
            );

            updateCart();

        }

    });

}