---
$title: Tworzenie ekranu końcowego
$order: 7
description: Wszystkie strony zostały już dodane, spójrzmy więc na ostatni ekran relacji. Ten ostatni ekran kończy relację...
author: bpaduch
---

Wszystkie strony zostały już dodane, spójrzmy więc na ostatni ekran relacji. Ten ostatni ekran kończy relację i umożliwia zamieszczenie linków do udostępniania w mediach społecznościowych i linków związanych z relacją, dzięki którym użytkownicy będą mogli udostępniać Twoją relację lub zagłębić się w innych treściach w Twojej witrynie.

Informacje na ekranie końcowym pochodzą z pliku JSON określonego w znaczniku `<amp-story-bookend>`. Do celów naszego samouczka mamy już przygotowany zawierający dane ekranu końcowego plik JSON ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)).

Znacznik `<amp-story-bookend>` musi znajdować się w ostatnim znaczniku w sekcji [`<amp-story>`](../../../../documentation/components/reference/amp-story.md). **Dodajmy** zatem znaczniki `<amp-story-bookend></amp-story-bookend>` tuż przed zamykającym znacznikiem [`</amp-story>`](../../../../documentation/components/reference/amp-story.md).  W znaczniku `amp-story-bookend` wskaż w atrybucie `src` plik `bookend.json` i ustaw atrybut `layout="nodisplay"`:

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Jeśli odświeżysz przeglądarkę i przejdziesz do ostatniego ekranu, zobaczysz następujący ekran końcowy:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Spójrzmy na plik JSON. Otwórz plik [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) w edytorze tekstów.

Każdy ekran końcowy wymaga podania wartości `bookendVersion`, którą w tym samouczku jest `v1.0`:

```json
"bookendVersion": "v1.0",
```

Przyciski udostępniania w mediach społecznościowych umożliwiają czytelnikom dzielenie się treścią na platformach społecznościowych, takich jak Twitter, Facebook, Pinterest itd. Użytkownik określa dostawców usług społecznościowych w obiekcie shareProviders i tworzy tablicę zawierającą [nazwy typów](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) każdej z platform społecznościowych.

W tym samouczku jako dostawców usług udostępniania wybieramy Facebook, Twitter i pocztę elektroniczną:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

Pozostała część ekranu końcowego jest przeznaczona na powiązane treści. Cała powiązana treść jest zawarta w obiekcie `components`.

Dostępne są różne składniki, których można używać do wyświetlania powiązanej treści i linków; każdy składnik należy określić za pomocą atrybutu type. Przyjrzyjmy się dostępnym składnikom:

<table>
<thead>
<tr>
  <th width="20%">Typ</th>
  <th>Opis</th>
</tr>
</thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>Umożliwia określenie nagłówka w celu grupowania artykułów.   <pre class="nopreline">   {     "type": "heading",     "text": "More to read"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>small</td>
    <td>Umożliwia podanie linków do powiązanych artykułów z opcją dołączenia powiązanego małego obrazu.   <pre class="nopreline">   {     "type": "small",     "title": "Learn about cats",     "url": "https://wikipedia.org/wiki/Cat",     "image": "assets/bookend_cats.jpg"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>Umożliwia podanie linków do artykułów lub innych treści, takich jak filmy. Obraz powiązany z tym typem jest większy i ma orientację poziomą.   <pre class="nopreline">   {     "type": "landscape",     "title": "Learn about border collies",     "url": "https://wikipedia.org/wiki/Border_Collie",     "image": "assets/bookend_dogs.jpg",     "category": "Dogs"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>Umożliwia umieszczanie linków do relacji lub innych treści. Obraz powiązany z tym typem jest większy i ma orientację pionową.   <pre class="nopreline">   {     "type": "portrait",     "title": "Learn about macaws",     "url": "https://wikipedia.org/wiki/Macaw",     "image": "assets/bookend_birds.jpg",     "category": "birds"   },   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>Umożliwia określenie linków wezwań do działania, wyświetlanych jako przyciski (np. Czytaj więcej, Subskrybuj).   <pre class="nopreline">   {     "type": "cta-link",     "links": [       {         "text": "Learn more",         "url": "https://amp.dev/about/stories.html"       }     ]   }   </pre>     <br>     <figure class="alignment-wrapper half">       {amp-img3}{/amp-img3}     </figure>
</td>
  </tr>
</tbody>
</table>

Dostępnych jest więcej informacji o składniku bookend. Szczegółowe informacje znajdują się w dokumentacji referencyjnej składnika [`amp-story`](../../../../documentation/components/reference/amp-story.md).

Nasza relacja jest już niemal ukończona. Zanim będziemy mogli opublikować nasze treści sprawdźmy, czy nasz kod AMP HTML jest prawidłowy.
