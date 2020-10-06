---
$title: Lade Webschriftarten vor
$order: 140
tags:
- lcp
---

Durch das Vorladen kannst du dem Browser so schnell wie möglich mitteilen, welche wichtigen Ressourcen du laden möchtest. Und zwar noch bevor diese in HTML erkannt werden! Dies ist besonders nützlich für Ressourcen, die im ersten Viewport und auf der gesamten Seite verwendet werden, z. B. Schriftarten. Füge dazu diesen Ressourcen das Attribut `rel="preload"` hinzu, wie im Folgenden gezeigt wird:

```
&lt;link href="font.woff2" rel="preload"&gt;
```
