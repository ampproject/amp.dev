---
'$title': Memonetisasi halaman AMP dengan iklan
$order: 0
description: Panduan ini menyediakan petunjuk dan praktik terbaik untuk menampilkan iklan di halaman AMP Anda. Jadi, untuk menampilkan iklan di AMP, Anda perlu menambahkan komponen amp-ad kustom ....
formats:
  - websites
---

Panduan ini memberikan petunjuk dan praktik terbaik untuk menampilkan iklan di halaman AMP.

## Menambahkan iklan ke halaman

Di halaman non-AMP (HTML biasa), jika ingin menampilkan iklan di halaman, Anda perlu menyertakan cuplikan JavaScript untuk menayangkan iklan dari jaringan iklan Anda. Karena alasan performa dan keamanan, Anda tidak dapat menyertakan JavaScript pihak ketiga di halaman AMP. Oleh karena itu, untuk menampilkan iklan di AMP, Anda perlu menambahkan komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) kustom ke halaman AMP.

[tip type="success"] Lihat AMP By Exampl](../../../../documentation/components/reference/amp-ad.md)e untuk demo langsung yang menunjukkan cara menambahkan tag amp-ad ke halaman AMP. [/tip]

Mari kita ikuti langkah-langkah dalam menambahkan komponen ini agar Anda dapat menampilkan iklan di halaman AMP.

### Langkah 1: Tambahkan skrip amp-ad

Komponen `<amp-ad>` adalah ekstensi iklan kustom untuk library AMP. Di bawah `<amp-ad>` terdapat JavaScript kustom yang dirancang dengan cermat untuk mengoptimalkan performa. Untuk menjalankan komponen `<amp-ad>`, Anda harus menambahkan JavaScript wajib untuk komponen ini di bagian `head` halaman AMP:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

### Langkah 2: Tambahkan tag amp-ad ke halaman AMP

Lebih dari 100 [server dan jaringan iklan](ads_vendors.md) menyediakan integrasi bawaan dengan AMP. Untuk menambahkan iklan pada jaringan iklan tertentu, tambahkan tag `<amp-ad>`, dan tentukan jaringannya dalam atribut `type`.

Pada contoh ini, kita akan menambahkan slot iklan untuk menayangkan iklan dari jaringan a9:

```html
<amp-ad type="a9"> </amp-ad>
```

### Langkah 3: Tentukan ukuran unit iklannya

Add the `width` and `height` attributes to the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tag. This specifies the size of the ad on your AMP page:

```html
<amp-ad type="a9"> width="400" height="300" </amp-ad>
```

### Langkah 4: Tetapkan parameter jaringan iklan

Each network has specific data attributes they require to serve ads. Refer to the ad network's [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) documentation and add the attributes that are needed In the following example, the a9 network requires additional parameters to specify the size of the ad, and other details:

```html
<amp-ad
  type="a9"
  width="400"
  height="300"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

### Langkah 5: (Opsional) Tentukan placeholder

Bergantung pada jaringan iklannya, Anda dapat memilih untuk menampilkan placeholder sampai iklan tersedia untuk ditayangkan. Hal ini memberikan pengalaman pengguna yang lebih baik dengan mencegah ruang kosong. Untuk menentukan placeholder, tambahkan elemen turunan dengan atribut `placeholder`. Pelajari lebih lanjut di [Placeholder & fallback](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="400"
  height="300"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Langkah 6: (Opsional) Tentukan fallback

Bergantung pada jaringan iklannya, Anda dapat memilih untuk menampilkan elemen fallback jika tidak ada iklan yang tersedia untuk ditayangkan. Untuk menentukan fallback, tambahkan elemen turunan dengan atribut `fallback`. Pelajari lebih lanjut di [Placeholder & fallback](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="400"
  height="300"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Selamat! Sekarang Anda siap menayangkan iklan di halaman AMP!

## Menayangkan iklan AMPHTML yang dijual langsung

Komponen [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) menayangkan iklan dari jaringan yang Anda tentukan. Iklan tersebut dapat berupa iklan HTML standar atau iklan HTML AMP, asalkan jaringan iklan mendukung iklan HTML AMP. Untuk menayangkan iklan yang dijual langsung sebagai iklan HTML AMP, buat iklan dalam HTML AMP sesuai dengan persyaratan [spesifikasi iklan HTML AMP](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) dan gunakan [server iklan yang menayangkan iklan HTML AMP](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers).

## Meningkatkan data penargetan pada permintaan iklan

Sebagai bagian dari mekanisme penayangan Fast Fetch, fitur Real-Time Config (RTC) memungkinkan penayang untuk meningkatkan permintaan iklan dengan informasi penargetan pihak pertama dan pihak ketiga yang diambil selama runtime. RTC mendukung hingga 5 pemanggilan ke server penargetan untuk setiap slot iklan individual, yang hasilnya ditambahkan ke akhir permintaan iklan. Untuk menggunakan RTC pada iklan, jaringan iklan yang Anda gunakan harus mendukung RTC dan Fast Fetch.

Anda dapat mempelajari lebih lanjut tentang RTC dari video YouTube ini:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Tonton video tentang Monetisasi AMP yang Efektif dengan Header Bidding.']

Atau, pelajari lebih lanjut dari referensi RTC ini:

- [Panduan implementasi penayang RTC AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [Real Time Config AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Praktik terbaik

Berikut ini beberapa tips untuk memaksimalkan efektivitas iklan di halaman AMP:

### Penempatan & kontrol: optimalkan penempatan iklan Anda

- **Tempatkan jumlah iklan yang sama** pada Halaman AMP seperti pada halaman non-AMP untuk menghasilkan pendapatan per halaman yang maksimum.
- **Tempatkan iklan pertama tepat di bawah viewport pertama** ("paruh bawah") untuk memberikan pengalaman pengguna yang optimal.
- Kecuali Anda menggunakan CSS lanjutan atau kueri media, **pastikan unit iklan berada di tengah-tengah halaman** untuk memberikan pengalaman web seluler yang optimal kepada pengguna.
- Aktifkan [permintaan iklan multi-ukuran](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests) pada inventaris AMP Anda untuk meningkatkan tekanan lelang iklan dan mendorong pendapatan.

### Demand & pricing: get the right price for your ads

- **Jual unit iklan di halaman AMP Anda di seluruh saluran penjualan**, termasuk saluran penjualan langsung dan tidak langsung guna memaksimalkan persaingan untuk inventaris Anda di halaman AMP.
- **Tetapkan harga inventaris iklan di halaman AMP** yang sama dengan harga untuk inventaris Anda di halaman non-AMP. Pantau performa dan sesuaikan harga berdasarkan pemantauan tersebut.
- **Pastikan semua saluran permintaan iklan bersaing** untuk inventaris iklan yang ada di halaman AMP guna meningkatkan persaingan.

### Jenis iklan: Tayangkan jenis iklan terbaik

- **Avoid heavy creatives** per [IAB guidelines](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Avoid interstitials** or other ad formats that cause the content to reflow on ad load.
- **Optimalkan visibilitas** dengan mengatur strategi pemuatan data agar lebih mengutamakan visibilitas daripada penayangan.
- **Place ads in your video content** via [supported players](../../../../documentation/components/index.html#media) or [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) to enable revenue on all types of content.
- **Terapkan iklan native** untuk bersaing dengan iklan display menggunakan permintaan iklan multi-ukuran, yang akan meningkatkan tekanan permintaan sekaligus memberikan pengalaman pengguna premium kepada pembaca Anda.

### Inovasi: Tawarkan produk iklan yang paling menarik

- **Terapkan iklan pada halaman AMP tambahan** untuk menghasilkan pendapatan tambahan:
  - [Iklan di carousel](../../../../documentation/examples/documentation/Carousel_Ad.html)
  - [Iklan di lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
  - ... dan [lain-lain](../../../../documentation/examples/index.html)
- **Terapkan format baru untuk iklan yang dijual langsung** untuk membekali tim penjualan Anda dengan produk iklan inovatif yang berdampak tinggi:
  - [Iklan Melekat](../../../../documentation/examples/documentation/amp-sticky-ad.html)
  - [Flying Carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Additional resources

- [Template iklan AMPHTML](../../../../documentation/examples/index.html)
- [Demo: Memperlihatkan cara menambah `amp-ad` ke halaman AMP](../../../../documentation/components/reference/amp-ad.md)
