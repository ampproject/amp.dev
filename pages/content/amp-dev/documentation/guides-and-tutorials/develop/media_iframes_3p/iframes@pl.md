---
'$title': Dodawanie ramek iframe
$order: 10
description: Dowiedz się, jak wyświetlać zawartość multimedialną na swoich stronach i jak używać ramek iframe do wyświetlania zaawansowanej zawartości poza ograniczeniami AMP.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Podstawy

Możesz wyświetlić ramkę iframe na swojej stronie, używając elementu [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Ramki iframe są szczególnie przydatne w AMP do wyświetlania treści nieobsługiwanych w kontekście strony głównej, takich jak treści wymagające kodu JavaScript użytkownika.

### Wymagania składnika `amp-iframe`

- Musi znajdować się o **600 px** lub **75%** pierwszego okienka na stronie od góry (z wyjątkiem ramek iframe używających elementu [`placeholder`](#using-placeholders)).
- Mogą żądać zasobów jedynie za pośrednictwem protokołu HTTPS i nie mogą mieć tego samego pochodzenia, co kontener, chyba że nie określają one reguły allow-same-origin.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej z [pełnej specyfikacji składnika `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Dodawanie skryptu

Aby dodać składnik [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) do strony, najpierw umieść w sekcji `<head>` następujący skrypt, który ładuje dodatkowy kod składnika rozszerzonego:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Napisz znaczniki

W poniższym przykładzie utworzyliśmy responsywny składnik [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md), aby osadzić mapę Google za pomocą interfejsu [API Google Maps Embed](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Stosowanie elementów zastępczych <a name="using-placeholders"></a>

Składnik [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) można wyświetlać na początku dokumentu, o ile składnik [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) zawiera element z atrybutem `placeholder` (na przykład element [`amp-img`](../../../../documentation/components/reference/amp-img.md)), renderowany jako zastępczy do chwili przygotowania ramki iframe do wyświetlenia.

[tip type="read-on"] **CZYTAJ DALEJ —**: dowiedz się więcej o elementach zastępczych z artykułu [Element iframe z atrybutem placeholder](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Przykład z atrybutem placeholder:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Renderowany jako:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Przykłady

Bardziej zaawansowane przykłady składnika [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) można znaleźć w sekcji [AMP By Example](../../../../documentation/examples/documentation/amp-iframe.html).
