let cart = [];

// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
const productsContainer = document.querySelector('.products');

// Show/hide cart
cartIcon.addEventListener('click', () => {
  cartOverlay.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
  cartOverlay.style.display = 'none';
});

// Add to cart
productsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const product = e.target;
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    addToCart(id, name, price);
    updateCartUI();
  }
});

// Remove from cart
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.closest('.remove-item')) {
    const id = e.target.closest('.remove-item').dataset.id;
    removeFromCart(id);
    updateCartUI();
  }
});

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
}

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxkFOeBzeYqSJa1PqAZgc2Gf7AR8jwnLndzQ&s" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
      </div>
      <button class="remove-item" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartItemsContainer.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;

  localStorage.setItem('cart', JSON.stringify(cart));
}

function initCart() {
  const saved = localStorage.getItem('cart');
  if (saved) {
    cart = JSON.parse(saved);
    updateCartUI();
  }
}

initCart();
