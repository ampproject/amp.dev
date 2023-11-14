---
'$title': Włączanie funkcji eksperymentalnych
$order: 3
description: Eksperymentalne składniki AMP to wydane funkcje, które nie są jeszcze gotowe do powszechnego stosowania, więc są chronione przez status eksperymentalny.
formats:
  - websites
  - stories
  - ads
---

[Eksperymentalne składniki AMP](https://github.com/ampproject/amphtml/tree/main/tools/experiments) to wydane funkcje, które nie są jeszcze gotowe do powszechnego stosowania, więc są chronione przez status **eksperymentalny**.

Programiści i użytkownicy mogą zdecydować się na korzystanie z tych funkcji przed ich pełnym wydaniem. Należy jednak zachować ostrożność, ponieważ mogą one zawierać błędy lub mieć nieoczekiwane skutki uboczne.

[tip type="important"] Istnieje ryzyko, że niektóre eksperymenty nigdy nie zostaną wykorzystane w projekcie AMP jako funkcje. [/tip]

{% set experimental_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('experimental')|list %} {% if experimental_components|length %} Jest to lista składników, które mają obecnie status eksperymentalny i są gotowe do testowania przez programistów w celu uzyskania pierwszych informacji zwrotnych od użytkowników:

<ul>{% for component in experimental_components %}  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li>{% endfor %}</ul>{% endif %}

## Wybierz kanał AMP Beta

Kanał AMP Beta to sposób na ustawienie przeglądarki do korzystania z nowszej wersji bibliotek JS AMP.

Wydanie z kanału AMP Beta **&nbsp;może być mniej stabilne** i może zawierać funkcje niedostępne dla wszystkich użytkowników. Wybierz je, jeśli chcesz pomóc w testowaniu nowych wersji AMP, zgłaszaniu błędów lub tworzeniu dokumentów wymagających nowej funkcji, która nie jest jeszcze dostępna dla wszystkich.

Beta Channel to świetny wybór:

- do testowania i zabawy nowymi funkcjami, które nie są jeszcze dostępne dla wszystkich użytkowników.
- do stosowania w zapewnieniu jakości (QA) w celu zapewnienia, że witryna jest zgodna z następną wersją AMP.

Jeśli znajdziesz problem, który wydaje się występować tylko w wersji AMP z Beta Channel, [zgłoś problem](https://github.com/ampproject/amphtml/issues/new) z opisem. Zawsze dołączaj adres URL do strony z odtworzeniem problemu.

Aby ustawić przeglądarkę do korzystania z kanału AMP Beta Channel, przejdź do [strony eksperymentów AMP](https://ampjs.org/experiments.html) i aktywuj eksperyment „AMP Beta Channel”. Aby otrzymywać powiadomienia o ważnych/przełomowych zmianach dotyczących AMP, zapisz się na listę mailingową [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Włączanie składnika eksperymentalnego

#### Serwowanego z cdn.ampproject.org

Aby pobierać treści serwowane z `https://*.cdn.ampproject.org`, przejdź do pliku `/experiments.html` w subdomenie serwera Google AMP Cache i przełącznikiem włącz (lub wyłącz) żądany eksperymentalny składnik.

Aby włączyć na przykład eksperymenty na buforowanych stronach AMP, których źródłem jest domena `www.example.com`, przejdź do adresu `wwww-example-com.cdn.ampproject.org/experiments.html`.

Włączone eksperymenty są zapisywane w lokalizacji `localStorage` i umożliwiają eksperymenty tylko na stronach AMP serwowanych z bieżącej domeny.

#### Serwowane z innych domen

Eksperymenty dla treści serwowanych z domen innych niż CDN można przełączać w konsoli devtools za pomocą:

```js
AMP.toggleExperiment('experiment');
```

Żaden plik AMP zawierający funkcje eksperymentalne nie przejdzie [walidacji AMP](validation-workflow/validate_amp.md). Eksperymentalne składniki należy usunąć z gotowych produkcyjnych dokumentów AMP.

## Włączanie eksperymentu dla konkretnego dokumentu

Dokument może włączać określone eksperymenty. W tym celu należy w nagłówku dokumentu HTML umieścić tag meta nazwy `amp-experiments-opt-in` przed skryptem AMP (`https://ampjs.org/v0.js`). Zawarta w nim wartość to rozdzielany przecinkami ciąg identyfikatorów eksperymentów, które mają zostać włączone.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b" />
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://ampjs.org/v0.js"></script>
  ...
</head>
```

W ten sposób określone eksperymenty zostaną włączone dla wszystkich odwiedzających dokument. Nie wszystkie eksperymenty pozwalają jednak na ich włączenie na poziomie dokumentu. Pełna lista dozwolonych eksperymentów znajduje się w atrybucie `allow-doc-opt-in` w pliku projektu [`prod-config.json`](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/prod-config.json). Zauważ, że opcję włączenia dokumentu może zostać zastąpiona przez opcję wyłączenia przez użytkownika.

## Próby źródła

[Próby źródła](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md) umożliwiają programistom wykorzystanie funkcji eksperymentalnej w produkcji i dostarczają niezbędnych informacji zwrotnych.

Funkcja w trybie eksperymentalnym tradycyjnie może być wykorzystywana podczas programowania, ale nie w produkcji. Dzięki próbom źródła zainteresowani programiści mogą decydować się na przetestowanie eksperymentalnej funkcji w produkcji, z następującymi oczekiwaniami:

- Test jest ograniczony czasowo.
- Funkcja prawdopodobnie przejdzie pewne zmiany po próbach źródła.

Próby źródła dają możliwość wdrożenia i skorzystania z nowej funkcji, zanim stanie się ona w pełni dostępna. Funkcja będzie dostępna w witrynie programisty, zamiast być chroniona statusem eksperymentu, a informacje zwrotne mogą mieć bezpośredni wpływ na kierunek rozwoju funkcji.

{% set trial_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('origin_trial')|list %} {% if trial_components|length %} W ramach próby źródła można obecnie testować składniki z poniższej listy:

<ul>{% for component in trial_components %}  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li>{% endfor %}</ul>{% endif %}

### Włączanie próby źródła

Dołącz następujący znacznik `<meta>` w sekcji `<head>` każdej strony używającej eksperymentu w ramach próby źródła:

```html
<meta name="amp-experiment-token" content="{copy your token here}" />
```

Uwaga: `"amp-experiment-token"` to ciąg literału, `"amp-experiment-token"`. Nie jest to sam token (podawany w atrybucie content) ani nazwa eksperymentu.
