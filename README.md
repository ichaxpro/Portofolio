# Portofolio Dewi Chalissa Rania

Website portofolio modern dengan gaya **Neo-Brutalist / Editorial Eco-Brand**, dibangun menggunakan **HTML5**, **Tailwind CSS**, dan **Vanilla JavaScript**, dengan halaman detail proyek terpisah (*multi-page*).

---

## 🚀 Fitur Utama

- 🎨 **Neo-Brutalist Editorial Aesthetic**: Desain berkarakter dengan warna khas (`#F7F1E3`, `#143D2F`, `#FF5C8A`, `#FFD23F`, `#2E9D63`), bayangan brutalist tegas (`shadow-brutal`), sticker miring, dan tipografi display *Bricolage Grotesque*.
- 📑 **Dedicated Project Detail Pages**: Setiap kartu proyek (*SikatBosku!*, *Robosarema SAR Robot*, *Alinea*, *Website Profil LAB DT*) dapat diklik dan mengarah ke halaman detail masing-masing di dalam folder `pages/`.
- 🌓 **Dark / Light Mode Toggle**: Beralih tema gelap & terang dengan penyimpanan otomatis di `localStorage` dan sinkronisasi preferensi sistem (`prefers-color-scheme`).
- 📱 **Fully Responsive + Mobile Menu**: Desain adaptif dari ponsel hingga layar ultrawide, dilengkapi drawer navigasi hamburger mobile.
- 🔁 **Continuous Marquee Ticker**: Baris teks berjalan tanpa jeda dengan animasi mulus dan auto-pause saat di-hover.
- 🔍 **Interactive Project Filter**: Filter kategori proyek (*All*, *Machine Learning*, *Web Development*, *Robotics*) dengan transisi animasi halus di halaman utama.
- 🧭 **Clean Layout Flow**: Transisi bersih dari bagian perjalanan organisasi langsung menuju footer dengan tautan sosial dan email aktif.

---

## 📂 Struktur File

```text
C:\Portofolio\
├── index.html                  # Halaman utama portofolio
├── pages/                      # Halaman detail proyek
│   ├── sikatbosku.html         # Detail proyek SikatBosku! (ML & AI)
│   ├── robosarema.html         # Detail proyek Robot SAR (Robotics & CV)
│   ├── alinea.html             # Detail proyek Alinea (Community Literacy Web)
│   └── lab-dt.html             # Detail proyek Website Profil LAB DT Polinema
├── css/
│   └── style.css               # Custom animation keyframes, scrollbar, blob styles
├── js/
│   └── script.js               # Logika interaktif, filter, dark mode, navigasi
└── README.md                   # Panduan penggunaan & kustomisasi
```

---

## 🛠️ Cara Membuka & Menjalankan

### Cara 1: Buka Langsung di Browser
Klik dua kali file `index.html` di dalam folder `C:\Portofolio\` atau klik kanan > **Open with** > **Google Chrome** / **Microsoft Edge** / browser favorit Anda.

### Cara 2: Menjalankan via Local Web Server (Opsional)
Jika Anda memiliki Node.js, Python, atau VS Code Live Server:
- **Python**:
  ```bash
  cd C:\Portofolio
  python -m http.server 8000
  ```
  Lalu buka `http://localhost:8000` di browser.
- **VS Code**:
  Buka folder `C:\Portofolio` di VS Code dan klik **Go Live** pada ekstensi *Live Server*.

---

## ⚙️ Kustomisasi Data Pribadi

Buka file [js/script.js](file:///C:/Portofolio/js/script.js) untuk mengubah tautan dan kontak:
```javascript
const CONFIG = {
  CV_URL: "https://drive.google.com/...", // URL link file CV publik Anda
  GITHUB_URL: "https://github.com/username-anda", // Profil GitHub
  LINKEDIN_URL: "https://linkedin.com/in/dewi-chalissa-01621a329/",
  EMAIL: "dewiicha161@gmail.com"
};
```
