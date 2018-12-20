---
$title: Sayfanızı Keşif ve Dağıtım için Hazırlayın
---

Bazı durumlarda, aynı sayfanın hem AMP olmayan hem de AMP sürümüne sahip olmak isteyebilirsiniz; örneğin, bir haber makalesi. Bunu düşünün: Google Arama bu sayfanın AMP olmayan bir sürümünü bulursa, *bir AMP versiyonu olduğunu nasıl anlar*?

## &lt;bağlantılı sayfaları bağlama>

Bu sorunu çözmek için, AMP olmayan sayfaya AMP sayfası ile bilgileri, AMP sayfasına ise AMP olmayan sayfa bilgilerini `<head>` içindeki `<link>` etiketi şeklinde ekleriz.

AMP olmayan sayfaya aşağıdakileri ekleyin:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Ve AMP sayfasına bunu ekleyin

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Sadece tek bir sayfam varsa ne olur?

Sadece tek bir sayfanız var ve bu sayfa bir AMP sayfasıysa, yine de standart bağlantıyı eklemeniz gerekir, bu bağlantı daha sonra yalnızca kendini gösterecektir:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Önceki</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">Sonraki</span></a>
</div>
