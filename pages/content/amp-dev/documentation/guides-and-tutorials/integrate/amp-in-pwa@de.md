---
"$title": Verwende AMP als Datenquelle für deine PWA
"$order": '1'
description: Wenn du AMP bereits verwendest, aber noch keine Progressive Web App erstellt hast, können deine AMP Seiten die Entwicklung deiner Progressive Web App erheblich vereinfachen.
formats:
- websites
author: pbakaus
---

Wenn du AMP bereits verwendest, aber noch keine Progressive Web App erstellt hast, können deine AMP Seiten die Entwicklung deiner Progressive Web App erheblich vereinfachen. In diesem Leitfaden erfährst du, wie du AMP innerhalb deiner Progressive Web App verwendest und deine vorhandenen AMP Seiten als Datenquelle nutzt.

## Von JSON zu AMP

Im gängigsten Szenario ist eine Progressive Web App eine Single-Page Anwendung, die über Ajax eine Verbindung zu einer JSON API herstellt. Diese JSON API gibt dann Datensätze zurück, um die Navigation zu steuern, und den tatsächlichen Inhalt, um die Artikel zu rendern.

Anschließend konvertierst du den Rohinhalt in verwendbares HTML und renderst ihn auf dem Client. Dieser Prozess ist kostspielig und seine Wartung oft umständlich. Stattdessen kannst du deine bereits vorhandenen AMP Seiten als Inhaltsquelle wiederverwenden. Das Beste ist: Dank AMP wird der Vorgang so trivial, dass du nur wenige Codezeilen dazu benötigst.

## Füge "Shadow AMP" in deine Progressive Web App ein

Der erste Schritt besteht darin, eine spezielle Version von AMP, die wir "Shadow AMP" nennen, in deine Progressive Web App aufzunehmen. Ja, das ist richtig: Du lädst die AMP Bibliothek auf der Seite der obersten Ebene, aber sie steuert den Inhalt der obersten Ebene nicht. Du teilst ihr mit, welche Teile unserer Seite "verstärkt" werden sollen.

Füge Shadow AMP wie folgt im Head deiner Seite ein:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### Woher weißt du, wann die Shadow AMP API einsatzbereit ist?

Wir empfehlen, dass du die Shadow AMP Bibliothek mit dem Attribut `async` lädst. Dies erfordert jedoch eine gewisse Herangehensweise, um zu verstehen, wann die Bibliothek vollständig geladen und einsatzbereit ist.

Das richtige Signal ist die Verfügbarkeit der globalen <code>AMP</code> Variablen, und Shadow AMP verwendet einen "<a>asynchronen Ansatz zum Laden von Funktionen</a>", um dies zu unterstützen. Betrachte diesen Code:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

Dieser Code funktioniert und alle Rückrufe, die auf diese Weise hinzugefügt wurden, werden tatsächlich ausgelöst, wenn AMP verfügbar ist. Aber warum?

Dieser Code kann wie folgt übersetzt werden:

1. "Wenn window.AMP nicht existiert, erstelle ein leeres Array, um seine Position einzunehmen."
2. "Füge dann mittels push eine Rückruffunktion zum Array hinzu, die ausgeführt werden soll, wenn AMP bereit ist."

Das funktioniert, da die Shadow AMP Bibliothek beim tatsächlichen Laden feststellt, dass bereits eine Reihe von Rückrufen unter <code>window.AMP</code> vorhanden ist, und dann die gesamte Warteschlange verarbeitet. Wenn du dieselbe Funktion später erneut ausführst, funktioniert sie weiterhin, da Shadow AMP <code>window.AMP</code> durch sich selbst und eine benutzerdefinierte <code>push</code> Methode ersetzt, die den Rückruf einfach sofort auslöst.

[tip type="tip"] **TIPP:** Um das obige Codebeispiel praktisch zu gestalten, empfehlen wir, es mit einem Promise zu umschließen und dieses Promise immer einzusetzen, bevor du die AMP API verwendest. Ein Beispiel findest du in unserem [React Demo Code](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20). [/tip]

## Verarbeite die Navigation in deiner Progressive Web App

Du musst diesen Schritt nach wie vor manuell implementieren. Schließlich ist es deine Entscheidung, wie du Links zu Inhalten in deinem Navigationskonzept präsentierst. Eine Reihe von Listen? Ein paar Karten?

In einem häufigen Szenario rufst du ein JSON ab, das geordnete URLs mit einigen Metadaten zurückgibt. Am Ende solltest du einen Funktionsrückruf erhalten, der ausgelöst wird, wenn Benutzer auf einen der Links klicken, und dieser Rückruf sollte die URL der angeforderten AMP Seite enthalten. Wenn du das geschafft hast, bist du bereit für den letzten Schritt.

## Verwende die Shadow AMP API, um eine Seite inline zu rendern

Wenn du nach einer Benutzeraktion Inhalte anzeigen möchtest, musst du das entsprechende AMP Dokument abrufen und die Steuerung an Shadow AMP übergeben. Implementiere zunächst eine Funktion zum Abrufen der Seite, ähnlich der folgenden:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"] **WICHTIG:** Um das obige Codebeispiel zu vereinfachen, haben wir die Fehlerbehandlung übersprungen. Du solltest immer darauf achten, Fehler ordnungsgemäß zu entdecken und zu behandeln. [/tip]

Jetzt, da wir unser sofort einsatzbereites <code>Document</code> Objekt haben, ist es an der Zeit, dass AMP es übernimmt und rendert. Rufe einen Verweis auf das DOM Element ab, das als Container für das AMP Dokument dient, und rufe dann <code>AMP.attachShadowDoc()</code> wie folgt ab:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **TIPP:** Bevor du das Dokument tatsächlich an AMP übergibst, wäre jetzt der ideale Zeitpunkt, um Seitenelemente zu entfernen, die bei der Anzeige der AMP Seite als eigenständige Seite, aber nicht im eingebetteten Modus sinnvoll sind: zum Beispiel Fuß- und Kopfzeilen. [/tip]

Das war schon alles! Deine AMP Seite wird als untergeordnetes Element deiner gesamten Progressive Web App gerendert.

## Räume hinter dir auf

Möglicherweise navigieren deine Benutzer in deiner Progressive Web App von AMP zu AMP. Wenn du die zuvor gerenderte AMP Seite verwirfst, musst du AMP immer wie folgt darüber informieren:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Dadurch wird AMP mitgeteilt, dass du dieses Dokument nicht mehr verwendest, und Speicher und CPU werden entlastet.

## Erlebe es in Aktion

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Du kannst dir das von uns erstellte [React Beispiel](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) ansehen, um "AMP zu PWA" in Aktion zu erleben. Es zeigt reibungslose Übergänge während der Navigation und wird mit einer einfachen React Komponente geliefert, welche die obigen Schritte umfasst. Das ist das Beste aus beiden Welten: flexibles, benutzerdefiniertes JavaScript in der Progressive Web App sowie AMP für den Inhalt.

- Den Quellcode findest du hier: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Verwende die eigenständige React Komponente über npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- Erlebe es hier in Aktion: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (am besten auf deinem Smartphone oder in einem mobilen Emulator)

Du kannst dir auch ein Beispiel für PWA und AMP im Polymer Framework ansehen. Das Beispiel verwendet [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) zum Einbetten von AMP Seiten.

- Den Code findest du hier: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- Erlebe es hier in Aktion: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
