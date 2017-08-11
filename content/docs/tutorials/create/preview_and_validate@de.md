---
$title: In der Vorschau ansehen und validieren
---

Sie können sich Ihre AMP-Seite genau wie jede andere statische HTML-Seite in der Vorschau ansehen. Dazu ist weder ein Build-Schritt noch eine Vorverarbeitung nötig. Sie haben folgende Möglichkeiten:

  - **Direkt im Browser über das Dateisystem öffnen.** Bestimmte Elemente funktionieren aufgrund von Fehlern bei XMLHttpRequests eventuell nicht.
  - **Lokalen Webserver wie Apache 2 oder Nginx verwenden.**
    *Tipp: Einen schnellen Webserver erhalten Sie durch Ausführen von `python -m SimpleHTTPServer`.*

Als Nächstes müssen Sie sich vergewissern, dass **Ihre AMP-Seite gültig ist**, da sie sonst von Drittanbieter-Plattformen wie der Google-Suche nicht gefunden und angezeigt werden kann. So validieren Sie Ihre AMP-Seite:

  1. Öffnen Sie die Seite im Browser.
  1. Fügen Sie "`#development=1`" an die URL an, also z. B. `http://localhost:8000/released.amp.html#development=1`.
  1. Öffnen Sie die [Chrome DevTools-Konsole](https://developers.google.com/web/tools/chrome-devtools/debug/console/) und prüfen Sie, ob Validierungsfehler vorliegen.
</ol>

[Lesen Sie hier mehr über die Validierung](/de/docs/guides/debug/validate.html) und was Sie bei Fehlern tun können.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/de/docs/tutorials/create/presentation_layout.html"><span class="arrow-prev">Bisherige</span></a>
  <a class="button next-button" href="/de/docs/tutorials/create/prepare_for_discovery.html"><span class="arrow-next">Nächster</span></a>
</div>
