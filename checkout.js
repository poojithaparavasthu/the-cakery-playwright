
// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Discount starts at zero
let appliedDiscount = 0;

// Get checkout elements
const checkoutItems = document.getElementById("checkout-items");
const subtotalElement = document.getElementById("checkout-subtotal");
const discountElement = document.getElementById("checkout-discount");
const totalElement = document.getElementById("checkout-total");

// Calculate order subtotal
function calculateSubtotal() {
    return cart.reduce(function(total, cake) {
        return total + cake.price;
    }, 0);
}

// Update checkout totals
function updateCheckoutTotals() {
    const subtotal = calculateSubtotal();
    const finalTotal = subtotal - appliedDiscount;

    subtotalElement.textContent = subtotal.toFixed(2);
    discountElement.textContent = appliedDiscount.toFixed(2);
    totalElement.textContent = finalTotal.toFixed(2);
}

// Display cart products
function displayCheckoutItems() {
    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.textContent = "Your cart is empty.";
        updateCheckoutTotals();
        return;
    }

    cart.forEach(function(cake) {
        const item = document.createElement("div");

        const cakeName = document.createElement("h4");
        cakeName.textContent = cake.name;

        const cakePrice = document.createElement("p");
        cakePrice.textContent = "Price: ₹" + cake.price;

        item.appendChild(cakeName);
        item.appendChild(cakePrice);

        if (cake.customisation) {
            const details = document.createElement("p");

            details.textContent =
                "Flavour: " + cake.customisation.flavour +
                " | Name: " + cake.customisation.cakeName +
                " | Message: " + cake.customisation.message;

            item.appendChild(details);
        }

        checkoutItems.appendChild(item);
    });

    updateCheckoutTotals();
}

// Coupon validation
document.getElementById("apply-coupon").addEventListener("click", function() {

    const couponCode = document.getElementById("coupon-code").value.trim().toUpperCase();
    const couponMessage = document.getElementById("coupon-message");
    const subtotal = calculateSubtotal();

    if (couponCode === "SWEET10" && subtotal >= 1000) {
        appliedDiscount = subtotal * 0.10;

        couponMessage.textContent = "Success! 10% discount applied.";
        couponMessage.style.color = "green";

    } else if (couponCode === "SWEET10" && subtotal < 1000) {
        appliedDiscount = 0;

        couponMessage.textContent = "Minimum order value of ₹1,000 required.";
        couponMessage.style.color = "red";

    } else {
        appliedDiscount = 0;

        couponMessage.textContent = "Invalid coupon code. Please try again.";
        couponMessage.style.color = "red";
    }

    updateCheckoutTotals();
});

// Display products when checkout loads
displayCheckoutItems();

// CUSTOMER AND DELIVERY VALIDATION

document.getElementById("checkout-form").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("delivery-address").value.trim();
    const city = document.getElementById("delivery-city").value.trim();
    const pincode = document.getElementById("delivery-pincode").value.trim();
    const deliveryDate = document.getElementById("delivery-date").value;

    const message = document.getElementById("checkout-message");

    // Name validation
    if (name === "") {
        message.textContent = "Please enter your full name.";
        message.style.color = "red";
        return;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
        message.textContent = "Please enter a valid 10-digit phone number.";
        message.style.color = "red";
        return;
    }

    // Address validation
    if (address === "") {
        message.textContent = "Please enter your delivery address.";
        message.style.color = "red";
        return;
    }

    // City validation
    if (city === "") {
        message.textContent = "Please enter your city.";
        message.style.color = "red";
        return;
    }

    // PIN code validation
    if (!/^[0-9]{6}$/.test(pincode)) {
        message.textContent = "Please enter a valid 6-digit PIN code.";
        message.style.color = "red";
        return;
    }

    // Delivery date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(deliveryDate + "T00:00:00");

    if (!deliveryDate || selectedDate < today) {
        message.textContent = "Please select today or a future delivery date.";
        message.style.color = "red";
        return;
    }

    
// All validations passed — create demo order

if (cart.length === 0) {
    message.textContent = "Your cart is empty. Please add a cake first.";
    message.style.color = "red";
    return;
}

// Save order details before clearing the cart
const orderItems = [...cart];
const orderTotal = calculateSubtotal() - appliedDiscount;

// Generate a demo order ID
const orderId = "CAK" + Date.now().toString().slice(-6);

// Display order ID
document.getElementById("order-id").textContent = orderId;

// Display ordered products
const confirmedDetails = document.getElementById("confirmed-order-details");
confirmedDetails.innerHTML = "";

orderItems.forEach(function(cake) {

    const product = document.createElement("p");
    product.textContent = cake.name + " - ₹" + cake.price;

    if (cake.customisation) {
        product.textContent +=
            " | Personalised for: " + cake.customisation.cakeName;
    }

    confirmedDetails.appendChild(product);
});

// Display final amount
document.getElementById("confirmed-total").textContent =
    orderTotal.toFixed(2);

// Show confirmation and hide checkout form
document.getElementById("order-confirmation").hidden = false;
document.getElementById("checkout-form").hidden = true;

// Clear cart after successful demo order
localStorage.removeItem("cart");
cart = [];

});
