---
layout: page
title: Sayfanızı Keşif ve Dağıtım için Hazırlayın
order: 4
locale: tr
---

Bazı durumlarda, aynı sayfanın hem AMP olmayan hem de AMP sürümüne sahip olmak isteyebilirsiniz; örneğin, bir haber makalesi. Bunu düşünün: Google Arama bu sayfanın AMP olmayan bir sürümünü bulursa, *bir AMP versiyonu olduğunu nasıl anlar*?

## &lt;bağlantılı sayfaları bağlama>

Bu sorunu çözmek için, AMP olmayan sayfaya AMP sayfası ile bilgileri, AMP sayfasına ise AMP olmayan sayfa bilgilerini `<head>` içindeki `<link>` etiketi şeklinde ekleriz.

AMP olmayan sayfaya aşağıdakileri ekleyin:

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

Ve AMP sayfasına bunu ekleyin

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

## Sadece tek bir sayfam varsa ne olur?

Sadece tek bir sayfanız var ve bu sayfa bir AMP sayfasıysa, yine de standart bağlantıyı eklemeniz gerekir, bu bağlantı daha sonra yalnızca kendini gösterecektir:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

{% include button.html title="Adım 6 ile devam edin" link="/docs/get_started/create/publish.tr.html" %}
