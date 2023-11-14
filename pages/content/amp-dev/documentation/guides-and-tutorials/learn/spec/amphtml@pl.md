---
'$title': Specyfikacja AMP HTML
$order: 8
formats:
  - websites
teaser:
  text: AMP HTML jest podzbiorem języka HTML, służącym do tworzenia stron z treścią, takich jak artykuły informacyjne, w sposób gwarantujący pewne podstawowe cechy wydajnościowe.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

AMP HTML jest podzbiorem języka HTML, służącym do tworzenia stron z treścią, takich jak artykuły informacyjne, w sposób gwarantujący pewne podstawowe cechy wydajnościowe.

W tym podzbiorze języka HTML stosowane są pewne ograniczenia zestawu dostępnych znaczników i funkcji, ale nie wymaga on tworzenia nowych mechanizmów renderujących: istniejące programy użytkownika mogą renderować AMP HTML tak samo, jak każdy inny kod HTML.

[tip type="read-on"] Jeśli interesuje Cię przede wszystkim to, co jest dozwolone w AMP, a co nie, obejrzyj nasz [film wprowadzający na temat ograniczeń AMP](https://www.youtube.com/watch?v=Gv8A4CktajQ). [/tip]

Ponadto dokumenty AMP HTML można przesyłać na serwer WWW i serwować tak, jak każdy inny dokument HTML; nie jest wymagana żadna specjalna konfiguracja serwera. Są one jednak zaprojektowane również do opcjonalnego serwowania przez wyspecjalizowane systemy buforujące, które pośredniczą w przesyłaniu dokumentów AMP. Serwery te serwują dokumenty z własnego źródła i mają możliwość stosowania do nich przekształceń, zapewniających dodatkowe korzyści pod względem wydajności. Oto niekompletna lista optymalizacji, jakie może przeprowadzić taki system serwujący:

- Zastąpienie odsyłaczy do obrazów obrazami o rozmiarach dostosowanych do okienka na ekranie przeglądarki.
- Obrazy inline, które są widoczne nad treścią.
- Zmienne CSS inline.
- Wstępne ładowanie składników rozszerzonych.
- Minimalizacja kodu HTML i CSS.

AMP HTML wykorzystuje zestaw centralnie zarządzanych i przechowywanych elementów niestandardowych różnych autorów, służących do implementacji funkcji zaawansowanych, takich jak galerie obrazów, które można znaleźć w dokumencie AMP HTML. Zezwala autorowi na stylizowanie dokumentu przy użyciu własnego CSS, ale nie na kod JavaScript, poza kodem dostarczanym przy użyciu elementów niestandardowych w celu osiągnięcia celów wydajnościowych.

Korzystając z formatu AMP, producenci treści udostępniają ją w plikach AMP do indeksowania (z zastrzeżeniem ograniczeń podanych w pliku robot.txt), buforowania i wyświetlania przez podmioty trzecie.

## Wydajność <a name="performance"></a>

Przewidywalna wydajność jest kluczowym celem projektowania AMP HTML. Dążymy przede wszystkim do skrócenia czasu, po którym użytkownik może korzystać z zawartości strony. Konkretnie znaczy to, że:

- Należy minimalizować liczbę żądań HTTP niezbędną do wyrenderowania i wygenerowania pełnego układu dokumentu.
- Zasoby takie jak obrazy lub reklamy należy pobierać tylko wtedy, gdy prawdopodobnie zobaczy je użytkownik.
- Przeglądarki powinny być w stanie obliczyć miejsce wymagane przez poszczególne zasoby na stronie bez pobierania tych zasobów.

## Format AMP HTML <a name="the-amp-html-format"></a>

### Przykładowy dokument <a name="sample-document"></a>

[sourcecode:html]

<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-custom>
      h1 {
        color: red;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Article headline",
        "image": ["thumbnail1.jpg"],
        "datePublished": "2015-02-05T08:00:00+08:00"
      }
    </script>
    <script
      async
      custom-element="amp-carousel"
      src="https://ampjs.org/v0/amp-carousel-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-ad"
      src="https://ampjs.org/v0/amp-ad-0.1.js"
    ></script>
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src="sample.jpg" width="300" height="300"></amp-img>
    </p>
    <amp-ad
      width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302"
    >
    </amp-ad>
  </body>
</html>
[/sourcecode]

### Wymagane znaczniki <a name="required-markup"></a>

Dokumenty AMP HTML muszą:

- <a name="dctp"></a>Zaczynać się od deklaracji `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>Zawierać znacznik najwyższego poziomu `<html ⚡>` (albo `<html amp>`). [🔗](#ampd)
- <a name="crps"></a>Zawierać znaczniki `<head>` oraz `<body>` (w HTML są one opcjonalne). [🔗](#crps)
- <a name="canon"></a>Zawierać znacznik `<link rel="canonical" href="$SOME_URL">` w sekcji head, wskazujący wersję HTML dokumentu AMP HTML lub sam siebie, jeśli nie ma takiej wersji HTML. [🔗](#canon)
- <a name="chrs"></a>Zawierać znacznik `<meta charset="utf-8">` jako pierwszy element podrzędny w sekcji head. [🔗](#chrs)
- <a name="vprt"></a>Zawierać znacznik `<meta name="viewport" content="width=device-width">` w sekcji head. Zalecane jest również dodanie właściwości `minimum-scale=1` i `initial-scale=1`. [🔗](#vprt)
- <a name="scrpt"></a>Zawierać znacznik `<script async src="https://ampjs.org/v0.js"></script>` w sekcji head. [🔗](#scrpt)
- <a name="boilerplate"></a>Zawierać [kod standardowy AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md) (`head > style[amp-boilerplate]` i `noscript > style[amp-boilerplate]`) w sekcji head. [🔗](#boilerplate)

### Metadane <a name="metadata"></a>

Zalecane jest opatrywanie dokumentów AMP HTML adnotacjami zawierającymi znormalizowane metadane: [Open Graph Protocol](http://ogp.me/), [Twitter Cards](https://dev.twitter.com/cards/overview), itd.

Zalecane jest opatrywanie dokumentów AMP HTML adnotacjami zawierającymi znormalizowane metadane: [Open Graph Protocol](http://ogp.me/), [Twitter Cards](https://dev.twitter.com/cards/overview), itd.

### Znaczniki HTML <a name="html-tags"></a>

Znaczników HTML można używać w AMP HTML bez żadnych zmian. Niektóre znaczniki mają swoje odpowiedniki niestandardowe (takie jak `<img>` i `<amp-img>`), a inne są całkowicie zabronione:

<table>
  <tr>
    <th width="30%">Znacznik</th>
    <th>Status w AMP HTML</th>
  </tr>
  <tr>
    <td width="30%">script</td>
    <td>Zabroniony, chyba że typ to <code>application/ld+json</code>, <code>application/json</code> lub <code>text/plain</code>. (W razie potrzeby można dodać inne wartości niewykonywalne). Wyjątek stanowi obowiązkowy znacznik script służący do ładowania środowiska uruchomieniowego AMP i znaczniki script służące do ładowania składników rozszerzonych.</td>
  </tr>
  <tr>
    <td width="30%">noscript</td>
    <td>Dozwolony. Może być używany w dowolnym miejscu w dokumencie. Jeśli określony, zawartość wewnątrz elementu <code>&lt;noscript></code> jest wyświetlana, gdy obsługa JavaScript jest wyłączona przez użytkownika.</td>
  </tr>
  <tr>
    <td width="30%">base</td>
    <td>Zabroniony.</td>
  </tr>
  <tr>
    <td width="30%">img</td>
    <td>Zastąpiony przez <code>amp-img</code>.<br> Uwaga: znacznik <code>&lt;img></code> jest <a href="https://www.w3.org/TR/html5/syntax.html#void-elements">elementem pustym według HTML5</a>, więc nie ma znacznika końca. Znacznik <code>&lt;amp-img></code> ma natomiast znacznik końca <code>&lt;/amp-img></code>.</td>
  </tr>
    <tr>
    <td width="30%">picture</td>
    <td>Prohibited. Serve different image formats by using the <a href="https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders?format=websites">fallback</a> attribute or provide multiple <a href="https://amp.dev/documentation/components/amp-img#attributes"><code>srcset</code> on <code>&lt;amp-img></code></a>.</td>
  </tr>
  <tr>
    <td width="30%">video</td>
    <td>Zastąpiony przez <code>amp-video</code>.</td>
  </tr>
  <tr>
    <td width="30%">audio</td>
    <td>Zastąpiony przez <code>amp-audio</code>.</td>
  </tr>
  <tr>
    <td width="30%">iframe</td>
    <td>Zastąpiony przez <code>amp-iframe</code>.</td>
  </tr>
    <tr>
    <td width="30%">frame</td>
    <td>Zabroniony.</td>
  </tr>
  <tr>
    <td width="30%">frameset</td>
    <td>Zabroniony.</td>
  </tr>
  <tr>
    <td width="30%">object</td>
    <td>Zabroniony.</td>
  </tr>
  <tr>
    <td width="30%">param</td>
    <td>Zabroniony.</td>
  </tr>
  <tr>
    <td width="30%">applet</td>
    <td>Zabroniony.</td>
  </tr>
  <tr>
    <td width="30%">embed</td>
    <td>Zabroniony.</td>
  </tr>
  <tr>
    <td width="30%">form</td>
    <td>Dozwolony. Wymaga dodania rozszerzenia <a href="https://amp.dev/documentation/components/amp-form">amp-form</a>.</td>
  </tr>
  <tr>
    <td width="30%">elementy input</td>
    <td>W większości dozwolone z <a href="https://amp.dev/documentation/components/amp-form#inputs-and-fields">wyjątkiem niektórych typów</a>, nieprawidłowe są mianowicie typy <code>&lt;input type="button"></code>, <code>&lt;button type="image"></code>. Dozwolone są również znaczniki pokrewne: <code>&lt;fieldset></code>, <code>&lt;label></code>
</td>
  </tr>
  <tr>
    <td width="30%">button</td>
    <td>Dozwolony.</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="cust"></a>style</code></td>
    <td> <a href="#boilerplate">Wymagany znacznik stylu elementu amp-boilerplate</a>. W głównym znaczniku dozwolony jest Jeden dodatkowy znacznik style do celów stylizacji niestandardowej. Znacznik ten musi mieć atrybut <code>amp-custom</code>. <a href="#cust">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">link</td>
    <td> Dozwolone są wartości <code>rel</code> zarejestrowane w <a href="http://microformats.org/wiki/existing-rel-values">microformats.org</a>. Jeśli na naszej białej liście brakuje wartości <code>rel</code>, <a href="https://github.com/ampproject/amphtml/issues/new">prześlij zgłoszenie</a>. Niedozwolona jest wartość <code>stylesheet</code> i inne wartości, takie jak <code>preconnect</code>, <code>prerender</code> i <code>prefetch</code>, które mają skutki uboczne w przeglądarce. Szczególny przypadek stanowi pobieranie arkuszy stylów od dostawców czcionek z białej listy.</td>
  </tr>
  <tr>
    <td width="30%">meta</td>
    <td>Atrybutu <code>http-equiv</code> można użyć w przypadku określonych dozwolonych wartości; szczegółowe informacje zawiera <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">specyfikacja walidatora AMP</a>.</td>
  </tr>
  <tr>
    <td width="30%"><code><a id="ancr"></a>a</code></td>
    <td>Wartość atrybutu <code>href</code> nie może zaczynać się od <code>javascript:</code>. Jeśli jest ustawiony, atrybut <code>target</code> musi mieć wartość <code>_blank</code>. W przeciwnym razie dozwolony. <a href="#ancr">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">svg</td>
    <td>Dozwolona jest większość elementów SVG.</td>
  </tr>
</table>

Znaczników HTML można używać w AMP HTML bez żadnych zmian. Niektóre znaczniki mają swoje odpowiedniki niestandardowe (takie jak `<img>` i `<amp-img>`), a inne są całkowicie zabronione:

### Komentarze <a name="comments"></a>

Warunkowe komentarze HTML są niedozwolone.

### Atrybuty HTML <a name="html-attributes"></a>

Nazwy atrybutów zaczynające się od <code>on</code> (takie jak <code>onclick</code> lub <code>onmouseover</code>) są niedozwolone w AMP HTML. Atrybut o nazwie literału <code>on</code> (bez przyrostka) jest dozwolony.

Atrybuty związane z XML, takie jak xmlns, xml:lang, xml:base i xml:space są niedozwolone w AMP HTML.

Wewnętrzne atrybuty AMP z prefiksem <code>i-amp-</code> są niedozwolone w AMP HTML.

### Klasy <a name="classes"></a>

Wewnętrzne nazwy klas AMP z prefiksami `-amp-` i <code>i-amp-</code> są niedozwolone w AMP HTML.

[Dokumentacja AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-css-classes.md) zawiera informacje o znaczeniu nazw klas z prefiksem `amp-`. Stosowanie tych klas jest dozwolone i ma na celu umożliwienie dostosowania niektórych funkcji środowiska uruchomieniowego i rozszerzeń AMP.

Wszystkie inne autorskie nazwy klas są dozwolone w znaczniku AMP HTML.

### Identyfikatory <a name="ids"></a>

Niektóre nazwy identyfikatorów są niedozwolone w AMP HTML, na przykład identyfikatory z prefiksem <code>-amp-</code> i <code>i-amp-</code>, które mogą powodować konflikty z wewnętrznymi identyfikatorami AMP.

Przed użyciem identyfikatorów `amp-` i `AMP` należy zapoznać się z dokumentacją AMP dotyczącą określonych rozszerzeń, aby uniknąć konfliktu z funkcjami zapewnianymi przez te rozszerzenia, takie jak <code>amp-access</code>.

Pełną listę niedozwolonych nazw identyfikatorów można wyświetlić, wyszukując hasło `mandatory-id-attr` [tutaj](https://github.com/ampproject/amphtml/blob/main/docs/spec/../validator/validator-main.protoascii).

### Linki <a name="links"></a>

Schemat `javascript:` jest niedozwolony.

### Arkusze stylów <a name="stylesheets"></a>

Główne znaczniki semantyczne i niestandardowe elementy AMP mają style domyślne, dzięki czemu opracowanie responsywnego dokumentu jest stosunkowo łatwe. Opcja rezygnacji ze stylów domyślnych być może zostanie dodana w przyszłości.

#### Reguły at-rules <a name="-rules"></a>

W arkuszach stylów dozwolone są następujące reguły at-rules:

`@font-face`, `@keyframes`, `@media`, `@page`, `@supports`.

Reguła `@import` jest niedozwolona. Inne mogą zostać dodane w przyszłości.

#### Autorskie arkusze stylów <a name="author-stylesheets"></a>

Autorzy mogą dodawać niestandardowe style do dokumentu za pomocą jednego znacznika `<style amp-custom>` w sekcji head dokumentu lub za pomocą stylów inline.

Reguły `@keyframes` są dozwolone w sekcji `<style amp-custom>`. Jeśli jednak jest ich zbyt wiele, zalecane jest ich umieszczenie w dodatkowym znaczniku `<style amp-keyframes>`, który musi znajdować się na końcu dokumentu AMP. Szczegółowe informacje znajdują się w sekcji [Arkusz stylów keyframes](#keyframes-stylesheet) w tym dokumencie.

#### Selektory <a name="selectors"></a>

Do selektorów w autorskich arkuszach stylów mają zastosowanie następujące ograniczenia:

##### Nazwy klas i znaczników <a name="class-and-tag-names"></a>

Nazwy klas, identyfikatory, nazwy znaczników i atrybuty w autorskich arkuszach stylów nie mogą zaczynać się od ciągu znaków `-amp-` ani `i-amp-`. Są one zarezerwowane do użytku wewnętrznego przez środowisko uruchomieniowe AMP. Wynika z tego, że arkusz stylów użytkownika nie może odwoływać się do selektorów CSS w przypadku klas `-amp-`, identyfikatorów `i-amp-` ani znaczników lub atrybutów `i-amp-`. Te nazwy klas, identyfikatorów i znaczników/atrybutów nie są przeznaczone do dostosowywania przez autorów. Autorzy mogą jednak pominąć style klas i znaczników `amp-` dowolnych właściwości CSS, które nie są jawnie zabronione przez specyfikację tych składników.

Aby zapobiec stosowaniu selektorów atrybutów do obchodzenia ograniczeń nazw klas, generalnie niedozwolone jest, aby selektory CSS zawierały tokeny lub ciągi znaków rozpoczynające się od `-amp-` i `i-amp-`.

#### Ważne <a name="important"></a>

Używanie kwalifikatora `!important` jest niedozwolone. Jest to wymóg niezbędny do tego, by AMP mógł wymuszać swoje niezmienniki przekształcenia rozmiarów elementów.

#### Właściwości <a name="properties"></a>

AMP zezwala tylko na przejścia i animacje właściwości, które mogą być akcelerowane przez GPU w popularnych przeglądarkach. Obecnie mamy następującą białą listę: `opacity`, <code>transform</code> (również <code>-vendorPrefix-transform</code>).

W poniższych przykładach znacznik właściwości `<property>` musi znajdować się na powyższej białej liście.

- `transition <property>` (również -vendorPrefix-transition)
- `@keyframes name { from: {<property>: value} to {<property: value>} }` (również `@-vendorPrefix-keyframes`)

#### Rozmiar maksymalny <a name="maximum-size"></a>

Łączny rozmiar autorskiego arkusza stylów i stylów inline przekraczający 75 000 bajtów danych skutkuje błędem walidacji.

### Arkusz stylów keyframes<a name="keyframes-stylesheet"></a>

Oprócz znacznika `<style amp-custom>`, autorzy mogą również dodawać znacznik `<style amp-keyframes>`, dozwolony specjalnie w przypadku animacji klatek kluczowych.

Do znacznika `<style amp-keyframes>` mają zastosowanie następujące ograniczenia:

1. Można go umieszczać tylko jako ostatni element podrzędny elmentu `<body>` dokumentu.
2. Może zawierać tylko reguły `@keyframes`, `@media`, `@supports` i ich połączenia.
3. Nie może być większy niż 500 000 bajtów.

Powodem istnienia tagu `<style amp-keyframes>` jest fakt, że reguły klatek kluczowych są często nieporęczne nawet w przypadku umiarkowanie skomplikowanych animacji, co prowadzi do powolnej analizy składni kodu CSS i pierwszego generowania z treścią. Takie reguły często przekraczają jednak limit rozmiaru nałożony na znacznik `<style-amp-custom>`. Umieszczenie takich deklaracji keyframes na końcu dokumentu w sekcji `<style amp-keyframes>` pozwala na przekroczenie ograniczeń rozmiarów. Jako że klatki kluczowe nie blokują renderowania, unika się również blokowania pierwszego generowania zawartości w celu ich przeanalizowania.

Przykład:

[sourcecode:html]

<style amp-keyframes>
@keyframes anim1 {}

@media (min-width: 600px) {
  @keyframes anim1 {}
}
</style>
</body>
[/sourcecode]

### Czcionki niestandardowe <a name="custom-fonts"></a>

Autorzy mogą dołączyć arkusze stylów czcionek niestandardowych. Dwie obsługiwane metody to znaczniki linków wskazujące dozwolonych dostawców czcionek oraz dodanie reguły `@font-face`.

Przykład:

[sourcecode:html]

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Tangerine"
/>
[/sourcecode]

Dostawcy czcionek mogą być wymienieni na białej liście, jeśli obsługują integracje tylko w CSS i serwują je za pomocą protokołu HTTPS. Obecnie dozwolone są następujące źródła serwowania czcionek za pomocą znaczników linków:

- Fonts.com: `https://fast.fonts.net`
- Google Fonts: `https://fonts.googleapis.com`
- Font Awesome: `https://maxcdn.bootstrapcdn.com, https://use.fontawesome.com`
- [Typekit](https://helpx.adobe.com/typekit/using/google-amp.html): `https://use.typekit.net/kitId.css` (należy odpowiednio zamienić `kitId`)

UWAGA DO IMPLEMENTUJĄCYCH: dodanie do tej listy wymaga zmiany reguły AMP Cache CSP.

Autorzy mogą dołączać wszystkie czcionki niestandardowe za pomocą reguły <code>@font-face</code> w niestandardowym kodzie CSS. Czcionki dołączone za pomocą reguły <code>@font-face</code> muszą być pobierane za pomocą schematu HTTP lub HTTPS.

## Środowisko uruchomieniowe AMP <a name="amp-runtime"></a>

Środowisko uruchomieniowe AMP to JavaScript, który działa wewnątrz każdego dokumentu AMP. Zapewnia on implementacje niestandardowych elementów AMP, zarządza ładowaniem zasobów i nadawaniem priorytetów oraz opcjonalnie zawiera walidatora środowiska uruchomieniowego AMP HTML do użytku podczas tworzenia.

Środowisko uruchomieniowe AMP jest ładowane za pomocą obowiązkowego znacznika `<script src="https://ampjs.org/v0.js"></script>` w sekcji `<head>` dokumentu AMP.

Środowisko uruchomieniowe AMP można umieszczać w każdej stronie w trybie programistycznym. Tryb programistyczny wyzwoli walidację AMP w osadzonej stronie, co spowoduje wyświetlenie statusu walidacji i ewentualnych błędów w konsoli programistycznej JavaScript. Tryb programistyczny można wywoływać poprzez dołączenie parametru `#development=1` do adresu URL strony.

## Zasoby <a name="resources"></a>

Zasoby takie jak obrazy, filmy, pliki audio lub reklamy muszą być włączane do pliku AMP HTML za pomocą elementów niestandardowych, takich jak `<amp-img>`. Nazywamy je „zasobami zarządzanymi”, ponieważ o tym, czy i kiedy zostaną załadowane i wyświetlone użytkownikowi, decyduje środowisko uruchomieniowe AMP.

Nie ma żadnych szczególnych gwarancji co do sposobu działania ładowania środowiska uruchomieniowego AMP, ale generalnie powinno się w miarę możliwości dążyć do ładowania zasobów na tyle szybko, aby zostały one załadowane do chwili, w której użytkownik chciałby je zobaczyć. Środowisko uruchomieniowe powinno nadać priorytet zasobom aktualnie znajdującym się w okienku na ekranie i starać się odpowiednio przewidzieć zmiany w tym okienku, aby wstępnie załadować zasoby.

Środowisko uruchomieniowe AMP może w dowolnym momencie podjąć decyzję o zwolnieniu z pamięci zasobów, które nie znajdują się obecnie w okienku na ekranie albo ponownie użyć kontenerów zasobów, takich jak ramki iframe, w celu zmniejszenia ogólnego obciążenia pamięci RAM.

## Składniki AMP <a name="amp-components"></a>

W AMP HTML używane są elementy niestandardowe, zwane „składnikami AMP”, służące do zastępowania wbudowanych znaczników ładowania zasobów, takich jak `<img>` i `<video>` oraz do implementacji funkcji o złożonych interakcjah, takich jak lightboxy czy karuzele.

Szczegółowe informacje o obsługiwanych składnikach zawiera [specyfikacja składników AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-components.md).

Obsługiwane są 2 typy składników AMP:

1. Wbudowane
2. Rozszerzone

Wbudowane składniki są zawsze dostępne w dokumencie AMP i mają dedykowany element niestandardowy, taki jak `<amp-img>`. Składniki rozszerzone muszą być jawnie dołączone do dokumentu.

### Wspólne atrybuty <a name="common-attributes"></a>

#### `layout`, `width`, `height`, `media`, `placeholder`, `fallback` <a name="layout-width-height-media-placeholder-fallback"></a>

Atrybuty te definiują układ elementu. Głównym celem jest tu zapewnienie wyświetlania elementu i odpowiednie zarezerwowane miejsca na niego przed pobraniem kodu JavaScript lub jakichkolwiek zasobów zdalnych.

Szczegółowe informacje na temat systemu rozmieszczania zawiera artykuł [System układu AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-layout.md).

#### `on` <a name="on"></a>

Atrybut `on` służy do instalowania programów obsługi zdarzeń w elementach. Obsługiwane zdarzenia zależą od danego elementu.

Wartość do składni jest prostym, zależnym od domeny językiem formularza:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Przykład: `on="tap:fooId.showLightbox"`

W razie pominięcia `methodName` wykonywana jest metoda domyślna, o ile jest zdefiniowana dla elementu. Przykład: `on="tap:fooId"`

Niektóre działania, jeśli jest to udokumentowane, mogą przyjmować argumenty. Argumenty definiuje się między nawiasami w notacji `key=value`. Akceptowane są następujące wartości:

- proste ciągi znaków bez cudzysłowów: `simple-value`;
- ciągi znaków w cudzysłowach: `"string value"` lub `'string value'`;
- wartości logiczne: `true` lub `false`;
- liczby: `11` lub `1.1`.

Możesz nasłuchiwać wielu zdarzeń w jednym elemencie, oddzielając zdarzenia średnikiem `;`.

Przykład: `on="submit-success:lightbox1;submit-error:lightbox2"`

Dowiedz się więcej o [działaniach i zdarzeniach AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-actions-and-events.md).

### Składniki rozszerzone <a name="extended-components"></a>

Składniki rozszerzone nie muszą być dostarczane ze środowiskiem uruchomieniowym AMP. Muszą one natomiast zostać jawnie włączone do dokumentu.

W jednym elemencie można nasłuchiwać wielu zdarzeń, rozdzielając zdarzenia średnikiem `;`.

[sourcecode:html]

<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>

[/sourcecode]

Znacznik `<script>` musi mieć atrybut `async` i atrybut `custom-element`, odwołujący się do nazwy elementu.

Implementacje środowiska uruchomieniowego mogą używać nazwy do renderowania elementów zastępczych tych elementów.

Adres URL skryptu musi zaczynać się od <code>https://cdn.ampproject.org</code> i musi być zgodny z bardzo ścisłym wzorcem <code>/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js</code>.

##### Adres URL <a name="url"></a>

Adres URL składników rozszerzonych ma postać:

[sourcecode:http]
https://ampjs.org/$RUNTIME_VERSION/$ELEMENT_NAME-$ELEMENT_VERSION.js
[/sourcecode]

##### Przechowywanie wersji <a name="versioning"></a>

Patrz [zasady przechowywania wersji AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-versioning-policy.md).

### Szablony <a name="templates"></a>

Szablony renderują zawartość HTML w oparciu o szablon zależny od języka i dostarczone dane JSON.

Szczegółowe informacje na temat obsługiwanych szablonów przedstawia [specyfikacja szablonów AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md).

Szablony nie są dostarczane z środowiskiem uruchomieniowym AMP i muszą być pobierane tak samo jak elementy rozszerzone. Składniki rozszerzone ładuje się poprzez umieszczenie w sekcji head dokumentu znacznika `<script>` w następujący sposób:

[sourcecode:html]

<script
  async
  custom-template="amp-mustache"
  src="https://ampjs.org/v0/amp-mustache-0.2.js"
></script>

[/sourcecode]

Znacznik `<script>` musi mieć atrybut `async` i atrybut `custom-template` odwołujący się do typu szablonu. Adres URL skryptu musi zaczynać się od `https://cdn.ampproject.org` i musi stosować się do bardzo ścisłego wzorca `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

Szablony deklaruje się w dokumencie w następujący sposób:

[sourcecode:html]
<template type="amp-mustache" id="template1">
Hello {% raw %}{{you}}{% endraw %}!
</template>
[/sourcecode]

Atrybut `type` jest wymagany i musi odwoływać się do zadeklarowanego skryptu `custom-template`.

Atrybut `id` jest opcjonalny. Poszczególne elementy AMP odnajdują swoje własne szablony. Typowe scenariusze zakładają, że element AMP szuka szablonu `<template>` wśród swoich elementów podrzędnych lub wskazanych za pomocą identyfikatorów.

Składnia w elemencie szablonu zależy od języka szablonu. Język szablonu można jednak ograniczyć w AMP. Na przykład zgodnie z elementem "template" wszystkie produkcje muszą znajdować się nad prawidłowym, dobrze sformułowanym modelem DOM. Wszystkie dane wyjściowe szablonów są również poddawane oczyszczaniu, aby zapewnić, że są zgodne z AMP.

Aby dowiedzieć się więcej o składni i ograniczeniach dotyczących szablonu, odwiedź [dokumentację szablonu](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md#templates)<a>.</a>

##### Adres URL <a name="url-1"></a>

Adres URL składników rozszerzonych ma postać:

[sourcecode:http]
https://ampjs.org/$RUNTIME_VERSION/$TEMPLATE_TYPE-$TEMPLATE_VERSION.js
[/sourcecode]

##### Przechowywanie wersji <a name="versioning-1"></a>

Więcej szczegółów można znaleźć w części dotyczącej przechowywania wersji elementów niestandardowych.

## Zabezpieczenia <a name="security"></a>

Dokumenty AMP HTML nie mogą wyzwalać błędów, gdy są serwowane zgodnie z zasadami zabezpieczeń zawartości, które nie obejmują słów kluczowych `unsafe-inline` ani `unsafe-eval`.

Format AMP HTML jest zaprojektowany w taki sposób, że zawsze tak jest.

Wszystkie elementy szablonu AMP muszą przejść przez kontrolę zabezpieczeń AMP, zanim zostaną przesłane do repozytorium AMP.

## SVG <a name="svg"></a>

Obecnie dozwolone są następujące elementy SVG:

- podstawowe: "g", "glyph", "glyphRef", "image", "marker", "metadata", "path", "solidcolor", "svg", "switch", "view"
- kształty: "circle", "ellipse", "line", "polygon", "polyline", "rect"
- tekst: "text", "textPath", "tref", "tspan"
- renderowanie: "clipPath", "filter", "hkern", "linearGradient", "mask", "pattern", "radialGradient", "vkern"
- specjalne: "defs" (dozwolone są tu wszystkie powyższe elementy podrzędne), "symbol", "use"
- filtr: "feColorMatrix", "feComposite", "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "foreignObject"
- ARIA: "desc", "title"

Jak również te atrybuty:

- "xlink:href": dozwolone są tylko identyfikatory URI zaczynające się znakiem „#”
- "style"

## Odnajdywanie dokumentu AMP <a name="amp-document-discovery"></a>

Opisany poniżej mechanizm zapewnia standardowy sposób, w jaki oprogramowanie sprawdza, czy istnieje wersja AMP dokumentu kanonicznego.

Jeśli istnieje dokument AMP, który jest alternatywną reprezentacją dokumentu kanonicznego, wówczas dokument kanoniczny powinien wskazywać na dokument AMP za pomocą znacznika `link` z [relacją "amphtml"](http://microformats.org/wiki/existing-rel-values#HTML5_link_type_extensions).

Przykład:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html" />
[/sourcecode]

Sam dokument AMP ma wskazywać na swój dokument kanoniczny za pomocą znacznika `link` z relacją "canonical".

Przykład:

[sourcecode:html]

<link
  rel="canonical"
  href="https://www.example.com/url/to/canonical/document.html"
/>
[/sourcecode]

(Jeśli jeden zasób jest jednocześnie dokumentem AMP _i_ kanonicznym, relacja kanoniczna powinna wskazywać na siebie — nie jest wymagana relacja "amphtml").

Należy pamiętać, że w celu zapewnienia jak największej kompatybilności z systemami wykorzystującymi AMP możliwe powinno być odczytanie relacji "amphtml" bez wykonywania kodu JavaScript. (To znaczy, że znacznik powinien być obecny w nieprzetworzonym kodzie HTML, a nie wstrzykiwany za pomocą kodu JavaScript).
