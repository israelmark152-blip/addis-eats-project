// reporter.js

// 1. Filter completed transactions
export const getCompletedTransactions = (txs) => 
  txs.filter(({ type }) => type === "completed");

// 2. Calculate total revenue using reduce & destructuring
export const calculateTotalRevenue = (txs) => 
  txs.reduce((sum, { amount }) => sum + amount, 0);

// 3. Format transactions with spread operator and template literals
export const formatReceipts = (txs) => 
  txs.map((tx) => {
    const { id, customer, amount } = tx;
    return {
      ...tx,
      formattedReceipt: `[${id}] ${customer}: ${amount.toFixed(2)} ETB`
    };
  });

// 4. Generate summary report object
export const generateSummaryReport = (txs) => {
  const completed = getCompletedTransactions(txs);
  const totalRevenue = calculateTotalRevenue(completed);
  
  return {
    totalTransactions: txs.length,
    completedCount: completed.length,
    totalRevenueETB: totalRevenue,
    averageTransactionETB: completed.length ? (totalRevenue / completed.length).toFixed(2) : 0
  };
};