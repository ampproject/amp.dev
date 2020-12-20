---
"$title": Sayfanızı Keşif ve Dağıtım için Hazırlama
"$order": '4'
description: 'Bazı durumlarda, aynı sayfanın hem AMP olmayan hem de AMP sürümüne sahip olmak isteyebilirsiniz; örneğin, bir haber makalesi. Bunu düşünün: Google Arama ...'
author: pbakaus
contributors:
- bpaduch
---

Bazı durumlarda, aynı sayfanın hem AMP olmayan hem de AMP sürümüne sahip olmak isteyebilirsiniz; örneğin, bir haber makalesi. Bunu düşünün: Google Arama bu sayfanın AMP olmayan bir sürümünü bulursa, *bir AMP versiyonu olduğunu nasıl anlar*?

## <code><link></code> ile sayfaları bağlama

Bu sorunu çözmek için, AMP olmayan sayfaya AMP sayfası ile bilgileri, AMP sayfasına ise AMP olmayan sayfa bilgilerini `<head>` içindeki `<link>` etiketi şeklinde ekleriz.

AMP olmayan sayfaya aşağıdakileri ekleyin:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Ve AMP sayfasına bunu ekleyin:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Sadece tek bir sayfam varsa ne olur?

Sadece tek bir sayfanız var ve bu sayfa bir AMP sayfasıysa, yine de standart bağlantıyı eklemeniz gerekir, bu bağlantı daha sonra yalnızca kendine referans verecektir:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **OKUMAYA DEVAM EDİN –** [AMP sayfaları için Google Arama kılavuzlarında](https://support.google.com/webmasters/answer/6340290) Google'ın AMP sayfalarını nasıl bulduğuna dair daha fazla bilgi edinin. [/tip]
