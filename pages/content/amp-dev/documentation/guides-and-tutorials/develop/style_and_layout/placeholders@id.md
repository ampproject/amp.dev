---
$title: Placeholder & fallback
---

Dalam upaya meningkatkan performa dan progressive enhancement yang dirasakan, salah satu praktik terbaik dalam AMP adalah menyediakan placeholder dan fallback di mana pun dimungkinkan.

Beberapa elemen bahkan akan memberikan reward berupa kelonggaran pembatasan jika Anda menyediakan placeholder dan fallback - misalnya, jika Anda menyediakan placeholder untuk [`<amp-iframe>`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), elemen tersebut dapat digunakan di dekat bagian atas halaman (yang tidak akan berfungsi tanpa placeholder)

## Placeholder

Elemen yang ditandai dengan atribut `placeholder` berfungsi
sebagai placeholder untuk elemen AMP induk.
Jika ditentukan, elemen `placeholder` harus merupakan turunan langsung dari elemen AMP itu.
Elemen yang ditandai sebagai `placeholder` akan selalu `fill` (mengisi) elemen AMP induk.

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

Secara default, placeholder langsung ditampilkan untuk elemen AMP,
meskipun resource elemen AMP tersebut belum didownload atau diinisialisasi.
Setelah siap, elemen AMP biasanya menyembunyikan placeholder-nya dan menampilkan kontennya.

[tip type="note"]

Placeholder tidak harus berupa elemen AMP;
elemen HTML apa pun dapat berfungsi sebagai placeholder.

[/tip]

## Fallback <a name="fallbacks"></a>

Anda dapat menentukan atribut `fallback` pada sebuah elemen untuk menunjukkan perilaku fallback:

* untuk elemen apa pun yang tidak didukung oleh browser
* jika konten gagal dimuat (misalnya tweet dihapus)
* jika jenis gambar tidak didukung (misalnya WebP tidak didukung di semua browser)

Anda dapat menetapkan atribut `fallback` pada elemen HTML *apa pun*, bukan hanya di elemen AMP. Jika ditentukan, elemen `fallback` harus berupa turunan langsung dari elemen AMP.

##### Contoh: Fitur tidak didukung

Pada contoh berikut, kami menggunakan atribut `fallback` untuk memberi tahu pengguna bahwa browser tidak mendukung fitur tertentu:

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

Pada contoh berikut, kami menggunakan atribut `fallback` untuk memberi tahu browser agar menggunakan file JPEG jika format WebP tidak didukung. 

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

## Interaksi placeholder dan fallback

Untuk komponen AMP yang mengandalkan konten dinamis (misalnya [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), interaksi fallback dan placeholder beroperasi sebagai berikut:

<ol>
  <li>Tampilkan placeholder saat konten sedang dimuat.</li>
  <li>Jika konten berhasil dimuat, sembunyikan placeholder dan tampilkan konten.</li>
  <li>Jika konten gagal dimuat:
    <ol>
      <li>Jika ada elemen fallback, tampilkan fallback.</li>
      <li>Jika tidak, lanjutkan menampilkan placeholder.</li>
    </ol>
  </li>
</ol>

## Menyembunyikan indikator pemuatan

Banyak elemen AMP diberi akses untuk menampilkan "indikator pemuatan",
yaitu animasi dasar yang menunjukkan bahwa elemen belum dimuat sepenuhnya.
Elemen dapat memilih keluar dari perilaku ini dengan menambahkan atribut `noloading`.
 
