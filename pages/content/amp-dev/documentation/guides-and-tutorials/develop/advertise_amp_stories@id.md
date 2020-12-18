---
"$title": Beriklan di Cerita Web
"$order": '3'
description: Cerita Web merupakan pengalaman layar penuh yang dapat diketuk dan membuat pembaca terhanyut di dalam kontennya. Beriklan dengan iklan Cerita AMP menghadirkan pengalaman yang mulus dan bebas gangguan ....
formats:
- stories
author: CrystalOnScript
---

Cerita Web merupakan pengalaman layar penuh yang dapat diketuk dan membuat pembaca terhanyut di dalam kontennya. Beriklan dengan iklan Cerita AMP menghadirkan pengalaman integrasi yang mulus dan bebas gangguan dalam perjalanan pengguna sehingga tetap tertarik dan puas dengan platform tersebut.

## Penempatan Iklan

Cerita Web menggunakan satu komponen [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) untuk menentukan kuantitas dan penempatan iklan.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) is a wrapper around the [`amp-ad`](../../../documentation/components/reference/amp-ad.md) component. It dynamically inserts one or multiple ads while the user consumes the story content. To ensure the best user experience:

1. Iklan dirender sebelumnya dengan runtime Cerita Web, lalu dimasukkan. Ini menjamin bahwa pengguna tidak akan mendapatkan sajian iklan yang kosong atau tidak termuat.

2. Ad density is optimised with content ratio to prevent oversaturation. The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component decides when and where to insert ads as the user progresses.

Suatu Cerita Web menempatkan iklan pertama beberapa saat setelah dua halaman pertama dengan tujuan mengoptimalkan pendapatan monetisasi dan pengalaman pengguna.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **NOTE –** A longer Web Story will typically create more opportunities for ad placement. The exact placement of the ad algorithm will continue to be optimized over time. [/tip]

## Interaksi pengguna

Users can progress past ads the same way as normal story pages; by tapping the right two thirds of the screen.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Image showing the area users can tap to skip an ad', caption='Pengguna dapat berinteraksi dengan iklan lalu dengan mengetuk dua per tiga bagian kanan layar.', align='' ) }}

Pengguna berinteraksi secara langsung dengan iklan tersebut dengan mengetuk tombol [minta tindakan](story_ads_best_practices.md#call-to-action-button-text-enum) yang ditampilkan sistem yang muncul di sepertiga bagian bawah semua iklan Cerita Web. Tombol ini dapat dikonfigurasi untuk mengirimkan pengguna ke URL yang diinginkan (atau ke app store yang relevan).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Image showing that usersare redirected to an ad landing destination, but can return to the story.', caption='Pengguna dialihkan kembali ke destinasi landing iklan, namun dapat kembali ke cerita.', align='' ) }}

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

Unlike a normal [`amp-ad`](../../../documentation/components/reference/amp-ad.md), no `<fallback>` or `<placeholder>` is required, as Web Story ads are only displayed once fully rendered.

## Getting started with Story Ads

The easiest way to include ads in your Web Story is by serving ads from a supported ad server.

Server iklan yang saat ini mendukung iklan Cerita AMP:

- Google Ad Manager {a0}{/a0}
    - [Iklan yang dijual langsung](https://support.google.com/admanager/answer/9038178)
    - [Iklan terprogram](https://support.google.com/admanager/answer/9416436)
- Google AdSense segera hadir
- Platform iklan lain dapat berintegrasi (hubungi kami untuk [detail melalui Github](https://github.com/ampproject/amphtml/issues/30769))

Jika Anda adalah pengiklan yang tertarik menjalankan iklan Anda di dalam Cerita Web, harap [hubungi kami](mailto:story-ads-wg@google.com) untuk mendapatkan informasi lebih lanjut.

Publishers can also place custom ads if they set up their own ad server. [The process is detailed here](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Read [Traffic custom creatives in Web Stories](https://support.google.com/admanager/answer/9038178) for information about uploading ads to Google Ad Manager and checkout our guide on [Best practices for creating an AMP Story ad](story_ads_best_practices.md). [/tip]
