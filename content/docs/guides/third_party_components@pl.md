---
$title: Dołączanie treści innych firm
---

Dowiedz się, jak umieszczać na swoich stronach komponenty innych firm.

[TOC]

## Umieszczanie tweeta

Tweety umieszcza się na stronie
za pomocą elementu [`amp-twitter`](/docs/reference/components/amp-twitter.html).

Aby umieścić tweet na stronie,
w sekcji `<head>` umieść najpierw taki skrypt:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Obecnie tweety są automatycznie skalowane tak,
by ich proporcje pasowały do podanego rozmiaru.
Może się jednak zdarzyć tak, że nie będą wyglądały
tak ładnie, jak powinny.
Aby wybrać współczynnik proporcji na podstawie szerokości ekranu, ręcznie dostosuj podane wartości dla szerokości i wysokości albo użyj atrybutu media.

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Umieszczanie elementu z Instagrama

Posty z Instagrama umieszcza się
na stronie za pomocą elementu [`amp-instagram`](/docs/reference/components/amp-instagram.html).

Aby na stronie umieścić element z Instagrama,
w sekcji `<head>` umieść najpierw taki skrypt:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Umieść fragment kodu (shortcode) Instagrama skopiowany z adresu URL zdjęcia.
Na przykład w adresie `https://instagram.com/p/fBwFP`
shortcode to `fBwFP`.
Instagram używa także z góry ustalonego współczynnika proporcji dla układów elastycznych, więc wartości szerokości i wysokości powinny być uniwersalne.

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Wyświetlanie postów i filmów z Facebooka

Posty i filmy z Facebooka wyświetla się za pomocą elementu [`amp-facebook`](/docs/reference/components/amp-facebook.html).

W sekcji `<head>` trzeba dodać dodać następujący skrypt:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Przykład: umieszczanie posta

Source: 
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Preview: 
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Przykład: umieszczanie filmu

Source: 
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Preview: 
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

## Umieszczanie filmów z YouTube

Filmy z YouTube umieszcza się na stronie
za pomocą elementu [`amp-youtube`](/docs/reference/components/amp-youtube.html).

W tagu `<head>` trzeba dodać następujący skrypt:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Element `data-videoid` jest obecny w adresie URL każdej strony serwisu YouTube.
Na przykład w adresie `https://www.youtube.com/watch?v=Z1q71gFeRqM`
ciąg znaków `Z1q71gFeRqM` to identyfikator filmu.

Za pomocą parametru `layout="responsive"` uzyskasz poprawne układy dla filmów o współczynniku proporcji 16:9:

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Wyświetlanie reklam

Reklamy wyświetla się na stronie
za pomocą elementu [`amp-ad`](/docs/reference/components/amp-ad.html).
Obsługiwane są tylko reklamy wyświetlane za pomocą protokołu HTTPS.

Dokumenty AMP nie zezwalają na umieszczanie w nich reklam korzystających z JavaScriptu.
Zamiast tego technologia AMP ładuje element iframe 
z innego źródła (poprzez piaskownicę iframe)
i wykonuje JavaScript reklamy wewnątrz piaskownicy iframe.

Należy określić szerokość i wysokość reklamy oraz rodzaj sieci reklamowej.
Atrybut `type` identyfikuje szablon sieci reklamowej.
Różne rodzaje sieci reklamowych wymagają innych atrybutów `data-*`.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Jeśli sieć reklamowa go obsługuje,
użyj elementu `placeholder`, który
będzie się wyświetlał w przypadku braku reklamy:

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

AMP obsługuje szeroką gamę sieci reklamowych. Zobacz [ich pełną listę](/docs/reference/components/amp-ad.html#supported-ad-networks).
