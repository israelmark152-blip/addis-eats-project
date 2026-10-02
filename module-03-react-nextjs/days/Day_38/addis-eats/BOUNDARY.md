# Addis Eats Component Boundary Decisions

| Component | Runs On | Justification |
| :--- | :--- | :--- |
| `app/layout.js` | Server | Root shell; passes children into `Providers` without importing client state. |
| `app/providers.jsx` | Client | Implements `CartContext` and `useState` for global application state. |
| `app/menu/page.js` | Server | Fetches menu data directly via `async/await`; contains no interactivity. |
| `app/menu/DishList.jsx` | Server | Pure markup rendering array of dishes; ships zero JS to browser. |
| `app/menu/DishCard.jsx` | Server | Presentational component rendering individual dish details. |
| `app/menu/CategoryBar.jsx` | Client | Interactive leaf holding category selection (`useState`) and click handlers (`onClick`). |
| `app/menu/FilterShell.jsx` | Client | Interactive shell holding toggle state; receives server-rendered `DishList` via `children`. |
