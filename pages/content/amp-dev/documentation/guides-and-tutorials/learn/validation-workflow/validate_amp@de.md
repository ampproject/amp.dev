---
"$title": Validierung von AMP Seiten
"$order": '0'
description: 'Sieh dir dieses Video über die verfügbaren Validierungsmethoden an. AMP besitzt mehrere Hauptstärken: Deine Seiten sind nicht nur schnell, sondern deine …'
formats:
- websites
- stories
- ads
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Sieh dir dieses Video über die verfügbaren Validierungsmethoden an.']

AMP besitzt mehrere Hauptstärken: Deine Seiten sind nicht nur schnell, sondern deine schnellen Seiten können auch *validiert* werden. Dies bietet Dritten wie Twitter, Instagram oder der Google-Suche großartige Möglichkeiten, ihren Lesern AMP Seiten auf immer interessantere Arten bereitzustellen.

## Wie überprüfe ich, ob meine Seite für AMP gültig ist?

Es gibt verschiedene Möglichkeiten, ein AMP Dokument zu validieren. Sie führen alle zum gleichen Ergebnis. Verwende die Variante, die am besten zu deinem Entwicklungsstil passt.

Vielleicht möchtest du neben der AMP Gültigkeit auch überprüfen, ob dein AMP Dokument für Drittanbieterplattformen [auffindbar](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) ist.

### Entwicklerkonsole des Browsers

Der AMP Validator ist mit der AMP JS Bibliothek verbunden, sodass er sofort auf jeder AMP Seite verfügbar ist. Um zu validieren:

1. Öffne deine AMP Seite in deinem Browser.
2. Füge "`#development=[1,actions,amp,amp4ads,amp4email]`" zu der URL hinzu. Beispielsweise wird `http://localhost:8000/released.amp.html#development=1` verwendet, um das `AMP` Format zu validieren. Die URL `http://localhost:8000/released.amp.html#development=amp4email` validiert das Dokument anhand der Spezifikation von AMP für E-Mail.
3. Öffne die [Chrome DevTools Konsole](https://developers.google.com/web/tools/chrome-devtools/debug/console/) und suche nach Validierungsfehlern.

In der Entwicklerkonsole sehen Fehler wie folgt aus:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screen grab of AMP Validator errors in chrome developer console"></amp-img>

### Webschnittstelle

Der AMP Validator kann auf <a href="https://validator.ampproject.org/">validator.ampproject.org</a> als Webschnittstelle verwendet werden. Dieses Interface zeigt Fehler inline neben der HTML Quelle der Seite an. Das Interface ist ein interaktiver Editor: Änderungen in der HTML Quelle werden interaktiv erneut validiert.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screen grab of validator.ampproject.org with error examples."></amp-img>

### Browsererweiterung

Auf den AMP Validator kannst du direkt aus der Browsersymbolleiste mithilfe einer Browsererweiterung zugreifen. Beim Surfen wird jede besuchte AMP Seite automatisch überprüft und die Gültigkeit der Seite wird durch ein farbiges Symbol angezeigt.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>Wenn auf einer AMP Seite Fehler vorhanden sind, ist das Erweiterungssymbol rot und nennt die Anzahl der aufgetretenen Fehler.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>Für eine fehlerfreie AMP Seite ist das Erweiterungssymbol grün und nennt die Anzahl der Warnungen, sofern es solche gibt.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>Wenn es eine nicht-AMP Seite ist, die Seite jedoch angibt, dass eine AMP Version verfügbar ist, ist das Symbol blau und enthält ein Linksymbol. Ein Klick auf die Erweiterung leitet den Browser zur AMP Version um.</td>
  </tr>
</table>

Erweiterung "AMP Validator" für [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) und [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### NPM Pakete für CI

Als Teil deiner Build und Test Pipelines kannst du die AMP Validierung über die AMP Validator NPM Pakete integrieren: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) oder [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (ein gulp Plugin). Du kannst das AMP Validator NPM Paket beispielsweise für Integrationstests oder in einer geplanten Aufgabe verwenden, um AMP Produktionsseiten zu überprüfen.

##### Beispiel: Validieren einer AMP HTML Datei

In diesem Beispiel validieren wir eine AMP HTML Datei mit dem NPM Paket [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). Der Validierungsstatus wird an die Konsole weitergeleitet.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  }
});
```

##### #####Beispiel: Verwendung einer gulp Aufgabe, um AMP HTML zu validieren

In diesem Beispiel haben wir eine gulp Aufgabe, die alle AMP HTML Dateien überprüft. Wenn ein AMP Validierungsfehler vorliegt, wird die Aufgabe mit einem Fehlercode (1) beendet.

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'
};

gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### Befehlszeilentool

Du kannst AMP HTML Dateien mit dem [Befehlszeilentool von AMP HTML Validator](https://www.npmjs.com/package/amphtml-validator) überprüfen.

Erste Schritte:

1. Stelle sicher, dass du [Node.js mit dem Paketmanager 'npm'](https://docs.npmjs.com/getting-started/installing-node) in deinem System hast.
2. Installiere das [Befehlszeilentool von AMP HTML Validator](https://www.npmjs.com/package/amphtml-validator). Führe dazu den Befehl `npm install -g amphtml-validator` aus.

Nun wollen wir eine echte AMP HTML Seite validieren:

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Wie erwartet ist diese Seite gültiges AMP HTML. Versuchen wir es mit einer Seite, die nicht gültig ist: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Um den Befehl `amphtml-validator` auszuführen, kannst du entweder die URL der Seite oder einen lokalen Dateinamen angeben. Lade die Datei [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) herunter, speichere sie in einer Datei und führe dann Folgendes aus:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Das Format der Fehlermeldungen besteht aus Dateiname, Zeile, Spalte und Meldung. Häufig folgt noch ein Link zur AMP HTML Referenz. Einige Editoren, einschließlich Emacs, können dieses Format interpretieren und führen direkt zu den Fehlern in der Originaldatei.

Eine geeignete Grundlage für deine eigene AMP Seite ist [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Zu den zusätzlichen Funktionen des Befehlszeilentools gehören u. a.: Deaktivieren der Farbe, Drucken der JSON Ausgabe und Ausführen einer bestimmten Version des Validator JavaScripts (standardmäßig wird das zuletzt veröffentlichte Skript ausgeführt).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## Was passiert, wenn meine Seite nicht gültig ist?

Der AMP Validator vereinfacht nicht nur Entwicklung. Er wird auch von Plattformen wie Twitter oder Google verwendet, die deine AMP Seiten in ihre Inhalte und Suchergebnisse integrieren. Außerdem fordern sie die Seiten normalerweise nicht direkt von deinem Server an, sondern nutzen den Google AMP Cache. Dieser kostenlose Dienst speichert deine Seiten in seinem Cache und macht sie weltweit verfügbar, damit sie noch schneller geladen werden.

Wenn der AMP Validierungsdienst erkennt, dass mit deiner Seite etwas nicht stimmt, wird sie von Drittanbieterwebsites nicht erkannt und verbreitet, und sie erscheint auch nicht im Google AMP Cache. Du verlierst also nicht nur die Geschwindigkeitsvorteile des Caches, sondern deine Seite wird vermutlich auch an vielen Stellen nicht angezeigt! Das wäre schade. Deshalb sollten wir entsprechende Vorkehrungen ergreifen.

## Wie behebe ich Validierungsfehler?

Die meisten Validierungsfehler lassen sich leicht erkennen und beheben. Sieh dir dieses HTML Tag an:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Es generiert diesen AMP Validierungsfehler, der in den folgenden Tools angezeigt wird:

- Entwicklerkonsole des Browsers <br><amp-img src="/static/img/docs/validator_console_imgerror.png"         width="696" height="30" layout="responsive"         alt="AMP error: The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>



- Webschnittstelle <br><amp-img src="/static/img/docs/validator_webui_imgerror.png"         width="676" height="58" layout="responsive"         alt="AMP error: The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>



- Browsererweiterung <br><amp-img src="/static/img/docs/validator_extension_imgerror.png"        width="724" height="108" layout="responsive"    alt="AMP error: The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>



Jedes Tool bietet mehrere Informationen:

1. Die Position (Zeile und Spalte) im HTML Dokument, an welcher der Fehler aufgetreten ist. In einigen Schnittstellen kann sie angeklickt werden, um diese Position hervorzuheben. In diesem Fall befindet sich der Fehler in Zeile 11, Spalte 2.
2. Eine Textzeile, die den Fehler beschreibt. In diesem Fall gibt der Text an, dass wir ein `<img>` Tag verwenden, wo eigentlich ein [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) Tag stehen muss.
3. Ein Link zu einem Dokument, das dem Fehler entspricht. In diesem Fall die Dokumentation für das [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) Tag. Nicht alle Fehler erzeugen Links zu einer Dokumentation.

Wenn du die [Spezifikation](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) genau betrachtest, siehst du, dass wir ein `<img>` Tag verwenden, wo eigentlich ein [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) Tag stehen muss.

Weitere Details zur vollständigen Liste potenzieller Fehler findest du im [Leitfaden für AMP Validierungsfehler](validation_errors.md). Wenn dir diese Informationen nicht weiterhelfen sollten, [stelle eine Frage](http://stackoverflow.com/questions/tagged/amp-html) und wir werden versuchen, dir zu helfen.
