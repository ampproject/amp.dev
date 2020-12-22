---
"$title": Mengintegrasikan teknologi Anda dengan AMP
"$order": '0'
"$hidden": 'true'
description: Jika Anda adalah penyedia teknologi untuk penayang atau pengiklan di web, kami mengundang Anda untuk menambahkan dukungan ke AMP sehingga pelanggan Anda dapat terus memanfaatkan teknologi Anda dan ....
formats:
- websites
- ads
- stories
- email
---

Terima kasih atas minat Anda dalam berkontribusi untuk AMP! Kami menghargai partisipasi Anda untuk menjadikan web sebagai platform forward pengguna.

Penayang telah membuat lebih dari 1,4 miliar dokumen AMP yang dihosting di lebih dari 750 ribu domain berbeda. Pertumbuhan ini tidak mungkin terjadi tanpa adanya dukungan yang kuat dari 100 lebih perusahaan teknologi pihak ketiga, yang telah berintegrasi dengan AMP.

Jika Anda adalah penyedia teknologi bagi penayang atau pengiklan di web, kami mengundang Anda untuk menambahkan dukungan ke AMP, sehingga pelanggan dapat terus memanfaatkan teknologi Anda dan mencapai visi bersama kami untuk membuat web yang lebih baik.

Dokumen ini menguraikan ekspektasi pihak ketiga AMP dan menentukan tingkat kontribusi.

# Panduan berkontribusi

All general contributions are subject to the [AMPHTML universal guidelines in CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md). We expect the third party to test, maintain, and update their contribution to various degrees.

To qualify for inclusion, all contribution levels must:

- Memenuhi [persyaratan kelayakan Wikipedia bahasa Inggris](https://en.wikipedia.org/wiki/Wikipedia:Notability).
- Mempertahankan atau meningkatkan jenis tingkat layanan yang sama seperti yang dijanjikan AMP untuk penayang dan pengguna.
- Dibuat dengan kualitas yang baik.
- Membuat saluran pemecahan masalah untuk pelanggan mereka.
- Memberikan cakupan pengujian integrasi yang baik terhadap produksi AMP dan rilis kenari.
- Memenuhi tujuan yang belum ada.

Ada 3 tingkat kontribusi pihak ketiga. Tingkatan bergantung pada jumlah logika yang ditambahkan:

- Logika komponen: Kode yang menentukan fitur inti dan fungsi komponen AMP.
- Logika pihak ketiga: Kode yang dikhususkan untuk pihak ketiga. Logika ini memungkinkan komponen untuk memanfaatkan layanan pihak ketiga.

Semakin banyak logika yang ditambahkan ke repositori AMP, terutama logika khusus pihak ketiga, semakin meningkatkan tingkat kontribusi. Tingkat kontribusi yang tinggi membutuhkan lebih banyak komitmen dari pihak ketiga.

Level 1 and level 2 contributions share components between third parties. If there is a component fulfills a purpose similar to your business, consider reusing that component. This requires much less effort and is more long-term maintainable.

Setelah memutuskan tingkat kontribusi yang sesuai dengan contoh penggunaan Anda, buka [masalah GitHub](https://github.com/ampproject/amphtml/issues/new) untuk memulai.

## Kontribusi tingkat 1

Ekstensi amp-ad digunakan untuk menayangkan iklan Display di halaman AMP. Lebih dari 90 penyedia teknologi iklan telah menambahkan dukungan ke AMP.  Untuk memulai, baca [ringkasan pengembangan](https://github.com/ampproject/amphtml/tree/master/ads#overview) atau lihat bagian [petunjuk developer](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) untuk menambahkan dukungan Anda ke ekstensi amp-ad. Bergantung pada teknologi iklan yang disediakan oleh perusahaan Anda, [petunjuk integrasi](ad-integration-guide.md) ini mungkin berguna.

Ada lebih dari 90 penyedia iklan yang telah menambahkan dukungan untuk fitur yang berkaitan dengan iklan seperti [`amp-ad`](../../../components/reference/amp-ad.md) . Berikut adalah contoh [pull request](https://github.com/ampproject/amphtml/pull/2299) dari jaringan iklan [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

The only third party specific logic checked into the AMP repository is a third party configuration. Adding a new third party to an existing level 1 contribution typically does not need a design review. Third parties can follow the integration documentation of the component, such as [Integrating ad networks into AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

### Harapan untuk pihak ketiga

- Memelihara dan menyajikan JavaScript kustom vendor secara mandiri.
- Memberikan pengujian untuk konfigurasinya dan menanggapi masalah.
- Menyediakan saluran pemecahan masalah untuk pengembang.
- Menanggapi setiap dan semua pengajuan atau laporan bug yang terkait dengan layanan mereka.

### Contoh tingkat 1

[**amp-ad**](../../../components/reference/amp-ad.md)

Ad providers should read the [development overview](https://github.com/ampproject/amphtml/tree/master/ads#overview) and the [developer instructions](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) for adding your support to [`amp-ad`](../../../components/reference/amp-ad.md). Depending on the ad technology your company provides, you might find [these integration instructions ](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads)useful.

There are many ad providers who have added support for advertising related features like amp-ad. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/2299) from the ad network [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## Kontribusi tingkat 2

Kontribusi tingkat 2 memanfaatkan logika fitur dari komponen yang sudah ada. Semua logika dimasukkan ke dalam repositori AMP, dan tidak ada Javascript kustom yang dapat dimuat ke dalam iframe. Contohnya: penyedia analitik menambahkan konfigurasi mereka ke komponen [`amp-analytics`](../../../components/reference/amp-analytics.md), tetapi menyertakan endpoint untuk melacak data, seperti jumlah klik pengguna.

Pihak ketiga menambahkan konfigurasi atau fitur, seperti API baru, ke komponen yang sudah ada untuk menerapkan fungsinya. Jika komponen seperti itu tidak ada, mereka dapat mengusulkan yang baru.

Semua logika bisnis dimasukkan ke dalam repositori AMP, tetapi satu-satunya logika yang spesifik untuk pihak ketiga yang dimasukkan adalah konfigurasi pihak ketiga. Jika komponen berfungsi dengan berkas konfigurasi yang disediakan pihak ketiga, tidak diperlukan tinjauan desain. Jika konfigurasi pihak ketiga menerapkan fitur baru atau komponen baru, maka konfigurasi tersebut harus lulus tinjauan desain AMP.

### Harapan pihak ketiga

- Adding new third party service to an existing level 2 contribution typically does not need a design review. The third party can follow the documentation of that component.
- Mengusulkan komponen baru untuk kontribusi tingkat 2 harus memiliki logika fitur yang dapat dibagikan oleh layanan pihak ketiga lainnya.

### Contoh tingkat 2

[**<a>amp-analytics</a>**](../../../components/reference/amp-analytics.md)

Analitik AMP memungkinkan Anda mengirimkan peristiwa kembali ke server berdasarkan pemicu yang Anda konfigurasi. Kami telah menulis [panduan integrasi analitik](../../optimize-measure/configure-analytics/index.md) untuk membantu Anda memulai.

If you only need to add a tracking pixel with dynamic parameters to your tracking URL, check out [`amp-pixel`](../../../components/reference/amp-pixel.md). Be sure to document usage on your support pages for developers that may want to use your technology with AMP.

Ada penyedia analitik yang telah menambahkan dukungan ke amp-analytics. Berikut ini [sampel permintaan perubahan](https://github.com/ampproject/amphtml/pull/1595) dari penyedia analitik [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

If you provide call tracking measurement services, your use case may be supported with [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). This component dynamically replaces a phone number in a hyperlink to enable call tracking, by executing a CORS request to substitute the number.

To learn more about how this component might work for you, please see the [reference documentation](../../../components/reference/amp-call-tracking.md).

## Kontribusi tingkat 3

Kontribusi tingkat 3 memperkenalkan komponen yang spesifik untuk pihak ketiga yang baru. Ini hanya berlaku jika pihak ketiga tidak dapat:

- Find a component that exists for their use case.
- Request feature improvements to meet their use case.
- Mengusulkan komponen yang berlaku pada layanan pihak ketiga lainnya.

### Harapan pihak ketiga

- Menulis dan mengusulkan tinjauan desain.
- Tests must be able to catch breakage.
- Memperbaiki, atau meminta bantuan, jika komponen rusak.
- Menyediakan melalui dokumentasi dengan sampel kode.
- Memelihara dan memperbarui dokumentasi.
- Menyediakan saluran pemecahan masalah bagi pengembang AMP untuk meminta bantuan.
