---
$title: Używanie modułu JavaScript w wersji środowiska uruchomieniowego AMP
$order: 25
tags:
- lcp
- fid
---

Ważne jest, aby szanować swoich użytkowników i ich przepustowość. Użycie [modułów JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) może mieć ogromny pozytywny wpływ na działanie strony w nowoczesnych przeglądarkach internetowych. Możesz wybrać moduł JavaScript w wersji środowiska uruchomieniowego AMP, jak również składniki AMP, używając flagi [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) z najnowszą wersją [optymalizatora AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/). Dzięki utrzymaniu aktualności implementacji, dzielisz programy JavaScript na osobne moduły i importujesz tylko to, co jest potrzebne! Należy pamiętać, że ta funkcja jest eksperymentalna (wkrótce zostanie wprowadzona!), więc wskutek jej użycia strona AMP będzie nieprawidłowa.
