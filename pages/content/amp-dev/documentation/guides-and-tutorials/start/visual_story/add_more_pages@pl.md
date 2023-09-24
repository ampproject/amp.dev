---
'$title': Dodawanie kolejnych stron
$order: 5
description: Wiesz już jak dodawać strony do relacji internetowej, a dodawanie kolejnych stron do naszej relacji „The Joy of Pets” przebiega bardzo podobnie.
author: bpaduch
---

Wiesz już jak dodawać strony do relacji internetowej, a dodawanie kolejnych stron do naszej relacji „The Joy of Pets” przebiega bardzo podobnie. W oparciu o informacje podane poniżej **utwórz pozostałe strony**, korzystając z nabytej do tej pory wiedzy. Jeśli utkniesz, spójrz na ukończony kod (<a href="https://github.com/ampproject/amp.dev/blob/legacy-master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>).

[tip type="tip"] **PORADA —** pamiętaj, że każda strona wymaga unikalnego atrybutu „id” (np. `id="page1"`). [/tip]

## Strona 1: Cats

Prezentuje sposób wyświetlania obrazu i tekstu w jednej warstwie.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Zawiera 1 warstwę:       <ul>         <li>Implementuje szablon <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li>         <li>Zawiera 3 elementy:           <ul>             <li>Element <code><h1></code> z tytułem: <em>Cats</em> </li>             <li>Responsywny element <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>, 720 x 1280px)</li>             <li>Element <code><q></code> na następujący cytat: <em>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Strona 2: Dogs

Prezentuje sposób rozmieszczania tekstu i wyświetlania obrazu wypełniającego ekran w dwóch warstwach.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Zawiera 2 warstwy:       <ul>         <li> <b>Warstwa 1</b>: implementuje szablon <a href="create_cover_page.md#fill"><code>fill</code></a> i zawiera responsywny element <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">dog.jpg</code>, 720 x 1280px).</li>         <li> <b>Warstwa 2</b>:  implementuje szablon <a href="create_cover_page.md#thirds"><code>thirds</code></a> i zawiera 2 elementy:           <ul>             <li>Element <code><h1></code> z tytułem: <em>Dogs</em> </li>             <li>Element <code><p></code> określający obszar <a href="create_cover_page.md#thirds"><code>grid-area</code></a> zajmowany przez element <a href="create_cover_page.md#thirds"><code>lower-third</code></a> i zawierający następujący tekst: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Strona 3: Birds

Prezentuje sposób rozmieszczania tekstu, wyświetlania obrazu wypełniającego ekran i zapewnienia tła dźwiękowego strony.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Zawiera 3 warstwy:       <ul>         <li> <b>Warstwa 1</b>: implementuje szablon <a href="create_cover_page.md#fill"><code>fill</code></a> i zawiera responsywny element <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280px).</li>         <li> <b>Warstwa 2</b>  implementuje szablon <a href="create_cover_page.md#vertical"><code>vertical</code></a> i zawiera jeden element:           <ul>             <li>Element <code><h1></code> z tytułem: <em>Birds</em> </li>           </ul>         </li>         <li> <b>Warstwa 3</b>:  implementuje szablon <a href="create_cover_page.md#vertical"><code>vertical</code></a> i zawiera jeden element:           <ul>             <li>Element  <code><q></code> na następujący cytat: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert</em> </li>             <li>Ta trzecia warstwa określa atrybut <code>class="bottom"</code> w celu wyrównania elementów podrzędnych z dołem ekranu.</li>           </ul>         </li>       </ul>
</li>
      <li>Odtwarza plik audio w tle, gdy strona jest wyświetlana. Możesz odtwarzać dźwięk w tle całej relacji lub pojedynczej strony. Aby odtworzyć dźwięk dla strony, dodaj atrybut <code>background-audio="assets/bird-singing.mp3"</code> do elementu <code>&lt;amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Strona 4: Rabbits

Prezentuje sposób rozmieszczania tekstu i wyświetlania filmu wypełniającego ekran strony.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Zawiera 3 warstwy:       <ul>         <li> <b>Warstwa 1</b>: implementuje szablon <code>fill</code> i zawiera responsywny element <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Pamiętaj o dodaniu <strong>skryptu wymaganego</strong> przez składnik <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> w jego sekcji <code></code> do wyświetlenia filmu.</li>             <li>Określ obraz <code>poster</code> (<code class="filename">rabbit.jpg</code>). Ten atrybut jest <strong>wymagany</strong> do prawidłowości relacji AMP.</li>             <li>Ustaw automatyczne odtwarzanie filmu za pomocą atrybutu <code>autoplay</code>. Ten atrybut jest <strong>wymagany</strong> do prawidłowości relacji AMP.</li>             <li>Ustaw automatyczne odtwarzanie filmu w pętli za pomocą atrybutu <code>loop</code>.</li>             <li>Ustaw wymiary <code>width="720"</code> <code>height="1280"</code> i <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>Warstwa 2</b>  implementuje szablon <code>vertical</code> i zawiera jeden element:           <ul>             <li>Element <code><h1></code> z tytułem: <em>Rabbits</em> </li>           </ul>         </li>         <li> <b>Warstwa 3</b>:  implementuje szablon <code>vertical</code> i zawiera jeden element:           <ul>             <li>Element <code><p></code> zawierający następujący tekst: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li>             <li>Zastosuj klasę CSS <code>bottom</code> do warstwy, aby wyrównać elementy podrzędne z dołem ekranu.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Nasza relacja „Joy of Pets” jest prawie ukończona. Na naszej ostatniej stronie użyjemy animacji, aby wyświetlić wszystkie zwierzęta domowe.
