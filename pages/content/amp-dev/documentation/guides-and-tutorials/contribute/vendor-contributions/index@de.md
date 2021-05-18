---
'$title': Integrate your technology with AMP
$order: 0
'$hidden': 'true'
description: Wenn du als Provider Technologie für Publisher und Werbetreibende im Internet bereitstellst, laden wir dich ein, AMP zu unterstützen, damit deine Kunden weiterhin von deiner Technologie profitieren und …
formats:
  - websites
  - ads
  - stories
  - email
---

Vielen Dank für dein Interesse, zu AMP beizutragen! Wir freuen uns über diene Teilnahme an unserem Projekt, bei dem wir das Web zu einer nutzerorientierten Plattform machen.

Publisher haben über 1,4 Milliarden AMP Dokumente erstellt, die auf über 750.000 individuellen Domains gehostet werden. Ein solches Wachstum ist nur dank der Unterstützung von über 100 Technologieunternehmen von Drittanbietern möglich, die bereits AMP integriert haben.

If you are a technology provider for publishers or advertisers on the web, we invite you to add support to AMP! Your customers can continue to leverage your technology while working to achieve our vision of building a better web.

Dieses Dokument beschreibt die Erwartungen von AMP an Drittanbieter und definiert die verschiedenen Stufen für Beiträge.

# Richtlinien für Beiträge

Alle allgemeinen Beiträge unterliegen den [allgemeinen AMPHTML Richtlinien in CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md). Wir erwarten, dass externe Mitwirkende ihre Beiträge in unterschiedlichem Maße testen, warten und aktualisieren.

Folgende Annahmevoraussetzungen gelten für alle Beitragsebenen:

- Der Beitrag muss die [im englischen Wikipedia beschriebenen Relevanzkriterien](https://en.wikipedia.org/wiki/Wikipedia:Notability) erfüllen.
- Der Beitrag muss dem Leistungsniveau, das AMP sowohl Publishern als auch Benutzern verspricht, entsprechen oder dieses steigern.
- Der Beitrag muss einen guten Qualitätsstandard haben.
- Den Kunden muss ein Kanal für Troubleshooting zur Verfügung stehen.
- Bieten Sie eine gute Abdeckung für Integrationstests gegen AMPs Produktions- und Kanarienfreigaben.
- Der Beitrag muss einem Zweck dienen, der bisher nicht erreicht wurde.

There are 3 third party contribution levels. Levels are dependent on the amount of added logic:

- Komponentenlogik: Code, der die Kernmerkmale und -funktionen der AMP Komponente bestimmt.
- Third party logic: Code that is specific to the third party. This logic enables the component to leverage the third party service.

Je mehr Logik dem AMP Repository hinzugefügt wird (insbesondere für Drittparteien spezifische Logik), desto höher ist die Ebene des Beitrags. Eine hohe Beitragsebene erfordert ein stärkeres Engagement des externen Mitwirkenden.

Für Beiträge der Stufen 1 und 2 können Komponenten zwischen Drittparteien geteilt werden. Wenn eine Komponente einen ähnlichen Zweck erfüllt wie der von dir gewünschte, kannst du diese Komponente gerne wiederverwenden. Das reduziert den Aufwand und ist auf lange Sicht besser für die Wartung des Codes.

After deciding what level of contribution meets your use case, open a [GitHub issue](https://github.com/ampproject/amphtml/issues/new) to start.

## Beitrag der Stufe 1

Level 1 contributions leverage the feature logic of existing components. They load third party specific logic as custom JavaScript in a cross origin iframe. For example, many ad networks provide ads through the [`amp-ad`](../../../components/reference/amp-ad.md) component, but control how the rendering of ads through their own logic.

Externe Mitwirkende nutzen die bereitgestellten APIs, um Konfigurationen und Features zu vorhandenen Erweiterungen hinzuzufügen und damit eigene Funktionen zu implementieren. Wenn eine bestimmte Komponente nicht vorhanden ist, können sie eine solche vorschlagen.

Die einzige drittanbieterspezifische Logik, die in der AMP Repository eingecheckt wird, ist die Konfiguration der Drittpartei. Das Hinzufügen einer neuen Drittpartei zu einem vorhandenen Beitrag der 1. Ebene erfordert normalerweise kein Design Review. Dritte können sich an der Dokumentation zur Integration der Komponente orientieren, z. B. im Dokument [Integration von Ad Netzwerken in AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

### Erwartungen an externe Mitwirkende

- Das eigene JavaScript des Anbieters muss unabhängig gewartet und gepflegt werden.
- Bereitstellung von Tests für die eigene Konfiguration und Behandlung von Problemen
- Bereitstellung eines Kanals für Troubleshooting für Entwickler
- Behandlung aller Fehlermeldungen, die sich auf den eigenen Dienst beziehen

### Beispiel für die 1. Ebene

[**amp-ad**](../../../components/reference/amp-ad.md)

Ad Anbieter sollten den [Überblick zum Thema Entwicklung](https://github.com/ampproject/amphtml/tree/main/ads#overview) und die [Anleitung für Entwickler](https://github.com/ampproject/amphtml/tree/main/ads#developer-guidelines-for-a-pull-request) lesen, um die Unterstützung für deine Funktionen zu [`amp-ad`](../../../components/reference/amp-ad.md) hinzuzufügen. Je nach der von deinem Unternehmen bereitgestellten Ad Technologie könnte auch [diese Anleitung zur Integration](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads) für dich relevant sein.

Es gibt viele Ad Anbieter, die Unterstützung für werbebezogene Funktionen wie amp-ad implementiert haben. Hier ist ein [Beispiel für einen Pull Request](https://github.com/ampproject/amphtml/pull/2299) vom Ad Netzwerk [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md).

## Beitrag der 2. Ebene

Beiträge der 2. Ebene nutzen die Funktionslogik vorhandener Komponenten. Die gesamte Logik wird in die AMP Repository eingecheckt, und es kann kein eigenes JavaScript in iframes geladen werden. Beispielsweise fügen Analytics Anbieter der Komponente [`amp-analytics`](../../../components/reference/amp-analytics.md) ihre Konfigurationen hinzu, binden jedoch den Endpunkt ein, um Daten wie Benutzerklicks zu verfolgen.

Dritte fügen Konfigurationen oder Features wie neue APIs zu vorhandenen Komponenten hinzu, um deren Funktionen zu implementieren. Wenn eine bestimmte Komponente nicht vorhanden ist, können sie eine solche vorschlagen.

Die gesamte Geschäftslogik wird in die AMP Repository eingecheckt, aber die einzige eingecheckte für Drittparteien spezifische Logik ist die Konfiguration der Drittpartei. Wenn die Komponente eine von Dritten bereitgestellte Konfigurationsdatei verwendet, ist kein Design Review erforderlich. Wenn die Konfiguration der Drittpartei eine neue Funktion oder Komponente implementiert, muss sie das Design Review von AMP bestehen.

### Erwartungen an externe Mitwirkende

- Das Hinzufügen eines neuen externen Dienstes zu einem vorhandenen Beitrag der 2. Ebene erfordert in der Regel kein Design Review. Externe Mitwirkende können sich an der Dokumentation der jeweiligen Komponente orientieren.
- Wenn eine neue Komponente für einen Beitrag der 2. Ebene vorgeschlagen wird, muss diese eine Funktionslogik enthalten, die von anderen externen Diensten gemeinsam genutzt werden kann.

### Beispiele für die 2. Ebene

[**amp-analytics**](../../../components/reference/amp-analytics.md)

Mit AMP Analytics kannst du Trigger konfigurieren, bei deren Auslösung Ereignisse zurück an deinen Server gesendet werden. Wir haben einen [Leitfaden für die Analytics Integration](../../optimize-measure/configure-analytics/index.md) verfasst, um dir den Einstieg zu erleichtern.

If you only need to add a tracking pixel with dynamic parameters to your tracking URL, check out [`amp-pixel`](../../../components/reference/amp-pixel.md). Be sure to document usage on your support pages for developers that may want to use your technology with AMP.

Es gibt Analytics Anbieter, die bereits amp-analytics unterstützen. Hier ist ein [Beispiel für einen Pull Request](https://github.com/ampproject/amphtml/pull/1595) des Analytics Anbieters [Parse.ly](https://www.parsely.com/help/integration/google-amp/) .

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

Wenn du einen Dienst zur Messung von Anrufverfolgung bereitstellt, ist für deinen Use Case möglicherweise [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md) relevant. Diese Komponente ersetzt dynamisch Telefonnummern in Hyperlinks, um die Anrufverfolgung zu ermöglichen. Zum Ersetzen der Nummer wird eine CORS Anforderung ausgeführt.

Weitere Informationen zur Funktionsweise dieser Komponente findest du in der [Referenzdokumentation](../../../components/reference/amp-call-tracking.md).

## Beitrag der 3. Ebene

Mit einem Beitrag der 3. Ebene wird eine neue, für Drittparteien spezifische Komponente eingeführt. Dies gilt nur, wenn die Drittpartei nicht in der Lage ist:

- eine bereits vorhandene Komponente zu finden, die für den eigenen Use Case geeignet ist
- die Verbesserung von Features anzufordern, die den eigenen Use Case unterstützen,
- eine Komponente vorzuschlagen, die für andere externe Dienste relevant sind.

### Erwartungen an externe Mitwirkende

- Schreibe ein Design Review und schlage es vor.
- Die Tests müssen kritische Fehler im Code erkennen können.
- Behebe das Problem oder fordere Hilfe an, wenn es zu einem Abbruch in der Funktion der Komponente kommt.
- Provide thorough documentation with code samples.
- Pflege und Aktualisierung der Dokumentation
- Bereitstellung eines Kanals für Troubleshooting für AMP Entwickler, über den diese Hilfe anfordern können
