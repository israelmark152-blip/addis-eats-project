// ==========================================
// Exercise 1: Fetch USD -> ETB exchange rate
// ==========================================
async function getUsdToEtbRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const rate = data.rates.ETB;
    console.log(`1 USD = ${rate} ETB`);
    return rate;
  } catch (err) {
    console.error("Failed to fetch exchange rate:", err.message);
  }
}

// ==========================================
// Exercise 2: Async/Await + try/catch rewrite
// ==========================================
function render(data) {
  console.log("Rendered Data:", data);
}

async function fetchAndRender() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error("Error fetching post:", err.message);
  }
}

// ==========================================
// Exercise 3: Wrong URL vs 404 URL (res.ok demo)
// ==========================================
async function testErrorHandling() {
  // Case A: Unreachable domain (Network error triggers catch block automatically)
  try {
    console.log("Fetching invalid domain...");
    await fetch("https://this-domain-does-not-exist-12345.com");
  } catch (err) {
    console.log("Caught network error:", err.message);
  }

  // Case B: Real URL returning 404 (Does NOT throw error without res.ok check)
  try {
    console.log("Fetching 404 endpoint...");
    const res = await fetch("https://jsonplaceholder.typicode.com/invalid-endpoint-404");
    console.log(`res.ok status: ${res.ok}, HTTP code: ${res.status}`);
    
    if (!res.ok) {
      throw new Error(`HTTP 404 Error: Resource not found`);
    }
    const data = await res.json();
  } catch (err) {
    console.log("Caught 404 error using res.ok check:", err.message);
  }
}

// ==========================================
// Exercise 4: Promise.all for parallel fetching
// ==========================================
async function fetchFirstTwoItemsInParallel() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch list");
    const posts = await res.json();

    // Fetch details for the first two items in parallel
    const [item1, item2] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}`).then(r => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts/${posts[1].id}`).then(r => r.json())
    ]);

    console.log("Parallel Fetch Results:", { item1, item2 });
  } catch (err) {
    console.error("Promise.all error:", err.message);
  }
}

// ==========================================
// Exercise 5: Loading, Success, and Error UI
// ==========================================
async function loadDataWithStates() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  // State 1: Loading
  container.textContent = "Loading...";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) {
      throw new Error("Failed to load data");
    }
    const data = await res.json();

    // State 2: Success
    container.textContent = `Success: ${data.title}`;
  } catch (err) {
    // State 3: Error
    container.textContent = `Error: ${err.message}`;
  }
}

// Execute function tests
getUsdToEtbRate();
fetchAndRender();
testErrorHandling();
fetchFirstTwoItemsInParallel();
loadDataWithStates();