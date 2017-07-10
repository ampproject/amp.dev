---
$title : Tips untuk Iklan di Halaman AMP
$order : 1
---

### Penempatan & Kontrol <br /> Optimalkan penempatan iklan Anda

- **Buat unit iklan terpisah** di halaman AMP untuk tujuan penargetan, pelaporan, dan kontrol.
- **Tempatkan jumlah iklan yang sama** di halaman AMP seperti pada halaman non-AMP, untuk memaksimalkan pendapatan per halaman.
- **Tempatkan iklan pertama tepat di bawah viewport pertama** ("paruh bawah") untuk memberikan pengalaman pengguna yang optimal.
-  Kecuali Anda menggunakan CSS lanjutan atau kueri media, **pastikan unit iklan Anda berada di tengah halaman** agar pengguna bisa mendapatkan pengalaman web seluler yang optimal.
- **Aktifkan <a href="https://github.com/ampproject/amphtml/tree/master/ads#support-for-multi-size-ad-requests">permintaan iklan berbagai ukuran</a>** pada inventaris AMP untuk meningkatkan tekanan lelang iklan dan mendorong pendapatan.

### Permintaan & Penetapan Harga: <br /> Dapatkan harga yang tepat untuk iklan Anda

- **Jual unit iklan pada halaman AMP di seluruh saluran penjualan**, termasuk secara langsung dan tidak langsung untuk memaksimalkan kompetisi inventaris pada halaman AMP.
- **Tetapkan harga untuk inventaris iklan di halaman AMP, mirip** dengan harga inventaris di halaman non-AMP. Pantau performa dan sesuaikan harganya.
- **Pastikan semua saluran permintaan bersaing** untuk inventaris iklan di halaman AMP agar dapat mendorong persaingan.

### Jenis Iklan: <br /> Tayangkan jenis iklan terbaik

- **Hindari materi iklan yang berat**  sesuai<a href="http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf"> dengan panduan IAB</a>.
- **Hindari format interstitial** atau format iklan lainnya yang dapat menyebabkan tata letak konten diatur ulang saat memuat iklan.
- **Optimalkan visibilitas** dengan menyetel parameter:<br />
   <em>data-loading-strategy = prefer-viewability-over-views</em>
- **Tempatkan iklan di konten video** melalui [pemutar yang didukung](https://www.ampproject.org/docs/reference/components#media) atau [`amp-iframe`](https://ampbyexample.com/components/amp-iframe/) untuk menghasilkan pendapatan di semua jenis konten.
- **Terapkan iklan native** untuk bersaing dengan iklan gambar menggunakan permintaan iklan berbagai ukuran, sehingga menambahkan tekanan permintaan sekaligus memberikan pengalaman pengguna premium bagi pembaca.

### Inovasi: <br /> Tawarkan produk iklan yang paling menarik

- **Terapkan iklan pada halaman AMP tambahan** untuk memperoleh pendapatan tambahan:
   - [Iklan di Korsel Gambar AMP](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-carousel-demo.html)
   - [Iklan di Lightbox AMP](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-lightbox-demo.html)
- **Terapkan format baru untuk iklan penjualan langsung** untuk memberikan produk iklan yang inovatif dan berdampak tinggi bagi tim penjualan:
   - [Iklan Melekat](https://ampbyexample.com/components/amp-sticky-ad/)
   - [Flying Carpet](https://ampbyexample.com/components/amp-fx-flying-carpet/)
