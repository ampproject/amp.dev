---
'$title': Vorschau und Validierung
$order: 5
description: Zeige eine Vorschau der AMP Seite an, genau wie du eine Vorschau einer anderen, statischen HTML Website anzeigen würdest. Building oder Vorverarbeitung sind nicht …
author: pbakaus
contributors:
  - bpaduch
---

## Vorschau

Zeige eine Vorschau der AMP Seite an, genau wie du eine Vorschau einer anderen, statischen HTML Website anzeigen würdest. Building oder Vorverarbeitung sind nicht erforderlich. Es gibt folgende Möglichkeiten:

- **Öffne die Seite direkt im Browser aus dem Dateisystem** (möglicherweise funktionieren bestimmte Elemente nicht, da XMLHttpRequests fehlschlägt).
- **Verwende einen lokalen Webserver wie Apache 2 oder Nginx**. _(Tipp: Um schnell einen einfachen Webserver zu erstellen, führe `python -m SimpleHTTPServer` aus.)_

## Validierung

Stelle dann sicher, dass deine AMP Seite **tatsächlich als AMP gültig ist**. Andernfalls wird sie von Drittanbieterplattformen wie der Google-Suche nicht erkannt und verbreitet. Um zu validieren:

1. Öffne deine Seite in deinem Browser.
2. Füge "`#development=1`" zur URL hinzu, z. B. `http://localhost:8000/released.amp.html#development=1`.
3. Öffne die [Chrome DevTools Konsole](https://developers.google.com/web/tools/chrome-devtools/debug/console/) und suche nach Validierungsfehlern.

[tip type="read-on"] **ERFAHRE MEHR:** [Erfahre mehr über die Validierung](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) und Fehlerbehebung. [/tip]
