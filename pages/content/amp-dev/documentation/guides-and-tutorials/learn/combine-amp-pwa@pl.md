---
'$title': Związek AMP z PWA
$order: 7
description: Progresywne aplikacje webowe i strony AMP świetnie ze sobą współpracują. W rzeczywistości, w wielu przypadkach uzupełniają się one w ten czy inny sposób. Naucz się jak...
formats:
  - websites
components:
  - youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Obejrzyj wstęp do łączenia AMP z PWA.']

Progresywne aplikacje webowe i strony AMP świetnie ze sobą współpracują. W rzeczywistości, w wielu przypadkach uzupełniają się one w ten czy inny sposób. Naucz się jak:

1. [Włączyć funkcje PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) dla swoich stron AMP
2. Tworzyć [atrakcyjne, superszybkie dla użytkownika przejścia](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) z AMP do PWA
3. [Uprościć PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md), wykorzystując możliwości AMP

[tip type="note"]

Dowiedz się więcej o [progresywnych aplikacjach webowych](https://developers.google.com/web/progressive-web-apps/) w witrynie poświęconej podstawom internetowym.

[/tip]

## Strony AMP z funkcjami PWA

Strony AMP mogą korzystać z wielu funkcji PWA samodzielnie, pod warunkiem, że są serwowane z Twojego źródła pochodzenia (domeny Twojej witryny), a nie z serwerów buforujących AMP Cache. To znaczy, że funkcje PWA nie będą działać w razie pobrania strony AMP z platform takich, jak Google czy Bing, ale będą działać po przejściu dalej lub gdy użytkownicy będą przechodzić bezpośrednio do stron AMP.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się jak [włączyć funkcje PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) dla swoich stron AMP. [/tip]

## AMP jako punkt wejścia do PWA

Unikalną zaletą AMP jest **niemal natychmiastowe pobieranie zawartości**, co sprawia, że AMP idealnie nadaje się do pierwszej interakcji użytkownika z witryną. _Progresywne aplikacje webowe_ umożliwiają **znacznie większą interaktywność i zapewniają funkcje zwiększające zaangażowanie**, ale ich pierwsze ładowanie jest utrudnione ze względu na fakt, że Service Worker witryny, a zatem jej zasoby i powłoka aplikacji, przyspieszają pobieranie dopiero przy kolejnych załadowaniach.

Dobrą strategią jest uczynienie strony AMP punktem wejścia do witryny, a następnie przejście do PWA po jej przygotowaniu za kulisami.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się jak [podłączyć AMP do PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) za pomocą składnika [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md). [/tip]

## AMP jako źródło danych PWA

Jedną z głównych cech stron AMP jest łatwość i bezpieczeństwo ich osadzania, dlatego też coraz więcej platform chętnie je rozpowszechnia i obsługuje.

Jeśli tworzysz progresywne aplikacje webowe, możesz osiągnąć te same korzyści i radykalnie zmniejszyć złożoność zaplecza jak i klienta poprzez **ponowne użycie stron AMP jako źródła danych aplikacji PWA**.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się jak [używać stron AMP w aplikacji PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md). [/tip]
