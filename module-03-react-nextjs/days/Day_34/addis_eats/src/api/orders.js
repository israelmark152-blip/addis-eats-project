export async function submitOrder(cartItems) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, orderId: Math.floor(100000 + Math.random() * 900000) });
    }, 1000);
  });
}