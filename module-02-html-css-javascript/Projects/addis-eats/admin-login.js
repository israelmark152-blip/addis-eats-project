document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMsg = document.getElementById('error-msg');

  // Simulated Admin Credentials
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = '123456';

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // 19 & 20. Form Validation and Authentication
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('addis_admin_auth', 'true');
      window.location.href = 'admin-dashboard.html';
    } else {
      errorMsg.classList.remove('hidden');
    }
  });
});