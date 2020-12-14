---
"$title": Caching von AMP Seiten
"$order": '0'
description: In diesem Dokument erfährst du, welche Rolle der AMP Cache im AMP Ökosystem spielt und wie deine AMP Seite zwischengespeichert wird.
formats:
- websites
- stories
- ads
---

In diesem Dokument erfährst du, welche Rolle der AMP Cache im AMP Ökosystem spielt und wie deine AMP Seite zwischengespeichert wird.

## Was ist ein AMP Cache?

An AMP Cache is a proxy-based content delivery network (CDN) for delivering valid AMP documents. AMP Caches are designed to:

1. nur gültige AMP Seiten bereitzustellen,
2. AMP Seiten ein effizientes und sicheres Vorladen zu erlauben,
3. Inhalte zusätzlich zu optimieren, um eine benutzerfreundliche Leistung zu erreichen.

[tip type="note"] AMP E-Mail Dokumente sind vom AMP Cache ausgenommen. [/tip]

Weitere Informationen zu AMP Caches findest du im folgenden YouTube Video oder im Blogbeitrag [ Why AMP Caches Exist](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Sieh dir dieses Video an und finde heraus, warum es AMP Caches gibt.']

## Welche AMP Caches sind verfügbar?

Derzeit gibt es zwei Anbieter von AMP Cache:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP ist ein offenes Ökosystem und das AMP Projekt fördert aktiv die Entwicklung weiterer AMP Caches. Informationen zum Erstellen von AMP Caches findest du in den [Richtlinien zu AMP Caches](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Wie wähle ich einen AMP Cache?

Als Publisher wählst du den AMP Cache nicht selbst. *Die Plattform*, die auf deine Inhalte verweist, wählt bei Bedarf den zu verwendenden AMP Cache.

Das ist eine Umkehrung des typischen Modells, bei dem die Bereitstellung von Inhalten in der Verantwortung des Publishers liegt. Mit diesem Modell können Plattformen ihren Benutzern jedoch eine vorhersehbare Auslastung bieten und unter anderem die erforderlichen Invarianten für Sicherheit und Datenschutz während der Pre-Rendering Phase von AMP sicherstellen. Informationen zu den strengen Richtlinien zum Erstellen von AMP Caches findest du in den [Richtlinien zum AMP Cache](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Kann ich das Caching umgehen?

Caching is a core part of the AMP ecosystem. Publishing a valid AMP document automatically opts it into cache delivery.

Wenn du nicht möchtest, dass dein Dokument zwischengespeichert wird, musst du das Attribut `amp` aus dem HTML Tag entfernen. Dadurch wird das Dokument nicht mehr als gültiges AMP Dokument gehandhabt, was jedoch nicht seine Funktionalität beeinträchtigt.

## Wer fordert AMP Seiten im Cache an?

Der Zugriff auf zwischengespeicherte AMP Seiten erfolgt über Plattformen (wie Google Search, Google News und Bing) und mobile Apps. Mobile Apps können über die URL (siehe [AMP URL API](https://developers.google.com/amp/cache/use-amp-url) von Google) oder über Cross-Origin XHRs in Progressive Web Apps (mehr unter [AMP einbetten und als Datenquelle verwenden](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) ) auf zwischengespeicherte AMP Inhalte verlinken.

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## Wie kommt meine AMP Seite in den Cache?

Wenn du das AMP Format verwendest, stellst du deine Inhalte AMP Caches zur Zwischenspeicherung zur Verfügung. Deine AMP Seite kann auf verschiedene Arten in einen AMP Cache gelangen:

- **Platform discovery**:  Platforms discover your AMP content via the `<html ⚡>` or `<html amp>` tag and cache the content. For example, Google Search crawls content; for any identified and valid AMP pages, the content is added to the Google AMP Cache.

- **Cache URL request**: Platforms can specifically request an AMP page by using the AMP Cache URL format.  The AMP Cache acts as a reverse proxy, therefore, when the platform accesses the page, it results in the page being cached automatically.

    - Google AMP Cache URL example: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **HINWEIS:** Die AMP Cache URL ist keine benutzerseitige URL, was bedeutet, dass Benutzer in der Regel keine Inhalte über solche URLs anfordern. [/tip]

- **Publisher addition**: Publishers can specifically add the AMP page to the AMP Cache.  This option is applicable only to the Google AMP Cache (see [Google AMP Cache: Update AMP Content](https://developers.google.com/amp/cache/update-cache)).

## Zusätzliche Ressourcen

- [AMP Project's AMP Cache guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
- [Google AMP Cache overview](https://developers.google.com/amp/cache/overview)
- [Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
