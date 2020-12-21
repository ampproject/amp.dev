---
"$title": Monetizing your AMP page with ads
"$order": '0'
description: This guide provides instructions and best practices for displaying ads on your AMP pages. So, to display ads in AMP, you need to add the custom amp-ad component...
formats:
- websites
---

Dieser Leitfaden enthält Anweisungen und Best Practices zum Anzeigen von Ads auf deinen AMP Seiten.

## Ads zu deiner Seite hinzufügen

Wenn du auf nicht-AMP Seiten (herkömmliches HTML) Ads auf deiner Seite anzeigen möchtest, füge ein JavaScript Snippet hinzu, um Ads aus deinem Werbenetzwerk zu schalten. Aus Gründen der Leistung und Sicherheit kannst du kein JavaScript von Drittanbietern in AMP Seiten aufnehmen. Um Ads in AMP anzuzeigen, musst du die benutzerdefinierte Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) zu deiner AMP Seite hinzufügen.

[tip type="tip"] **TIP –** See [AMP By Example for a live demo](../../../../documentation/components/reference/amp-ad.md) that demonstrates adding an amp-ad tag to an AMP page. [/tip]

Let's walk through the steps of adding the component so you can display ads on your AMP page.

### Schritt 1: Füge das amp-ad Skript hinzu

The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component is a custom ad extension to the AMP library. Under the hood of [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) is custom JavaScript that's carefully designed to optimize performance. To run the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component, you must add the required JavaScript for this component in the `head` section of your AMP page:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Schritt 2: Füge das amp-ad Tag zu deiner AMP Seite hinzu

Over 100+ [ad servers and networks](ads_vendors.md) provide built-in integrations with AMP.  To add an ad for a given ad network, add the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tag, and specify the network in the `type` attribute.

In this example, we are adding an ad slot to serve ads from the a9 network:

```html
<amp-ad type="a9">
</amp-ad>
```

### Schritt 3: Gib die Größe des Ad Abschnitts an

Add the `width` and `height` attributes to the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)  tag.  This specifies the size of the ad on your AMP page:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Schritt 4: Lege die Parameter des Werbenetzwerks fest

Each network has specific data attributes they require to serve ads.  Refer to the ad network's [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) documentation and add the attributes that are needed In the following example,  the a9 network requires additional parameters to specify the size of the ad, and other details:

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### Schritt 5: (Optional) Gib einen Platzhalter an

Abhängig vom Werbenetzwerk kannst du einen Platzhalter anzeigen, bis die Ad angezeigt werden kann. Dies verbessert die Benutzererfahrung, da Leerräume vermieden werden. Um einen Platzhalter anzugeben, füge ein untergeordnetes Element mit dem Attribut `placeholder` hinzu. Weitere Infos findest du unter [Platzhalter & Fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Schritt 6: (Optional) Gib ein Fallback an

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

## Bereitstellung von direkt verkauften AMPHTML Ads

Die Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) schaltet Ads aus dem von dir angegebenen Netzwerk. Dies können standardmäßige HTML Ads oder AMPHTML Ads sein, sofern das Werbenetzwerk AMPHTML Ads unterstützt. Um deine direkt verkauften Ads als AMPHTML Ads zu schalten, erstelle die Ad in AMP HTML. Berücksichtige dabei die Anforderungen an die [Spezifikationen für AMPHTML Ads](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) und verwende einen [Werbeserver, der AMPHTML Ads schaltet](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers).

## Erweitern der Targeting Daten für Anzeigenanforderungen

As part of the Fast Fetch serving mechanism, the Real-Time Config (RTC) feature allows publishers to augment ad requests with first-party and third-party targeting information that's retrieved at runtime. RTC allows up to 5 callouts to targeting servers for each individual ad slot, the results of which are appended to the ad request.  To use RTC on your ads, the ad network you use must support RTC and Fast Fetch.

You can learn more about RTC from this YouTube video:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Or, learn more from these RTC resources:

- [AMP RTC publisher implementation guide](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [AMP Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Best Practices

Here are some tips to maximize the effectiveness of ads on your AMP pages:

### Platzierung & Kontrolle: Optimiere die Platzierungen deiner Ads

- **Platziere auf AMP Seiten dieselbe Anzahl von Ads**, wie auf deinen nicht-AMP Seiten, um maximale Umsatz pro Seite zu erzielen.
- **Platziere die erste Ad direkt unter dem ersten Viewport** (unter dem angezeigten Bereich), um eine optimale Benutzererfahrung zu erzielen.
- **Stelle sicher, dass deine Ad Blöcke auf der Seite zentriert sind**, um deinen Benutzern ein optimales mobiles Web Erlebnis zu bieten, es sei denn, du verwendest erweitertes CSS oder Medienabfragen.
- Aktiviere in deinem AMP Inventar [Anzeigenanforderungen in mehreren Größen](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests), um den Auktionsdruck der Ads zu erhöhen und den Umsatz zu steigern.

### Nachfrage & Preisgestaltung: Erziele den richtigen Preis für deine Ads

- **Verkaufe Ad Blöcke auf deinen AMP Seiten über alle Vertriebskanäle hinweg**, auch direkt und indirekt, um den Wettbewerb für dein Inventar auf AMP Seiten zu maximieren.
- **Bewerte dein Ad Inventar auf AMP Seiten** ähnlich wie dein Inventar auf nicht-AMP Seiten. Überwache die Leistung und passe die Preise entsprechend an.
- **Stelle sicher, dass alle Nachfragekanäle für Ads auf deinen AMP Seiten um das Ad Inventar konkurrieren**, um den Wettbewerb zu fördern.

### Arten von Ads: Schalte die besten Arten von Ads

- **Vermeide schwere Creatives** gemäß den [IAB Leitfäden](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Vermeide Interstitials** oder andere Anzeigenformate, die dazu beim Laden der Ad zum Reflow von Inhalten führen.
- **Optimize for viewability** by setting the data-loading-strategy to prefer-viewability-over-views.
- **Platziere Ads in deinen Videoinhalten** über [unterstützte Player](../../../../documentation/components/index.html#media) oder [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md), um Umsätze für alle Inhaltsarten  zu erzielen.
- **Implementiere native Ads**, um mit Display Ads mit Anzeigenanforderungen in mehreren Größen zu konkurrieren. Dies erhöht den Nachfragedruck und bietet deinen Lesern eine erstklassige Nutzererfahrung.

### Innovation: Biete die attraktivsten Ads Produkte an

- **Implementiere Ads auf zusätzlichen AMP Seiten**, um zusätzlichen Umsatz zu erzielen:
    - [Ads in a carousel](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [Ads in a lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - … und [mehr](../../../../documentation/examples/index.html)
- **Implementiere neue Formate für direkt verkaufte Ads**, um dein Verkaufsteam mit wirkungsvollen und innovativen Ads Produkten auszustatten:
    - [Sticky Ads](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [Flying Carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Zusätzliche Ressourcen

- [AMPHTML ad templates](../../../../documentation/examples/index.html)
- [Demo: Shows how to add `amp-ad` to your AMP page](../../../../documentation/components/reference/amp-ad.md)
