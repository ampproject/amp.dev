---
'$title': Tindakan dan peristiwa
$order: 0
formats:
  - websites
  - stories
  - ads
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

[tip type="note"]Dokumentasi ini mencakup tindakan dan peristiwa untuk iklan, cerita, dan situs web AMP. Bacalah [Tindakan dan peristiwa di email AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md) untuk mengetahui format email AMP. [/tip]

Atribut `on` digunakan untuk menginstal pengurus (handler) peristiwa pada elemen. Peristiwa-peristiwa yang didukung bergantung pada elemen.

Nilai untuk sintaksis adalah bahasa yang spesifik untuk domain sederhana dari formulir tersebut:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Lihat tabel di bawah ini untuk mengetahui deskripsi setiap bagian sintaks.

<table>
  <tr>
    <th width="30%">Sintaks</th>
    <th width="18%">Diperlukan?</th>
    <th width="42%">Deskripsi</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>ya</td>
    <td>Ini adalah nama peristiwa yang diekspos elemen.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>ya</td>
    <td>Ini adalah ID DOM untuk elemen tersebut, atau <a href="#special-targets">target khusus</a> yang telah ditentukan sebelumnya yang ingin Anda tindak lanjuti sebagai tanggapan atas peristiwa tersebut. Di dalam contoh berikut ini, <code>targetId</code> adalah ID DOM dari target <code>amp-lightbox</code>, <code>photo-slides</code>. <pre><amp-lightbox id = "photo-slides"> </amp-lightbox>
<button on = "tap: photo-slides"> Tampilkan Gambar</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>tidak</td>
    <td>Ini untuk elemen dengan tindakan default (standar). <p>Ini adalah metode yang diekspos elemen target (dirujuk dengan <code>targetId</code>) dan ingin Anda eksekusi ketika peristiwa dipicu.</p> <p>AMP mempunyai konsep tentang tindakan default yang dapat diterapkan elemen-elemen. Jadi, saat meniadakan <code>methodName</code>, AMP akan mengeksekusi metode default tersebut.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>tidak</td>
    <td>Beberapa tindakan, jika didokumentasikan, mungkin menerima argumen. Argumen ditetapkan di dalam kurung di dalam notasi <code>key=value</code>. Nilai-nilai yang diterima adalah: <ul> <li>untai tanpa tanda kutip yang sederhana: <code>simple-value</code> </li> <li>untai bertanda kutip: <code>"string value"</code> atau <code>'string value'</code> </li> <li>nilai-nilai Boolean: <code>true</code> atau <code>false</code> </li> <li>angka: <code>11</code> atau <code>1.1</code> </li> <li>referensi dot-syntax untuk data peristiwa: <code>event.someDataVariableName</code> </li> </ul>
</td>
  </tr>
</table>

## Menangani beberapa peristiwa <a name="handling-multiple-events"></a>

Anda dapat mendengarkan beberapa peristiwa pada suatu elemen dengan memisahkan peristiwa dengan tanda titik koma `;`.

Contoh: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Beberapa tindakan untuk satu peristiwa <a name="multiple-actions-for-one-event"></a>

Anda dapat mengeksekusi beberapa tindakan dalam urutan untuk peristiwa yang sama dengan memisahkan tindakan-tindakan tersebut menggunakan koma ','.

Contoh: `on="tap:target1.actionA,target2.actionB"`

## Peristiwa dan tindakan yang ditentukan secara global <a name="globally-defined-events-and-actions"></a>

AMP menentukan sebuah peristiwa `tap` secara global bahwa Anda dapat mendengarkan elemen HTML apa pun (termasuk elemen AMP).

AMP juga menentukan tindakan `hide`, `show`, dan `toggleVisibility` secara global bahwa Anda dapat memicu elemen HTML apa pun.

[tip type="note"]

Sebuah elemen hanya dapat diperlihatkan jika sebelumnya disembunyikan dengan tindakan `hide` atau `toggleVisibility`, atau dengan menggunakan atribut [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). Tindakan `show` tidak mendukung elemen yang disembunyikan dengan `display:none` CSS atau `layout=nodisplay` AMP.

Contohnya, yang berikut ini mungkin dilakukan di AMP:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Peristiwa yang khusus untuk elemen tertentu <a name="element-specific-events"></a>

### \* - semua elemen <a name="---all-elements"></a>

<table>
  <tr>
    <th>Peristiwa</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Dipicu ketika elemen diklik/diketuk.</td>
  </tr>
</table>

### Elemen input <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Peristiwa</th>
    <th width="30%">Deskripsi</th>
    <th width="40%">Elemen</th>
    <th>Data</th>
  </tr>
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Dipicu ketika nilai elemen berubah dan diterapkan. <p> Properti data mencerminkannya dalam <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> dan <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Dipicu ketika nilai elemen berubah. Ini serupa dengan peristiwa  <code>change</code> standar, namun hanya dipicu ketika telah lewat 300 milidetik sejak nilai input berhenti berubah.</td>
    <td>Elemen yang memicu peristiwa  <code>input</code>.</td>
    <td>Sama dengan data peristiwa <code>change</code>.</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>Dipicu ketika nilai elemen berubah. Ini serupa dengan peristiwa <code>change</code> standar, namun dipercepat untuk dipicu secara maksimal setiap 100 milidetik sementara nilai input berubah.</td>
    <td>Elemen yang memicu peristiwa  <code>input</code>.</td>
    <td>Sama dengan data peristiwa <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > bagian <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Dipicu ketika bagian akordeon meluas.</td>
    <td>Tidak ada.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Dipicu ketika bagian akordeon menciut.</td>
    <td>Tidak ada.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Dipicu ketika slide korsel (carousel) yang sedang aktif berubah.</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Dipicu ketika lightbox (bingkai terang) terlihat sepenuhnya.</td>
    <td>Tidak ada</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Dipicu ketika lightbox (bingkai terang) tertutup sepenuhnya.</td>
    <td>Tidak ada</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Perbarui tata letak <code>amp-list</code> ke <code>layout="CONTAINTER"</code> untuk memungkinkan <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">pengubahan ukuran dinamis</a>.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code> (kepercayaan rendah)</td>
    <td>Dipicu saat pengambilan data gagal.</td>
    <td>Tidak ada</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Dipicu ketika suatu opsi dipilih atau tidak jadi dipilih.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Dipicu ketika bilah samping sepenuhnya terbuka setelah transisi berakhir.</td>
    <td>Tidak ada</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Dipicu ketika bilah samping sepenuhnya tertutup setelah transisi berakhir.</td>
    <td>Tidak ada</td>
  </tr>
</table>

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code> (kepercayaan rendah)</td>
    <td>Dipicu saat pengambilan data gagal.</td>
    <td>Tidak ada</td>
  </tr>
</table>

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(kepercayaan rendah)</td>
    <td>Dipicu saat video diputar pertama kali oleh pengguna. Pada video yang diputar otomatis, ini dipicu begitu pengguna berinteraksi dengan video. Peristiwa ini mempunyai tingkat kepercayaan rendah (low-trust), artinya tidak dapat memicu sebagian besar tindakan; hanya tindakan yang bisa dengan kepercayaan rendah yang dapat dijalankan, seperti tindakan <code>amp-animation</code>.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code>(kepercayaan rendah)</td>
    <td>Dipicu ketika posisi pemutaran sebuah video telah berubah. Frekuensi peristiwa dikendalikan oleh AMP dan saat berlangsung diatur pada interval 1 detik. Peristiwa ini mempunyai tingkat kepercayaan rendah (low-trust), artinya tidak dapat memicu sebagian besar tindakan; hanya tindakan yang bisa dengan kepercayaan rendah yang dapat dijalankan, seperti tindakan <code>amp-animation</code>.</td>
    <td> <code>{time, percent}</code><code>time</code> mengindikasikan waktu saat berlangsung dalam detik, <code>percent</code> adalah angka di antara 0 dan 1 dan mengindikasikan posisi saat berlangsung sebagai persentase total waktu.</td>
  </tr>
</table>

### formulir <a name="form"></a>

<table>
  <tr>
    <th width="25%">Peristiwa</th>
    <th width="35%">Deskripsi</th>
    <th width="40%">Data</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Fired when the form is submitted.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Fired when the form submission response is success.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Dipicu ketika respons pengiriman formulir mengalami eror.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Dipicu ketika formulir valid.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Dipicu ketika formulir tidak valid.</td>
    <td></td>
  </tr>
</table>

## Tindakan yang khusus untuk elemen tertentu <a name="element-specific-actions"></a>

### \* (semua elemen) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Menyembunyikan elemen target.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Memperlihatkan elemen target. Jika sebuah <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">elemen</a> <code>autofocus</code>  menjadi terlihat, maka elemen tersebut akan mendapatkan fokus.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Mengalihkan atau mengubah visibilitas elemen target. Jika sebuah <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">element</a> <code>autofocus</code> menjadi terlihat, maka elemen tersebut akan mendapatkan fokus.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Mengalihkan kelas elemen target. <code>force</code> bersifat opsional, dan jika ditentukan akan memastikan kelas itu hanya akan ditambahkan, tetapi tidak dihapus jika diatur sebagai <code>true</code>, dan hanya dihapus, tetapi tidak ditambahkan jika diatur sebagai <code>false</code>.</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Menggulir elemen ke tampilan dengan animasi yang halus.<br> <code>duration</code> adalah opsional. Menentukan panjang animasi dalam milidetik. Jika tidak ditentukan, jumlah yang relatif terhadap perbedaan gulir di bawah atau setara dengan 500 milidetik akan digunakan.<br> <code>position</code> adalah opsional. Salah satu <code>top</code>, <code>center</code> atau <code>bottom</code> (<code>top</code> default). Menentukan posisi elemen relatif terhadap viewport setelah menggulir.<br> Sebagai praktik terbaik aksesibilitas, sandingkan ini dengan panggilan ke <code>focus()</code> untuk berfokus pada elemen yang sedang dituju.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Membuat elemen target mendapatkan fokus. Untuk menghilangkan fokus, <code>focus</code> pada elemen lain (biasanya elemen induk). Kami sangat menyarankan agar tidak menghilangkan fokus dengan berfokus pada <code>body</code>/<code>documentElement</code> demi keperluan aksesibilitas.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Memutar audio. Tidak berfungsi (no-op) jika elemen <code>&lt;amp-audio></code> adalah turunan dari <code>&lt;amp-story></code>.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Menjeda audio. Tidak berfungsi (no-op) jika elemen <code>&lt;amp-audio></code> adalah turunan dari <code>&lt;amp-story></code>.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Memutar animasi.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Menjeda animasi.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>Menghentikan animasi.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>Mengatur currentTime animasi pada nilai yang ditentukan dan menjeda animasi.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>Menggunakan nilai persentase yang diberikan untuk menentukan currentTime animasi pada nilai yang ditentukan dan menjeda animasi.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Mengalihkan status <code>expanded</code> dan <code>collapsed</code> bagian <code>amp-accordion</code>. Jika dipanggil tanpa argumen, maka akan mengalihkan semua bagian akordeon. Picu pada bagian yang spesifik dengan menyediakan ID bagian: <code>on="tap:myAccordion.toggle(section='section-id')"</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Memperluas bagian-bagian akordeon. Jika sebuah bagian telah diperluas, maka akan tetap luas. Jika dipanggil tanpa argumen, maka akan memperluas semua bagian akordeon. Picu pada bagian yang spesifik dengan menyediakan ID bagian: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Menciutkan bagian-bagian akordeon. Jika sebuah bagian telah ciut, maka akan tetap ciut. Jika dipanggil tanpa argumen, maka akan menciutkan semua bagian akordeon. Picu pada bagian yang spesifik dengan menyediakan ID bagian: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Memajukan korsel (carousel) ke indeks slide yang ditentukan.</td>
  </tr>
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>Mengalihkan status putar otomatis korsel. <code>toggleOn</code> bersifat opsional.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Membuka lightbox (bingkai terang) gambar, di mana gambar sumber menjadi pemicu tindakan.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Membuka lightbox (bingkai terang).</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Menutup lightbox (bingkai terang).</td>
  </tr>
</table>

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>Membuka galeri lightbox. Dapat dipicu dengan mengetuk elemen lain jika Anda menentukan ID gambar: `on="tap:amp-lightbox-gallery.open(id='image-id')"`.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Menyegarkan data dari <code>src</code> dan merender ulang daftar.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>Memperbarui item DOM untuk memperlihatkan konten yang telah diperbarui.</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Mengosongkan semua pilihan dari <code>amp-selector</code> yang telah ditentukan.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Menaikkan pilihan sesuai nilai `delta`. `delta` default ditetapkan pada -1. Jika tidak ada opsi yang dipilih, status yang dipilih akan menjadi nilai opsi terakhir.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Menurunkan pilihan sesuai nilai `delta`. `delta` default ditetapkan pada 1. Jika tidak ada opsi yang dipilih, status yang dipilih akan menjadi nilai opsi pertama.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Mengalihkan penerapan `selected` (terpilih). Jika atribut untuk memilih tidak ada, tindakan ini akan menambahkannya. Jika atribut untuk memilih ada, tindakan ini akan menghapusnya. Anda dapat memaksa dan mempertahankan serta menambahkan atau menghapus dengan menyertakan nilai Boolean di dalam argumen `value`. Sebuah nilai `true` akan memaksa untuk menambahkan atribut `selected` dan tidak akan menghapusnya jika memang sudah ada. Sebuah nilai `false` akan menghapus atribut tersebut, tetapi tidak akan menambahkannya jika tidak ada.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Membuka bilah samping (sidebar).</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Menutup bilah samping (sidebar).</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Mengalihkan status bilah samping (bilah samping).</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Mengambil kembali data di atribut `src` dengan mengabaikan cache browser.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>Menyembunyikan elemen notifikasi pengguna yang menjadi referensi.</td>
  </tr>
</table>

### Elemen video <a name="video-elements"></a>

Tindakan di bawah ini didukung di dalam elemen video AMP berikut ini: `amp-video`, `amp-youtube`, `amp-3q-player`, `amp-brid-player`, `amp-dailymotion`, `amp-delight-player`, `amp-ima-video`.

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Memutar video.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Menjeda video.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>Membisukan video.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>Menyuarakan video.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>Mengubah video ke layar penuh.</td>
  </tr>
</table>

### formulir <a name="form-1"></a>

<table>
  <tr>
    <th>Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Mengosongkan nilai apa pun yang ada di dalam input formulir.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Mengirimkan formulir.</td>
  </tr>
</table>

## Target spesial <a name="special-targets"></a>

Yang berikut ini adalah target yang disediakan oleh sistem AMP yang mempunyai persyaratan spesial:

### Target: AMP <a name="target-amp"></a>

Target `AMP` disediakan oleh runtime AMP dan menerapkan tindakan tingkat tinggi yang berlaku pada seluruh dokumen.

<table>
  <tr>
    <th width="40%">Tindakan</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Menavigasikan jendela saat ini ke URL yang diberikan, ke target opsional yang telah ditentukan jika diberikan (saat ini hanya mendukung <code>_top</code> dan <code>_blank </code>). Parameter <code>opener</code> yang opsional dapat ditentukan ketika menggunakan target <code>_blank</code> untuk memungkinkan halaman yang baru dibuka mengakses <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a>. Mendukung <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">pengganti URL standar</a>.</p>
      <p><strong>Peringatan:</strong> Menggunakan tautan normal <code><a></code> direkomendasikan jika memungkinkan karena <code>AMP.navigateTo</code> tidak dikenali oleh crawler web.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Mencoba menutup jendela jika diizinkan, jika tidak, akan bernavigasi mirip Tindakan <code>navigateTo</code>. Berguna untuk kasus penggunaan di mana tombol “Back” (Kembali) mungkin perlu untuk menutup jendela jika dibuka di jendela baru dari halaman sebelumnya atau bernavigasi jika tidak dibuka.</p>
      <p><strong>Peringatan:</strong> Menggunakan tautan normal <code><a></code> direkomendasikan jika memungkinkan karena <code>AMP.closeOrNavigateTo</code> tidak dikenali oleh crawler web.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>Bernavigasi kembali dalam riwayat.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>Membuka Dialog Cetak (Print Dialog) untuk mencetak halaman yang sedang ditempati.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>Bergulir ke ID elemen yang disediakan pada halaman yang sedang ditempati.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>Menolak pembuatan ID Klien untuk semua cakupan.</td>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Memerlukan <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Menggabungkan objek secara literal ke dalam status yang dapat diikat.</p>
      <p></p>
    </td>
  </tr>
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Memerlukan <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>.</p>
      <p>Menggabungkan objek secara literal ke dalam status yang dapat diikat dan mendorong entri baru ke tumpukan riwayat browser. Memunculkan entri akan memulihkan nilai-nilai variabel sebelumnya (di dalam contoh ini, <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup>Jika digunakan dengan <a href="#multiple-actions-for-one-event">beberapa tindakan</a>, tindakan selanjutnya akan menunggu <code>setState()</code> atau <code>pushState()</code> selesai terlebih dahulu sebelum pemanggilan. Hanya satu di antara <code>setState()</code> atau <code>pushState()</code> yang diizinkan per peristiwa.

### Target: amp-access <a name="target-amp-access"></a>

Target `amp-access` disediakan oleh komponen [amp-access](https://amp.dev/documentation/components/amp-access.html).

Target `amp-access` menjadi spesial karena alasan-alasan berikut ini:

1. Anda tidak dapat memberikan ID sesuka hati untuk target ini. Targetnya selalu `amp-access`.
2. Tindakan untuk `amp-access` bersifat dinamis sesuai dengan struktur [Konfigurasi Akses AMP](https://amp.dev/documentation/components/amp-access#configuration).

Lihat [detail](https://amp.dev/documentation/components/amp-access#login-link) tentang menggunakan target `amp-access`.
