---
"$title": Integriere deine Ad Technologien in AMP
order: '3'
formats:
- ads
teaser:
  text: Bist du ein Anbieter von Ad Technologien und möchtest AMP HTML integrieren? Dann beachte bitte die folgenden Richtlinien.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Bist du Anbieter von Ad Technologien und möchtest AMP HTML integrieren? Dann beachte bitte die folgenden Richtlinien. Um eine minimale Latenz und eine angemessene Qualität zu gewährleisten, befolge bitte die [hier](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads) beschriebene Anleitung, bevor du einen Pull Request im AMP Open Source Projekt erstellst. Allgemeine Hinweise für Interessenten, die zu AMP beitragen möchten, findest du in [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md).

## Ad Server <a name="ad-server"></a>

*Beispiele: DFP, A9*

Betreibst du einen Ad Server, so binden die von dir unterstützten Publisher eine von dir bereitgestellte JavaScript Bibliothek ein und platzieren auf ihren Websites verschiedene "Ad Snippets", die auf der JavaScript Bibliothek basieren und mit denen Ads abgerufen und gerendert werden.

Da AMP es Publishern nicht erlaubt, beliebiges eigenes JavaScript auszuführen, musst du einen Beitrag zum AMP Open Source Code leisten und dem Tag `amp-ad` erlauben, Ads von deinem Ad Server anzufordern.

Zum Beispiel: Der Amazon A9 Server kann mithilfe der folgenden Syntax aufgerufen werden:

[sourcecode:html]
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
[/sourcecode]

Beachte, dass jedes der Attribute nach `type` von den Parametern abhängig ist, die der Amazon A9 Server erwartet, um eine Ad zu übermitteln. Die Datei [a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) zeigt, wie die Parameter dem JavaScript Aufruf zugeordnet sind, der den A9 Server über die URL `https://c.amazon-adsystem.com/aax2/assoc.js` aufruft. Die entsprechenden Parameter, die vom AMP Ad Tag übergeben werden, werden an die URL angehängt, um eine Ad zurückzugeben.

Ausführliche Informationen zur Integration deines Ad Netzwerks in AMP findest du unter [Integration von Ad Netzwerken in AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Supply Side Platform (SSP) oder Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

*Beispiele: Rubicon, Criteo OR Appnexus, Ad-Exchange*

Wenn du eine Sell Side Plattform betreibst, die direkt von der Webseite eines Publishers aufgerufen werden soll, musst du für die Integration mit einem Ad Server die oben aufgeführte Anleitung befolgen. Wenn du eigene Werte des Attributs `type` im Tag amp-ad hinzufügst, kannst du dein Tag direkt an die Publisher weitergeben, die deine Tags dann direkt in ihre AMP Seiten einfügen können.

In der Regel arbeiten SSPs mit dem Publisher zusammen, um die Ad Tags der SSP an ihren Ad Server zu übertragen. Stelle in einem solchen Fall sicher, dass alle Assets, die von deinem Skript im Creative des Ad Servers geladen werden, über HTTPS erstellt werden. Einige Ad Formate wie erweiterbare Ads unterliegen bestimmten Einschränkungen. Wir empfehlen daher, dass du die am häufigsten bereitgestellten Creative Formate mit deinen Publishern testest.

## Werbeagentur <a name="ad-agency"></a>

*Beispiele: Essence, Omnicom*

Arbeite mit deinem Publisher zusammen, um sicherzustellen, dass die von dir entwickelten Creatives mit AMP kompatibel sind. Da alle Creatives in iframes bereitgestellt werden, deren Größe beim Aufruf der Ad festgelegt wird, musst du sicherstellen, dass dein Creative nicht versucht, die Größe des iframes zu ändern.

Stelle sicher, dass alle Assets, die Teil des Creatives sind, über HTTPS angefordert werden. Einige Ad Formate werden derzeit nicht vollständig unterstützt. Wir empfehlen, die Creatives in einer AMP Umgebung zu testen. Einige Beispiele sind: Rich Media Expandables, Interstitials, Ads auf Seitenebene.

## Videoplayer <a name="video-player"></a>

*Beispiele: Brightcove, Ooyala*

Ein Videoplayer, der auf gewöhnlichen HTML Seiten funktioniert, funktioniert in AMP nicht. Deshalb muss ein bestimmtes Tag erstellt werden, mit dem die AMP Runtime deinen Player laden kann. Brightcove hat das benutzerdefinierte Tag [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md) erstellt, mit dem Medien und Ads auf AMP Seiten abgespielt werden können.

Ein Brightcove Player kann wie folgt aufgerufen werden:

[sourcecode:html]
<amp-brightcove
  data-account="1290862519001"
  data-video-id="ref:amp-docs-sample"
  data-player="S1Tt8cgaM"
  layout="responsive"
  width="480"
  height="270"
>
</amp-brightcove>
[/sourcecode]

Eine Anleitung zum Entwickeln eines AMP Tags wie Brightcove findest du in [diesem Pull Request](https://github.com/ampproject/amphtml/pull/1052) .

## Video Ad Netzwerk <a name="video-ad-network"></a>

*Beispiele: Tremor, Brightroll*

Wenn du ein Video Ad Netzwerk betreibst, arbeite mit deinem Publisher zusammen, um Folgendes sicherzustellen:

- Alle Video Assets werden über HTTPS bereitgestellt.
- Der Video Player des Publishers unterstützt AMP.

## Data Management Platform (DMP) <a name="data-management-platform-dmp"></a>

*Beispiele: KRUX, Bluekai*

Finde heraus, [wie du die benutzerdefinierte Konfiguration von Ads verbessern kannst](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration) .

Mit einer ähnlichen Herangehensweise kannst du den Aufruf von Ads aufwerten, indem du Zielgruppensegmente, die vom Benutzercookie eingehen, an den Ad Aufruf übergibst.

## Anbieter für die Sichtbarkeitsmessung <a name="viewability-provider"></a>

*Beispiele: MOAT, Integral Ad Science*

Die Integration von Anbietern für die Sichtbarkeitsmessung mit Publishern erfolgt in der Regel über die Creative Wrapper des Ad Servers. Stelle in diesem Fall sicher, dass der Creative Wrapper alle Assets über HTTPS lädt.

So musst du z. B. für MOAT sicherstellen, dass `http://js.moatads.com` in `https://z.moatads.com` umgewandelt wird.

Sieh dir auch den Ansatz an, bei dem das [Intersection Observer Muster](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability) verwendet wird.

## Plattform für Empfehlung von Content <a name="content-recommendation-platform"></a>

*Beispiele: Taboola, Outbrain*

Nützlich, wenn du bereits JavaScript Code auf der Website des Publishers eingebettet hast, aber auf AMP Seiten funktioniert dieser Ansatz nicht. Wenn du Inhalte auf einer AMP Seite empfehlen möchtest, solltest du die [Erweiterung `amp-embed`](https://amp.dev/documentation/components/amp-ad) verwenden, um die Details des Contents anzufordern. Bitte sieh dir das [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md) Beispiel an.
