---
'$title': Experimentelle Funktionen aktivieren
$order: 3
description: Experimentelle AMP Komponenten sind veröffentlichte Funktionen, die noch nicht für den breiten Einsatz bereit sind. Zur Sicherheit tragen sie daher den Status "geschützt".
formats:
  - websites
  - stories
  - ads
---

[Experimentelle AMP Komponenten](https://github.com/ampproject/amphtml/tree/master/tools/experiments) sind veröffentlichte Funktionen, die noch nicht für den breiten Einsatz bereit sind. Zur Sicherheit tragen sie daher den Status **geschützt**.

Entwickler und Benutzer können der Nutzung dieser Funktionen zustimmen, noch bevor sie vollständig freigegeben werden. Sie sollten jedoch mit Vorsicht zum Einsatz kommen, da sie Fehler verursachen oder unerwartete Nebenwirkungen haben können.

[tip type="important"] Es ist durchaus möglich, dass einige dieser Experimente niemals als Funktionen im AMP Projekt veröffentlicht werden. [/tip]

{% set experimental_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('experimental')|list %} {% if experimental_components|length %} Nachfolgend findest du eine Liste mit Komponenten, die bereits unter dem Status "experimentell" verfügbar sind und von Entwicklern unter Berücksichtigung des Benutzerfeedbacks getestet werden können:

<ul><br>{% for component in experimental_components %}<br>  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li><br>{% endfor %}<br></ul><br>{% endif %}

## Teste den AMP Dev Channel

Der AMP Dev Channel bietet die Möglichkeit, Browser mit einer neueren Version der AMP JS Bibliotheken auszustatten.

Das AMP Dev Channel Release ist **möglicherweise weniger stabil** und kann Funktionen enthalten, die nicht allen Benutzern zur Verfügung stehen. Aktiviere diese Option, wenn du uns dabei unterstützen möchtest, neue AMP Versionen zu testen, Bugs zu melden oder Dokumente zu erstellen, für die neue, noch nicht für alle verfügbare Funktionen erforderlich sind.

Dein Opt-in beim Dev Channel erlaubt dir:

- neue Funktionen auszuprobieren, die noch nicht allen Benutzern zur Verfügung stehen,
- mithilfe von Qualitätssicherung (QA) sicherzustellen, dass deine Website mit der nächsten Version von AMP kompatibel ist.

Wenn du ein Problem findest, das nur in der Dev Channel Version von AMP aufzutreten scheint, [erstelle ein Issue](https://github.com/ampproject/amphtml/issues/new) mit einer Beschreibung des Problems. Vergiss nicht, die URL der Seite anzugeben, auf der das Problem auftritt.

Um den AMP Dev Channel für deinen Browser zu aktivieren, wechsle zur [Seite mit AMP Experimenten](https://cdn.ampproject.org/experiments.html) und aktiviere das Experiment "AMP Dev Channel". Wenn du über wichtige und kritische Änderungen an AMP informiert werden möchtest, abonniere die Mailingliste [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Experimentelle Komponente aktivieren

#### Bereitgestellt von cdn.ampproject.org

Bei Inhalten, die von `https://*.cdn.ampproject.org` bereitgestellt werden, musst du zu `/experiments.html` auf einer Google AMP Cache Subdomain wechseln und die gewünschte experimentelle Komponente aktivieren oder deaktivieren.

Um zum Beispiel Experimente auf AMP Seiten im Cache zu aktivieren, deren Quelle `www.example.com` ist, wechsle zu `www-example-com.cdn.ampproject.org/experiments.html`.

Deine Opt-ins bei Experimenten werden unter `localStorage` gespeichert. Es wird jeweils nur das Experiment auf AMP Seiten aktiviert, die von der aktuellen Domain bereitgestellt werden.

#### Bereitgestellt von anderen Domains

Für Inhalte, die von nicht-CDN Domänen bereitgestellt werden, können Experimente mit dem folgenden Befehl in der devtools Konsole umgeschaltet werden:

```js
AMP.toggleExperiment('experiment');
```

Für jede AMP Datei, die experimentelle Funktionen enthält, schlägt die [AMP Validierung](validation-workflow/validate_amp.md) fehl. Entferne die experimentellen Komponenten für produktionsfertige AMP Dokumente.

## Experiment für ein bestimmtes Dokument aktivieren

Für Dokumente sind Opt-ins bei bestimmten Experimenten möglich. Platziere dazu ein Meta Tag mit dem Namen `amp-experiments-opt-in` im Kopf des HTML Dokuments vor deinem AMP Skript (`https://cdn.ampproject.org/v0.js`). Sein Inhaltswert ist eine kommagetrennte Abfolge von Strings mit den Experiment IDs, die aktiviert werden sollen.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b" />
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  ...
</head>
```

Auf diese Weise werden die angegebenen Experimente für alle Besucher des Dokuments aktiviert. Allerdings erlauben nicht alle Experimente eine Aktivierung auf Dokumentebene. Eine vollständige Liste mit zulässigen Experimenten findest du im Attribut `allow-doc-opt-in` in der Datei [`prod-config.json`](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/prod-config.json) des Projekts. Beachte, dass das Opt-in für das Dokument vom Opt-out der Benutzer außer Kraft gesetzt werden kann.

## Origin Trials

Mithilfe von [Origin Trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md) können Entwickler eine experimentelle Funktion in der Produktionsumgebung testen und wichtiges Feedback erhalten.

Traditionell kann eine Funktion experimentellen Modus während der Entwicklung verwendet werden, aber nicht in die Produktionsphase übergehen. Mithilfe von Origin Trials können sich interessierte Entwickler dazu entscheiden, eine experimentelle Funktion in die Produktion zu übernehmen. Dabei ist Folgendes zu erwarten:

- Der Test ist zeitlich begrenzt.
- Die Funktion wird nach den Origin Trials höchstwahrscheinlich Änderungen unterworfen werden.

Origin Trials die Möglichkeit, eine neue Funktion zu implementieren und zu nutzen, bevor sie endgültig live ist. Die Funktion befindet sich auf der Website des Entwicklers und gilt nicht mehr als "experimentell". Das Feedback kann die Weiterentwicklung der Funktion direkt beeinflussen.

{% set trial_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('origin_trial')|list %} {% if trial_components|length %} Die Komponenten in der folgenden Liste können mittels Origin Trial getestet werden:

<ul><br>{% for component in trial_components %}<br>  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li><br>{% endfor %}<br></ul><br>{% endif %}

### Origin Trial aktivieren

Füge auf jeder Seite, die am Origin Trial teilnimmt, das folgende Tag vom Typ `<meta>` innerhalb von `<head>` ein:

```html
<meta name="amp-experiment-token" content="{copy your token here}" />
```

Bitte beachte: `"amp-experiment-token"` bedeutet hier die Literalzeichenfolge `"amp-experiment-token"`. Es sind weder das Token selbst (dieses wird im Attribut "content" platziert) noch der Name des Experiments gemeint.
