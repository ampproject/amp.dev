---
$title: AMP-Seiten überprüfen
---
[TOC]

Das Besondere an AMP ist nicht einfach, dass es Ihre Seiten schnell macht, sondern dass es dies auf eine Weise tut, die *validiert* werden kann. Dadurch ist es für Drittanbieter wie z. B. Twitter, Instagram oder die Google-Suche attraktiv, AMP-Seiten für Leser auf zunehmend interessantere Weise bereitzustellen.

## Wie kann ich prüfen, ob meine AMP-Seite gültig ist?

Es gibt verschiedene Möglichkeiten zur Überprüfung eines AMP-Dokuments. Sie alle führen zum selben Ergebnis. Wählen Sie also einfach jene, die am besten zu Ihrem Entwicklungsstil passt.

Neben der AMP-Gültigkeit ist es für Sie vielleicht auch sinnvoll zu prüfen, ob Ihr AMP-Dokument auf Drittanbieterplattformen [auffindbar](/de/docs/guides/discovery.html) ist.

### Entwicklerkonsole des Browsers

Das AMP-Validierungstool wird zusammen mit der AMP-JS-Bibliothek bereitgestellt, sodass diese standardmäßig auf jeder AMP-Seite verfügbar ist. So validieren Sie Ihre AMP-Seite:

  1. Öffnen Sie Ihre AMP-Seite im Browser.
  1. Hängen Sie "`#development=1`" an die URL an, z. B. `http://localhost:8080/released.amp.html#development=1`.
  1. Öffnen Sie die [Chrome Developer Tools-Konsole](https://developers.google.com/web/tools/chrome-devtools/debug/console/) und prüfen Sie, ob Validierungsfehler vorliegen.

Fehler sehen in der Developer Console etwa so aus:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screenshot der Chrome-Entwicklerkonsole mit vom AMP-Validierungstool gefundenen Fehlern"></amp-img>


### Weboberfläche

Das AMP-Validierungstool kann unter [validator.ampproject.org](https://validator.ampproject.org/) als Weboberfläche verwendet werden. In dieser Benutzeroberfläche werden Fehler inline im HTML-Quellcode der Seite angezeigt.
Es handelt sich dabei um einen interaktiven Editor: Bei Änderungen am HTML-Quellcode wird erneut eine interaktive Überprüfung durchgeführt.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screenshot von validator.ampproject.org mit Fehlerbeispielen"></amp-img>


### Browsererweiterung

Mithilfe einer Browsererweiterung kann direkt über die Symbolleiste Ihres Browsers auf das AMP-Validierungstool zugegriffen werden. Während Sie surfen, überprüft es automatisch jede aufgerufene AMP-Seite und gibt über ein farbiges Symbol an, ob die Seite gültig ist.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Rotes AMP-Symbol zur Kennzeichnung eines ungültigen AMP-Dokuments">
      </amp-img> 
    </td>
    <td>Wenn eine AMP-Seite Fehler aufweist, wird das Symbol der Erweiterung in Rot zusammen mit der Anzahl der gefundenen Fehler angezeigt.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Gelbes AMP-Symbol zur Kennzeichnung eines gültigen AMP-Dokuments">
      </amp-img>
    </td>
    <td>Bei einer fehlerfreien AMP-Seite erscheint das Symbol in Grün und es wird gegebenenfalls die Anzahl der Warnungen angegeben.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blaues AMP-Symbol zur Kennzeichnung einer AMP-HTML-Variante im Fall eines Klicks">
      </amp-img>
    </td>
    <td>Wenn es sich nicht um eine AMP-Seite handelt, aber die Webseite mitteilt, dass eine AMP-Version verfügbar ist, erscheint das Symbol in Blau zusammen mit einem Linksymbol, über das die AMP-Version aufgerufen werden kann.
    </td>
  </tr>
</table>

[Browsererweiterung für das AMP-Validierungstool für Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) und [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)

### Befehlszeilentool

Es kann erforderlich sein, dass Sie <a href="https://docs.npmjs.com/getting-started/installing-node">auf Ihrem System Node.js mit seinem Paketmanager `npm` installieren</a>.

Wenn Sie das [Befehlszeilentool des AMP-HTML-Validierungstools](https://www.npmjs.com/package/amphtml-validator) installieren möchten, geben Sie `npm install -g amphtml-validator` ein.

Als Nächstes wird eine echte AMP-HTML-Seite validiert:

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

Wie zu erwarten, handelt es sich bei dieser Seite um gültiges AMP-HTML. Deshalb wird nun die Überprüfung mit einer Seite wiederholt, die nicht gültig ist: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Zur Ausführung des Befehls `amphtml-validator` können Sie entweder die URL der Seite oder den Namen einer lokalen Datei bereitstellen. Laden Sie [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) als Datei herunter und führen Sie Folgendes aus:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

Das Format der Fehlermeldungen besteht aus Dateiname, Zeile, Spalte sowie der eigentlichen Meldung, oft gefolgt von einem Link zur AMP-HTML-Referenz. Manche Editoren, einschließlich Emacs (siehe Kompilierbefehl und Kompilierungsmodus), können dieses Format interpretieren und Ihnen ermöglichen, zu den Fehlern in der Originaldatei zu springen.

Ein guter Ausgangspunkt zum Erstellen einer eigenen AMP-Seite ist z. B. [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Das Befehlszeilentool bietet zusätzliche Funktionen wie das Deaktivieren der Farbe, das Drucken der JSON-Ausgabe oder das Ausführen einer bestimmten Version des JavaScript-Codes des Validierungstools. Standardmäßig wird das neueste veröffentlichte Skript ausgeführt.

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

## Was geschieht, wenn meine Seite ungültig ist?

Das AMP-Validierungstool ist nicht nur ein praktisches Hilfsmittel bei der Entwicklung. Es wird auch von Plattformen wie Twitter und Google verwendet, die Ihre AMP-Seiten in ihre Inhalte und Suchergebnisse integrieren. Meist fordern sie die Seiten nicht direkt von Ihrem Server an, sondern verwenden den Google-AMP-Cache. Dies ist ein kostenloser Dienst, mit dem Ihre Seiten im Cache gespeichert und überall auf der Welt bereitgestellt werden, damit sie noch schneller geladen werden können.

Wenn der AMP-Validierungsdienst erkennt, dass Ihre Seite fehlerhaft ist, wird sie von Drittanbieterwebsites nicht gefunden und bereitgestellt und erscheint nicht im Google-AMP-Cache. Damit entgehen Ihnen nicht nur die Geschwindigkeitsvorteile des Caches, sondern Ihre Seite ist wahrscheinlich auch an vielen anderen Stellen nicht sichtbar. Darum sollten Fehler unbedingt vermieden werden.

## Wie behebe ich Validierungsfehler?

Die meisten Validierungsfehler können leicht behoben werden. Sehen Sie sich dieses HTML-Tag an:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Es verursacht einen AMP-Validierungsfehler, der in verschiedenen Tools wie folgt angezeigt wird:

 * Entwicklerkonsole des Browsers
<amp-img alt="Das Tag &quot;img&quot; ist nur als Nachfolgerelement des Tags &quot;noscript&quot; zulässig.Meinten Sie &quot;amp-img&quot;? Zeile 11, Spalte 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive">
</amp-img>

 * Weboberfläche
<amp-img alt="Das Tag &quot;img&quot; ist nur als Nachfolgerelement des Tags &quot;noscript&quot; zulässig.Meinten Sie &quot;amp-img&quot;? Zeile 11, Spalte 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive">
</amp-img>

* Browsererweiterung
<amp-img alt="Das Tag &quot;img&quot; ist nur als Nachfolgerelement des Tags &quot;noscript&quot; zulässig.Meinten Sie &quot;amp-img&quot;? Zeile 11, Spalte 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive">
</amp-img>

Jedes dieser Tools stellt diverse Informationen bereit:

  1. Die Position des Fehlers im HTML-Dokument in Form von Zeile und Spalte. In manchen Benutzeroberflächen kann die Stelle durch Klicken darauf hervorgehoben werden. In diesem Fall tritt das Problem in Zeile 11, Spalte 2 auf.
  1. Eine Textzeile zur Beschreibung des Fehlers. In diesem Fall weist der Text darauf hin, dass fälschlicherweise ein `<img>`-Tag statt eines `<amp-img>`-Tags verwendet wird.
  1. Ein Link zu einem für den Fehler relevanten Dokument. In diesem Fall ist dies die Dokumentation zum `<amp-img>`-Tag. Es werden aber nicht für alle Fehler Dokumentationslinks bereitgestellt.

Beim genauen Nachlesen der Spezifikation erkennen wir, dass wir versehentlich ein `<img>`-Tag statt eines `<amp-img>`-Tags verwendet haben.

Ausführliche Informationen zur vollständigen Liste potenzieller Fehler finden Sie im [Leitfaden zu AMP-Validierungsfehlern](/de/docs/reference/validation_errors.html).
Wenn Sie aber auch trotz sorgfältiger Untersuchung des Problems nicht weiterkommen, [fragen Sie uns](http://stackoverflow.com/questions/tagged/amp-html). Wir sind Ihnen gern behilflich.
