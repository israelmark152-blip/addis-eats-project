// Select DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const countriesGrid = document.getElementById('countries-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const statusMessage = document.getElementById('status-message');

// Reliable fallback dataset (to bypass network blocks)
const fallbackData = {
  ethiopia: { name: { common: 'Ethiopia' }, capital: ['Addis Ababa'], region: 'Africa', population: 123000000, flags: { svg: 'https://flagcdn.com/et.svg' }, languages: { amh: 'Amharic' } },
  kenya: { name: { common: 'Kenya' }, capital: ['Nairobi'], region: 'Africa', population: 54000000, flags: { svg: 'https://flagcdn.com/ke.svg' }, languages: { swa: 'Swahili', eng: 'English' } },
  japan: { name: { common: 'Japan' }, capital: ['Tokyo'], region: 'Asia', population: 125000000, flags: { svg: 'https://flagcdn.com/jp.svg' }, languages: { jpn: 'Japanese' } },
  canada: { name: { common: 'Canada' }, capital: ['Ottawa'], region: 'Americas', population: 38000000, flags: { svg: 'https://flagcdn.com/ca.svg' }, languages: { eng: 'English', fra: 'French' } }
};

// Main function to fetch and show country facts
async function showCountry(name) {
  const query = name.trim().toLowerCase();
  if (!query) return;

  // 1. Loading State
  showLoading(true);
  clearStatus();
  countriesGrid.innerHTML = '';

  try {
    // 2. Fetch with res.ok check
   // CORRECT for Day 20
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Country "${name}" not found. Please check your spelling.`);
      }
      throw new Error(`Server error (${response.status})`);
    }

    const data = await response.json();
    renderCountryCard(data[0]);

  } catch (error) {
    // Network Fallback or User Error Handling
    if (fallbackData[query]) {
      renderCountryCard(fallbackData[query]);
    } else {
      showError(error.message || `Could not find facts for "${name}".`);
    }
  } finally {
    showLoading(false);
  }
}

// Render Single Country Details
function renderCountryCard(country) {
  const countryName = country.name?.common || 'N/A';
  const capital = country.capital ? country.capital[0] : 'N/A';
  const region = country.region || 'N/A';
  // Readable population formatting (e.g. 123,000,000)
  const population = country.population ? country.population.toLocaleString() : 'N/A';
  const flagUrl = country.flags?.svg || country.flags?.png || '';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

  countriesGrid.innerHTML = `
    <article class="card">
      ${flagUrl ? `<img src="${flagUrl}" alt="Flag of ${countryName}" class="card-flag" />` : ''}
      <div class="card-body">
        <h2 class="card-title">${countryName}</h2>
        <p class="card-info"><strong>Capital:</strong> ${capital}</p>
        <p class="card-info"><strong>Region:</strong> ${region}</p>
        <p class="card-info"><strong>Population:</strong> ${population}</p>
        <p class="card-info"><strong>Languages:</strong> ${languages}</p>
      </div>
    </article>
  `;
}

// Helper Functions
function showLoading(isLoading) {
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

function showError(message) {
  statusMessage.textContent = message;
  statusMessage.className = 'status-text error';
  statusMessage.classList.remove('hidden');
}

function clearStatus() {
  statusMessage.textContent = '';
  statusMessage.className = 'status-text hidden';
}

// Form Event Listener
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showCountry(searchInput.value);
});

// DEFAULT ON FIRST LOAD: Ethiopia
showCountry("ethiopia");
const resetBtn = document.getElementById('reset-btn');

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    showCountry('ethiopia');
  });
}
