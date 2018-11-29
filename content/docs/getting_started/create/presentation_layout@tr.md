---
$title: Sunum ve Düzeni Değiştirin
---

## Sunumu değiştirin

AMP›ler web sayfalarıdır; sayfa ve ögelerinde yapılacak biçimlendirmeler yaygın CSS özellikleri kullanılarak yapılmaktadır. `<head>` içerisinde `<style amp-custom>` adı verilen bir satır içi stil sayfasında yer alan sınıf veya öge selektörleri kullanan biçim ögeleri:

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

Her AMP sayfasında yalnızca tek bir yerleştirilmiş stil sayfası olabilir ve kullanmanıza izin verilmeyen belli selektörler vardır. [Biçimlendirme hakkında her şeyi öğrenin]({{g.doc('/content/docs/design/responsive_amp/style_pages.md', locale=doc.locale).url.path}}).

## Düzeni kontrol edin

AMP sayfadaki ögeleri düzenlerken daha sıkı kurallar takip eder. Normal bir HTML sayfasında, ögeleri düzenlemek için neredeyse özel olarak CSS kullanırsınız. Ancak performans nedenlerinden dolayı, AMP tüm ögelerin en başından beri özel bir boyuta ayarlanmış olmasını gerektirir.

AMP›nin bir sayfayı nasıl işlediği ve düzenlediği, ayrıca [Düzeni Kontrol Etme]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}}) bölümünden düzeni nasıl değiştirebileceğiniz hakkında her şeyi öğrenin.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/docs/getting_started/create/include_image.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Önceki</span></a>
  <a class="button next-button" href="{{g.doc('/content/docs/getting_started/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-next">Sonraki</span></a>
</div>
