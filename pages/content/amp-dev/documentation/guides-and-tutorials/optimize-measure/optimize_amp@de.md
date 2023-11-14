---
'$title': Optimiere deine gehosteten AMP Seiten
$order: 7
description: Die AMP Runtime ist auf Geschwindigkeit optimiert. Wenn deine AMP Seiten von einem AMP Cache bereitgestellt werden, sind sie komplett optimiert und bieten die beste Ladeleistung …
formats:
  - websites
  - stories
author: sebastianbenz
---

Dieser Leitfaden bietet Tipps und Anleitungen dafür, wie Webmaster gehostete AMP Websites optimieren können.

### Ist AMP nicht standardmäßig schnell?

Die AMP Runtime ist [auf Geschwindigkeit optimiert](../../../about/how-amp-works.html). Wenn deine AMP Seiten von einem [AMP Cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) bereitgestellt werden, sind sie komplett optimiert und bieten die beste Ladeleistung. Wenn deine Benutzer beispielsweise über die Google Suche auf Mobilgeräten zu deinen AMP Seiten gelangen, werden die Seiten standardmäßig von einem AMP Cache bereitgestellt.

AMP Seiten werden jedoch nicht immer aus einem AMP Cache bereitgestellt. Eine Website kann AMP Seiten von ihren eigenen Servern für andere Datenverkehrsquellen anzeigen. Der häufigste Use Case sind Websites, die komplett in AMP erstellt wurden, z. B. [tasty.co](https://tasty.co). Dabei gelangen Benutzer direkt zu der Website. Eine weitere Datenverkehrsquelle ist Twitter: Dort wurde begonnen, [mit AMP Seiten zu verlinken](https://searchengineland.com/twitter-ramps-amp-278300), anstatt die standardmäßige Mobilversion bereitzustellen. Wenn ein Benutzer in einer mobilen App von Twitter auf einen Link klickt, führt der Link zur AMP Version deiner Seite in deinem eigenen Ursprung (sofern einer verfügbar ist).

Darum kannst du nicht immer sicher sein, dass deine AMP Seiten nur aus einem AMP Cache bereitgestellt werden. Wenn du AMP Seiten von deinen eigenen Servern aus bereitstellst, musst du sicherstellen, dass deine AMP Seiten eine optimale Ladeleistung bieten.

AMP Seiten werden standardmäßig schnell geladen. Es gibt aber einige zusätzliche Leistungsoptimierungen, die du implementieren kannst, damit der Browser AMP Seiten noch schneller lädt. Dieser Leitfaden beschreibt einige Optimierungen, die du beim Veröffentlichen von AMP Seiten berücksichtigen solltest. Bevor du jedoch mit der Lektüre dieses Leitfadens beginnst, stelle sicher, dass du bereits alle [grundlegenden Best Practices für die Webleistung](#basic-optimizations) beachtet hast. Besonders die Bildoptimierung hat einen erheblichen Einfluss auf die Ladeleistung.

Du kannst beispielsweise die folgenden Optimierungstechniken nutzen:

- [Optimiertes Laden der AMP Runtime](#optimize-the-amp-runtime-loading)
- [Vorab geladenes Hero Image](#preload-hero-images) (Bildgröße/Codierung bleiben unverändert)
- [Optimierte benutzerdefinierte Schriftarten](#optimize-custom-fonts) (in diesem Fall Google Schriftarten)

Die [Vorlage "The Scenic"](../../../documentation/templates/index.html) wird [bei einer 3G Verbindung zwei Sekunden schneller](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0) geladen.

Wenn du dich nicht für Details interessierst, schau dir den [AMP Boilerplate Generator](/boilerplate) an, mit dem du benutzerdefinierte optimierte AMP Seiten generieren kannst.

### Optimiere das Laden der AMP Runtime <a name="optimize-the-amp-runtime-loading"></a>

Obwohl AMP bereits ziemlich streng dabei ist, welches Markup im Abschnitt `<head>` zulässig ist, gibt es immer noch Optimierungsmöglichkeiten. Der Schlüssel besteht darin, den Abschnitt `<head>` so zu strukturieren, dass alle Skripte, die das Rendern blockieren, und die benutzerdefinierten Schriftarten möglichst schnell geladen werden.

Für den Abschnitt `<head>` auf einer AMP Seite wird die folgende Struktur empfohlen:

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://ampjs.org/v0.js">
    <link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://ampjs.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://ampjs.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

Das wollen wir uns Schritt für Schritt anschauen:

1. Das erste Tag sollte das `meta charset` Tag sein. Diesem folgen alle übrigen `meta` Tags.

2. Der nächste Schritt besteht im Vorladen des AMP Runtime `v0.js` `<script>` Tags durch `<link as=script href=https://ampjs.org/v0.js rel=preload>`. Die AMP Runtime sollte so schnell wie möglich mit dem Download beginnen, da die [AMP Boilerplate](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) das Dokument über `body { visibility:hidden }` verbirgt, bis die AMP Runtime geladen wurde. Durch das Vorladen der AMP Runtime wird der Browser angewiesen, das Skript mit einer höheren Priorität herunterzuladen. Schau dir [server-side-rendering](#server-side-rendering) an, um zu erfahren, wie sich dies vermeiden lässt. {amp-img6} {/amp-img6}

3. Wenn deine Seite Erweiterungen enthält, die das Rendern verzögern (z. B. amp-experiment, amp-dynamic-css-classes, amp-story), lade diese Erweiterungen vor, da sie von der AMP Runtime zum Rendern der Seite benötigt werden.

[sourcecode:html]

<link as="script" rel="preload" href="https://ampjs.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://ampjs.org/v0/story-1.0.js">[/sourcecode]

1. Verwende [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/), um die Verbindung zu einer anderen Quelle zu beschleunigen, wenn die vollständige URL der Ressource nicht im Voraus bekannt ist, zum Beispiel bei der Verwendung von Google Fonts:

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. Laden Sie die AMP-Laufzeit:

[sourcecode:html]<script async src="https://ampjs.org/v0.js"></script>[/sourcecode]

1. Gib die `<script>` Tags für [Erweiterungen an, die das Rendern verzögern](https://github.com/ampproject/amphtml/blob/main/src/render-delaying-services.js) (z. B. [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) und [`amp-story`](../../../documentation/components/reference/amp-story.md).
2. Gib die `<script>` Tags für übrige Erweiterungen an (z. B. [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). Solche Erweiterungen verzögern nicht das Rendern und sollten deshalb nicht vorab geladen werden, um nicht mit dem ersten Rendern um Bandbreite zu konkurrieren.
3. Gib bei Bedarf eigene Stile mit dem Tag `<style amp-custom>` an.
4. Füge sonstige zulässige Tags im Abschnitt `<head>` hinzu. Insbesondere sollten externe Schriftarten zuletzt angegeben werden, da sie das Rendern blockieren.
5. Gib zum Schluss den [AMP Boilerplate Code](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) an. Indem der Boilerplate Code ganz am Ende hinzugefügt wird, wird verhindert, dass eigene Stile die CSS Regeln der Boilerplate irrtümlicherweise überschreiben.

[tip] Der AMP Cache führt alle diese Optimierungen (und einige anderen) automatisch durch. Mit dem AMP Optimizer Tool kannst du diese Optimierungen automatisch an deinem eigenen Ursprung durchführen. [/tip]

### Hero Image vorladen <a name="preload-hero-images"></a>

[AMP HTML verwendet ein eigenes Bildelement: `amp-img`](../../../documentation/components/reference/amp-img.md). Obwohl [`amp-img`](../../../documentation/components/reference/amp-img.md) viele Vorteile gegenüber dem herkömmlichen `img` HTML Tag hat, besitzt es auch einen Nachteil: Die AMP Runtime muss geladen werden, bevor der Bilddownload gestartet werden kann. Bei einigen Bildern, z. B. Hero Images für eine Produktseite, müssen die Bilder möglichst schnell geladen werden. In solchen Fällen ist es ratsam, das Bild vorab zu laden. Dadurch wird sichergestellt, dass der Browser das Bild so schnell wie möglich herunterlädt und nicht warten muss, bis die AMP Runtime geladen ist.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

Aber was ist, wenn dein reaktionsschnelles Layout je nach Bildschirmbreite unterschiedliche Hero Images erfordert? Zum Beispiel ein breites Bild für den Desktop und ein schmales Bild für Mobilgeräte wie folgt:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

Das Gute ist, dass `link rel=preload` auch Medienabfragen unterstützt. Deshalb können wir in unseren Preloadanweisungen die gleichen Medienabfragen verwenden wie folgt:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

Die gleiche Methode funktioniert übrigens für [`amp-video`](../../../documentation/components/reference/amp-video.md) Posterbilder:

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

Stelle einfach sicher, dass die Preloadanweisungen _nach_ der Viewportdeklaration platziert werden, da der Browser die Viewportabmessungen benötigt, um die Bildschirmbreite zu bestimmen:

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] Lade nur wichtige Bilder vor, da der Bilddownload sonst möglicherweise die für andere wichtige Downloads erforderliche Bandbreite belegt. [/tip]

### Verwende bei Bedarf einen Service Worker

Da [Service Worker von allen gängigen Browsern unterstützt werden](https://caniuse.com/#feat=serviceworkers), solltest du prüfen, ob es sinnvoll ist, deiner Website einen Service Worker hinzuzufügen.

Es gibt zwei verschiedene Architekturmuster, die für eine zuverlässig schnelle Navigation geeignet sind:

- Für einseitige Anwendungen: Das App Shell Modell (im AMP Kontext als [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) bezeichnet). Für dieses Muster muss der Service Worker ein AMP Dokument auf die app-shell-basierte PWA Erfahrung aktualisieren.
- Für mehrseitige Anwendungen: [Streaming von zusammengesetzten Ressourcen](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Ein Service Worker speichert die statische Kopfzeile und Fußzeile zwischen und verwendet Streaming, um beim Laden des Inhalts sofort eine zwischengespeicherte Teilantwort zurückzugeben.

Wenn keines dieser Muster verwendet wird und es nicht möglich ist, die gesamte Website zwischenzuspeichern (was nur für sehr kleine Websites sinnvoll ist), kann sich ein Service Worker [negativ auf die Leistung auswirken](https://developers.google.com/web/updates/2017/02/navigation-preload). In diesem Fall ist es am besten, **keinen** Service Worker einzusetzen.

Wenn du jedoch möchtest, dass deine Website [vom Startbildschirm aus installiert werden kann](https://developers.google.com/web/fundamentals/app-install-banners/) oder eine Offline Erfahrung bieten soll, musst du einen Service Worker verwenden. In diesem Fall ist es wichtig, das [Vorladen der Navigation](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) zu verwenden, um eine mögliche Verlangsamung abzufangen (Hinweis: Das Vorladen der Navigation wird derzeit nur in Chrome unterstützt).

Wenn deine AMP Website einen Service Worker verwendet, findest du hier einige bewährte Methoden:

- Verwende Pre-Cache für die [AMP Runtime](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) und Erweiterungen (z. B. [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Verwende Pre-Cache für Logos, Schriftarten und andere statische Inhalte, die auf den meisten deiner Seiten verwendet werden.
- Stelle Logos, Schriftarten und Bilder mithilfe einer [Cache-First Strategie](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) bereit.
- Stelle die AMP Runtime und Erweiterungen mithilfe einer [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) Strategie bereit.
- Stelle bei Verwendung einer Network-First Strategie für Navigationsanforderungen sicher, dass das [Vorladen der Navigation](https://developers.google.com/web/updates/2017/02/navigation-preload) aktiviert ist.

Wenn du nach einem Service Worker für deine AMP Website suchst, schau dir dieses [Beispiel](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) an: Es bietet einen Service Worker, der alle genannten Best Practices implementiert.

[tip type="note"] Die AMP Runtime wird mit einem maximalen Alter von nur 50 Minuten bereitgestellt, um sicherzustellen, dass Updates schnell verfügbar sind. Um mögliche Fehler im Browsercache zu vermeiden, empfiehlt es sich, die AMP Runtime von einem Service Worker bereitzustellen. [/tip]

Precaching ist nicht nur relevant für den Wechsel von zwischengespeicherten AMP Seiten zu Nicht-AMP Seiten deines eigenen Ursprungs, sondern ebenso für den Wechsel von zwischengespeicherten AMP Seiten zu AMP Seiten deines eigenen Ursprungs. Dafür gibt es folgenden Grund: Der AMP Cache aktualisiert die AMP Runtime URLs aus der stets aktuellen URL auf die zuletzt veröffentlichte Version, zum Beispiel:

`https://ampjs.org/v0.js` -> `https://ampjs.org/rtv/001515617716922/v0.js`.

Als Folge profitiert eine AMP Seite, die von deinem eigenen Ursprung bereitgestellt wird, nicht vom Browsercaching und muss in diesem Fall die (nicht versionierte) AMP Runtime erneut herunterladen. Mit einem Service Worker kannst du die nicht versionierte AMP Runtime vorab zwischenspeichern und den Wechsel beschleunigen. In [diesem Dokument](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime) erfährst du, warum der AMP Cache die AMP Runtime URLs versioniert.

[tip type="note"] In Safari gibt es einen wesentlichen Unterschied bei der Implementierung von Service Workern. In Safari ist es nicht möglich, einen Service Worker für deinen Ursprung zu installieren, wenn die Seite aus einem AMP Cache bereitgestellt wird. [/tip]

### Optimiere benutzerdefinierte Schriftarten <a name="optimize-custom-fonts"></a>

Mit AMP kannst du einige Dinge tun, um das Laden von Schriftarten zu optimieren ([Die meisten Verfahren sind aber nicht AMP spezifisch](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Verwende nach Möglichkeit [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): Dadurch wird die Schriftart nur verwendet, wenn sie sich bereits im Cache befindet, und es wird auf die Systemschriftart zurückgegriffen, wenn deine benutzerdefinierte Schriftart noch nicht geladen wurde.
- Optimiere deine Webschriftarten (stelle beispielsweise benutzerdefinierte Schriftarten mithilfe von WOFF2 bereit).
- Laden Sie benutzerdefinierte Schriftarten vor:

[sourcecode:html]

<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- Falls du Google Fonts oder einen anderen Anbieter von Schriftarten mit unbekannten Font URLs verwendest, stelle mittels "preconnect" eine Verbindung zum entsprechenden Font Server her:

[sourcecode:html]

 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

Und schließlich solltest du versuchen, auf deiner Seite möglichst wenige benutzerdefinierte Schriftarten zu verwenden. Verwende möglichst die Systemschriftarten anstelle von benutzerdefinierten Schriftarten, da deine Website durch Systemschriftarten mit dem Betriebssystem des Benutzers übereinstimmt und keine weiteren Ressourcen geladen werden müssen.

### Serverseitiges Rendern von AMP Layouts <a name="server-side-rendering"></a>

AMP Layouts mit serverseitigem Rendering sind eine Methode, mit der AMP Caches die Ladedauer zusätzlich verkürzen. Beim serverseitigen Rendern kann die AMP Boilerplate entfernt werden. Dadurch lässt sich das AMP Dokument aufbauen, ohne das AMP Runtime JavaScript auszuführen. Beispielsweise wird die serverseitig gerenderte Version des AMP Boilerplate Generators [doppelt so schnell gerendert](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) wie die normale AMP Version!

Wenn du eine AMP Seite veröffentlichst, solltest du unbedingt über die Verwendung von [AMP Optimizer](amp-optimizer-guide/index.md) nachdenken. Mit AMP Optimizer kannst du optimierte AMP Seiten von deinem eigenen Backend aus bereitstellen, einschließlich AMP Layouts mit serverseitigem Rendering. Außerdem führt AMP Optimizer automatisch viele andere Optimierungen durch, die in diesem Dokument beschrieben werden.

### Grundlegende Optimierungen <a name="basic-optimizations"></a>

Alle Grundlagen für die Optimierung der Webleistung gelten natürlich auch für AMP Seiten:

- [Optimiere Bilder](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) und Videos. Die Bildoptimierung kann die Ladeleistung massiv beeinflussen.
- [ Komprimiere und minimiere CSS & HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Da alle CSS auf AMP Seiten inline sind, lohnt es sich, nicht verwendetes CSS mit [purifycss](https://github.com/purifycss/purifycss) zu entfernen.
- Verwende [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... und mehr
