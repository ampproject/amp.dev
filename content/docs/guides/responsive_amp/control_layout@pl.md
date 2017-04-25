---
$title: Obsługiwane układy
---

Atrybut `layout=responsive` zapewnia elastyczność elementów umieszczanych na stronie.

[TOC]

## Obsługiwane wartości atrybutu układu

Domyślnie należy stosować układy elastyczne.

Pełna lista obsługiwanych wartości atrybutów układu:

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Typ układu</th>
      <th class="col-twenty" data-th="Width/height required">Wymagana szerokość/wysokość</th>
      <th data-th="Behavior">Zachowanie</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">Nie</td>
      <td data-th="Behavior">Element niewyświetlany. Ten układ można stosować dla każdego elementu AMP. Komponent nie zajmuje miejsca na ekranie, tak jakby nie miał stylu wyświetlania. Element powinien się wyświetlać wskutek działania użytkownika, np. [<code>amp-lightbox</code>](/docs/reference/extended/amp-lightbox.html).</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Tak</td>
      <td data-th="Behavior">Nieelastyczny element o stałej szerokości i wysokości. Jedyne wyjątki to elementy [<code>amp-pixel</code>](/docs/reference/amp-pixel.html) i [<code>amp-audio</code>](/docs/reference/extended/amp-audio.html).</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Tak</td>
      <td data-th="Behavior">Rozmiar elementu jest dopasowywany do szerokości kontenera, a jego wysokość jest automatycznie dopasowywana do współczynnika proporcji określonego za pomocą atrybutów width oraz height. Ten układ bardzo dobrze współpracuje z większością elementów AMP, w tym z elementami [<code>amp-img</code>](/docs/reference/amp-img.html) oraz [<code>amp-video</code>](/docs/reference/amp-video.html). Ilość dostępnego miejsca zależy od elementu nadrzędnego i można ją również dostosowywać za pomocą stylu <code>max-width</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Tylko wysokość</td>
      <td data-th="Behavior">Element zajmuje dostępne dla niego miejsce, ale jego wysokość się nie zmienia. Ten układ bardzo dobrze współpracuje z elementami takimi jak [<code>amp-carousel</code>](/docs/reference/extended/amp-carousel.html), zawierającymi treść zorientowaną poziomo. Atrybut <code>width</code> nie może występować w kodzie lub musi mieć wartość <code>auto</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">Nie</td>
      <td data-th="Behavior">Element zajmuje dostępne dla niego miejsce zarówno dla atrybutów szerokości oraz wysokości. Innymi słowy układ elementu fill odpowiada elementowi nadrzędnemu.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">Nie</td>
      <td data-th="Behavior">Element zezwala elementom podrzędnym na samodzielne definiowanie rozmiaru, podobnie jak zwykły tag HTML <code>div</code>. Komponent nie powinien mieć żadnego określonego układu, tylko zachowywać się jak kontener. Jego elementy podrzędne renderują się błyskawicznie.</td>
    </tr>
  </tbody>
</table>

### Co się dzieje, jeśli szerokość i wysokość nie są zdefiniowane?

Jeśli atrybuty `width` lub `height` nie są zdefiniowane, standard AMP w kilku przypadkach nada im wartości domyślne w następujący sposób:

* [`amp-pixel`](/docs/reference/amp-pixel.html): szerokość i wysokość przyjmują wartość 0.
* [`amp-audio`](/docs/reference/extended/amp-audio.html): domyślne wartości dla szerokości i wysokości są wnioskowane z danych przeglądarki.

### Co się dzieje, jeśli atrybut układu nie jest zdefiniowany?

Zachowanie atrybutu jest określane w następujący sposób:

* Jeśli atrybut `height` jest obecny, a brakuje atrybutu `width` lub ma on wartość `auto`, przyjmowany jest układ `fixed-height`.
* Jeśli atrybuty `width` i `height` są obecne z atrybutem `sizes`, przyjmowany jest układ `responsive`.
* Jeśli atrybuty `width` i `height` są obecne, przyjmowany jest układ `fixed`.
* Jeśli atrybuty `width` i `height` nie są obecne, przyjmowany jest układ `container`.

## Zapytania mediów i atrybuty @media

Atrybut [`@media`](https://developer.mozilla.org/pl-PL/docs/Web/CSS/@media) służy do kontroli wyglądu i zachowania układu, tak jak w przypadku każdej innej strony.
Gdy okno przeglądarki zmienia rozmiar lub orientację, zapytania mediów są ponownie przeliczane, a elementy są ukrywane i wyświetlane na podstawie nowych wyników.

Dowiedz się więcej na temat kontrolowania układu za pomocą zapytań mediów z artykułu na temat [wykorzystania mediów CSS do uzyskania elastyczności](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=pl).

Atrybut `media` jest dodatkową funkcją z zakresu elastycznego projektowania stron dostępną w standardzie AMP.
Tego atrybutu można używać w odniesieniu do każdego elementu AMP.
Działa on podobnie do zapytań mediów stosowanych w globalnym arkuszu stylów,
jednak ma wpływ tylko na określone elementy na pojedynczej stronie.

Na przykład mamy tutaj 2 obrazy z wzajemnie wykluczającymi się zapytaniami mediów.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

W zależności od szerokości ekranu tylko jeden z nich zostanie pobrany i zrenderowany.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## Atrybut srcset i rozmiary

Atrybut `srcset` służy do kontrolowania zasobów elementów na podstawie różnych zapytań mediów.
W szczególności używa się go w przypadku wszystkich tagów [`amp-img`](/docs/reference/amp-img.html) do wskazywania, których zasobów obrazu użyć w zależności od rozmiaru ekranu.

W tym prostym przykładzie atrybut `srcset` określa, który obraz zostanie użyty, na podstawie szerokości ekranu.
Deskryptor `w` informuje przeglądarkę o szerokości każdego obrazu na liście:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Uwaga:** standard AMP obsługuje deskryptor `w` we wszystkich przeglądarkach.

Aby dowiedzieć się więcej na temat tworzenia elastycznych obrazów za pomocą atrybutu `srcset`, przeczytaj artykuł [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

Możesz także użyć atrybutu `sizes` w połączeniu z atrybutem `srcset`.
Atrybut `sizes` opisuje sposób obliczania rozmiaru elementu w oparciu o dowolne zapytanie mediów.
Klient użytkownika, na podstawie obliczonego rozmiaru elementu, dobiera najbardziej odpowiednie źródło podane przez atrybut `srcset`.

Na przykład:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

Atrybut `sizes` definiuje szerokość elementu do 50% rozmiaru widocznego obszaru, gdy ma on co najmniej 650 pikseli.
Na przykład jeśli widoczny obszar miałby 800 pikseli, szerokość elementu wynosiłaby 400 pikseli.
Następnie przeglądarka wybiera zasób `srcset` odpowiadający wartości 400 pikseli, przyjmując 1 jako proporcję piksela. W tym przypadku będzie to `narrow.jpg` (320 pikseli).

**Ważne:** gdy atrybut rozmiaru jest określony wraz z szerokością i wysokością, układ domyślnie przyjmuje wartość `responsive`.

Więcej informacji na temat sposobu porównywania zapytań mediów przez atrybuty `sizes` i `srcset` zawiera post na blogu dotyczący [atrybutów srcset i sizes](https://ericportis.com/posts/2014/srcset-sizes/).

## Korzystanie z symboli i kreacji zastępczych

### symbol zastępczy

Element oznaczony za pomocą atrybutu `placeholder` pełni funkcję symbolu zastępującego nadrzędny element AMP.
Jeśli zostanie określony, element `placeholder` musi być bezpośrednim elementem podrzędnym elementu AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Domyślnie symbol zastępczy jest natychmiast wyświetlany zamiast elementu AMP nawet w przypadku niepobrania lub braku inicjalizacji zasobów elementu AMP.
Po skonfigurowaniu element AMP zwykle ukrywa symbol zastępczy i wyświetla treść.

**Uwaga:** symbol zastępczy nie musi być elementem AMP. Może nim być dowolny element HTML.

### kreacja zastępcza

Atrybut `fallback` służy do wskazywania zachowania kreacji zastępczej w odniesieniu do dowolnego elementu nieobsługiwanego przez przeglądarkę.
Na przykład atrybut `fallback` służy do informowania użytkownika, że przeglądarka nie obsługuje określonej funkcji:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

Atrybut `fallback` można ustawić dla dowolnego atrybutu HTML, nie tylko elementów AMP.
Jeśli jest obecny w kodzie, element `fallback` musi być bezpośrednim elementem podrzędnym elementu AMP.

### noloading

Wiele elementów AMP znajduje się na białej liście, by umożliwić wyświetlanie „wskaźnika ładowania”, który jest podstawowym animowanym elementem informującym o niepełnym wczytaniu elementu.
Można wyłączyć takie zachowanie elementów za pomocą atrybutu `noloading`.
