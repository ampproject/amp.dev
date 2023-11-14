---
'$title': Dodawanie zawartości stron trzecich
$order: 9
description: Dowiedz się jak dodać składniki stron trzecich do swoich stron internetowych...
formats:
  - websites
components:
  - iframe
  - facebook
author: Meggin
contributors:
  - pbakaus
  - bpaduch
---

Dowiedz się, jak dodać składniki stron trzecich do swoich stron internetowych.

## Osadzanie tweeta

Aby osadzić tweet z Twittera w swojej stronie, użyj elementu [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Aby osadzić tweet w swojej stronie, należy najpierw umieścić następujący skrypt w sekcji `<head>`:

[sourcecode:html]

<script async custom-element="amp-twitter"
  src="https://ampjs.org/v0/amp-twitter-0.1.js"></script>

[/sourcecode]

Obecnie tweety są automatycznie skalowane proporcjonalnie, aby dopasować je do podanego rozmiaru, ale może to skutkować wyglądem mniej niż idealnym. Ręcznie dostosuj dostarczoną szerokość i wysokość lub użyj atrybutu media, aby wybrać proporcje zależne od szerokości ekranu.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]

```html
<amp-twitter
  width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

[/example]

[tip type="tip"] **PORADA —** więcej przykładów użycia składnika [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) znajdziesz w sekcji [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Osadzanie Instagrama

Aby osadzić Instagram w swojej stronie, użyj elementu [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Aby osadzić Instagram, należy najpierw umieścić następujący skrypt w sekcji `<head>`:

[sourcecode:html]

<script async custom-element="amp-instagram"
  src="https://ampjs.org/v0/amp-instagram-0.1.js"></script>

[/sourcecode]

Dodaj szortkod danych Instagrama, znajdujący się w adresie URL zdjęcia z Instagrama. Na przykład w adresie `https://instagram.com/p/fBwFP`, szortkodem danych jest `fBwFP`. Ponadto Instagram stosuje stały współczynnik proporcji dla układów responsywnych, więc wartość szerokości i wysokości powinna być uniwersalna.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]

```html
<amp-instagram
  data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive"
>
</amp-instagram>
```

[/example]

[tip type="tip"] **PORADA —** więcej przykładów użycia składnika [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) znajdziesz w sekcji [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Wyświetlanie wpisu lub filmu z Facebooka

Aby wyświetlić na swojej stronie wpis lub film z Facebooka, użyj elementu [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

Najpierw musisz umieścić następujący skrypt w sekcji `<head>`:

[sourcecode:html]

<script async custom-element="amp-facebook"
  src="https://ampjs.org/v0/amp-facebook-0.1.js"></script>

[/sourcecode]

##### Przykład: osadzanie wpisu

Źródło:

```html
<amp-facebook
  width="486"
  height="657"
  layout="responsive"
  data-href="https://www.facebook.com/zuck/posts/10102593740125791"
>
</amp-facebook>
```

Podgląd: {amp-facebook0} {/amp-facebook0}

##### Przykład: osadzanie filmu

Źródło:

```html
<amp-facebook
  width="476"
  height="316"
  layout="responsive"
  data-embed-as="video"
  data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"
>
</amp-facebook>
```

Podgląd: {amp-facebook0} {/amp-facebook0}

[tip type="tip"] **PORADA —** więcej przykładów użycia składnika [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) znajdziesz w sekcji [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## Osadzanie filmu z YouTube

Aby osadzić film z YouTube w swojej stronie, użyj elementu [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Najpierw musisz umieścić następujący skrypt w sekcji `<head>`:

[sourcecode:html]

<script async custom-element="amp-youtube"
  src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>

[/sourcecode]

Identyfikator `data-videoid` YouTube jest zawarty w każdym adresie URL filmu na YouTube. Na przykład w adresie `https://www.youtube.com/watch?v=Z1q71gFeRqM` identyfikatorem filmu jest ciąg `Z1q71gFeRqM`.

Użyj atrybutu `layout="responsive"` aby uzyskać poprawne układy dla filmów o współczynniku proporcji 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

[tip type="tip"] **PORADA —** więcej przykładów użycia składnika [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) znajdziesz w sekcji [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Wyświetlanie reklamy

Aby wyświetlać na stronie reklamę, użyj elementu [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Obsługiwane są tylko reklamy serwowane za pomocą protokołu HTTPS.

Uruchamianie wewnątrz dokumentu AMP kodu JavaScript dostarczonego przez sieć reklamową jest niedozwolone. Zamiast tego, środowisko uruchomieniowe AMP ładuje ramkę iframe z innego źródła (poprzez piaskownicę iframe) i wykonuje JS sieci reklamowej w tej piaskownicy iframe.

Musisz określić szerokość i wysokość reklamy oraz typ sieci reklamowej. Element `type` identyfikuje szablon sieci reklamowej. Różne typy reklam wymagają różnych atrybutów `data-*`.

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
</amp-ad>
```

[/example]

Jeśli jest to obsługiwane przez sieć, należy dodać `placeholder`, aby wyświetlać element zastępczy, jeśli reklama jest niedostępna:

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
  <div placeholder>Have a great day!</div>
</amp-ad>
```

[/example]

AMP obsługuje szeroką gamę sieci reklamowych. Pełna lista — patrz składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md).

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o reklamach z przewodnika [Serwowanie reklam na stronach AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md). [/tip]
