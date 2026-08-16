// Step 1: Declare state object
const state = {
  base: "ETB",
  rates: {}, // Step 2 test with fake rates: { USD: 0.0177, KES: 2.29 }
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const API_URL = "https://open.er-api.com/v6/latest/ETB";
const STORAGE_KEY = "birrwatch_exercise_key";

// DOM Elements
const statusEl = document.querySelector("#status");
const currencySelect = document.querySelector("#currency");
const convertForm = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const resultEl = document.querySelector("#result");
const watchlistUl = document.querySelector("#watchlist");
const watchBtn = document.querySelector("#watch");

// Step 6: LocalStorage save() and load()
function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      watchlist: state.watchlist,
      currency: state.currency,
    })
  );
}

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    if (parsed.watchlist) state.watchlist = parsed.watchlist;
    if (parsed.currency) state.currency = parsed.currency;
  } catch (err) {
    console.error("Error loading localStorage data", err);
  }
}

// Step 3: loadRates() fetches live endpoint, updates state, handles loading/errors
async function loadRates() {
  if (statusEl) statusEl.textContent = "Loading rates…";
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    state.rates = data.rates;
    if (statusEl) statusEl.textContent = "";
    render();
  } catch (err) {
    if (statusEl) statusEl.textContent = "Could not load rates.";
  }
}

// Step 5: renderWatchlist() renders list items from state
function renderWatchlist() {
  if (!watchlistUl) return;

  if (state.watchlist.length === 0) {
    watchlistUl.innerHTML = "<li>No currencies in watchlist</li>";
    return;
  }

  watchlistUl.innerHTML = state.watchlist
    .map((c) => {
      const rate = state.rates[c];
      const displayRate = rate ? rate.toFixed(4) : "N/A";
      return `<li data-c="${c}">1 ETB = ${displayRate} ${c} <button class="rm">×</button></li>`;
    })
    .join("");
}

// Step 2: render() populates dropdown from state.rates
function render() {
  if (currencySelect) {
    const codes = Object.keys(state.rates);
    currencySelect.innerHTML = codes.map((c) => `<option value="${c}">${c}</option>`).join("");
    if (state.currency && codes.includes(state.currency)) {
      currencySelect.value = state.currency;
    }
  }
  renderWatchlist();
}

// Step 4: Wire convert form (preventDefault, validate Number(), look up rate, display output)
if (convertForm) {
  convertForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amt = Number(amountInput.value);

    if (isNaN(amt) || amt <= 0) {
      resultEl.textContent = "Please enter a valid amount.";
      return;
    }

    state.currency = currencySelect.value;
    state.amount = amt;
    save();

    const rate = state.rates[state.currency];
    const converted = (amt * rate).toFixed(2);
    resultEl.textContent = `${amt} ETB = ${converted} ${state.currency}`;
  });
}

// Step 5: Watchlist addition with duplicate guard
if (watchBtn) {
  watchBtn.addEventListener("click", () => {
    const selected = currencySelect.value;
    if (!selected) return;

    if (!state.watchlist.includes(selected)) {
      state.watchlist.push(selected);
      save();
      renderWatchlist();
    }
  });
}

// Step 5: Delegated click listener using data-c attribute
if (watchlistUl) {
  watchlistUl.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) return;
    const li = e.target.closest("li");
    const code = li.dataset.c;

    state.watchlist = state.watchlist.filter((item) => item !== code);
    save();
    renderWatchlist();
  });
}

// Step 6: init() calls load() and loadRates() on startup
async function init() {
  load();
  await loadRates();
}

init();