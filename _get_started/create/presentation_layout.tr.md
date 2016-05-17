---
layout: page
title: Sunum ve Düzeni Değiştirin
order: 2
locale: tr
---

## Sunumu değiştirin

AMP›ler web sayfalarıdır; sayfa ve ögelerinde yapılacak biçimlendirmeler yaygın CSS özellikleri kullanılarak yapılmaktadır. `<head>` içerisinde `<style amp-custom>` adı verilen bir satır içi stil sayfasında yer alan sınıf veya öge selektörleri kullanan biçim ögeleri:

{% highlight html %}
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
{% endhighlight %}

Her AMP sayfasında yalnızca tek bir yerleştirilmiş stil sayfası olabilir ve kullanmanıza izin verilmeyen belli selektörler vardır. [Biçimlendirme hakkında her şeyi öğrenin](/docs/guides/responsive/style_pages.html).

## Düzeni kontrol edin

AMP sayfadaki ögeleri düzenlerken daha sıkı kurallar takip eder. Normal bir HTML sayfasında, ögeleri düzenlemek için neredeyse özel olarak CSS kullanırsınız. Ancak performans nedenlerinden dolayı, AMP tüm ögelerin en başından beri özel bir boyuta ayarlanmış olmasını gerektirir.

AMP›nin bir sayfayı nasıl işlediği ve düzenlediği, ayrıca [Düzeni Kontrol Etme](/docs/guides/responsive/control_layout.html) bölümünden düzeni nasıl değiştirebileceğiniz hakkında her şeyi öğrenin.

{% include button.html title="Adım 4 ile devam edin" link="/docs/get_started/create/preview_and_validate.tr.html" %}
