---
"$title": Einführung in AMPHTML Ads
"$order": '1'
description: AMPHTML Ads ermöglichen dir, schnellere, schlankere und sicherere Werbung im Web zu schalten. AMP Seiten unterstützen zwar auch herkömmliche HTML Ads, aber diese laden mitunter zu langsam.
formats:
- ads
---

## Was ist eine AMPHTML Ad?

AMPHTML Ads ermöglichen dir, schnellere, schlankere und sicherere Werbung im Web zu schalten. AMP Seiten unterstützen zwar auch herkömmliche HTML Ads, aber diese laden mitunter zu langsam. Um die Ads an die Geschwindigkeit der restlichen AMP Seite anzupassen, kannst du sie in AMPHTML erstellen. AMPHTML Ads werden erst nach ihrer Validierung bereitgestellt, was die Sicherheit und Geschwindigkeit der Ads gewährleistet. Und nicht zuletzt können diese Ads *nicht nur auf AMP Seiten*, sondern überall im Web geschaltet werden.

AMPHTML Ads werden unter Berücksichtigung der [AMPHTML Ad Spezifikation](a4a_spec.md) (einer Variante von AMP HTML + CSS) in AMP HTML geschrieben. Das bedeutet, dass Ads nicht mehr in der Lage sind, beliebiges JavaScript auszuführen, was in der Regel die Hauptursache für leistungsschwache Ads ist. Daher sind – genau wie die Kernversion von AMP – die JavaScript Use Cases für die Kernversionen der Ads in das AMP Open Source Projekt integriert. Das garantiert das erwünschte Verhalten der Ads.

### Vorteile

Why are AMPHTML ads better than traditional ads?

1. **Schneller**: AMPHTML Ads sind schneller, da die Ads zu einem früheren Zeitpunkt im Rendering der Seite angefordert werden. Sie werden angezeigt, kurz bevor der Benutzer die Ad sieht. Darüber hinaus erhöht die reduzierte Dateigröße von AMPHTML Ads die Geschwindigkeit.
2. **Leichter**: AMPHTML Ads kombinieren häufig verwendete Funktionalitäten von Ads, wodurch die Dateigröße der Ad reduziert wird. Sobald AMPHTML Ads auf der Seite angezeigt werden, verbrauchen sie auch weniger Ressourcen. So sammeln z. B. AMPHTML Ads alle Daten auf einmal und verteilen sie an eine beliebige Anzahl interessierter Tracker, anstelle von 10 Trackern, die in gewöhnlichen Ads alle separat ihre Informationen anfordern.
3. **Koordiniert**: Auf AMP Seiten kann die [AMP Runtime](spec/amphtml.md#amp-runtime) die Nutzung der begrenzten Ressourcen eines Mobiltelefons so abstimmen, dass diese zur rechten Zeit auf die erforderlichen Komponenten fokussiert werden, um die beste Benutzererfahrung zu erzielen. Beispielsweise werden AMPHTML Ads mit Animationen angehalten, sobald sich die Ads nicht mehr im aktuellen Viewport befinden.
4. **Mehr Engagement**: Benutzer können sich nicht mit Ads beschäftigen, die sie nicht sehen können. Schnellere Ads führen zu einer höheren Sichtbarkeit und damit zu höheren Durchklickraten, was letztendlich erfolgreichere Ads bedeutet.
5. **Sicher vor Malware**: Es ist unmöglich, Malware mit AMPHTML Ads zu verbreiten, da die Ads vor ihrer Bereitstellung verifiziert werden. Auf diese Weise können Werbetreibende eine sichere Benutzerfahrung gewährleisten und eine positive Wahrnehmung ihrer Marke erzielen.
6. **Flexibler**: AMPHTML Ads sind sowohl für AMP Webseiten als auch für gewöhnliche Seiten konzipiert und funktionieren auf allen Geräten.

### Formate

AMPHTML ads are flexible and dynamic, allowing for many creative formats like carousel, parallax, and lightbox, to name a few. Get started by leveraging the open-source AMPHTML ad templates on [Examples](../../../documentation/examples/index.html).

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

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. Publisher reservieren über das Tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) einen Platz für die Ad auf ihrer AMP Seite und geben das Werbenetzwerk an, das sie verwenden möchten.
2. Die AMP Runtime sendet eine Anfrage an das angegebene Werbenetzwerk, um die Ad abzurufen. Werbenetzwerke, die AMPHTML Ads bereitstellen können, bieten eine [Fast Fetch Implementierung](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md), mit der das Creative validiert und signiert wird.
3. Das Werbenetzwerk antwortet mit der AMPHTML Ad und die AMP Runtime rendert die Ad auf der AMP Seite.

[tip type="note"] Für die Bereitstellung von AMPHTML Ads auf Seiten ohne AMP ist keine spezielle Integration erforderlich. Erkundige dich bei deinem Werbenetzwerk, ob AMPHTML Ads unterstützt werden. [/tip]

## AMPHTML Ads bereitstellen

### Publisher

Um deine direkt verkauften Ad Formate in AMPHTML bereitzustellen, müssen die Ads gemäß der [AMPHTML Ad Spezifikation](a4a_spec.md) erstellt und über einen Ad Server, der die AMPHTML Ad Bereitstellung unterstützt, bereitgestellt werden. Derzeit unterstützen die folgenden Ad Server AMPHTML Ads:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Verwende einen der Werbenetzwerke/Ad Server mit entsprechender Unterstützung aus [dieser Liste](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md), um AMPHTML Ads über deine indirekten Kanäle (z. B. Exchange, SSP usw.) bereitzustellen.

### Kreativagenturen

Als Kreativagentur musst du bei der Erstellung von Ads die [AMPHTML Ad Spezifikation](a4a_spec.md) berücksichtigen. Inspiration und Beispiele findest du in den Open-Source AMPHTML Ad Templates unter [Beispiele](../../../documentation/examples/index.html). Alternativ kannst du eines der folgenden Tools verwenden, um AMPHTML Ads zu erstellen:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*coming soon*)

### Werbenetzwerke/Server

To deliver AMPHTML ads to AMP pages, you need to create an [`amp-ad`](../../../documentation/components/reference/amp-ad.md) extension for your network (unless you already have one) which uses the [Fast Fetch ad request implementation](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).  Refer to [Integrating with AMP to serve display ads](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) for details.  Keep in mind that no special integration is needed to serve AMPHTML to non-AMP pages.

## AMPHTML Ads erstellen

**Von Grund auf**: AMPHTML Ads müssen der [AMPHTML Ad Spezifikation](a4a_spec.md) entsprechen. Demos und Beispiele findest du in den Open-Source AMPHTML Ad Templates unter [Beispiele](../../../documentation/examples/documentation/amp-ad.html).

**Using tools**: You can use any of the following tools to build AMPHTML creatives:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*coming soon*)

### AMPHTML Ad Syntax validieren

After creating your AMPHTML ad, you should make sure that the ad is using the correct AMPHTML syntax. Depending on your development environment, there are a few options for you to validate your AMPHTML ads:

- Use the [AMP validator NPM](https://www.npmjs.com/package/amphtml-validator) module to integrate validation into your build CI.
- Use the [AMP validator](https://validator.ampproject.org/) for one-off testing.
- Partner with [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) and use their public validator end point.

[tip type="note"] **NOTE –**  To render AMPHTML ads quickly on AMP pages (i.e., using preferential rendering in Fast Fetch), the syntax must be correct.  If the syntax isn't valid, the ad will still render, just not as quickly. [/tip]

## Unterstützung von AMPHTML Ads in RTB

For SSPs and ad exchanges that want to support AMPHTML ads in a Real-Time Bidding (RTB) environment, refer to the [Implementation Guide for RTB Ad Exchanges](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) for details.

## FAQs

#### Gibt es Beispiele für AMPHTML Ads?

Yes. A number of great looking AMPHTML ad templates can be found on [Examples](../../../documentation/examples/documentation/amp-ad.html). These samples use advanced components in AMP.

#### Unterstützen AMPHTML Ads die Drittanbieterüberprüfung und die Erfassung der Sichtbarkeit?

Yes, there is native support for verification and viewability detection using [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (e.g., Google's ActiveView integrates this way). There are also other vendors like MOAT that are actively implementing support for it.

#### Unterstützen AMPHTML Ads Animationen auf der Basis von Timelines?

Yes. See [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### Die meisten Ads haben antippbare Zielobjekte und konfigurierbare Ad Exits. Haben AMPHTML Ads einen ähnlichen Mechanismus?

Yes. See [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### Ich kann keine Antwort auf meine Frage finden. Wo kann ich Fragen stellen?

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) is our recommended way to find answers to questions about AMP; since members of the AMP Project community regularly monitor Stack Overflow you will probably receive the fastest response to your questions there.
- Join the [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) channel for solutions and answers.
- If you encounter a bug in AMP or have a feature request for AMP, see [Reporting issues with AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) for information on filing an issue.
