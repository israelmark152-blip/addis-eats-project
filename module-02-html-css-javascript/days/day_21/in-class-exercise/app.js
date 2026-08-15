const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const STORAGE_KEY = "signups";

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorDisplay = document.querySelector("#error");
const countDisplay = document.querySelector("#signup-count");

function getSignups() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function updateSignupCount() {
  const signups = getSignups();
  countDisplay.textContent = `Signed up count: ${signups.length}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  // Validate name length
  if (name.length < 2) {
    errorDisplay.textContent = "Name must be at least two characters.";
    return;
  }

  // Validate Ethiopian phone number regex
  if (!PHONE_REGEX.test(phone)) {
    errorDisplay.textContent = "Please enter a valid Ethiopian phone number (09... or +2519...).";
    return;
  }

  // Clear error message on valid input
  errorDisplay.textContent = "";

  // Save entry as JSON in localStorage
  const signups = getSignups();
  signups.push({ name, phone });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));

  // Reset form inputs and refresh total count
  form.reset();
  updateSignupCount();
});

// Restore sign-up count on initial page load
updateSignupCount();