---
'$title': Mengelola status pengguna yang belum disahkan dengan AMP
$order: 2
formats:
  - websites
teaser:
  text: '**Daftar isi**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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

**Daftar isi**

- [Latar Belakang](#background)
- [Panduan penerapan](#implementation-guide)
  - [Sebelum memulai](#before-getting-started)
  - [Tugas 1: Untuk halaman non-AMP di asal penayang, atur pengenal dan kirimkan ping analitis ](#task1)
  - [Tugas 2: Untuk halaman AMP, atur pengenal dan kirimkan ping analitis dengan menyertakan pengganti ID Klien di dalam ping amp-analytics](#task2)
  - [Tugas 3: Proses ping analitis dari halaman di asal penayang](#task3)
  - [Tugas 4: Proses ping analitis dari konteks tampilan penampil AMP atau cache AMP dan buat pemetaan pengenal (jika diperlukan)](#task4)
  - [Tugas 5: Menggunakan ID Klien dalam penautan dan pengiriman formulir](#task5)
- [Praktik-praktik yang sangat direkomendasikan](#strongly-recommended-practices)

Status pengguna merupakan konsep yang penting pada web masa kini. Pertimbangkan kasus atau contoh penggunaan berikut ini yang diaktifkan dengan mengelola status pengguna:

- Pedagang yang membuat **keranjang belanja** berguna yang memperlihatkan kepada pengguna dalam kunjungan keduanya barang-barang yang sama dengan barang-barang yang ditambahkannya dalam kunjungan pertama beberapa minggu lalu. Pengalaman seperti ini meningkatkan peluang bahwa pengguna akan membeli barang tersebut dengan memastikan bahwa mereka mengetahui adanya barang yang mereka pertimbangkan untuk dibeli sebelumnya.
- Penerbit berita yang dapat menyesuaikan **artikel rekomendasi** kepada pembaca berdasarkan kunjungan berulang pembaca ke artikel penerbit, dan ini membantu pembaca tetap tertarik dan melihat lebih banyak konten.
- Pengembang situs web yang menjalankan jenis situs apa pun mengumpulkan **analitik** yang dapat memberikan informasi apakah dua tampilan halaman dilihat oleh orang yang sama atau dua orang melihat masing-masing halaman. Memiliki informasi ini membantu untuk mengetahui bagaimana kinerja situs, dan pada akhirnya, bagaimana meningkatkannya.

Artikel ini dirancang untuk membantu Anda agar lebih berhasil dalam **mengelola status pengguna yang belum disahkan di AMP**, sebuah cara untuk menyediakan perjalanan pengguna yang mulus, bahkan jika pengguna belum mengambil tindakan untuk memberikan identitasnya, seperti masuk ke akunnya. Setelah mengkaji beberapa tantangan dan pertimbangan dalam pendekatan untuk topik ini, panduan ini menguraikan berbagai cara di mana status pengguna didukung oleh AMP dan menawarkan rekomendasi tentang cara Anda melakukan pendekatan terhadap sebuah penerapan teknis.

## Latar Belakang <a name="background"></a>

Topik status pengguna layak mendapatkan perhatian khusus di AMP karena halaman AMP dapat menampilkan beberapa konteks, seperti di situs web Anda, di Google Search, atau aplikasi pihak ketiga. Ini memperkenalkan tantangan dalam mengelola status pengguna saat pengguna bergerak di antara hal-hal ini.

### Konteks tampilan untuk halaman AMP <a name="display-contexts-for-amp-pages"></a>

Anda dapat menganggap AMP sebagai format konten portabel yang memungkinkan konten agar dapat dimuat dengan cepat di mana pun. Dokumen AMP dapat ditampilkan melalui tiga konteks yang layak diperhatikan:

- Asal penayang
- Cache AMP
- Penampil AMP

<table>
  <tr>
    <th width="20%">Konteks</th>
    <th width="20%">Dapatkah halaman non-AMP disajikan dari sini?</th>
    <th width="20%">Dapatkah halaman AMP disajikan dari sini?</th>
    <th>URL Sampel</th>
  </tr>
  <tr>
    <td>Asal penayang</td>
    <td>Ya</td>
    <td>Ya</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Cache AMP</td>
    <td>Tidak</td>
    <td>Ya</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Penampil AMP</td>
    <td>Tidak</td>
    <td>Ya</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Mari kita pelajari masing-masing situasi ini secara lebih mendalam.

**Konteks #1: asal penayang.** Halaman AMP diterapkan agar dapat dikelola asalnya dari dan dapat diakses melalui situs penayang, cth. di `https://example.com` ada yang mungkin menemukan `https://example.com/article.amp.html`.

Penayang dapat memilih untuk menayangkan secara eksklusif dalam AMP, atau menayangkan dua versi konten (yaitu, konten AMP yang “disandingkan” dengan konten non-AMP). Model yang “disandingkan” memerlukan beberapa [langkah-langkah tertentu](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) untuk memastikan bahwa versi halaman AMP dapat ditemukan oleh mesin pencari, situs media sosial, dan berbagai platform lain. Kedua pendekatan penayangan ini didukung sepenuhnya; penayang yang memutuskan pendekatan mana yang akan diambil.

> **CATATAN:**
> Karena mode penayangan yang “disandingkan” yang dijelaskan di atas, asal penayang (di dalam contoh di atas, `https://example.com`) merupakan sebuah konteks di mana **baik konten AMP maupun non-AMP dapat diakses**. Memang, ini satu-satunya konteks di mana ini dapat terjadi karena cache AMP dan penampil AMP, sebagaimana dijelaskan di bawah ini, hanya menyampaikan konten AMP yang valid.

**Konteks #2: sebuah cache AMP.**Berkas AMP dapat dimasukkan ke cache di cloud oleh cache pihak ketiga untuk mengurangi waktu yang diperlukan konten untuk sampai ke perangkat seluler pengguna.

Dengan menggunakan format AMP, penghasil konten membuat konten dalam berkas AMP bisa disimpan di cache oleh pihak ketiga. Dengan jenis kerangka kerja ini, penayang dapat terus mengontrol kontennya (dengan menayangkan ke asalnya sebagaimana diuraikan di atas), namun platform dapat menyimpan di cache atau mencerminkan konten untuk kecepatan penyampaian yang optimal ke pengguna.

Biasanya, konten yang disajikan dengan cara ini berasal dari domain yang berbeda. Contohnya, [Cache AMP Google](https://developers.google.com/amp/cache/overview) menggunakan `https://cdn.ampproject.org` untuk menyampaikan konten, cth.: `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Konteks #3: sebuah penampil AMP.** Format AMP dibuat untuk mendukung penyematan di dalam penampil AMP pihak ketiga. Ini memungkinkan kerja sama tingkat tinggi antara berkas AMP dan pengalaman penampil, manfaatnya antara lain: pra-muat dan pra-render konten yang cerdas dan aman serta kemampuan inovatif, seperti mengusap di antara halaman AMP penuh.

Sama seperti kasus cache AMP, bisa diperkirakan bahwa domain untuk penampil AMP juga akan berbeda dari asal penayang. Contohnya, penampil untuk Google Search dikelola di `https://google.com` dan menyematkan iframe yang meminta konten penayang dari Cache AMP Google.

### Multi-konteks berarti manajemen multi-status <a name="multiple-contexts-means-multiple-state-management"></a>

Penayang harus disiapkan untuk mengelola status pengguna untuk setiap konteks tampilan secara terpisah. Fitur [ID Klien](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#client-id) AMP, yang memanfaatkan cookie atau penyimpanan lokal untuk mempertahankan status, memberikan dukungan yang diperlukan untuk halaman AMP agar mempunyai pengenal yang stabil dan semu (pseudonymous) untuk pengguna. Dari sudut pandang penerapan, digunakan cookie atau penyimpanan lokal, dan AMP memutuskan mana yang akan digunakan sesuai dengan konteks tampilan. Pilihan ini dipengaruhi oleh kelayakan teknis dalam mengelola status ini yang berskala ratusan hingga ribuan penayang.

Namun, penayang halaman AMP dapat dengan mudah akhirnya merancang (tanpa disengaja) perjalanan pengguna yang melibatkan banyak konteks. Mari kita kembali ke kajian tentang contoh penggunaan keranjang belanja dan tambahkan sejumlah informasi untuk membuat **cerita pengguna** lengkap:

> _Pada hari ke-1, pengguna menemukan halaman AMP dari Example Inc. melalui Google Search. Google Search memuat halaman AMP di penampil AMP. Saat melihat halaman tersebut, pengguna menambahkan empat barang ke keranjang belanja, namun tidak menyelesaikan belanja (check-out). Dua minggu kemudian, pada hari ke-15, pengguna mengingat keempat barang yang dipertimbangkannya untuk dibeli dan memutuskan akan membelinya sekarang. Pengguna mengakses halaman awal Example Inc. di `https://example.com` secara langsung (ini adalah halaman awal non-AMP) dan menemukan empat barang tersebut masih tersimpan di keranjang belanja._

Di dalam skenario ini, pengguna menerima pengalaman keranjang belanja yang konsisten, walaupun dia telah berpindah dari konteks penampil AMP ke konteks asal penayang—dan setelah beberapa waktu berlalu di antara peristiwa ini. Pengalaman ini sangat beralasan dan, jika Anda merancang pengalaman berbelanja, Anda seharusnya memperkirakan untuk mendukungnya. Jadi, bagaimana cara Anda mewujudkannya?

**Untuk memungkinkan ini dan pengalaman apa pun yang melibatkan status pengguna, semua konteks yang dilalui pengguna harus saling berbagi status yang disimpan secara individual.** “Sempurna!”, kata Anda, tentang ide berbagi nilai cookie dengan pengenal pengguna di semua batasan kontekstual ini. Ada satu masalah: walaupun setiap konteks ini menampilkan konten yang dikontrol oleh penayang yang sama, mereka saling melihat sebagai pihak ketiga karena setiap konteks berada di domain yang berbeda.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="Kemampuan AMP untuk ditampilkan dalam banyak konteks berarti bahwa setiap konteks tersebut memiliki penyimpanannya sendiri untuk pengenal" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Sebagaimana Anda lihat di dalam pembahasan berikut ini, mempunyai posisi pihak ketiga saat berinteraksi dengan cookie dapat menimbulkan kesulitan, tergantung bagaimana pengaturan browser pengguna dikonfigurasi. Secara khusus, jika cookie pihak ketiga diblokir di dalam suatu situasi tertentu, maka ini akan menghalangi kemampuan berbagi informasi di semua konteks. Pada sisi lain, jika operasi cookie pihak ketiga diizinkan, maka informasi dapat dibagikan.

## Panduan penerapan <a name="implementation-guide"></a>

Bagian ini menyediakan rekomendasi untuk mengelola status pengguna. Tugas-tugas di bawah ini dapat disajikan sebagai kemajuan, namun pada umumnya dapat dilihat dalam dua bagian:

**Bagian #1: Penerapan mendasar:** Tugas 1–4 sangat penting untuk membuat dasar-dasar berfungsi. Mereka mengandalkan rangkaian fitur minimal agar pekerjaan selesai sebagian: Penggantian ID Klien AMP, pembacaan dan penulisan cookie, dan mengelola tabel pemetaan backend. Mengapa “sebagian”? Karena langkah-langkah yang disampaikan di dalam tugas-tugas ini bergantung pada pembacaan dan penulisan cookie dan karena pengaturan cookie browser mungkin mencegah hal ini dalam keadaan tertentu, rangkaian tugas ini kemungkinan besar tidak memadai untuk sepenuhnya mengelola status pengguna di dalam semua skenario.

Setelah memaparkan dasarnya, kita akan membahas topik dengan kisaran yang lebih sempit tentang contoh penggunaan, namun menawarkan solusi lengkap untuk contoh penggunaan tersebut.

**Bagian #2: Menggunakan ID Klien dalam penautan dan pengiriman formulir:** Di dalam Tugas 5, Anda akan belajar untuk memanfaatkan traversal tautan dan/atau pengiriman formulir untuk meneruskan informasi ID Klien AMP di seluruh batasan kontekstual di mana pengguna melintas dari satu halaman langsung ke halaman lainnya.

> **PERHATIAN:**
> Panduan penerapan berikut ini menyarankan penggunaan cookie dan bekerja dengan cookie. Pastikan untuk merujuk bagian [Praktik-praktik yang sangat direkomendasikan](#strongly-recommended-practices) untuk mengetahui saran penting yang perlu diingat.

### Sebelum memulai <a name="before-getting-started"></a>

Dalam menelusuri panduan teknis di bawah ini, kita akan menganggap bahwa Anda akan mengikatkan **status pengguna** ke sebuah **pengenal** stabil yang mewakili pengguna. Contohnya: pengenal mungkin terlihat seperti `n34ic982n2386n30`. Di bagian server, Anda kemudian mengaitkan `n34ic982n2386n30` ke seperangkat informasi status pengguna apa pun, seperti isi keranjang belanja, daftar artikel yang telah dibaca sebelumnya, atau data lain sesuai dengan contoh penggunaan.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="Pengenal tunggal dapat digunakan untuk mengelola status pengguna untuk banyak kasus penggunaan" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

Demi kejelasan di seluruh bagian dokumen berikutnya, kita akan menyebut berbagai untai karakter yang merupakan pengenal dengan nama yang lebih mudah dibaca dan diawali dengan tanda dolar (`$`):

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**Contoh penggunaan kita:** Di seluruh panduan ini, kita akan mengerjakan sebuah contoh yang telah dirancang untuk mencapai pelacakan tampilan halaman sederhana (yaitu analitis) yang akan kita gunakan untuk menghasilkan penghitungan pengguna yang seakurat mungkin. Ini berarti bahwa bahkan jika pengguna mengakses konten penayang tertentu dari konteks yang berbeda (termasuk berpindah antara halaman AMP dan non-AMP), kita ingin agar kunjungan ini dihitung dengan satu pemahaman tentang pengguna seakan-akan pengguna tersebut hanya menelusuri halaman non-AMP tradisional penerbit tersebut

**Asumsi tentang ketersediaan nilai cookie yang stabil:** Kita juga menganggap bahwa pengguna menggunakan perangkat, browser, dan penelusuran non-pribadi/samaran yang sama, agar dapat memastikan bahwa nilai-nilai cookie tersebut terjaga dan tersedia di semua sesi pengguna seiring waktu. Jika tidak demikian halnya, teknik ini tidak bisa diharapkan berhasil. Jika ini diharuskan, usahakan untuk mengelola status pengguna berdasarkan identitas (yaitu, identitas masuk) pengguna yang telah disahkan.

**Konsep yang disajikan di bawah ini dapat diperluas ke contoh penggunaan lain:** Walaupun kita hanya berfokus pada contoh penggunaan analitis, konsep-konsep yang disampaikan di bawah ini dapat dimanfaatkan untuk contoh penggunaan lain yang memerlukan manajemen status pengguna.

<a id="task1"></a>

### Tugas 1: Untuk halaman non-AMP di asal penayang, atur pengenal dan kirimkan ping analitis <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Mari kita mulai dengan mengonfigurasi analitis untuk halaman non-AMP yang disajikan dari asal penayang. Ini dapat dicapai dengan berbagai cara, termasuk menggunakan paket analitis seperti Google Analytics atau Adobe Analytics, atau dengan menuliskan penerapan kustom.

Jika Anda menggunakan paket analitis dari vendor, kemungkinan besar paket tersebut mengurus penyiapan cookie dan pengiriman ping melalui kode konfigurasi dan API-nya. Jika demikian halnya, Anda harus membaca langkah-langkah di bawah ini dengan saksama untuk memastikannya selaras dengan pendekatan analitis Anda, namun perkirakan bahwa Anda tidak akan perlu membuat perubahan apa pun sebagai bagian dari penyelesaian tugas ini.

Bagian selanjutnya dari tugas ini menawarkan panduan jika Anda ingin menyiapkan analitis Anda sendiri.

##### Menyiapkan pengenal dengan menggunakan cookie pihak pertama <a name="set-up-an-identifier-using-first-party-cookies"></a>

Jika halaman non-AMP disajikan dari asal penayang Anda, atur pengenal yang persisten dan stabil untuk digunakan pada halaman ini. Ini biasanya [diterapkan dengan cookie pihak pertama](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking).

Untuk keperluan contoh kita, anggap bahwa Anda telah menyiapkan cookie bernama `uid` (“pengenal pengguna”) yang akan dibuat pada kunjungan pertama pengguna. Jika kunjungan tersebut bukan kunjungan pertama, maka bacalah nilai yang sebelumnya telah ditetapkan pada kunjungan pertama.

Ini berarti ada dua kasus atau contoh untuk status halaman non-AMP di asal penayang:

**Kasus #1: Kunjungan awal.** Setelah tiba pertama kali di halaman non-AMP, tidak akan ada cookie. Jika Anda telah memeriksa adanya cookie sebelum ada, Anda akan melihat nilai yang disiapkan pada cookie tidak ada yang sesuai dengan `uid`:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

Terkadang, pada pemuatan awal, cookie akan disiapkan, jadi jika Anda melakukan ini setelah halaman dimuat, Anda akan melihat sebuah nilai telah ditetapkan:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Kasus: Bukan kunjungan awal.** Tidak akan ada cookie ditetapkan. Oleh karena itu, jika Anda membuka konsol pengembang pada halaman tersebut, Anda akan melihat:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Mengirimkan ping analitis <a name="send-analytics-pings"></a>

Setelah Anda menyiapkan sebuah pengenal, Anda kemudian dapat menggabungkannya ke dalam ping analitis untuk memulai pelacakan tampilan halaman.

Penerapan yang spesifik akan tergantung konfigurasi yang Anda inginkan, namun pada umumnya, Anda akan mengirimkan ping (permintaan) ke server analitis Anda, dan ini menyertakan data berguna di dalam URL permintaan itu sendiri. Berikut ini adalah contoh, di sini juga mengindikasikan bagaimana Anda menyertakan nilai cookie di dalam permintaan:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Perhatikan bahwa di dalam contoh di atas, pengenal untuk pengguna diindikasikan dengan parameter kueri yang spesifik, code0}user_id:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

Penggunaan “`user_id`” di sini akan ditentukan oleh apa yang diperkirakan server analitis Anda untuk diproses dan tidak secara spesifik terkait dengan bagaimana Anda menyebut cookie yang menyimpan pengenal secara lokal.

<a id="task2"></a>

### Tugas 2: Untuk halaman AMP, atur pengenal dan kirimkan ping analitis dengan menyertakan pengganti ID Klien di dalam ping amp-analytics <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

Beralih ke halaman AMP, mari kita lihat bagaimana Anda dapat membuat dan mengirimkan sebuah pengenal untuk analitis. Ini akan berlaku, terlepas dari konteks penyajian halaman AMP, jadi ini mencakup halaman AMP apa pun di asal penayang, yang disajikan melalui cache AMP, atau ditampilkan di penampil AMP.

Melalui penggunaan berbagai fitur yang memerlukan ID Klien, AMP akan melakukan pekerjaan “di balik layar” untuk menghasilkan dan menyimpan nilai-nilai ID klien dan memunculkannya ke fitur-fitur yang membutuhkannya. Salah satu fitur penting yang dapat menggunakan ID Klien AMP adalah [amp-analytics](https://amp.dev/documentation/components/amp-analytics), yang kebetulan memang akan kita butuhkan untuk menerapkan contoh kasus penggunaan analitis kita.

Pada halaman AMP, buat ping amp-analytics yang berisi ID Klien:

<table>
  <tr>
    <td width="40%"><strong>konfigurasi amp-analytics terlihat seperti:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>Yang ke jaringan terlihat seperti:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>Di dalam kasus ini, <code>${clientId(uid)}</code> diganti dengan nilai aktual yang dihasilkan AMP pada saat itu atau yang akan dikembalikan AMP berdasarkan apa yang telah disimpan browser pengguna secara lokal</em></p>
</td>
  </tr>
</table>

Perhatikan fakta bahwa parameter yang diteruskan ke dalam pengganti ID Klien, `${clientId(uid)`, adalah `uid`. Ini adalah pilihan yang disengaja yang sesuai dengan nama cookie yang digunakan di asal penayang sebagaimana dijelaskan di dalam [Tugas 1](#task1). Untuk mencapai integrasi yang paling mulus, Anda harus menerapkan teknik yang sama.

Menyangkut penerapan amp-analytics selanjutnya, kunjungi dokumentasi untuk [konfigurasi amp-analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/) untuk mengetahui selengkapnya tentang cara menyiapkan permintaan amp-analytics atau untuk memodifikasi permintaan vendor analitis Anda. Ping dapat dimodifikasi lebih lanjut untuk mentransportasikan data tambahan yang Anda tentukan secara langsung atau dengan memanfaatkan [penggantian AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) lain.

> **Pengetahuan lain:**
> Mengapa kita menggunakan nama `uid` untuk parameter yang diteruskan ke fitur ID Klien? Parameter yang diambil pengganti `clientId(...)` digunakan untuk menentukan cakupan. Anda sebenarnya dapat menggunakan fitur ID Klien untuk berbagai contoh penggunaan dan, sebagai hasilnya, menghasilkan banyak ID klien. Parameter membedakan contoh-contoh penggunaan sehingga Anda dapat menggunakannya untuk menentukan contoh penggunaan mana yang ingin Anda berikan ID Klien. Contohnya, Anda mungkin ini mengirimkan pengenal yang berbeda kepada pihak ketiga, seperti pengiklan, dan Anda dapat menggunakan parameter “cakupan” untuk melakukan hal ini.

Di asal penayang, paling mudah untuk menganggap “cakupan” sebagai nama yang Anda berikan kepada cookie. Dengan merekomendasikan nilai `uid` funtuk parameter ID Klien di [Tugas 2](#task2), kita menyelaraskan dengan pilihan untuk menggunakan cookie bernama `uid` di [Tugas 1](#task1).

<a id="task3"></a>

### Tugas 3: Proses ping analitis dari halaman di asal penayang <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

Karena penyiapan yang dilakukan pada Tugas 1 dan 2, saat seseorang mengakses versi AMP (dari konteks apa pun) atau versi non-AMP di asal penayang, ping analitis akan menggunakan pengenal yang sama. Dengan mengikuti panduan di [Tugas 2](#task2) untuk memilih “cakupan” ID Klien dengan nama yang sama dengan cookie yang Anda gunakan di [Tugas 1](#task1), AMP menggunakan ulang cookie yang sama.

Hal ini digambarkan pada tabel di bawah ini:

<table>
  <tr>
    <td width="40%">Sebuah ping analitis yang berasal dari <strong>halaman non-AMP di asal penayang</strong> terlihat <br>seperti</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>Sebuah ping analitis yang berasal dari <strong>halaman AMP di asal penayang</strong> terlihat seperti</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>Dalam hal ini, sama! Dengan memilih nilai cakupan  <code>uid</code> nilai yang mendasari cookie <code>uid</code>, yaitu <code>$publisher_origin_identifier</code>, digunakan.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### Tugas 4: Proses ping analitis dari konteks tampilan penampil AMP atau cache AMP dan buat pemetaan pengenal (jika diperlukan) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

Saat kita menyiapkan ping analitis di dalam [Tugas 2](#task2) untuk mengirimkan data dari halaman AMP yang ditampilkan di dalam cache AMP atau penampil AMP, kita juga menciptakan masalah. Sebagaimana telah dibahas sebelumnya, konteks cache AMP dan penampil AMP berbeda dari konteks asal penayang, dan bersama hal ini ada cara berbeda dalam mengelola pengenal. Untuk memproses ping ini demi menghindari masalah, seperti kelebihan hitung pengguna, kita akan mengambil beberapa [langkah-langkah](#implementation-steps) untuk mencoba mencocokkan pengenal sesering kita bisa.

Untuk membantu menjelaskan langkah-langkah yang kita ambil, sangat membantu jika terlebih dahulu dipertimbangkan bagaimana tepatnya masalah kelebihan hitung timbul.

#### Mengkaji masalah <a name="reviewing-the-problem"></a>

Pertimbangkan alur yang berikut ini:

1. Seorang pengguna mengunjungi **halaman AMP di dalam konteks tampilan penampil AMP**, seperti `https://google.com/amp/s/example.com/article.amp.html`. Karena penampil AMP tidak mempunyai akses ke cookie `uid` di asal penayang, sebuah nilai sembarang `$amp_client_id` dihasilkan untuk mengenali pengguna.
2. Pengguna yang sama kemudian mengunjungi **sebuah halaman di asal penayang `https://example.com`**. Sebagaimana dijelaskan di dalam [Tugas 3](#task3), pengguna tersebut dikenali dengan `$publisher_origin_identifier`.

Di sini, (1) dan (2) terjadi pada asal (atau konteks) yang berbeda. Oleh karena ini, tidak ada status yang sama dan `$amp_client_id` berbeda dari `$publisher_origin_identifier`. Jadi, apa dampaknya? (1) satu sesi tampilan halaman yang terlihat seperti satu pengguna dan (2) satu sesi tampilan halaman lain yang terlihat seperti dilakukan oleh pengguna lain. **Pada dasarnya, walaupun pengguna tersebut tetap terlibat dengan konten `https://example.com`, hitungan pengguna yang kita lakukan berlebihan dan pengguna pada (1) sepertinya adalah pentalan atau bounce (kunjungan satu halaman saja).**

#### Strategi solusi <a name="solution-strategy"></a>

Untuk mengatasi masalah kelebihan hitung, Anda harus menggunakan strategi berikut ini, pemanfaatannya bergantung pada apakah pembacaan atau penulisan cookie pihak ketiga diizinkan:

- **Pencocokan pengenal segera: Jika Anda dapat mengakses atau mengubah cookie asal penayang**, gunakan atau buat pengenal asal penayang dan abaikan pengenal apa pun di dalam permintaan analitis. Anda akan berhasil menautkan kegiatan di antara kedua konteks.
- **Pencocokan pengenal tertunda: Jika Anda tidak dapat mengakses atau mengubah pengenal asal penayang (yaitu cookie)**, maka kembalikan ke ID Klien AMP yang menyertai permintaan analitis itu sendiri. Gunakan pengenal ini sebagai “**alias**”, daripada menggunakan atau membuat pengenal asal penayang (cookie) baru, di mana ini tidak dapat Anda lakukan (karena pemblokiran cookie pihak ketiga), dan tambahkan alias ke **tabel pemetaan**. Anda tidak akan berhasil jika segera menautkan kegiatan di antara kedua konteks, namun dengan menggunakan tabel pemetaan, Anda mungkin dapat menautkan nilai ID Klien AMP dengan pengenal asal penayang pada kunjungan pengguna tersebut di masa depan. Saat ini terjadi, Anda akan mempunyai informasi yang dibutuhkan untuk menautkan kegiatan dan mencocokkan bahwa kunjungan halaman di dalam konteks yang berbeda dilakukan oleh pengguna yang sama. Tugas 5 menjelaskan tentang cara mencapai solusi sempurna dalam skenario yang spesifik di mana pengguna beralih dari satu halaman langsung ke halaman lainnya.

#### Langkah-langkah penerapan <a name="implementation-steps"></a>

Pada server, periksa apakah sudah ada pengenal asal penayang

Baca cookie yang dikirimkan sebagai bagian dari permintaan analitis. Di dalam contoh kita, ini berarti memeriksa adanya cookie `uid` dari example.com.

- Jika nilai `uid` berhasil dibaca, gunakan untuk mencatat data analitis (**pengenal catatan analitis**). Berkat [Tugas 1](#task1), kita mengetahui nilai pengenal ini adalah `$publisher_origin_identifier`. Karena pengenal catatan analitis sudah dibuat, kita dapat langsung menuju bagian [Penyimpanan data](#data-storage).
- Jika nilai `uid` tidak berhasil dibaca, lanjutkan dengan langkah-langkah di bawah ini yang melibatkan tabel pemetaan.

##### Tabel pemetaan <a name="mapping-table"></a>

Tabel pemetaan kita akan mengaitkan nilai-nilai ID Klien AMP yang terlihat di ping analitis ke pengenal asal penayang, sebagai berikut:

<table>
  <tr>
    <th width="50%"><strong>ID Pengguna di asal penayang</strong></th>
    <th width="50%"><strong>ID Pengguna pada halaman AMP yang TIDAK berada di asal penayang (“alias”)</strong></th>
  </tr>
  <tr>
    <td>Berasal dari pengenal asal penayang atau dihasilkan sebagai nilai prospektif jika pengenal asal penayang tidak dapat diakses.</td>
    <td>Berasal dari ID Klien AMP</td>
  </tr>
</table>

Setelah memastikan bahwa Anda tidak berhasil membaca pengenal asal penayang, langsung periksa apakah ID Klien AMP yang ada di dalam ping analitis sudah digunakan di dalam sebuah pemetaan. Untuk melakukan hal ini, terlebih dahulu periksa permintaan amp-analytics untuk mendapatkan nilai ID Klien. Contohnya, dari permintaan ini:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

kita mengekstraksi bagian yang ditebalkan sesuai dengan ID Klien AMP: `$amp_client_id`.

Selanjutnya, periksa tabel pemetaan untuk menemukan nilai yang sama dengan yang ada di kolom “alias”:

<table>
  <tr>
    <th width="50%"><strong>ID Pengguna di asal penayang</strong></th>
    <th width="50%"><strong>ID Pengguna pada halaman AMP yang TIDAK berada di asal penayang (“alias”)</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Di dalam contoh di atas, kita menemukan catatan yang sudah ada. Nilai yang kita temukan yang disandingkan dengan ID Klien AMP menjadi pengenal catatan analitis. Di sini, itu adalah `$existing_publisher_origin_identifier`. Karena pengenal catatan analitis sudah dibuat, kita dapat langsung menuju bagian [Penyimpanan data](#data-storage).

Namun, jika ID Klien AMP tidak ditemukan di dalam pemetaan, kita perlu membuat pemetaan:

1. Buat **pengenal asal penayang prospektif**. Mari kita sebut ini `$prospective_identifier` di dalam contoh selanjutnya. Nilai ini harus dibuat sesuai dengan cara Anda menyiapkan nilai di asal penayang, sebagaimana dijelaskan di dalam [Tugas 1](#task1) di atas.
2. Selanjutnya, coba [atur](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie) pengenal asal penayang prospektif tersebut sebagai cookie di asal penayang. Ini berhasil jika cookie pihak ketiga dapat ditulis, jika tidak, berarti gagal.
3. Setelah itu, simpan pasangan {prospective publisher origin identifier, AMP Client ID}.

Pemetaan yang kita buat akhirnya akan terlihat seperti ini:

<table>
  <tr>
    <th><strong>ID Pengguna di asal penayang</strong></th>
    <th><strong>ID Pengguna pada halaman AMP yang TIDAK berada di asal penayang (“alias”)</strong></th>
  </tr>
  <tr>
    <td> <code>$prospective_identifier</code>(dibuat tepat pada waktu ping analitik diterima)</td>
    <td> <code>$amp_client_id</code> (berasal dari ping analitik)</td>
  </tr>
</table>

Kita akan menggunakan pengenal asal penayang prospektif sebagai pengenal catatan analitis karena itu adalah nilai yang dikaitkan dengan status di asal penayang. Di dalam hal ini, itu adalah `$prospective_identifier`, yang akan digunakan dalam bagian [Penyimpanan data](#data-storage) selanjutnya.

##### Penyimpanan data <a name="data-storage"></a>

Setelah Anda mengetahui pengenal catatan analitis, kini Anda dapat benar-benar menyimpan informasi status pengguna (data analitis dalam hal ini) yang telah ditentukan oleh pengenal itu:

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### Tugas 5: Menggunakan ID Klien dalam penautan dan pengiriman formulir <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

Secara umum, jika membaca dan menulis cookie pihak ketiga tidak diizinkan, akan ada situasi di mana mengelola status pengguna mustahil dilakukan secara benar-benar efektif. Pada Tugas 1-4, langkah-langkah yang telah kita ambil membantu dalam dua hal: (1) Menyediakan solusi yang sepenuhnya efektif jika pembacaan dan penulisan cookie pihak ketiga diizinkan, dan (2) menyiapkan sistem kita untuk memanfaatkan peluang apa pun yang terkait peristiwa untuk mencocokkan pengenal lintas konteks jika pencocokan segera mustahil karena pengaturan cookie browser.

Di dalam tugas ini, kita akan membahas pengoptimalan tambahan yang akan membantu saat pengguna bergerak menelusuri konteks dari satu halaman ke halaman lainnya, baik **melalui penautan maupun pengiriman formulir**. Di dalam situasi ini, dan dengan kerja penerapan yang dijelaskan di bawah ini, kita dapat menyiapkan rencana yang sepenuhnya efektif untuk mengelola status pengguna di semua konteks.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="Tautan dapat digunakan untuk meneruskan informasi pengenal dari satu konteks ke konteks lain (terkait)" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### Menggunakan fitur-fitur penggantian <a name="using-substitution-features"></a>

Pendekatan kita akan menggunakan dua jenis dari [penggantian variabel AMP](https://github.com/ampproject/amphtml/blob/master/spec/./amp-var-substitutions.md).

**Untuk memperbarui tautan keluar untuk menggunakan penggantian ID Klien**: Tentukan sebuah parameter kueri yang baru, `ref_id` (“ID perujuk”), yang akan muncul di dalam URL, dan indikasikan **pengenal konteks asal** untuk pengguna. Atur parameter kueri ini agar sama dengan nilai penggantian ID Klien AMP:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Solusi alternatif untuk meneruskan ID Klien ke tautan keluar:** Tentukan parameter kueri yang baru `ref_id` sebagai bagian dari atribut data `data-amp-addparams` dan untuk kueri yang membutuhkan penggantian parameter, berikan informasi tersebut sebagai bagian dari `data-amp-replace`. Dengan pendekatan ini, URL akan terlihat bersih dan parameter yang ditentukan pada `data-amp-addparams` akan ditambahkan secara dinamis

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

Untuk meneruskan parameter beberapa kueri melalui `data-amp-addparams` buat `&` terpisah, seperti

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Untuk memperbarui input formulir untuk menggunakan penggantian ID Klien:** Tentukan nama untuk bidang input, seperti `orig_user_id`. Tentukan `default-value` bidang formulir untuk menjadi nilai penggantian ID Klien AMP:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

Dengan mengambil langkah-langkah ini, ID Klien tersedia untuk server target dan/atau sebagai parameter URL pada halaman tempat pengguna tiba setelah tautan diklik atau formulir dikirimkan (**konteks destinasi**). Nama (atau “kunci”) akan menjadi `ref_id` karena kita telah menetapkannya demikian pada penerapan di atas dan akan mempunyai nilai yang terkait sama dengan ID Klien. Contohnya, dengan mengikuti tautan (tag `<a>`) yang ditentukan di atas, pengguna akan bernavigasi ke URL ini:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="Contoh bagaimana pengenal dalam konteks AMP viewer dapat diteruskan melalui link ke konteks asal penerbit" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Jika pengguna tiba di halaman yang berisi nilai `ref_id`, baik sebagai parameter URL atau pada tajuk, kita berpeluang untuk memproses pengenal `ref_id` bersama pengenal yang diungkap melalui halaman itu sendiri (yaitu sebuah nilai cookie). Dengan menyertakan keduanya di dalam ping analitis, server analitis Anda dapat bekerja dengan kedua nilai ini secara serentak, dan, karena mengetahui bahwa keduanya terkait, merefleksikan hubungan ini di backend Anda. Langkah selanjutnya memberikan uraian tentang cara melakukan hal ini.

##### Mengekstrak parameter kueri URL <a name="extracting-url-query-parameters"></a>

Dengan menggunakan fitur-fitur penggantian, kita menetapkan alur navigasi tautan atau alur penyerahan formulir yang mengungkap informasi, khususnya ID Klien, ke server target dan/atau sebagai parameter URL yang dapat dibaca pada klien setelah pengguna selesai bernavigasi.

Jika informasi tersebut hanya diungkapkan ke server, contohnya: melalui POST formulir, maka Anda dapat melanjutkan pemrosesan informasi dan merender halaman hasil. Saat memproses data tersebut, harap perhatikan langkah-langkah menyangkut [Validasi parameter](#parameter-validation) yang diuraikan di bawah ini.

Jika informasi tersebut tersedia melalui URL dan Anda ingin memprosesnya, ada beberapa pendekatan yang dapat Anda gunakan:

- Memproses selama pengalihan (penanganan di pihak atau sisi server)
- Memproses pada halaman landing (penanganan di pihak atau sisi klien)

**Memproses selama pengalihan (penanganan di pihak atau sisi server)**

Untuk memproses selama pengalihan, tangani permintaan di server dan ekstrak parameter yang relevan. Harap perhatikan langkah-langkah menyangkut [Validasi parameter](#parameter-validation) yang diuraikan di bawah ini. Proses data, yang digabungkan dengan nilai-nilai cookie yang berisi pengenal yang relevan lainnya, lalu alihkan ke URL yang tidak mengandung parameter tersebut.

**Memproses pada halaman landing (penanganan di pihak atau sisi klien)**

Untuk memproses pada halaman landing atau halaman tujuan, pendekatan akan berbeda-beda tergantung apakah halaman tersebut sebuah halaman AMP atau halaman non-AMP.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="Contoh cara membuat ping analitik yang berisi pengenal dari konteks sebelumnya yang disediakan melalui URL dan pengenal dari konteks saat ini" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

_Pembaruan pada halaman AMP:_ Gunakan fitur penggantian Parameter Kueri di konfigurasi amp-analytics Anda untuk memperoleh nilai pengenal `ref_id` di dalam URL tersebut. Fitur Parameter Kueri mengambil sebuah parameter yang mengindikasikan “kunci” pasangan kunci-nilai yang diinginkan di dalam URL dan menghasilkan nilai yang sesuai. Gunakan fitur ID Klien seperti yang telah kita kerjakan untuk mendapatkan pengenal untuk konteks halaman AMP.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Saat ini dikirimkan ke jaringan, nilai-nilai yang aktual akan digantikan:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

Dari contoh-contoh kita di atas, kita mempunyai:

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

jadi, ping sebenarnya:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Disarankan untuk mengesahkan keaslian nilai-nilai parameter kueri dengan menggunakan langkah-langkah yang diuraikan di dalam bagian [Validasi parameter](#parameter-validation) di bawah ini.

_Pembaruan pada halaman non-AMP:_ Sama halnya, pada halaman non-AMP yang disajikan dari asal penayang Anda, ekstrak dan kirimkan nilai `ref_id` yang ada di dalam URL. Sahkan keaslian nilai tersebut dengan mengikuti langkah-langkah yang diuraikan di dalam bagian [Validasi parameter](#parameter-validation) di bawah ini. Lalu, buat ping analitis yang akan menyertakan `orig_user_id` yang diambil dari `ref_id` dan `user_id` berdasarkan nilai pengenal cookie pihak pertama.

<blockquote>
<p><strong>PENTING:</strong></p>
<p>Jika Anda memilih untuk memproses parameter pada sisi klien di halaman landing, halaman tersebut harus menghapus informasi pengenal dari URL segera setelah pengenal dapat diketahui.</p>
<p>Sebelum menghapus parameter tersebut, pastikan bahwa kode lain yang perlu dijalankan untuk membacanya:</p>
<ul>
  <li>Telah berjalan sebelum penghapusan dilakukan; atau</li>
  <li>Dapat mengakses tempat di mana kode pembaca dan parameter yang dihapus telah menyimpan datanya</li>
</ul>
<p>Untuk melakukan ini pada halaman non-AMP Anda, sertakan JavaScript berikut ini, yang akan menghapus semua parameter kueri dari URL:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Sesuaikan ini sesuai kebutuhan untuk menghapus lebih sedikit parameter kueri.</p>
</blockquote>

##### Memproses beberapa pengenal di dalam ping analitis <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

Tidak seperti di dalam [Tugas 4](#task4) di mana kita mengonfigurasi ping analitis agar hanya berisi satu nilai pengenal, dengan langkah-langkah yang telah kita ambil sejauh ini di dalam Tugas 5, kini kita mempunyai dua pengenal — `orig_user_id` dan `user_id`. Selanjutnya, kita akan membahas cara memproses kedua pengenal ini yang merupakan bagian dari ping analitis yang masuk.

Sebelum kita melanjutkan, pastikan Anda memperhatikan langkah-langkah yang dijelaskan di dalam [Validasi parameter](#parameter-validation) di bawah ini dan pastikan bahwa Anda bersedia untuk memercayai kedua nilai yang diindikasikan oleh `orig_user_id` dan `user_id`.

Periksa apakah yang sesuai dengan nilai-nilai tersebut ada di dalam tabel pemetaan Anda. Di dalam contoh kita di atas, tampilan halaman pertama terjadi di halaman AMP yang TIDAK berada di asal penayang yang diikuti oleh tampilan halaman kedua yang terjadi di asal penayang. Hasilnya, nilai-nilai untuk parameter kueri ping analitis akan terlihat seperti ini:

**Kasus #1: Pengaturan pengenal jika ping analitis dikirimkan dari halaman di asal penayang**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>ID Pengguna di asal penayang</strong></th>
    <th width="40%"><strong>ID Pengguna pada halaman AMP yang TIDAK berada di asal penayang (“alias”)</strong></th>
  </tr>
  <tr>
    <td><strong>Bagaimana ini diekspresikan dalam ping analitis</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Kunci parameter</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Nilai parameter</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Harap perhatikan bahwa pengenal yang berasal dari tampilan halaman pertama sesuai degan kolom paling kanan dan pengenal yang berasal dari tampilan halaman kedua berada di kolom tengah, sesuai dengan bagaimana alur contoh kita di atas dibuat.

Jika sebaliknya, pengguna memulai pada halaman yang disajikan dari asal penayang dan selanjutnya bernavigasi ke halaman AMP yang TIDAK berada di asal penayang, maka kunci parameter akan dibalik, namun cara untuk merujuk nilai tidak akan dibalik (yaitu `$amp_client_id`, rujuklah selalu pengenal yang disimpan di halaman AMP yang TIDAK berada di asal penayang):

**Kasus #2: Pengaturan pengenal jika ping analitis dikirimkan dari AMP halaman yang TIDAK berada di asal penayang**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>ID Pengguna di asal penayang</strong></th>
    <th width="40%"><strong>ID Pengguna pada halaman AMP yang TIDAK berada di asal penayang (“alias”)</strong></th>
  </tr>
  <tr>
    <td><strong>Bagaimana ini diekspresikan dalam ping analitis</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Kunci parameter</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Nilai parameter</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Jika Anda menelusuri tabel pemetaan, perhatikan situasi mana yang berlaku dan cari nilai-nilai di dalam kolom tabel pemetaan di mana Anda memperkirakannya ada. Contohnya, jika ping analitis dikirimkan dari sebuah halaman pada asal penayang (Kasus #1), maka periksalah nilai-nilai yang ditentukan oleh `user_id` di dalam kolom tabel pemetaan “ID Pengguna pada asal penayang” dan periksa nilai-nilai yang ditentukan oleh `orig_user_id` di dalam kolom “ID Pengguna pada halaman AMP yang TIDAK berada di asal penayang (‘alias’)”.

Jika Anda tidak dapat menemukan nilai pengenal yang digunakan di dalam tabel pemetaan Anda, buat pemetaan baru:

- Jika permintaan analitis berasal dari halaman di asal penayang Anda, maka Anda harus memilih nilai yang sesuai dengan `uid` untuk menjadi pengenal catatan analitis; pilih nilai `orig_uid` untuk menjadi “alias”.
- Jika permintaan analitis tidak berasal dari halaman di asal penayang Anda, maka Anda harus memilih nilai yang sesuai dengan `uid` untuk menjadi nilai “alias” di dalam tabel pemetaan. Lalu, lanjutkan dengan instruksi berikutnya di dalam [Tugas 4](#task4) untuk membuat pengenal asal penayang prospektif dan coba tetapkan nilai-nilai ini sebagai cookie pada asal.

##### Validasi parameter <a name="parameter-validation"></a>

Nilai-nilai yang ada di dalam URL dapat berubah berbahaya, berubah bentuk, atau entah bagaimana bukan nilai-nilai yang Anda harapkan ada di sana. Terkadang ini disebut pemalsuan permintaan lintas situs. Sama pentingnya dengan memastikan bahwa ping analitis yang diterima server analitis Anda berasal dari halaman yang Anda perkirakan akan mengirimkan ping analitis, saat Anda “meneruskan” nilai-nilai yang menjadi bagian URL, pastikan untuk mengesahkan perujuk untuk memastikan bahwa Anda dapat memercayai nilai-nilai ini.

Contohnya, di dalam langkah-langkah di atas, kita membuat URL berikut ini, yang dimaksudkan agar diklik pengguna dan bernavigasi ke halaman yang sesuai:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Namun, ada kemungkinan bahwa pengguna atau penyerang mengubah URL ini menjadi:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Anda perlu memastikan bahwa Anda hanya memproses hal seperti `$amp_client_id` dan menghindari hal seperti `$malicious_value`.

**Langkah-langkah yang disarankan untuk mengesahkan nilai-nilai yang diterima melalui parameter kueri URL:** Pastikan bahwa perujuk halaman landing cocok dengan URL yang Anda perkirakan akan Anda lihat. Ini seharusnya yang Anda lihat membawa nilai pengenal yang sebelumnya telah dilihat ada di dalam permintaan CORS yang valid. Kami sarankan agar Anda hanya menerima pengenal yang telah diketahui..

Pada halaman non-AMP, periksa `document.referrer` langsung pada sisi klien atau teruskan nilai tersebut sebagia bagian dari ping analitis agar dapat mengesahkan pada sisi server. Jika nilai perujuk dapat Anda percayai, maka Anda dapat menerima dan memproses nilai yang dihasilkan dari URL halaman landing, seperti `orig_user_id` di dalam contoh di atas.

Pada halaman AMP, gunakan variabel penggantian [Perujuk Dokumen](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#document-referrer) untuk meneruskan nilai perujuk sebagai bagian dari ping analitis. Pemrosesan sisi server adalah satu-satunya pilihan yang ada. Untuk menggambarkannya, berikut ini adalah ping analitis yang dapat dikirimkan halaman landing yang berisi (1) nilai ID Klien halaman saat ini, (2) nilai yang diteruskan melalui URL yang telah kita atur menjadi nilai ID Klien di dalam halaman rujukan, dan (3) informasi perujuk itu sendiri untuk mengesahkan nilai (2): `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Jika Anda tidak dapat memercayai perujuk, maka tolak nilai apa pun yang disediakan melalui parameter URL dan jangan gunakan.

## Praktik-praktik yang sangat direkomendasikan <a name="strongly-recommended-practices"></a>

### Mempertahankan satu hubungan saja <a name="keep-just-one-association"></a>

**Hanya satu hubungan di antara pengenal dari dua konteks mana saja yang harus dipertahankan.** Jika ID Klien AMP yang sebelumnya telah Anda hubungkan atau kaitkan dengan sebuah cookie atau pengenal pengguna lain yang Anda buat terlihat bersama cookie atau pengenal pengguna baru yang Anda buat, Anda harus menghapus semua status yang Anda buat untuk cookie dan pengenal pengguna sebelumnya.

Langkah-langkah ini akan membantu memastikan keselarasan dengan ekspektasi privasi pengguna. Sebagaimana telah diuraikan di dalam bagian sebelum ini, mengelola status pengguna di dalam AMP akan sering melibatkan penyimpanan dan pengaitan atau penghubungan berbagai pengenal di beberapa konteks di mana konten AMP ditampilkan. **Situasi ini tidak boleh disalahgunakan untuk menyusun data kembali atau melakukan pelacakan yang tidak diduga pengguna atau yang belum Anda ungkapkan dengan jelas kepada pengguna, seperti, contohnya, setelah pengguna menghapus cookie-nya dari situs Anda.**

### Menghormati penghapusan cookie dan penyimpanan lokal <a name="respect-cookie-and-local-storage-deletions"></a>

**Anda harus menghormati semua kontrol privasi yang berlaku yang disediakan untuk pengguna, termasuk kontrol yang memberikan kemampuan untuk menghapus semua cookie dan penyimpanan lokal.** Kapan pun, infrastruktur ID Klien AMP atau AMP tidak boleh [digunakan untuk menyusun kembali pengenal yang telah dihapus](https://en.wikipedia.org/wiki/Zombie_cookie) setelah pengguna dengan tegas menghapus satu sisi hubungan pengenal.

### Mematuhi undang-undang dan peraturan setempat <a name="comply-with-local-laws-and-regulations"></a>

**Cookie dan/atau pengenal terkait dari dua atau lebih domain mungkin mengharuskan Anda memperbarui kebijakan privasi Anda, menyediakan pengungkapan pengguna tambahan, atau memperoleh izin pengguna di beberapa yurisdiksi.** Penggunaan ID Klien AMP, yang menggunakan cookie atau penyimpanan lokal sebagai cara penyimpanan yang persisten untuk menawarkan pengenal yang stabil, harus dianalisis oleh setiap penayang, sehubungan dengan semua hukum dan peraturan yang berlaku menyangkut pengumpulan, penyimpanan, dan pemrosesan data serta pemberitahuan pengguna.
