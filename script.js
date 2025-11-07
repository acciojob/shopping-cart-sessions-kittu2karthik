// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize shopping cart from sessionStorage or empty array
let shoppingCartList = JSON.parse(sessionStorage.getItem('cart')) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = '';
  shoppingCartList.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (product && !shoppingCartList.some(item => item.id === product.id)) {
    shoppingCartList.push(product);
    sessionStorage.setItem('cart', JSON.stringify(shoppingCartList));
    renderCart();
  }
}

// Clear cart
function clearCart() {
  shoppingCartList = [];
  sessionStorage.setItem('cart', JSON.stringify(shoppingCartList));
  renderCart();
}

// Event listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = e.target.dataset.id;
    addToCart(productId);
  }
});

clearCartBtn.addEventListener('click', clearCart);

// Initial render
renderProducts();
renderCart();