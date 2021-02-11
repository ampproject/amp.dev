---
'$title': Einfacher Offlinezugriff und verbesserte Leistung
$order: 11
description: Ein Service Worker ist ein clientseitiger Proxy, der sich zwischen deiner Seite und deinem Server befindet. Er wird verwendet, um fantastische Offline Erlebnisse und …
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

[Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) ermöglichen umfassende Offline Erlebnisse und eine konsistente Benutzererfahrung, unabhängig von der Netzwerkstärke. Da Ressourcen im Browser zwischengespeichert werden, kann eine Web App den Benutzer Daten, Assets und Offlineseiten bereitstellen, um sie zu unterhalten und zu informieren.

Denke daran: Der Service Worker kann nicht mit der im AMP Cache gespeicherten Version deiner Seite interagieren. Verwende ihn für die Benutzerführung zu deiner Quelle.

## Installiere einen Service Worker

Ein Service Worker ist ein clientseitiger Proxy, der sich zwischen deiner Seite und deinem Server befindet. Er wird verwendet, um fantastische Offline Erlebnisse und schnell ladende App Shell Szenarien zu erstellen und Pushbenachrichtigungen zu senden.

[tip type="note"] **HINWEIS:** Wenn dir das Konzept der Service Worker neu ist, lies die [Einführung bei WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). [/tip]

Dein Service Worker muss auf einer bestimmten Seite registriert sein – sonst kann der Browser ihn nicht finden oder ausführen. Standardmäßig erfolgt dies mit [ein wenig JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Auf AMP Seiten verwendest du zu diesem Zweck die Komponente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md).

Füge dazu zuerst die Komponente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) über ihr Skript im Abschnitt `<head>` deiner Seite ein:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Füge dann irgendwo in deinem `<body>` Folgendes hinzu (passe es entsprechend an, um auf deinen tatsächlichen Service Worker zu verweisen):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Sobald Benutzer zu deinen AMP Seiten in deiner Quelle navigieren (im Gegensatz zum ersten Klick, der gewöhnlich von einem AMP Cache aus ausgeführt wird), übernimmt der Service Worker die Aufgabe und kann [viele coole Dinge](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux) tun.

## Der AMP Service Worker

Wenn du das hier liest, erstellst du mit Sicherheit Seiten mit AMP. Das AMP Team legt großen Wert darauf, dass Benutzer im Vordergrund stehen und eine erstklassige Weberfahrung haben. Damit diese Erfahrungen durchweg konsistent bleiben, hat das AMP Team einen Service Worker speziell für AMP erstellt.

[tip type="default"] **TIPP:** Sieh dir unser Tutorial an, um zu erfahren, wie du den [AMP Service Worker in deiner PWA](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md) verwenden kannst. [/tip]

### Der AMP Service Worker

Installiere mit wenigen Schritten den AMP Service Worker:

- [sourcecode:js] importScripts('https://cdn.ampproject.org/sw/amp-sw.js'); [/sourcecode]

- [sourcecode:js]
  AMP_SW.init();
  [/sourcecode]

- Fertig.

### Automatisiertes Zwischenspeichern

Der AMP Service Worker speichert AMP Skriptdateien und AMP Dokumente automatisch im Cache. Da AMP Skriptdateien zwischengespeichert werden, stehen sie dem Browser der Benutzer sofort zur Verfügung und ermöglichen auch in unzuverlässigen Netzwerken Offlinefunktionen und schnellere Seiten.

Wenn deine App Dokumente auf spezielle Art zwischenspeichern muss, kannst du den AMP Service Worker anpassen, z. B. indem du eine Sperrliste für jene Dokumente hinzufügst, die immer vom Netzwerk angefordert werden müssen. Ersetze im folgenden Beispiel `Array<RegExp>` durch ein Array von regulären Ausdrücken, die Dokumente darstellen, deren Caching du vermeiden möchtest.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

Weitere Informationen zum [Anpassen des Zwischenspeicherns von Dokumenten findest du hier](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### AMP Service Worker optimieren

Um alle Optionen des AMP Service Workers zu nutzen, sollten die optionalen Felder so konfiguriert werden, dass erforderliche Assets zwischengespeichert und Links vorab abgerufen werden.

Assets, welche die Benutzer zum Besuch einer Seite motivieren, z. B. ein Video, wichtige Bilder oder eine herunterladbare PDF, sollten zwischengespeichert werden, damit erneut darauf zugegriffen werden kann, wenn die Benutzer offline sind.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

Du kannst die Cachingstrategie anpassen und eine Sperrliste anlegen.

Links zu Seiten, die deine Benutzer möglicherweise besuchen müssen, können vorabgerufen werden, sodass sie offline verfügbar sind. Dazu wird das Attribut `data-prefetch` zum Linktag hinzugefügt.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Offline Erfahrung

Teile den Benutzern mit, dass sie offline sind und versuchen sollten, die Website neu zu laden, sobald sie wieder online sind. Füge dazu eine Offlineseite hinzu. Der AMP Service Worker kann sowohl die Seite als auch deren Assets zwischenspeichern.

[sourcecode:js] AMP_SW.init({ offlinePageOptions: { url: '/offline.html'; assets: ['/images/offline-header.jpg']; } }) [/sourcecode]

Eine gelungene Offlineseite sieht wie ein Teil deiner Website aus, da ihre Benutzeroberfläche mit dem Rest der Anwendung konsistent ist.

### Erzwungenes Update

Das Team arbeitet an der Implementierung einer Funktion zum Erzwingen/Entfernen des Updates für den Fall, dass dein AMP Service Worker deaktiviert oder geändert werden muss, wenn eine Bereitstellung für Benutzer fehlgeschlagen ist.

Um einen Server Worker effektiv zu verwalten, solltest du wissen, wie sich das [standardmäßige HTTP Caching auf die Aktualisierung des JavaScript deines Service Workers auswirkt](https://developers.google.com/web/updates/2018/06/fresher-sw). Service Worker, die entsprechende HTTP Caching Anweisungen erhalten, können geringfügige Fehlerbehebungen vornehmen, indem die passenden Änderungen vorgenommen werden und dein Service Worker in deiner Hostingumgebung erneut bereitgestellt wird. Wenn du einen Service Worker entfernen musst, solltest du am besten eine einfache [no-op](https://en.wikipedia.org/wiki/NOP) (Nulloperation) Service Worker Datei wie die folgende griffbereit halten:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] [Hier findest du mehr Informationen](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) über das Verwalten bereitgestellter Service Worker. [/tip]

## Schreibe einen benutzerdefinierten Service Worker

Mit der oben genannten Technik kannst du den Offlinezugriff auf deine AMP Website aktivieren und deine Seiten erweitern, **sobald sie von der Quelle aus bereitgestellt werden**. Das ist möglich, weil du die Antwort über das Event `fetch` des Service Workers ändern und eine beliebige Antwort zurückgeben kannst:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

Mit dieser Technik kannst du deine AMP Seite mit allen möglichen Zusatzfunktionen ausstatten, die andernfalls die [AMP Validierung nicht bestehen würden](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), zum Beispiel:

- Dynamische Funktionen, die benutzerdefiniertes JS erfordern.
- Komponenten, die nur für deine Website angepasst bzw. relevant sind
