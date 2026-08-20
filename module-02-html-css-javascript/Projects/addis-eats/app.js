// State Management
let menuItems = [];
let cart = JSON.parse(localStorage.getItem('addis_cart')) || [];

// Toast Notification System Helper
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2500);
}

// Initialize DOM
document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
  setupEventListeners();
  updateCartUI();
});

// Fetch Data or Load Overrides from Admin
async function loadMenu() {
  const localMenu = localStorage.getItem('addis_menu_override');

  if (localMenu) {
    menuItems = JSON.parse(localMenu);
    applySavedFilterAndRender();
  } else {
    try {
      const response = await fetch('./data/menu.json');
      if (!response.ok) throw new Error('Failed to load menu data');
      menuItems = await response.json();
      localStorage.setItem('addis_menu_override', JSON.stringify(menuItems));
      applySavedFilterAndRender();
    } catch (error) {
      console.error("Error loading menu:", error);
      document.getElementById('menu-container').innerHTML = 
        `<p class="empty-msg">Could not load menu items. Please ensure menu.json path is correct.</p>`;
    }
  }
}

// Restore saved category selection on load
function applySavedFilterAndRender() {
  const savedCategory = localStorage.getItem('addis_active_category') || 'all';
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    if (btn.dataset.category === savedCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  filterAndRenderMenu();
}

// Filter and Live Search Combined Logic
function filterAndRenderMenu() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeCategory = activeBtn ? activeBtn.dataset.category : 'all';

  const filtered = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query) || 
                          (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(query)));
    const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  renderMenu(filtered);
}

// Render Cards to Grid View (Includes Out-of-Stock handling)
function renderMenu(items) {
  const container = document.getElementById('menu-container');
  if (!container) return;
  
  if (!items.length) {
    container.innerHTML = `<p class="empty-msg">No menu items found.</p>`;
    return;
  }

  container.innerHTML = items.map(item => {
    const isOutOfStock = item.outOfStock === true;

    return `
      <div class="card ${isOutOfStock ? 'out-of-stock-card' : ''}" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="card-body">
          <h3>${item.name}</h3>
          <p class="description">${item.description}</p>
          <div class="ingredients">
            ${item.ingredients ? item.ingredients.map(ing => `<span class="badge">${ing}</span>`).join('') : ''}
          </div>
          <div class="card-footer">
            <span class="price">${item.price} ETB</span>
            <button 
              class="add-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
              ${isOutOfStock ? 'disabled' : ''} 
              onclick="addToCart(${item.id})">
              ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Filter and Live Search Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', filterAndRenderMenu);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Save filter selection to localStorage
      localStorage.setItem('addis_active_category', btn.dataset.category);
      filterAndRenderMenu();
    });
  });

  const cartBtn = document.getElementById('cart-btn');
  const closeCart = document.getElementById('close-cart');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cartBtn) cartBtn.addEventListener('click', toggleCartModal);
  if (closeCart) closeCart.addEventListener('click', toggleCartModal);
  if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);
}

// Add to Cart Handler
window.addToCart = function(id) {
  const item = menuItems.find(p => p.id === id);
  if (!item || item.outOfStock) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveAndRefreshCart();
  showToast(`Added "${item.name}" to cart!`, 'success');
};

// Quantity Adjusters (+ / -)
window.changeQuantity = function(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  saveAndRefreshCart();
};

// LocalStorage Synchronization
function saveAndRefreshCart() {
  localStorage.setItem('addis_cart', JSON.stringify(cart));
  updateCartUI();
}

// UI Sync
function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const itemsContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (!countEl || !itemsContainer || !totalEl) return;

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  countEl.textContent = totalCount;
  totalEl.textContent = totalPrice;

  if (!cart.length) {
    itemsContainer.innerHTML = `<p class="empty-msg">Your cart is currently empty.</p>`;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price} ETB × ${item.quantity}</p>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
}

// Toggle Cart Modal View
function toggleCartModal() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.toggle('hidden');
}

// Simulated Checkout Handler
function handleCheckout() {
  if (!cart.length) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  const existingOrders = JSON.parse(localStorage.getItem('addis_orders')) || [];
  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: [...cart],
    total: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
    status: 'Pending' // Default status for admin tracker
  };

  existingOrders.push(newOrder);
  localStorage.setItem('addis_orders', JSON.stringify(existingOrders));

  cart = [];
  saveAndRefreshCart();
  toggleCartModal();

  showToast('Order placed successfully!', 'success');
}