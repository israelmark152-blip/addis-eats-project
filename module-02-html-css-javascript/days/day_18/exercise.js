// ==========================================
// Exercise 1: Array Methods (map, filter, reduce)
// ==========================================
const prices = [250, 600, 180, 900, 1200];

// 1. Add 15% VAT using map
const withVat = prices.map(p => p * 1.15);

// 2. Keep prices under 1000 using filter
const underThousand = withVat.filter(p => p < 1000);

// 3. Calculate grand total using reduce
const grandTotal = underThousand.reduce((sum, p) => sum + p, 0);

console.log("--- Exercise 1 ---");
console.log("Prices + VAT under 1000 Total:", grandTotal.toFixed(2), "ETB");


// ==========================================
// Exercise 2: Object & Object.entries
// ==========================================
const customer = {
  name: "Almaz Bekele",
  city: "Addis Ababa",
  balance: 1500
};

console.log("\n--- Exercise 2 ---");
for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}


// ==========================================
// Exercise 3: Destructuring & Function Parameter
// ==========================================
// Destructure name and city in one line
const { name, city } = customer;

// Function using parameter destructuring
function greet({ name }) {
  return `Selam ${name}!`;
}

console.log("\n--- Exercise 3 ---");
console.log(greet(customer));


// ==========================================
// Exercise 4: Immutable Update using Spread
// ==========================================
const updatedCustomer = {
  ...customer,
  city: "Bahir Dar",
  phone: "0911234567"
};

console.log("\n--- Exercise 4 ---");
console.log("Original:", customer);
console.log("Updated Copy:", updatedCustomer);


// ==========================================
// Exercise 5: ES Modules
// ==========================================
// For money.js:
// export const VAT = 0.15;
// export const addVat = (amount) => amount * (1 + VAT);

// For app.js:
// import { VAT, addVat } from "./money.js";
// console.log("Total with VAT:", addVat(500));