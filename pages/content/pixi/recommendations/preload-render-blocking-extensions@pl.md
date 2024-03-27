---
$title: Ładowanie wstępne elementów blokujących renderowanie
$order: 40
tags:
- lcp
- fid
---

Umożliwiaj użytkownikom zobaczenie treści i interakcje z nią tak szybko, jak to możliwe, poprzez wstępne ładowanie składników, które mogą zablokować pierwsze renderowanie. Składniki blokujące proces renderowania, na które należy zwrócić uwagę, to [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) i [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Aby ładować je wstępnie, dodaj atrybut `rel="preload"` w ich skrypcie importu:

```
<link rel="preload" as="script" href="https://ampjs.org/v0/amp-experiment-0.1.js">
```

Użyj [optymalizatora AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/), aby zrobić to automatycznie!
