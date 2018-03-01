---
$title: Testkomponenten
---

[AMP-Testkomponenten](https://github.com/ampproject/amphtml/tree/master/tools/experiments) sind veröffentlichte Funktionen, die noch nicht zur allgemeinen Nutzung bereitgestellt wurden. Aus diesem Grund werden sie durch den Teststatus geschützt.

Entwickler und Nutzer können der Nutzung dieser Funktionen zustimmen, um sie auszuprobieren, bevor sie für die Öffentlichkeit freigegeben werden.
Die Nutzer sollten beim Einsatz dieser Komponenten aber Vorsicht walten lassen, weil die Funktionen Fehler enthalten oder unerwartete Nebeneffekte haben können.

## AMP-Dev-Version aktivieren

Mit dem Channel für die AMP-Dev-Version wird dafür gesorgt, dass ein Browser eine aktuellere Version der AMP-JS-Bibliotheken verwendet.

Um den Channel der AMP-Dev-Version für Ihren Browser zu aktivieren, rufen Sie die [Seite für AMP-Tests](https://cdn.ampproject.org/experiments.html) auf und aktivieren Sie den Test "AMP-Dev-Version".

## Testkomponente aktivieren

Inhalte aus [https://cdn.ampproject.org](https://cdn.ampproject.org) finden Sie auf der [Seite für AMP-Tests](https://cdn.ampproject.org/experiments.html). Dort können Sie die einzelnen Testkomponenten aktivieren oder deaktivieren. Durch die Aktivierung wird ein Cookie in Ihrem Browser gesetzt, durch den der Test für alle AMP-Seiten aktiviert wird, die über den AMP-Cache von Google bereitgestellt werden.

Für Inhalte aus anderen Domains können die Tests in der DevTools-Konsole wie folgt aktiviert oder deaktiviert werden, wenn der Entwicklungsmodus aktiviert ist:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Bei AMP-Dateien mit Testfunktionen [schlägt die AMP-Validierung fehl](/de/docs/guides/debug/validate.html).
Bei produktionsbereiten AMP-Dokumenten müssen die Testkomponenten entfernt werden.
