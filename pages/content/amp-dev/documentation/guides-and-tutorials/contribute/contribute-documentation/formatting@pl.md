---
$title: Przewodniki i samouczki dotyczące formatowania
description: Wymagania amp.dev dotyczące formatowania plików
---

Przewodniki i samouczki należy przesyłać w formacie [Markdown](https://www.markdownguide.org/), z dodatkowym formatowaniem sekcji frontmatter i szortkodów.

## Lokalizacje dokumentacji

Treść na amp.dev jest pobierana z dwóch repozytoriów, [amp.dev](https://github.com/ampproject/amp.dev) i [AMPHTML](https://github.com/ampproject/amphtml). Cała dokumentacja referencyjna pod składnikami jest pobierana z AMPHTML, albo z obiektów wbudowanych, albo z rozszerzeń.

- [Wbudowane składniki ](https://github.com/ampproject/amphtml/tree/master/builtins)
- [Składniki](https://github.com/ampproject/amphtml/tree/master/extensions)
- [Kursy](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [Przykłady](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [Przewodniki i samouczki](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

Jest kilka innych dokumentów, które są importowane do amp.dev z AMPHTML. Ich [listę zawiera ten plik](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). Nie aktualizuj tych dokumentów w repozytorium amp.dev — Twoje zmiany zostaną zastąpione w kolejnych kompilacjach!

## Sekcja frontmatter

U góry każdego przewodnika i samouczka znajduje się sekcja frontmatter.

Przykład:

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>Tytuł dokumentu w takiej postaci, w jakiej będzie widnieć w spisie treści. Wpisz wielką pierwszą literę pierwszego słowa, z wyjątkiem słowa „AMP” i innych nazw własnych. Używaj znaków „handlowego i” (&), zamiast słowa „and”.</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>Określ, gdzie w spisie treści pojawi się Twój dokument. Być może, aby pojawił się on we właściwym miejscu, konieczna będzie edycja zmiennej „$order” w innych dokumentach.</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>Lista zastosowań AMP, których dotyczy dokument. Jeśli Twój dokument dotyczy witryn internetowych AMP i relacji AMP, ale nie reklam AMP ani wiadomości e-mail AMP, sekcja frontmatter będzie wyglądać następująco:     ```yaml         formats:           - witryny internetowe           - relacje     ```</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>Autor to Ty! Użyj swojej nazwy użytkownika GitHub.</td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>Podaj listę wszystkich osób, które przyczyniły się do powstania dokumentu. To pole jest opcjonalne.</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>Napisz krótki opis swojego przewodnika lub samouczka. Pomoże to w optymalizacji dla wyszukiwarek internetowych i przekazaniu Twojego dzieła tym, którzy go potrzebują!</td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>Dodaj wpis `tutorial: true` do sekcjii frontmatter witryny internetowej, aby dodać ikonę samouczka obok niej. Samouczki znajdują się w dolnej części swojej sekcji w spisie treści.</td>
  </tr>
</table>

# Szortkody

Listę szortkodów i ich zastosowań znajdziesz w pliku [documentation.md na GitHub](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes).

## Obrazy

Witryna amp.dev jest utworzona z użyciem technologii AMP! Dlatego też nasze obrazy muszą spełniać kryteria [`amp-img`](../../../../documentation/components/reference/amp-img.md) . W procesie kompilacji do konwersji obrazów na prawidłowy format `amp-img` stosowana jest następująca składnia.

<div class="ap-m-code-snippet">
<pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}</pre>
</div>

## Sekcje filtrujące

Niektóre dokumenty mogą dotyczyć wielu formatów AMP, natomiast niektóre formaty mogą wymagać dalszych wyjaśnień lub informacji, które nie dotyczą innych. Możesz filtrować te sekcje, opakowując je w poniższy szortkod.

<div class="ap-m-code-snippet">
<pre>&lsqb;filter formats="websites"]<br>This is only visible for [websites](?format=websites).<br>&lsqb;/filter]</pre>
</div>

[filter formats="websites"] Widoczna tylko w przypadku [witryn internetowych](?format=websites). [/filter]

[filter formats="websites, email"] Widoczna tylko w przypadku [witryn internetowych](?format=websites) i [poczty elektronicznej](?format=email). [/filter]

[filter formats="stories"] Widoczna tylko w przypadku [relacji](?format=stories). [/filter]




## Porady

Możesz dodawać porady i objaśnienia, opakowując tekst w następujący szortkod:

<div class="ap-m-code-snippet">
<pre>&lsqb;tip type="default"]<br>Default tip<br>&lsqb;/tip]</pre>
</div>

[tip type="important"] Ważne [/tip]

[tip type="note"] Uwaga [/tip]

[tip type="read-on"] Czytaj dalej [/tip]




## Fragmenty kodu

Umieść fragmenty kodu wewnątrz zestawów złożonych z trzech odwróconych apostrofów, określ język na końcu pierwszego zestawu odwróconych apostrofów.

<div class="ap-m-code-snippet">
<pre>```html<br>  // code sample<br>```</pre>
</div>

```css
  // code sample
```

```js
  // code sample
```





Jeśli Twój kod zawiera podwójne nawiasy klamrowe, co jest częste, gdy używasz szablonów [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites), musisz opakować część z kodem:

<div class="ap-m-code-snippet">
<pre>```html<br>{% raw	%}<br>  // code with double curly braces<br>{% endraw	%}<br>```</pre>
</div>

### Fragmenty kodu na listach

Język Python-Markdown ma pewne ograniczenia. Dodając fragmenty kodu na listach, używaj następującej składni:

<div class="ap-m-code-snippet">
<pre>1. First:<br>    &lsqb;sourcecode:html]<br>      <br>        <p>Indented content.</p><br>      <br>    &lsqb;/sourcecode]<br>  2. Second<br>  3. Third</pre>
</div>

## Podgląd próbek kodu

Próbki kodu mogą mieć podgląd i/lub link do wersji [placu zabaw AMP](https://playground.amp.dev/).

<div class="ap-m-code-snippet">
  <pre>  &lsqb;example preview="default: none|inline|top-frame"<br>          playground="default: true|false"<br>          imports="{custom-element-10},{custom-element-21},..."           template="{custom-template2}"]   ```html     // code sample   ```   &lsqb;/example]   {/custom-template2}{/custom-element-21}{/custom-element-10}</pre>
</div>

Uwaga: podgląd zostanie automatycznie przekształcony na aktualnie wybrany format po otwarciu go w placu zabaw 🤯!

Aby określić sposób generowania podglądu, użyj atrybutu `preview`:

- **none**: podgląd nie będzie generowany

- **inline**: przykładowy podgląd wyświetlany jest nad kodem źródłowym. Podgląd inline jest możliwy w przypadku normalnych przykładów witryn internetowych, jeśli kod nie zawiera żadnych elementów `head`. Użyj tej opcji w przypadku małych przykładów, które nie wymagają żadnej stylizacji lub innych elementów `head` (import nie liczy się, ponieważ jest określany za pomocą atrybutu `imports`).

- **top-frame**: Przykładowy podgląd wyświetlany jest nad kodem źródłowym w ramce iframe. Orientację można przełączać pomiędzy trybem `portrait` i `landscape`. Orientację można wstępnie wybrać poprzez określenie dodatkowego atrybutu:

- **orientation**: `default: landscape|portrait`

Jeśli konieczne są elementy niestandardowe, określ je w atrybucie `imports` jako rozdzielaną przecinkami listę z nazwą składnika, po której następuje dwukropek i wersja. Jeśli w kodzie stosowany jest składnik [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites), określ zamiast tego zależność w atrybucie `template`.

W przypadku treści wiadomości e-mail z linkami do zasobów, użyj w źródle symbolu zastępczego <code>{{server_for_email}}</code>.

### Próbka kodu inline

Oto prosta próbka osadzenia kodu inline. Możesz definiować CSS za pomocą stylów inline:

<div class="ap-m-code-snippet">
<pre>  [example preview="inline" playground="true"]<br>    ```html<br>    <div style="background: red; width: 200px; height: 200px;">Hello World</div><br>    ```<br>  [/example]<br>  [/example]</pre>
</div>

Wygląda to tak:

[example preview="inline" playground="true"]

```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```

[/example]

Ostrzeżenie: próbki kodu inline są osadzane bezpośrednio w stronie. Może to prowadzić do konfliktów, jeśli składniki (np. `amp-consent`) są już używane na stronie.

### Podgląd górnej ramki

Używaj podglądu górnej ramki zawsze wtedy, gdy musisz określić elementy nagłówka lub zdefiniować globalne style w składniku `<style amp-custom>`.

Ważne: nie dodawaj żadnego standardowego kodu AMP do nagłówka, ponieważ zostanie on dodany automatycznie na podstawie formatu AMP. Do nagłówka dodawaj tylko te elementy, które są wymagane w próbce!

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame"<br>         playground="true"]<br>    ```html<br>    <head><br>      <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script><br>      <style amp-custom><br>        body {<br>          background: red;<br>        }<br>      </style><br>    </head><br>    <body><br>      <h1>Hello AMP</h1><br>      <amp-youtube width="480"<br>        height="270"<br>        layout="responsive"<br>        data-videoid="lBTCB7yLs8Y"><br>      </amp-youtube><br>    </body><br>    ```<br>  [/example]</pre>
</div>

Wygląda to tak:

[example preview="top-frame" playground="true"]

```html
<head>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Hello AMP</h1>
  <amp-youtube width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y">
  </amp-youtube>
</body>
```

[/example]

### Relacje AMP

W celu generowania podglądu relacji AMP stosuj atrybut `preview="top-frame"` z właściwością `orientation="portrait"`.

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame"<br>         orientation="portrait"<br>         playground="true"]<br>    ```html<br>    <head><br>      <script async custom-element="amp-story"<br>          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script><br>      <style amp-custom><br>        body {<br>          font-family: 'Roboto', sans-serif;<br>        }<br>        amp-story-page {<br>          background: white;<br>        }<br>      </style><br>    </head><br>    <body><br>      <amp-story standalone><br>        <amp-story-page id="cover"><br>          <amp-story-grid-layer template="vertical"><br>            <h1>Hello World</h1><br>            <p>This is the cover page of this story.</p><br>          </amp-story-grid-layer><br>        </amp-story-page><br>        <amp-story-page id="page-1"><br>          <amp-story-grid-layer template="vertical"><br>            <h1>First Page</h1><br>            <p>This is the first page of this story.</p><br>          </amp-story-grid-layer><br>        </amp-story-page><br>      </amp-story><br>    </body><br>    ```<br>  [/example]</pre>
</div>

Wygląda to tak:

[example preview="top-frame" orientation="portrait" playground="true"]

```html
  <head>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
      body {
        font-family: 'Roboto', sans-serif;
      }
      amp-story-page {
        background: white;
      }
    </style>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="cover">
        <amp-story-grid-layer template="vertical">
          <h1>Hello World</h1>
          <p>This is the cover page of this story.</p>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-1">
        <amp-story-grid-layer template="vertical">
          <h1>First Page</h1>
          <p>This is the first page of this story.</p>
        </amp-story-grid-layer>
      </amp-story-page>
    </amp-story>
  </body>
```

[/example]

### Bezwzględne adresy URL poczty elektronicznej AMP

Zwróć uwagę, jak używamy <code>{{server_for_email}}</code> do utworzenia bezwzględnego adresu URL punktu końcowego, jeśli jest on wbudowany w wiadomość e-mail AMP.

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame" playground="true"]<br>    ```html<br>    <div class="resp-img">       <amp-img alt="flowers" src="%7B%7Bserver_for_email%7D%7D/static/inline-examples/images/flowers.jpg" layout="responsive" width="640" height="427"></amp-img>     </div><br>    ```<br>  [/example]</pre>
</div>

Wygląda to tak:

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"></amp-img>
</div>
```

[/example]

### Opatrywanie szablonów mustache znakami ucieczki

Oto przykład `top-frame` wykorzystujący zdalny punkt końcowy. Szablony mustache muszą być oddzielone w próbkach przy użyciu znaczników <code>{% raw %}</code> i <code>{% endraw %}</code>:

<div class="ap-m-code-snippet">
  <pre>&#91;example preview=&quot;top-frame&quot;<br>        playground=&quot;true&quot;<br>        imports=&quot;amp-list:0.1&quot;<br>        template=&quot;amp-mustache:0.2&quot;]<br>    ```html<br>    &lt;amp-list width=&quot;auto&quot; height=&quot;100&quot; layout=&quot;fixed-height&quot;<br>      src=&quot;&#123;&#123;server_for_email}}/static/inline-examples/data/amp-list-urls.json&quot;&gt;<br>      &lt;template type=&quot;amp-mustache&quot;&gt;&#123;% raw %}<br>        &lt;div class=&quot;url-entry&quot;&gt;<br>          &lt;a href=&quot;&#123;&#123;url}}&quot;&gt;&#123;&#123;title}}&lt;/a&gt;<br>        &lt;/div&gt;<br>      &#123;% endraw %}<br>      &lt;/template&gt;<br>    &lt;/amp-list&gt;<br>    ```<br>[/example]</pre>
</div>

Wygląda to tak:

[example preview="top-frame" playground="true" imports="amp-list:0.1" template="amp-mustache:0.2"]

```html
<amp-list width="auto" height="100" layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```

[/example]

## Linki

Możesz wstawiać linki do innych stron za pomocą standardowej składni linków języka Markdown:

```md
 [link](../../../courses/beginning-course/index.md)
```

W przypadku umieszczenia linku do innej strony na amp.dev odnośnikiem będzie ścieżka względna do pliku docelowego.

### Kotwice

Linki do poszczególnych części dokumentu wstawia się za pomocą kotwic:

```md
[link to example section](#example-section)
```

Przed wstawieniem linku prowadzącego do sekcji, w której nie ma kotwicy należy utworzyć cel kotwicy, używając selektora `<a name="#anchor-name></a>`. Dobrym miejscem na to jest koniec nagłówka sekcji:

```html
## Example section <a name="example-section"></a>
```

W kotwicy należy używać jedynie liter, cyfr, znaku kreski i podkreślenia. Używaj krótkich nazw kotwic w języku angielskim, które pasują do nagłówka lub opisują daną sekcję. Upewnij się, że nazwa kotwicy jest niepowtarzalna w dokumencie.

W razie tłumaczenia strony nazw kotwic nie wolno zmieniać i muszą one pozostać w języku angielskim.

W razie tworzenia kotwicy, która zostanie użyta w linku z innej strony należy również utworzyć taką samą kotwicę we wszystkich tłumaczeniach.

### Filtr formatów AMP

Dokumentacja składników, przewodniki i tutoriale oraz przykłady można filtrować przy użyciu formatu AMP, takiego jak witryny internetowe AMP lub relacje AMP. Podczas wstawiania linku do takiej strony należy jawnie określić format, który jest obsługiwany przez cel, dołączając do linku parametr formatu:

```md
 [link](../../learn/amp-actions-and-events.md?format=websites)
```

Parametr można pominąć tylko mając pewność, że cel obsługuje **&nbsp;wszystkie** formaty, które obsługuje Twoja strona.

### Odnośniki do składników.

Jeśli w linku pominiesz część dotyczącą wersji, link do dokumentacji referencyjnej składnika będzie automatycznie wskazywać na najnowszą wersję. Aby jawnie wskazać wersję, podaj jej pełną nazwę:

```md
 [latest version](../../../components/reference/amp-carousel.md?format=websites)
 [explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## Struktura dokumentów

### Tytuły, nagłówki i śródtytuły

Pierwsza litera pierwszego słowa w tytułach, nagłówkach i śródtytułach jest pisana wielką literą, po której następują małe litery. Wyjątkiem jest AMP i inne nazwy własne. Żaden nagłówek nie ma tytułu `Introduction`, wstępy następują po tytule dokumentu.

### Nazewnictwo dokumentów

Dokumentom należy nadawać nazwy w konwencji z kreskami.

<table>
  <tr>
   <td>
<strong>Dobrze</strong>
   </td>
   <td>
<strong>Źle</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md</td>
   <td>hello_world_tutorial.md</td>
  </tr>
  <tr>
   <td>website-fundamentals.md</td>
   <td>websiteFundamentals.md</td>
  </tr>
  <tr>
   <td>actions-and-events.md</td>
   <td>actionsandevents.md</td>
  </tr>
</table>
