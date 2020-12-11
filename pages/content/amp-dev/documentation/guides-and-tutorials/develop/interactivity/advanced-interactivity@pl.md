---
"$title": Zwiększanie interaktywności
"$order": '2'
description: 'Kod startowy zapewnia użytkownikowi raczej niezauważalne wrażenia. Można go ulepszyć na kilka sposobów: - Dodać wskaźnik, który wyświetla ...'
---

Kod startowy zapewnia użytkownikowi raczej niezauważalne wrażenia. Można go ulepszyć na kilka sposobów:

- Dodać wskaźnik, który wyświetla bieżący slajd i całkowitą liczbę slajdów.
- Gdy użytkownik wybierze inny kolor koszuli, zmienić karuzelę z obrazami, aby pokazać zdjęcia koszul w wybranym kolorze.

Przed wprowadzeniem składnika [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) dodanie takich funkcji nie było możliwe. Zdobądźmy praktyczne doświadczenie ze składnikiem [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) i dodajmy te nowe funkcje do naszego przykładowego kodu!

## Instalacja składnika `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) jest składnikiem AMP, który zapewnia niestandardową interaktywność poprzez wiązanie danych i wyrażenia podobne do JS. Aby móc używać składnika [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), musisz zainstalować go na stronie.

Otwórz plik [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) i dodaj następujący skrypt do listy składników AMP w sekcji `<head>` strony:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## Dodanie wskaźnika slajdu

Składnik [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) działa poprzez wiązanie atrybutów elementów z wyrażeniami niestandardowymi. Wyrażenia te mogą odnosić się do „stanu” (modyfikowalnych danych JSON). Możemy zainicjować ten stan za pomocą elementu [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) dodanego ze składnikiem [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Inicjowanie stanu slajdu

Zainicjujmy zmienną stanu, aby śledzić wskaźnik slajdu aktualnie wyświetlanego w karuzeli obrazów. Otwórz plik [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) i na początku sekcji `<body>` strony (przed sekcją `<header>`) dodaj:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Dane zawarte w elementach [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) są dostępne za pomocą powiązanych z nimi identyfikatorów. Możemy na przykład odwoływać się do tej zmiennej przy użyciu następującego fragmentu wyrażenia:

```javascript
selected.slide // Evaluates to 0.
```

### Aktualizowanie stanu slajdu

Następnie zaktualizujmy tę zmienną, gdy użytkownik zmieni slajdy na karuzeli, dodając następujące działanie `"on"` do istniejącego elementu [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md):

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

Teraz, gdy tylko zmieni się wyświetlany slajd składnika [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md), wywołane zostanie działanie `AMP.setState` z następującym argumentem:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

Wyrażenie `event.index` ocenia nowy stan wskaźnika slajdu, a działanie `AMP.setState()` scala literał tego obiektu w bieżący stan. Wskutek tego bieżąca wartość `selected.slide` zastąpiona zostaje wartością `event.index`.

[tip type="tip"] **PORADA —** działanie `AMP.setState()` wykonuje głębokie scalenie literałów zagnieżdżonych obiektów. Więcej szczegółów zawiera dokumentacja składnika [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### Wiązanie elementów wskaźnika

Następnie skorzystajmy z tej zmiennej stanu, która śledzi aktualnie wyświetlany slajd i utwórzmy wskaźnik slajdu. Znajdź element wskaźnika slajdu (szukaj tekstu `<!-- TODO: "Add a slide indicator" -->`) i dodaj następujące wiązania do jego elementów podrzędnych:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` to powiązanie zmieniające atrybut `class` i można go używać w celu dodawania lub usuwania klas CSS z dowolnego elementu.

**Wypróbuj to**: odśwież stronę i zmień slajd!

Zmiana slajdu na karuzeli:

1. Wyzwala zdarzenie `slideChange`...
2. które wywołuje działanie `AMP.setState`...
3. które aktualizuje zmienną stanu `selected.slide`...
4. które aktualizuje powiązanie `[class]` w elementach wskaźnika `<span>`!

Świetnie! Mamy już działający wskaźnik slajdu.

[tip type="success"]

Sprawdź, czy można dodać funkcjonalność sprawiającą, że po dotknięciu kropki wskaźnika slajdu przez użytkownika obraz w karuzeli był aktualizowany odpowiednio do wybranego elementu. Podpowiedź: zastosuj zdarzenie `tap` i wiązanie `[slide]` do składnika [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Zmiana obrazów w karuzeli

Byłoby miło, gdybyśmy mogli zobaczyć obrazy koszul w różnych kolorach, gdy zmienimy wybrany kolor. Używając składnika [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) możemy to zrobić, wiążąc atrybut `[src]` w elementach [`amp-img`](../../../../documentation/components/reference/amp-img.md) w składniku [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Inicjowanie stanu jednostki SKU

Najpierw musimy zainicjować dane stanu za pomocą źródłowych adresów URL obrazów koszul w poszczególnych kolorach. Zróbmy to za pomocą nowego elementu [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state):

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Ten element [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) zawiera obiekt JSON, który mapuje ciąg identyfikatora koszuli (tj. SKU) na kolor i adres URL obrazu odpowiedniej koszuli. Tablica JSON również by tu działała, ale użycie obiektu pozwoli nam robić więcej interesujących rzeczy, które wkrótce zobaczysz.

Teraz możemy uzyskać dostęp do adresu URL obrazu za pomocą identyfikatora koszuli. Na przykład identyfikator `shirts['10014'].color` da w wyniku wartość `"dark green"`, a `shirts['10030'].image `zwróci adres URL obrazu koszuli w kolorze `"wine"`.

### Śledzenie wybranej jednostki SKU

Jeśli dodamy inną zmienną stanu, która śledzi wybraną SKU, możemy powiązać wyrażenie z elementami [`amp-img`](../../../../documentation/components/reference/amp-img.md), aby aktualizować ich atrybuty `src`, gdy zmieni się wybrana SKU. Dodaj nowy klucz `sku` do istniejącego elementu JSON `amp-state#selected`:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Aktualizowanie stanu jednostki SKU

Dodaj działanie "on" do składnika [`amp-selector`](../../../../documentation/components/reference/amp-selector.md), aktualizującego zmienną `selected.sku` za każdym razem, gdy zostanie wybrany nowy kolor:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

[tip type="tip"] **PORADA —** można to również zrobić, dodając działania `on="tap:AMP.setState(...)` do każdego elementu podrzędnego [`amp-img`](../../../../documentation/components/reference/amp-img.md) w składniku [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). Jedną z największych zalet składnika [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) jest to, że upraszcza znaczniki w taki właśnie sposób. [/tip]

### Wiązanie elementów obrazów

Następnie dodaj powiązania do elementów [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

[tip type="note"] **UWAGA —** w praktyce każdy obraz w karuzeli miałby prawdopodobnie inny atrybut `src`. Można to zrobić poprzez zastąpienie pojedynczego obrazu tablicą obrazów. W niniejszym samouczku dla uproszczenia stosowany jest jeden obraz w różnych powiększeniach. [/tip]

**Wypróbuj to**: odśwież stronę i wybierz inny kolor koszuli. Gdy to zrobisz, zdjęcia w karuzeli zostaną zaktualizowane, aby pokazać koszule w wybranym kolorze.
