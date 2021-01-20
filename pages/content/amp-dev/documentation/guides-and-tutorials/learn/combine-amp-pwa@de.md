---
"$title": Wechselwirkung zwischen AMP und PWA
"$order": '7'
description: Progressive Web Apps und AMP Seiten funktionieren hervorragend zusammen. In vielen Fällen können sie sich sogar ergänzen. Finde heraus, wie …
formats:
- websites
components:
- youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Watch the intro to combining AMP and PWA.']

Progressive Web Apps und AMP Seiten funktionieren hervorragend zusammen. In vielen Fällen ergänzen sie sich auf die eine oder andere Weise. Finde heraus, wie du:

1. für deine eigenen AMP Seiten [PWA Funktionen aktivierst](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md),
2. einen [überzeugenden, blitzschnellen Übergang der Benutzer](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) von AMP zu PWA schaffst,
3. [deine PWA vereinfachst](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md), indem du die Möglichkeiten von AMP voll ausschöpfst.

[tip type="note"]

Weitere Informationen zu [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) findest du bei Web Fundamentals.

[/tip]

## AMP Seiten mit PWA Funktionen

AMP Seiten können viele eigenständige PWA Funktionen nutzen, sofern sie nicht aus einem AMP Cache, sondern aus deiner eigenen Quelle (der Domain deiner Website) bereitgestellt werden. Das bedeutet: PWA Funktionen werden beim Anzeigen einer AMP Seite innerhalb einer Plattform wie Google oder Bing nicht aktiviert, sondern kommen erst zum Einsatz, sobald die Benutzer von da aus weiter navigieren oder wenn sie deine AMP Seiten direkt aufrufen.

[tip type="read-on"] **LIES WEITER:** Lerne, wie du [PWA Funktionen für deine AMP Seiten aktivierst](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md). [/tip]

## AMP als Einstiegspunkt in deine PWA

Das Besondere an AMP ist die **fast verzögerungsfreie Bereitstellung** – eine Eigenschaft, die AMP zur idealen Lösung für die erste Benutzerinteraktion mit deiner Website macht. *Progressive Web Apps* ermöglichen zwar **mehr Interaktivität und bieten Funktionen für zusätzliches Engagement**. Allerdings wird ihr erstmaliges Laden dadurch erschwert, dass der Service Worker der Website – und damit ihre Assets und die App Shell – die Bereitstellung nur beim nachfolgenden Laden beschleunigen.

Eine gute Strategie besteht darin, eine AMP Seite als Einstiegspunkt für deine Website zu erstellen, dann die PWA hinter den Kulissen zu starten und für die weitere Navigation der Benutzer durch die Website zur PWA zu wechseln.

[tip type="read-on"] **LIES WEITER:** Finde heraus, wie <br>du mithilfe von [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) [AMP mit PWA verbindest](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md). [/tip]

## AMP als Datenquelle für deine PWA

Eines der wichtigsten Features von AMP Seiten ist ihre unproblematische und sichere Einbettung, weshalb immer mehr Plattformen sie gerne verteilen und bereitstellen.

Wenn du eine Progressive Web App erstellst, kannst du dieselben Vorteile nutzen und die Komplexität von Backend und Client drastisch reduzieren, **indem du deine AMP Seiten als Datenquelle für deine PWA wiederverwendest**.

[tip type="read-on"] **LIES WEITER:** Lerne, wie du [AMP Seiten innerhalb einer PWA verwendest](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md). [/tip]
