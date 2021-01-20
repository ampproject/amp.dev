---
$title: Precarica il runtime AMP
$order: 30
tags:
- lcp
- fid
---

Il precaricamento delle risorse necessarie migliora le prestazioni assicurando che siano disponibili per prime. Una pagina AMP richiede JavaScript del framework, quindi assicurati che sia precaricato! Utilizza un [ottimizzatore AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) per aggiungere automaticamente quanto segue alla tua pagina, oppure fallo manualmente:

```
<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>
```
