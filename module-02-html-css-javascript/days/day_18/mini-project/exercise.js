// exercise.js
import { transactions } from './transaction.js';
import { 
  getCompletedTransactions, 
  formatReceipts, 
  generateSummaryReport 
} from './reporter.js';

console.log("==========================================");
console.log("   TeleBirr Transaction Report System     ");
console.log("==========================================\n");

// Get completed transactions
const completedTxs = getCompletedTransactions(transactions);

// Generate formatted receipts
const receipts = formatReceipts(completedTxs);

console.log("--- Completed Transaction Receipts ---");
receipts.forEach(({ formattedReceipt }) => console.log(formattedReceipt));

// Generate summary report
const summary = generateSummaryReport(transactions);

console.log("\n--- Transaction Summary Report ---");
console.log(`Total Received: ${summary.totalTransactions}`);
console.log(`Successful:     ${summary.completedCount}`);
console.log(`Total Revenue:  ${summary.totalRevenueETB.toFixed(2)} ETB`);
console.log(`Average Sales:  ${summary.averageTransactionETB} ETB`);
console.log("==========================================");