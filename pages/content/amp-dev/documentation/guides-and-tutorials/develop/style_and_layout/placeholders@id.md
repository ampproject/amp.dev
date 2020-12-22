---
"$title": Bakal tempat & fallback
"$order": '3'
descriptions: "In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible."
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Beberapa elemen bahkan akan memberikan hadiah berupa kelonggaran pembatasan jika Anda menyediakan bakal tempat dan fallback - contohnya, jika Anda menyediakan bakal tempat untuk [`<amp-iframe>`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), elemen tersebut dapat digunakan di dekat bagian atas halaman (yang tidak akan berfungsi tanpa bakal tempat).

## Bakal tempat (placeholder)

Elemen yang ditandai dengan atribut `placeholder` berfungsi sebagai bakal tempat untuk elemen AMP induk. Jika ditentukan, elemen `placeholder` harus merupakan anak langsung dari elemen AMP itu. Elemen yang ditandai sebagai `placeholder` akan selalu `fill` (mengisi) elemen AMP induk.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>
```
[/example]

Sebagai standar, bakal tempat langsung ditampilkan untuk elemen AMP, meskipun sumber daya elemen AMP tersebut belum diunduh atau diawali. Setelah siap, elemen AMP biasanya menyembunyikan bakal tempatnya dan menampilkan kontennya.

Bakal tempat tidak harus berupa elemen AMP; elemen HTML apa pun dapat berfungsi sebagai bakal tempat.

## Fallback <a name="fallbacks"></a>

Anda dapat menentukan atribut `fallback` pada sebuah elemen untuk mengindikasikan perilaku fallback:

- for any element the browser doesn’t support
- jika konten gagal dimuat (cth.: tweet yang telah dihapus)
- if the image type is unsupported (e.g., WebP isn't supported in all browsers)

Anda dapat menetapkan atribut `fallback` pada elemen HTML *apa pun*, bukan hanya elemen AMP. Jika ditetapkan, elemen `fallback` harus merupakan anak (turunan) langsung dari elemen AMP.

##### Contoh: Fitur yang tidak didukung

Dalam contoh berikut ini, kita menggunakan atribut `fallback` untuk menyampaikan kepada pengguna bahwa browser tidak mendukung fitur tertentu:

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

##### Contoh: Menampilkan format gambar yang berbeda

Dalam contoh berikut ini, kita menggunakan atribut `fallback` untuk memberi tahu browser agar menggunakan berkas JPEG jika format WebP tidak didukung.

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

## Interaksi bakal tempat dan fallback

Untuk komponen AMP yang mengandalkan konten dinamis (cth.: [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), interaksi fallback dan bakal tempat terjadi sebagai berikut:

<ol>
  <li>Tampilkan bakal tempat saat konten sedang dimuat.</li>
  <li>Jika konten berhasil dimuat, sembunyikan bakal tempat dan tampilkan konten.</li>
  <li>Jika konten gagal dimuat: <ol> <li>Jika ada elemen fallback, tampilkan fallback.</li> <li>Jika tidak, lanjutkan menampilkan bakal tempat.</li> </ol>
</li>
</ol>

## Menyembunyikan indikator pemuatan

Banyak elemen AMP yang masuk ke dalam daftar elemen yang diizinkan untuk menampilkan "indikator pemuatan", yaitu animasi dasar yang menunjukkan bahwa elemen belum dimuat sepenuhnya. Elemen dapat memilih menolak perilaku ini dengan menambahkan atribut `noloading`.
