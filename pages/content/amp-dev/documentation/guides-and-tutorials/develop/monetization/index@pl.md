---
"$title": Monetizing your AMP page with ads
"$order": '0'
description: Ten przewodnik przedstawia instrukcje i najlepsze praktyki dotyczące wyświetlania reklam na stronach AMP. Tak więc, aby wyświetlać reklamy w AMP, trzeba dodać niestandardowy składnik amp-ad...
formats:
- websites
---

Ten przewodnik przedstawia instrukcje i najlepsze praktyki dotyczące wyświetlania reklam na stronach AMP.

## Dodawanie reklam do strony

Jeśli chcesz wyświetlić reklamy na stronie bez AMP (w tradycyjnym HTML), dołączasz fragment kodu JavaScript w celu serwowania reklam z Twojej sieci reklamowej.  Ze względu na wydajność i bezpieczeństwo, nie można umieszczać kodu JavaScript stron trzecich w stronach AMP. Aby wyświetlać reklamy w AMP, należy więc dodać niestandardowy składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) do strony AMP.

[tip type="tip"] **PORADA —** przykład demonstrujący dodanie znacznika amp-ad do strony AMP znajdziesz w sekcji [AMP By Example](../../../../documentation/components/reference/amp-ad.md). [/tip]

Let's walk through the steps of adding the component so you can display ads on your AMP page.

### Krok 1: dodaj skrypt amp-ad

The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component is a custom ad extension to the AMP library. Under the hood of [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) is custom JavaScript that's carefully designed to optimize performance. To run the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component, you must add the required JavaScript for this component in the `head` section of your AMP page:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Krok 2: dodaj znacznik amp-ad do strony AMP

Over 100+ [ad servers and networks](ads_vendors.md) provide built-in integrations with AMP.  To add an ad for a given ad network, add the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tag, and specify the network in the `type` attribute.

In this example, we are adding an ad slot to serve ads from the a9 network:

```html
<amp-ad type="a9">
</amp-ad>
```

### Krok 3: określ rozmiar jednostki reklamowej

Dodaj atrybuty `width` i `height` do znacznika [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). W ten sposób określisz rozmiar reklamy na stronie AMP:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Krok 4: ustaw parametry sieci reklamowej

Każda sieć ma specyficzne atrybuty danych, których wymaga do serwowania reklam. Niezbędne atrybuty należy dodać do składnika [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) zgodnie z dokumentacją sieci reklamowej. W poniższym przykładzie sieć a9 w celu określenia rozmiaru reklamy i innych szczegółów wymaga podania dodatkowych parametrów:

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### Krok 5: (opcjonalnie) określ element zastępczy

Depending on the ad network, you can choose to show a placeholder until the ad is available for viewing. This provides a better user experience by preventing a blank space.  To specify a placeholder, add a child element with the `placeholder` attribute. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Krok 5: (opcjonalnie) określ zasoby rezerwowe

Depending on the ad network, you can choose to show a fallback element if no ad is available to serve. To specify a fallback, add a child element with the `fallback` attribute. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Congratulations! You are now serving ads on your AMP page!

## Serwowanie sprzedawanych bezpośrednio reklam AMPHTML

The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component serves ads from the network you specify.  Those ads can be standard HTML ads or AMPHTML ads, provided that the ad network supports AMPHTML ads. To serve your direct-sold ads as AMPHTML ads, create the ad in AMP HTML according to the [AMPHTML ad spec](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) requirements and use an [ad server that serves AMPHTML ads](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers).

## Augmenting targeting data on ad requests

As part of the Fast Fetch serving mechanism, the Real-Time Config (RTC) feature allows publishers to augment ad requests with first-party and third-party targeting information that's retrieved at runtime. RTC allows up to 5 callouts to targeting servers for each individual ad slot, the results of which are appended to the ad request.  To use RTC on your ads, the ad network you use must support RTC and Fast Fetch.

You can learn more about RTC from this YouTube video:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Or, learn more from these RTC resources:

- [AMP RTC publisher implementation guide](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [AMP Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Best practices

Here are some tips to maximize the effectiveness of ads on your AMP pages:

### Placement & controls: optimize your ad placements

- **Place the same number of ads** on AMP Pages as your non-AMP pages to generate maximum revenue per page.
- **Place the first ad immediately below the first viewport** ("below the fold") to provide an optimal user experience.
- Unless you're using advanced CSS or media queries, **ensure your ad units are centered on the page** to provide your users with an optimal mobile web experience.
- Enable [multi-size ad requests](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests) on your AMP inventory to increase ad auction pressure and drive revenue.

### Demand & pricing: get the right price for your ads

- **Sell ad units on your AMP pages across all sales channels**, including direct and indirect to maximize competition for your inventory on AMP pages.
- **Price your ad inventory on AMP pages** similar to your inventory on non-AMP pages. Monitor performance and adjust pricing accordingly.
- **Ensure all ad demand channels are competing** for ad inventory on your AMP pages to drive up competition.

### Ad types: Serve the best types of ads

- **Avoid heavy creatives** per [IAB guidelines](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Avoid interstitials** or other ad formats that cause the content to reflow on ad load.
- **Optimize for viewability** by setting the data-loading-strategy to prefer-viewability-over-views.
- **Place ads in your video content** via [supported players](../../../../documentation/components/index.html#media) or [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) to enable revenue on all types of content.
- **Implement native ads** to compete with display ads using multi-sized ad requests, adding demand pressure while providing your readers with a premium user experience.

### Innowacja: oferuj najbardziej angażujące produkty reklamowe

- **Implement ads on ancillary AMP pages** to generate incremental revenue:
    - [Reklamy w karuzeli](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [Reklamy w lightboksie](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - ...i [więcej](../../../../documentation/examples/index.html)
- **Implement new formats for direct sold ads** to equip your sales team with high-impact, innovative ad products:
    - [Sticky Ads](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [Flying Carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Dodatkowe zasoby

- [AMPHTML ad templates](../../../../documentation/examples/index.html)
- [Demo: Shows how to add `amp-ad` to your AMP page](../../../../documentation/components/reference/amp-ad.md)
