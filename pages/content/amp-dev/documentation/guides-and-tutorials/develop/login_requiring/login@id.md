---
$title: Login
---

Saat pertama kali membuka halaman, Anda dapat melihat 2 komentar dan sebuah tombol login.

<amp-img src="/static/img/login-button.png" alt="Login button" height="290" width="300"></amp-img>

Jika mencari tombol login di kode, Anda akan menemukan:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Perilaku atribut yang terkait dengan `amp-access` bergantung pada konfigurasi di seluruh halaman untuk `amp-access`, dalam kasus ini, adalah contoh berikut:

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>
[/sourcecode]

Titik akhir otorisasi diterapkan sebagai bagian dari AMPByExample. Penayang halaman bertanggung jawab untuk menyediakan titik akhir ini. Dalam kasus sampel ini, untuk mudahnya, kami menerapkan logika dasar sehingga jika permintaan ini diterima, server membaca nilai cookie bernama `ABE_LOGGED_IN`. Jika cookie-nya tidak ada, kami menampilkan respons JSON berisi `loggedIn = false`. Hasilnya, pertama kali pengguna membuka halaman tersebut, permintaan ini akan memberikan `loggedIn = false` dan tombol login akan ditampilkan.

Jika melihat lagi kode HTML tombol menggunakan `on="tap:amp-access.login-sign-in"`, kita dapat menentukan bahwa setelah pengguna menge-tap tombol, URL yang ditentukan pada JSON di atas harus digunakan:

[sourcecode:json]
{
    "login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

Catatan: Perhatikan bahwa Anda dapat menentukan URL berbeda di dalam node login, dalam kasus ini kita menentukan `sign-in`, dan nanti kita akan menentukan `sign-out`.

Halaman login merupakan halaman non-AMP tempat kita mengisi nilai login dan sandi supaya mudah. Perhatikan penggunaan jenis masukan tersembunyi `returnURL`, yang diisi oleh server AMPByExample melalui pemberian template sisi server. Server membaca nilai ini dari parameter yang disebut `return`, yang secara otomatis ditambahkan oleh koleksi AMP ke URL login.

Dalam contoh di bawah ini, nilai untuk parameter `return` ditambahkan ke permintaan setelah Anda mengklik tombol login. Anda dapat mempelajari nilai ini menggunakan konsol Chrome DevTools dan mengunjungi tab Jaringan.

<amp-img src="/static/img/return-parameter.png" alt="Return parameter" height="150" width="600"></amp-img>


Setelah server AMPByExample menerima permintaan POST dari halaman login dan login serta sandi benar, server mengalihkan permintaan ke `returnURL` yang telah disebutkan di atas, dan menambahkan parameter `#success=true`. Waktu proses AMP kini dapat mengotorisasi halaman dan akhirnya mengizinkan Anda menambahkan komentar.

Sangat penting untuk memahami yang dilakukan oleh waktu proses AMP dan yang harus dilakukan oleh server, karena implementasi server merupakan tanggung jawab dari penayang halaman.

Sebagai rangkuman singkat:

- Waktu proses AMP secara otomatis menambahkan parameter respons ke permintaan login yang ditentukan di dalam objek login berformat JSON
- Waktu proses AMP menutup halaman login dan mengalihkan ke halaman yang ditentukan oleh parameter URL respons
- Server harus mengatur respons setelah pengguna mengklik tombol login

Tip: Penjelasan lebih detail tentang alur ini juga dapat ditemukan di [amp-access documentation](/id/docs/reference/components/amp-access.html#login-flow).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>


