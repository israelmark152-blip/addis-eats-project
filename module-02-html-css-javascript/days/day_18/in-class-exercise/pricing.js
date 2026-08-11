export const VAT = 0.15;

export const withVat = (amount) => amount * (1 + VAT);

export const format = (amount) => `${amount.toFixed(2)} ETB`;

// Calculates sum of items array using destructuring { price, qty }
export const total = (items) => 
  items.reduce((sum, { price, qty }) => sum + price * qty, 0);