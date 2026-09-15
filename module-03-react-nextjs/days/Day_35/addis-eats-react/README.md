# Addis Eats

A React-based food ordering web application designed for customers in Addis Ababa, Ethiopia.

## Project Overview

Addis Eats allows customers to browse food dishes, search and filter the menu, view dish details, add items to a shopping cart, complete checkout, and receive an order confirmation.

The project also includes a basic admin extension for managing menu availability and customer orders.

## Main Features

### Customer Features

* Browse food menu
* Search dishes
* Filter dishes by category
* View individual dish details
* Add dishes to cart
* Increase and decrease quantities
* Remove dishes from cart
* Live cart total in ETB
* Cart persistence using localStorage
* Sign-in protection for checkout
* Checkout form with validation
* Order confirmation
* Empty states
* Loading states
* Error handling
* Responsive design
* Cart item badge

### Admin Features

* Admin login
* Protected admin routes
* Admin dashboard
* View total dishes
* View stock availability
* Mark dishes as in stock or out of stock
* View customer orders
* Update order status
* Admin logout

## Technologies Used

* React
* React Router
* JavaScript
* HTML
* CSS
* Vite
* Context API
* localStorage
* sessionStorage

## Project Structure

```text
src/
├── api/
│   └── dishes.js
│
├── admin/
│   ├── AdminDashboard.jsx
│   ├── AdminLogin.jsx
│   ├── AdminMenu.jsx
│   ├── AdminOrders.jsx
│   ├── Admin.css
│   ├── RequireAdmin.jsx
│   └── StockContext.jsx
│
├── auth/
│   ├── AuthContext.jsx
│   ├── RequireAuth.jsx
│   ├── SignIn.jsx
│   └── SignIn.css
│
├── cart/
│   ├── Cart.jsx
│   ├── Cart.css
│   └── CartContext.jsx
│
├── checkout/
│   ├── Checkout.jsx
│   ├── Checkout.css
│   └── validate.js
│
├── menu/
│   ├── Menu.jsx
│   ├── Menu.css
│   ├── DishDetail.jsx
│   └── DishDetail.css
│
├── ui/
│   └── ErrorBoundary.jsx
│
├── App.jsx
├── Home.jsx
├── Home.css
├── Layout.jsx
├── Layout.css
├── main.jsx
└── index.css

public/
└── menu-data.json
```

## Routes

### Customer Routes

```text
/
 /menu
 /menu/:id
 /cart
 /sign-in
 /checkout
```

### Admin Routes

```text
/admin/login
/admin
/admin/menu
/admin/orders
```

## State Management

The application uses React Context API for shared application state.

### CartContext

Manages:

* Cart items
* Add to cart
* Quantity changes
* Remove from cart
* Clear cart
* Cart total
* Cart item count

Cart data is persisted using `localStorage`.

### AuthContext

Manages customer sign-in state and protects the checkout route.

### StockContext

Manages menu stock availability for the admin section.

Stock availability is persisted using `localStorage`.

## Data Storage

This project uses browser storage for demonstration purposes.

```text
addis-eats-cart
addis-eats-orders
addis-eats-stock
addis-eats-admin
```

Customer orders are stored locally and can be viewed from the admin orders page.

## Admin Demo Login

This project uses a simple demo authentication system for the course project.

```text
Username: admin
Password: admin123
```

In a production application, authentication would be handled by a secure backend authentication system rather than hard-coded credentials.

## Running the Project

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL shown in the terminal, normally:

```text
http://localhost:5173/
```

## Testing

The main customer flow can be tested as follows:

```text
Home
  ↓
Menu
  ↓
Search / Category Filter
  ↓
Dish Detail
  ↓
Add to Cart
  ↓
Cart
  ↓
Checkout
  ↓
Sign In
  ↓
Checkout Form
  ↓
Place Order
  ↓
Order Confirmation
```

The admin flow can be tested as follows:

```text
/admin/login
  ↓
Admin Dashboard
  ↓
Manage Menu
  ↓
Manage Orders
```

## Error and Empty States

The application includes:

* Menu loading state
* Menu loading error
* Empty search/category results
* Empty cart state
* Empty admin orders state
* Invalid dish route handling
* Protected checkout redirect
* Protected admin routes
* Global React error boundary
* 404 page

## Responsive Design

The interface is designed to work across:

* Desktop
* Tablet
* Mobile

CSS media queries are used to adjust layouts for smaller screens.

## Course Project

**Project:** Addis Eats
**Module:** Module 3 — React
**Purpose:** React food ordering application and practical course project
