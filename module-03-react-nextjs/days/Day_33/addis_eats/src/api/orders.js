export async function placeOrder(orderData) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network latency

  // Simulate server rejection for testing error recovery states
  if (orderData.phone.endsWith("00")) {
    const error = new Error("Validation Failed");
    error.status = 422;
    error.fieldErrors = { phone: "That number is not registered with TeleBirr" };
    throw error;
  }

  return { id: Math.floor(Math.random() * 100000), ...orderData };
}