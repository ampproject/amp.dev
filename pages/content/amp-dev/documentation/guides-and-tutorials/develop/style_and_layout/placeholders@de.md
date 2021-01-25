---
"$title": Platzhalter & Fallbacks
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

Einige Elemente werden Sie sogar dafür belohnen, indem Sie Einschränkungen lockern. Wenn Sie beispielsweise einen Platzhalter für [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder) bereitstellen, kann dieser oben auf der Seite verwendet werden (ohne den er nicht funktioniert).

## Platzhalter

Das mit dem Attribut `placeholder` markierte Element agiert als Platzhalter für das übergeordnete AMP Element. Wenn ein Element `placeholder` angegeben ist, muss es dem AMP Element direkt untergeordnet sein. Ein als `placeholder` markiertes Element füllt das übergeordnete AMP Element dank `fill` immer aus.

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

Standardmäßig wird der Platzhalter für das AMP-Element sofort angezeigt, auch wenn die Ressourcen des AMP-Elements nicht heruntergeladen oder initialisiert wurden. Sobald es fertig ist, versteckt das AMP-Element normalerweise seinen Platzhalter und zeigt den Inhalt an.

[tip type="note"] HINWEIS **-** Der Platzhalter muss kein AMP-Element sein. Jedes HTML-Element kann als Platzhalter fungieren. [/tip]

## Fallbacks <a name="fallbacks"></a>

Du kannst das Attribut `fallback` für ein Element angeben, um das Fallback Verhalten festzulegen:

- Für jedes Element wird der Browser nicht unterstützt
- wenn der Inhalt nicht geladen werden kann (z. B. Tweet gelöscht)
- Wenn der Bildtyp nicht unterstützt wird (z. B. wird WebP nicht in allen Browsern unterstützt).

Du kannst das Attribut `fallback` für ein *beliebiges* HTML Element festlegen, nicht nur für AMP Elemente. Wenn das `fallback` Element angegeben wird, muss es dem AMP Element direkt untergeordnet sein.

##### Beispiel: Nicht unterstützte Funktion

Im folgenden Beispiel verwenden wir das `fallback` Attribut, um dem Benutzer mitzuteilen, dass der Browser eine bestimmte Funktion nicht unterstützt:

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

##### Beispiel: unterschiedliche Bildformate bereitstellen

Im folgenden Beispiel verwenden wir das `fallback` Attribut, um den Browser anzuweisen, die JPEG-Datei zu verwenden, wenn das WebP-Format nicht unterstützt wird.

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

## Interaktion von Platzhaltern und Fallbacks

Für AMP Komponenten, die auf dynamischen Inhalten basieren (z. B. [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), funktioniert die Interaktion von Fallbacks und Platzhaltern wie folgt:

<ol>
  <li>Zeige den Platzhalter an, während der Inhalt geladen wird.</li>
  <li>Wenn der Inhalt erfolgreich geladen wurde, blende den Platzhalter aus und zeige den Inhalt an.</li>
  <li>Wenn der Inhalt nicht geladen werden kann:     <ol>       <li>Wenn ein Fallback Element vorhanden ist, zeige das Fallback an.</li>       <li>Andernfalls zeige weiterhin den Platzhalter an.</li>     </ol>
</li>
</ol>

## Ausblenden von Ladeindikatoren

Viele AMP Elemente lassen die Anzeige eines Ladeindikators zu. Das ist eine Standardanimation, die zeigt, dass ein Element noch nicht vollständig geladen ist. Mithilfe des Attributs `noloading` können Elemente ein solches Verhalten unterbinden.
