// --- CENTRALIZED STATE ---
const state = {
  rates: {},
  watchlist: [],
  currency: "USD",
  amount: 100,
  conversionResult: "",
  isErrorResult: false,
  statusText: "",
  isStatusError: false,
};

const API_URL = "https://open.er-api.com/v6/latest/ETB";
const LOCAL_STORAGE_KEY = "birrwatch_mini_project_state";

// --- DOM REFERENCES ---
const statusEl = document.querySelector("#status");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const convertForm = document.querySelector("#convert-form");
const watchBtn = document.querySelector("#watch-btn");
const resultEl = document.querySelector("#result");
const watchlistUl = document.querySelector("#watchlist");

// --- LOCAL STORAGE HELPERS ---
function saveStateToStorage() {
  const payload = {
    watchlist: state.watchlist,
    currency: state.currency,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

function loadStateFromStorage() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    if (Array.isArray(data.watchlist)) state.watchlist = data.watchlist;
    if (typeof data.currency === "string") state.currency = data.currency;
  } catch (err) {
    console.error("Failed to parse storage data", err);
  }
}

// --- NETWORK FETCHING ---
async function fetchRates() {
  state.statusText = "Loading live ETB exchange rates…";
  state.isStatusError = false;
  render();

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Server returned HTTP ${response.status}`);
    
    const data = await response.json();
    state.rates = data.rates || {};
    state.statusText = "";
  } catch (error) {
    state.statusText = "Could not fetch exchange rates. Check connection.";
    state.isStatusError = true;
  }
  render();
}

// --- STATE-DRIVEN RENDER FUNCTION ---
function render() {
  // 1. Status Message Line
  statusEl.textContent = state.statusText;
  statusEl.classList.toggle("error", state.isStatusError);

  // 2. Target Currency Dropdown
  const currencyCodes = Object.keys(state.rates);
  if (currencyCodes.length > 0) {
    currencySelect.innerHTML = currencyCodes
      .map((code) => `<option value="${code}">${code}</option>`)
      .join("");

    if (currencyCodes.includes(state.currency)) {
      currencySelect.value = state.currency;
    }
  }

  // 3. Amount Field Value
  amountInput.value = state.amount || "";

  // 4. Conversion Result Area
  resultEl.textContent = state.conversionResult || "Enter an amount and click Convert.";
  resultEl.classList.toggle("error-text", state.isErrorResult);

  // 5. Watchlist Section & Empty State
  if (state.watchlist.length === 0) {
    watchlistUl.innerHTML = `<li class="empty-state">No currencies in watchlist.</li>`;
  } else {
    watchlistUl.innerHTML = state.watchlist
      .map((code) => {
        const rate = state.rates[code];
        const rateText = rate ? rate.toFixed(4) : "N/A";
        return `
          <li data-currency="${code}">
            <span>1 ETB = ${rateText} ${code}</span>
            <button class="rm-btn" class="rm-btn" aria-label="Remove ${code}">×</button>
          </li>
        `;
      })
      .join("");
  }
}

// --- EVENT HANDLERS ---
convertForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const rawVal = amountInput.value.trim();
  const numericVal = Number(rawVal);

  // Input Validation Requirements (reject empty, zero, negative, non-numeric)
  if (rawVal === "" || isNaN(numericVal) || numericVal <= 0) {
    state.conversionResult = "Please enter a valid numeric amount greater than 0.";
    state.isErrorResult = true;
    render();
    return;
  }

  state.amount = numericVal;
  state.currency = currencySelect.value;
  saveStateToStorage();

  const currentRate = state.rates[state.currency];
  if (currentRate) {
    const total = (numericVal * currentRate).toFixed(2);
    state.conversionResult = `${numericVal} ETB = ${total} ${state.currency}`;
    state.isErrorResult = false;
  } else {
    state.conversionResult = "Rate unavailable for selected currency.";
    state.isErrorResult = true;
  }

  render();
});

watchBtn.addEventListener("click", () => {
  const selectedCode = currencySelect.value;
  if (!selectedCode) return;

  // Prevent duplicate watchlist additions
  if (!state.watchlist.includes(selectedCode)) {
    state.watchlist.push(selectedCode);
    saveStateToStorage();
    render();
  }
});

// Event Delegation for Watchlist Item Removal
watchlistUl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("rm-btn")) return;
  
  const parentLi = e.target.closest("li");
  const currencyToRemove = parentLi.dataset.currency;

  state.watchlist = state.watchlist.filter((item) => item !== currencyToRemove);
  saveStateToStorage();
  render();
});

// --- APPLICATION INITIALIZATION ---
async function init() {
  loadStateFromStorage();
  await fetchRates();
}

init();