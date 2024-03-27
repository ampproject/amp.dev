---
'$title': Creazione del nucleo per gli annunci
$order: 0
description: "Utilizzando l'editor di testo preferito, creiamo un file HTML denominato my-amphtml-ad.html. Copiare il seguente codice di markup HTML in quel file: ..."
---

Il formato [HTML richiesto per gli annunci AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) è una variante [del formato AMPHTML richiesto per le pagine AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Acquisiamo familiarità con il codice richiesto, creando il nucleo del nostro annuncio AMPHTML.

Utilizzando l'editor di testo preferito, creiamo un file HTML denominato **`my-amphtml-ad.html`**. Copiare il seguente codice di markup HTML in quel file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
  </head>
  <body></body>
</html>
```

Questo markup si applica a un file HTML valido di base. Si noti che abbiamo incluso il tag della finestra di visualizzazione `meta` in modo da avere un [viewport reattivo](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

Ora, modifichiamo il codice HTML per trasformarlo in un annuncio AMPHTML.

Nel tag `<html>`, aggiungere l'attributo `⚡4ads`, che identifica il documento come annuncio AMPHTML. Si può anche utilizzare l'attributo `amp4ads`, valido allo stesso scopo.

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    ...
  </head>
</html>
```

[tip type="note"] **NOTA:** A differenza delle pagine AMP, [gli annunci AMPHTML non richiedono un tag `<link rel="canonical">`](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

Gli annunci AMPHTML richiedono la propria versione del sistema di runtime AMP, per cui occorre aggiungere il seguente tag `<script>` alla sezione `<head>` del documento:

```html
<script async src="https://ampjs.org/amp4ads-v0.js"></script>
```

Gli elementi creativi di annunci AMPHTML richiedono una linea di stile [boilerplate](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) diversa e notevolmente più semplice rispetto a quella delle pagine AMP generali. Aggiungere il codice seguente alla sezione `<head>`:

```html
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
```

Per definire lo stile degli annunci AMPHTML, il codice CSS deve essere incorporato inline nel documento AMPHTML utilizzando i tag `<style amp-custom>` nella sezione `<head>`. Poiché stiamo eseguendo il rendering di un annuncio con una semplice immagine, non richiediamo elementi CSS e non aggiungeremo questi tag.

[tip type="note"] **NOTA:** Per gli annunci AMPHTML, la dimensione massima per un foglio di stile inline è di _20 kilobyte_. Ulteriori informazioni nella sezione sui [requisiti CSS nelle specifiche degli annunci AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

Ecco il codice completo per il file HTML:

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
    <script async src="https://ampjs.org/amp4ads-v0.js"></script>
    <style amp4ads-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body></body>
</html>
```

Ora abbiamo un annuncio AMPHTML valido, anche se vuoto. Creiamo un annuncio con immagini.
