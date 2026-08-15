// Select DOM elements
const listElement = document.getElementById('list');
const loadingElement = document.getElementById('loading');
const errorMessageElement = document.getElementById('error-message');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');

// Step 1: Write an async load() function
async function load(query = '') {
  // Reset UI and display Loading state
  loadingElement.classList.remove('hidden');
  errorMessageElement.classList.add('hidden');
  errorMessageElement.textContent = '';
  listElement.innerHTML = '';

  try {
    // Step 2: await fetch endpoint
    const url = query 
      ? `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`
      : 'https://jsonplaceholder.typicode.com/posts?_limit=6';

    const res = await fetch(url);

    // Check response.ok
    if (!res.ok) {
      throw new Error(`Failed to load items (Status code: ${res.status})`);
    }

    // Step 3: await res.json() and render items
    const items = await res.json();

    if (items.length === 0) {
      throw new Error(`No items found matching "${query}".`);
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.title;
      listElement.appendChild(li);
    });

  } catch (error) {
    // Step 4: Show friendly error message on failure
    errorMessageElement.textContent = error.message || 'Unable to fetch data.';
    errorMessageElement.classList.remove('hidden');
  } finally {
    // Step 5: Always clear the loading state using finally
    loadingElement.classList.add('hidden');
  }
}

// Initial load on startup
load();

// Form Submit Handler for Search
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  load(query);
});

// Step 6 (Bonus): Refresh Button Handler
refreshBtn.addEventListener('click', () => {
  searchInput.value = '';
  load();
});