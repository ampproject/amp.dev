---
'$title': Dodawanie karuzel
$order: 3
description: Kolejną wspólną cechą stron mobilnych jest karuzela. Karuzele można z łatwością dodawać do stron AMP za pomocą składnika amp-carousel.
---

Kolejną wspólną cechą stron mobilnych jest karuzela. Karuzele można z łatwością dodawać do stron AMP za pomocą składnika [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Zacznijmy od prostego przykładu, takiego jak karuzela obrazów.

## Prosta karuzela obrazów

Pamiętaj o dodaniu biblioteki składnika [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) poprzez **umieszczenie** następującego żądania JavaScript w sekcji `<head>` dokumentu:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

Następnie osadzimy prostą karuzelę obrazów z układem responsywnym oraz predefiniowaną szerokością i wysokością. **Dodaj** do strony następujący kod:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Odśwież** stronę, aby zobaczyć karuzelę:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

Składnik [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) można skonfigurować na różne sposoby. Zmieńmy UI, aby wyświetlać tylko jeden obraz naraz i ustawmy resposywny układ karuzeli.

W tym celu najpierw **zmień** atrybut `type` składnika [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) z `carousel` na `slides`, **zmień** atrybut `layout` na `responsive` i **ustaw** atrybut `width` na 300 (zdefiniuj zarówno atrybut `height`, jak i `width`). **Dodaj** atrybut `"layout=responsive"` do elementów podrzędnych [`amp-img`](../../../../documentation/components/reference/amp-img.md) elementu [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**Załaduj ponownie** stronę. Teraz, zamiast listy przewijanej elementów, zobaczysz jeden element naraz. Spróbuj **przesuwać** karuzelę w poziomie, aby zmieniać elementy. Gdy przejdziesz do trzeciego elementu, nie będziesz w stanie przesunąć karuzeli dalej.

Następnie **dodaj** atrybut `loop`. **Odśwież** stronę i od razu spróbuj przesunąć karuzelę w lewo. Karuzela będzie działać w nieskończonej pętli.

Na koniec ustawimy automatyczne odtwarzanie karuzeli w tempie co 2 sekundy. **Dodaj** atrybut `autoplay` i atrybut `delay` z wartością `2000` (`delay="2000"`) do elementu [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Końcowy wynik powinien wyglądać tak:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

**Odśwież** stronę i sprawdź jak działa!

[tip type="note"] **UWAGA —** Być noże dostrzegasz, że gdy element [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) miał typ `carousel`, użyliśmy typu układu `fixed-height`. Obsługiwane typy układu dla typu `carousel` są ograniczone; na przykład typ `carousel` nie obsługuje układu `responsive`. Jak sama nazwa wskazuje, elementy o stałej wysokości zajmują dostępne im miejsce, ale nie zmieniają wysokości. W przypadku elementów o stałej wysokości należy zdefiniować atrybut `height`, a atrybut `width` powinien mieć wartość `auto` albo nieustawioną. [/tip]

## Mieszana zawartość karuzeli

Karuzele obrazów są świetne, ale co jeśli chcemy, aby w naszej karuzeli pojawiły się bardziej złożone treści? Spróbujmy trochę pomieszać, umieszczając w jednej karuzeli reklamę, tekst i obraz. Czy składnik [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) naprawdę może obsłużyć taką mieszankę naraz? Oczywiście!

Najpierw **dodajmy** ten styl do elementu `<style amp-custom>`, aby zapewnić bezproblemową współpracę składników [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) i [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md):

```css
amp-fit-text {
  white-space: normal;
}
```

A teraz, **zastąp** swoją prostą karuzelę tym:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**Odśwież** stronę, aby zobaczyć coś w tym rodzaju:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

Aby dowiedzieć się więcej, zapoznaj się z dokumentacją referencyjną składnika [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **UWAGA —** w naszym ostatnim przykładzie składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) zawierał element podrzędny `div` z atrybutem `placeholder`. Wcześniej w samouczku napotkaliśmy podobny scenariusz ze składnikiem [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) używającym atrybutu `fallback`. Czym się różnią placeholder i fallback? Elementy `fallback` są wyświetlane, gdy nie uda się załadować elementu nadrzędnego, np. gdy nie było dostępnej reklamy. Elementy `placeholder` są wyświetlane zamiast elementu nadrzędnego podczas jego ładowania. W pewnym sensie te elementy rozgraniczają proces ładowania elementu nadrzędnego. Więcej informacji zawiera [przewodnik Elementy zastępcze i zasoby rezerwowe](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
