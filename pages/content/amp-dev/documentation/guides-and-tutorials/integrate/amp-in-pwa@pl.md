---
"$title": Używanie AMP jako źródła danych PWA
"$order": '1'
description: Jeśli inwestujesz w AMP, ale nie masz jeszcze progresywnej aplikacji webowej, Twoje strony AMP mogą znacznie uprościć jej opracowanie.
formats:
- websites
author: pbakaus
---

Jeśli inwestujesz w AMP, ale nie masz jeszcze progresywnej aplikacji webowej, Twoje strony AMP mogą znacznie uprościć jej opracowanie. Z tego przewodnika dowiesz się jak korzystać z AMP w progresywnej aplikacji webowej i używać istniejących stron AMP jako źródła danych.

## Od JSON do AMP

W najczęstszym scenariuszu, progresywna aplikacja webowa jest aplikacją jednostronicową, która łączy się z interfejsem API JSON za pomocą usługi Ajax. Interfejs API JSON zwraca następnie zbiory danych do kierowania nawigacją oraz rzeczywistą treść do renderowania artykułów.

Następnie należy przekonwertować nieprzetworzoną zawartość na użyteczny kod HTML i wyrenderować ją na kliencie. Proces ten jest kosztowny i często trudny do utrzymania. Zamiast tego, można jako źródło treści ponownie wykorzystać istniejące już strony AMP. Co najlepsze, dzięki AMP jest to trywialnie proste i wymaga zaledwie kilku linijek kodu.

## Dodawanie „Shadow AMP” do progresywnej aplikacji webowej

Pierwszym krokiem jest włączenie do progresywnej aplikacji webowej specjalnej wersji AMP, którą nazywamy „Shadow AMP”. Tak, to prawda — ładujesz bibliotekę AMP na stronie najwyższego poziomu, ale tak naprawdę nie steruje ona zawartością najwyższego poziomu. Będzie „wzmacniać” jedynie te części naszej strony, których wzmacnianie jej nakażesz.

Umieść Shadow AMP w nagłówku swojej strony w następujący sposób:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### Skąd wiadomo, kiedy biblioteka Shadow AMP jest gotowa do użycia?

Zalecamy ładowanie biblioteki Shadow AMP z atrybutem `async`. To jednak znaczy, że trzeba stosować pewne podejście, aby wiedzieć, kiedy biblioteka jest w pełni załadowana i gotowa do użycia.

Właściwym sygnałem do obserwowania jest dostępność zmiennej globalnej `AMP`, a Shadow AMP, aby to ułatwić, stosuje „[asynchroniczne podejście do ładowania funkcji](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)”. Spójrz na ten kod:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

Ten kod będzie działać, a każda dodana w ten sposób liczba wywołań zwrotnych będzie rzeczywiście uruchamiana, gdy kod AMP stanie się dostępny, ale dlaczego?

Ten kod ma następujące znaczenie:

1. „jeśli element window.AMP nie istnieje, utwórz pustą tablicę, aby zająć jego miejsce”
2. „następnie wypchnij za pomocą metody push funkcję wywołania zwrotnego do tablicy, która ma zostać wykonana, gdy kod AMP będzie gotowy”.

To działa, ponieważ biblioteka Shadow AMP po załadowaniu wykryje, że w elemencie `window.AMP` znajduje się już tablica wywołań zwrotnych, a następnie przetworzy całą kolejkę. Jeśli później wykonasz tę samą funkcję ponownie, będzie ona nadal działać, ponieważ Shadow AMP zastąpi element `window.AMP` sobą i metodą niestandardową `push`, która po prostu od razu uruchamia wywołanie zwrotne.

[tip type="tip"] **PORADA —** aby powyższa próbka kodu była praktyczna, zalecamy otoczyć ją obiektem Promise, a następnie zawsze używać obiektu Promise przed rozpoczęciem pracy z interfejsem API AMP. Spójrz na przykład na nasz [kod demonstracyjny React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20). [/tip]

## Obsługa nawigacji w progresywnej aplikacji webowej

Nadal musisz zaimplementować ten krok ręcznie. W końcu to od Ciebie zależy, jak zaprezentujesz linki do treści w swojej koncepcji nawigacji. Kilka list? A może kart?

W typowym scenariuszu można pobrać jakiś kod JSON, który zwraca wskazane adresy URL z pewnymi metadanymi. Skończysz z funkcją wywołania zwrotnego, uruchamianą wówczas, gdy użytkownik kliknie jeden z linków; wspomniana funkcja wywołania zwrotnego powinna zawierać adres URL żądanej strony AMP. Jeśli go masz, możesz wykonać ostatni krok.

## Użyj interfejsu API Shadow AMP do wyrenderowania kodu inline strony

Wreszcie, gdy chcesz wyświetlić zawartość po wykonaniu czynności przez użytkownika, czas pobrać odpowiedni dokument AMP i pozwolić, aby biblioteka Shadow AMP przejęła nad nim kontrolę. Po pierwsze, zaimplementuj funkcję pobierania strony, podobną do tej:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"] **WAŻNE —** aby uprościć powyższy przykład kodu, pominęliśmy obsługę błędów. Zawsze należy się upewnić, że błędy są wychwytywane i obsługiwane z wdziękiem. [/tip]

Teraz, gdy mamy gotowy do użycia obiekt `Document`, nadszedł czas, aby pozwolić AMP przejąć sterowanie i wyrenderować go. Uzyskaj odniesienie do elementu DOM, który służy jako kontener dokumentu AMP, a następnie wywołaj funkcję `AMP.attachShadowDoc()`, w następujący sposób:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **PORADA —** przed faktycznym przekazaniem dokumentu do AMP przypada idealny moment na usunięcie elementów strony, które mają sens w razie wyświetlania strony AMP samodzielnie, ale nie w trybie osadzonym, takich jak stopki i nagłówki. [/tip]

I to wszystko! Strona AMP renderuje jako element podrzędny Twojej ogólnej progresywnej aplikacji webowej.

## Posprzątaj po sobie

Użytkownik może przejść z AMP do AMP w progresywnej aplikacji webowej. W razie odrzucenia poprzedniej wyrenderowanej strony AMP zawsze należy poinformować o tym AMP:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

To poinformuje AMP, że nie używasz już tego dokumentu i zwolni obciążenie pamięci i procesora.

## Zobacz to w działaniu

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Możesz zobaczyć wzór „AMP w PWA” w działaniu w utworzonej przez nas [próbce React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa). Pokazuje ona płynne przejścia podczas nawigacji i zawiera prosty składnik React, który otacza powyższe kroki. Jest to najlepsze z obu światów — elastyczny, niestandardowy JavaScript w progresywnej aplikacji webowej oraz AMP do obsługi treści.

- Kod źródłowy znajdziesz tutaj: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Użyj samodzielnego składnika React za pomocą npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- Zobacz go w działaniu tutaj: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (best on your phone or mobile emulation)

Można również zobaczyć próbkę PWA i AMP używającą frameworku Polymer. Próbka ta wykorzystuje składnik [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) do osadzania stron AMP.

- Kod znajdziesz tutaj: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- Zobacz go w działaniu tutaj: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
