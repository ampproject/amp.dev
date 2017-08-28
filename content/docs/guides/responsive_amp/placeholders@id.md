---
$title: Placeholder & fallback
$order: 3
toc: true
components:
- iframe
---
[TOC]

Agar mendapatkan performa dan peningkatan yang progresif, praktik terbaik AMP adalah menyediakan placeholder dan fallback jika memungkinkan.

Beberapa elemen juga akan memberikan bonus kepada Anda dengan melonggarkan batasan – misalnya, jika Anda menyediakan placeholder untuk [`<amp-iframe>`](/id/docs/reference/components/amp-iframe.html#iframe-with-placeholder), elemen tersebut dapat digunakan di dekat bagian atas halaman (ini tidak akan berfungsi tanpa placeholder).

## Placeholder

Elemen yang ditandai dengan atribut `placeholder` bertindak sebagai placeholder untuk elemen AMP induk. Jika ditentukan, elemen `placeholder` harus berupa turunan langsung dari elemen AMP. Elemen yang ditandai sebagai `placeholder` akan selalu `fill` elemen AMP induk.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div> 
</amp-iframe>
</div>

Secara default, placeholder langsung ditampilkan untuk elemen AMP, meski referensi elemen AMP belum didownload atau diinisialisasi. Setelah siap, elemen AMP biasanya menyembunyikan placeholder-nya dan menampilkan kontennya.

{% call callout('Catatan', type='note') %}
Placeholder tidak harus berupa elemen AMP. Elemen HTML apa pun dapat bertindak sebagai placeholder.
{% endcall %}

## Fallback

Gunakan atribut `fallback` untuk mengindikasikan perilaku pengganti bagi elemen apa pun yang tidak didukung oleh browser. Misalnya, gunakan atribut `fallback` untuk menyampaikan kepada pengguna bahwa browser tidak mendukung fitur tertentu:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div> 
</amp-iframe>
</div>

Atribut `fallback` dapat disetel pada elemen HTML apa pun, tidak hanya elemen AMP. Jika ditentukan, elemen `fallback` harus berupa turunan langsung dari elemen AMP.

## Interaksi placeholder dan fallback

Untuk komponen AMP yang bergantung pada konten dinamis (misalnya, `amp-twitter`, `amp-list`), interaksi fallback dan placeholder beroperasi sebagai berikut:

<ol>
  <li>Tampilkan placeholder saat konten dimuat.</li>
  <li>Jika konten berhasil dimuat, sembunyikan placeholder dan tampilkan konten.</li>
  <li>Jika konten gagal dimuat:
    <ol>
      <li>Jika ada elemen fallback, tampilkan fallback.</li>
      <li>Jika tidak, tetap tampilkan placeholder.</li>
    </ol>
  </li>
</ol>

## Menyembunyikan indikator pemuatan

Beberapa elemen AMP diberi izin untuk menampilkan "indikator pemuatan", yaitu animasi dasar yang menunjukkan bahwa elemen belum dimuat secara penuh. Elemen dapat memilih untuk tidak mengikuti perilaku ini dengan menambahkan atribut `noloading`.
