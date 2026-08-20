// 21. Protected Route Emulation
if (sessionStorage.getItem('addis_admin_auth') !== 'true') {
  window.location.href = 'admin-login.html';
}

let menuItems = JSON.parse(localStorage.getItem('addis_menu_override')) || [];
let orders = JSON.parse(localStorage.getItem('addis_orders')) || [];
let pendingDeleteId = null;

// Toast Notification Helper
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

document.addEventListener('DOMContentLoaded', async () => {
  if (!menuItems.length) {
    try {
      const res = await fetch('./data/menu.json');
      menuItems = await res.json();
      saveMenuItems();
    } catch (e) {
      console.error('Failed to initialize menu data', e);
    }
  }

  initDashboard();
  setupEventListeners();
  setupModalEvents();
});

function saveMenuItems() {
  localStorage.setItem('addis_menu_override', JSON.stringify(menuItems));
}

function initDashboard() {
  renderStats();
  renderInventoryTable();
  renderOrdersTable();
}

// Dashboard Overview Stats
function renderStats() {
  const statItems = document.getElementById('stat-total-items');
  const statCats = document.getElementById('stat-categories');
  const statOrders = document.getElementById('stat-orders');

  if (statItems) statItems.textContent = menuItems.length;
  if (statCats) {
    const categories = new Set(menuItems.map(item => item.category.toLowerCase()));
    statCats.textContent = categories.size;
  }
  if (statOrders) statOrders.textContent = orders.length;
}

// Inventory Table Rendering
function renderInventoryTable() {
  const tbody = document.getElementById('inventory-tbody');
  if (!tbody) return;
  
  if (!menuItems.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">No menu items found.</td></tr>`;
    return;
  }

  tbody.innerHTML = menuItems.map(item => `
    <tr>
      <td><img src="${item.image}" alt="${item.name}" class="table-img" /></td>
      <td><strong>${item.name}</strong></td>
      <td><span class="badge">${item.category}</span></td>
      <td>${item.price} ETB</td>
      <td>
        <button class="status-btn ${item.outOfStock ? 'out' : 'in'}" onclick="toggleAvailability(${item.id})">
          ${item.outOfStock ? 'Out of Stock' : 'In Stock'}
        </button>
      </td>
      <td>
        <button class="action-btn edit" onclick="editDish(${item.id})">Edit</button>
        <button class="action-btn delete" onclick="deleteDish(${item.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Orders Management Table Rendering with Status Tracker Dropdown
function renderOrdersTable() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;

  if (!orders.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center">No incoming orders recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(order => {
    const status = order.status || 'Pending';
    const statusClass = status.toLowerCase();

    return `
      <tr>
        <td>#${order.id.toString().slice(-5)}</td>
        <td>${order.date}</td>
        <td>${order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</td>
        <td><strong>${order.total} ETB</strong></td>
        <td>
          <select class="status-select ${statusClass}" onchange="updateOrderStatus(${order.id}, this.value)">
            <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Preparing" ${status === 'Preparing' ? 'selected' : ''}>Preparing</option>
            <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

// Order Status Tracker Update
window.updateOrderStatus = function(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem('addis_orders', JSON.stringify(orders));
    renderOrdersTable();
    showToast(`Order #${orderId.toString().slice(-5)} marked as ${newStatus}`, 'info');
  }
};

// Add & Edit Dish Handler with Form Validation
function setupEventListeners() {
  const form = document.getElementById('dish-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('dish-id').value;
    const name = document.getElementById('dish-name').value.trim();
    const category = document.getElementById('dish-category').value;
    const price = Number(document.getElementById('dish-price').value);
    const image = document.getElementById('dish-image').value.trim();
    const description = document.getElementById('dish-description').value.trim();
    const ingredientsRaw = document.getElementById('dish-ingredients').value;

    // Reset validation errors
    clearFormErrors();

    // Field Validation Checks
    let isValid = true;
    if (!name) {
      showError('dish-name', 'err-name', 'Please enter a dish name.');
      isValid = false;
    }
    if (!price || price <= 0) {
      showError('dish-price', 'err-price', 'Price must be greater than 0.');
      isValid = false;
    }
    if (!image) {
      showError('dish-image', 'err-image', 'Please enter an image path.');
      isValid = false;
    }

    if (!isValid) return;

    const ingredients = ingredientsRaw.split(',').map(s => s.trim()).filter(Boolean);

    if (id) {
      // Edit mode
      const index = menuItems.findIndex(item => item.id === Number(id));
      if (index !== -1) {
        menuItems[index] = { ...menuItems[index], name, category, price, image, description, ingredients };
        showToast(`Updated "${name}" successfully!`, 'success');
      }
    } else {
      // Add mode
      const newDish = {
        id: Date.now(),
        name,
        category,
        price,
        image,
        description,
        ingredients,
        outOfStock: false
      };
      menuItems.push(newDish);
      showToast(`Added "${name}" to menu!`, 'success');
    }

    saveMenuItems();
    resetForm();
    initDashboard();
  });

  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) cancelBtn.addEventListener('click', resetForm);

  // Logout Handler
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('addis_admin_auth');
      window.location.href = 'admin-login.html';
    });
  }
}

// Inline Form Error Display
function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errEl = document.getElementById(errorId);
  if (input) input.classList.add('input-error');
  if (errEl) {
    errEl.textContent = message;
    errEl.style.display = 'block';
  }
}

function clearFormErrors() {
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
}

// Inline Edit Form Filler
window.editDish = function(id) {
  const item = menuItems.find(i => i.id === id);
  if (!item) return;

  clearFormErrors();
  document.getElementById('form-title').textContent = 'Edit Dish';
  document.getElementById('dish-id').value = item.id;
  document.getElementById('dish-name').value = item.name;
  document.getElementById('dish-category').value = item.category.toLowerCase();
  document.getElementById('dish-price').value = item.price;
  document.getElementById('dish-image').value = item.image;
  document.getElementById('dish-description').value = item.description;
  document.getElementById('dish-ingredients').value = item.ingredients ? item.ingredients.join(', ') : '';

  document.getElementById('save-btn').textContent = 'Update Dish';
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) cancelBtn.classList.remove('hidden');
};

// Custom Delete Modal Trigger
window.deleteDish = function(id) {
  pendingDeleteId = id;
  const modal = document.getElementById('delete-modal');
  if (modal) modal.classList.remove('hidden');
};

// Custom Delete Modal Handler Setup
function setupModalEvents() {
  const cancelBtn = document.getElementById('cancel-delete-btn');
  const confirmBtn = document.getElementById('confirm-delete-btn');
  const modal = document.getElementById('delete-modal');

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      pendingDeleteId = null;
      if (modal) modal.classList.add('hidden');
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (pendingDeleteId !== null) {
        const item = menuItems.find(i => i.id === pendingDeleteId);
        menuItems = menuItems.filter(i => i.id !== pendingDeleteId);
        saveMenuItems();
        initDashboard();
        showToast(`Deleted "${item ? item.name : 'item'}"`, 'error');
        pendingDeleteId = null;
      }
      if (modal) modal.classList.add('hidden');
    });
  }
}

// Availability Toggle Switch
window.toggleAvailability = function(id) {
  const item = menuItems.find(i => i.id === id);
  if (item) {
    item.outOfStock = !item.outOfStock;
    saveMenuItems();
    initDashboard();
    showToast(`"${item.name}" marked as ${item.outOfStock ? 'Out of Stock' : 'In Stock'}`, 'info');
  }
};

function resetForm() {
  clearFormErrors();
  document.getElementById('dish-form').reset();
  document.getElementById('dish-id').value = '';
  document.getElementById('form-title').textContent = 'Add New Dish';
  document.getElementById('save-btn').textContent = 'Save Dish';
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) cancelBtn.classList.add('hidden');
}