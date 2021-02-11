---
'$title': Einführung in AMPHTML Ads
$order: 1
description: AMPHTML Ads ermöglichen dir, schnellere, schlankere und sicherere Werbung im Web zu schalten. AMP Seiten unterstützen zwar auch herkömmliche HTML Ads, aber diese laden mitunter zu langsam.
formats:
  - ads
---

## Was ist eine AMPHTML Ad?

AMPHTML Ads ermöglichen dir, schnellere, schlankere und sicherere Werbung im Web zu schalten. AMP Seiten unterstützen zwar auch herkömmliche HTML Ads, aber diese laden mitunter zu langsam. Um die Ads an die Geschwindigkeit der restlichen AMP Seite anzupassen, kannst du sie in AMPHTML erstellen. AMPHTML Ads werden erst nach ihrer Validierung bereitgestellt, was die Sicherheit und Geschwindigkeit der Ads gewährleistet. Und nicht zuletzt können diese Ads _nicht nur auf AMP Seiten_, sondern überall im Web geschaltet werden.

AMPHTML Ads werden unter Berücksichtigung der [AMPHTML Ad Spezifikation](a4a_spec.md) (einer Variante von AMP HTML + CSS) in AMP HTML geschrieben. Das bedeutet, dass Ads nicht mehr in der Lage sind, beliebiges JavaScript auszuführen, was in der Regel die Hauptursache für leistungsschwache Ads ist. Daher sind – genau wie die Kernversion von AMP – die JavaScript Use Cases für die Kernversionen der Ads in das AMP Open Source Projekt integriert. Das garantiert das erwünschte Verhalten der Ads.

### Vorteile

Warum sind AMPHTML Ads besser als herkömmliche Anzeigen?

1. **Schneller**: AMPHTML Ads sind schneller, da die Ads zu einem früheren Zeitpunkt im Rendering der Seite angefordert werden. Sie werden angezeigt, kurz bevor der Benutzer die Ad sieht. Darüber hinaus erhöht die reduzierte Dateigröße von AMPHTML Ads die Geschwindigkeit.
2. **Leichter**: AMPHTML Ads kombinieren häufig verwendete Funktionalitäten von Ads, wodurch die Dateigröße der Ad reduziert wird. Sobald AMPHTML Ads auf der Seite angezeigt werden, verbrauchen sie auch weniger Ressourcen. So sammeln z. B. AMPHTML Ads alle Daten auf einmal und verteilen sie an eine beliebige Anzahl interessierter Tracker, anstelle von 10 Trackern, die in gewöhnlichen Ads alle separat ihre Informationen anfordern.
3. **Koordiniert**: Auf AMP Seiten kann die [AMP Runtime](spec/amphtml.md#amp-runtime) die Nutzung der begrenzten Ressourcen eines Mobiltelefons so abstimmen, dass diese zur rechten Zeit auf die erforderlichen Komponenten fokussiert werden, um die beste Benutzererfahrung zu erzielen. Beispielsweise werden AMPHTML Ads mit Animationen angehalten, sobald sich die Ads nicht mehr im aktuellen Viewport befinden.
4. **Mehr Engagement**: Benutzer können sich nicht mit Ads beschäftigen, die sie nicht sehen können. Schnellere Ads führen zu einer höheren Sichtbarkeit und damit zu höheren Durchklickraten, was letztendlich erfolgreichere Ads bedeutet.
5. **Sicher vor Malware**: Es ist unmöglich, Malware mit AMPHTML Ads zu verbreiten, da die Ads vor ihrer Bereitstellung verifiziert werden. Auf diese Weise können Werbetreibende eine sichere Benutzerfahrung gewährleisten und eine positive Wahrnehmung ihrer Marke erzielen.
6. **Flexibler**: AMPHTML Ads sind sowohl für AMP Webseiten als auch für gewöhnliche Seiten konzipiert und funktionieren auf allen Geräten.

### Formate

AMPHTML Ads sind flexibel und dynamisch und ermöglichen viele kreative Formate wie Karussell, Parallax und Lightbox, um nur einige wenige zu nennen. Ein guter Anfang sind die Open-Source AMPHTML Ad Templates unter [Beispiele](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Karussell</td>
    <td>Video Parallax</td>
    <td>Lightbox</td>
  </tr>
</table>

## So funktionieren AMPHTML Ads

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Bereitstellung von AMPHTML Ads auf AMP Seiten', caption='Bereitstellung von AMPHTML Ads auf AMP Seiten', align='' ) }}

1. Publisher reservieren über das Tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) einen Platz für die Ad auf ihrer AMP Seite und geben das Werbenetzwerk an, das sie verwenden möchten.
2. Die AMP Runtime sendet eine Anfrage an das angegebene Werbenetzwerk, um die Ad abzurufen. Werbenetzwerke, die AMPHTML Ads bereitstellen können, bieten eine [Fast Fetch Implementierung](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md), mit der das Creative validiert und signiert wird.
3. Das Werbenetzwerk antwortet mit der AMPHTML Ad und die AMP Runtime rendert die Ad auf der AMP Seite.

[tip type="note"] Für die Bereitstellung von AMPHTML Ads auf Seiten ohne AMP ist keine spezielle Integration erforderlich. Erkundige dich bei deinem Werbenetzwerk, ob AMPHTML Ads unterstützt werden. [/tip]

## AMPHTML Ads bereitstellen

### Publisher

Um deine direkt verkauften Ad Formate in AMPHTML bereitzustellen, müssen die Ads gemäß der [AMPHTML Ad Spezifikation](a4a_spec.md) erstellt und über einen Ad Server, der die AMPHTML Ad Bereitstellung unterstützt, bereitgestellt werden. Derzeit unterstützen die folgenden Ad Server AMPHTML Ads:

- DoubleClick für Publisher
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Verwende einen der Werbenetzwerke/Ad Server mit entsprechender Unterstützung aus [dieser Liste](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md), um AMPHTML Ads über deine indirekten Kanäle (z. B. Exchange, SSP usw.) bereitzustellen.

### Kreativagenturen

Als Kreativagentur musst du bei der Erstellung von Ads die [AMPHTML Ad Spezifikation](a4a_spec.md) berücksichtigen. Inspiration und Beispiele findest du in den Open-Source AMPHTML Ad Templates unter [Beispiele](../../../documentation/examples/index.html). Alternativ kannst du eines der folgenden Tools verwenden, um AMPHTML Ads zu erstellen:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_kommt bald_)

### Werbenetzwerke/Server

Um AMPHTML Ads auf AMP Seiten bereitzustellen, musst du die Erweiterung [`amp-ad`](../../../documentation/components/reference/amp-ad.md) für dein Netzwerk erstellen (sofern nicht bereits erfolgt), welche die [Fast Fetch Implementierung für Ad Anfragen](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) verwendet. Einzelheiten dazu findest du unter [AMP integrieren, um Display Ads zu schalten](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md). Beachte, dass für die Bereitstellung von AMPHTML an Seiten ohne AMP keine spezielle Integration erforderlich ist.

## AMPHTML Ads erstellen

**Von Grund auf**: AMPHTML Ads müssen der [AMPHTML Ad Spezifikation](a4a_spec.md) entsprechen. Demos und Beispiele findest du in den Open-Source AMPHTML Ad Templates unter [Beispiele](../../../documentation/examples/documentation/amp-ad.html).

**Mithilfe von Tools**: Du kannst eines der folgenden Tools verwenden, um AMPHTML Creatives zu erstellen:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_kommt bald_)

### AMPHTML Ad Syntax validieren

Stelle nach der Erstellung deiner AMPHTML Ad sicher, dass die Ad die korrekte AMPHTML Syntax verwendet. Abhängig von deiner Entwicklungsumgebung stehen dir einige Optionen zur Überprüfung deiner AMPHTML Ads zur Verfügung:

- Verwende das Modul [AMP Validator NPM](https://www.npmjs.com/package/amphtml-validator), um die Validierung in deine Build CI zu integrieren.
- Verwende den [AMP Validator](https://validator.ampproject.org/) für einmalige Tests.
- Arbeite mit [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) zusammen und verwende deren öffentlichen Validator Endpoint.

[tip type="note"] **HINWEIS:** Damit AMPHTML Ads schnell auf AMP Seiten gerendert werden (also mit Preferential Rendering in Fast Fetch), muss die Syntax korrekt sein. Bei ungültiger Syntax wird die Ad trotzdem gerendert, allerdings nicht so schnell. [/tip]

## Unterstützung von AMPHTML Ads in RTB

Informationen zu SSPs und Ad Exchanges, die AMPHTML Ads in einer Umgebung unterstützen möchten, die Real-Time Bidding (RTB) ermöglicht, findest du im [Implementierungshandbuch für RTB Ad Exchanges](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md).

## FAQs

#### Gibt es Beispiele für AMPHTML Ads?

Ja. Du findest eine ganze Reihe großartiger AMPHTML Ad Templates unter [Beispiele](../../../documentation/examples/documentation/amp-ad.html). Diese Beispiele verwenden erweiterte Komponenten in AMP.

#### Unterstützen AMPHTML Ads die Drittanbieterüberprüfung und die Erfassung der Sichtbarkeit?

Ja, es gibt native Unterstützung für Überprüfung und Erfassung der Sichtbarkeit mithilfe von [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (so wird z. B. ActiveView von Google auf diese Weise integriert). Es gibt auch andere Anbieter wie MOAT, die aktiv Unterstützung dafür implementieren.

#### Unterstützen AMPHTML Ads Animationen auf der Basis von Timelines?

Ja. Siehe [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### Die meisten Ads haben antippbare Zielobjekte und konfigurierbare Ad Exits. Haben AMPHTML Ads einen ähnlichen Mechanismus?

Ja. Siehe [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### Ich kann keine Antwort auf meine Frage finden. Wo kann ich Fragen stellen?

- Wir empfehlen [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) für Fragen rund um AMP. Da Mitglieder der AMP Project Community regelmäßig auf Stack Overflow mitlesen, erhältst du dort mit großer Wahrscheinlichkeit die schnellste Antwort auf deine Frage.
- Tritt dem Channel [#a4a-discuss auf Slack](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) bei, um Lösungen und Antworten zu finden.
- Wenn du einen Bug in AMP findest oder dir eine bestimmte Funktion wünschst, findest du unter [Probleme mit AMP melden](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) weitere Informationen zum Erstellen von Issues.
