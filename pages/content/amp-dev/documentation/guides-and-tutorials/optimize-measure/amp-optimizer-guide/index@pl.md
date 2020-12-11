---
"$title": Używanie optymalizatora AMP
"$order": '2'
"$hidden": 'true'
description: Optymalizatory AMP to narzędzia, które wprowadzają optymalizacje serwerów buforujących AMP do Twojej własnej witryny. Używanie optymalizatora AMP jest kluczem do utworzenia świetnie działającej strony i osiągnięcia zgodności z wymogami dotyczącymi wskaźników Core Web Vitals. Ten przewodnik wyjaśnia, jak najlepiej wykorzystać optymalizator AMP do optymalizacji stron AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Optymalizatory AMP to narzędzia, które wprowadzają optymalizacje serwerów buforujących AMP do Twojej własnej witryny. Używanie optymalizatora AMP jest kluczem do utworzenia [świetnie działającej strony](https://developers.google.com/search/docs/guides/page-experience) i osiągnięcia zgodności z wymogami dotyczącymi wskaźników [Core Web Vitals](https://web.dev/vitals/).  Aby dowiedzieć się więcej o działaniu optymalizatora AMP, sprawdź nasz [szczegółowy przewodnik po optymalizacjach AMP](explainer.md).

## Czy AMP nie jest już wystarczająco szybki?

Może się zastanawiasz: chwileczkę — czy AMP nie powinien być od razu szybki? Masz rację: środowisko uruchomieniowe AMP jest zoptymalizowane pod względem szybkości i wszystkie prawidłowe strony AMP są ładowane szybko. Są jednak dodatkowe optymalizacje wydajności, które można zaimplementować na swoim serwerze, aby umożliwić przeglądarce jeszcze szybsze ładowanie stron AMP.

Na początku większość stron AMP serwowały serwery buforujące AMP. Przeprowadzały one dodatkowe optymalizacje na stronach, aby zagwarantować dobre wrażenia użytkowników. Z czasem jednak coraz powszechnie zaczęło udostępniać linki do stron AMP, a programiści zaczęli tworzyć całe witryny za pomocą AMP. Dlatego też zespół AMP rozpoczął prace nad optymalizatorami AMP, które umożliwią wszystkim serwowanie stron AMP z własnego źródła z wydajnością serwerów buforujących AMP.

## Integrowanie optymalizatora AMP

Optymalizatora AMP można używać na trzy sposoby:

1. Używając generatora witryn lub systemu CMS z wbudowaną integracją optymalizatora.
2. Integrując optymalizator AMP ze swoim systemem programistycznym lub serwerem.
3. Integrując optymalizator AMP ze swoim środowiskiem hostingowym.

### Systemy CMS i generatory witryn

Najlepszym sposobem publikacji zoptymalizowanego AMP jest użycie generatora witryny lub CMS z wbudowaną obsługą optymalizatora AMP. W tym przypadku strony AMP będą optymalizowane automatycznie. Obecnie optymalizator AMP jest zintegrowany z następującymi generatorami witryn i systemami CMS:

- [WordPress](https://wordpress.org/) za pośrednictwem [wtyczki AMP WordPress](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) za pomocą składnika [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Chcesz dodać swoje?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Kompilacje niestandardowe lub integracje z serwerem

Optymalizator AMP można również zintegrować samodzielnie. Dostępnych jest wiele implementacji open source optymalizatora AMP:

- [AMP Optimizer (Node.js)](node-amp-optimizer.md): oparta na Node.js biblioteka, służąca do wytwarzania zoptymalizowanego kodu AMP. Zapoznaj się z naszym przewodnikiem dla początkujących tutaj, na amp.dev. Implementację prowadzi zespół AMP.
- [AMP Optimizer (PHP)](https://github.com/ampproject/amp-wp/tree/develop/lib/optimizer): oparta na PHP biblioteka, służąca do wytwarzania zoptymalizowanego kodu AMP. Implementację prowadzi zespół AMP.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): port narzędzia Node AMP Optimizer w języku Python.

Dostępne są różne integracje dla stron renderowanych dynamicznie przez Twój serwer i witryn statycznych:

1. **Czasu kompilacji**: w przypadku witryn statycznych najlepiej jest optymalizować strony AMP w ramach kompilacji. Takie podejście jest idealne, ponieważ optymalizacja stron AMP nie wpływa ujemnie na wydajność serwowania. Sprawdź [tę próbkę integracji optymalizatora AMP + Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Czasu renderowania**: jeśli witryny internetowe mają bardziej dynamiczny charakter lub nie są w stanie zastosować przekształceń statycznie, optymalizacja może być przeprowadzana po wyrenderowaniu dokumentów AMP na serwerze. W takim przypadku, aby zapewnić szybki czas serwowania, najlepiej jest buforować przekształcone strony dla kolejnych żądań. Buforowanie może odbywać się na poziomie sieci CDN, w wewnętrznej infrastrukturze witryny (np. Memcached), a nawet na samym serwerze, jeśli zestaw stron jest na tyle mały, że mieści się w pamięci. Aby dowiedzieć się więcej na temat tego podejścia, sprawdź [to demo integrujące optymalizator AMP z Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Integracje z dostawcami usług hostingowych

Niektórzy dostawcy usług hostingowych umożliwiają uruchamianie logiki niestandardowej podczas wdrażania lub serwowania strony internetowej. Może to być świetna opcja integracji optymalizatora AMP. Przykładowe integracje:

- [Wtyczka Netlify AMP Optimizer](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([wkrótce](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([wkrótce](https://github.com/ampproject/amp-toolbox/issues/879))
- [Chcesz dodać swoje?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
