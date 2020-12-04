---
"$title": Elementy zastępcze i zasoby rezerwowe
"$order": '3'
descriptions: "In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible."
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Niektóre elementy nagrodzą Cię nawet za zrobienie tego poprzez rozluźnienie ograniczeń — na przykład, jeśli podasz element zastępczy składnika [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), można go będzie użyć w pobliżu górnej części strony (bez czego nie będzie działać).

## Elementy zastępcze

Element oznaczony atrybutem `placeholder` działa jako element zastęp-czy nadrzędnego elementu AMP. Jeśli jest określony, element `placeholder` musi być bezpośrednio podrzędny wobec elementu AMP. Element oznaczony jako `placeholder` będzie zawsze wypełnieniem (`fill`) nadrzędnego elementu AMP.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>
```
[/example]

Domyślnie element zastępczy elementu AMP jest wyświetlany natychmiast, nawet jeśli zasoby elementu AMP nie zostały pobrane lub zainicjowane. Gdy element AMP jest już gotowy, zazwyczaj ukrywa swój element zastępczy i wyświetla zawartość.

[tip type="note"] **UWAGA —** element zastępczy nie musi być elementem AMP; jako element zastępczy można stosować dowolny element HTML. [/tip]

## Zasoby rezerwowe <a name="fallbacks"></a>

Możesz określić atrybut `fallback` w elemencie, aby wskazać rezerwowy sposób działania:

- każdego elementu, którego nie obsługuje przeglądarka
- jeśli zawartość nie zostanie załadowana (np. usunięto tweet)
- jeśli typ obrazu nie jest obsługiwany (np. WebP nie jest obsługiwany we wszystkich przeglądarkach)

Atrybut `fallback` można ustawić w *dowolnym* elemencie HTML, nie tylko w elementach AMP. Element `fallback`, jeśli zostanie określony, musi być bezpośrednio podrzędny wobec elementu AMP.

##### Przykład: nieobsługiwana funkcja

W poniższym przykładzie używamy atrybutu `fallback`, aby poinformować użytkownika, że przeglądarka nie obsługuje danej funkcji:

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

##### Przykład: serwowanie innych formatów obrazów

W poniższym przykładzie używamy atrybutu `fallback`, aby poinformować przeglądarkę, że jeśli format WebP nie jest obsługiwany, ma użyć pliku JPEG.

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

## Interakcja elementów zastępczych i zasobów rezerwowych

W przypadku składników AMP zależnych od zawartości dynamicznej (np. [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) lub [`amp-list`](../../../../documentation/components/reference/amp-list.md)) interakcja między zasobami rezerwowymi a elementami zastępczymi działa w następujący sposób:

<ol>
  <li>Wyświetlanie elementu zastępczego podczas ładowania zawartości.</li>
  <li>Jeśli zawartość zostanie załadowana, ukrycie elementu zastępczego i wyświetlenie zawartości.</li>
  <li>Jeśli zawartość nie zostanie załadowana:     <ol>       <li>Wyświetlenie zasobu rezerwowego, jeśli są dostępne.</li>       <li>W przeciwnym razie dalsze wyświetlanie elementu zastępczego.</li>     </ol>
</li>
</ol>

## Ukrywanie wskaźników ładowania

W przypadku wielu elementów AMP dozwolone jest wyświetlanie „wskaźnika ładowania”, który jest prostą animacją pokazującą, że element nie został jeszcze w pełni załadowany. Aby zrezygnować z tego sposobu działania elementów, należy dodać atrybut `noloading`.
