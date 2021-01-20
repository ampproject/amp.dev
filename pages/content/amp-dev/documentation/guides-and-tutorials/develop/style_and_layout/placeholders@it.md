---
"$title": Segnaposti e fallback
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

Alcuni elementi incoraggiano anche il loro utilizzo riducendo le restrizioni: ad esempio, fornendo un segnaposto per [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), esso può essere utilizzato nella parte superiore della pagina (che non funzionerà senza).

## Segnaposti

Gli elementi marcati con l'attributo `placeholder` agiscono come segnaposto per l'elemento AMP padre. Quando indicato, un elemento `placeholder` deve essere figlio diretto dell'elemento AMP. Gli elementi marcati con l'attributo `placeholder` avranno sempre la proprietà `fill` rispetto all'elemento AMP padre.

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

Per impostazione predefinita, il segnaposto viene immediatamente mostrato al posto dell'elemento AMP, anche se le risorse dell'elemento AMP non sono state scaricate o inizializzate. Una volta pronto, l'elemento AMP in genere nasconde il suo segnaposto e mostra il proprio contenuto.

[tip type="note"] **NOTA:** Il segnaposto non deve essere un elemento AMP; qualsiasi elemento HTML può fungere da segnaposto. [/tip]

## Fallback <a name="fallbacks"></a>

È possibile specificare l'attributo `fallback` su un elemento per indicare il comportamento alternativo in caso di:

- elementi non supportati dal browser
- contenuti che non possono essere caricati (ad esempio, Tweet cancellati)
- tipi di immagini non supportati (ad esempio, WebP non è supportato in tutti i browser)

Si può impostare l'attributo di `fallback` su *qualsiasi* elemento HTML, non solo sugli elementi AMP. Se indicato, l'elemento di `fallback` deve essere un figlio diretto dell'elemento AMP.

##### Esempio: funzionalità non supportata

Nell'esempio seguente, utilizziamo l'attributo `fallback` per comunicare all'utente che il browser non supporta una particolare funzionalità:

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

##### Esempio: fornitura di diversi formati di immagine

Nell'esempio seguente, utilizziamo l'attributo `fallback` per indicare al browser di utilizzare il file JPEG se il formato WebP non è supportato.

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

## Interazione di segnaposti e fallback

Per i componenti AMP che si basano su contenuti dinamici (ad es. [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), l'interazione di fallback e segnaposto funziona come segue:

<ol>
  <li>Visualizzazione del segnaposto durante il caricamento del contenuto.</li>
  <li>Se il contenuto viene caricato correttamente, il segnaposto è nascosto e visualizzato il contenuto.</li>
  <li>Se il contenuto non viene caricato: <ol>
<li> Se è presente un elemento di fallback, è visualizzato il fallback.</li>
<li>Altrimenti, si continua a visualizzare il segnaposto.</li> </ol>
</li>
</ol>

## Nascondere gli indicatori di caricamento

Molti elementi AMP sono autorizzati a mostrare un "indicatore di caricamento", che è un'animazione di base che mostra che l'elemento non è stato ancora completamente caricato. Gli elementi possono disattivare questo comportamento aggiungendo l'attributo `noloading`.
