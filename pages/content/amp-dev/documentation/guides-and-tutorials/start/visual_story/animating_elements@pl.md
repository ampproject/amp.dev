---
"$title": Animowanie elementów
"$order": '6'
description: Możesz dodatkowo wzbogacić relację internetową poprzez zastosowanie animowanych wejść do elementów wewnątrz strony. Możesz na przykład sprawić, że Twój tytuł wleci z...
components:
- anim
author: bpaduch
---

Możesz dodatkowo wzbogacić relację internetową poprzez zastosowanie animowanych wejść do elementów wewnątrz strony. Możesz na przykład sprawić, że Twój tytuł wleci z lewej strony albo spadnie na stronę, albo stopniowo się pojawi itd. Framework relacji AMP zawiera następujące wstępnie ustawione animacje do użytku w relacji internetowej:

<table>
<thead><tr>
  <th width="50%">Wstępne ustawienie animacji</th>
  <th width="25%">Domyślny czas trwania (ms)</th>
  <th width="25%">Domyślne opóźnienie (ms)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Aby zastosować wejście do animacji do elementu, należy określić atrybut <code>animate-in=""</code> za pomocą jednej z wstępnie ustawionych wartości animacji. Aby na przykład upuścić tekst na stronę, dodaj atrybut `animate-in="drop"` do elementu tekstowego:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Poznaj różne efekty animacji, dodając do elementów na stronach swojej relacji atrybut `animate-in="<wstępne ustawienie animacji>"`. [/tip]

## Synchronizowanie animacji

Każde ustawienie wstępne animacji ma wbudowane następujące domyślne wartości czasu:

- **delay**: jest to czas opóźnienia rozpoczęcia animacji. Na przykład wartość delay równa .3s znaczy, że animacja wchodzi na stronę po 0,3 sekundy. Opóźnienie 0s powoduje natychmiastowe uruchomienie animacji.
- **duration**: jest to czas trwania wyświetlania animacji. Na przykład, animacja stopniowego wyświetlania trwa od początku do końca 500 ms.

Możesz dostosować synchronizację animacji poprzez zmianę opóźnienia lub czasu trwania za pomocą atrybutów `animate-in-delay` oraz `animate-in-duration`. W poniższym przykładzie, `my-element` wlatuje od lewej strony po 0,3 sekundy i całkowicie wyświetlany jest wlatuje w ciągu 0,5 sekundy:

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## Animowanie ostatniej strony

Ostatnia strona naszej relacji internetowej składa się z dwóch warstw: pierwsza warstwa jest kolażem zdjęć zwierząt, a druga wyświetla tekst banera. Aby utworzyć tę stronę, **dodaj** następujący kod zaraz po poprzedniej stronie relacji:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

Załaduj ponownie relację AMP w przeglądarce, a następnie sprawdź, czy strona renderowana jest prawidłowo i wygląda tak:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Wygląda świetnie, ale wszystko jest statyczne! Ożywmy ją animacją!

Zaczniemy od animacji wejścia tekstu bannera „whoosh in” z prawej strony. Dodaj atrybut `animate-in="whoosh-in-right"` do elementu `<p>` w taki sposób:

```html
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Załaduj ponownie stronę relacji w przeglądarce i sprawdź, czy baner ma animację whoosh-in.

Teraz sprawmy, że wszystkie obrazy stopniowo pojawią się na ekranie. Dodaj atrybut `animate-in="fade-in"` do każdego z elementów [`amp-img`](../../../../documentation/components/reference/amp-img.md), aby kod wyglądał tak:

```html
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```

Jeśli odświeżysz i załadujesz ponownie stronę, każdy z obrazów stopniowo pojawi się na ekranie. To wspaniale, ale efekt jest ledwie zauważalny, ponieważ wszystkie obrazy pojawiają się w tym samym czasie! Możemy poprawić efekt wizualny, zmieniając czasy rozpoczęcia tych animacji.

Opóźnijmy wejście pierwszego obrazu tak, aby zbliżył się do momentu, gdy skończy wchodzić baner tekstowy, powiedzmy o 0,4 sekundy. Pozostałe trzy obrazy mogą pojawiać się 0,2 sekundy po wejściu poprzedniego obrazu. Dla każdego z elementów [`amp-img`](../../../../documentation/components/reference/amp-img.md) dodaj atrybut `animate-in-delay=""`" z odpowiednią wartością opóźnienia. Twój kod powinien wyglądać tak:

```html
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>
```

Odśwież i załaduj ponownie relację. Twoja ostatnia strona powinna wyglądać tak:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

W relacjach internetowych dostępnych jest wiele możliwości animacji (np. łączenie animacji, animacje łańcuchowe), a ten samouczek ledwie muska temat. Aby dowiedzieć się więcej o animacjach, zapoznaj się z dokumentacją referencyjną składnika [`amp-story`](../../../../documentation/components/reference/amp-story.md).
