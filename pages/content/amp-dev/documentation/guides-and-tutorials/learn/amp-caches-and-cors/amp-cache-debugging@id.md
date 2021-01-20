---
"$title": Debug masalah Cache AMP
order: '8'
formats:
- websites
- stories
- ads
teaser:
  text: Mengapa dokumen saya rusak di cache AMP?
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Mengapa dokumen saya rusak di cache AMP? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Dokumen AMP yang valid biasanya tampil dan berperilaku sama pada Cache AMP sebagaimana pada asal. Namun, ada beberapa komponen dan konfigurasi server yang dapat menimbulkan masalah.

Jika suatu dokumen tertentu tampil dan berperilaku sebagaimana di asal Anda, namun tidak demikian saat dilihat melalui cache [(cara memetakan URL asal pada Cache AMP Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), cobalah yang berikut ini:

1. Buka konsol alat eror/pengembang browser Anda, lalu atasi eror atau peringatan apa pun yang muncul.
2. Jalankan dokumen tersebut melalui [AMPBench](https://search.google.com/test/amp), lalu atasi eror atau peringatan yang tidak tak terduga.

Jika Anda masih mengalami masalah setelah mengikuti langkah-langkah ini, periksalah tabel di bawah ini.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Gejala</th>
      <th width="30%">Masalah</th>
      <th width="40%">Solusi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Font web tidak muncul (font fallback digunakan)</td>
      <td>Cache AMP tidak diberikan izin oleh penyedia font.</td>
      <td>Hubungi penyedia font dan minta mereka untuk mengizinkan <a href="https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests#cors-security-in-amp">semua cache</a>.</td>
    </tr>
    <tr>
      <td>Aset (cth., font dan gambar) tidak muncul (<strong>hanya asal HTTP</strong>)</td>
      <td>Dokumen tersebut menggunakan URL dengan protokol yang tidak mutlak/relatif.</td>
      <td>Beralih ke URL mutlak (yaitu, <code>http://www.site.com/doc/amp</code>, bukan <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Aset (cth., font dan gambar) tidak muncul</td>
      <td>Aset disajikan dengan jenis MIME yang tidak benar.</td>
      <td>Tentukan sebuah <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">jenis MIME yang dapat diterima</a>.</td>
    </tr>
    <tr>
      <td>Cache AMP tidak dapat mengakses aset.</td>
      <td>Pastikan Cache AMP dapat mengakses aset Anda dan bahwa ia tidak diblokir oleh sebuah alamat IP, atau agen pengguna, dll. (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Daftar agen pengguna yang digunakan oleh pengambil Google</a>).</td>
    </tr>
    <tr>
      <td>Elemen dinamis, seperti <code><amp-form></amp-form></code>, <code><amp-list></amp-list></code>, tidak berperilaku sebagaimana diharapkan.</td>
      <td>Tajuk CORS tidak ada atau rusak</td>
      <td>Komponen-komponen ini membuat permintaan lintas asal dari Cache AMP ke asal Anda. Sebagai default, browser akan memblokir permintaan ini. Untuk mengizinkan permintaan ini, masukkan <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">tajuk CORS</a> yang mencantumkan daftar <a href="https://amp.dev/documentation/guides-and-tutorials/amp-cors-requests.html">semua cache</a> yang diizinkan.</td>
    </tr>
    <tr>
      <td>Konten yang sedang disajikan, namun harus dihapus karena adanya pemberitahuan penghapusan berdasarkan hukum.</td>
      <td>Cache AMP belum memenuhi penghapusan.</td>
      <td>Ikuti panduan untuk setiap Cache AMP untuk menyegarkan konten. Untuk Cache AMP Google, kunjungi <a href="https://developers.google.com/amp/cache/update-cache">Memperbarui Konten AMP</a>.</td>
    </tr>
</tbody>
</table>

</table>
