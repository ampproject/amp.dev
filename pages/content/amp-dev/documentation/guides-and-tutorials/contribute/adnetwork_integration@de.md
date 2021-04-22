---
'$title': Integration von AMP zur Bereitstellung von Display Ads
$order: 5
description: Dieser Leitfaden richtet sich an Werbenetzwerke, die AMP integrieren möchten, um Display Ads auf AMP Seiten bereitzustellen.
formats:
  - ads
---

Dieser Leitfaden richtet sich an Werbenetzwerke, die AMP integrieren möchten, um Display Ads auf AMP Seiten bereitzustellen.

## Überblick

Als Ad Server kannst du AMP integrieren, um herkömmliche HTML Ads auf AMP Seiten sowie [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md) Ads bereitzustellen.

##### Möchtest du herkömmliche HTML Ads bereitstellen?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Möchtest du AMPHTML Ads bereitstellen?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (wenn du noch keine Ad erstellt hast, um herkömmliche HTML Ads bereitzustellen).
2. [Erstelle eine Fast Fetch Integration, um AMPHTML Ads bereitzustellen](#creating-a-fast-fetch-integration).

## Eine `amp-ad` <a name="creating-an-amp-ad"></a> erstellen

Publisher, die du als Ad Server unterstützt, betten eine von dir bereitgestellte JavaScript Bibliothek ein und platzieren auf ihren Websites diverse "Ad Snippets", die auf der JavaScript Bibliothek basieren, um Ads abzurufen und zu rendern. Da AMP den Publishern nicht erlaubt, arbiträres JavaScript auszuführen, musst du zum AMP Open Source Code beitragen und dem Tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) erlauben, Ads von deinem Ad Server anzufordern.

[tip type="note"] **HINWEIS:** Mit dieser Implementierung von [`amp-ad`](../../../documentation/components/reference/amp-ad.md) kannst du herkömmliche HTML Ads **und** AMPHTML Ads anzeigen. [/tip]

Der Amazon A9 Server kann beispielsweise mithilfe der folgenden Syntax aufgerufen werden:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Im obigen Code gibt das Attribut `type` das Werbenetzwerk an, in diesem Fall A9. Die Attribute `data-*` hängen von den Parametern ab, die der Amazon A9 Server zum Bereitstellen einer Ad vorsieht. Die Datei [`a9.js`](https://github.com/ampproject/amphtml/blob/main/ads/a9.js) zeigt dir, wie die Parameter dem JavaScript Aufruf an die URL des A9 Servers zugeordnet sind. Die entsprechenden Parameter, die vom Tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) übertragen werden, werden an die URL angehängt, um eine Ad zurückzugeben.

Anweisungen zum Erstellen einer [`amp-ad`](../../../documentation/components/reference/amp-ad.md) Integration findest du unter [Werbenetzwerke in AMP integrieren](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Fast Fetch Integration erstellen <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) ist ein AMP Mechanismus, der die Ad Anforderung von der Ad Antwort trennt. Dadurch können Ad Anforderungen früher im Lebenszyklus einer Seite auftreten, und Ads werden nur gerendert, wenn ihre Anzeige durch den Benutzer wahrscheinlich ist. Fast Fetch bevorzugt verifizierte AMPHTML Ads gegenüber herkömmlichen HTML Ads. Wenn in Fast Fetch eine Ad nicht validiert werden kann, wird diese Ad in ein domänenübergreifendes iframe eingeschlossen, um sie vom restlichen AMP Dokument zu isolieren. Umgekehrt wird eine validierte AMPHTML Ad direkt in die Seite geschrieben. Fast Fetch verarbeitet sowohl AMP Ads als auch nicht-AMP Ads. Für Ads, deren Validierung fehlschlägt, sind aber keine zusätzlichen Ad Anforderungen erforderlich.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Fast Fetch Integrationsfluss' ) }}

Um AMPHTML Ads von deinem Werbeserver aus bereitzustellen, musst du eine Fast Fetch Integration implementieren, die Folgendes umfasst:

1. Unterstützung der SSL Netzwerkkommunikation.
2. Bereitstellung von JavaScript, um die Ad Anforderung zu erstellen (Beispiele für Implementierungen: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) & [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
3. Validieren und Signieren des Creative über einen Validierungsdienst. [Cloudflare](https://blog.cloudflare.com/firebolt/) bietet einen Validierungsdienst für AMP Ads, mit dem jeder unabhängige Ads Anbieter seine Ads schneller, einfacher und ansprechender liefern kann.

Anweisungen zum Erstellen einer Fast Fetch Integration findest du im [Leitfaden zur Netzwerkimplementierung von Fast Fetch](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md).

## Relevante Ressourcen

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Liste der unterstützten Ad Anbieter](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Blogeintrag über die Veröffentlichung von Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
