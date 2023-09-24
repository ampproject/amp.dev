---
'$title': Adding more pages
$order: 5
description: Setelah kini Anda menguasai cara menambahkan halaman ke Cerita Web, cara menambahkan halaman berikutnya dalam cerita "The Joy of Pets" sangat mirip.
author: bpaduch
---

Setelah kini Anda menguasai cara menambahkan halaman ke Cerita Web, cara menambahkan halaman berikutnya dalam cerita "The Joy of Pets" sangat mirip. Berdasarkan informasi yang diberikan di bawah, **lanjutkan membuat halaman lainnya** dengan memanfaatkan pengetahuan yang telah Anda pelajari sejauh ini. Jika menemui kesulitan, lihat kode (<a href="https://github.com/ampproject/amp.dev/blob/legacy-master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) yang telah selesai.

[tip type="tip"] **KIAT –** Ingatlah bahwa setiap halaman membutuhkan atribut "id" yang unik (cth.: `id="page1"`). [/tip]

## Halaman 1: Kucing

Memperagakan cara menampilkan gambar dan teks dalam satu lapisan.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Berisi 1 lapisan: <ul> <li>Menerapakan templat <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li> <li>Berisi 3 elemen: <ul> <li>Sebuah elemen <code><p></code> dengan judul: <em>Kucing</em> </li> <li>
<a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>, 720 x 1280px) responsif </li> <li>Sebuah elemen <code><q></code> responsif untuk kutipan berikut ini: <em>Anjing datang jika dipanggil. Kucing mengantarkan pesan dan kembali. --Mary Bly</em> </li> </ul> </li> </ul>
</li>
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
        <li>Berisi 2 lapisan: <ul> <li> <b>Lapisan 1</b>: Menerapkan templat <a href="create_cover_page.md#fill"><code>fill</code></a>, dan berisi <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">dog.jpg</code>, 720 x 1280px) responsif.</li> <li> <b>Lapisan 2</b>: Menerapkan templat <a href="create_cover_page.md#thirds"><code>thirds</code></a> dan berisi 2 elemen: <ul> <li>Sebuah elemen <code><h1></code> dengan judul: <em>Anjing</em> </li> <li>Sebuah elemen <code><p></code> yang menentukan <a href="create_cover_page.md#thirds"><code>grid-area</code></a> yang menempati bagian <a href="create_cover_page.md#thirds"><code>lower-third</code></a> dan berisi teks berikut ini: <em>Anjing mungkin hewan yang dijinakkan pertama kali. Mereka telah menemani manusia selama sekitar 10.000 tahun. Sejumlah ilmuwan meyakini bahwa semua anjing, jinak dan liar, mempunyai nenek moyang yang sama, yaitu serigala kecil di Asia Selatan.</em> </li> </ul> </li> </ul>
</li>
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
      <li>Berisi 3 lapisan:       <ul>         <li> <b>Lapisan 1</b>: Menerapkan templat <a href="create_cover_page.md#fill"><code>fill</code></a>, dan berisi komponen <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> responsif (<code class="filename">bird.jpg</code>, 720 x 1280 piksel).</li>         <li> <b>Lapisan 2</b>: Menerapkan templat <a href="create_cover_page.md#vertical"><code>vertical</code></a> dan berisi satu elemen:           <ul>             <li>Elemen <code><h1></code> dengan judul: <em>Burung</em> </li>           </ul>         </li>         <li> <b>Lapisan 3</b>: Menerapkan templat <a href="create_cover_page.md#vertical"><code>vertical</code></a> dan berisi satu elemen:           <ul>             <li>Elemen <code><q></code> untuk kutipan berikut ini: <em>Burung terdiri dari tiga hal: bulu, penerbangan, dan lagu. Dari ketiganya, bulu adalah yang paling tidak penting.--Marjorie Allen Seiffert</em> </li>             <li>Lapisan ketiga ini menetapkan <code>class="bottom"</code> untuk menyejajarkan elemen anak dengan bagian bawah layar.</li>           </ul>         </li>       </ul>
</li>
      <li>Memutar berkas audio di latar belakang saat halaman ditampilkan. Anda dapat memutar audio di latar belakang untuk seluruh cerita, atau untuk satu halaman. Untuk memutar audio untuk satu halaman, tambahkan atribut <code>background-audio="assets/bird-singing.mp3"</code> ke elemen <code>&lt;amp-story-page></code>.</li>
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
      <li>Berisi 3 lapisan:       <ul>         <li> <b>Lapisan 1</b>: Menerapkan templat <code>fill</code>, dan memuat elemen <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> responsif (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Ingatlah untuk menambahkan <strong>skrip wajib</strong> untuk komponen <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> di bagian <code></code> agar video dapat ditampilkan.</li>             <li>Tetapkan gambar <code>poster</code> (<code class="filename">rabbit.jpg</code>). Atribut ini <strong>harus ada</strong> agar cerita AMP dinyatakan valid.</li>             <li>Atur video agar otomatis diputar dengan atribut <code>autoplay</code>. Atribut ini <strong>harus ada</strong> agar cerita AMP dinyatakan valid.</li>             <li>Atur video agar otomatis diulang lagi dengan atribut <code>loop</code>.</li>             <li>Atur dimensinya ke <code>width="720"</code> <code>height="1280"</code> dan <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>Lapisan 2</b>: Menerapkan templat <code>vertical</code> dan berisi satu elemen:           <ul>             <li>Elemen <code><h1></code> dengan judul: <em>Kelinci</em> </li>           </ul>         </li>         <li> <b>Lapisan 3</b>: Menerapkan templat <code>vertical</code> dan berisi satu elemen:           <ul>             <li>Elemen <code><p></code> yang memuat teks berikut ini: <em>Kelinci dapat belajar mematuhi perintah-perintah suara sederhana dan mendekat jika namanya dipanggil, memiliki rasa ingin tahu yang tinggi, dan asyik diajak bermain</em>.</li>             <li>Terapkan kelas CSS <code>bottom</code> ke lapisan ini untuk menyejajarkan elemen anak dengan bagian bawah layar.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Cerita "Joy of Pets" kita hampir selesai. Kita akan menggunakan animasi pada halaman terakhir untuk menampilkan semua hewan peliharaan bersama-sama.
