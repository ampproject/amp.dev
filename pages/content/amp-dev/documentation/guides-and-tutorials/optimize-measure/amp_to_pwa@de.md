---
"$title": Turn your AMP site into a PWA
"$order": '10'
description: Durch das Zwischenspeichern von Ressourcen im Browser kann eine PWA den Benutzern Daten, Assets und Offlineseiten bereitstellen, um sie zu unterhalten und zu informieren.
tutorial: 'true'
formats:
- websites
author: crystalonscript
---

Progressive Web Apps nutzen die Leistung von [Service Workern](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), um über verschiedene Netzwerkstärken hinweg umfassende Offlinefunktionen und konsistente Benutzererfahrungen zu ermöglichen. Durch das Zwischenspeichern von Ressourcen im Browser kann eine PWA den Benutzern Daten, Assets und Offlineseiten bereitstellen, um sie zu unterhalten und zu informieren.

This tutorial will teach you how to turn an AMP site into an installable PWA with offline capabilities by adding a Web Manifest and a Service Worker powered by the AMP Service Worker.

# Download and run the starter code

Download the [starter code here](/static/files/tutorials/amptopwa.zip).

Use a local web server to preview the website.

[tip type="default"] **TIPP:** Um schnell einen Webserver zu erstellen, führe einfach `python -m SimpleHTTPServer` aus. [/tip]

You should be able to view the landing page for Lyrical Lyghtning, the Mobile Music Magic festival. It has one link on the homepage to view the schedule and which stage the bands are on.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Bild der PWA' ) }}

Benutzer unserer Website könnten beim Event eine schlechte Netzwerkverbindung haben, gerade wenn sie auf das Festivalprogramm zugreifen wollen. Es bietet sich an, eine PWA daraus zu machen, die auf dem Startbildschirm unserer Benutzer installiert werden kann und auch offline alle kritischen Funktionen bietet.

# Erstelle ein Web App Manifest

Das [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/) ist eine einfache JSON Datei, die dem Browser Informationen zu deiner Webanwendung und deren Verhalten liefert, wenn sie auf dem mobilen Gerät oder Desktop der Benutzer 'installiert' wird. Viele Browser benötigen ein Manifest, um die [Eingabeaufforderung 'Zum Startbildschirm hinzufügen'](https://developers.google.com/web/fundamentals/app-install-banners/) anzeigen zu können.

Add a file titled `manifest.json` to your repository with the following code:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Add the AMP Service Worker

Ein Service Worker ist ein Skript, das dein Browser – unabhängig von einer Webseite – im Hintergrund ausführt und das die Browserfunktionen erweitert. Auf diese Weise werden Anfragen zwischengespeichert, um die Leistung zu verbessern und Offlinefunktionen bereitzustellen. Die Neuentwicklung eines Service Workers ist möglich, aber zeitaufwendig. Bibliotheken wie z. B. Workbox sind hilfreich, aber AMP geht mit dem [AMP Service Worker](https://github.com/ampproject/amp-sw) noch einen Schritt weiter: Viele Schritte werden automatisiert, einschließlich der Zwischenspeicherung von AMP Skripten, Assets und Dokumenten sowie der Implementierung gängiger Best Practices wie dem [Vorladen der Navigation](https://developers.google.com/web/updates/2017/02/navigation-preload).

Der AMP Service Worker führt nach seiner Installation automatisch die [Zwischenspeicherung von AMP Skripten](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) und [Dokumenten](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) durch, sobald Benutzer diese anfordern. Wir beginnen mit dem Hinzufügen des grundlegenden AMP Service Workers.

## Create the service worker file

Create a file called `sw.js` and add the following code:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

With just two lines of code, this imports the AMP Service Worker into your Service Worker and initializes it.

## Auto-install your service worker on your AMP pages

AMP websites use the [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) component to install the service worker in the browser's background, while the user is enjoying your content.

Platziere das erforderliche Tag "script" im Head von `index.html` und das Element `<amp-install-serviceworker>` im `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Wichtig:** Der Service Worker sollte aus dem Stammverzeichnis (`/sw.js`) bereitgestellt werden, damit der gesamte Inhalt deiner Website zwischengespeichert werden kann. [/tip]

The `<amp-install-serviceworker>` installs the service worker by creating an iframe and running the `data-iframe-src` file. Create the `install-sw.html` file and add the following code:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

The iframe registers the AMP Service Worker file into the browser.

# Customize what is cached

Der AMP Service Worker bietet bereits integrierte Funktionen und ermöglicht darüber hinaus optionale Felder, die du konfigurieren kannst, um sie an die Anforderungen deiner App anzupassen.

Unsere Musikfestival App führt die Zwischenspeicherung unserer Bildressourcen durch, ruft den Veranstaltungslink vorher ab und gibt eine Offlineseite an.

## Zwischenspeichern von Assets

Du kannst den AMP Service Worker so konfigurieren, dass [Assets zwischengespeichert werden](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), z. B. Bilder, Videos und Schriftarten. Wir verwenden ihn, um unser Hintergrundbild und das AMP Logo zwischenzuspeichern. Öffne die Datei `sw.js` und aktualisiere sie mit dem folgenden Code:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Als Cachingstrategie haben wir [Cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) festgelegt. Das bedeutet, dass die App zuerst versucht, Bilder aus dem Cache bereitzustellen, bevor sie etwas aus dem Netzwerk anfordert. Das ist für diese App besonders nützlich, da wir unser Hintergrundbild oder das AMP Logo nicht aktualisieren.

## Vorabruf von Links

Der AMP Service Worker ruft vorab Links mit dem Attribut `data-rel=prefetch` ab. Dadurch können Benutzer Seiten offline anzeigen, auch wenn sie sie noch nicht besucht haben. Wir fügen das Attribut zu unserem Linktag für `lineup.html` hinzu.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Show an offline page

To deal with unexpected cases or clicks on links to pages that we didn't prefetch, we'll add an offline page to offer a consistent user experience that is "on brand", as opposed to showing the generic browser offline page. Download [`offline.html` here](/static/files/tutorials/offline.zip) and update `sw.js` to the following code:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Test your PWA

Mit [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps) kannst du testen, ob dein AMP Service Worker die erforderlichen Assets zwischenspeichert und eine ideale Offlinelösung bereitstellt.

Wir testen Lyrical Lyghtning, indem wir das Bedienfeld des DevTools öffnen: unter Windows mit `Strg + Umschalt + I` oder unter Mac mit `Cmd + Opt + I`. Du kannst auch mit der rechten Maustaste auf die Seite klicken und den Menüpunkt `Untersuchen` auswählen. Wähle dann `Application`, um die Registrierung deines Service Workers anzuzeigen.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Aktiviere das Kontrollkästchen `offline`, um in den Offlinemodus zu wechseln. Klicke auf den Link `see full lineup` und navigiere zu `offline.html`, um zu überprüfen, ob die Assets ordnungsgemäß zwischengespeichert und vorabgerufen wurden.

[tip type="default"] **Tipp:** Führe das <a>Google Lighthouse Tool</a> aus, um die Funktionen einer Progressive Web App gründlich zu analysieren und einen Bericht zu erhalten. [/tip]

# Congratulations!

Du hast erfolgreich eine PWA mit AMP erstellt! In diesem Tutorial hast du gelernt,

- ein [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/) zu erstellen,
- mithilfe von [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) einen Service Worker in AMP zu installieren,
- den [AMP Service Worker ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) anzupassen,
- [Vorabruf von Links ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- eine Offlineseite zu erstellen.

Lies mehr über [Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) und [Überlegungen zu Offline UX](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Erfahre, wie du das [Engagement mittels Analytics verfolgen kannst](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html). Sieh dir das Tutorial an, das zeigt, wie du [fundamentale Analyseprozesse für deine AMP Seiten konfigurieren](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html) kannst.
