---
'$title': Bernavigasi di situs Anda
$order: 5
description: Sebagian besar situs web seluler menyertakan menu navigasi situs. Menu-menu ini bisa dalam berbagai bentuk. Di dalam tutorial ini, kita akan mencoba contoh berikut ini untuk ....
---

Sebagian besar situs web seluler menyertakan menu navigasi situs. Menu-menu ini bisa dalam berbagai bentuk. Di dalam tutorial ini, kita akan mencoba contoh berikut ini untuk menampilkan navigasi di halaman AMP:

- Tautan balik ke halaman beranda Anda - opsi paling sederhana.
- Bilah navigasi samping dengan menggunakan komponen [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## Tautan balik ke beranda

Cara termudah untuk memberi pengguna Anda akses ke opsi navigasi reguler situs web Anda adalah dengan menggiringnya kembali ke halaman beranda Anda!

Coba **ganti** tag `<header>` Anda dengan versi yang menyertakan sebuah tautan:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

Serta **tambahkan** beragam aturan gaya ini ke CSS inline Anda:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

Lalu, **segarkan** halaman. Anda akan melihat tautan di sudut kiri atas halaman yang mengarah ke `homepage.html`. Jika Anda mengeklik ikon beranda, Anda akan segera mengetahui bahwa ikon tersebut tidak akan mengarahkan Anda ke mana pun (karena kita tidak memiliki berkas `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Navigasi ikon beranda') }}

Tautan ini dapat diganti dengan URL halaman beranda situs web Anda untuk memungkinkan pengguna Anda mengakses bagian lain situs Anda melalui navigasi situs web Anda yang sudah ada.

Ini adalah pendekatan paling sederhana yang memanfaatkan navigasi situs web yang sudah ada. Berikutnya, kita akan mempelajari opsi yang sering digunakan untuk navigasi situs.

## Bernavigasi dengan bilah samping (sidebar)

Teknik navigasi umum adalah menambahkan ikon menu yang ketika diklik akan menampilkan kumpulan tautan navigasi (dari samping halaman). Di AMP, kita dapat membuat navigasi tersebut dengan komponen [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Pertama-tama, kita harus **menambahkan** JavaScript komponen [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) ke tag `<head>`:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
></script>
```

Kemudian, kita akan menampilkan ikon menu. Ketika diketuk, ikon akan membuka bilah samping. **Ganti** `<header>` dengan kode berikut ini untuk menampilkan ikon ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button), sebagai ganti ikon beranda:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

Di dalam kode di atas, kita `toggle` (mengalihkan) bilah samping ke atribut tindakan [`on`](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md) di elemen [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md), yang diidentifikasi dengan ID `sidebar1`. Mari kita tambahkan bilah samping.

**Tambahkan** HTML berikut ini setelah `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Bilah kita akan disembunyikan, tetapi ketika pengguna mengetuk ikon hamburger, menu akan muncul dari sisi kiri layar. Untuk menutup menu tersebut, pengguna dapat mengetuk tanda X.

Terakhir, **tambahkan** beragam aturan gaya ini ke CSS inline Anda:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Oke, mari kita lihat bilah samping kita. **Segarkan** dan muat ulang halaman AMP Anda. Anda akan melihat seperti yang berikut ini:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Navigasi menu bilah samping') }}

Halaman kita terlihat mantap! Mari tambahkan sentuhan terakhir — font kustom.
