document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://sandbox.sunariku.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      localStorage.setItem('token', data.token); // simpan token untuk member area
      window.location.href = 'member.html';
    } else {
      alert(data.message || 'Login gagal. Periksa kembali username/password.');
    }
  } catch (err) {
    alert('Terjadi kesalahan koneksi.');
    console.error(err);
  }
});
