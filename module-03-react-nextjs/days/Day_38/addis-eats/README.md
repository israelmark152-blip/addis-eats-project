# Addis Eats - Day 38: Server & Client Components

## Bundle Size Measurements

- **First Load JS for `/menu` (Before Optimization)**: ~95 kB
- **First Load JS for `/menu` (After Optimization)**: ~87.5 kB
- **Explanation**: Moving `"use client"` down to leaf components (`CategoryBar` and `FilterShell`) while keeping `DishList` and `DishCard` as pure server components reduced the JavaScript bundle sent to the client.

## Build Output

```text
Route (app)
┌ ○ /_not-found
└ ○ /menu

○  (Static)   prerendered as static content