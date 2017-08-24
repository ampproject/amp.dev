---
$title: Membuat Live Blog
---

[TOC]

Live blog adalah halaman yang diupdate secara berkala selama peristiwa yang sedang berlangsung, seperti Super Bowl.

Live blog dapat diterapkan di AMP melalui komponen `amp-live-list` menggunakan markup LiveBlogPosting. Untuk melihat contoh penerapan yang dapat Anda gunakan sebagai titik awal, kunjungi [contoh live blog](https://www.ampbyexample.com/samples_templates/live_blog/) di [ampbyexample.com](https://www.ampbyexample.com).

Tutorial ini memberikan ringkasan singkat terkait komponen `amp-live-list` dan berfokus pada beberapa detail penerapan seperti pemberian nomor halaman dan deep link, semuanya menggunakan sampel live blog sebagai contohnya.

## Ringkasan amp-live-list

Komponen `amp-live-list` secara reguler mengecek dokumen host untuk menemukan konten yang diupdate dan mengupdate browser pengguna akhir jika ada item baru yang tersedia. Artinya, setiap kali sebuah entri blog perlu ditambahkan, dokumen host harus diupdate oleh CMS agar menyertakan update di bagian isi maupun metadata.

Berikut adalah tampilan awal blog:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">Anda memiliki update!</button>
    <div items></div>
</amp-live-list>
[/sourcecode]

Atribut `data-poll-interval` memungkinkan Anda untuk menentukan seberapa sering pengecekan dilakukan. Jika dokumen host diupdate, update harus tersedia untuk pengguna setelah interval waktu berikutnya.

Setiap kali item baru ditambahkan ke dokumen host, elemen `<button update on="tap:my-live-list.update">` akan menampilkan tombol yang, jika diklik, akan memicu halaman agar menampilkan postingan terbaru.

Live blog dapat berkembang dan membuat halaman menjadi terlalu panjang. Atribut `data-max-items-per-page` memungkinkan Anda menentukan jumlah item yang dapat ditambahkan ke halaman live blog. Jika jumlah item yang ditambahkan setelah update melebihi `data-max-items-per-page`, update paling lama yang melebihi jumlah ini akan dihapus. Misalnya, jika saat ini halaman memiliki 9 item, `data-max-items-per-page` disetel ke 10, dan 3 item baru muncul di update terbaru, 2 item yang paling lama akan dihapus dari halaman dengan update terbaru.

`amp-live-list` mengharuskan semua postingan menjadi turunan tag `<div items></div>`. Dengan mengacu pada setiap postingan sebagai item, setiap item harus memiliki `id` unik dan `data-sort-time`.

## Detail penerapan Live Blog

Setelah Anda memahami komponen `amp-live-list`, mari kita cari tahu cara menerapkan live blog yang lebih rumit. Baca terus untuk mempelajari lebih lanjut tentang cara menerapkan pemberian nomor halaman dan cara kerja deep link.

## Pemberian nomor halaman

Blog yang panjang dapat menggunakan pemberian nomor halaman untuk meningkatkan performa dengan membatasi jumlah item blog yang ditampilkan dalam satu halaman. Untuk menerapkan pemberian nomor halaman, tambahkan elemen `<div pagination></div>` dalam komponen `amp-live-list`, lalu sisipkan markup yang dibutuhkan untuk pemberian nomor halaman (misalnya, nomor halaman atau link ke halaman sebelumnya dan berikutnya).

Saat menggunakan pemberian nomor halaman, kode sederhana yang digunakan sebelumnya menjadi:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">Anda memiliki update!</button>
    <div items></div>
    <div pagination>
        <nav>
            <ul>
                <li>1</li>
                <li>Berikutnya</li>
            </ul>
        </nav>
   </div>
</amp-live-list>
[/sourcecode]

Anda harus memasukkan item navigasi secara tepat dengan mengupdate halaman yang dihosting. Misalnya, di [contoh live blog](https://www.ampbyexample.com/samples_templates/live_blog/) kami merender halaman melalui template sisi server dan menggunakan parameter kueri untuk menentukan item blog pertama. Kami membatasi ukuran halaman menjadi 5 item, sehingga jika server telah membuat lebih dari 5 item, saat pengguna berada di halaman utama, halaman seharusnya menampilkan elemen Berikutnya di area navigasi.

<amp-img src="/static/img/liveblog-pagination.png" alt="Live blog pagination" height="526" width="300"></amp-img>

Setelah entri blog telah melebihi jumlah maksimum item yang ditentukan oleh `data-max-items-per-page`, item blog yang lebih lama ditampilkan di halaman "Berikutnya", misalnya di halaman 2. Mengingat `amp-live-list` mengecek server pada interval tertentu untuk melihat apakah ada perubahan pada item, Anda tidak perlu mengecek server jika pengguna tidak berada di halaman pertama.

Anda dapat menambahkan atribut nonaktif ke halaman yang dihosting untuk mencegah mekanisme pengecekan. Pada contoh live blog, kami menerapkan perilaku ini di template sisi server. Jika halaman yang diminta bukan halaman yang pertama, kami menambahkan atribut nonaktif ke komponen amp-live-list.

## Deeplinking

Saat memublikasikan entri blog, penting untuk mengaktifkan deep link ke postingan guna mengaktifkan fitur seperti berbagi. Dengan `amp-live-list`, deep link dapat dilakukan hanya dengan menggunakan ID item blog. Misalnya, [https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3) memungkinkan Anda untuk menavigasi langsung ke entri blog dengan ID "post3".

Pada [contoh live blog](https://www.ampbyexample.com/samples_templates/live_blog/) kami menggunakan teknik berdasarkan cookie untuk membuat konten baru (lihat di bagian Selengkapnya tentang Contoh Live Blog untuk detailnya), sehingga jika ini pertama kalinya Anda berada di halaman, postingan dengan ID "post3" mungkin tidak tersedia. Dalam hal ini kami mengarahkan Anda kembali ke postingan pertama.

