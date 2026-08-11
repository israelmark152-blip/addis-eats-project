import { orders } from "./orders.js";
import { total, withVat, format } from "./pricing.js";

// 1. Attach total field to each order using map + spread
const ordersWithTotals = orders.map(order => {
  const rawTotal = total(order.items);
  const totalWithVat = withVat(rawTotal);
  return { ...order, totalWithVat };
});

// 2. Filter orders over 500 ETB
const highValueOrders = ordersWithTotals.filter(o => o.totalWithVat > 500);

// 3. Print Summary
console.log("=== Addis Market High-Value Orders (> 500 ETB) ===");
highValueOrders.forEach(({ id, customer, totalWithVat }) => {
  console.log(`Order #${id} (${customer}): ${format(totalWithVat)}`);
});

// 4. Calculate Grand Total of ALL orders
const grandTotal = ordersWithTotals.reduce((sum, { totalWithVat }) => sum + totalWithVat, 0);
console.log("-----------------------------------------------");
console.log(`Grand Total (All Orders): ${format(grandTotal)}`);