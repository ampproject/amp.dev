---
'$title': Jak działa optymalizator AMP
$order: 1
description: Optymalizator AMP pobiera prawidłowy dokument AMPHTML jako dane wejściowe i przekształca go w wersję zoptymalizowaną poprzez zastosowanie dodatkowych optymalizacji, które byłyby uciążliwe do wykonania „ręcznie”. Ten przewodnik wyjaśnia szczegółowo, jak działa optymalizator AMP.
formats:
  - websites
  - stories
author: sebastianbenz
---

Optymalizator AMP pobiera prawidłowy dokument AMPHTML jako dane wejściowe i przekształca go w wersję zoptymalizowaną poprzez zastosowanie dodatkowych optymalizacji, które byłyby uciążliwe do wykonania „ręcznie”. Wynikowy „**przekształcony kod AMP**” można rozpoznać w elemencie `html` dzięki atrybutowi `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self">
```

Uwaga: serwery buforujące AMP używają innej flagi transformed, na przykład serwery usługi Google AMP Cache dodają flagę `transformed=google;v=1`.

Optymalizatory AMP wykonują różne optymalizacje dokumentu AMP, od renderowania układów po stronie serwera po optymalizację obrazów. Oto przykład pokazujący różnice między stroną AMP a jej zoptymalizowaną wersją ([klikniij, aby wyświetlić dużą wersję](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

W dalszej części tego przewodnika przedstawimy te optymalizacje bardziej szczegółowo.

### Renderowanie układów AMP po stronie serwera

Renderowanie układów AMP po stronie serwera ma największy potencjał poprawy wydajności ładowania strony AMP. Aby uniknąć skoków treści, AMP wymaga od witryn internetowych dodania [kodu standardowego AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) w nagłówku. Kod standardowy AMP ukrywa zawartość strony poprzez ustawienie nieprzezroczystości sekcji body strony równej 0. Po załadowaniu AMP jest w stanie obliczyć układ strony. Następnie AMP ustawia nieprzezroczystość sekcji body równą 1, dzięki czemu treść strony staje się widoczna. Niestety, to podejście wymaga pobrania frameworku AMP w celu wyrenderowania strony.

Aby to poprawić, układy AMP, takie jak układ `responsive` lub `fixed-height` mogą być renderowane po stronie serwera przed przesłaniem jej do programu użytkownika. Dzięki temu możliwe staje się usunięcie kodu standardowego AMP przy jednoczesnym uniknięciu [przesunięć treści](https://web.dev/cls/) podczas ładowania strony.

Podczas renderowania układów AMP po stronie serwera wykonywane są trzy rzeczy:

⁣**1. Usunięcie kodu standardowego AMP: ** do każdego elementu wykorzystującego układ AMP wstrzykiwany jest kod ze znacznikami specyficznymi dla danego układu.

⁣**2. Wewnętrzne style CSS AMP inline: ** kod standardowy AMP jest zastępowany [stylami CSS środowiska uruchomieniowego AMP](https://ampjs.org/v0.css): <style amp-runtime="">...</style>. W przypadku dokumentów, które nie są renderowane po stronie serwera, AMP dodaje te style w czasie wykonania. Strony AMP renderowane po stronie serwera wymagają natomiast, aby układy AMP działały, zanim zostanie załadowane środowisko AMP. Aby uniknąć potencjalnych konfliktów wersji, AMP sprawdza podczas uruchamiania, czy wersja określona w parametrze i-amphtml-version="011905222334000" różni się od bieżącej wersji AMP, a jeśli nie, zaktualizuje CSS przy użyciu najnowszej wersji.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. Renderowane po stronie serwera układy AMP: ** do każdego elementu wykorzystującego układ AMP wstrzykiwane są elementy o rozmiarach zależnych od układu.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Ostrzeżenie: kod standardowy AMP nie zawsze można usunąć. Aby dowiedzieć się, czy kod standardowy został usunięty, należy sprawdzić, czy atrybut `i-amphtml-no-boilerplate` jest obecny w elemencie `html`. Na przykład składnik `amp-experiment` zmienia zawartość strony w czasie wykonania. Jeśli na stronie użyto składnika `amp-experiment`, w celu uniknęcia przesunięć zawartości wymagana jest obecność kodu standardowego AMP.

### Optymalizacja obrazów hero image

Optymalizator AMP może znacznie skrócić czas renderowania obrazów w pierwszym okienku na ekranie. Ma to kluczowe znaczenie podczas optymalizacji [czasów LCP](https://web.dev/lcp/) zgodnie z wymogami wskaźników [Core Web Vitals](https://web.dev/vitals).

W AMP obrazy hero image można jawnie deklarować, dodając do składnika `amp-img` atrybut `data-hero`:

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Optymalizatory AMP obsługują maksymalnie dwa obrazy hero image na stronie, aby uniknąć blokowania przepustowości dla innych zasobów krytycznych. Jeśli ten limit nie jest dla Ciebie odpowiedni, [daj nam znać](https://github.com/ampproject/amp-toolbox/issues).

Optymalizatory AMP będą również automatycznie wykrywać obrazy hero image dla elementów `amp-img`, `amp-iframe`, `amp-video` lub `amp-video-iframe` i wstrzykiwać `link rel=preload` dla obrazu `src`. Automatyczne wykrywanie działa poprzez analizę znaczników HTML i układów obrazu w celu wykrycia dużych obrazów w pierwszym okienku na ekranie.

W przypadku skłądnika `amp-img` optymalizatory AMP będą również renderować po stronie serwera znacznik `img` w elemencie `amp-img`. Pozwala to przeglądarce na natychmiastowe renderowanie obrazu bez środowiska uruchomieniowego AMP.

### Optymalizacja obrazów

Optymalizatory AMP mogą pomóc w serwowaniu zoptymalizowanych obrazów responsywnych poprzez generowanie specyficznych dla AMP atrybutów układu `srcset`. Na przykład poniższa deklaracja `amp-img`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

jest wzbogacona o następującą definicję atrybutu `srcset`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Aby to działało, środowisko programistyczne/hostingowe musi obsługiwać zmianę rozmiaru / optymalizację obrazów. Zapoznaj się z przewodnikami poszczególnych optymalizatorów, aby dowiedzieć się, jak najlepiej zintegrować optymalizację obrazów.

### Kompilacja AMP Module (wkróce)

Dostępna jest mniejsza wersja środowiska uruchomieniowego AMP i składników, oparta na [modułach JavaScript](https://v8.dev/features/modules#browser), wymagająca od użytkowników pobrania mniejszej ilości kodu JavaScript w celu wyświetlenia strony AMP. Optymalizatory AMP domyślnie włączają kompilację AMP Module poprzez przekształcenie:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

w:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Przeglądarki rozpoznające atrybut `type="module"` ignorują skrypty z atrybutem `nomodule`. To znaczy, że użytkownicy nowoczesnych przeglądarek będą korzystać z mniejszych pakietów środowiska uruchomieniowego, a użytkownicy starszych przeglądarek będą korzystać z niemodułowej środowiska uruchomieniowego AMP.

Uwaga: kompilacja AMP Module jest dostępna tylko dla przekształconego kodu AMP, ponieważ wymaga wprowadzenia inline kodu CSS środowiska uruchomieniowego AMP.
