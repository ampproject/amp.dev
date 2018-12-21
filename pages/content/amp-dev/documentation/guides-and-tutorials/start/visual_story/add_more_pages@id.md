---
$title: Menambahkan lebih banyak halaman
---

Setelah menguasai cara menambahkan halaman ke artikel AMP, halaman berikutnya dalam artikel "The Joy of Pets" dapat ditambahkan dengan cara yang hampir sama. Berdasarkan informasi yang diberikan di bawah, **lanjutkan membuat halaman lainnya** dengan memanfaatkan pengetahuan yang telah Anda pelajari sejauh ini.  Jika menemui kesulitan, lihat kode (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) yang telah jadi.

[tip type="success"]

Ingatlah bahwa setiap halaman memerlukan atribut "id" unik (misalnya `id="page1"`).

[/tip]

## Halaman 1: Kucing

Menunjukkan cara menampilkan gambar dan teks dalam satu lapisan.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Memuat 1 lapisan:
      <ul>
        <li>Mengimplementasikan template <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#vertical"><code>vertical</code></a>.</li>
        <li>Memuat 3 elemen:
          <ul>
            <li>Elemen <code>&lt;h1></code> dengan judul: <em>Kucing</em></li>
            <li>Elemen <a href="/docs/reference/components/amp-img.html">amp-img</a> responsif (<code class="filename">cat.jpg</code>, 720 x 1280 piksel)</li>
            <li>Elemen <code>&lt;q></code> untuk kutipan berikut: <em>Anjing mendekat jika dipanggil. Kucing menerima pesan dan kembali ke Anda. --Mary Bly</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Halaman 1 - Kucing' ) }}</td>
  </tr>
</table>

## Halaman 2: Anjing

Menunjukkan cara menata teks dan menampilkan gambar pengisi layar dengan dua lapisan.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Memuat 2 lapisan:
      <ul>
        <li><b>Lapisan 1</b>: Mengimplementasikan template <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#fill"><code>fill</code></a>, dan memuat elemen <a href="{{g.doc('/content/amp-dev/documentation/components/I/amp-img.md', locale=doc.locale).url.path}}">amp-img</a> responsif (<code class="filename">dog.jpg</code>, 720 x 1280 piksel).</li>
        <li><b>Lapisan 2</b>: Mengimplementasikan template <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#thirds"><code>thirds</code></a> dan memuat 2 elemen:
          <ul>
            <li>Elemen <code>&lt;h1></code> dengan judul: <em>Anjing</em></li>
            <li>Elemen <code>&lt;p></code> yang menetapkan <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#thirds"><code>grid-area</code></a> (area petak) yang mengisi <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#thirds"><code>lower-third</code></a> (pertiga bawah) dan memuat teks berikut: <em>Bisa jadi anjing adalah binatang jinak pertama. Mereka telah menemani manusia selama sekitar 10.000 tahun. Beberapa ilmuwan berpendapat bahwa semua anjing, entah jinak maupun liar, memiliki nenek moyang yang sama, yaitu serigala kecil dari Asia Selatan.</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Halaman 2 - Anjing' ) }}</td>
  </tr>
</table>

## Halaman 3: Burung

Menunjukkan cara menata teks, menampilkan gambar pengisi layar, dan memberikan background audio untuk halaman.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Memuat 3 lapisan:
      <ul>
        <li><b>Lapisan 1</b>: Mengimplementasikan template <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#fill"><code>fill</code></a>, dan memuat komponen <a href="/id/docs/reference/components/amp-img.html">amp-img</a> responsif (<code class="filename">bird.jpg</code>, 720 x 1280 piksel).</li>
        <li><b>Lapisan 2</b>: Mengimplementasikan template <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#vertical"><code>vertical</code></a> dan memuat satu elemen:
          <ul>
            <li>Elemen <code>&lt;h1></code> dengan judul: <em>Burung</em></li>
          </ul>
        </li>
        <li><b>Lapisan 3</b>: Mengimplementasikan template <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#vertical"><code>vertical</code></a> dan memuat satu elemen:
          <ul>
            <li>Elemen <code>&lt;q></code> untuk kutipan berikut: <em>Burung terdiri dari tiga hal: bulu, terbang, dan lagu. Dari ketiganya, bulu adalah yang paling tidak penting.--Marjorie Allen Seiffert</em></li>
            <li>Lapisan ketiga ini menetapkan <code>class="bottom"</code> untuk menyejajarkan elemen turunan dengan bagian bawah layar.</li>
          </ul>
        </li>
      </ul></li>
      <li>Memutar file audio di latar belakang saat halaman ditampilkan. Anda dapat memutar audio di latar belakang untuk seluruh artikel, atau untuk satu halaman.  Untuk memutar audio untuk satu halaman, tambahkan atribut <code>background-audio="assets/bird-singing.mp3"</code> ke elemen <code>&lt;amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Halaman 3 - Burung' ) }}</td>
  </tr>
</table>

## Halaman 4: Kelinci

Menunjukkan cara menata teks dan menampilkan video pengisi layar untuk halaman.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Memuat 3 lapisan:
      <ul>
        <li><b>Lapisan 1</b>: Mengimplementasikan template <code>fill</code> , dan memuat elemen <a href="/id/docs/reference/components/amp-video.html">amp-video</a> responsif (<code class="filename">rabbit.mp4</code>).
          <ul>
            <li>Ingatlah untuk menambahkan <strong>skrip wajib</strong> untuk komponen <a href="/id/docs/reference/components/amp-video.html">amp-video</a> di bagian <code>&lt;head></code> agar video dapat ditampilkan.</li>
            <li>Tetapkan gambar <code>poster</code> (<code class="filename">rabbit.jpg</code>). Atribut ini <strong>harus ada</strong> agar artikel AMP dinyatakan valid.</li>
            <li>Setel video agar otomatis diputar dengan atribut <code>autoplay</code>. Atribut ini <strong>harus ada</strong> agar artikel AMP dinyatakan valid.</li>
            <li>Setel video agar otomatis diulang lagi dengan atribut <code>loop</code>.</li>
            <li>Setel dimensinya ke <code>width="720"</code> <code>height="1280"</code> dan <code>layout="responsive"</code>.</li>
          </ul></li>
        <li><b>Lapisan 2</b>: Mengimplementasikan template <code>vertical</code> dan memuat satu elemen:
          <ul>
            <li>Elemen <code>&lt;h1></code> dengan judul: <em>Kelinci</em></li>
          </ul>
        </li>
        <li><b>Lapisan 3</b>: Mengimplementasikan template <code>vertical</code> dan memuat satu elemen:
          <ul>
            <li>Elemen <code>&lt;p></code> yang memuat teks berikut: <em>Kelinci dapat belajar mematuhi perintah-perintah suara sederhana dan mendekat jika namanya dipanggil, memiliki rasa ingin tahu yang tinggi, dan asyik diajak bermain</em>.</li>
            <li>Terapkan class CSS <code>bottom</code> ke lapisan ini untuk menyejajarkan elemen turunan dengan bagian bawah layar.</li>
          </ul>
        </li></ul></li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Halaman 4 - Kelinci' ) }}</td>
  </tr>
</table>

Artikel "Joy of Pets" kita hampir selesai. Kita akan menggunakan animasi di halaman terakhir untuk menampilkan semua hewan peliharaan itu bersama-sama.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/animating_elements.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
 
