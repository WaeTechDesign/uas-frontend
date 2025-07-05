document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://sandbox.sunariku.com/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || 'Pendaftaran berhasil!');
      window.location.href = 'index.html'; // redirect ke login
    } else {
      alert(data.message || 'Pendaftaran gagal. Username mungkin sudah dipakai.');
    }
  } catch (err) {
    alert('Terjadi kesalahan koneksi.');
    console.error(err);
  }
});
