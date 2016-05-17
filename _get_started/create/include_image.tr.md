---
layout: page
title: Bir Görüntü Ekleyin
order: 1
locale: tr
---

HTML etiketlerinin birçoğu AMP HTML›de kullanılabilir, ancak `<img>` etiketi gibi bazı etiketler eşdeğeri ya da biraz geliştirilmiş özel AMP HTML etiketleri ile değiştirilir (ve sorunlu etiketlerden birkaçı tamamen yasaklanır, bkz.[Spesifikasyondaki HTML Etiketleri](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Ek işaretlerin nasıl görüneceğini örneklendirmek için, sayfaya bir görüntü yerleştirmek için gerekli kod burada verilmiştir:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

`<img>` gibi etiketleri `<amp-img>` ile neden değiştirdiğimizi ve kaç tane mevcut olduğunu öğrenmek için, [Bilgi İletim Birimleri ve Medya Ekle](/docs/guides/amp_replacements.html) bölümüne gidin.

{% include button.html title="Adım 3 ile devam edin" link="/docs/get_started/create/presentation_layout.tr.html" %}
