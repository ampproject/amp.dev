---
'$title': System układu AMPHTML
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'Omówienie '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

## Omówienie

Głównym celem systemu układu jest zapewnienie elementom AMP możliwości wyrażania swojego układu w sposób umożliwiający środowisku uruchomieniowemu wywnioskowanie rozmiaru elementów przed wykonaniem wywołań jakichkolwiek zasobów zdalnych, takich jak JavaScript i dane. Jest to o tyle istotne, że znacznie ogranicza to pauzy renderowania i przewijania.

Biorąc to pod uwagę, system układu AMP zaprojektowano w taki sposób, aby obsługiwanych było niewiele, ale elastycznych układów, gwarantujących dobrą wydajność. System ten, aby wyrażać potrzeby związane z układem i rozmiarami elementu, opiera się na zestawie atrybutów takich jak `layout`, `width`, `height`, `size` i `heights`.

## Sposób działania <a name="behavior"></a>

Element AMP nie będący kontenerem (tj. `layout != container`) uruchamiany jest w trybie nierozwiązanym/niewbudowanym, w którym wszystkie jego elementy podrzędne są ukryte z wyjątkiem elementu zastępczego (patrz atrybut `placeholder`). JavaScript i ładunek danych niezbędny do pełnego skonstruowania elementu może być nadal pobierany i inicjowany, ale środowisko uruchomieniowe AMP wie już, jak dobrać rozmiar i ułożyć element jedynie przy użyciu klas CSS i atrybutów `layout`, `width`, `height` i `media`. W większości przypadków atrybut `placeholder`, jeśli jest określony, ma określone wymiary i umiejscowienie takie, aby zajęte zostało całe miejsce elementu.

Element zastępczy, wskazany za pomocą atrybutu `placeholder` jest ukrywany, gdy tylko zostanie utworzony element i jego pierwszy układ. W tym momencie oczekuje się, że wszystkie jego elementy podrzędne zostaną odpowiednio utworzone, ustawione i będą gotowe do wyświetlenia oraz do akceptowania danych wprowadzanych przez czytelnika. Jest to domyślny sposób działania. Każdy element może go zastąpić, np. szybciej ukryć element zastępczy, wskazany za pomocą atrybutu `placeholder` lub wyświetlać go dłużej.

Element jest wymiarowany i wyświetlany przez środowisko uruchomieniowe na podstawie atrybutów `layout`, `width`, `height` i `media`. Wszystkie reguły układu są implementowane wewnętrznie za pomocą CSS. Mówi się, że element „definiuje rozmiar”, jeśli jego rozmiar jest określany za pomocą stylów CSS i nie zmieniają go elementy podrzędne: dostępne natychmiast lub wstawiane dynamicznie. Nie znaczy to, że rozmiar tego elementu nie może się zmienić. Układ może być w pełni responsywny, jak w przypadku układów `responsive`, `fixed-height`, `fill` i `flex-item`. Znaczy to po prostu, że rozmiar nie zmienia się bez jawnego działania użytkownika, np. podczas renderowania, przewijania lub pobierania postu.

Jeżeli element został nieprawidłowo skonfigurowany, to w trybie PROD w ogóle nie zostanie wyrenderowany, a w trybie DEV środowisko uruchomieniowe wyrendekuje element w stanie błędu. Możliwe błędy obejmują nieprawidłowe lub nieobsługiwane wartości atrybutów `layout`, `width` i `height`.

## Atrybuty układu <a name="layout-attributes"></a>

### `width` i `height` <a name="width-and-height"></a>

W zależności od wartości atrybutu `layout`, elementy składnika AMP muszą mieć atrybuty `width` i `height`, zawierające wartość liczby całkowitej pikseli. Rzeczywisty sposób działania układu jest określony przez atrybut `layout`, jak opisano poniżej.

W kilku przypadkach, jeśli atrybuty `width` lub `height` nie są określone, środowisko uruchomieniowe AMP może domyślnie ustawić następujące ich wartości:

- <a><code data-md-type="codespan">amp-pixel</code></a>: zarówno szerokość jak i wysokość są domyślnie ustawiane na 0.
- <a><code data-md-type="codespan">amp-audio</code></a>: domyślna szerokość i wysokość są podawane z przeglądarki.

### `layout` <a name="layout"></a>

AMP zapewnia zestaw układów, które określają sposób działania składnika AMP w układzie dokumentu. Można określić układ składnika poprzez dodanie atrybutu `layout` z jedną z wartości podanych w poniższej tabeli.

**Przykład**: prosty, responsywny obraz, w którym atrybuty width i height są używane do określenia współczynnika proporcji.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

Obsługiwane wartości atrybutu `layout`:

<table>
  <thead>
    <tr>
      <th width="30%">Wartość</th>
      <th>Sposób działania i wymagania</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nieobecna</td>
      <td>Jeśli nie podano żadnej wartości, układ danego składnika jest określany w następujący sposób:         <ul>
<li>Jeśli atrybut <code>height</code> jest obecny, a brakuje atrybutu <code>width</code> lub ma on ustawienie <code>auto</code>, przyjmowany jest układ <code>fixed-height</code>.</li> <li>Jeśli obecny jest zarówno atrybut <code>width</code>, jak i <code>height</code> oraz atrybut <code>sizes</code> lub <code>heights</code>, przyjmowany jest układ  <code>responsive</code>.</li> <li>Jeśli obecny jest zarówno atrybut <code>width</code>, jak i <code>height</code>, przyjmowany jest układ <code>fixed</code>.</li> <li> Jeśli brakuje zarówno atrybutu <code>width</code>, jak i <code>height</code>, przyjmowany jest układ <code>container</code>.</li> </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>Element pozwala swoim elementom podrzędnym określić jego rozmiar, podobnie jak zwykły <code>div</code> w HTML. Zakłada się, że składnik sam w sobie nie ma określonego układu, a jedynie działa jako kontener; jego elementy podrzędne są renderowane natychmiast.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Element zajmuje dostępne miejsce, zarówno na szerokość jak i wysokość. Innymi słowy, układ i rozmiar elementu <code>fill</code> odpowiada jego elementowi nadrzędnemu. Aby element wypełnił swój kontener nadrzędny, kontener ten musi mieć układ „fill” oraz właściwości <code>position:relative</code> albo <code>position:absolute</code>.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Element ma stałą szerokość i wysokość, bez obsługi responsywności. Muszą być obecne atrybuty <code>width</code> i <code>height</code>. Jedynymi wyjątkami są składniki <code>amp-pixel</code> oraz <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Element zajmuje dostępne dla niego miejsce, ale utrzymuje wysokość bez zmian. Ten układ działa dobrze w przypadku elementów takich jak <code>amp-carousel</code>, które zawierają treści rozmieszczone poziomo. Atrybut <code>heights</code> musi być obecny. Atrybut <code>width</code> nie może być obecny lub musi mieć wartość <code>auto</code>.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Element i inne elementy w elemencie nadrzędnym z typem układu <code>flex-item</code> zajmują pozostałe miejsce w kontenerze nadrzędnym, gdy jest to kontener elastyczny (tj. <code>display: flex</code>). Atrybuty <code>width</code> i <code>height</code> nie są wymagane.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Element zajmuje dostępne dla niego miejsce i automatycznie zmienia wysokość wg współczynnika proporcji obrazu podanego przez atrybuty <code>width</code> i <code>height</code> <em>aż do</em> osiągnięcia rozmiaru elementu zdefiniowanego przez te atrybuty przekazane do elementu <code>amp-img</code> albo osiągnięcia ograniczenia CSS, takiego jak max-width. Muszą być obecne atrybuty width i height. Układ ten działa bardzo dobrze w przypadku większości elementów AMP, w tym <code>amp-img</code>, <code>amp-carousel</code>, itd. Dostępne miejsce zależy od elementu nadrzędnego i można ją również dostosować za pomocą właściwości CSS <code>max-width</code>. Ten układ różni się od układu <code>responsive</code>, gdyż ma własną wysokość i szerokość. Jest to najbardziej widoczne w elemencie przestawianym, w którym układ <code>responsive</code> będzie renderować 0x0, a układ <code>intrinsic</code> będzie powiększany do osiągnięcia mniejszego z jego naturalnych rozmiarów lub ograniczenia CSS.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Element nie jest wyświetlany i zajmuje zero miejsca na ekranie, jakby miał właściwość display style <code>none</code>. Ten układ można stosować do każdego elementu AMP.  Zakłada się, że element może wyświetlać się sam wskutek działania użytkownika (np. <code>amp-lightbox</code>). Atrybuty <code>width</code> i <code>height</code> nie są wymagane.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Element zajmuje dostępne dla niego miejsce i automatycznie zmienia wysokość wg współczynnika proporcji obrazu podanego przez atrybuty <code>width</code> i <code>height</code>. Układ ten działa bardzo dobrze w przypadku większości elementów AMP, w tym <code>amp-img</code>, <code>amp-carousel</code>, itd. Dostępne miejsce zależy od elementu nadrzędnego i można je również dostosować za pomocą właściwości CSS <code>max-width</code><p>. Muszą być obecne atrybuty <code>width</code> i <code>height</code>.</p>
<p> <strong>Uwaga</strong>: elementy z atrybutem <code>"layout=responsive"</code> nie mają własnego rozmiaru. Rozmiar elementu jest określany na podstawie elementu jego kontenera. Aby zapewnić wyświetlanie elementu AMP, należy określić szerokość i wysokość elementu zawierającego. Nie należy określać właściwości <code>"display:table"</code> w elemencie zawierającym, ponieważ unieważnia to wyświetlanie elementu AMP, czyniąc element AMP niewidocznym.</p></cod>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Wszystkie elementy AMP, które obsługują układ `responsive`, obsługują także atrybut `sizes`. Wartość tego atrybutu jest wyrażeniem rozmiaru opisanym w atrybucie [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), ale rozszerzonym na wszystkie elementy, nie tylko obrazy. W skrócie, atrybut `size` opisuje sposób obliczania szerokości elementu w zależności od warunków mediów.

Gdy atrybut `sizes` jest określony wraz z atrybutami `width` i `height`, ustawiana jest domyślna wartość atrybutu `layout`, `responsive`.

**Przykład**: użycie atrybutu `sizes`

W poniższym przykładzie, jeśli okienko na ekranie jest szersze niż `320px`, obraz będzie miał szerokość 320px, w przeciwnym razie będzie miał szerokość 100vw (100% szerokości okienka na ekranie).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

Atrybut `sizes` ustawi samodzielnie na elemencie styl inline `width`. Podczas parowania atrybutu `disable-inline-width` z atrybutem `sizes` element AMP będzie propagować wartość atrybutu `sizes` do podstawowego znacznika elementu, jak w przypadku elementu `img` zagnieżdżonego w elemencie `amp-img`, **bez** ustawiania atrybutu `width` inline, co atrybut `sizes` zazwyczaj robi samodzielnie w AMP.

**Przykład**: użycie atrybutu `disable-inline-width`

W poniższym przykładzie szerokość elementu `<amp-img>` nie jest zmieniana, a atrybut `sizes` jest używany tylko do wybrania jednego ze źródeł z `srcset`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

Wszystkie elementy AMP, które obsługują układ `responsive`, obsługują także atrybut `heights`. Wartość tego atrybutu jest wyrażeniem sizes bazującym na wyrażeniach media, podobnym do [atrybutu sizes w znacznikach img, ale z dwoma kluczowymi różnicami:](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

1. Wartość dotyczy wysokości, a nie szerokości elementu.
2. Dozwolone są wartości procentowe, np. `86%`. Jeśli użyta zostanie wartość procentowa, wskazuje ona procent szerokości elementu.

Gdy atrybut `heights` jest określony wraz z atrybutami `width` i `height`, ustawiana jest domyślna wartość atrybutu `layout`, `responsive`.

**Przykład**: użycie atrybutu `heights`

W poniższym przykładzie wysokość obrazu będzie domyślnie wynosiła 80% szerokości, ale jeśli okienko na ekranie ma szerokość większą niż `500px`, wysokość jest ograniczona do `200px`. Jako że atrybut `heights` jest określony wraz z atrybutami `width` i `height`, domyślnie ustawiany jest układ `responsive`.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

Większość elementów AMP obsługuje atrybut `media`. Wartość atrybutu `media` to zapytanie o media. Jeśli zapytanie nie zwraca dopasowania, element nie jest renderowany, a jego zasoby i potencjalnie zasoby podrzędne nie są pobierane. Jeśli okno przeglądarki zmieni rozmiar lub orientację, zapytania o media są ponownie oceniane, a elementy są ukrywane i wyświetlane na podstawie nowych wyników.

**Przykład**: użycie atrybutu `media`

W poniższym przykładzie mamy 2 obrazy z wzajemnie wykluczającymi się zapytaniami o media. W zależności od szerokości ekranu zostanie pobrany i wyrenderowany jeden z tych dwóch obrazów. Atrybut `media` jest dostępny na wszystkich elementach AMP, więc może być używany z elementami innymi niż obrazy, takimi jak reklamy.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

Atrybut `placeholder` można ustawić w dowolnym elemencie HTML, nie tylko elementach AMP. Atrybut `placeholder` wskazuje, że element oznaczony tym atrybutem działa jako element zastępczy nadrzędnego elementu AMP. Atrybut ten można umieścić w dowolnym elemencie HTML, który jest bezpośrednim elementem podrzędnym elementu AMP. Domyślnie elementy zastępcze elementu AMP są wyświetlane natychmiast, nawet jeśli zasoby elementu AMP nie zostały pobrane lub zainicjowane. Gdy element AMP jest już gotowy, zazwyczaj ukrywa elementy zastępcze i pokazuje swoją zawartość. Dokładny sposób działania elementu zastępczego zależy od implementacji elementu. AMP

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

Atrybut `fallback` można ustawić w dowolnym elemencie HTML, nie tylko elementach AMP. Fallback jest konwencją, która pozwala na poinformowanie czytelnika, że dany element nie jest obsługiwany przez przeglądarkę. Jeśli jest określony, element fallback musi być bezpośrednim elementem podrzędnym elementu AMP. Dokładny sposób działania elementu fallback zależy od implementacji elementu AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

Atrybut `noloading` wskazuje, czy „wskaźnik ładowania” danego elementu ma być wyłączony. Wiele elementów AMP może pokazywać „wskaźnik ładowania”, czyli prostą animację pokazującą, że element nie został jeszcze w pełni załadowany. Dodanie tego atrybutu powoduje wyłączenie tego sposobu działania elementów.

## (tl;dr) Podsumowanie wymagań i sposobów działania dotyczących układu <a name="tldr-summary-of-layout-requirements--behaviors"></a>

Poniższa tabela przedstawia dopuszczalne parametry, klasy CSS oraz style używane w przypadku atrybutu `layout`. Należy pamiętać, że:

1. Każda klasa CSS z prefiksem `-amp-` oraz elementy z prefiksem `i-amp-` są uważane za wewnętrzne elementy AMP i ich użycie w arkuszach stylów użytkownika jest niedozwolone. Są one pokazane tutaj jedynie w celach informacyjnych.
2. Mimo że atrybuty `width` i `height` są określone w tabeli zgodnie z wymaganiami, mogą mieć zastosowanie reguły domyślne, tak jak w przypadku składników `amp-pixel` i `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Układ</th>
      <th width="20%">Atrybut width/<br>height wymagany?</th>
      <th width="20%">Definiuje rozmiar?</th>
      <th width="20%">Dodatkowe elementy</th>
      <th width="19%">Właściwość CSS „display”</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Nie</td>
      <td>Nie</td>
      <td>Nie</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Nie</td>
      <td>Tak, rozmiar elementu nadrzędnego.</td>
      <td>Nie</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Tak</td>
      <td>Tak, określony przez atrybuty <code>width</code> i <code>height</code>.</td>
      <td>Nie</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td> Tylko <code>height</code>; <code>width</code> może mieć wartość <code>auto</code>
</td>
      <td>Tak, określony przez kontener nadrzędny i atrbut <code>height</code>.</td>
      <td>Nie</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Nie</td>
      <td>Nie</td>
      <td>Tak, w zależności od kontenera nadrzędnego</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Tak</td>
      <td>Tak, na podstawie kontenera nadrzędnego i współczynnika proporcji <code>width:height</code>.</td>
      <td>Tak, <code>i-amphtml-sizer</code>.</td>
      <td> <code>block</code> (zachowuje się jak <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow"> zastąpiony element</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Nie</td>
      <td>Nie</td>
      <td>Nie</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Tak</td>
      <td>Tak, na podstawie kontenera nadrzędnego i współczynnika proporcji <code>width:height</code>.</td>
      <td>Tak, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
