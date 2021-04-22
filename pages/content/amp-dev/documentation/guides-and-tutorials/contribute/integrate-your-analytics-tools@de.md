---
'$title': Integriere dein Analytics Tool in AMP
$order: 1
formats:
  - websites
  - stories
teaser:
  text: Überblick
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Überblick <a name="overview"></a>

Wenn du ein Software-as-a-Service Tool für Publisher bereitstellst, mit dem diese mehr über ihren Datenverkehr und ihre Besucher erfahren können, solltest du deinen Dienst in `amp-analytics` integrieren. Dadurch können deine Kunden Trends im Datenverkehr ihrer AMP HTML Seiten ansehen.

## Bevor du beginnst <a name="before-you-begin"></a>

Bevor du deinen Analysedienst zur AMP HTML Runtime hinzufügen kannst, musst du möglicherweise

- die Arten von [Variablen](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) und [Anforderungen](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-analytics.md#requests) identifizieren, die du in einem AMP HTML Dokument für deinen Analytics Dienst benötigst,
- die Trigger identifizieren, die dazu führen, dass Analytics Anforderungen von einer Seite gesendet werden, die für deinen Dienst relevant ist,
- überlegen, ob und wie du in AMP Kontexten von Erstanbietern und Drittanbietern die [Benutzer verfolgen](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md) möchtest,
- festlegen, wie dein Analytics Dashboard den AMP Datenverkehr verarbeitet,
- fehlende Funktionen in `amp-analytics` identifizieren und für gewünschte Funktionen [Anfragen erstellen](https://github.com/ampproject/amphtml/issues/new).
- AMP Analytics sendet seine Variablen an einen vorkonfigurierten Endpoint. Wenn du noch keinen Endpoint hast, sieh dir [dieses Beispiel](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) an. Es bietet eine Übersicht zum Erstellen eines Endpoints.
  - Für alle Transportarten außer `iframe` werden Variablen als Parameter der Abfragezeichenfolge in einer HTTPS Anforderung gesendet.
  - Für die Transportart `iframe` wird ein iframe erstellt und Variablen werden via `window.postMessage` an dieses gesendet. In diesem Fall muss die Nachricht keine URL sein. Diese Option steht nur MRC-akkreditierten Anbietern zur Verfügung.
- Überlege dir, wie sich die Integration in `amp-analytics` auf Richtlinien (insbesondere deine Datenschutzrichtlinie) oder Vereinbarungen auswirken kann.

## So fügst du deine Konfiguration zur AMP HTML Runtime hinzu <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Erstelle ein [Issue mit dem Label Intent-to-Implement](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features), das besagt, dass du die Konfiguration deines Analytics Dienstes zur AMP HTML Runtime hinzufügen möchtest. Stelle sicher, dass du **cc @ampproject/wg-analytics** in deine Beschreibung aufnimmst.
2. Entwickle einen Patch, der Folgendes implementiert:
   1. Eine neue json Konfigurationsdatei `${vendorName}.json` im [Ordner](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) des Anbieters, die alle Optionen enthält, die den Standard wesentlich erweitern, wie zum Beispiel:
      1. `"vars": {}` für zusätzliche Standardvariablen.
      2. `"requests": {}` für Anforderungen, die dein Dienst verwenden wird.
      3. `"optout":` falls erforderlich. Wir haben derzeit kein umfangreiches Opt-out System. Bitte hilf uns, eines zu entwickeln, das für deine Zwecke gut funktioniert.
      4. `"warningMessage":` falls erforderlich. Zeigt in der Konsole Warninformationen des Anbieters an (z. B. Veraltete Version oder Migration).
   2. Wenn du den iframe Transport verwendest, füge zu ANALYTICS_IFRAME_TRANSPORT_CONFIG in der Datei iframe-transport-vendor.js eine neue Zeile hinzu, die `"*vendor-name*": "*url*"` enthält.
   3. Ein Beispiel in der Referenz [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
   4. Einen Test in der Datei [extensions/amp-analytics/0.1/test/vendor-requests.json](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
   5. Füge deinen Analytics Dienst zur Liste der unterstützten Anbieter in der Datei [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./analytics-vendors-list.md) hinzu. Füge den Typ, die Beschreibung und den Link zu deiner Nutzungsdokumentation hinzu.
3. Teste das neue Beispiel, das du in [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) eingestellt hast, um sicherzustellen, dass die Treffer aus dem Beispiel erwartungsgemäß funktionieren (dass z. B. die benötigten Daten gesammelt und in deinem Analytics Dashboard angezeigt werden).
4. Reiche einen Pull Request mit diesem Patch ein, der auf das Issue mit dem Label Intent-To-Implement verweist.
5. Aktualisiere die Nutzungsdokumentation deines Dienstes und informiere deine Kunden.
6. Es wird dringend empfohlen, [außerhalb des AMP Repo einen Integrationstest durchzuführen](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Tag Manager <a name="tag-managers"></a>

Dienste zur Verwaltung von Tags bieten zwei Optionen für die Integration in AMP Analytics:

- **Endpoint Ansatz:** Agiert als zusätzlicher Endpoint für `amp-analytics` und führt Marketing Management im Backend durch.
- **Konfigurationsansatz:** Führt die Verwaltung von Tags über eine dynamisch generierte JSON Konfigurationsdatei durch, die für jeden Publisher individuell erstellt wird.

Der Endpoint Ansatz entspricht dem im vorherigen Abschnitt beschriebenen Standardansatz. Der Konfigurationsansatz besteht darin, eine eindeutige Konfiguration für amp-analytics zu erstellen, die für jeden Publisher spezifisch ist und alle kompatiblen Analytics Pakete enthält. Ein Publisher würde die Konfiguration über eine ähnliche Syntax wie die folgende einbetten:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

Um diesen Ansatz zu verwenden, sieh dir die Dokumentation für die Integration von Publishern in AMP Analytics an.

## Weitere Ressourcen <a name="further-resources"></a>

- Vertiefung: [Warum nicht einfach ein iframe verwenden?](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/why-not-iframe.md)
- Vertiefung: [Status nicht authentifizierter Benutzer mit AMP verwalten](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md)
- [Beispiel für amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Referenzdokumentation zu [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Referenzdokumentation zu den [Variablen in amp-analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)
