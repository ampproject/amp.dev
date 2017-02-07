---
$title: Dołączanie treści innych firm
---

Dowiedz się, jak umieszczać na swoich stronach komponenty innych firm.

[TOC]

## Umieszczanie tweeta

Tweety umieszcza się na stronie
za pomocą elementu [`amp-twitter`](/docs/reference/extended/amp-twitter.html).

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

Przykładowy element `amp-twitter` ze strony
[twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Umieszczanie elementu z Instagrama

Posty z Instagrama umieszcza się
na stronie za pomocą elementu [`amp-instagram`](/docs/reference/extended/amp-instagram.html).

Aby na stronie umieścić element z Instagrama,
w sekcji `<head>` umieść najpierw taki skrypt:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Umieść fragment kodu (shortcode) Instagrama skopiowany z adresu URL zdjęcia.
Na przykład w adresie `https://instagram.com/p/fBwFP`
shortcode to `fBwFP`.
Instagram używa także z góry ustalonego współczynnika proporcji dla układów elastycznych, więc wartości szerokości i wysokości powinny być uniwersalne.

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Wyświetlanie postów i filmów z Facebooka

Posty i filmy z Facebooka wyświetla się za pomocą elementu [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

W sekcji `<head>` trzeba dodać dodać następujący skrypt:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Przykład – umieszczanie posta:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Przykład – umieszczanie filmu:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## Umieszczanie filmów z YouTube

Filmy z YouTube umieszcza się na stronie
za pomocą elementu [`amp-youtube`](/docs/reference/extended/amp-youtube.html).

W tagu `<head>` trzeba dodać następujący skrypt:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Element `data-videoid` jest obecny w adresie URL każdej strony serwisu YouTube.
Na przykład w adresie https://www.youtube.com/watch?v=Z1q71gFeRqM
ciąg znaków Z1q71gFeRqM to identyfikator filmu.

Za pomocą parametru `layout="responsive"` uzyskasz poprawne układy dla filmów o współczynniku proporcji 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Wyświetlanie reklam

Reklamy wyświetla się na stronie
za pomocą elementu [`amp-ad`](/docs/reference/amp-ad.html).
Obsługiwane są tylko reklamy wyświetlane za pomocą protokołu HTTPS.

Dokumenty AMP nie zezwalają na umieszczanie w nich reklam korzystających z JavaScriptu.
Zamiast tego technologia AMP ładuje element iframe 
z innego źródła (poprzez piaskownicę iframe)
i wykonuje JavaScript reklamy wewnątrz piaskownicy iframe.

Należy określić szerokość i wysokość reklamy oraz rodzaj sieci reklamowej.
Atrybut `type` identyfikuje szablon sieci reklamowej.
Różne rodzaje sieci reklamowych wymagają innych atrybutów `data-*`.

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Jeśli sieć reklamowa go obsługuje,
użyj elementu `placeholder`, który
będzie się wyświetlał w przypadku braku reklamy:

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP obsługuje szeroką gamę sieci reklamowych. Zobacz [ich pełną listę](/docs/reference/amp-ad.html#supported-ad-networks).
