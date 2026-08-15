const out = document.querySelector("#facts");
const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");

// Local fallback data for offline/blocked networks
const FALLBACK_DATA = {
  ethiopia: {
    name: { common: "Ethiopia" },
    capital: ["Addis Ababa"],
    population: 123379924,
    region: "Africa",
    currencies: { ETB: { name: "Ethiopian Birr" } },
    flags: { png: "https://flagcdn.com/w320/et.png" }
  },
  kenya: {
    name: { common: "Kenya" },
    capital: ["Nairobi"],
    population: 54027487,
    region: "Africa",
    currencies: { KES: { name: "Kenyan Shilling" } },
    flags: { png: "https://flagcdn.com/w320/ke.png" }
  },
  canada: {
    name: { common: "Canada" },
    capital: ["Ottawa"],
    population: 38246108,
    region: "Americas",
    currencies: { CAD: { name: "Canadian Dollar" } },
    flags: { png: "https://flagcdn.com/w320/ca.png" }
  }
};

function render(parent, label, value) {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${label}:</strong> ${value}`;
  parent.appendChild(p);
}

function displayData(c) {
  out.innerHTML = "";

  const capital = c.capital ? c.capital[0] : "N/A";
  const population = c.population ? c.population.toLocaleString() : "N/A";
  const region = c.region || "N/A";
  
  let currencies = "N/A";
  if (c.currencies) {
    currencies = Object.values(c.currencies).map(curr => curr.name).join(", ");
  }

  render(out, "Capital", capital);
  render(out, "Population", population);
  render(out, "Region", region);
  render(out, "Currencies", currencies);

  if (c.flags?.png) {
    const img = document.createElement("img");
    img.src = c.flags.png;
    img.alt = `Flag of ${c.name?.common || "Country"}`;
    img.style.width = "120px";
    img.style.marginTop = "12px";
    img.style.border = "1px solid #ccc";
    out.appendChild(img);
  }
}

async function showCountry(name) {
  out.textContent = "Loading...";
  const cleanName = name.toLowerCase().trim();

  try {
    // 1. Primary Live API Fetch (Meets project requirement)
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(cleanName)}`);

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const [data] = await res.json();
    displayData(data);

  } catch (err) {
    // 2. Fallback execution if mobile network blocks restcountries.com
    if (FALLBACK_DATA[cleanName]) {
      displayData(FALLBACK_DATA[cleanName]);
    } else {
      out.textContent = err.message === "Failed to fetch" 
        ? "Network error: Unable to connect to REST Countries API." 
        : err.message;
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (query) {
    showCountry(query);
    input.value = "";
  }
});

// Default to Ethiopia on load
showCountry("ethiopia");