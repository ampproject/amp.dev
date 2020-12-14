---
"$title": Integriere deine Technologie in AMP
"$order": '0'
"$hidden": 'true'
description: Wenn du als Provider Technologie für Publisher und Werbetreibende im Internet bereitstellst, laden wir dich ein, AMP zu unterstützen, damit deine Kunden weiterhin von deiner Technologie profitieren und …
formats:
- websites
- ads
- stories
- email
---

Vielen Dank für dein Interesse, zu AMP beizutragen! Wir freuen uns über diene Teilnahme an unserem Projekt, bei dem wir das Web zu einer nutzerorientierten Plattform machen.

Publisher haben über 1,4 Milliarden AMP Dokumente erstellt, die auf über 750.000 individuellen Domains gehostet werden. Ein solches Wachstum ist nur dank der Unterstützung von über 100 Technologieunternehmen von Drittanbietern möglich, die bereits AMP integriert haben.

Wenn du als Provider Technologie für Publisher und Werbetreibende im Internet bereitstellst, laden wir dich ein, AMP zu unterstützen! Deine Kunden können weiterhin von deiner Technologie profitieren und gleichzeitig zu unserer Vision eines besseren Internets beitragen.

Dieses Dokument beschreibt die Erwartungen von AMP an Drittanbieter und definiert die verschiedenen Stufen für Beiträge.

# Richtlinien für Beiträge

Alle allgemeinen Beiträge unterliegen den [allgemeinen AMPHTML Richtlinien in CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md). Wir erwarten, dass externe Mitwirkende ihre Beiträge in unterschiedlichem Maße testen, warten und aktualisieren.

Folgende Annahmevoraussetzungen gelten für alle Beitragsebenen:

- Der Beitrag muss die [im englischen Wikipedia beschriebenen Relevanzkriterien](https://en.wikipedia.org/wiki/Wikipedia:Notability) erfüllen.
- Der Beitrag muss dem Leistungsniveau, das AMP sowohl Publishern als auch Benutzern verspricht, entsprechen oder dieses steigern.
- Der Beitrag muss einen guten Qualitätsstandard haben.
- Den Kunden muss ein Kanal für Troubleshooting zur Verfügung stehen.
- Bieten Sie eine gute Abdeckung für Integrationstests gegen AMPs Produktions- und Kanarienfreigaben.
- Der Beitrag muss einem Zweck dienen, der bisher nicht erreicht wurde.

Es gibt 3 Stufen für die Beiträge Dritter. Die Stufen sind vom Umfang der hinzugefügten Logik abhängig:

- Komponentenlogik: Code, der die Kernmerkmale und -funktionen der AMP Komponente bestimmt.
- Externe Logik: Code, der für eine Drittpartei spezifisch ist. Diese Logik ermöglicht der Komponente, den Dienst eines Drittanbieters zu nutzen.

Je mehr Logik dem AMP Repository hinzugefügt wird (insbesondere für Drittparteien spezifische Logik), desto höher ist die Ebene des Beitrags. Eine hohe Beitragsebene erfordert ein stärkeres Engagement des externen Mitwirkenden.

Für Beiträge der Stufen 1 und 2 können Komponenten zwischen Drittparteien geteilt werden. Wenn eine Komponente einen ähnlichen Zweck erfüllt wie der von dir gewünschte, kannst du diese Komponente gerne wiederverwenden. Das reduziert den Aufwand und ist auf lange Sicht besser für die Wartung des Codes.

Sobald du entschieden hast, welche Beitragsstufe zu deinem persönlichen Use Case passt, erstelle zunächst ein [GitHub Issue](https://github.com/ampproject/amphtml/issues/new).

## Beitrag der Stufe 1

Beiträge der Stufe 1 nutzen die Funktionslogik vorhandener Komponenten. Sie laden drittanbieterspezifische Logik als benutzerdefiniertes JavaScript in einen Cross-Origin iframe. Beispielsweise stellen viele Ad Netzwerke ihre Ads über die Komponente [`amp-ad`](../../../components/reference/amp-ad.md) bereit, steuern jedoch das Rendern der Ads mithilfe ihrer eigenen Logik.

Externe Mitwirkende nutzen die bereitgestellten APIs, um Konfigurationen und Features zu vorhandenen Erweiterungen hinzuzufügen und damit eigene Funktionen zu implementieren. Wenn eine bestimmte Komponente nicht vorhanden ist, können sie eine solche vorschlagen.

Die einzige drittanbieterspezifische Logik, die in der AMP Repository eingecheckt wird, ist die Konfiguration der Drittpartei. Das Hinzufügen einer neuen Drittpartei zu einem vorhandenen Beitrag der 1. Ebene erfordert normalerweise kein Design Review. Dritte können sich an der Dokumentation zur Integration der Komponente orientieren, z. B. im Dokument [Integration von Ad Netzwerken in AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

### Erwartungen an externe Mitwirkende

- Das eigene JavaScript des Anbieters muss unabhängig gewartet und gepflegt werden.
- Bereitstellung von Tests für die eigene Konfiguration und Behandlung von Problemen
- Bereitstellung eines Kanals für Troubleshooting für Entwickler
- Behandlung aller Fehlermeldungen, die sich auf den eigenen Dienst beziehen

### Beispiel für die 1. Ebene

[**amp-ad**](../../../components/reference/amp-ad.md)

Ad Anbieter sollten den [Überblick zum Thema Entwicklung](https://github.com/ampproject/amphtml/tree/master/ads#overview) und die [Anleitung für Entwickler](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) lesen, um die Unterstützung für deine Funktionen zu [`amp-ad`](../../../components/reference/amp-ad.md) hinzuzufügen. Je nach der von deinem Unternehmen bereitgestellten Ad Technologie könnte auch [diese Anleitung zur Integration](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads) für dich relevant sein.

Es gibt viele Ad Anbieter, die Unterstützung für werbebezogene Funktionen wie amp-ad implementiert haben. Hier ist ein [Beispiel für einen Pull Request](https://github.com/ampproject/amphtml/pull/2299) vom Ad Netzwerk [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

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

Wenn du nur einen Tracking Pixel mit dynamischen Parametern zu deiner Tracking URL hinzufügen möchtest, wirf einen Blick auf [`amp-pixel`](../../../components/reference/amp-pixel.md). Vergiss nicht, die Verwendung der Komponente auf deinen Support Seiten für Entwickler zu dokumentieren, die deine Technologie eventuell mit AMP nutzen möchten.

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
