---
'$title': Responsywne obrazy z atrybutem srcset, rozmiary i wysokości
$order: 4
description: Użyj atrybutu srcset do kontroli zasobów elementu na podstawie różnych wyrażeń medialnych. W szczególności, użyj go do wszystkich znaczników amp-img, aby określić, które...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

Użyj atrybutu `srcset` do kontroli zasobów elementu na podstawie różnych wyrażeń medialnych. W szczególności, użyj go do wszystkich znaczników [`amp-img`](../../../../documentation/components/reference/amp-img.md), aby określić, które zasoby obrazów mają zostać użyte w zależności od rozmiarów ekranu. AMP będzie automatycznie generować atrybut `sizes`, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">spełniający defnicję atrybutu `sizes` języka HTML5</a>, dla wszystkich znaczników `<img>` składnika `<amp-img>`, jeśli składnik `<amp-img>` zawiera atrybut `srcset`, ale nie zawiera atrybutu `sizes`.

W tym prostym przykładzie atrybut `srcset` określa, którego obrazu użyć na podstawie szerokości ekranu. Deskryptor `w` mówi przeglądarce o szerokości każdego obrazu z listy:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
>
</amp-img>
```

[/example]

[tip type="note"] **UWAGA —** AMP obsługuje srcset z deskryptorem `w` we wszystkich przeglądarkach. [/tip]

Dowiedz się więcej o tworzeniu responsywnych obrazów przy użyciu atrybutu `srcset` w artykule [Stosowanie responsywnych obrazów (teraz)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Opcjonalnego atrybutu AMP `sizes` można również użyć z atrybutem `srcset`. Atrybut AMP `size` opisuje jak obliczyć rozmiar elementu na podstawie dowolnego wyrażenia medialnego. <strong data-md-type="raw_html">Zdefiniowanie `sizes` w dowolnym elemencie AMP spowoduje, że AMP ustawi styl inline szerokości tego elementu zgodnie z dopasowanym zapytaniem o media.</strong> Na podstawie obliczonego rozmiaru elementu program użytkownika wybiera najbardziej względne źródło podane przez atrybut `srcset`.

Rozważmy następujący przykład:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw"
>
</amp-img>
```

[/example]

Atrybut `sizes` określa szerokość elementu jako 50% rozmiaru okienka na stronie, gdy okienko ma co najmniej 650px. Na przykład, jeżeli okienko ma 800px, to szerokość elementu jest ustawiana na 400px. Następnie przeglądarka wybiera zasób `srcset` względem 400px, zakładając, że współczynnik pikseli urządzenia wynosi 1, czyli w tym przypadku będzie to plik `hummingbird-narrow.jpg`. (320px).

[tip type="important"] **WAŻNE —** gdy atrybut sizes jest określony z szerokością i wysokością, zostaje ustawiony domyślny układ `responsive`. [/tip]

Przeczytaj więcej o atrybucie [AMP `sizes` tutaj](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights

Wszystkie niestandardowe elementy AMP, które pozwalają na układ `responsive`, obsługują również atrybut `heights`. Wartość tego atrybutu to wyrażenie sizes oparte na wyrażeniach medialnych, podobnie jak atrybut [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), ale z dwoma kluczowymi różnicami:

1. Dotyczy wysokości, a nie szerokości elementu.
2. Dozwolone są wartości procentowe, np. `86%`. Jeśli użyta zostanie wartość procentowa, wskazuje ona procent szerokości elementu.

Gdy atrybut `heights` jest określony wraz z atrybutami `width` i `height`, ustawiana jest domyślna wartość atrybutu `layout`, `responsive`.

Przykład:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

[/example]

W tym przykładzie wysokość elementu będzie domyślnie wynosiła 80% szerokości, ale w przypadku okienka na stronie szerszego niż `500px` zostanie ona ograniczona do `200px`.
