/**
 * Day 20: Asynchronous JavaScript & APIs - Task Exercises
 * Concepts: Promises, async/await, fetch API, try/catch, Promise.all
 */

// ==========================================
// Task 1: Promise Delay Helper
// Simulates an asynchronous operation using setTimeout & Promises
// ==========================================
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTask1() {
  console.log("--- Task 1: Simulating Async Delay ---");
  console.log("Waiting 1.5 seconds...");
  await delay(1500);
  console.log("Task 1 Complete: Promise resolved successfully!\n");
}

// ==========================================
// Task 2: Single Fetch with Error Handling
// Fetches data from a public API and checks res.ok
// ==========================================
async function fetchPostById(postId) {
  console.log(`--- Task 2: Fetching Post #${postId} ---`);
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    // Check HTTP response status
    if (!response.ok) {
      throw new Error(`HTTP Request Failed (Status: ${response.status})`);
    }

    const post = await response.json();
    console.log("Success! Received Data:");
    console.log(`ID: ${post.id}`);
    console.log(`Title: ${post.title}\n`);
    return post;

  } catch (error) {
    console.error(`Task 2 Error: ${error.message}\n`);
  }
}

// ==========================================
// Task 3: Parallel Execution with Promise.all
// Fetches multiple endpoints simultaneously for optimal performance
// ==========================================
async function fetchMultipleUsers(userIds) {
  console.log(`--- Task 3: Parallel Fetch for Users [${userIds.join(', ')}] ---`);
  try {
    // Map array of IDs to an array of fetch Promises
    const requests = userIds.map(async (id) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!res.ok) throw new Error(`User ${id} not found`);
      return res.json();
    });

    // Execute all requests concurrently
    const users = await Promise.all(requests);
    
    console.log("Success! All users fetched concurrently:");
    users.forEach((user) => {
      console.log(`- User ${user.id}: ${user.name} (${user.email})`);
    });
    console.log("");

  } catch (error) {
    console.error(`Task 3 Error: ${error.message}\n`);
  }
}

// ==========================================
// Main Runner Function
// ==========================================
async function main() {
  await runTask1();
  await fetchPostById(1);      // Valid request
  await fetchPostById(99999);  // Triggers 404 error handling
  await fetchMultipleUsers([1, 2, 3]);
}

// Execute exercises
main();