## Day 32: State Management Architecture

### Why the Cart is in a Zustand Store
- **Selective Re-rendering**: Context re-renders every consumer whenever any part of its value changes[cite: 1, 2]. Zustand allows components to subscribe strictly to the specific slice of state they need (e.g., `Nav` only reads `items.length`), preventing unnecessary UI re-renders across unrelated components[cite: 1, 2].
- **State Outside the Component Tree**: The cart store lives in an independent JS module[cite: 1, 2]. This eliminates the need to wrap top-level layout trees in a `CartProvider` while allowing state to easily persist across full page reloads via the `persist` middleware[cite: 1, 2].

### Why Authentication Remains in React Context
- **Infrequent Changes**: Unlike the cart (which mutates on every item add/remove action), authentication session data changes rarely (login and logout)[cite: 1, 2].
- **Simple Global Access**: Since auth status rarely changes, the re-render performance cost is negligible, making React Context with a guarded `useAuth` hook the ideal lightweight solution[cite: 1, 2].