---
"$title": Monetarisierung deiner AMP Seite mit Ads
"$order": '0'
description: Dieser Leitfaden enthält Anweisungen und Best Practices zum Anzeigen von Ads auf deinen AMP Seiten.  Um Ads in AMP anzuzeigen, musst du zu deiner …
formats:
- websites
---

Dieser Leitfaden enthält Anweisungen und Best Practices zum Anzeigen von Ads auf deinen AMP Seiten.

## Ads zu deiner Seite hinzufügen

Wenn du auf nicht-AMP Seiten (herkömmliches HTML) Ads auf deiner Seite anzeigen möchtest, füge ein JavaScript Snippet hinzu, um Ads aus deinem Werbenetzwerk zu schalten. Aus Gründen der Leistung und Sicherheit kannst du kein JavaScript von Drittanbietern in AMP Seiten aufnehmen. Um Ads in AMP anzuzeigen, musst du die benutzerdefinierte Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) zu deiner AMP Seite hinzufügen.

[tip type="tip"] **TIPP:** Bei [AMP By Example findest du ein Live Demo](../../../../documentation/components/reference/amp-ad.md), welches demonstriert, wie das Tag "amp-ad" zu einer AMP Seite hinzugefügt wird. [/tip]

Sehen wir uns die Schritte zum Hinzufügen der Komponente an, damit du auf deiner AMP Seite Ads anzeigen kannst.

### Schritt 1: Füge das amp-ad Skript hinzu

Die Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) ist eine benutzerdefinierte Anzeigenerweiterung der AMP Bibliothek. Unter der Haube von [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) befindet sich benutzerdefiniertes JavaScript, das sorgfältig entwickelt wurde, um die Leistung zu optimieren. Um die Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) auszuführen, musst du das für diese Komponente erforderliche JavaScript im `head` deiner AMP Seite einbinden:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Schritt 2: Füge das amp-ad Tag zu deiner AMP Seite hinzu

Über 100 [Werbeserver und Werbenetzwerke](ads_vendors.md) bieten AMP kompatible Integrationen. Um eine Ad für ein bestimmtes Werbenetzwerk hinzuzufügen, füge das Tag [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) hinzu und gib im Attribut `type` das Netzwerk an.

In diesem Beispiel fügen wir ein Ad Slot hinzu, um Ads aus dem a9 Netzwerk bereitzustellen:

```html
<amp-ad type="a9">
</amp-ad>
```

### Schritt 3: Gib die Größe des Ad Abschnitts an

Füge die Attribute `width` und `height` zum [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) Tag hinzu. Damit gibst du die Größe der Ad auf deiner AMP Seite an:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Schritt 4: Lege die Parameter des Werbenetzwerks fest

Jedes Netzwerk hat bestimmte Datenattribute, die für die Bereitstellung von Ads erforderlich sind. Konsultiere die [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) Dokumentation des Werbenetzwerks und füge die erforderlichen Attribute hinzu. Im folgenden Beispiel fordert das a9 Netzwerk zusätzliche Parameter, um die Größe der Ad und andere Details anzugeben:

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

Abhängig vom Werbenetzwerk kannst du ein Fallback Element anzeigen, wenn keine Ad bereitgestellt werden kann. Um ein Fallback anzugeben, füge ein untergeordnetes Element mit dem Attribut `fallback` hinzu. Weitere Infos findest du unter [Platzhalter & Fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Gratulation! Jetzt stellst du Ads auf deiner AMP Seite bereit!

## Bereitstellung von direkt verkauften AMPHTML Ads

Die Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) schaltet Ads aus dem von dir angegebenen Netzwerk. Dies können standardmäßige HTML Ads oder AMPHTML Ads sein, sofern das Werbenetzwerk AMPHTML Ads unterstützt. Um deine direkt verkauften Ads als AMPHTML Ads zu schalten, erstelle die Ad in AMP HTML. Berücksichtige dabei die Anforderungen an die [Spezifikationen für AMPHTML Ads](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) und verwende einen [Werbeserver, der AMPHTML Ads schaltet](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers).

## Erweitern der Targeting Daten für Anzeigenanforderungen

Als Teil des Fast Fetch Bereitstellungsmechanismus können Publisher mithilfe der RTC Funktion (Real-Time Config) Ad Anforderungen mithilfe von Targeting Daten von Erstanbietern und Drittanbietern optimieren, die zur Laufzeit abgerufen werden. RTC erlaubt für jedes einzelne Ad Slot bis zu 5 Callouts an Targeting Server, deren Ergebnisse an die Ad Anforderung angehängt werden. Um RTC in deinen Ads zu verwenden, muss das von dir verwendete Werbenetzwerk RTC und Fast Fetch unterstützen.

In diesem YouTube Video erfährst du mehr über RTC:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Oder sieh dir diese RTC Ressourcen an:

- [Implementierungsleitfaden für AMP RTC Publisher](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [AMP Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Best Practices

Nachfolgend findest du einige Tipps, mit denen du die Effektivität von Ads auf deinen AMP Seiten optimieren kannst:

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
- **Optimiere die Sichtbarkeit**, indem du die dem Attribut "data-loading-strategy" den Wert "prefer-viewability-over-views" gibst.
- **Platziere Ads in deinen Videoinhalten** über [unterstützte Player](../../../../documentation/components/index.html#media) oder [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md), um Umsätze für alle Inhaltsarten  zu erzielen.
- **Implementiere native Ads**, um mit Display Ads mit Anzeigenanforderungen in mehreren Größen zu konkurrieren. Dies erhöht den Nachfragedruck und bietet deinen Lesern eine erstklassige Nutzererfahrung.

### Innovation: Biete die attraktivsten Ads Produkte an

- **Implementiere Ads auf zusätzlichen AMP Seiten**, um zusätzlichen Umsatz zu erzielen:
    - [Ads in einem Carousel](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [Ads in einer Lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - … und [mehr](../../../../documentation/examples/index.html)
- **Implementiere neue Formate für direkt verkaufte Ads**, um dein Verkaufsteam mit wirkungsvollen und innovativen Ads Produkten auszustatten:
    - [Sticky Ads](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [Flying Carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Zusätzliche Ressourcen

- [Templates für AMPHTML Ads](../../../../documentation/examples/index.html)
- [Demo: So fügst du `amp-ad` zu deiner AMP Seite hinzu](../../../../documentation/components/reference/amp-ad.md)
