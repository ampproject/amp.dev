---
'$title': Inclusione di immagini e video
$order: 8
description: Come in una normale pagina HTML, AMP ti consente di incorporare immagini, video e contenuti audio. Scopri le differenze negli equivalenti elementi AMP e scopri come ...
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Come in una normale pagina HTML, AMP ti consente di incorporare immagini, video e contenuti audio. Scopri le differenze negli equivalenti elementi AMP e scopri come includerli nelle tue pagine.

## Perché non usare <code>&lt;img></code>, <code>&lt;video></code> e <code>&lt;audio></code>?

AMP non supporta i componenti HTML predefiniti per la visualizzazione di contenuti multimediali, come `<img>`. Forniamo componenti equivalenti per i seguenti motivi:

- Occorre comprendere il layout della pagina prima del caricamento delle risorse, cosa fondamentale per [supportare il pre-caricamento della prima finestra di visualizzazione](../../../../about/how-amp-works.html#size-all-resources-statically)
- Occorre tenere sotto controllo le richieste di rete per il [caricamento lazy e assegnare la priorità alle risorse in modo efficace](../../../../about/how-amp-works.html#prioritize-resource-loading)

Attenzione: finché non saranno supportati, essi _saranno_ visualizzati, ma AMP non [convaliderà le pagine](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) e non si potranno sfruttare i vantaggi offerti da AMP.

## Immagini

Includere un'immagine nella pagina utilizzando l'elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md), in questo modo:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

In questo esempio molto semplice, l'immagine verrà visualizzata con l'altezza e la larghezza fisse indicate. Occorre almeno impostare esplicitamente una larghezza e un'altezza.

#### Visualizzazione di immagini quando JavaScript è disabilitato

Poiché [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) si basa su JavaScript, se l'utente sceglie di disabilitare gli script, le immagini non verranno visualizzate. In questo caso, occorre fornire un fallback all'immagine usando i componenti `<img>` e `<noscript>` in questo modo:

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### Layout avanzati

Con AMP è molto più semplice creare immagini completamente reattive rispetto all'uso di CSS/HTML standard. Nella sua forma più semplice, basta aggiungere l'attributo `layout="responsive"`:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

[tip type="read-on"] **CONTINUA A LEGGERE:** Ulteriori informazioni sulle [tecniche di layout avanzato](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Comportamento e segnaposti

Il sistema di runtime AMP HTML può gestire efficacemente le risorse di immagini, scegliendo di ritardare o dare la priorità al caricamento delle risorse in base alla posizione della finestra di visualizzazione, alle risorse di sistema, alla larghezza di banda della connessione o ad altri fattori.

[tip type="read-on"] **CONTINUA A LEGGERE:** Qui sono disponibili ulteriori informazioni sull'[utilizzo di fallback e segnaposti con le immagini](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Immagini animate

L'elemento [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) è molto simile all'elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) e fornisce funzionalità aggiuntive per gestire il caricamento e la riproduzione di immagini animate come quelle di tipo GIF.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

[tip type="note"] <strong>NOTA:</strong> Includere l'elemento <code>&lt;script async custom-element="amp-anim" src="https://ampjs.org/v0/amp-anim-0.1.js">&lt;/script></code> nell'intestazione della pagina per utilizzare questo componente. [/tip]

## Video

Includere un video nella pagina utilizzando l'elemento [`amp-video`](../../../../documentation/components/reference/amp-video.md).

Utilizzare questo elemento solo per l'integrazione diretta di file video HTML5. L'elemento carica in modalità lazy la risorsa video specificata dall'attributo `src`, in un momento stabilito da AMP.

Includere un segnaposto prima dell'inizio del video e un fallback, se il browser non supporta il video HTML5, ad esempio:

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

## Audio

Includere una risorsa audio nella pagina, utilizzando l'elemento [`amp-audio`](../../../../documentation/components/reference/amp-audio.md).

Utilizzare questo elemento solo per l'integrazione diretta di file audio HTML5. Come per tutte le risorse esterne incorporate in una pagina AMP, l'elemento carica in modalità lazy la risorsa audio specificata dall'attributo `src`, in un momento stabilito da AMP.

Includi un fallback, se il browser non supporta l'audio HTML5, ad esempio:

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

[tip type="note"] <strong>NOTA:</strong> Includere l'elemento <code>&lt;script async custom-element="amp-audio" src="https://ampjs.org/v0/amp-audio-0.1.js">&lt;/script></code> nell'intestazione della pagina per utilizzare questo componente. [/tip]
