---
$title: Ładowanie wstępne środowiska uruchomieniowego AMP
$order: 30
tags:
- lcp
- fid
---

Wstępne załadowanie niezbędnych zasobów poprawia wydajność poprzez zapewnienie ich dostępności w pierwszej kolejności. Strona AMP wymaga frameworku JavaScript, upewnij się więc, że jest on ładowany wstępnie! Użyj [optymalizatora AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/), aby automatycznie dodać następujący kod do strony albo dodaj go ręcznie:

```
<link as=script href=https://ampjs.org/v0.js rel=preload>
```
