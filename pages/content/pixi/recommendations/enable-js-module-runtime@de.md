---
$title: Verwende die JavaScript Modulversion von AMP Runtime
$order: 25
tags:
- lcp
- fid
---

Es ist wichtig, deine Benutzer und ihre Bandbreite zu berücksichtigen. Die Verwendung von [JavaScript Modulen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) kann die Leistung deiner Seite in modernen Webbrowsern wesentlich verbessern. Du kannst dich für die JavaScript Modulversion von AMP Runtime sowie für AMP Komponenten entscheiden, indem du das Flag [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) mit der neuesten Version von [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) verwendest. Wenn du deine Implementierung auf dem neuesten Stand hältst, werden JavaScript Programme in separate Module aufgeteilt und es werden nur die benötigten Module importiert! Bitte beachte, dass die Verwendung dieser Funktion deine AMP Seite ungültig macht, da diese Funktion experimentell (bald verfügbar!) ist.
