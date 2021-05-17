---
'$title': Berintegrasi dengan AMP untuk menyajikan iklan spanduk
$order: 5
description: Panduan ini diperuntukkan bagi jaringan iklan yang ingin berintegrasi dengan AMP untuk menyajikan tayangan iklan spanduk (display) ke halaman AMP.
formats:
  - ads
---

Panduan ini diperuntukkan bagi jaringan iklan yang ingin berintegrasi dengan AMP untuk menyajikan tayangan iklan spanduk (display) ke halaman AMP.

## Gambaran Umum

Sebagai penyaji iklan, Anda dapat berintegrasi dengan AMP untuk menayangkan iklan HTML biasa ke halaman AMP, serta menayangkan iklan [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### Ingin menayangkan iklan HTML biasa?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Ingin menayangkan iklan HTML AMP?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (cth.: jika Anda belum membuat untuk menayangkan iklan HTML biasa).
2. [Buat integrasi Fast Fetch untuk menayangkan iklan AMPHTML](#creating-a-fast-fetch-integration).

## Membuat implementasi `amp-ad` <a name="creating-an-amp-ad"></a>

Sebagai penyaji iklan, penayang yang Anda dukung menyertakan perpustakaan JavaScript yang Anda sediakan dan menempatkan berbagai "cuplikan iklan" yang mengandalkan perpustakaan JavaScript untuk mengambil iklan dan merendernya di situs web penayang. Karena AMP tidak mengizinkan penayang untuk menjalankan JavaScript sesuka hati, Anda harus ikut menyumbangkan kode sumber terbuka AMP untuk mengizinkan tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) meminta iklan dari penyaji iklan Anda.

[tip type="note"] Anda dapat menggunakan implementasi [`amp-ad`](../../../documentation/components/reference/amp-ad.md) ini untuk menampilkan iklan HTML biasa **dan** iklan HTML AMP. [/tip]

Sebagai contoh, server Amazon A9 dapat dijalankan dengan menggunakan sintaksis berikut ini:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Dalam kode di atas, atribut `type` menentukan jaringan iklan, dalam hal ini A9. Atribut `data-*` bergantung pada parameter yang diharapkan oleh server Amazon A9 untuk menayangkan iklan. Berkas [`a9.js`](https://github.com/ampproject/amphtml/blob/main/ads/a9.js) menunjukkan bagaimana parameter dipetakan untuk membuat panggilan JavaScript ke URL server A9. Parameter terkait yang diteruskan oleh tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) ditambahkan ke akhir URL untuk menampilkan iklan.

Untuk mempelajari cara membuat integrasi [`amp-ad`](../../../documentation/components/reference/amp-ad.md), lihat [Mengintegrasikan jaringan iklan ke dalam AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Membuat integrasi Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) adalah mekanisme AMP yang memisahkan permintaan iklan dari respons iklan, sehingga permintaan iklan dapat muncul lebih awal dalam siklus proses halaman, dan hanya merender iklan yang kemungkinan akan dilihat oleh pengguna. Fast Fetch memberikan perlakuan khusus untuk iklan HTML AMP yang terverifikasi, dibandingkan untuk iklan HTML biasa. Dalam Fast Fetch, jika gagal dalam validasi, iklan akan digabungkan dalam iframe lintas domain untuk membatasi aksesnya dari elemen lain dalam dokumen AMP. Sebaliknya, iklan HTML AMP yang lolos validasi langsung ditulis ke halaman. Fast Fetch menangani iklan AMP dan non-AMP; tidak ada permintaan iklan tambahan yang dibutuhkan untuk iklan yang gagal validasi.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Alur Integrasi Fast Fetch' ) }}

Untuk menampilkan iklan HTML AMP dari server iklan, Anda harus memberikan integrasi Fast Fetch, antara lain:

1. Mendukung komunikasi jaringan SSL.
2. Menyediakan JavaScript untuk membuat permintaan iklan (contoh implementasi: [AdSense](https://github.com/ampproject/amphtml/tree/main/extensions/amp-ad-network-adsense-impl) & [DoubleClick](https://github.com/ampproject/amphtml/tree/main/extensions/amp-ad-network-doubleclick-impl)).
3. Memvalidasi dan menandatangani materi iklan melalui layanan validasi. [Cloudflare](https://blog.cloudflare.com/firebolt/) menyediakan layanan verifikasi iklan AMP, sehingga penyedia iklan independen dapat menayangkan iklan yang lebih cepat, ringan, dan menarik.

Untuk mempelajari cara membuat integrasi Fast Fetch, lihat [Panduan Implementasi Jaringan Fast Fetch](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md).

## Sumber daya terkait

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Daftar vendor iklan yang didukung](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Entri blog yang menjelaskan peluncuran Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
