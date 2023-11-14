---
'$title': Crea la tua prima e-mail AMP
$order: 0
description: Scopri i vantaggi offerti dalle e-mail AMP creando il tuo primo messaggio AMP.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

Il formato AMP per e-mail consente ai mittenti di e-mail di utilizzare contenuti AMP nei loro messaggi di posta elettronica e di usufruire di una vasta gamma di nuove funzionalità. Le e-mail scritte in formato AMP possono contenere elementi interattivi, come sequenze di immagini o pannelli a soffietto, e mantenere aggiornati i contenuti del messaggio, mentre i destinatari hanno la possibilità di agire su tali elementi, ad esempio compilando moduli, il tutto senza lasciare la propria casella di posta.

Il formato AMP per E-mail è compatibile con le e-mail esistenti. La versione AMP del messaggio è incorporata nell'e-mail come nuova parte MIME, che si aggiunge a quelle in formato HTML e in testo semplice, garantendo la compatibilità con tutti i client di posta elettronica.

Suggerimento: per un elenco di piattaforme di posta elettronica (ESP), client e fornitori che supportano il formato AMP per e-mail, consultare la sezione [Piattaforme e-mail supportate](../../../support/faq/email-support.md) tra le domande frequenti.

Al termine di questa esercitazione, sarai in grado di creare e inviare la tua prima e-mail con contenuti dinamici supportati dal formato AMP. Puoi visualizzare un esempio di codice completo [qui](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Iniziare con il codice boilerplate dell'email AMP

Lo strumento playground AMP supporta il formato AMP per e-mail, permettendo di sviluppare, testare e convalidare le e-mail AMP. Aprire [Playground AMP](https://playground.amp.dev/?runtime=amp4email) e impostarne il formato su `AMP for Email` nell'angolo in alto a sinistra. Dovrebbe apparire il codice seguente:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Tale codice contiene i markup e gli elementi di codice minimi richiesti per creare un'e-mail AMP valida. Si possono anche consultare i numerosi esempi di modelli e-mail validi, disponibili nell'elenco a comparsa del menu a discesa in alto a destra.

Iniziamo ad evidenziare alcune notevoli differenze rispetto alle e-mail HTML classiche:

- Le e-mail AMP devono identificarsi come tali includendo i tag `⚡4email` o `amp4email` nel loro tag html.
- Il tag `<head>` deve contenere anche un tag `<script>` che carica il sistema di runtime AMP. `<script async src="https://ampjs.org/v0.js"></script>`
- Devono contenere un codice boilerplate CSS per nascondere inizialmente i contenuti fino al caricamento completo del runtime AMP. `<style amp4email-boilerplate>body{visibility:hidden}</style>`

Chi ha già lavorato con le e-mail, potrebbe essere perplesso dall'idea di inserire uno script in un'e-mail! Nessun problema, i fornitori di sistemi di posta elettronica che supportano le e-mail AMP applicano severi controlli di sicurezza che consentono l'esecuzione nei propri client solo degli script AMP verificati. Ciò consente alle funzionalità dinamiche e interattive di essere eseguite direttamente nelle caselle postali dei destinatari senza rischi per la sicurezza! Ulteriori informazioni sui markup richiesti per le e-mail AMP sono disponibili qui.

[tip type="important"] Solo gli script AMP per i [componenti supportati](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) possono essere inclusi nelle e-mail AMP. [/tip]

# Aggiunta di un’immagine

La maggior parte dei tag HTML utilizzati nelle e-mail possono essere utilizzati anche nelle e-mail AMP. Tuttavia, alcuni di essi, come il tag `<img>`, vengono sostituiti con un equivalente AMP, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

Il tag `<amp-img>` richiede che la larghezza e l'altezza di un'immagine siano definite e, a differenza di `<img>`, il tag `<amp-img>` deve essere chiuso esplicitamente tramite `</amp-img>`.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Inoltre, i file GIF sono supportati tramite il tag [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md) .

Poiché le e-mail non sono ospitate sul server dell'utente, gli URL nelle e-mail AMP devono utilizzare percorsi assoluti e essere in formato HTTPS.

[Placekitten](https://placekitten.com/) è un sito web che usa immagini di gattini come segnaposto. Gli utenti hanno la possibilità di scegliere la dimensione delle immagini direttamente nell'URL!

Possiamo includere un'immagine nella nostra prima e-mail aggiungendo il codice seguente.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Aggiunta di elementi reattivi

Le e-mail possono essere visualizzate su una vasta gamma di dispositivi con schermi delle più svariate dimensioni. AMP facilita tutto questo grazie al suo sistema di layout integrato! Grazie al sistema [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) e alle media query, l'implementazione di e-mail con elementi reattivi è facile. Per ridimensionare opportunamente l'immagine del nostro gattino in base alle schermate in cui va collocata, basta aggiungere l'attributo `layout="responsive"` al componente `<amp-image>`.

[tip type="read-on"] [Qui ulteriori informazioni sul funzionamento di AMP con il sistema di layout e media query](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Ingrandendo e rimpicciolendo la finestra del browser sarà possibile vedere l'immagine che si adatta alle dimensioni! L'[elenco dei componenti specifici del layout supportati è disponibile qui](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Modifica di presentazioni e layout

Con una sola immagine le cose sono abbastanza semplici da gestire, ma cosa succede se vogliamo visualizzarne di più? AMP per e-mail supporta elementi di layout, come pannelli a soffietto e barre laterali.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

In questa esercitazione, realizzeremo un esempio che utilizza l'elemento [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) per visualizzare le foto di gatti in un messaggio che ne popone l'adozione.

Aggiungere lo script `amp-carousel` all'intestazione dell'e-mail.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Quindi racchiudiamo la nostra prima immagine tra i tag `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

All'apparenza non è cambiato nulla, e questa è una cosa buona! Abbiamo assegnato al nostro elemento per la sequenza di immagini l'attributo `type=slides`, il che significa che mostrerà una foto alla volta. Poiché all'interno dei tag abbiamo inserito solo una foto, il sistema non mostra frecce di scorrimento all'utente.

Successivamente, sostituiamo all'interno del componente `<amp-carousel>` l'immagine del gattino per il segnaposto con le immagini dei gatti da adottare.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Ora dovrebbe essere possibile cambiare le foto, facendo clic sulle frecce di scorrimento disponibili sui lati sinistro e destro della sequenza!

## Invia messaggi con stile

AMP consente di applicare uno stile all'intestazione del documento inserendovi il tag `<style amp-custom>`. Inoltre, ora sono utilizzabili classi e pseudo-classi CSS precedentemente vietate. [Consultare l'elenco completo qui](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Aggiorniamo il messaggio `Hello, AMP4EMAIL world` con un titolo reale.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

E poi aggiungiamo alcuni elementi di stile nell'intestazione.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Aggiunta di funzionalità dinamiche

Le e-mail tipicamente consentono solo contenuti statici. Grazie ad AMP, le e-mail possono ora offrire un mondo di possibilità del tutto nuove! Gli utenti possono ora compilare [moduli](/content/amp-dev/documentation/components/reference/amp-form.md), ricevere [elenchi di contenuti aggiornati in modo dinamico](/content/amp-dev/documentation/components/reference/amp-list.md) e interagire con tali contenuti.

Nel seguito di questa esercitazione, useremo il componente [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) per visualizzare il nome e una descrizione dei nostri gatti in adozione, quando l'utente seleziona la diapositiva di quel gatto. Iniziamo includendo lo script `amp-bind` nell'intestazione dell'e-mail.

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

Successivamente, dichiareremo una variabile di associazione AMP "myState" come stringa JSON all'interno di un tag [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Dato che la nostra sequenza comprende le foto di quattro gatti, includeremo lo stato per ciascuna di esse.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[Le azioni e gli eventi AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) attivano diversi stati. Nel nostro caso, vogliamo aggiornare lo stato quando un utente fa clic sulle frecce di scorrimento della sequenza. L'elemento amp-carousel attiva un evento [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides), alla cui ricezione aggiorneremo la variabile `currentCat` usando `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

Questo codice imposta lo stato di `currentCat` a quello della foto del gatto corrispondente all'indice selezionato nella sequenza. In questo modo, se ci troviamo sulla diapositiva `event.index=2`, lo stato corrisponderà a quello dell'indice in posizione 2 dell'array.

L'ultima cosa che resta da fare è visualizzare il nome e le descrizioni del nostro gatto. Aggiungere il codice seguente sotto la chiusura del tag `amp-carousel`.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

L'estensione `amp-bind` fa uso di [espressioni](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) e [associazioni](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) per modificare il contenuto in modo dinamico. L'esempio di codice precedente utilizza l'associazione `[text]` per aggiornare il testo all'interno del tag `<span>` ogni volta che lo stato viene modificato, valutando l'espressione `"myState.cats[currentCat].name"`.

[tip type="note"] Per garantire le migliori prestazioni e per evitare il rischio di modifiche impreviste dei contenuti, amp-bind non valuta le espressioni al caricamento della pagina. Ciò significa che sarà necessario assegnare agli elementi visivi uno stato predefinito senza fare riferimento ad amp-bind per il rendering iniziale. [/tip]

Occorre anche aggiungere le descrizioni dei nostri gatti dopo il tag `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Ora, cambiando la foto del gatto nella sequenza, anche il nome e la descrizione associati dovrebbero aggiornarsi!

# Invio di e-mail AMP

Per sapere come inviare e-mail alla propria casella di posta in arrivo, [qui sono disponibili ulteriori informazioni sul test delle e-mail AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Congratulazioni! Hai appena inviato la tua prima e-mail AMP!

Per sapere come continuare, si consiglia di consultare [ulteriori informazioni sui fondamenti di AMP per E-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
