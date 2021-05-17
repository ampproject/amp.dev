---
'$title': Menyematkan cerita di halaman web
$order: 3
description: Pemutar Cerita AMP
formats:
  - websites
  - stories
---

Cerita merupakan pengalaman layar penuh yang menghanyutkan. Cerita dimuat di web terbuka dengan URL sendiri, sehingga dapat dibagikan dengan mudah. Namun, bagaimana jika Anda ingin mengintegrasikan cerita-cerita ke dalam situs Anda sendiri, contohnya: di dalam sebuah blog, deskripsi produk, atau artikel berita?

Pemutar Cerita AMP memungkinkan Anda untuk menyematkan cerita yang dapat diketuk atau diklik pengguna di dalam sebuah halaman web. Ikutilah panduan langkah demi langkah ini untuk mempelajari caranya.

# Menampilkan cerita di halaman non-AMP

Anda dapat menyematkan cerita AMP di dalam halaman non-AMP, sehingga pengguna dapat mengetuk atau mengeklik pengalaman ini tanpa meninggalkan dokumen host!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## Menyematkan pemutar cerita AMP

Menampilkan sebuah cerita AMP di halaman non-AMP memerlukan penggunaan elemen [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md).

### Mengimpor skrip

Sertakan kedua skrip yang diperlukan di kepala dokumen Anda:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

Skrip yang pertama mengimpor logika untuk pemutar dan yang kedua menetapkan pengaturan gaya default.

### Menentukan sebuah cerita

Sertakan elemen `<amp-story-player>` di dalam `body` dokumen. Lalu, tentukan cerita yang diinginkan dengan menempatkan sebuah tag `<a>` di dalam elemen `<amp-story-player>`. Arahkan `href` ke lokasi cerita. `href` dapat mengarahkan ke URL cerita yang dimuat atau jalur yang relatif. Tempatkan judul cerita di dalam tag `<a>`.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### Menentukan ukuran pemutar

Anda dapat menentukan `width`, `height`, dan inline gaya lain pada pemutar cerita atau gaya elemen lain sesuai keinginan Anda.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

We recommend maintaining a 3:5 aspect ratio for the best user experience, but you may define any width and height.

#### Pengaturan ukuran yang responsif

Ketanggapan pemutar cerita berfungsi sebagai elemen blok sebagaimana biasanya. Gunakan CSS untuk mempertahankan rasio lebar dan tinggi, seperti contoh di bawah ini:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### Menyediakan placeholder (sediaan tempat)

Sertakan gambar poster yang representatif dengan menambahkan tag `<img>` sebagai anak dari tag `<a>` cerita dengan konfigurasi berikut ini. Pemutar cerita AMP menampilkan gambar ini saat memuat cerita lengkap.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

Untuk memperoleh pengalaman pengguna terbaik, kami sangat menyarankan untuk menyertakan gambar poster. Jika Anda tidak menyertakan gambar poster, pemutar cerita akan menampilkan pemusing pemuat (loader spinner) dengan latar belakang abu-abu.

## Menyematkan beberapa cerita

You may add multiple stories in the same `<amp-story-player>` element by defining multiple `<a>` tags. The player presents the second story’s cover page after user’s tap through the first.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

Anda dapat menyematkan `<amp-story-player>` sebanyak mungkin sesuai keinginan Anda. Mereka tampil sebagai pemutar terpisah.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Menampilkan cerita di halaman AMP

Untuk menggunakan komponen `<amp-story-player>` di halaman AMP, bacalah dokumentasi [versi AMP amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories).
