---
"$title": Validate AMP Emails
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

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Befehlszeilenvalidator

You can validate AMP Emails files by using the [AMP HTML validator command line tool](https://www.npmjs.com/package/amphtml-validator).

### Installation

1. Make sure you have [Node.js with its package manager 'npm' ](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)on your system.
2. Install the AMP HTML validator command line tool by running the following command: `npm install -g amphtml-validator`.

### Verwendung

After installing the command-line tool, run the following command after replacing `<amphtml file>` with your file containing the AMP Email content.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Wenn die E-Mail gültig ist, zeigt das Befehlszeilentool das Ergebnis `PASS`. Wenn sie ungültig ist, wird sie mit den gefundenen Fehlern zurückgegeben.

## AMP Playground

You can also validate AMP Emails using the [AMP playground](https://playground.amp.dev/?runtime=amp4email). Similar to the web-based validator, paste your AMP Email into the tool, and the playground will flag any validator errors directly inline.

### Validiere zugestellte E-Mails

Deine zugestellten AMP E-Mails können ungültig sein, obwohl das von dir erstellte E-Mail Markup bereits mithilfe der auf dieser Seite dokumentierten Tools überprüft wurde. Der häufigste Grund dafür ist, dass dein [ESP](https://amp.dev/support/faq/email-support/) dein E-Mail Markup geändert und ungültig gemacht hat, nachdem du deine E-Mail zur Zustellung an dein ESP gesendet hast. Wenn du als ESP beispielsweise SparkPost verwendest und keine HTTPS Tracking Pixel mit SparkPost konfiguriert hast, fügt SparkPost ein unsicheres HTTP Tracking Pixel zu deiner E-Mail hinzu. Da AMP E-Mails nur HTTPS Bilder zulassen, wird deine AMP E-Mail dadurch ungültig.

Um zu überprüfen, ob eine an deinen Posteingang gesendete E-Mail für AMP gültig ist:

1. [Lade die AMP E-Mail als eine `.eml` Datei](https://www.codetwo.com/kb/export-email-to-file) von deinem E-Mail Client herunter.
2. Öffne den [AMP Playground](https://playground.amp.dev/?runtime=amp4email).
3. Klicke auf "IMPORT EMAIL" und wähle die eben heruntergeladene `.eml` Datei aus.

Der Playground importiert die heruntergeladene AMP E-Mail in den Inline Editor und markiert alle Validierungsfehler.

# Was passiert, wenn meine E-Mail nicht gültig ist?

The AMP Validator isn't just a convenience for you during development, email providers supporting AMP Emails will automatically fallback to the provided HTML or Plain Text MIME types. An AMP Email should only be sent if it passes the validator.
