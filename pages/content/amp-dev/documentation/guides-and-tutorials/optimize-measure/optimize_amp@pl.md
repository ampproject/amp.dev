---
$title: Optymalizacja hostowanych stron AMP
$order: 20
description: Środowisko uruchomieniowe AMP jest zoptymalizowane pod względem szybkości, jeśli więc strony AMP są serwowane przez serwer buforujący AMP, są one w pełni zoptymalizowane i oferują najwyższą wydajność ładowania ...
author: sebastianbenz
---

Ten przewodnik zawiera porady i wskazówki dla webmasterów dotyczące optymalizowania stron AMP.

### Czy AMP nie jest domyślnie szybki?

Środowisko uruchomieniowe AMP jest [zoptymalizowane pod względem szybkości](../../../about/how-amp-works.html), jeśli więc strony AMP są serwowane przez serwer buforujący AMP, są one w pełni zoptymalizowane i oferują najwyższą wydajność ładowania. Na przykład, jeśli użytkownicy przechodzą do stron AMP z wyszukiwarki Google na telefonie komórkowym, domyślnie strony są serwowane przez serwer buforujący AMP.

Strony AMP nie zawsze jednak są serwowane z serwera buforującego AMP. Witryna może zdecydować się na wyświetlanie innym źródłom ruchu stron AMP z własnych serwerów. Najczęstszym przypadkiem użycia są strony utworzone w całości z AMP, takie jak [tasty.co](https://tasty.co), gdzie użytkownicy przechodzą bezpośrednio do witryny. Innym źródłem ruchu jest Twitter, który [zaczął tworzyć linki do stron AMP](https://searchengineland.com/twitter-ramps-amp-278300), zamiast dostarczać standardową wersję mobilną. To znaczy, że jeśli użytkownik kliknie link w jednej z aplikacji mobilnych Twittera, link spowoduje przejście do wersji AMP Twojej strony w Twoim własnym źródle (jeśli jest dostępna).

W związku z tym nie zawsze można mieć pewność, że strony AMP są serwowane tylko z serwera buforującego AMP. W przypadkach, gdy strony AMP są serwowane z własnych serwerów ważne jest, aby upewnić się, że strony AMP oferują optymalną wydajność ładowania.

Domyślnie strony AMP są ładowane szybko, ale jest kilka dodatkowych optymalizacji wydajności, które można zaimplementować, aby pomóc przeglądarce ładować strony AMP jeszcze szybciej. Ten przewodnik opisuje kilka optymalizacji, które warto wziąć pod uwagę w razie publikowania stron AMP. Zanim jednak zaczniesz czytać ten przewodnik, upewnij się, że znasz już wszystkie [podstawowe najlepsze praktyki dotyczące wydajności stron www](#basic-optimizations). Na wydajność ładowania szczególnie duży wpływ ma optymalizacja obrazów.

Na przykład dzięki zastosowaniu następujących technik optymalizacji:

- [Zoptymalizowane ładowanie środowiska uruchomieniowego AMP](#optimize-the-amp-runtime-loading)
- [Wstępne załadowanie obrazu hero image ](#preload-hero-images) (rozmiar/kodowanie samego zdjęcia nie zostało zmienione)
- [Optymalizacja czcionek niestandardowych](#optimize-custom-fonts) (w tym przypadku czcionek Google)

[szablon „The Scenic”](../../../documentation/templates/index.html) jest ładowany [o dwie sekundy szybciej na łączu 3G](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Jeśli chcesz pominąć szczegóły, sprawdź [generator kodu standadowego AMP](/boilerplate), którego możesz użyć do wygenerowania własnych, zoptymalizowanych stron AMP.

### Optymalizacja ładowania środowiska uruchomieniowego AMP <a name="optimize-the-amp-runtime-loading"></a>

Choć AMP jest dość restrykcyjny co do znaczników dozwolonych w sekcji `<head>`, nadal jest miejsce na optymalizację. Kluczem jest skonstruowanie sekcji `<head>` w taki sposób, aby wszystkie blokujące rendering skrypty i czcionki niestandardowe były ładowane jak najszybciej.

Oto zalecana kolejność dla sekcji `<head>` strony AMP:

[sourcecode:html]

<!doctype html>

<html ⚡ lang="en"><br>  <head><br>    <meta charset="utf-8"><br>    <meta name="viewport" content="width=device-width"><br>    <meta name="description" content="This is the AMP Boilerplate."><br>    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js"><br>    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"><br>    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin><br>    <script async src="https://cdn.ampproject.org/v0.js"></script><br>    <script async custom-element="amp-experiment" src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"></script><br>    <!-- Import other AMP Extensions here --><br>    <style amp-custom><br>      /* Add your styles here */<br>    </style><br>    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet"><br>    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript><br>    <link rel="canonical" href="."><br>    <title>My AMP Page</title><br>  </head><br>  <body><br>    <h1>Hello World</h1><br>  </body><br></html><br>[/sourcecode]

Omówmy to krok po kroku:

1. Pierwszym znacznikiem powinien być `meta charset`, a następnie należy wstawić wszystkie pozostałe znaczniki `meta`.

2. Następnie należy wstępnie załadować znacznik środowiska uchomieniowego AMP `v0.js` `<script>` z parametrem `<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>`. Pobieranie środowiska uruchomienioiwego AMP powinno rozpocząć się tak szybko, jak to możliwe, ponieważ [kod standardowy AMP ](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) ukrywa dokument za pomocą instrukcji `body { visibility:hidden }` do chwili załadowania AMP. Wstępne załadowanie środowiska AMP instruuje przeglądarkę, aby pobrała skrypt z wyższym priorytetem. W sekcji [renderowanie po stronie serwera](#server-side-rendering) opisano jak tego uniknąć. {amp-img6} {/amp-img6}

3. Jeśli strona zawiera rozszerzenia opóźniające renderowanie (np. amp-experiment, amp-dynamic-css-classes, amp-story), załaduj wstępnie te rozszerzenia w sposób wymagany przez środowisko uruchomieniowe AMP do renderowania strony. [sourcecode:html]

<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-custom-css-0.1.js"> <link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"> <link as="script" rel="preload" href="https://cdn.ampproject.org/v0/story-1.0.js">[/sourcecode] 1.  Use [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) to speedup the connection to other origin where the full resource URL is not known ahead of time, for example, when using Google Fonts: [sourcecode:html]&amp;lt;link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin&amp;gt;[/sourcecode] 1.  Load the AMP runtime: [sourcecode:html]&amp;lt;script async src="https://cdn.ampproject.org/v0.js"&amp;gt;&amp;lt;/script&amp;gt;[/sourcecode] 1.  Specify the `<script>` tags for [render-delaying extensions](https://github.com/ampproject/amphtml/blob/master/src/render-delaying-services.js) (e.g., [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) and [`amp-story`](../../../documentation/components/reference/amp-story.md)
1.  Specify the `&lt;script&gt;` tags for remaining extensions (e.g., [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). These extensions are not render-delaying and therefore should not be preloaded as they might take away important bandwidth for the initial render.
1.  Specify any custom styles by using the `&lt;style amp-custom&gt;` tag.
1.  Add any other tags allowed in the `&lt;head&gt;` section. In particular, any external fonts should go last since they block rendering.
1.  Finally, specify the [AMP boilerplate code](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). By putting the boilerplate code last, it prevents custom styles from accidentally overriding the boilerplate css rules.
</script>

[tip] Serwer buforujący AMP wykonuje wszystkie te optymalizacje (i kilka innych) automatycznie. Możesz użyć narzędzia AMP Optimizer, aby automatycznie wykonać te optymalizacje w swoim własnym źródle. [/tip]

### Wstępne załadowanie obrazów hero image <a name="preload-hero-images"></a>

[AMP HTML stosuje swój własny element obrazu: `amp-img`](../../../documentation/components/reference/amp-img.md). Choć składnik [`amp-img`](../../../documentation/components/reference/amp-img.md) ma liczne przewagi nad tradycyjnym znacznikiem HTML `img`, jedną z wad jest to, że środowisko uruchomieniowe musi zostać załadowane przed rozpoczęciem pobierania obrazu. Niektóre obrazy, takie jak obrazy hero image na stronie produktu należy załadować jak najszybciej. W takich przypadkach najlepiej jest wstępnie ładować obraz, aby upewnić się, że przeglądarka rozpocznie pobieranie obrazu jak najszybciej i nie będzie musiała czekać na załadowanie środowiska uruchomieniowego AMP.

[sourcecode:html]

   <link rel="preload" href="/images/elephants.png" as="image">     ...   {amp-img1}   {/amp-img1}  [/sourcecode]

Co jednak zrobić, jeśli dany układ responsywny wymaga różnych obrazów hero image w zależności od szerokości ekranu? Na przykład szeroki obrazek dla komputera i wąski obrazek dla telefonu komórkowego, jak tutaj:

[sourcecode:html] {amp-img0} {/amp-img0} {amp-img1} {/amp-img1} [/sourcecode]

Dobrze, że instrukcja `link rel=preload` obsługuje również zapytania o media. Możemy dzięki temu użyć tych samych zapytań o media w naszych instrukcjach wstępnego ładowania, jak tutaj:

[sourcecode:html]


<link rel="preload" as="image" href="/images/elephants_narrow.png" media="(max-width: 415px)"> <link rel="preload" as="image" href="/images/elephants_wide.jpg" media="(min-width: 416px)"> [/sourcecode]

Przy okazji, to samo podejście działa w przypadku obrazów plakatów składnika [`amp-video`](../../../documentation/components/reference/amp-video.md):

[sourcecode:html]


<link rel="preload" href="/images/poster.jpg" as="image"> ...  {amp-video1}      ... {/amp-video1} [/sourcecode]

Upewnij się tylko, że instrukcje preload są umieszczone *za* deklaracją okienka na ekranie, ponieważ przeglądarka wymaga wymiarów okienka na ekranie do określenia szerokości ekranu:

[sourcecode:html]


<meta name="viewport" content="width=device-width">(max-width: 415px)" ...=""> [/sourcecode]

[tip type="important"] Ładuj wstępnie tylko krytyczne obrazy, w przeciwnym razie pobieranie obrazów może zająć przepustowość wymaganą do pobrania innych krytycznych danych. [/tip]

### Rozważ użycie skryptu service worker

Teraz, gdy wszystkie [główne przeglądarki obsługują skrypty service worker](https://caniuse.com/#feat=serviceworkers), warto ocenić, czy dodanie takiego skryptu do danej strony ma sens.

Są dwa różne wzorce architektury, które z pewnością zapewnią niezawodną i szybką nawigację:

- W przypadku aplikacji jednostronicowych: model powłoki aplikacji App Shell (w kontekście AMP określany jako [AMP-w-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). Wzorzec ten wymaga od skryptu service worker uaktualnienia dokumentu AMP do PWA opartej na powłoce aplikacji.
- W przypadku aplikacji wielostronicowych: [transmisja strumieniowa złożonych zasobów](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Skrypt service worker buforuje statyczny nagłówek i stopkę, a następnie wykorzystuje strumieniowanie do natychmiastowego zwrócenia zbuforowanej, częściowej odpowiedzi podczas ładowania zawartości.

Jeśli nie jest używany żaden z tych wzorców i nie jest możliwe buforowanie całej witryny (co ma sens tylko w przypadku bardzo małych witryn), skrypt service worker może mieć [negatywny wpływ na wydajność](https://developers.google.com/web/updates/2017/02/navigation-preload). W tym przypadku najlepiej **nie** stosować skryptu service worker.

Jeśli jednak chcesz, aby Twoja witryna była [instalowana z ekranu głównego](https://developers.google.com/web/fundamentals/app-install-banners/) lub dostępna w trybie offline, konieczne będzie użycie skryptu service worker. W tym przypadku ważne jest, aby użyć [wstępnego ładowania nawigacji](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) w celu złagodzenia potencjalnego spowolnienia (uwaga: obecnie wstępne ładowanie nawigacji jest obsługiwane tylko w Chrome).

Jeśli Twoja strona AMP używa skryptu service worker, oto kilka najlepszych praktyk:

- Wstępnie buforuj [środowisko uruchomieniowe AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) i rozszerzenia (np. [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Wstępnie buforuj logotypy, czcionki i inną statyczną zawartość, która jest używana na większości Twoich stron.
- Serwuj logotypy, czcionki i obrazy, stosując [strategię cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Serwuj środowisko uruchomieniowe AMP i roszerzenia, stosując strategię [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate).
- W przypadku stosowania strategii network-first do żądań nawigacji włącz [wstępne ładowanie nawigacji](https://developers.google.com/web/updates/2017/02/navigation-preload).

Jeśli szukasz sposobu rozpoczęcia stosowania mechanizmu service worker w witrynie AMP, sprawdź ten [przykład](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) skryptu service worker realizującego wszystkie powyższe najlepsze praktyki.

[tip type="note"] Środowisko uruchomieniowe AMP jest serwowane z parameterem max-age o wartości zaledwie 50 minut, aby zapewnić szybką dostępność aktualizacji. Aby uniknąć prawdopodobnych pominięć pamięci podręcznej przeglądarki, dobrym pomysłem jest serwowanie środowiska uruchomieniowego AMP za pomocą skryptu service worker. [/tip]

Buforowanie wstępne jest istotne nie tylko przy przechodzeniu ze zbuforowanych stron AMP do stron bez AMP we własnym źródle, ale także przy przechodzeniu ze zbuforowanych stron AMP do stron AMP we własnym źródle. Wynika to z tego, że serwer buforujący AMP wykonuje na podstawie niezmiennego adresu URL ponowny zapis adresów URL środowiska uruchomieniowego AMP o najnowszej wydanej wersji, na przykład:

`https://cdn.ampproject.org/v0.js` -> `https://cdn.ampproject.org/rtv/001515617716922/v0.js`.

Wskutek tego strona AMP serwowana z własnego źródła nie korzysta z pamięci podręcznej przeglądarki i w tym przypadku musi ponownie pobrać środowisko uruchomieniowe AMP (bez wersji). Za pomocą skryptu service worker można wstępnie zbuforować środowisko uruchomieniowe AMP bez wersji i przyspieszyć przejście. Aby dowiedzieć się więcej o tym, dlaczego serwer buforujący AMP określa wersje środowiska uruchomieniowego AMP w adresach URL, przeczytaj [ten dokument](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] W przeglądarce Safari występuje kluczowa różnica w sposobie impelementacji skryptów service worker — nie jest w niej możliwe zainstalowanie skryptu service worker dla źródła, jeśli strona jest serwowana z serwera buforującego AMP. [/tip]

### Optymalizacja czcionek niestandardowych <a name="optimize-custom-fonts"></a>

W przypadku AMP można zoptymalizować ładowanie czcionek na kilka sposóbów ([większość z nich nie jest specyficzna dla AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Jeśli to możliwe, używaj deklaracji [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): dzięki temu czcionka zostanie użyta tylko wtedy, gdy jest już w pamięci podręcznej, a jeśli nie została jeszcze załadowana, użyta zostanie czcionka systemowa.
- Zoptymalizuj swoje czcionki internetowe (na przykład serwuj czcionki niestandardowe za pomocą WOFF2).
- Wstępniee ładuj czcionki niestandardowe: [sourcecode:html]


<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2">[/sourcecode] - Jeśli używasz czcionek Google lub innego dostawcy czcionek z nieznanymi adresami URL czcionek, łącz się z wyprzedzeniem z odpowiednim serwerem czcionek: [sourcecode:html]  <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin> [/sourcecode]

Spróbuj też zminimalizować liczbę niestandardowych czcionek, których używasz na stronie. Jeśli możesz, użyj czcionek systemowych zamiast niestandardowych, ponieważ czcionki systemowe zapewniają zgodność witryny z systemem operacyjnym użytkownika, a to pozwala uniknąć ładowania większej ilości zasobów.

### Renderowanie układów AMP po stronie serwera <a name="server-side-rendering"></a>

Renderowanie układów AMP po stronie serwera to technika, którą wykorzystują serwery buforujące AMP, aby jeszcze bardziej skróćić czas ładowania. Dzięki renderowaniu po stronie serwera możliwe jest usunięcie kodu standardowego AMP, aby generować dokument AMP bez konieczności uruchamiania kodu JavaScript środowiska uruchamieniowego AMP. Na przykład renderowana po stronie serwera wersja generatora kodu standardowego AMP [jest renderowana dwa razy szybciej](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) niż zwykła wersja AMP!

Jeśli publikujesz stronę AMP, zdecydowanie warto rozważyć użycie [optymalizatora AMP](amp-optimizer-guide/index.md). Optymalizatory AMP pozwalają na serwowanie zoptymalizowanych stron AMP z własnego serwera zaplecza, co zapewnia renderowanie układów AMP po stronie serwera. Optymalizator AMP automatycznie wykonuje również wiele innych optymalizacji opisanych w tym dokumencie.

### Podstawowe optymalizacje <a name="basic-optimizations"></a>

Oczywiście wszystkie podstawy optymalizacji wydajności stron internetowych odnoszą się również do stron AMP:

- [Optymalizuj obrazy](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) i filmy. Optymalizacja obrazów może mieć ogromny wpływ na wydajność ładowania.
- [Kompresuj i minimalizuj kod CSS i HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Cały CSS na stronach AMP jest wprowadzany inline, warto więc użyć czegoś w rodzaju [purifycss](https://github.com/purifycss/purifycss) do usunięcia nieużywanego kodu CSS.
- Stosuj [buforowanie HTTP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ...itd.
