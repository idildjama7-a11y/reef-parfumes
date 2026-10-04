
const form = document.querySelector(".contact form");

form.addEventListener("submit", function(event) {

    event.preventDefault();

  const name = document.querySelector('.contact input[type="text"]').value.trim();
const message = document.querySelector('.contact textarea').value.trim();

if (name === "" || message === "") {
    alert("Please enter your name and message.");
    return;

    }

    alert("Thank you, " + name + "! Your message has been received.");
    form.reset();

});

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cart.length;

const cartNumber = document.querySelector("#cart-count");
cartNumber.textContent = cartCount;
const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.product;

        cart.push(productName);

        localStorage.setItem("cart", JSON.stringify(cart));

        cartCount++;

        cartNumber.textContent = cartCount;

        

    });

});
const searchInput = document.querySelector("#search-input");
const products = document.querySelectorAll(".product-card");
const noResults = document.querySelector("#no-results");

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();
    let found = 0;

    products.forEach(function(product) {

        const productName = product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchText)) {
            product.style.display = "block";
            found++;
        } else {
            product.style.display = "none";
        }

    });

if (found === 0 && searchText !== "") {
    noResults.style.display = "inline";
} else {
    noResults.style.display = "none";
}
});

const modal = document.querySelector("#product-modal");
const closeModal = document.querySelector("#close-modal");
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});
const detailsButtons = document.querySelectorAll(".details-btn");

detailsButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.product;
        const productDescription = button.dataset.description;
        const productPrice = button.dataset.price;

        const productFragrance = button.dataset.fragrance;
        const productIngredients = button.dataset.ingredients;
        const productSize = button.dataset.size;
        const productLasting = button.dataset.lasting;

        document.querySelector("#modal-name").textContent = productName;
        document.querySelector("#modal-description").textContent = productDescription;
        document.querySelector("#modal-price").textContent = "$" + productPrice;

        document.querySelector("#modal-fragrance").textContent = productFragrance;
        document.querySelector("#modal-ingredients").textContent = productIngredients;
        document.querySelector("#modal-size").textContent = productSize;
        document.querySelector("#modal-lasting").textContent = productLasting;

        modal.style.display = "flex";

    });

});
const decreaseQuantity = document.querySelector("#decrease-quantity");
const increaseQuantity = document.querySelector("#increase-quantity");
const quantity = document.querySelector("#quantity");
const modalOrder = document.querySelector("#modal-order");
modalOrder.addEventListener("click", function() {

    const productName = document.querySelector("#modal-name").textContent;
    const productPrice = document.querySelector("#modal-price").textContent.replace("$", "");
    const selectedQuantity = Number(quantity.textContent);
    if (selectedQuantity === 0) {
    alert("Please select a quantity.");
    return;
}

    for (let i = 0; i < selectedQuantity; i++) {
       cart.push({
    name: productName,
    price: Number(productPrice)
});
        
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    cartCount = cart.length;

    cartNumber.textContent = cartCount;

    quantity.textContent = "0";

    modal.style.display = "none";

});

decreaseQuantity.addEventListener("click", function() {

    let currentQuantity = Number(quantity.textContent);

    if (currentQuantity > 0) {
        currentQuantity--;
        quantity.textContent = currentQuantity;
    }

});

increaseQuantity.addEventListener("click", function() {

    let currentQuantity = Number(quantity.textContent);

    currentQuantity++;
    quantity.textContent = currentQuantity;

});