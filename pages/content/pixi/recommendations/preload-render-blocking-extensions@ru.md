---
$title: Выполняйте предварительную загрузку компонентов, блокирующих рендеринг
$order: 40
tags:
- lcp
- fid
---

Чтобы сократить задержку перед отображением контента, используйте предварительную загрузку компонентов, которые могут блокировать первый проход рендеринга. В число компонентов, блокирующих рендеринг, входят [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) и [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Чтобы включить их предварительную загрузку, добавьте атрибут `rel="preload"` в тег импорта соответствующего скрипта:

```
<link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
```

При использовании [AMP-оптимизатора](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) атрибут добавляется автоматически.
