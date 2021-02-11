---
'$title': Działania i zdarzenia
$order: 0
formats:
  - websites
  - stories
  - ads
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md.
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

[tip type="note"] Dokumentacja ta przedstawia działania i zdarzenia dotyczące witryn internetowych, relacji i reklam AMP. Artykuł [Działania i zdarzenia w poczcie elektronicznej AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md) opisuje format poczty elektronicznej AMP. [/tip]

Atrybut `on` służy do instalowania programów obsługi zdarzeń w elementach. Obsługiwane zdarzenia zależą od danego elementu.

Wartość do składni jest prostym, zależnym od domeny językiem formularza:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Opisy poszczególnych części składni znajdują się w poniższej tabeli.

<table>
  <tr>
    <th width="30%">Składnia</th>
    <th width="18%">Wymagane?</th>
    <th width="42%">Opis</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>tak</td>
    <td>Jest to nazwa zdarzenia, którą eksponuje dany element.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>tak</td>
    <td>Jest to identyfikator modelu DOM elementu lub predefiniowany <a href="#special-targets">cel specjalny</a>, ktorego ma dotyczyc dzialanie wykonywane w odpowiedzi na zdarzenie. W nastepujacym przykladzie, <code>targetId</code> to identyfikator modelu DOM docelowego elementu skladnika <code>amp-lightbox</code>, <code>photo-slides</code>.   <pre>&lt;amp-lightbox id="photo-slides">&lt;/amp-lightbox>
&lt;button on="tap:photo-slides">Show Images&lt;/button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>nie</td>
    <td>Do elementów z działaniami domyślnymi.<p>Jest to metoda, którą ujawnia element docelowy (określony za pomocą <code>targetId</code>), a ktora ma zostać wykonana po wyzwoleniu zdarzenia.</p> <p>AMP ma koncepcję działania domyślnego, które mogą implementować elementy. W razie pominięcia <code>methodName</code> AMP wykona ową metodę domyślną.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>nie</td>
    <td>Niektóre działania, jeśli są udokumentowane, mogą przyjmować argumenty. Argumenty są definiowane między nawiasami w notacji <code>key=value</code>. Przyjmowane są wartości: <ul> <li>proste ciągi znaków bez cudzysłowów: <code>simple-value</code> </li> <li>ciągi znaków w cudzysłowach: <code>"string value"</code> lub <code>'string value'</code> </li> <li>wartości logiczne: <code>true</code> albo <code>false</code> </li> <li>liczby: <code>11</code> lub <code>1.1</code> </li> <li>odniesienie o składni z kropką do danych dotyczących zdarzeń: <code>event.someDataVariableName</code> </li> </ul>
</td>
  </tr>
</table>

## Obsługa wielu zdarzeń <a name="handling-multiple-events"></a>

Możesz nasłuchiwać wielu zdarzeń w jednym elemencie, oddzielając zdarzenia średnikiem `;`.

Przykład: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Wiele działań w przypadku jednego zdarzenia <a name="multiple-actions-for-one-event"></a>

Możesz wykonać wiele kolejnych działań dotyczących tego samego zdarzenia, oddzielając je przecinkiem „,”.

Przykład: `on="tap:target1.actionA,target2.actionB"`

## Wydarzenia i działania definiowane globalnie <a name="globally-defined-events-and-actions"></a>

AMP definiuje globalnie zdarzenie `tap`, którego można nasłuchiwać w każdym elemencie HTML (włącznie z elementami AMP).

AMP definiuje globalnie również działania `hide`, `show` i `toggleVisibility`, które można wyzwalać w dowolnym elemencie HTML.

[tip type="note"]

Element może być pokazany tylko wtedy, gdy wcześniej został ukryty za pomocą działania `hide` lub `toggleVisibility`, lub przy użyciu atrybutu [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). Działanie `show` nie obsługuje elementów ukrytych przez CSS `display:none` lub AMP `layout=nodisplay`.

Na przykład w AMP możliwe jest:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Zdarzenia zależne od elementu <a name="element-specific-events"></a>

### \* - wszystkie elementy <a name="---all-elements"></a>

<table>
  <tr>
    <th>Zdarzenie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Uruchamiane po kliknięciu/dotknięciu elementu.</td>
  </tr>
</table>

### Elementy wejściowe <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Zdarzenie</th>
    <th width="30%">Opis</th>
    <th width="40%">Elementy</th>
    <th>Dane</th>
  </tr>
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Uruchamiane, gdy wartość elementu zostanie zmieniona i zatwierdzona. <p> Właściwości danych odzwierciedlają te w elementach <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> i <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Uruchamiane, gdy wartość elementu zostanie zmieniona. Jest podobne do standardowego zdarzenia <code>change</code>, ale jest uruchamiane dopiero po upływie 300 ms od momentu, gdy wartość wejściowa przestanie się zmieniać.</td>
    <td>Elementy uruchamiające zdarzenie <code>input</code>.</td>
    <td>Te same, co dane zdarzenia <code>change</code>.</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>Uruchamiane, gdy wartość elementu zostanie zmieniona. Jest podobne do standardowego zdarzenia <code>change</code>, ale jego uruchomienie jest ograniczane do co najwyżej jednego razu na 100 ms podczas zmiany wartości wejściowej.</td>
    <td>Elementy uruchamiające zdarzenie <code>input</code>.</td>
    <td>Te same, co dane zdarzenia <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > section <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Uruchamiane, gdy sekcja accordion zostanie rozwinięta.</td>
    <td>Brak.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Uruchamiane, gdy sekcja accordion zostanie zwinięta.</td>
    <td>Brak.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Uruchamiane, gdy zmienia się bieżący slajd karuzeli.</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Uruchamiane, gdy lightbox jest w pełni widoczny.</td>
    <td>Brak.</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Uruchamiane, gdy lightbox jest w pełni zamknięty.</td>
    <td>Brak.</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Aktualizuje układ elementu <code>amp-list</code> do <code>layout="CONTAINTER"</code>, aby umożliwić <a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">dynamiczną zmianę rozmiarów</a>.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(niskiego zaufania)</td>
    <td>Uruchamiane, gdy nie uda się pobrać danych.</td>
    <td>Brak.</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Uruchamiane, gdy opcja zostanie zaznaczona lub wyczyszczona.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Uruchamiane, gdy pasek boczny jest całkowicie otwarty po zakończeniu przejścia.</td>
    <td>Brak.</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Uruchamiane, gdy pasek boczny jest całkowicie zamknięty po zakończeniu przejścia.</td>
    <td>Brak.</td>
  </tr>
</table>

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(niskiego zaufania)</td>
    <td>Uruchamiane, gdy nie uda się pobrać danych.</td>
    <td>Brak.</td>
  </tr>
</table>

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code> (niskiego zaufania)</td>
    <td>Uruchamiane przy pierwszym odtworzeniu filmu przez użytkownika. W przypadku filmów z autoodtwarzaniem jest ono uruchamiane w momencie, gdy użytkownik wchodzi w interakcję z filmem. Jest to zdarzenie niskiego zaufania, czyli nie może wyzwolić większości działań; można uruchamiać tylko działania niskiego zaufania, takie jak <code>amp-animation</code>.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code> (niskiego zaufania)</td>
    <td>Uruchamiane po zmianie pozycji odtwarzania filmu. Częstotliwość zdarzenia jest kontrolowana przez AMP i jest aktualnie ustawiana na 1-sekundowe odstępy czasu. Jest to zdarzenie niskiego zaufania, czyli nie może wyzwolić większości działań; można uruchamiać tylko działania niskiego zaufania, takie jak <code>amp-animation</code>.</td>
    <td> <code>{time, percent}</code><code>time</code> wskazuje bieżący czas w sekundach, <code>percent</code> jest liczbą z zakresu od 0 do 1 i wskazuje aktualną pozycję jako procent czasu całkowitego.</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">Zdarzenie</th>
    <th width="35%">Opis</th>
    <th width="40%">Dane</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Uruchamiane po przesłaniu formularza.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Uruchamiane, gdy odpowiedź na przesłanie formularza to „success”.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Uruchamiane, gdy odpowiedź na przesłanie formularza to „error”.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Uruchamiane, gdy formularz jest prawidłowy.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Uruchamiane, gdy formularz jest nieprawidłowy.</td>
    <td></td>
  </tr>
</table>

## Działania zależne od elementu <a name="element-specific-actions"></a>

### \* (wszystkie elementy) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Ukrywa element docelowy.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Pokazuje element docelowy. Jeśli w wyniku tego <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">element <code>autofocus</code></a> stanie się widoczny, zyska fokus.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Przełącza widoczność elementu docelowego. Jeśli w wyniku tego <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">element <code>autofocus</code></a> stanie się widoczny, zyska fokus.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Przełącza klasę elementu docelowego. Instrukcja <code>force</code> jest opcjonalna i jeśli została zdefiniowana, zapewnia, że klasa zostanie dodana, ale nie zostanie usunięta, jeśli zostanie ustawiona na <code>true</code>, a tylko usunięta, ale nie dodana, jeśli zostanie ustawiona na <code>false</code>.</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Przewija element do widoku z płynną animacją.<br>Parametr <code>duration</code> jest opcjonalny. Określa długość animacji w milisekundach. Jeśli nie jest określony, używana jest wartość względna różnicy przewijania, równa 500 milisekundom lub mniejsza.<br>Atrybut <code>position</code> jest opcjonalny. Jeden z następujących: <code>top</code>, <code>center</code> lub <code>bottom</code>. (domyślnie <code>top</code>)). Określa pozycję elementu po przewinięciu względem okienka ekranu.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Sprawia, że element docelowy zyskuje fokus. Aby stracił fokus, ustaw <code>focus</code> na inny element (zwykle element nadrzędny). Ze względów dostępności zdecydowanie odradzamy usuwanie fokusu poprzez ustawienie go na <code>body</code>/<code>documentElement</code>.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Odtwarza dźwięk. Jest pusta, jeśli element <code>&lt;amp-audio></code> jest elementem potomnym elementu <code>&lt;amp-story></code>.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Wstrzymuje dźwięk. Jest pusta, jeśli element <code>&lt;amp-audio></code> jest elementem potomnym elementu <code>&lt;amp-story></code>.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Odtwarza animację.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Wstrzymuje animację.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>Zatrzymuje animację.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>Ustawia currentTime animacji na określoną wartość i wstrzymuje animację.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>Używa podanej wartości procentowej do określenia currentTime animacji jako podanej wartości i wstrzymuje animację</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Przełącza stany <code>expanded</code> i <code>collapsed</code> sekcji elementu <code>amp-accordion</code>. W razie wywołania bez argumentów przełącza wszystkie sekcje akordeonu. Aby wyzwolić w żądanej sekcji, należy podać identyfikator sekcji: <code>on="tap:myAccordion.toggle(section=id')"</code>
</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Rozwija sekcje akordeonu. Jeśli sekcja jest już rozwinięta, pozostaje rozwinięta. W razie wywołania bez argumentów rozwija wszystkie sekcje akordeonu. Aby wyzwolić w żądanej sekcji, należy podać identyfikator sekcji: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Zwija sekcje akordeonu. Jeśli jakaś sekcja jest już zwinięta, pozostaje zwinięta. Gdy jest wywoływany bez argumentów, zwija wszystkie sekcje akordeonu. Aby wyzwolić w żądanej sekcji, należy podać identyfikator sekcji: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Przesuwa karuzelę do określonego wskaźnika slajdu.</td>
  </tr>
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>Przełącza status autoodtwarzania karuzeli. <code>toggleOn</code> jest opcjonalny.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Otwiera element lightbox obrazu z obrazem źródłowym, który wyzwolił działanie.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Otwiera lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Zamyka lightbox.</td>
  </tr>
</table>

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>Otwiera lightbox-gallery. Może być wyzwalane przez dotknięcie innego elementu, jeśli określisz identyfikator obrazu: `on="tap:amp-lightbox-gallery.open(id='image-id')"`.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Odświeża dane z <code>src</code> i ponownie renderuje listę.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>Aktualizuje elementy modelu DOM, aby wyświetlić zaktualizowaną zawartość.</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Usuwa wszystkie wybory z określonego elementu <code>amp-selector</code>.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Przesuwa wybór w górę o wartość „delta”. Domyślna wartość „delta” jest ustawiona na -1. Jeśli nie wybrano żadnych opcji, wybrany stan staje się wartością ostatniej opcji.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Przesuwa wybór w dół o wartość „delta”. Domyślna wartość „delta” jest ustawiona na 1. Jeśli nie wybrano żadnych opcji, wybrany stan staje się wartością ostatniej opcji.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Przełącza stosowanie atrybutu „selected”. Jeśli atrybut select jest nieobecny, działanie dodaje go. Jeśli atrybut select jest obecny, działanie usuwa go. Można wymusić i zachować dodanie lub usunięcie poprzez włączenie wartości boolean do argumentu „value”. Wartość „true” wymusi dodanie atrybutu „selected” i nie usunie go, jeśli jest już obecny. Wartość „false” poskutkuje usunięciem atrybutu, ale nie doda go, jeśli go nie ma.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Otwiera pasek boczny.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Zamyka pasek boczny.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Przełącza stan paska bocznego.</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Ponownie pobiera dane w atrybucie „src”, ignorując jednocześnie pamięć podręczną przeglądarki.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>Ukrywa element powiadomienia użytkownika, do którego odnosi się odwołanie.</td>
  </tr>
</table>

### Elementy wideo <a name="video-elements"></a>

Poniższe działania są obsługiwane w następujących elementach wideo AMP: `amp-video`, `amp-youtube`, `amp-3q-player`, `amp-brid-player`, `amp-dailymotion`, `amp-delight-player`, `amp-ima-video`.

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Odtwarza wideo.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Wstrzymuje wideo.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>Wycisza wideo.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>Cofa wyciszenie wideo.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>Przenosi wideo na pełny ekran.</td>
  </tr>
</table>

### form <a name="form-1"></a>

<table>
  <tr>
    <th>Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Czyści wszelkie wartości w polach wprowadzania formularza.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Przesyła formularz.</td>
  </tr>
</table>

## Cele specjalne <a name="special-targets"></a>

Poniżej przedstawione są cele systemu AMP, które mają specjalne wymagania:

### Cel: AMP <a name="target-amp"></a>

Cel `AMP` jest dostarczany przez środowisko uruchomieniowe AMP i implementuje działania najwyższego poziomu, stosowane do całego dokumentu.

<table>
  <tr>
    <th width="40%">Działanie</th>
    <th>Opis</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Kieruje bieżące okno do podanego adresu URL, do opcjonalnie podanego celu (aktualnie obsługiwane są tylko <code>_top</code> oraz <code>_blank </code>). Opcjonalny parametr <code>opener</code> można określić podczas używania celu <code>_blank</code>, aby umożliwić nowo otwartej stronie dostęp do <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a>. Obsługuje <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md"> standardowe podstawienia adresów URL</a>.</p>
      <p><strong>Zastrzeżenie:</strong> w miarę możliwości zalecane jest używanie zwykłych linków <code>&lt;a></code>, ponieważ element <code>AMP.navigateTo</code> nie jest rozpoznawany przez internetowe roboty indeksujące.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Próbuje zamknąć okno, jeśli jest to dozwolone, w przeciwnym razie nawiguje podobnie jak działanie <code>navigateTo</code>. Przydatne w przypadkach, gdy przycisk Wstecz może wymagać zamknięcia okna, jeśli zostało ono otwarte w nowym oknie z poprzedniej strony lub nawigacji, jeśli nie zostało ono otwarte.</p>
      <p><strong>Zastrzeżenie:</strong> w miarę możliwości zalecane jest używanie zwykłych linków <code>&lt;a></code>, ponieważ element <code>AMP.navigateTo</code> nie jest rozpoznawany przez internetowe roboty indeksujące.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>Przechodzi wstecz w historii.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>Otwiera okno dialogowe drukowania, aby wydrukować bieżącą stronę.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>Przewija do podanego identyfikatora elementu na bieżącej stronie.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>Wyłącza opcję generowania identyfikatora klienta dla wszystkich zakresów.</td>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Wymaga składnika <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Scala literał obiektu w stan umożliwiający wiązanie.</p>
      <p></p>
    </td>
  </tr>
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Wymaga składnika <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>.</p>
      <p>Scala literał obiektu w stan umożliwiający wiązanie i przesuwa nowy wpis do stosu historii przeglądarki. Przetworzenie wpisu przywróci poprzednie wartości zmiennych (w tym przykładzie <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup>Jeśli używane jest z <a href="#multiple-actions-for-one-event">wieloma działaniami</a>, kolejne działania będą przed wywołaniem czekać na wykonanie działań <code>setState()</code> lub <code>pushState()</code>. Na jedno zdarzenie dozwolone jest tylko jedno działanie <code>setState()</code> lub <code>pushState()</code>.

### Cel: amp-access <a name="target-amp-access"></a>

Cel `amp-access` jest dostarczany przez składnik [amp-access](https://amp.dev/documentation/components/amp-access.html).

Cel `amp-access` jest specjalny z następujących powodów:

1. Nie można nadać temu celowi dowolnego identyfikatora. Celem jest zawsze `amp-access`.
2. Działania `amp-access` są dynamiczne w zależności od struktury [konfiguracji składnika AMP Access](https://amp.dev/documentation/components/amp-access#configuration).

Zobacz [szczegóły](https://amp.dev/documentation/components/amp-access#login-link) dotyczące stosowania celu `amp-access`.
