---
'$title': Łatwy dostęp offline i lepsza wydajność
$order: 11
description: Usługowy proces roboczy Service Worker to bufor po stronie klienta, który znajduje się między stroną a serwerem i jest używany do budowania fantastycznych wrażeń offline, szybkiego ładowania...
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

Procesy [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) umożliwiają zapewnianie bogatych treści offline i spójnych wrażeń użytkowników mimo różnych mocy sieci. Dzięki buforowaniu zasobów w przeglądarce aplikacja internetowa jest w stanie dostarczyć użytkownikowi dane, zasoby i strony offline, aby go zaangażować i poinformować.

Pamiętaj: Service Worker nie będzie mógł wchodzić w interakcję z wersją strony buforowaną przez AMP. Użyj go do dalszych podróży do źródła.

## Instalacja skryptu Service Worker

Usługowy proces roboczy Service Worker to bufor po stronie klienta, który znajduje się między stroną a serwerem i jest używany do budowania fantastycznych wrażeń offline, scenariuszy szybkiego ładowania powłoki aplikacji i wysyłania powiadomień push.

[tip type="note"] **UWAGA —** jeśli koncepcja mechanizmu Service Worker jest dla Ciebie nowością, przeczytaj [wprowadzenie na WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). [/tip]

Skrypt Service Worker musi być zarejestrowany na danej stronie, w przeciwnym razie przeglądarka go nie znajdzie ani nie uruchomi. Domyślnie robi się to za pomocą [odrobiny JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Na stronach AMP służy do tego składnik [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md).

W tym celu najpierw dodaj składnik [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) za pomocą jego skryptu w sekcji `<head>` strony:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Następnie dodaj następujące elementy gdzieś w sekcji `<body>` (zmień tak, aby wskazywały na rzeczywisty skrypt Service Worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Gdy użytkownik przejdzie do stron AMP w źródle (w przeciwieństwie do pierwszego kliknięcia, które zwykle jest serwowane z serwera buforującego AMP), Service Worker przejmuje kontrolę i może zrobić [mnóstwo fajnych rzeczy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## Service Worker AMP

Jeśli tu jesteś, to tworzysz strony z AMP. Zespołowi AMP bardzo zależy na tym, aby stawiać użytkownika na pierwszym miejscu i zapewniać mu światowej klasy doświadczenie w Internecie. Aby zapewnić spójność tych wrażeń, zespół AMP stworzył skrypt Service Worker specjalnie do AMP!

[tip type="default"] **PORADA —** skorzystaj z naszego samouczka, aby nauczyć się używać skryptu [AMP Service Worker w aplikacji PWA](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md). [/tip]

### Instalowanie skryptu AMP Service Worker

Zainstaluj skrypt AMP Service Worker, wykonując te kroki:

- Zaimportuj kod AMP Service Worker do pliku Service Worker.

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
[/sourcecode]

- Zainstaluj program Service Worker za pomocą następującego kodu.

[sourcecode:js]
AMP_SW.init();
[/sourcecode]

- Gotowe.

### Zautomatyzowane buforowanie

AMP Service Worker automatycznie buforuje pliki skryptów AMP i dokumenty AMP. Dzięki buforowaniu pliki skryptów AMP są natychmiast dostępne dla przeglądarki użytkownika, co pozwala na korzystanie z funkcjonalności offline i szybsze renderowanie stron w słabych sieciach.

Jeśli aplikacja wymaga określonych typów buforowania dokumentów, AMP Service Worker pozwala na ich dostosowanie, np. dodanie listy odrzucania dokumentów, które zawsze powinny być żądane z sieci. W poniższym przykładzie należy zastąpić `Array<RegExp>` tablicą wyrażeń regularnych reprezentujących dokumenty, których buforowania chcemy uniknąć.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

Dowiedz się więcej o [dostosowywaniu buforowania dokumentów tutaj](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### Optymalizowanie skryptu AMP Service Worker

Aby w pełni wykorzystać możliwości skryptu AMP Service Worker, opcjonalne pola powinny być skonfigurowane do buforowania niezbędnych zasobów i wstępnego pobierania linków.

Zasoby, które napędzają wizytę użytkownika na stronie, takie jak wideo, ważne obrazy lub plik PDF do pobrania powinny być buforowane, aby można było do nich ponownie uzyskać dostęp, gdy użytkownik będzie w trybie offline.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

Można dostosować strategię buforowania i zdefiniować listę odrzuceń.

Linki do stron, które użytkownicy mogą chcieć odwiedzić, można wstępnie pobrać, aby umożliwić dostęp do nich w trybie offline. W tym celu wystarczy dodać atrybut `data-prefetch` do znacznika linku.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Obsługa w trybie offline

Dodaj stronę trybu offline informującą użytkownika, że przeszedł w tryb offline i powinien spróbować ponownie załadować stronę po powrocie do trybu online. AMP Service Worker może buforować zarówno stronę, jak i jej zasoby.

[sourcecode:js]
AMP_SW.init({
offlinePageOptions: {
url: '/offline.html';
assets: ['/images/offline-header.jpg'];
}
})
[/sourcecode]

Udana strona trybu offline wygląda tak, jakby była częścią witryny dzięki interfejsowi użytkownika spójnemu z resztą aplikacji.

### Wymuszanie aktualizacji

Zespół pracuje nad wdrożeniem funkcji wymuszonej aktualizacji / usunięcia, gdy AMP Service Worker musi zostać wyłączony lub zmieniony, jeśli instalacja u użytkowników nie powiedzie się.

Aby efektywnie zarządzać mechanizmem Service Worker, należy zrozumieć jak [standardowe buforowanie HTTP wpływa na sposób aktualizowania kodu JavaScript skryptu service worker](https://developers.google.com/web/updates/2018/06/fresher-sw). Skrypty service worker serwowane za pomocą odpowiednich instrukcji buforowania HTTP mogą rozwiązywać małe problemy poprzez wprowadzanie odpowiednich zmian i ponowną instalację skryptów service worker w środowisku hostingowym. Jeśli musisz usunąć skrypt service worker, warto mieć pod ręką prosty, [pusty](https://en.wikipedia.org/wiki/NOP) plik service worker, taki jak ten:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] [Dowiedz się więcej](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) o zarządzaniu zainstalowanymi skryptami service worker. [/tip]

## Pisanie niestandardowego skryptu service worker

Możesz skorzystać z powyższej techniki, aby włączyć dostęp offline do swojej witryny AMP, jak również rozszerzać swoje strony, **gdy tylko zostaną zaserwowane z źródła**. W ten sposób możesz modyfikować odpowiedź za pomocą zdarzenia procesu service worker `fetch` i zwracać dowolną odpowiedź:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

Używając tej techniki, możesz zmieniać stronę AMP, aby dodawać wszelkiego rodzaju dodatkowe funkcje, które w innym przypadku na przykład nie przejdą [walidacji AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md):

- Funkcje dynamiczne, które wymagają niestandardowego JS.
- Składniki dostosowane / odpowiednie wyłącznie do danej witryny.
