---
'$title': Zapytania o układ i media
$order: 1
description: AMP obsługuje zarówno zapytania o media, jak i o elementy, a do tego ma wbudowany, wydajny sposób kontroli układu poszczególnych elementów. Atrybut layout sprawia, że praca...
formats:
  - websites
  - email
  - ads
  - stories
author: Meggin
contributors:
  - pbakaus
---

AMP obsługuje zarówno **zapytania o media**, jak i **o elementy**, a do tego ma wbudowany, wydajny sposób kontroli **układu** poszczególnych elementów. Atrybut `layout` sprawia, że praca i tworzenie w pełni responsywnego projektu są o wiele łatwiejsze, niż gdyby używać samego CSS.

## Obrazy responsywne, łatwe do wykonania

Twórz responsywne obrazy poprzez określenie atrybutów `width` i `height`, ustawienie układu na `responsive` i wskazanie zasobu obrazu do użycia za pomocą atrybutu [`srcset`](art_direction.md) w zależności od różnych rozmiarów ekranu:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Ten element [`amp-img`](../../../../documentation/components/reference/amp-img.md) automatycznie dopasowuje się do szerokości elementu jego kontenera, a jego wysokość jest automatycznie ustawiana na współczynnik proporcji wyznaczony przez daną szerokość i wysokość. Wypróbuj go, zmieniając rozmiar tego okna przeglądarki:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="tip"] **TIP –** See our side-by-side live demos of [`amp-img`](../../../../documentation/components/reference/amp-img.md): [Live Demos on AMP By Example](../../../../documentation/examples/documentation/amp-img.html?format=websites). [/tip]

## Atrybut layout <a name="the-layout-attribute"></a>

Atrybut <code>layout</code> daje Ci łatwą kontrolę nad sposobem renderowania elementu na ekranie. Wiele z tych rzeczy jest możliwych dzięki czystemu CSS — jest to jednak znacznie trudniejsze i wymaga niezliczonych hacków. Lepiej zamiast tego użyć atrybutu <code>layout</code>.

### Obsługiwane wartości atrybutu `layout`

W atrybucie `layout` można stosować następujące wartości:

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">Typ atrybutu layout</th>
      <th data-th="Width/height required" class="col-twenty">Szerokość / wysokość<br> wymagana</th>
      <th data-th="Behavior">Sposób działania</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">Nie</td>
      <td data-th="Behavior">Element nie jest wyświetlany. Ten układ można zastosować do każdego elementu AMP. Element zajmuje zero miejsca na ekranie, tak jakby miał styl wyświetlania none. Zakłada się, że element może się wyświetlać wskutek działania użytkownika, na przykład <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">Tak</td>
      <td data-th="Behavior">Element ma stałą szerokość i wysokość, bez obsługi responsywności. Jedynymi wyjątkami są elementy <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> oraz <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">Tak</td>
      <td data-th="Behavior">Rozmiary elementu są ustawiane na szerokość elementu kontenera i automatycznie zmieniana jest wysokość elementu wg proporcji podanych przez atrybuty width i height. Układ ten działa bardzo dobrze w przypadku większości elementów AMP, w tym <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> i <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. Dostępne miejsce zależy od elementu nadrzędnego i można je również dostosować za pomocą CSS <code>max-width</code>.<p><strong>Uwaga</strong>: elementy z atrybutem {code 7}"layout=responsive" nie mają własnego rozmiaru. Rozmiar elementu jest określany na podstawie elementu jego kontenera. Aby zapewnić wyświetlanie elementu AMP, należy określić szerokość i wysokość elementu zawierającego. Nie należy określać <code>"display:table"</code> w elemencie zawierającym, ponieważ unieważnia to wyświetlanie elementu AMP, czyniąc element AMP niewidocznym.</p></cod>
</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">Tylko wysokość</td>
      <td data-th="Behavior">Element zajmuje dostępne dla niego miejsce, ale utrzymuje wysokość bez zmian. Ten układ działa dobrze w przypadku elementów takich jak <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, które zawierają treści rozmieszczone poziomo. Atrybut <code>width</code> nie może być obecny lub musi mieć wartość <code>auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">Nie</td>
      <td data-th="Behavior">Element zajmuje dostępne miejsce, zarówno na szerokość jak i wysokość. Innymi słowy, układ elementu wypełniającego odpowiada jego elementowi nadrzędnemu. Aby element wypełnił swój kontener nadrzędny, kontener ten musi mieć właściwość `position:relative` albo `position:absolute`.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">Nie</td>
      <td data-th="Behavior">Element pozwala swoim elementom podrzędnym określić jego rozmiar, podobnie jak zwykły <code>div</code> w HTML. Zakłada się, że składnik sam w sobie nie ma określonego układu, a jedynie działa jako kontener. Jego elementy podrzędne są renderowane natychmiast.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">Nie</td>
      <td data-th="Behavior">Dany element i inne elementy w elemencie nadrzędnym zajmują pozostałe miejsce w kontenerze nadrzędnym, gdy jest to kontener elastyczny (tzn. <code>display:flex</code>). Rozmiar elementu jest określany przez element nadrzędny i liczbę innych elementów wewnątrz elementu nadrzędnego, zgodnie z właściwością CSS układu <code>display:flex</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">Tak</td>
      <td data-th="Behavior">Element zajmuje dostępne dla niego miejsce i automatycznie zmienia wysokość wg współczynnika proporcji obrazu podanego przez atrybuty <code>width</code> i <code>height</code> <em>aż do</em> osiągnięcia naturalnego rozmiaru elementu albo osiągnięcia ograniczenia CSS (tj. max-width). Muszą być obecne atrybuty width i height. Układ ten działa bardzo dobrze w przypadku większości elementów AMP, w tym <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, itd. Dostępne miejsce zależy od elementu nadrzędnego i można ją również dostosować za pomocą właściwości CSS <code>max-width</code>. Ten układ różni się od układu <code>responsive</code>, gdyż ma własną wysokość i szerokość. Jest to najbardziej widoczne w elemencie przestawianym, w którym układ <code>responsive</code> będzie renderować 0x0, a układ <code>intrinsic</code> będzie powiększany do osiągnięcia mniejszego z jego naturalnych rozmiarów lub ograniczenia CSS.</cod>
</td>
    </tr>
  </tbody>
</table>

[tip type="tip"] **&nbsp;PORADA –** przejdź na stronę [Demonstrowanie układów AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html), aby zobaczyć jak różne układy reagują na zmianę rozmiaru ekranu. [/tip]

### Co jeśli szerokość i wysokość są nieokreślone? <a name="what-if-width-and-height-are-undefined"></a>

W kilku przypadkach, jeśli atrybuty <code>width</code> lub <code>height</code> nie są określone, środowisko uruchomieniowe AMP może domyślnie ustawić następujące ich wartości:

- [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): zarówno szerokość jak i wysokość są domyślnie ustawiane na 0.
- [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): domyślna szerokość i wysokość są podawane z przeglądarki.

### Co jeśli atrybut <code>layout</code> jest nieokreślony? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Jeśli atrybut `layout` nie jest określony, AMP próbuje wyprowadzić lub odgadnąć odpowiednią wartość:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Zasada</th>
      <th data-th="Inferred layout" class="col-thirty">Wywnioskowany układ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule">Atrybut <code>height</code> jest obecny, a atrybut <code>width</code> nie lub ma wartość <code>auto</code>
</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Atrybuty <code>width</code> lub <code>height</code> są obecne wraz z atrybutem <code>sizes</code>
</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Obecny jest zarówno atrybut <code>width</code>, jak i <code>height</code>
</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Nie ma ani atrybutu <code>width</code>, ani <code>height</code>
</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Stosowanie zapytań o media

### Kwerendy medialne CSS

Użyj reguły [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), aby kontrolować wygląd i sposób działania układu strony, tak jak w przypadku każdej innej witryny. Gdy okno przeglądarki zmieni rozmiar lub orientację, zapytania o media są ponownie oceniane, a elementy są ukrywane i wyświetlane w zależności od nowych wyników.

[tip type="read-on"] **CZYTAJ DALEJ –** dowiedz się więcej na temat kontrolowania układu poprzez stosowanie kwerend medialnych z artykułu [Używanie zapytań CSS o media w celu uzyskania responsywności](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en). [/tip]

### Kwerendy elementu media <a name="element-media-queries"></a>

Jedną z dodatkowych funkcji w AMP jest atrybut <code>media</code>. Atrybut ten może być używany w każdym elemencie AMP; działa on podobnie do zapytań o media w globalnym arkuszu stylów, ale wpływa tylko na określony element na jednej stronie.

Tutaj na przykład mamy 2 zdjęcia z wzajemnie wykluczającymi się zapytaniami o media.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="527"
    height="355"
    layout="responsive">
</amp-img>
[/sourcecode]

W zależności od szerokości ekranu, pobierane i renderowane będzie albo jedno, albo drugie.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="466"
    height="193"
    layout="responsive">
</amp-img>
[/sourcecode]
