---
'$title': Zmień swoją witrynę AMP w PWA
$order: 10
description: Dzięki buforowaniu zasobów w przeglądarce PWA jest w stanie dostarczać użytkownikowi dane, zasoby i strony offline utrzymujące zaangażowanie i zapewniające informacje.
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

Progresywne aplikacje webowe wykorzystujące procesy [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) umożliwiają zapewnianie bogatych treści offline i spójnych wrażeń użytkowników mimo różnych mocy sieci. Dzięki buforowaniu zasobów w przeglądarce aplikacja PWA jest w stanie dostarczyć użytkownikowi dane, zasoby i strony offline, aby go angażować i informować.

Ten przewodnik nauczy Cię, jak przekształcić witrynę AMP w instalowaną PWA z funkcjami offline poprzez dodanie pliku Web Manifest i skryptu Service Worker obsługiwanego przez mechanizm Service Worker AMP.

# Pobranie i uruchomienie kodu startowego

Pobierz [kod startowy stąd](/static/files/tutorials/amptopwa.zip).

Użyj lokalnego serwera WWW do wyświetlania podglądu witryny internetowej.

[tip type="default"] **PORADA —** szybki serwer WWW — uruchom `python -m SimpleHTTPServer`. [/tip]

Wyświetlona ma zostać strona docelowa Lyrical Lightning, festiwalu Mobile Music Magic. Na stronie głównej znajduje się jeden link do wyświetlenia harmonogramu i sceny, na której znajdują się zespoły.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Użytkownicy naszej witryny mogą mieć słaby dostęp sieci podczas imprezy, kiedy to prawdopodobnie będą chcieli uzyskać dostęp do harmonogramu. To czyni go doskonałym kandydatem do przekształcenia w PWA, którą można zainstalować na ekranie głównym naszego użytkownika, a która zapewnia wszystkie krytyczne funkcje nawet w trybie offline.

# Utworzenie pliku Web App Manifest

[Manifest aplikacji internetowej](https://developers.google.com/web/fundamentals/web-app-manifest/) to prosty plik JSON, który informuje przeglądarkę o Twojej aplikacji internetowej i o tym, jak powinna działać po „zainstalowaniu” na urządzeniu mobilnym lub komputerze użytkownika. Manifest jest wymagany przez wiele przeglądarek do pokazywania [monitu Dodaj do ekranu głównego](https://developers.google.com/web/fundamentals/app-install-banners/).

Do swojego repozytorium dodaj plik o nazwie `manifest.json` z następującym kodem:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Dodanie skryptu AMP Service Worker

Service worker to oddzielny od strony internetowej skrypt uruchamiany przez przeglądarkę w tle, który rozszerza funkcje przeglądarki poprzez buforowanie żądań w celu poprawy wydajności i zapewnienia funkcjonalności offline. Utworzenie skryptu service worker od podstaw jest możliwe, ale czasochłonne. Biblioteki takie jak Workbox są pomocne, ale AMP idzie o krok dalej, oferując mechanizm [AMP Service Worker](https://github.com/ampproject/amp-sw), w którym AMP bezpośrednio automatyzuje wiele kroków, takich jak buforowanie skryptów, zasobów i dokumentów AMP, a także implementację wspólnych najlepszych praktyk, takich jak [wstępne ładowanie nawigacji](https://developers.google.com/web/updates/2017/02/navigation-preload).

Mechanizm AMP Service Worker po zainstalowaniu automatycznie [buforuje skrypty AMP](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) i [dokumenty ](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) po zażądaniu ich przez użytkownika. Zaczniemy od dodania podstawowego mechanizmu AMP Service Worker.

## Tworzenie pliku service worker

Utwórz plik o nazwie `sw.js` i dodaj następujący kod:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Dzięki zaledwie dwóm linijkom kodu można zaimportować mechanizm AMP Service Worker do swojego skryptu Service Worker i zainicjować go.

## Automatyczne instalowanie żądanego skryptu service worker na swoich stronach AMP

Witryny internetowe AMP używają składnika [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) do instalowania procesu service worker w tle przeglądarki, gdy użytkownik korzysta z treści.

Umieść wymagany znacznik skryptu w sekcji head pliku `index.html` oraz element `<amp-install-serviceworker>` w sekcji `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Ważne —** aby móc buforować całą zawartość witryny, plik service worker należy serwować z katalogu głównego (`/sw.js`). [/tip]

Element `<amp-install-serviceworker>` instaluje skrypt service worker, tworząc ramkę iframe i uruchamiając plik `data-iframe-src`. Utwórz plik `install-sw.html` i dodaj następujący kod:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

Ramka iframe rejestruje plik AMP Service Worker w przeglądarce.

# Dostosowanie buforowanej zawartości

AMP Service Worker ma wbudowane zalety, a jednocześnie zapewnia opcjonalne pola, które można skonfigurować w celu optymalizacji pod kątem potrzeb aplikacji.

Nasza aplikacja festiwalu muzycznego będzie buforować zasoby obrazów, wstępnie pobierać link do harmonogramu i określać stronę offline.

## Buforowanie zasobów

Mechanizm AMP Service Worker można skonfigurować do [buforowania zasobów](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching) takich jak obrazy, filmy i czcionki. Użyjemy go do buforowania naszego obrazu tła i logotypu AMP. Otwórz plik `sw.js` i zaktualizuj go przy użyciu poniższego kodu:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Określiliśmy strategię buforowania [cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). To znaczy, że aplikacja będzie starała się najpierw serwować zbuforowane obrazy, zanim zażąda czegokolwiek z sieci. Jest to szczególnie przydatne w przypadku tej aplikacji, ponieważ nie będziemy aktualizować naszego obrazu tła ani logotypu AMP.

## Wstępne pobieranie linków

AMP Service Worker wstępnie ładuje linki, które mają atrybut `data-rel=prefetch`. Dzięki temu użytkownicy mogą przeglądać strony w trybie offline, nawet jeśli jeszcze ich nie odwiedzili. Dodamy ten atrybut do naszego znacznika linku do pliku `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Pokazywanie strony trybu offline

W celu poradzenia sobie z nieoczekiwanymi przypadkami lub kliknięciami linków do stron, których nie pobraliśmy wstępnie, dodamy stronę trybu offline, aby oferować spójne doświadczenie użytkownika, które jest „zorientowane na markę”, w przeciwieństwie do pokazywania ogólnej strony trybu offline przeglądarki. Pobierz plik [`offline.html` stąd](/static/files/tutorials/offline.zip) i zaktualizuj plik `sw.js` przy użyciu następującego kodu:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Testowanie PWA

Możesz sprawdzić, czy mechanizm AMP Service Worker buforuje niezbędne zasoby i zapewnia idealne rozwiązanie trybu offline, korzystając z konsoli [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Przetestujemy Lyrical Lyghtning, otwierając okienko DevTools poprzez naciśnięcie klawiszy `Ctrl + Shift + I` w systemie Windows lub `Cmd + Opt + I` w systemie Mac. Możesz również kliknąć prawym przyciskiem myszy na stronie i wybrać z menu polecenie `Zbadaj`. Następnie wybierz kartę `Application`, aby wyświetlić rejestrację skryptu service worker.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Kliknij pole `offline`, aby przełączyć się w tryb offline. Kliknij link `see full lineup` i przejdź do strony `offline.html` w celu sprawdzenia, czy linki zostały prawidłowo zbuforowane i wstępnie pobrane.

[tip type="default"] **Porada —** w celu wykonania dokładnej analizy funkcji progresywnej aplikacji webowej uruchom [narzędzie Lighthouse firmy Google](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool), aby wygenerować raport. [/tip]

# Gratulacje!

Udało Ci się utworzyć PWA z AMP! Dzięki temu samouczkowi wiesz jak:

- Utworzyć plik [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Zainstalować skrypt Service Worker w AMP za pomocą składnika [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Dostosować skrypt [AMP Service Worker ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Wstępnie pobrać linki ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Utworzyć stronę trybu offline

Dowiedz się więcej o skryptach [Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) i [kwestiach obsługi użytkownika w trybie offline](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Naucz się [śledzić zaangażowanie za pomocą usług analityki](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html) i zapoznaj się z samouczkiem [konfigurowania podstawowej analityki dla stron AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
