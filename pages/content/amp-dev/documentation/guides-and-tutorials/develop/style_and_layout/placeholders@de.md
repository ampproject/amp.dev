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

Some elements will even reward you for doing it by relaxing restrictions – for example, if you provide a placeholder for [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), it can be used near the top of the page (which won't work without).

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

By default, the placeholder is immediately shown for the AMP element, even if the AMP element's resources have not been downloaded or initialized. Once ready, the AMP element typically hides its placeholder and shows the content.

[tip type="note"] **NOTE –**  The placeholder doesn’t have to be an AMP element; any HTML element can act as the placeholder. [/tip]

## Fallbacks <a name="fallbacks"></a>

Du kannst das Attribut `fallback` für ein Element angeben, um das Fallback Verhalten festzulegen:

- for any element the browser doesn’t support
- if the content fails to load (e.g., Tweet deleted)
- if the image type is unsupported (e.g., WebP isn't supported in all browsers)

Du kannst das Attribut `fallback` für ein *beliebiges* HTML Element festlegen, nicht nur für AMP Elemente. Wenn das `fallback` Element angegeben wird, muss es dem AMP Element direkt untergeordnet sein.

##### Beispiel: Nicht unterstützte Funktion

In the following example, we use the `fallback` attribute to communicate to the user that the browser doesn’t support a particular feature:

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

In the following example, we use the `fallback` attribute to tell the browser to use the JPEG file if the WebP format is unsupported.

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

For AMP components that rely on dynamic content (e.g., [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), the interaction of fallbacks and placeholders operates as follows:

<ol>
  <li>Zeige den Platzhalter an, während der Inhalt geladen wird.</li>
  <li>Wenn der Inhalt erfolgreich geladen wurde, blende den Platzhalter aus und zeige den Inhalt an.</li>
  <li>Wenn der Inhalt nicht geladen werden kann:     <ol>       <li>Wenn ein Fallback Element vorhanden ist, zeige das Fallback an.</li>       <li>Andernfalls zeige weiterhin den Platzhalter an.</li>     </ol>
</li>
</ol>

## Ausblenden von Ladeindikatoren

Many AMP elements are allowlisted to show a "loading indicator", which is a basic animation that shows that the element has not yet fully loaded. Elements can opt out of this behavior by adding the `noloading` attribute.
