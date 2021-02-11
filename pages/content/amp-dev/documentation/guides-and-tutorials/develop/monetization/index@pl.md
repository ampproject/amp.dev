---
'$title': Monetizing your AMP page with ads
$order: 0
description: Ten przewodnik przedstawia instrukcje i najlepsze praktyki dotyczące wyświetlania reklam na stronach AMP. Tak więc, aby wyświetlać reklamy w AMP, trzeba dodać niestandardowy składnik amp-ad...
formats:
  - websites
---

Ten przewodnik przedstawia instrukcje i najlepsze praktyki dotyczące wyświetlania reklam na stronach AMP.

## Dodawanie reklam do strony

Jeśli chcesz wyświetlić reklamy na stronie bez AMP (w tradycyjnym HTML), dołączasz fragment kodu JavaScript w celu serwowania reklam z Twojej sieci reklamowej. Ze względu na wydajność i bezpieczeństwo, nie można umieszczać kodu JavaScript stron trzecich w stronach AMP. Aby wyświetlać reklamy w AMP, należy więc dodać niestandardowy składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) do strony AMP.

[tip type="tip"] **PORADA —** przykład demonstrujący dodanie znacznika amp-ad do strony AMP znajdziesz w sekcji [AMP By Example](../../../../documentation/components/reference/amp-ad.md). [/tip]

Let's walk through the steps of adding the component so you can display ads on your AMP page.

### Krok 1: dodaj skrypt amp-ad

The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component is a custom ad extension to the AMP library. Under the hood of [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) is custom JavaScript that's carefully designed to optimize performance. To run the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component, you must add the required JavaScript for this component in the `head` section of your AMP page:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

### Krok 2: dodaj znacznik amp-ad do strony AMP

Over 100+ [ad servers and networks](ads_vendors.md) provide built-in integrations with AMP. To add an ad for a given ad network, add the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tag, and specify the network in the `type` attribute.

In this example, we are adding an ad slot to serve ads from the a9 network:

```html
<amp-ad type="a9"> </amp-ad>
```

### Krok 3: określ rozmiar jednostki reklamowej

Dodaj atrybuty `width` i `height` do znacznika [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). W ten sposób określisz rozmiar reklamy na stronie AMP:

```html
<amp-ad type="a9"> width="300" height="250" </amp-ad>
```

### Krok 4: ustaw parametry sieci reklamowej

Każda sieć ma specyficzne atrybuty danych, których wymaga do serwowania reklam. Niezbędne atrybuty należy dodać do składnika [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) zgodnie z dokumentacją sieci reklamowej. W poniższym przykładzie sieć a9 w celu określenia rozmiaru reklamy i innych szczegółów wymaga podania dodatkowych parametrów:

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

### Krok 5: (opcjonalnie) określ element zastępczy

Depending on the ad network, you can choose to show a placeholder until the ad is available for viewing. This provides a better user experience by preventing a blank space. To specify a placeholder, add a child element with the `placeholder` attribute. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Krok 5: (opcjonalnie) określ zasoby rezerwowe

Depending on the ad network, you can choose to show a fallback element if no ad is available to serve. To specify a fallback, add a child element with the `fallback` attribute. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img fallback="" src="fallback-image.jpg"></amp-img
></amp-ad>
```

Congratulations! You are now serving ads on your AMP page!

## Serwowanie sprzedawanych bezpośrednio reklam AMPHTML

Składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) serwuje reklamy z określonej przez Ciebie sieci. Mogą to być standardowe reklamy HTML lub reklamy AMPHTML, o ile sieć reklamowa obsługuje reklamy AMPHTML. Aby serwować reklamy sprzedawane bezpośrednio jako reklamy AMPHTML, należy utworzyć reklamę w AMP HTML, zgodnie z wymaganiami [specyfikacji reklam AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) i użyć [serwera reklam, który obsługuje reklamy AMPHTML](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers).

## Rozszerzenie danych dotyczących targetowania w żądaniach reklam

As part of the Fast Fetch serving mechanism, the Real-Time Config (RTC) feature allows publishers to augment ad requests with first-party and third-party targeting information that's retrieved at runtime. RTC allows up to 5 callouts to targeting servers for each individual ad slot, the results of which are appended to the ad request. To use RTC on your ads, the ad network you use must support RTC and Fast Fetch.

You can learn more about RTC from this YouTube video:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Or, learn more from these RTC resources:

- [AMP RTC — przewodnik implementacji dla wydawców](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [Funkcja AMP Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Najlepsze praktyki

Here are some tips to maximize the effectiveness of ads on your AMP pages:

### Umiejscowienie i sterowanie: zoptymalizuj umiejscowienie reklam

- Aby uzyskać maksymalny przychód na jedną stronę, **umieść na stronach AMP taką samą liczbę reklam**, jak na stronach bez AMP.
- **Umieść pierwsze ogłoszenie bezpośrednio pod pierwszym okienkiem na stronie** („pod treścią”), aby zapewnić optymalne wrażenia użytkownikowi.
- O ile nie stosujesz zaawansowanego kodu CSS lub zapytań o media, upewnij się, że Twoje jednostki reklamowe są wyśrodkowane na stronie, aby zapewnić użytkownikom optymalne wrażenia na mobilnych stronach internetowych.
- Aby zwiększyć presję podczas aukcji reklamowych i zwiększyć przychody z aukcji, włącz [żądania reklam o wielu rozmiarach](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests).

### Popyt i ceny: uzyskaj właściwą cenę za reklamy

- **Sprzedawaj jednostki reklamowe na stronach AMP we wszystkich kanałach sprzedaży**, w tym bezpośrednich i pośrednich, aby zmaksymalizować rywalizację o miejsce na Twoich stronach AMP.
- **Wyceniaj swoje miejsce na reklamę na stronach AMP** podobnie jak miejsce na stronach bez AMP. Monitoruj wyniki i odpowiednio dostosowuj ceny.
- **Zadbaj, by wszystkie kanały popytu na reklamę rywalizowały** o miejsce na reklamę na Twoich stronach AMP, aby podsycać konkurencję.

### Typy reklam: wyświetlaj najlepsze typy reklam

- **Unikaj ciężkich kreacji** zgodnie z [wytycznymi IAB](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Unikaj reklam międzysegmentowych** lub innych formatów reklam, które powodują zmianę układu treści podczas ładowania reklam.
- **Optymalizuj widoczność**, ustawiając strategię ładowania danych tak, aby preferować widoczność, a nie wyświetlenia.
- **Umieszczaj reklamy w swojej treści wideo** za pomocą [obsługiwanych odtwarzaczy](../../../../documentation/components/index.html#media) lub składnika [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md), aby umożliwić osiąganie przychodów ze wszystkich typów treści.
- **Zaimplementuj natywne reklamy**, aby konkurować z reklamami wyświetlanymi za pomocą żądań reklam o wielu rozmiarach, zwiększając presję na popyt, a jednocześnie zapewniając swoim czytelnikom komfort użytkowania na najwyższym poziomie.

### Innowacja: oferuj najbardziej angażujące produkty reklamowe

- **Zaimplementuj reklamy na dodatkowych stronach AMP** w celu generowania dodatkowych dochodów:
  - [Reklamy w karuzeli](../../../../documentation/examples/documentation/Carousel_Ad.html)
  - [Reklamy w lightboksie](../../../../documentation/examples/documentation/Lightbox_Ad.html)
  - ...i [więcej](../../../../documentation/examples/index.html)
- **Implementuj nowe formaty reklam sprzedawanych bezpośrednio<strong>, aby wyposażyć swój zespół sprzedaży w innowacyjne produkty reklamowe o silnym oddziaływaniu:</strong>**
  - [Reklamy sticky ads](../../../../documentation/examples/documentation/amp-sticky-ad.html)
  - [Reklamy flying carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Dodatkowe zasoby

- [Szablony reklam AMPHTML](../../../../documentation/examples/index.html)
- [Demo: pokazuje dodawanie składnika `amp-ad` do strony AMP](../../../../documentation/components/reference/amp-ad.md)
