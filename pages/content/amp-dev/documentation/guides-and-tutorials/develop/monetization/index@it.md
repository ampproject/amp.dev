---
"$title": Monetizing your AMP page with ads
"$order": '0'
description: Questa guida fornisce istruzioni e procedure consigliate per la visualizzazione di annunci nelle pagine AMP. Quindi, per visualizzare annunci in AMP, occorre aggiungere il componente personalizzato amp-ad ...
formats:
- websites
---

This guide provides instructions and best practices for displaying ads on your AMP pages.

## Adding ads to your page

In non-AMP pages (traditional HTML), if you want to display ads on your page, you'd include a snippet of JavaScript to serve ads from your ad network.  For performance and security reasons, you cannot include third-party JavaScript in AMP pages.  So, to display ads in AMP, you need to add the custom [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component to your AMP page.

[tip type="tip"] **TIP –** See [AMP By Example for a live demo](../../../../documentation/components/reference/amp-ad.md) that demonstrates adding an amp-ad tag to an AMP page. [/tip]

Let's walk through the steps of adding the component so you can display ads on your AMP page.

### Step 1: Add the amp-ad script

The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component is a custom ad extension to the AMP library. Under the hood of [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) is custom JavaScript that's carefully designed to optimize performance. To run the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component, you must add the required JavaScript for this component in the `head` section of your AMP page:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Step 2: Add the amp-ad tag to your AMP page

Over 100+ [ad servers and networks](ads_vendors.md) provide built-in integrations with AMP.  To add an ad for a given ad network, add the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tag, and specify the network in the `type` attribute.

In this example, we are adding an ad slot to serve ads from the a9 network:

```html
<amp-ad type="a9">
</amp-ad>
```

### Step 3: Specify the size of the ad unit

Aggiungere gli attributi `width` e `height` al tag [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Specificare la dimensione dell'annuncio sulla pagina AMP:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Step 4: Set ad network parameters

Ogni rete dispone di specifici attributi di dati richiesti per fornire annunci. Consultare la documentazione per il componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) della rete di annunci e aggiungere gli attributi <br>richiesti. Nel seguente esempio, la rete a9 richiede parametri aggiuntivi per indicare la dimensione dell'annuncio e altri dettagli:

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### Step 5: (Optional) Specify a placeholder

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

### Step 6: (Optional) Specify a fallback

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

## Serving direct-sold AMPHTML ads

Il componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) permette di fornire annunci dalla rete specificata. Questi annunci possono essere HTML standard o AMPHTML, a condizione che la rete pubblicitaria supporti gli annunci AMPHTML. Per offrire i propri annunci a vendita diretta sotto forma di annunci AMPHTML, occorre creare l'annuncio secondo i requisiti delle [specifiche degli annunci AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) e utilizzare un [server in grado di pubblicare annunci AMPHTML](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers).

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
- **Implementare annunci nativi** per competere con gli annunci su display, utilizzando richieste di annunci a più dimensioni, aumentando le richieste e fornendo ai lettori un'esperienza di utilizzo di qualità premium.

### Innovation: Offer the most engaging ad products

- **Implement ads on ancillary AMP pages** to generate incremental revenue:
    - [Ads in a carousel](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [Ads in a lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - ... and [more](../../../../documentation/examples/index.html)
- **Implement new formats for direct sold ads** to equip your sales team with high-impact, innovative ad products:
    - [Sticky Ads](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [Flying Carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Additional resources

- [AMPHTML ad templates](../../../../documentation/examples/index.html)
- [Demo: Shows how to add `amp-ad` to your AMP page](../../../../documentation/components/reference/amp-ad.md)
