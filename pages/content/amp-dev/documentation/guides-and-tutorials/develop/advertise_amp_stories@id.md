---
'$title': Beriklan di Cerita Web
$order: 3
description: Cerita Web merupakan pengalaman layar penuh yang dapat diketuk dan membuat pembaca terhanyut di dalam kontennya. Beriklan dengan iklan Cerita AMP menghadirkan pengalaman yang mulus dan bebas gangguan ....
formats:
  - stories
author: CrystalOnScript
---

Cerita Web merupakan pengalaman layar penuh yang dapat diketuk dan membuat pembaca terhanyut di dalam kontennya. Beriklan dengan iklan Cerita AMP menghadirkan pengalaman integrasi yang mulus dan bebas gangguan dalam perjalanan pengguna sehingga tetap tertarik dan puas dengan platform tersebut.

## Penempatan Iklan

Cerita Web menggunakan satu komponen [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) untuk menentukan kuantitas dan penempatan iklan.

Ekstensi [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) adalah pembungkus komponen [`amp-ad`](../../../documentation/components/reference/amp-ad.md) yang secara dinamis memasukkan satu atau beberapa iklan sementara pengguna menikmati isi cerita. Untuk memastikan pengalaman pengguna terbaik:

1. Iklan dirender sebelumnya dengan runtime Cerita Web, lalu dimasukkan. Ini menjamin bahwa pengguna tidak akan mendapatkan sajian iklan yang kosong atau tidak termuat.

2. Kepadatan iklan dioptimalkan dengan rasio konten untuk mencegah saturasi yang berlebihan. Ekstensi [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) memutuskan kapan dan di mana memasukkan iklan seiring kemajuan pengguna.

Suatu Cerita Web menempatkan iklan pertama beberapa saat setelah dua halaman pertama dengan tujuan mengoptimalkan pendapatan monetisasi dan pengalaman pengguna.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **CATATAN –** Cerita AMP yang lebih panjang memberikan peluang yang lebih banyak untuk penempatan iklan. Penempatan algoritme iklan yang akurat akan terus dioptimalkan seiring waktu. [/tip]

## Interaksi pengguna

Pengguna dapat berinteraksi dengan iklan lalu dengan cara yang sama seperti halaman cerita normal; dengan mengetuk dua per tiga bagian kanan layar.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Image showing the area users can tap to skip an ad', caption='Pengguna dapat berinteraksi dengan iklan lalu dengan mengetuk dua per tiga bagian kanan layar.', align='' ) }}

Pengguna berinteraksi secara langsung dengan iklan tersebut dengan mengetuk tombol [minta tindakan](story_ads_best_practices.md#call-to-action-button-text-enum) yang ditampilkan sistem yang muncul di sepertiga bagian bawah semua iklan Cerita Web. Tombol ini dapat dikonfigurasi untuk mengirimkan pengguna ke URL yang diinginkan (atau ke app store yang relevan).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Image showing that users are redirected to an ad landing destination, but can return to the story.', caption='Pengguna dialihkan kembali ke destinasi landing iklan, namun dapat kembali ke cerita.', align='' ) }}

## Mengonfigurasi Cerita Web untuk iklan

Cerita Web tidak dapat mendukung [`amp-ad`](../../../documentation/components/reference/amp-ad.md) langsung di halaman. Sebaliknya, semua iklan diambil dan ditampilkan oleh komponen [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md). Komponen [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) harus ditempatkan sebagai elemen anak (turunan )langsung dari [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html]
<amp-story>
<amp-story-auto-ads>
<script type="application/json">
{
"ad-attributes": {
// ad server configuration
}
}
</script>
</amp-story-auto-ads>
<amp-story-page>
...
</amp-story>
[/sourcecode]

Tidak seperti [`amp-ad`](../../../documentation/components/reference/amp-ad.md) yang biasa, tidak dibutuhkan `<fallback>` atau `<placeholder>`, karena iklan Cerita AMP hanya akan ditampilkan setelah sepenuhnya dirender.

## Mengintegrasikan Dukungan Server Iklan

Cara termudah untuk menyertakan iklan di dalam Cerita AMP Anda adalah dengan menyajikan iklan dan server iklan yang didukung.

Server iklan yang saat ini mendukung iklan Cerita AMP:

- Google Ad Manager {a0}{/a0}
  - [Iklan yang dijual langsung](https://support.google.com/admanager/answer/9038178)
  - [Iklan terprogram](https://support.google.com/admanager/answer/9416436)
- Google AdSense segera hadir
- MGID
  - [Iklan yang dijual langsung](https://help.mgid.com/generate-revenue-with-amp-web-stories)
- Platform iklan lain dapat berintegrasi (hubungi kami untuk [detail melalui Github](https://github.com/ampproject/amphtml/issues/30769))

Jika Anda adalah pengiklan yang tertarik menjalankan iklan Anda di dalam Cerita Web, harap [hubungi kami](mailto:story-ads-wg@google.com) untuk mendapatkan informasi lebih lanjut.

Penayang juga dapat menempatkan iklan kustom jika mereka membuat server iklan sendiri. [. Prosesnya diuraikan di sini](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Bacalah [Kreatif kustom lalu lintas di Cerita Web](https://support.google.com/admanager/answer/9038178) untuk mendapatkan informasi tentang mengunggah iklan ke Google Ad Manager dan buka panduan kami tentang [Praktik terbaik untuk membuat iklan Cerita AMP](story_ads_best_practices.md). [/tip]
