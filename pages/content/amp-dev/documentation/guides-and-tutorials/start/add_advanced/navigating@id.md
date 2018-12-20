---
$title: Bernavigasi di situs Anda
---

[TOC]

Sebagian besar situs seluler menyertakan menu navigasi situs. Menu ini dapat berupa berbagai bentuk. Dalam tutorial ini, kita akan mencoba contoh berikut untuk menampilkan navigasi di halaman AMP:

- Link kembali ke halaman beranda -- opsi paling sederhana.
- Menu navigasi samping dengan menggunakan komponen [amp-sidebar](/id/docs/reference/components/amp-sidebar.html).

## Link kembali ke beranda

Cara termudah untuk memberi pengguna Anda akses ke opsi navigasi reguler situs Anda adalah dengan menyalurkannya kembali ke halaman beranda!

Coba **ganti** tag `<header>` Anda dengan versi yang menyertakan link:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img class="home-button" src="icons/home.png" width="36" height="36"></amp-img>
  </a>
<div class="site-name">News Site</div>
</header>
```

Serta **tambahkan** gaya ini ke CSS inline:

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
  flex: 1;
  margin-left: -36px;
}
article {
  margin-top: 50px;
}
```

Sekarang **refresh** halaman. Anda akan melihat link di pojok kiri atas halaman yang mengarah ke `homepage.html`.  Jika mengklik ikon beranda, Anda akan segera mengetahui bahwa ikon tersebut tidak akan mengarahkan ke mana pun (karena kita tidak memiliki file `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Navigasi ikon beranda') }}

Link ini dapat diganti dengan URL halaman beranda situs Anda untuk memungkinkan pengguna Anda mengakses bagian lain situs Anda melalui bavigasi situ.

Ini adalah pendekatan paling sederhana yang memanfaatkan navigasi situs yang sudah ada. Berikutnya, kita akan mempelajari opsi yang sering digunakan untuk navigasi situs.


## Bernavigasi dengan sidebar

Teknik navigasi umum adalah menambahkan ikon menu yang ketika diklik akan menampilkan kumpulan link navigasi (dari samping halaman). Di AMP,  kita dapat membuat navigasi tersebut dengan komponen [amp-sidebar](/id/docs/reference/components/amp-sidebar.html).

Pertama-tama, kita harus **menambahkan** JavaScript komponen `amp-sidebar` ke tag `<head>`:

```html
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
```

Kemudian, kita ingin menampilkan ikon menu.  Ketika di-tap, ikon akan membuka sidebar. **Ganti** `<header>` dengan kode berikut untuk menampilkan ikon ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button), bukan ikon beranda:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
  <div class="site-name">News Site</div>
</header>
```

Dalam kode di atas, kita `toggle` (mengalihkan) sidebar ke atribut tindakan [`on`](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md) di elemen `amp-sidebar`, yang ditunjukkan oleh ID `sidebar1`.  Mari kita tambahkan sidebar.


**Tambahkan** HTML berikut setelah `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div role="button" aria-label="close sidebar" on="tap:sidebar1.toggle" tabindex="0" class="close-sidebar">✕</div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Sidebar kami akan disembunyikan, tetapi ketika pengguna menge-tap ikon hamburger, menu akan muncul dari sisi kiri layar.  Untuk menutup menu, pengguna dapat menge-tap ikon X.

Terakhir, **tambahkan** aturan gaya ini ke CSS inline Anda:

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
  margin-bottom:10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Oke, mari kita lihat sidebar kita. **Refresh** dan muat ulang halaman AMP Anda.  Anda akan melihat sesuatu seperti ini:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Navigasi menu sidebar') }}

Halaman kita sudah selesai!  Mari tambahkan sentuhan terakhir&mdash;font custom.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/tracking_data.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/fonts.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
