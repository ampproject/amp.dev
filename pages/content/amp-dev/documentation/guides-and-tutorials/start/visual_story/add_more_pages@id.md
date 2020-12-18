---
"$title": Adding more pages
"$order": '5'
description: Setelah kini Anda menguasai cara menambahkan halaman ke Cerita Web, cara menambahkan halaman berikutnya dalam cerita "The Joy of Pets" sangat mirip.
author: bpaduch
---

Setelah kini Anda menguasai cara menambahkan halaman ke Cerita Web, cara menambahkan halaman berikutnya dalam cerita "The Joy of Pets" sangat mirip. Berdasarkan informasi yang diberikan di bawah, **lanjutkan membuat halaman lainnya** dengan memanfaatkan pengetahuan yang telah Anda pelajari sejauh ini. Jika menemui kesulitan, lihat kode (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) yang telah selesai.

[tip type="tip"] **KIAT –** Ingatlah bahwa setiap halaman membutuhkan atribut "id" yang unik (cth.: `id="page1"`). [/tip]

## Halaman 1: Kucing

Memperagakan cara menampilkan gambar dan teks dalam satu lapisan.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Memuat 1 lapisan:       <ul>         <li>Mengimplementasikan template <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li>         <li>Memuat 3 elemen:           <ul>             <li>Elemen <code><h1></h1></code> dengan judul: <em>Kucing</em> </li>             <li>Elemen <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> responsif (<code class="filename">cat.jpg</code>, 720 x 1280 piksel)</li>             <li>Elemen <code><q></q></code> untuk kutipan berikut: <em>Anjing mendekat jika dipanggil. Kucing menerima pesan dan kembali ke Anda. --Mary Bly</em> </li>           </ul>         </li>       </ul> </li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Halaman 2: Anjing

Memperagakan cara menyusun teks dan menampilkan gambar yang memenuhi layar dengan dua lapisan.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Memuat 2 lapisan:       <ul>         <li> <b>Lapisan 1</b>: Mengimplementasikan template <a href="create_cover_page.md#fill"><code>fill</code></a>, dan memuat elemen <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> responsif (<code class="filename">dog.jpg</code>, 720 x 1280 piksel).</li>         <li> <b>Lapisan 2</b>: Mengimplementasikan template <a href="create_cover_page.md#thirds"><code>thirds</code></a> dan memuat 2 elemen:           <ul>             <li>Elemen <code><h1></h1></code> dengan judul: <em>Anjing</em> </li>             <li>Elemen <code><p></p></code> yang menetapkan <a href="create_cover_page.md#thirds"><code>grid-area</code></a> (area petak) yang mengisi <a href="create_cover_page.md#thirds"><code>lower-third</code></a> (pertiga bawah) dan memuat teks berikut: <em>Bisa jadi anjing adalah binatang jinak pertama. Mereka telah menemani manusia selama sekitar 10.000 tahun. Beberapa ilmuwan berpendapat bahwa semua anjing, entah jinak maupun liar, memiliki nenek moyang yang sama, yaitu serigala kecil dari Asia Selatan.</em> </li>           </ul>         </li>       </ul> </li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Halaman 3: Burung

Memperagakan cara menyusun teks, menampilkan gambar yang memenuhi layar, dan menyediakan audio latar belakang untuk halaman.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Memuat 3 lapisan:       <ul>         <li> <b>Lapisan 1</b>: Mengimplementasikan template <a href="create_cover_page.md#fill"><code>fill</code></a>, dan memuat komponen <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> responsif (<code class="filename">bird.jpg</code>, 720 x 1280 piksel).</li>         <li> <b>Lapisan 2</b>: Mengimplementasikan template <a href="create_cover_page.md#vertical"><code>vertical</code></a> dan memuat satu elemen:           <ul>             <li>Elemen <code><h1></h1></code> dengan judul: <em>Burung</em> </li>           </ul>         </li>         <li> <b>Lapisan 3</b>: Mengimplementasikan template <a href="create_cover_page.md#vertical"><code>vertical</code></a> dan memuat satu elemen:           <ul>             <li>Elemen <code><q></q></code> untuk kutipan berikut: <em>Burung terdiri dari tiga hal: bulu, terbang, dan lagu. Dari ketiganya, bulu adalah yang paling tidak penting.--Marjorie Allen Seiffert</em> </li>             <li>Lapisan ketiga ini menetapkan <code>class="bottom"</code> untuk menyejajarkan elemen turunan dengan bagian bawah layar.</li>           </ul>         </li>       </ul> </li>
      <li>Memutar file audio di latar belakang saat halaman ditampilkan. Anda dapat memutar audio di latar belakang untuk seluruh artikel, atau untuk satu halaman.  Untuk memutar audio untuk satu halaman, tambahkan atribut <code>background-audio="assets/bird-singing.mp3"</code> ke elemen <code><amp-story-page></amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Halaman 4: Kelinci

Memperagakan cara menyusun teks, menampilkan video yang memenuhi layar untuk halaman.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Memuat 3 lapisan:       <ul>         <li> <b>Lapisan 1</b>: Mengimplementasikan template <code>fill</code> , dan memuat elemen <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> responsif (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Ingatlah untuk menambahkan <strong>skrip wajib</strong> untuk komponen <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> di bagian <code></code> agar video dapat ditampilkan.</li>             <li>Tetapkan gambar <code>poster</code> (<code class="filename">rabbit.jpg</code>). Atribut ini <strong>harus ada</strong> agar artikel AMP dinyatakan valid.</li>             <li>Setel video agar otomatis diputar dengan atribut <code>autoplay</code>. Atribut ini <strong>harus ada</strong> agar artikel AMP dinyatakan valid.</li>             <li>Setel video agar otomatis diulang lagi dengan atribut <code>loop</code>.</li>             <li>Setel dimensinya ke <code>width="720"</code> <code>height="1280"</code> dan <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>Lapisan 2</b>: Mengimplementasikan template <code>vertical</code> dan memuat satu elemen:           <ul>             <li>Elemen <code><h1></h1></code> dengan judul: <em>Kelinci</em> </li>           </ul>         </li>         <li> <b>Lapisan 3</b>: Mengimplementasikan template <code>vertical</code> dan memuat satu elemen:           <ul>             <li>Elemen <code><p></p></code> yang memuat teks berikut: <em>Kelinci dapat belajar mematuhi perintah-perintah suara sederhana dan mendekat jika namanya dipanggil, memiliki rasa ingin tahu yang tinggi, dan asyik diajak bermain</em>.</li>             <li>Terapkan class CSS <code>bottom</code> ke lapisan ini untuk menyejajarkan elemen turunan dengan bagian bawah layar.</li>           </ul>         </li> </ul> </li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Cerita "Joy of Pets" kita hampir selesai. Kita akan menggunakan animasi pada halaman terakhir untuk menampilkan semua hewan peliharaan bersama-sama.
