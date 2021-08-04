---
'$title': Tworzenie strony tytułowej
$order: 4
description: Aby utworzyć stronę, dodaj element <amp-story-page> jako element podrzędny składnika amp-story. Przypisz stronie unikalny identyfikator. Do naszej pierwszej strony, która jest stroną tytułową, przypiszmy unikalny identyfikator cover...
author: bpaduch
---

Strona w relacji internetowej jest reprezentowana przez składnik `<amp-story-page>`. W składniku [` stamp-story`](../../../../documentation/components/reference/amp-story.md) można mieć jeden lub wiele składników `<amp-story-page>`, zawierających poszczególne ekrany relacji. Pierwszą stroną wyświetlaną w relacji internetowej będzie pierwsza strona, którą określisz w kolejności dokumentów.

Aby utworzyć stronę, **dodaj element** <code>&lt;amp-story-page></code> jako element podrzędny składnika <a><code>amp-story</code></a>. <strong>Przypisz</strong> stronie unikalny identyfikator. Do naszej pierwszej strony, która jest stroną tytułową, przypiszmy unikalny identyfikator <code>cover</code>:

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
  <amp-story-page id="cover"> </amp-story-page>
</amp-story>
```

Teraz mamy powłokę na reklamę. Nasza relacja nadal jednak nie jest prawidłowa. W naszej stronie musimy określić co najmniej jedną **warstwę**. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='cover page has two layers', align='right third' ) }}

## Warstwy w stronie

Podobnie jak w grafice, warstw można używać w stronach relacji AMP do tworzenia efektów wizualnych. Warstwy są układane jedna na drugiej, pierwsza warstwa jest więc warstwą dolną, następna jest nad nią i tak dalej.

Nasza strona tytułowa składa się faktycznie z dwóch warstw:

- **Warstwa 1**: obraz, który służy nam za tło
- **Warstwa 2**: tytuł i autor relacji

### Tworzenie warstwy 1

Dodajmy pierwszą warstwę do strony tytułowej. Warstwa ta zawiera obraz, który wypełnia ekran.

Utwórz warstwę, dodając element `<amp-story-grid-layer>` jako element podrzędny elementu `<amp-story-page>`. Chcemy, aby obraz wypełniał ekran, należy więc określić atrybut `template="fill"` dla elementu `amp-story-grid-layer`. W warstwie dodaj element [`amp-img`](../../../../documentation/components/reference/amp-img.md) pliku `cover.jpg` i ustaw go jako responsywny (tj. `layout="responsive"`) z wymiarami obrazu równymi 720 x 1280 px. Nasza warstwa wygląda tak:

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img
      src="assets/cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
    >
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Zobaczmy, jak wygląda strona. Otwórz w przeglądarce stronę: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Powinna wyglądać tak:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Tworzenie warstwy 2

Mamy więc tło, ale teraz potrzebujemy drugiej warstwy, znajdującej się nad tłem i zawierającej nasz nagłówek i autora. Aby dodać naszą drugą warstwę, wykonajmy te same zadania, które wykonaliśmy w przypadku warstwy 1, ale zamiast używać szablonu `fill`, użyjemy szablonu **`vertical`**. Zanim jednak przejdziemy dalej, dowiedzmy się nieco o szablonach i o tym jak możemy ułożyć elementy AMP i HTML w elemencie `<amp-story-grid-layer>`.

#### Układanie elementów za pomocą szablonu

Element `<amp-story-grid-layer>` układa swoje elementy podrzędne w siatce (na podstawie [siatki CSS](https://www.w3.org/TR/css-grid-1/)). Aby wskazać, jak mają być rozmieszczone elementy podrzędne, należy określić jeden z następujących szablonów układu:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Szablon: fill</h5></td>
</tr>
<tr>
    <td width="65%">Szablon <strong>fill</strong> wypełnia ekran pierwszym elementem podrzędnym w warstwie. W tej warstwie nie zostaną pokazane żadne inne elementy podrzędne. Szablon fill dobrze sprawdza się w przypadku tła, w tym obrazów i filmów.    <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">   &lt;amp-img src="dog.png" width="720" height="1280" layout="responsive">   &lt;/amp-img> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Szablon: vertical</h5></td>
</tr>
<tr>
    <td width="65%">Szablon <strong>vertical</strong> układa elementy podrzędne wzdłuż osi Y. Elementy są wyrównywane do góry ekranu i zajmują cały ekran wzdłuż osi X. Szablon vertical jest przydatny, gdy chcesz układać elementy jeden nad drugim w pionie.    <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">   &lt;p>element 1&lt;/p>   &lt;p>element 2&lt;/p>   &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Szablon: horizontal</h5></td>
</tr>
<tr>
    <td width="65%">Szablon <strong>horizontal</strong> układa elementy podrzędne wzdłuż osi X.  Elementy są wyrównane do góry ekranu i zajmują cały ekran wzdłuż osi Y.     Szablon horizontal jest przydatny, gdy chcesz układać elementy jeden za drugim w poziomie.     <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">   &lt;p>element 1&lt;/p>   &lt;p>element 2&lt;/p>   &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Szablon: thirds</h5></td>
</tr>
<tr>
<td width="65%">Szablon <strong>thirds</strong> dzieli ekran na trzy równe wiersze i pozwala na wstawienie zawartości do każdego z nich. Możesz również określić nazwany atrybut <code>grid-area</code>, aby wskazać jedną trzecią, w której ma się znaleźć treść — <code>upper-third</code>, <code>middle-third</code>, lub <code>lower-third</code>. Nazwane obszary siatki są przydatne do zmiany domyślnego sposobu działania elementów. Jeśli na przykład masz dwa elementy w warstwie, możesz określić pierwszy element, który ma się znaleźć w obszarze <code>grid-area="upper-third"</code> i drugi element, który ma się znaleźć w obszarze <code>grid-area="lower-third"</code>. <code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">   &lt;h1 grid-area="upper-third">element 1&lt;/h1>   &lt;p grid-area="lower-third">element 2&lt;/p> &lt;/amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Kończenie strony tytułowej

Teraz, gdy już znasz szablony warstw, ukończmy naszą drugą warstwę strony tytułowej.

W warstwie 2 chcemy, aby nagłówek i dane autora znajdowały się u góry, a elementy następowały jeden po drugim, więc określamy szablon `vertical`. Nasz drugi szablon `amp-story-grid-layer` następuje po pierwszym, tak jak tu:

```html
<amp-story-grid-layer>
  <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Odśwież przeglądarkę i sprawdź swoje dzieło. Strona tytułowa jest ukończona.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
