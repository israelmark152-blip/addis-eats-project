# 🍽️ AddisEats - Restaurant & Order Management System

**AddisEats** is a full-featured, responsive web application for browsing local culinary items, managing shopping carts, and tracking restaurant inventory and customer orders via an Admin Portal.

---

## 🚀 Key Features

### 🛒 Customer Interface (`index.html`)
* **Dynamic Menu Rendering:** Displays dishes loaded dynamically from `menu.json` or custom administrative overrides.
* **Live Search & Category Filtering:** Search dishes instantly by name or ingredients, and filter by categories (*Ethiopian, Burgers, Pizza, Drinks*).
* **Persistent Filter Selection:** Retains the customer's active category filter across page reloads using browser storage.
* **Interactive Cart Drawer:** Slide-out modal drawer to adjust item quantities, calculate real-time totals, and process orders.
* **Stock Availability Controls:** Greys out unavailable dishes and disables ordering triggers when an item is marked out of stock.
* **Toast Notification System:** Floating user feedback messages for cart additions and order placement confirmations.

### 🛠️ Admin Portal (`admin-dashboard.html`)
* **Protected Route Emulation:** Checks `sessionStorage` authentication prior to displaying administrative management interfaces.
* **Real-time Overview Metrics:** Displays live counters for total dishes, distinct food categories, and customer order volumes.
* **Full Inventory CRUD:** Create new dishes, edit item details inline, or remove dishes via a custom delete confirmation modal.
* **Inline Form Validation:** Real-time error alerts for missing dish titles, invalid price bounds, or missing asset URLs.
* **Stock Status Toggle:** Instant toggle controls to switch items between **In Stock** and **Out of Stock** states.
* **Order Fulfillment Tracker:** Status selector dropdown in the orders table to move customer orders through `Pending` ➔ `Preparing` ➔ `Completed` stages.
## 🔑 Admin Credentials
* **Login URL:** `/admin-login.html`
* **Username:** `admin` 
* **Password:** `123456`

---

## 🧰 Tech Stack

* **Frontend Structure & Styling:** HTML5, CSS3 (Flexbox & CSS Grid)
* **Application Logic:** Vanilla JavaScript (ES6 Modules & Async/Await)
* **Data Persistence:** Browser `localStorage` (Menu, Cart, Orders) & `sessionStorage` (Admin Auth)

---

## 📂 Project Structure

```text
addis-eats/
├── index.html            # Main customer landing page & menu
├── styles.css            # Customer interface styles & animations
├── app.js                # Customer menu, search, filter, and cart logic
├── admin-dashboard.html  # Admin panel interface
├── admin-login.html      # Admin portal authentication screen
├── admin.css             # Admin dashboard, table, & modal styles
├── admin.js              # Admin CRUD operations, order tracking, & auth logic
└── data/
    └── menu.json         # Base menu seed dataset