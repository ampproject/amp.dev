---
$title: Membuat blog langsung
---

Blog langsung adalah halaman yang sering diperbarui sepanjang acara yang sedang berlangsung, seperti acara olahraga atau pemilu. Di AMP, Anda dapat menerapkan blog langsung menggunakan komponen [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}).

Tutorial ini memberikan gambaran singkat tentang komponen [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) dan berfokus pada beberapa detail implementasi untuk blog langsung, seperti [paginasi] (#pagination) dan [deep linking] (#deeplinking). Kami akan menggunakan [contoh blog langsung] ({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}}) AMP By Example untuk mengilustrasikan implementasi blog langsung di AMP.

[tip type="success"]

Gunakan markup metadata [LiveBlogPosting](http://schema.org/LiveBlogPosting) agar blog Anda dapat diintegrasikan dengan fitur platform pihak ketiga.

[/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Ringkasan tentang `amp-live-list`

Komponen [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) secara teratur memeriksa apa ada konten baru di dokumen host dan memberikan info terbaru ke browser pengguna saat item baru tersedia. Ini berarti bahwa setiap kali postingan blog baru perlu ditambahkan, dokumen host harus diperbarui oleh CMS untuk menyertakan item baru di bagian isi dan [metadata] ({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}}#metadata) pada halaman.

Kode awal untuk blog dapat terlihat seperti berikut:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">Anda memiliki item baru</button>
  <div items></div>
</amp-live-list>
```

Mari kita lihat kode ini:

Setiap komponen [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) membutuhkan ID unik karena mungkin ada lebih dari satu ID pada halaman.  Dalam contoh ini, kami menetapkan `my-live-list` sebagai ID unik.

Atribut `data-poll-interval` menentukan seberapa sering pemeriksaan akan terjadi; jika dokumen host diperbarui, item baru akan tersedia bagi pengguna setelah interval waktu berikutnya.

Setiap kali item baru ditambahkan ke dokumen host, elemen `<button update on="tap:my-live-list.update">` menampilkan tombol "Anda memiliki item baru" yang jika diklik akan memicu halaman untuk menampilkan postingan terbaru.

Blog langsung dapat menjadi semakin besar dan membuat halaman terlalu panjang. Anda dapat menggunakan atribut `data-max-items-per-page` untuk menentukan berapa banyak item yang dapat ditambahkan ke blog langsung. Jika jumlah item setelah diperbarui melebihi `data-max-item-per-page`, item terlama yang melebihi jumlah ini akan dihapus. Misalnya, jika halaman saat ini memiliki 9 item dan `data-max-item-per-page` disetel ke 10, kemudian 3 item baru disertakan dalam pembaruan, dua item terlama akan dihapus dari halaman dan digantikan item terbaru.

Semua postingan blog dalam [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) harus berupa turunan `<div items></div>`. Dengan merujuk pada setiap postingan sebagai item, setiap item harus memiliki `id` dan `data-sort-time` yang unik.

## Detail implementasi

Sekarang Anda telah memahami komponen [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}). Selanjutnya, ayo kita cari tahu cara menerapkan blog langsung yang lebih kompleks. Baca terus untuk mempelajari lebih lanjut cara menerapkan paginasi dan cara kerja deep linking.

### Paginasi

Blog yang panjang dapat menggunakan paginasi untuk meningkatkan performa dengan membatasi jumlah item blog yang akan ditampilkan pada halaman. Untuk menerapkan paginasi, di komponen [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}), tambahkan `<div pagination></div>`, lalu masukkan markup apa pun yang diperlukan untuk paginasi (misalnya, nomor halaman atau link ke halaman berikutnya dan sebelumnya).

Dengan paginasi, kode sederhana yang kami gunakan sebelumnya menjadi:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">Anda memiliki item baru</button>
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
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

Anda bertanggung jawab untuk mengisi item navigasi dengan benar, dengan memperbarui halaman yang dihosting. Misalnya, dalam [contoh blog langsung]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}}), kami merender halaman melalui template sisi server dan menggunakan parameter kueri untuk menetapkan item blog pertama apa yang seharusnya ditampilkan pada halaman. Kami membatasi ukuran halaman menjadi 5 item, jadi jika server telah membuat lebih dari 5 item, elemen "Berikutnya" akan muncul di area navigasi saat pengguna membuka halaman utama. Lihat [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) untuk mengetahui detailnya.

Setelah ukuran postingan blog melampaui jumlah maksimum item yang ditetapkan oleh `data-max-items-per-page`, item blog yang lebih lama akan ditampilkan di halaman "Berikutnya", misalnya di halaman 2. Mengingat bahwa [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}) memeriksa server pada interval waktu tertentu untuk melihat apakah ada perubahan pada item, pemeriksaan server tidak perlu dilakukan jika pengguna tidak membuka halaman pertama.

Anda dapat menambahkan atribut yang dinonaktifkan ke halaman yang dihosting untuk mencegah mekanisme pemeriksaan. Dalam contoh blog langsung, kami melakukan perilaku ini dalam template sisi server; ketika yang diminta bukan halaman pertama, kami menambahkan atribut yang dinonaktifkan ke komponen amp-live-list.

### Deeplinking

Saat Anda mempublikasikan entri blog, penting untuk menempatkan deep link ke postingan untuk mengaktifkan fitur seperti berbagi. Dengan [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}}), deep linking dapat dilakukan dengan hanya menggunakan` id` dari item blog. Misalnya, [https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3) mengizinkan Anda membuka postingan blog secara langsung dengan ID `post3`.

AMP By Example menggunakan cookie di [contoh blog langsung]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}}) untuk membuat konten terkini. Karena itu, jika ini pertama kalinya Anda membuka halaman, postingan dengan ID “post3” mungkin tidak tersedia, dan Anda akan diarahkan ke postingan pertama.

## Referensi

Pelajari lebih lanjut dari referensi berikut:

- Dokumentasi referensi [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}})
- [`amp-live-list`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-live-list.md', locale=doc.locale).url.path}})
- [Contoh blog langsung di AMP By Example]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/live_blog.md', locale=doc.locale).url.path}})
