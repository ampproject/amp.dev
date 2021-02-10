---
'$title': Mengintegrasikan alat analitis Anda dengan AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: Gambaran Umum
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Gambaran Umum <a name="overview"></a>

Jika Anda mengoperasikan perangkat lunak sebagai alat layanan untuk penayang agar dapat lebih memahami lalu lintas dan pengunjungnya, Anda mungkin ingin mengintegrasikan layanan Anda ke dalam `amp-analytics`. Ini akan memungkinkan pelanggan Anda untuk melihat pola lalu lintas untuk halaman HTML AMP mereka.

## Sebelum Anda mulai <a name="before-you-begin"></a>

Sebelum Anda dapat menambahkan layanan analitis Anda ke runtime HTML AMP, Anda mungkin perlu untuk:

- Mengidentifikasi jenis [variabel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) dan [permintaan](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests) yang akan Anda butuhkan di dalam dokumen HTML AMP untuk layanan analitis Anda.
- Mengidentifikasi pemicu yang akan menghasilkan permintaan analitis dikirimkan dari halaman yang relevan dengan layanan Anda.
- Mempertimbangkan jika dan bagaimana Anda akan [melacak pengguna](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) konteks AMP pihak pertama dan pihak ketiga.
- Menentukan cara dasbor analitis Anda menangani lalu lintas AMP
- Mengidentifikasi fungsionalitas apa pun yang tidak ada di dalam `amp-analytics`, dan [mengajukan permintaan](https://github.com/ampproject/amphtml/issues/new) untuk fitur-fitur yang dibutuhkan.
- Analitis AMP mengirimkan variabelnya ke endpoint yang telah dikonfigurasi sebelumnya. Jika Anda belum mempunyai endpoint, kaji [sampel ini](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) untuk mengetahui gambaran umum tentang cara membuatnya.
  - Untuk semua jenis transpor, kecuali `iframe`, variabel dikirimkan sebagai parameter untai kueri dalam permintaan HTTPS.
  - Untuk jenis transpor `iframe` sebuah iframe dibuat dan variabel dikirimkan ke sana melalui `window.postMessage`. Dalam hal ini, pesan tersebut tidak perlu berupa URL. Opsi ini hanya tersedia untuk vendor dengan akreditasi MRC.
- Pertimbangkan bagaimana integrasi dengan `amp-analytics` mungkin berdampak pada kebijakan apa pun (khususnya kebijakan privasi Anda) atau perjanjian yang mungkin Anda miliki.

## Menambahkan konfigurasi Anda ke runtime HTML AMP <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Buat [masalah Rencana yang Ingin Diterapkan](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) yang menyatakan bahwa Anda akan menambahkan konfigurasi layanan analitis Anda ke runtime HTML AMP. Pastikan untuk menyertakan **cc @ampproject/wg-analytics** di dalam deskripsi Anda.
2. Kembangkan patch yang akan menerapkan yang berikut ini:
   1. Sebuah berkas JSON konfigurasi baru `${vendorName}.json` di dalam [folder](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) vendor, termasuk opsi apa pun di atas dan luar default, seperti:
      1. `"vars": {}` untuk variabel default tambahan.
      2. `"requests": {}` untuk permintaan yang akan digunakan layanan Anda.
      3. `"optout":` jika diperlukan. Saat ini, kami tidak mempunyai sistem penolakan (opt-out) yang bagus, jadi silakan hubungi kami untuk membantu mendesain yang berfungsi dengan baik untuk Anda.
      4. `"warningMessage":` jika diperlukan. Menampilkan informasi peringatan dari vendor (seperti depresiasi atau migrasi) pada konsol.
   2. Jika Anda menggunakan transpor iframe, tambahkan juga baris baru ke ANALYTICS_IFRAME_TRANSPORT_CONFIG di dalam iframe-transport-vendors.js yang berisi `"*vendor-name*": "*url*"`
   3. Contoh dalam referensi [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
   4. Pengujian dalam berkas [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
   5. Tambahkan layanan analitis Anda ke daftar vendor yang didukung dalam berkas [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md). Sertakan jenis, deskripsi, dan tautan ke dokumentasi penggunaan Anda.
3. Uji contoh baru yang Anda masukkan ke [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) untuk memastikan bahwa hasil dari contoh bekerja sesuai harapan. Contohnya, data yang diperlukan dikumpulkan dan ditampilkan di dasbor analitis Anda.
4. Kirimkan Pull Request (Permintaan Perubahan) dengan patch ini, dengan merujuk masalah Rencana yang Ingin Diterapkan.
5. Perbarui dokumentasi penggunaan layanan Anda dan sampaikan kepada pelanggan Anda.
6. Sangat direkomendasikan untuk mempertahankan [uji integrasi di luar repo AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Manajer Tag <a name="tag-managers"></a>

Layanan manajemen tag mempunyai dua pilihan untuk berintegrasi dengan Analitis AMP:

- **Pendekatan endpoint:** Bertindak sebagai endpoint tambahan bagi `amp-analytics`, dan melakukan manajemen pemasaran di backend.
- **Pendekatan konfig:** Melakukan manajemen tag melalui berkas konfig JSON yang dihasilkan secara dinamis dan unik untuk setiap penayang.

Pendekatan endpoint sama dengan pendekatan standar yang diuraikan di dalam bagian sebelumnya. Pendekatan konfig berisi tentang pembuatan konfigurasi unik untuk amp-analytics yang spesifik untuk setiap penayang dan menyertakan semua paket analitis mereka yang kompatibel. Penayang akan menyertakan konfigurasi yang menggunakan sintaks yang serupa dengan ini:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

Untuk mengambil pendekatan ini, kaji dokumentasi untuk integrasi penayang dengan Analitis AMP.

## Sumber Daya Lebih Lanjut <a name="further-resources"></a>

- Kajian Mendalam: [Mengapa tidak menggunakan iframe saja?](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- Kajian Mendalam: [Mengelola status pengguna yang belum disahkan dengan AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [Sampel amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Dokumentasi referensi [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Dokumentasi referensi [variabel amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)
