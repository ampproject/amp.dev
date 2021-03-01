---
'$title': Praca z danymi zdalnymi
$order: 3
description: Co zrobić, jeśli dane, które można powiązać, są zbyt duże lub złożone, aby pobrać je podczas ładowania strony? Albo co zrobić, jeśli każda jednostka SKU ma cenę, która wymaga...
toc: 'true'
---

Co zrobić, jeśli dane, które można powiązać, są zbyt duże lub złożone, aby pobrać je podczas ładowania strony? Albo co zrobić, jeśli każda jednostka SKU ma cenę, która wymaga długiego czasu do wyszukania? Wyszukiwanie cen SKU niewyświetlanych pozycji to strata pracy.

[tip type="success"]

Element [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) obsługuje pobieranie danych zdalnych poprzez swój atrybut [`src`](../../../../documentation/components/reference/amp-bind.md#attributes), który pobiera JSON z punktu końcowego CORS. To pobieranie jest wykonywane raz podczas ładowania strony i jest przydatne do zapewnienia aktualności danych (zwłaszcza gdy są one serwowane z pamięci podręcznej).

Możesz również powiązać atrybut `src` z elementem [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). To znaczy, że działanie użytkownika może uruchomić pobranie danych zdalnych JSON do możliwego do powiązania stanu strony.

[/tip]

## Pobieranie dostępnych rozmiarów koszul

Skorzystajmy z możliwości pobierania danych zdalnych, aby sprawdzić ceny jednostek SKU w naszym przykładzie. Nasz serwer programistyczny Express.js w `app.js` ma już punkt końcowy `/shirts/sizesAndPrices?shirt=<sku>`, który po podaniu SKU koszuli zwraca dostępne rozmiary i cenę poszczególnych rozmiarów. Wysyła on odpowiedź ze sztucznym opóźnieniem wynoszącym jedną sekundę, aby symulować latencję sieci.

| Żądanie                               | Odpowiedź                                    |
| ------------------------------------- | -------------------------------------------- |
| `GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}` |

Podobnie jak dane JSON w elementach [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), dane zdalne zwracane z tych pobrań są scalane i dostępne pod atrybutem elementu `id`. Na przykład dostęp do danych zwróconych w powyższej przykładowej odpowiedzi można uzyskać w wyrażeniu:

| Wyrażenie                    | Wynik  |
| ---------------------------- | ------ |
| `shirts['1001'].sizes['XS']` | `8.99` |

### Wiązanie danych

Teraz zastosujmy to do naszego przykładu e-commerce. Najpierw pobierzmy te dane koszul, gdy zostanie wybrana nowa jednostka SKU. Dodajmy powiązanie atrybutu `[src]` do naszego elementu `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state
  id="shirts"
  [src]="'/shirts/sizesAndPrices?sku=' + selected.sku"
></amp-state>
```

### Wskazywanie niedostępnych rozmiarów

Następnie wyraźnie oznaczmy niedostępne rozmiary danej SKU. Klasa CSS `"unavailable"` dodaje przekątną linię przekreślającą element — możemy dodać ją do elementów w składniku [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) odpowiadających niedostępnym rozmiarom:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Teraz załaduj ponownie stronę i wypróbuj jej działanie. Wybranie nowej SKU (koloru koszuli) spowoduje przekreślenie niedostępnych rozmiarów (po krótkiej zwłoce).

### Określenie stanów początkowych

Jest jednak mały problem — co z czarną koszulą, kolorem wybranym domyślnie? Będziemy musieli dodać rozmiar i cenę czarnej koszuli do elementu `amp-state#shirts`, ponieważ składnik [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) działa tylko w odpowiedzi na jawne działanie użytkownika:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Musimy też zaktualizować stan domyślny odpowiednich elementów:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'"
      >
        <div option="M">M</div>
      </td>
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'"
      >
        <div option="L">L</div>
      </td>
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'"
      >
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] **UWAGA —** składnik [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) nie jest uruchamiany podczas ładowania strony, a tylko w odpowiedzi na jawne działanie użytkownika. Dzięki temu początkowe ładowanie strony jest zawsze szybkie na wszystkich stronach, bez względu na zastosowanie składnika [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## Zmienne ceny koszul

Teraz, gdy poprawnie wyświetlamy dostępne rozmiary, upewnijmy się, że wyświetlana jest również właściwa cena.

Nasz sklep AMPPAREL wyróżnia się tym, że cena koszuli zależy zarówno od koloru, jak i rozmiaru. To znaczy, że potrzebujemy nowej zmiennej, która pozwoli nam śledzić wybrany przez użytkownika rozmiar. Dodajmy nowe działanie do naszego elementu rozmiaru [`amp-selector`](../../../../documentation/components/reference/amp-selector.md):

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector
  name="size"
  on="select:AMP.setState({selectedSize: event.targetOption})"
></amp-selector>
```

Zauważ, że nie inicjujemy wartości `selectedSize` poprzez element `amp-state#selected`. Dzieje się tak, ponieważ celowo nie podajemy domyślnego wybranego rozmiaru, a zamiast tego chcemy nakłonić użytkownika do wybrania rozmiaru.

[tip type="tip"] **PORADA —** funkcji `AMP.setState()` można użyć do definiowania nowych zmiennych, a nie tylko modyfikacji istniejących. W przypadku niezdefiniowanych zmiennych wyrażenia dadzą wynik `null`. [/tip]

Dodaj nowy element `<span>` otaczający etykietę ceny i zmień domyślny tekst na "---", ponieważ nie ma domyślnego wyboru rozmiaru.

```html
<h6>
  PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Mamy prawidłowe ceny! Wypróbuj to.

## Przycisk włączany warunkowo

Prawie skończyliśmy! Wyłączmy przycisk „Add to cart”, gdy wybrany rozmiar jest niedostępny:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input
  type="submit"
  value="ADD TO CART"
  disabled
  class="mdl-button mdl-button--raised mdl-button--accent"
  [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]"
/>
```

**Wypróbuj to**: jeśli wybierzesz niedostępny rozmiar, nie można będzie dodać go do koszyka.
