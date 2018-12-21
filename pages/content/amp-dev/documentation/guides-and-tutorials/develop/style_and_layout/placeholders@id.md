---
$title: Placeholder & fallback
---
[TOC]

Dalam upaya meningkatkan performa dan progressive enhancement yang dirasakan, salah satu praktik terbaik dalam AMP adalah menyediakan placeholder dan fallback di mana pun dimungkinkan.

Beberapa elemen bahkan akan memberikan reward berupa kelonggaran pembatasan jika Anda menyediakan placeholder dan fallback - misalnya, jika Anda menyediakan placeholder untuk [`<amp-iframe>`](/id/docs/reference/components/amp-iframe.html#iframe-with-placeholder), elemen tersebut dapat digunakan di dekat bagian atas halaman (yang tidak akan berfungsi tanpa placeholder).

## Placeholder

Elemen yang ditandai dengan atribut `placeholder` berfungsi
sebagai placeholder untuk elemen AMP induk.
Jika ditentukan, elemen `placeholder` harus merupakan turunan langsung dari elemen AMP itu.
Elemen yang ditandai sebagai `placeholder` akan selalu `fill` (mengisi) elemen AMP induk.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Tampilkan kode lengkap</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Secara default, placeholder langsung ditampilkan untuk elemen AMP,
meskipun resource elemen AMP tersebut belum didownload atau diinisialisasi.
Setelah siap, elemen AMP biasanya menyembunyikan placeholder-nya dan menampilkan kontennya.

[tip type="note"]

Placeholder tidak harus berupa elemen AMP;
elemen HTML apa pun dapat berfungsi sebagai placeholder.

[/tip]

## Fallback

Anda dapat menentukan atribut `fallback` pada sebuah elemen untuk menunjukkan perilaku fallback:

* untuk elemen apa pun yang tidak didukung oleh browser
* jika konten gagal dimuat (misalnya tweet dihapus)
* jika jenis gambar tidak didukung (misalnya WebP tidak didukung di semua browser)

Anda dapat menetapkan atribut `fallback` pada elemen HTML *apa pun*, bukan hanya di elemen AMP. Jika ditentukan, elemen `fallback` harus berupa turunan langsung dari elemen AMP.

##### Contoh: Fitur tidak didukung

Pada contoh berikut, kami menggunakan atribut `fallback` untuk memberi tahu pengguna bahwa browser tidak mendukung fitur tertentu:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Tampilkan kode lengkap</div>
  <div placeholder></div> 
</amp-iframe>
</div>

##### Contoh: Menampilkan format gambar yang berbeda

Pada contoh berikut, kami menggunakan atribut `fallback` untuk memberi tahu browser agar menggunakan file JPEG jika format WebP tidak didukung. 

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Tampilkan kode lengkap</div><div placeholder></div></amp-iframe></div>

## Interaksi placeholder dan fallback

Untuk komponen AMP yang mengandalkan konten dinamis (misalnya `amp-twitter`, `amp-list`), interaksi fallback dan placeholder beroperasi sebagai berikut:

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
 
