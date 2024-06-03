---
'$title': Wstępne ładowanie PWA ze stron AMP
$order: 1
description: Dobrą strategią jest uczynienie strony AMP punktem wejścia do witryny, a następnie rozgrzanie PWA za kulisami i przełączenie na...
formats:
  - websites
author: pbakaus
---

Dobrą strategią jest uczynienie **strony AMP punktem wejścia do witryny**, a następnie **przygotowanie PWA za kulisami** i przełączenie się na nią:

- Wszystkie strony „liście” (mające określoną treść, a nie strony ogólne) są publikowane jako strony AMP w celu zapewnienia niemal natychmiastowego ładowania.
- Te strony AMP używają specjalnego elementu AMP [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) do przygotowania serwera buforującego i powłoki PWA podczas gdy użytkownik korzysta z treści.
- Gdy użytkownik kliknie inny link w witrynie internetowej (na przykład, wezwanie do działania na dole w razie obsługi bardziej zbliżonej do aplikacji), usługowy proces roboczy service worker przechwytuje żądanie, przejmuje stronę i zamiast tego ładuje powłokę PWA.

Czytaj dalej, aby dowiedzieć się, dlaczego i jak korzystać z tego wzorca programowania.

## Usprawnienie obsługi użytkownika poprzez podłączenie do PWA

### AMP do wstępnego pozyskania użytkownika

AMP jest idealnym rozwiązaniem w przypadku tak zwanych **stron liści**, czyli stron z treścią, które użytkownicy odkrywają organicznie za pomocą wyszukiwarki, linku udostępnionego przez znajomą osobę lub linku w innej witrynie. Ze względu na [specjalizację AMP w renederowaniu wstępnym](../../../about/how-amp-works.html), strony AMP ładują się niezwykle szybko, co z kolei oznacza znacznie mniej porzuceń (ostatnie badanie [DoubleClick ](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) pokazuje, że **ponad 53% wszystkich użytkowników porzuca stronę po 3 sekundach**).

### PWA dla bogatej interaktywności i zaangażowania

Progresywne apllkacje webowe umożliwiają z kolei znacznie większą interaktywność i zaangażowanie, ale nie mają _cechy błyskawicznego pierwszego ładowania_ jak strony AMP. U ich podstaw leży technologia o nazwie Service Worker, serwer proxy po stronie klienta, która pozwala na buforowanie wszystkich rodzajów zasobów stron, ale wspomniany proces Service Worker aktywowany jest dopiero _po_ pierwszym załadowaniu.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Wady i zalety AMP w porównaniu do PWA.') }}

## Przygotowanie PWA za pomocą elementu `amp-install-serviceworker`

AMP ma możliwość zainstalowania składnika Service Worker progresywnej aplikacji webowej ze strony AMP — tak, nawet jeśli ta strona AMP jest serwowana z serwera AMP Cache! Jeśli zrobione jest to poprawnie, link prowadzący do PWA (z jednej ze stron AMP) będzie działać prawie natychmiast, podobnie jak pierwszy przeskok do strony AMP.

[tip type="tip"] **PORADA —** jeśli nie znasz jeszcze technologii Service Worker, gorąco polecam kurs Jake'a Archibalda na temat [Udacity](https://www.udacity.com/course/offline-web-applications--ud899). [/tip]

Najpierw zainstaluj Service Worker na wszystkich stronach AMP, używając składnika [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) i najpierw włączając go poprzez jego skrypt w sekcji `<head>` swojej strony:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Następnie dodaj następujące elementy gdzieś w sekcji `<body>` (zmień tak, aby wskazywały na rzeczywisty skrypt Service Worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Ostatecznie, na etapie instalacji skryptu Service Worker, należy zadbać o zbuforowanie wszystkich zasobów, których będzie wymagać PWA:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
'/',
'/styles/main.css',
'/script/main.js'
];

self.addEventListener('install', function(event) {
// Perform install steps
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});
[/sourcecode]

[tip type="tip"] **PORADA —** są łatwiejsze sposoby obsługi mechanizmu Service Worker. Zapoznaj esię z [bibliotekami programów obsługi mechanizmu Service Worker](https://github.com/GoogleChrome/sw-helpers). [/tip]

## Ustawianie wszystkich linków na stronie AMP jako nawigacji do PWA

Większość linków na stronach AMP może prowadzi do stron z treścią. Są dwie strategie mające na celu upewnienie się, że kolejne kliknięcia linków skutkują „przejściem” do aplikacji PWA, [w zależności od sposobu używania AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Jeśli sparujesz swoje strony kanoniczne ze stronami AMP

W tym przypadku masz kanoniczną witrynę internetową (bez AMP) i generujesz strony AMP, które są powiązane linkami z tymi stronami kanonicznymi. Jest to obecnie najpopularniejszy sposób korzystania z AMP, co znaczy, że linki na stronach AMP będą prawdopodobnie prowadzić do kanonicznej wersji Twojej witryny. **Dobra wiadomość: jeśli Twoja witryna kanoniczna jest aplikacją PWA, wszystko jest gotowe**.

### 2. Jeśli Twoja witryna kanoniczna jest wykonana w technologii AMP

W tym przypadku Twoje strony kanoniczne _są_ stronami AMP: Tworzysz całą swoją witrynę internetową za pomocą AMP i używasz AMP po prostu jako biblioteki (zabawny fakt: witryna, w której to czytasz, jest zbudowana w ten sposób). **W tym scenariuszu większość linków na stronach AMP będzie prowadzić do innych stron AMP.**

Teraz możesz wdrożyć swoją PWA na osobnej ścieżce, takiej jak `your-domain.com/pwa` i użyć już uruchomionego procesu Service Worker, aby <strong>przechwytywać nawigację przeglądarki, gdy ktoś kliknie link na stronie AMP</strong>:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
if (event.request.mode === 'navigate') {
event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Co jest szczególnie interesujące w tej technice, to fakt, że obecnie używasz progresywnych ulepszeń, aby przejść z AMP do PWA. Znaczy to jednak również, że przeglądarki, które nie obsługują jeszcze usługowych procesów service worker, będą przeskakiwać z AMP do AMP i nigdy nie będą w rzeczywistości przechodzić do PWA.

AMP rozwiązuje to za pomocą czegoś, co nazywa się [przepisywaniem adresów URL powłoki](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). Dodając do znacznika [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) wzorzec rezerwowego adresu URL, instruujesz AMP, że ma przepisać wszystkie pasujące linki na danej stronie, aby zamiast tego przejść do innego starszego adresu URL powłoki, jeśli nie wykryto obsługi mechanizmu Service Worker:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Po wprowadzeniu tych atrybutów wszystkie następne kliknięcia w AMP trafią do PWA, bez względu na obsługę mechanizmu Service Worker.

[tip type="read-on"] **CZYTAJ DALEJ —** jesteś już bardzo daleko — dlaczego więc nie wykorzystać ponownie swoich istniejących stron AMP do utworzenia PWA? [Oto sposób](amp-in-pwa.md). [/tip]
