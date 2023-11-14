---
'$title': Lade dein PWA aus deinen AMP Seiten vor
$order: 1
description: Eine gute Strategie besteht darin, eine AMP Seite als Einstiegspunkt für deine Website zu erstellen, dann die PWA hinter den Kulissen …
formats:
  - websites
author: pbakaus
---

Eine gute Strategie besteht darin, **eine AMP Seite als Einstiegspunkt für deine Website** zu erstellen, dann **die PWA hinter den Kulissen zu starten** und für die weitere Navigation der Benutzer durch die Website zur PWA zu wechseln:

- Alle Blattseiten ("Leaf Pages") mit Inhalten (solche mit spezifischem Inhalt, keine Übersichtsseiten) werden als AMPs veröffentlicht, um ein nahezu sofortiges Laden zu ermöglichen.
- Diese AMPs verwenden das spezielle AMP Element [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), um einen Cache und die PWA Shell vorzuwärmen, während der Benutzer sich mit deinen Inhalten beschäftigt.
- Wenn der Benutzer einen anderen Link auf deiner Website anklickt (z. B. den CTA Button am unteren Rand bei einer App-ähnlichen Erfahrung), fängt der Service Worker die Anfrage ab, übernimmt die Seite und lädt stattdessen die PWA Shell.

Lies weiter, um zu erfahren, warum und wie du dieses Entwicklungsmuster verwenden kannst.

## Verbessere das Benutzererlebnis durch eine Verbindung zu einer PWA

### AMP für die initiale Benutzerakquise

AMP ist eine ideale Lösung für sogenannte **Leaf Pages**. Das sind Contentseiten, die deine Benutzer organisch entdecken: über eine Suchmaschine, einen von Freunden geteilten Link oder einen Link auf einer anderen Website. Aufgrund von AMPs [spezialisiertem Pre-Rendering](../../../about/how-amp-works.html) werden AMP Seiten extrem schnell geladen, was auch ein wesentlich geringeres Drop Off bedeutet (die neueste [DoubleClick Studie](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) zeigt, dass **mehr als 53 % aller Benutzer nach 3 Sekunden abspringen**).

### PWA für reichhaltige Interaktivität und Engagement

Progressive Web Apps ermöglichen eine viel größere Interaktivität und mehr Engagement. Ihnen fehlen jedoch die _Eigenschaften des sofortigen ersten Ladens_ einer AMP Seite. Den Kern von PWA bildet die Technologie "Service Worker", ein clientseitiger Proxy, mit dem du alle Arten von Assets für deine Seiten zwischenspeichern kannst. Dieser Service Worker wird jedoch erst _nach_ dem ersten Laden aktiviert.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Vor- und Nachteile von AMP vs. PWA.') }}

## Lade deine PWA vor mit `amp-install-serviceworker`

AMP kann den Service Worker deiner Progressive Web App von einer AMP Seite aus installieren – sogar dann, wenn diese AMP Seite aus einem AMP Cache bereitgestellt wird! Bei korrekter Ausführung fühlt sich ein Link, der von einer deiner AMP Seiten zu deiner PWA führt, sehr schnell an, ähnlich wie beim ersten Sprung zu der AMP Seite.

[tip type="tip"] **TIPP:** Wenn du Service Worker noch nicht kennst, empfehle ich den [Udacity Kurs](https://www.udacity.com/course/offline-web-applications--ud899) von Jake Archibald. [/tip]

Installiere zunächst mithilfe von [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) den Service Worker auf allen deinen AMP Seiten. Binde dazu zuerst die Komponente über ihr Skript im Abschnitt `<head>` deiner Seite ein:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Füge dann irgendwo in deinem `<body>` Folgendes hinzu (passe es entsprechend an, um auf deinen tatsächlichen Service Worker zu verweisen):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Speichere dann bei der Installation des Service Workers alle Ressourcen, die die PWA benötigt, im Cache:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/styles/main.css',
'/script/main.js'
];

self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});
[/sourcecode]

[tip type="tip"] **TIPP:** Es gibt einfachere Möglichkeiten zur Verwendung eines Service Workers. Sieh dir die [Service Worker Hilfsbibliotheken](https://github.com/GoogleChrome/sw-helpers) an. [/tip]

## Gestalte alle Links auf einer AMP Seite so, dass sie zu der PWA navigieren

Möglicherweise führen die meisten Links auf deinen AMP Seiten zu weiteren Contentseiten. Es gibt zwei Strategien, um sicherzustellen, dass spätere Klicks auf diese Links ein "Upgrade" zur Progressive Web App bedeuten, [abhängig von der Art und Weise, wie du AMP verwendest](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Deine kanonischen Seiten sind mit AMP Seiten gekoppelt

In diesem Fall hast du eine kanonische Website (nicht-AMP) und generierst AMP Seiten, die mit diesen kanonischen Seiten verknüpft werden. Diese Methode wird für AMP derzeit am häufigsten verwendet. Das bedeutet, dass die Links auf deinen AMP Seiten wahrscheinlich auf die kanonische Version deiner Website verweisen. **Gute Neuigkeiten: Wenn deine kanonische Website deine PWA ist, ist schon alles bereit**.

### 2. Deine kanonische Website ist AMP

In diesem Fall _sind_ deine kanonischen Seiten deine AMP Seiten: Du erstellst deine gesamte Website mit AMP und verwendest AMP einfach als Bibliothek (übrigens: Die Website, die du gerade liest, wurde auch auf diese Weise erstellt). **In diesem Szenario führen die meisten Links auf deinen AMP Seiten zu anderen AMP Seiten.**

Jetzt kannst du dein PWA auf einem separaten Pfad wie `your-domain.com/pwa` bereitstellen und den bereits laufenden Service Worker verwenden, **um die Browsernavigation abzufangen, wenn jemand einen Link auf der AMP Seite anklickt**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
if (event.request.mode === 'navigate') {
event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Das Interessante an dieser Technik ist, dass du jetzt eine progressive Verbesserung verwendest, um von AMP zu PWA zu wechseln. Das bedeutet jedoch auch, dass Browser, die noch keine Service Worker unterstützen, von AMP zu AMP springen und niemals zur PWA navigieren.

AMP löst dies durch sogenanntes [Shell URL Rewriting](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). Du fügst dem Tag [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) ein Fallback URL Muster hinzu. Damit gibst du AMP die folgende Anweisung: Wenn die Service Worker Unterstützung nicht gegeben ist, werden alle übereinstimmenden Links auf einer bestimmten Seite neu geschrieben, um stattdessen zu einer anderen Legacy Shell URL zu wechseln:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Mit diesen Attributen gehen alle späteren Klicks auf einer AMP Seite an deine PWA, unabhängig vom Service Worker.

[tip type="read-on"] **ERFAHRE MEHR:** Du hast schon einiges gelernt. Vielleicht möchtest du deine vorhandenen AMP Seiten wiederverwenden, um deine PWA zu erstellen? [Hier findest du mehr Infos](amp-in-pwa.md). [/tip]
