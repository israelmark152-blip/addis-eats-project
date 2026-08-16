// Application State
const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const API_URL = "https://open.er-api.com/v6/latest/ETB";
const STORAGE_KEY = "birrwatch_state";

// DOM Elements
const statusEl = document.querySelector("#status");
const selectEl = document.querySelector("#currency");
const formEl = document.querySelector("#convert-form");
const amountEl = document.querySelector("#amount");
const resultEl = document.querySelector("#result");
const watchUl = document.querySelector("#watchlist");
const watchBtn = document.querySelector("#watch");

// LocalStorage Integration
function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      watchlist: state.watchlist,
      currency: state.currency,
      amount: state.amount,
    })
  );
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.watchlist) state.watchlist = parsed.watchlist;
      if (parsed.currency) state.currency = parsed.currency;
      if (parsed.amount) state.amount = parsed.amount;
    } catch (e) {
      console.error("Failed to parse saved state:", e);
    }
  }
}

// Fetch Rates with Loading & Error Handling
async function loadRates() {
  statusEl.textContent = "Loading live rates…";
  statusEl.classList.remove("error");

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    state.rates = data.rates;
    statusEl.textContent = "";
    render();
  } catch (err) {
    statusEl.textContent = "Failed to load exchange rates. Please check your connection.";
    statusEl.classList.add("error");
  }
}

// Render UI Components
function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies in watchlist</li>";
    return;
  }

  watchUl.innerHTML = state.watchlist
    .map((code) => {
      const rate = state.rates[code];
      const rateDisplay = rate ? rate.toFixed(4) : "N/A";
      return `
        <li data-currency="${code}">
          <span>1 ETB = ${rateDisplay} ${code}</span>
          <button class="rm" aria-label="Remove ${code}">×</button>
        </li>
      `;
    })
    .join("");
}

function render() {
  const codes = Object.keys(state.rates);
  if (codes.length > 0) {
    selectEl.innerHTML = codes.map((c) => `<option value="${c}">${c}</option>`).join("");
    if (codes.includes(state.currency)) {
      selectEl.value = state.currency;
    }
  }
  
  amountEl.value = state.amount;
  renderWatchlist();
}

// Event Handlers
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const amt = Number(amountEl.value);

  if (isNaN(amt) || amt <= 0) {
    resultEl.textContent = "Please enter a valid amount greater than zero.";
    return;
  }

  state.currency = selectEl.value;
  state.amount = amt;
  saveState();

  const rate = state.rates[state.currency];
  if (rate) {
    const converted = (amt * rate).toFixed(2);
    resultEl.textContent = `${amt} ETB = ${converted} ${state.currency}`;
  } else {
    resultEl.textContent = "Rate not available.";
  }
});

watchBtn.addEventListener("click", () => {
  const selected = selectEl.value;
  if (!selected) return;

  // Prevent duplicates
  if (!state.watchlist.includes(selected)) {
    state.watchlist.push(selected);
    saveState();
    renderWatchlist();
  }
});

// Event Delegation for Watchlist Item Removal
watchUl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const li = e.target.closest("li");
  const code = li.dataset.currency;

  state.watchlist = state.watchlist.filter((item) => item !== code);
  saveState();
  renderWatchlist();
});

// Initializing Application
async function init() {
  loadState();
  await loadRates();
}

init();