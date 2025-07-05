const token = localStorage.getItem('token');
const container = document.getElementById('produkContainer');
const form = document.getElementById('productForm');

// Cek login
if (!token) {
  alert('Kamu harus login dulu!');
  window.location.href = 'index.html';
}

// Ambil semua produk
async function getProducts() {
  container.innerHTML = '<p class="text-center">Loading...</p>';
  const res = await fetch('http://sandbox.sunariku.com/products', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  if (res.ok) {
    if (data.length === 0) {
      container.innerHTML = '<p class="text-center">Belum ada produk</p>';
      return;
    }

    container.innerHTML = '';
    data.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';
      col.innerHTML = `
        <div class="card h-100 shadow">
          <img src="http://sandbox.sunariku.com/uploads/${product.photo}" class="card-img-top" alt="Gambar Produk">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Rp ${product.price}</p>
            <p class="card-text"><small>${product.deskripsi}</small></p>
            <input class="form-control mb-2" type="text" placeholder="Deskripsi baru" id="desc-${product.id}">
            <button class="btn btn-warning btn-sm mb-1" onclick="updateDeskripsi(${product.id})">Update</button>
            <button class="btn btn-danger btn-sm" onclick="hapusProduk(${product.id})">Hapus</button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  } else {
    alert(data.message || 'Gagal ambil data produk');
  }
}
getProducts();

// Tambah produk
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('price', document.getElementById('price').value);
  formData.append('deskripsi', document.getElementById('deskripsi').value);
  formData.append('photo', document.getElementById('photo').files[0]);

  const res = await fetch('http://sandbox.sunariku.com/products', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    form.reset();
    getProducts();
  } else {
    alert(data.message || 'Gagal menambahkan produk');
  }
});

// Update deskripsi
async function updateDeskripsi(id) {
  const newDesc = document.getElementById(`desc-${id}`).value;
  if (!newDesc) return alert('Deskripsi tidak boleh kosong!');

  const res = await fetch(`http://sandbox.sunariku.com/products/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ deskripsi: newDesc })
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    getProducts();
  } else {
    alert(data.message || 'Gagal update deskripsi');
  }
}

// Hapus produk
async function hapusProduk(id) {
  if (!confirm('Yakin mau hapus produk ini?')) return;
  const res = await fetch(`http://sandbox.sunariku.com/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    getProducts();
  } else {
    alert(data.message || 'Gagal menghapus produk');
  }
}
