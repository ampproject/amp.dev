---
"$title": Validierung von AMP E-Mails
"$order": '1'
author: CrystalOnScript
formats:
- email
---

AMP E-Mails sind von der AMP JS Bibliothek abhängig und können den Lesern dadurch umfassende interaktive und dynamische Erlebnisse bieten. Darum verlangen E-Mail Anbieter, dass deine Nachrichten validiert sind. Ein gültiges AMP Markup garantiert, dass E-Mails sicher sind und die Standards für Benutzerfreundlichkeit erfüllen.

# Wie überprüfe ich, ob meine E-Mail für AMP gültig ist?

Es gibt verschiedene Möglichkeiten, um eine E-Mail als gültige AMP E-Mail zu validieren. Alle führen zum gleichen Ergebnis. Du kannst die Variante wählen, die am besten zu deinem Entwicklungsstil passt!

## Webbasierter Validator

Der [webbasierte AMP Validator](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) unterstützt die Plattform AMP für E-Mail. Verwende den webbasierten Validator, indem du deine AMP E-Mail in das Tool einfügst. Alle Validierungsfehler werden direkt inline markiert.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Bild eines webbasierten E-Mail Validators' ) }}

## Befehlszeilenvalidator

Du kannst AMP E-Mail Dateien mit dem [Befehlszeilentool AMP HTML Validator](https://www.npmjs.com/package/amphtml-validator) überprüfen.

### Installation

1. Stelle sicher, dass du [Node.js mit dem Paketmanager 'npm'](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in deinem System hast.
2. Installiere das Befehlszeilentool AMP HTML Validator mithilfe des folgenden Befehls: `npm install -g amphtml-validator`.

### Verwendung

Nachdem du das Befehlszeilentool installiert hast, ersetze im folgenden Befehl `<amphtml file>` durch deine Datei mit dem Inhalt der AMP E-Mail und führe ihn aus.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Wenn die E-Mail gültig ist, zeigt das Befehlszeilentool das Ergebnis `PASS`. Wenn sie ungültig ist, wird sie mit den gefundenen Fehlern zurückgegeben.

## AMP Playground

Du kannst AMP E-Mails auch mit dem [AMP Playground](https://playground.amp.dev/?runtime=amp4email) validieren. Füge ähnlich wie beim webbasierten Validator deine AMP E-Mail in das Tool ein. Der Playground markiert alle Validierungsfehler direkt inline.

### Validiere zugestellte E-Mails

Deine zugestellten AMP E-Mails können ungültig sein, obwohl das von dir erstellte E-Mail Markup bereits mithilfe der auf dieser Seite dokumentierten Tools überprüft wurde. Der häufigste Grund dafür ist, dass dein [ESP](https://amp.dev/support/faq/email-support/) dein E-Mail Markup geändert und ungültig gemacht hat, nachdem du deine E-Mail zur Zustellung an dein ESP gesendet hast. Wenn du als ESP beispielsweise SparkPost verwendest und keine HTTPS Tracking Pixel mit SparkPost konfiguriert hast, fügt SparkPost ein unsicheres HTTP Tracking Pixel zu deiner E-Mail hinzu. Da AMP E-Mails nur HTTPS Bilder zulassen, wird deine AMP E-Mail dadurch ungültig.

Um zu überprüfen, ob eine an deinen Posteingang gesendete E-Mail für AMP gültig ist:

1. [Lade die AMP E-Mail als eine `.eml` Datei](https://www.codetwo.com/kb/export-email-to-file) von deinem E-Mail Client herunter.
2. Öffne den [AMP Playground](https://playground.amp.dev/?runtime=amp4email).
3. Klicke auf "IMPORT EMAIL" und wähle die eben heruntergeladene `.eml` Datei aus.

Der Playground importiert die heruntergeladene AMP E-Mail in den Inline Editor und markiert alle Validierungsfehler.

# Was passiert, wenn meine E-Mail nicht gültig ist?

Der AMP Validator vereinfacht nicht nur die Entwicklung. Da E-Mail Anbieter, die AMP E-Mails unterstützen, automatisch auf die bereitgestellten HTML oder Nur-Text MIME Typen zurückgreifen, sollte eine AMP E-Mail nur gesendet werden, nachdem sie erfolgreich mit dem Validator überprüft wurde.
