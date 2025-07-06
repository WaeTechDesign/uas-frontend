const baseUrl = 'http://sandbox.sunariku.com';

// ==== LOGIN ====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
      document.getElementById('loginMsg').innerText = 'Username dan password wajib diisi.';
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'member.html';
      } else {
        document.getElementById('loginMsg').innerText = data.message || 'Login gagal.';
      }
    } catch (err) {
      document.getElementById('loginMsg').innerText = 'Gagal terhubung ke server.';
    }
  });
}

// ==== REGISTER ====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !username || !password) {
      document.getElementById('registerMsg').innerText = 'Semua field wajib diisi.';
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password })
      });

      const data = await res.json();

      if (res.ok && data.message === 'User registered successfully') {
        alert('Registrasi berhasil! Silakan login.');
        window.location.href = 'index.html';
      } else {
        document.getElementById('registerMsg').innerText = data.message || 'Registrasi gagal.';
      }
    } catch (err) {
      document.getElementById('registerMsg').innerText = 'Gagal terhubung ke server.';
    }
  });
}

// ==== LOGOUT GLOBAL FUNCTION ====
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
