---
"$title": Masuk (Login)
"$order": '1'
description: Saat pertama kali Anda sampai di halaman, Anda dapat melihat 2 komentar dan sebuah tombol masuk (login). Jika Anda mencari tombol masuk di kode, Anda akan menemukan ....
---

Saat pertama kali Anda sampai di [halaman](../../../../documentation/examples/previews/Comment_Section.html), Anda dapat melihat 2 komentar dan sebuah tombol masuk (login).

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Jika mencari tombol login di kode, Anda akan menemukan:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Perilaku atribut yang terkait dengan [`amp-access`](../../../../documentation/components/reference/amp-access.md) bergantung pada konfigurasi di seluruh halaman untuk [`amp-access`](../../../../documentation/components/reference/amp-access.md), dalam kasus ini, adalah contoh berikut ini:

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

Titik akhir (endpoint) otorisasi diterapkan sebagai bagian dari AMPByExample. Penayang halaman bertanggung jawab untuk menyediakan titik akhir ini. Dalam kasus sampel ini, untuk kemudahan, kita menerapkan logika dasar sehingga jika permintaan ini diterima, server membaca nilai cookie bernama `ABE_LOGGED_IN`. Jika cookie-nya tidak ada, kita menampilkan respons JSON berisi `loggedIn = false`. Hasilnya, pertama kali pengguna sampai di halaman tersebut, permintaan ini akan menghasilkan `loggedIn = false` dan tombol masuk akan ditampilkan.

Jika melihat lagi kode HTML tombol dengan menggunakan `on="tap:amp-access.login-sign-in"`, kita dapat menentukan bahwa setelah pengguna mengetuk tombol tersebut, URL yang ditentukan pada JSON di atas harus digunakan:

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

[tip type="note"] **CATATAN –** Perhatikan bahwa mungkin untuk mendefinisikan URL yang berbeda di dalam node masuk, dalam hal ini kita mendefinisikan `sign-in`, kemudian kita akan mendefinisikan `sign-out`. [/tip]

Halaman masuk merupakan halaman non-AMP tempat kita mengisi nilai masuk dan kata sandi supaya mudah. Perhatikan penggunaan jenis input tersembunyi `returnURL`, yang diisi oleh server AMPByExample melalui penyediaan templat sisi server. Server membaca nilai ini dari parameter yang disebut `return`, yang secara otomatis ditambahkan oleh perpustakaan AMP ke URL masuk (sign-in).

Dalam contoh di bawah ini, nilai untuk parameter `return` ditambahkan ke permintaan setelah Anda mengeklik tombol masuk. Anda dapat mempelajari nilai ini dengan menggunakan konsol Chrome DevTools dan mengunjungi bilah Jaringan.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Setelah server AMPByExample menerima permintaan POST dari halaman masuk, dan kredensial masuk serta kata sandi benar, server mengalihkan permintaan ke `returnURL` yang telah disebutkan di atas, dan menambahkan parameter `#success=true`. Runtime AMP kini dapat mengotorisasi halaman dan akhirnya mengizinkan Anda menambahkan komentar.

Sangat penting untuk memahami yang dilakukan oleh runtime AMP dan yang harus dilakukan oleh server, karena penerapan server merupakan tanggung jawab penayang halaman.

Sebagai rangkuman singkat:

- Runtime AMP secara otomatis menambahkan parameter respons ke permintaan masuk yang ditentukan di dalam objek masuk berformat JSON
- Runtime AMP menutup halaman masuk dan mengalihkan ke halaman yang ditentukan oleh parameter URL respons
- Server harus mengatur respons setelah pengguna mengeklik tombol masuk

[tip type="tip"] **KIAT –** Penjelasan lebih mendetail tentang alur ini juga dapat ditemukan di [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]
