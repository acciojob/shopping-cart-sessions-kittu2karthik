// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.querySelector('#product-list');
const shoppingList = document.querySelector('#cart-list');
const clearCartBtn = document.querySelector('#clear-cart-btn');
const addToCartBtn = document.querySelector('.add-to-cart-btn');

let shoppingCart = JSON.parse(sessionStorage.getItem('list')) || [];

// Render product list
function renderProducts() {
  if (productList) {
    productList.innerHTML = '';
    products.forEach((product) => {
      const li = document.createElement('li');
      li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
      productList.appendChild(li);
    });
  }
}

// Render cart list
function renderCart() {
  if (shoppingList) {
    shoppingList.innerHTML = ''; // Corrected typo: innerHMTL -> innerHTML
    shoppingCart.forEach((cartItem) => {
      const li = document.createElement('li');
      li.innerHTML = `${cartItem.name} - $${cartItem.price}`;
      shoppingList.appendChild(li); // Append each li to shoppingList
    });
  }
}


// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (product) {
    shoppingCart.push(product);
    sessionStorage.setItem('list', JSON.stringify(shoppingCart));
    renderCart();
  }
}

function clearCart() {
  sessionStorage.clear();
  shoppingCart.length = 0; // Clear array without reassigning
  renderCart(); // Update cart display
}

// Event delegation for add-to-cart buttons
if (productList) {
  productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const productId = e.target.dataset.id;
      addToCart(productId);
    }
  });
}

// Clear cart button event listener
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', clearCart);
}

// Initial render
renderProducts();
renderCart();