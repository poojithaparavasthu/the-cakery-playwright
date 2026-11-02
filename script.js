
const cakes = [
    { name: "Chocolate Truffle", price: 699, category: "Chocolate", image: "images/chocolate-truffle.jpg", description: "Rich chocolate with silky ganache." },
    { name: "Butterscotch Crunch", price: 749, category: "Birthday", image: "images/butterscotch-crunch.jpg", description: "Creamy sweetness with crunchy praline." },
    { name: "Red Velvet", price: 699, category: "Premium", image: "images/red-velvet.jpg", description: "Soft red sponge with cream cheese." },
    { name: "Blueberry Vanilla", price: 749, category: "Fruit", image: "images/blueberry-vanilla.jpg", description: "Vanilla cream with blueberry goodness." },
    { name: "Chocolate Dream", price: 799, category: "Chocolate", image: "images/chocolate-dream.jpg", description: "A dream come true for chocolate lovers." },
    { name: "Classic Celebration", price: 899, category: "Birthday", image: "images/classic-celebration.jpg", description: "A beautiful cake for special days." },
    { name: "Velvet Romance", price: 849, category: "Premium", image: "images/velvet-romance.jpg", description: "An elegant and creamy delight." },
    { name: "Blueberry Bliss", price: 799, category: "Fruit", image: "images/blueberry-bliss.jpg", description: "Fresh fruity flavours in every bite." },
    { name: "Dark Chocolate", price: 999, category: "Chocolate", image: "images/dark-chocolate.jpg", description: "Deep cocoa flavour and rich layers." },
    { name: "Birthday Special", price: 1099, category: "Birthday", image: "images/birthday-special.jpg", description: "Make birthdays extra memorable." },
    { name: "Mini Velvet Bento", price: 399, category: "Bento", image: "images/mini-velvet-bento.jpg", description: "A little cake for a little celebration." },
    { name: "Mini Chocolate Bento", price: 449, category: "Bento", image: "images/mini-chocolate-bento.jpg", description: "Small in size, big on chocolate." }
];

// Cart and wishlist data
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let selectedCategory = "All";
let showWishlistOnly = false;

// HTML elements
const cakeContainer = document.getElementById("cake-container");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const wishlistToggle = document.getElementById("wishlist-toggle");

// Update cart count
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}


// Birthday cake currently being customised
let pendingBirthdayCake = null;

// Add product to cart
function addToCart(name, price) {

    const selectedCake = cakes.find(cake => cake.name === name);

    // Birthday cakes need customisation
    if (selectedCake && selectedCake.category === "Birthday") {

        pendingBirthdayCake = selectedCake;

        document.getElementById("birthday-cake-name").innerText = name;

        document.getElementById("birthday-modal").hidden = false;

        return;
    }

    // Signature cakes go directly into cart
    cart.push({ name: name, price: price });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " has been added to your cart!");
}


// Add or remove wishlist item
function toggleWishlist(name) {
    if (wishlist.includes(name)) {
        wishlist = wishlist.filter(item => item !== name);
    } else {
        wishlist.push(name);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayCakes();
}

// Display products
function displayCakes() {
    const searchTerm = searchInput.value.toLowerCase();

    let filteredCakes = cakes.filter(cake => {

        const matchesSearch =
            cake.name.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            cake.category === selectedCategory;

        const matchesWishlist =
            !showWishlistOnly ||
            wishlist.includes(cake.name);

        return matchesSearch && matchesCategory && matchesWishlist;
    });

    // Sorting
    const sortValue = sortSelect.value;

    if (sortValue === "low-high") {
        filteredCakes.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        filteredCakes.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
        filteredCakes.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Clear previous products
    cakeContainer.innerHTML = "";

    // Display filtered products
    filteredCakes.forEach(cake => {

        const isWishlisted = wishlist.includes(cake.name);

        cakeContainer.innerHTML += `
            <div class="cake-card">
                <div class="cake-photo">
                    <img src="${cake.image}" alt="${cake.name}">
                </div>

                <h3>${cake.name}</h3>
                <p>${cake.description}</p>

                <div class="cake-price">₹${cake.price}</div>

                <div class="product-actions">
                    <button
                        class="add-btn"
                        onclick="addToCart('${cake.name}', ${cake.price})">
                        Quick Add
                    </button>

                    <button
                        class="wishlist-btn ${isWishlisted ? "selected" : ""}"
                        aria-label="${isWishlisted ? "Remove from" : "Add to"} wishlist: ${cake.name}"
                        aria-pressed="${isWishlisted}"
                        onclick="toggleWishlist('${cake.name}')">
                        ${isWishlisted ? "♥" : "♡"}
                    </button>
                </div>
            </div>
        `;
    });

    // Update result count
    document.getElementById("result-count").innerText =
        `Showing ${filteredCakes.length} of ${cakes.length} cakes`;

    // Show or hide no-results message
    document.getElementById("no-results").hidden =
        filteredCakes.length !== 0;
}

// Category filters
document.querySelectorAll(".category-btn[data-category]").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category-btn[data-category]").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayCakes();
    });
});

// Search
searchInput.addEventListener("input", displayCakes);

// Sorting
sortSelect.addEventListener("change", displayCakes);

// Wishlist view button
wishlistToggle.addEventListener("click", () => {

    showWishlistOnly = !showWishlistOnly;

    // Reset search and category when switching views
    searchInput.value = "";
    selectedCategory = "All";

    document.querySelectorAll(".category-btn[data-category]").forEach(btn => {
        btn.classList.remove("active");
    });

    const allButton = document.querySelector('.category-btn[data-category="All"]');

    if (allButton) {
        allButton.classList.add("active");
    }

    wishlistToggle.innerText = showWishlistOnly
        ? "♡ Show All Cakes"
        : "♡ My Wishlist";

    displayCakes();
});

// Birthday customisation form
const birthdayForm = document.getElementById("birthday-form");
const birthdayModal = document.getElementById("birthday-modal");

birthdayForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!pendingBirthdayCake) return;

    const candleChoice = document.getElementById("candle-choice").value;

    const customisation = {
        flavour: document.getElementById("cake-flavour").value,
        cakeName: document.getElementById("cake-name").value.trim(),
        message: document.getElementById("cake-message").value.trim(),
        candles: candleChoice,
        candleQuantity: candleChoice === "Yes"
            ? Number(document.getElementById("candle-quantity").value)
            : 0,
        instructions: document.getElementById("cake-instructions").value.trim()
    };

    cart.push({
        name: pendingBirthdayCake.name,
        price: pendingBirthdayCake.price,
        customisation: customisation
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    birthdayForm.reset();

    birthdayModal.hidden = true;

    alert("Your personalised " + pendingBirthdayCake.name + " has been added!");

    pendingBirthdayCake = null;
});


// Close customisation popup
document.getElementById("close-birthday-modal").addEventListener("click", function() {

    birthdayModal.hidden = true;
    birthdayForm.reset();
    pendingBirthdayCake = null;

});

// Initial display
updateCartCount();
displayCakes();
