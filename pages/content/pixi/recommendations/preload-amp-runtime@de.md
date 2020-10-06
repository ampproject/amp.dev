---
$title: Lade AMP Runtime vor
$order: 30
tags:
- lcp
- fid
---

Das Vorladen der erforderlichen Assets verbessert die Leistung: Es wird sichergestellt, dass sie sofort verfügbar sind. Eine AMP Seite erfordert das JavaScript des Frameworks. Stelle daher sicher, dass es vorgeladen wird. Verwende einen [AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/), um deiner Seite automatisch oder manuell Folgendes hinzuzufügen:

```
&lt;link as=script href=https://cdn.ampproject.org/v0.js rel=preload&gt;
```
