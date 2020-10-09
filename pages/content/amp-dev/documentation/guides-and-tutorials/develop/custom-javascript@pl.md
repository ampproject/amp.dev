---
$title: Stosowanie niestandardowego kodu JavaScript na stronach AMP
$order: 7
author: CrystalOnScript
contributors:
- fstanis
description: Dla materiałów internetowych wymagających znacznego dostosowania w AMP stworzono składnik amp-script, pozwalający na użycie dowolnego kodu JavaScript na stronie AMP bez wpływu na jej ogólną wydajność.
---

AMP dąży do zapewniania niezmiennie wspaniałych wrażeń wszystkim użytkownikom w sieci, zachęcając do stosowania wydajnych i niepowodujących problemów, gotowych do użycia składników.

Niektóre materiały internetowe wymagają znacznego dostosowania, które wykracza poza możliwości wiązania stanów składnika [`amp-bind`](../../../documentation/components/reference/amp-bind.md?format=websites) oraz dynamicznego pobierania danych i funkcji tworzenia szablonów składników [`amp-list`](../../../documentation/components/reference/amp-list.md?format=websites) i [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md?format=websites). Dla tych jednorazowych przypadków w ramach AMP stworzono składnik [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites), który pozwala na użycie dowolnego kodu JavaScript na stronie AMP bez wpływu na ogólną wydajność strony.

# Wstawianie niestandardowego kodu JavaScript

Strony AMP obsługują własny kod JavaScript za pomocą składnika `<amp-script>`. Poniższy przykład pokazuje jak używać składnika `amp-script` z plikiem JavaScript ładowanym z adresu URL:

```html
<!doctype html>
<html ⚡>
<head>
  ...
  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
<body>
  ...
  <amp-script layout="container" src="https://example.com/myfile.js">
    <p>Initial content that can be modified from JavaScript</p>
  </amp-script>
  ...
</body>
</html>
```

Składnik `<amp-script>` rejestruje proces [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) w celu uruchomienia go w wątku oddzielnym od głównej strony. Proces Web Worker otrzymuje swoją własną kopię modelu DOM poprzez użycie przez składnik `amp-script` modelu [DOM procesu Worker](https://github.com/ampproject/worker-dom). Dzięki temu Web Worker może bez modyfikacji korzystać z bibliotek JavaScript, takich jak [React](https://reactjs.org/) i [jQuery](https://jquery.com/).

Składnik `amp-script` wysyła wiadomości między wątkiem procesu Web Worker a wątkiem głównym powodując, że wszelkie zmiany dokonane przez użytkownika w głównym modelu DOM będą powtórzone w fałszywym DOM procesu Web Worker. Web Worker może następnie aktualizować fałszywy DOM, co jest odzwierciedlane w głównym modelu DOM.

## Buforowanie skryptów niestandardowych

Serwer buforujący [AMP Cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) obsługuje pliki niestandardowego kodu JavaScript wstawiane za pomocą składnika `<amp-script>` w taki sam sposób, w jaki obsługuje skrypty składników AMP, co gwarantuje, że żaden niestandardowy kod JavaScript nie spowolni dokumentu AMP.

Serwer AMP Cache buforuje pliki JavaScript, a następnie je dostarcza. Użytkownicy mogą oczekiwać takiej samej wydajności od strony używającej składnika `<amp-script>` jak od strony, która go nie zawiera.

# Używanie składnika `<amp-script>`

Aby zagwarantować, że strony AMP będą konsekwentnie ładowane szybko i z płynnie działającymi UI, na składnik <kod><amp-script> nałożono ograniczenia.</kod>

## Inicjowanie

JavaScript w obiekcie Web Worker zezwala na minimalną zmianę modelu DOM przy obciążeniu. Podczas tej fazy dozwolone są następujące zmiany:

- Rejestrowanie programów obsługi zdarzeń.
- Podział węzłów TextNode na wiele węzłów TextNode, aby umożliwić obsługę platform, które tego wymagają.

Model DOM wewnątrz znaczników składnika `<amp-script>` powinien być prawie identyczny przed i po zainicjowaniu.

Na przykład, jeśli zaczyna się od poniższego kodu:

```html
<text> Hello world </text>
```

Model DOM procesu Worker zezwala na drobne zmiany w strukturze, ale nie zawartości:

```html
 <text>Hello </text><text>world</text>
```

## Manipulacja modelem DOM

Ze względu na wrażenia użytkownika i bezpieczeństwo składnik `amp-script` wymusza ograniczenia manipulacji modelem DOM.

### Interakcja z użytkownikiem

Gdy użytkownik wchodzi w interakcję z elementami w otoce składnika `<amp-script>`, niestandardowy kod JavaScript musi szybko zwrócić manipulacje modelem DOM, gdy są potrzebne. Domyślnie zmiany w DOM są dozwolone <strong>przez czas krótszy niż jedna sekunda</strong> od początkowej interakcji. Znaczącym wyjątkiem jest sytuacja, gdy kod musi pobrać dane z sieci przy użyciu interfejsu <code>fetch</code>. Tutaj zmiany DOM mogą być wymagane po zwróceniu odpowiedzi użytkownikowi, a następnie przez czas <strong>krótszy niż jedna sekunda</strong>. Jeśli skrypt zmieni DOM poza dozwolonym przedziałem czasu, spowoduje to błąd krytyczny i składnik `<amp-script>` wymusi zakończenie procesu Web Worker. Po wymuszonym zakończeniu składnik <code><amp-script></code> nie zostanie wykonany ponownie.

### Swobodne zmiany

Jeśli składnik `<amp-script>` ma ustaloną wysokość, do manipulowania modelem DOM nie jest wymagana interakcja z użytkownikiem.

## Rozmiar skryptu

AMP narzuca limit 150 kilobajtów niestandardowego kodu JavaScript na każdej stronie. Limit ten jest dzielony między wszystkie składniki `<amp-script>` na danej stronie. Każda zewnętrzna biblioteka JavaScript musi zostać zaimportowana do każdego składnika `<amp-script>`.

## Zakres

Wszystkie elementy DOM, z którymi mają współpracować niestandardowe pliki JavaScript, muszą być otoczone znacznikami składników `<amp-script>`. Dotyczy to również innych składników AMP. Składnik `<amp-script>` uważa, że `document.body` jest elementem składnika `<amp-script>`, a nie elementem sekcji <cod><body> dokumentu.</cod>

Jeśliby wywołać funkcję `document.body.appendChild(document.createElement('span'))` w skrypcie zaimportowanym do elementu `<amp-script>` w następującym dokumencie:

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
    </amp-script>
  </div>
</body>
```

Zwróciłaby ona to:

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
      <span></span>
    </amp-script>
  </div>
</body>
```

## Wyzwalacze zdarzeń

Dozwolone są wszystkie wyzwalacze zdarzeń.

## Ograniczenia interfejsu API <a name="api-restrictions"></a>

Niektóre metody synchroniczne są niedozwolone w składniku `<amp-script>` i zastąpiono je alternatywami, takimi jak [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)). Metody `Element.getBoundingClientRect()` nie można zaimplementować w procesie Web Worker, więc zapewniona jest jej asynchroniczna alternatywa, `getBoundingClientRectAsync()`. Metoda `getBoundingClientRectAsync()` zwraca [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), zamiast zwrócić bezpośrednio wynik.

Interfejsy API obsługiwane przez model DOM procesu Worker przedstawia [ta tabela](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md).
