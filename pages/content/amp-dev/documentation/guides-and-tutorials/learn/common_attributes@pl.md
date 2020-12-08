---
"$title": Wspólne atrybuty elementów
"$order": '1'
description: AMP zapewnia zestaw wspólnych atrybutów, rozszerzanych na wiele składników AMP (i elementów HTML). Niniejszy dokument opisuje każdy z tych wspólnych atrybutów.
toc: 'true'
---

AMP zapewnia zestaw wspólnych atrybutów, rozszerzanych na wiele składników AMP (i elementów HTML). Niniejszy dokument opisuje każdy z tych wspólnych atrybutów.

## fallback

Fallback (zasób rezerwowy) to konwencja, która pozwala elementowi na poinformowanie czytelnika o tym, że przeglądarka nie obsługuje danego elementu lub nie udało się załadować podstawowego zasobu. Atrybut `fallback` można umieścić w dowolnym elemencie HTML, który jest bezpośrednim elementem podrzędnym elementu AMP obsługującego zasoby rezerwowe. Dokładny sposób działania w odniesieniu do zasobu rezerwowego zależy od implementacji elementu, ale zazwyczaj element rezerwowy jest wyświetlany zamiast zwykłego elementu.

Często używany z: obrazami, animacjami, audio i wideo

Przykład:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

Więcej informacji zawiera artykuł [Elementy zastępcze i zasoby rezerwowe](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Wszystkie elementy AMP, które obsługują układ ` responsive`, obsługują także atrybut `heights`. Wartość tego atrybutu jest wyrażeniem sizes bazującym na wyrażeniach media, podobnym do [atrybutu sizes w znacznikach `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), ale z dwoma kluczowymi różnicami:

1. Wartość dotyczy wysokości, a nie szerokości elementu.
2. Dozwolone są wartości procentowe. Wartość procentowa wskazuje procent szerokości elementu. Na przykład wartość `80%` znaczy, że element będzie mieć wysokość równą 80% jego szerokości.

Uwaga: gdy atrybut <cod>heights jest określony wraz z atrybutami <code data-md-type="codespan">width</code> i <code data-md-type="codespan">height</code>, domyślnie ustawiany jest <code data-md-type="codespan">layout</code> <code data-md-type="codespan">responsive</code>.</cod>

Przykład:

```html
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
```

Więcej informacji zawiera artykuł [Kierowanie grafiką za pomocą atrybutów srcset, sizes i heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP zapewnia zestaw [układów](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), które określają sposób działania składnika AMP w układzie dokumentu. Można określić układ składnika poprzez dodanie atrybutu `layout` z jedną z obsługiwanych wartości układu danego elementu (obsługiwane wartości przedstawia dokumentacja elementu).

Przykład:

```html
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
```

Więcej informacji zawiera artykuł [Zapytania o układ i media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) oraz [Specyfikacja układu](amp-html-layout/index.md).

## media <a name="media"></a>

Większość elementów AMP obsługuje atrybut `media`. Wartość atrybutu `media` to zapytanie o media. Jeśli zapytanie nie zwraca dopasowania, element nie jest renderowany, a jego zasoby i potencjalnie zasoby podrzędne nie są pobierane. Jeśli okno przeglądarki zmieni rozmiar lub orientację, zapytania o media są ponownie oceniane, a elementy są ukrywane i wyświetlane na podstawie nowych wyników.

Przykład:

```html
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
```

Więcej informacji zawiera artykuł [Zapytania o układ i media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

Atrybut `noloading` wskazuje, czy „wskaźnik ładowania” danego elementu ma być **wyłączony**. Wiele elementów AMP pokazuje „wskaźnik ładowania”, czyli prostą animację pokazującą, że element nie został jeszcze w pełni załadowany.

Często używany z: obrazami, animacjami, wideo i reklamami

Przykład:

```html
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
```

## on

Atrybut `on` służy do instalowania programów obsługi zdarzeń w elementach. Obsługiwane zdarzenia zależą od elementu.

Często używany z: lightboxami, paskami bocznymi, listami generowanymi na żywo i formularzami

Składnia:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Przykład:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
```

Więcej informacji zawiera artykuł [Działania i zdarzenia w AMP](amp-actions-and-events.md).

## placeholder

Atrybut `placeholder` wskazuje, że element oznaczony tym atrybutem działa jako element zastępczy nadrzędnego elementu AMP. Atrybut ten można umieścić w dowolnym elemencie HTML, który jest bezpośrednim elementem podrzędnym elementu AMP obsługującego atrybuty placeholder. Domyślnie elementy zastępcze elementu AMP są wyświetlane natychmiast, nawet jeśli zasoby elementu AMP nie zostały pobrane lub zainicjowane. Gdy element AMP jest już gotowy, zazwyczaj ukrywa elementy zastępcze i pokazuje swoją zawartość. Dokładny sposób działania elementu zastępczego zależy od implementacji elementu. AMP

Często używany z: obrazami, animacjami, wideo i reklamami

Przykład:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

Więcej informacji zawiera artykuł [Elementy zastępcze i zasoby rezerwowe](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

Wszystkie elementy AMP obsługujące układ `responsive` obsługują także atrybut `sizes`. Wartość atrybutu AMP `sizes` jest wyrażeniem sizes, które wybiera zdefiniowany rozmiar odpowiadający zapytaniu o media odpowiednio do bieżącego rozmiaru okna. <strong>Dodatkowo AMP ustawia styl inline atrybutu <code>width</code> w elemencie</strong>.

Przykład:

```html
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
```

Wytworzy następujący zagnieżdżony znacznik <cod>img:</cod>

```html
<img decoding="async"
    src="amp.png"
    sizes="(min-width: 320px) 320px, 100vw"
    class="i-amphtml-fill-content i-amphtml-replaced-content">
```

Więcej informacji zawiera artykuł [Kierowanie grafiką za pomocą atrybutów srcset, sizes i heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width i height

W przypadku niektórych [układów](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) składniki AMP muszą mieć atrybuty `width` i `height`, zawierające wartości wyrażone w całkowitych liczbach pikseli.

Przykład:

```html
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
```

Więcej informacji zawiera artykuł [Zapytania o układ i media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) oraz [Specyfikacja układu](amp-html-layout/index.md).
