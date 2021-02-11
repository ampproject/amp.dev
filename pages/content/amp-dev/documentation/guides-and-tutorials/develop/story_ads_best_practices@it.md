---
'$title': Procedure consigliate per la creazione di annunci in storie Web
$order: 16
description: "Le storie Web sono una coinvolgente esperienza a schermo intero, con contenuti abilitati per il tocco, che immerge gli utenti nella lettura dei contenuti. Gli annunci che appaiono nelle storie Web devono avere una struttura coerente con l'interfaccia utente delle storie Web."
formats:
  - ads
  - stories
---

Le storie Web sono una coinvolgente esperienza a schermo intero, con contenuti abilitati per il tocco, che immerge gli utenti nella lettura dei contenuti. Gli annunci che appaiono nelle storie Web devono avere una struttura coerente con l'interfaccia utente delle storie Web. Questo garantisce un'esperienza di utilizzo affidabile e senza interruzioni. La presente guida indica come creare annunci per storie Web.

## Principi degli annunci per storie Web

Gli attuali formati di annunci, come banner e caselle, non si integrano bene con il formato delle storie AMP. Gli annunci classici sono lenti, fuori posto e tendono a interrompere l'esperienza delle storie.

Gli annunci delle storie Web devono rispettare i seguenti principi:

- Validità annunci AMPHTML: seguono le stesse specifiche tecniche di un [annuncio AMPHTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md) classico.
- Impatto visivo: gli annunci devono essere accattivanti, attraenti e adeguati al contesto della storia.
- Annunci nativi: le pagine degli annunci hanno le stesse dimensioni di una pagina della storia principale.
- Stesso modello di interazione: l'utente può passare alla schermata successiva di un annuncio proprio come farebbe con una pagina della storia principale.
- Velocità: gli annunci non sono mai presentati a un utente a caricamento incompleto.

Per rispettare questi principi, il sistema di runtime delle storie Web determina il corretto posizionamento di una pagina di annunci all'interno della storia Web. Maggiori informazioni sui meccanismi di posizionamento degli annunci sono disponibili nel documento [Annunci nelle storie Web](advertise_amp_stories.md).

## Esempi di annunci per storie

Gli annunci delle storie Web sono annunci AMPHTML, che richiedono i dati del tag Meta e supportano le specifiche definite per i layout e i necessari elementi dell'interfaccia utente. Gli annunci nelle storie Web comprendono sempre un pulsante di Invito all'azione (CTA) e un'etichetta dell'annuncio visualizzata come testo disclaimer nella parte superiore della pagina.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Esempio di annuncio in una storia AMP', caption='Esempio di annuncio in una storia AMP', align='' ) }}

Per garantire un'esperienza d'uso omogenea, il sistema runtime delle storie Web è responsabile del rendering dell'etichetta e del pulsante di Invito all'azione (CTA) dell'annuncio.

[tip type="important"] **IMPORTANTE:** è possibile creare un solo pulsante CTA cliccabile negli annunci delle storie Web, fattore da tenere in considerazione durante lo sviluppo dei propri contenuti creativi.[/tip]

## Dati del tag Meta

I dati del tag Meta indicano che l'annuncio rispetta il formato delle storie Web, definiscono l'enumerazione di testi per il pulsante CTA, indicano dove l'utente sarà reindirizzato premendo il pulsante e il tipo della pagina di destinazione.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

Si consiglia di scegliere il tag amp-cta-type tra le <a>opzioni di testo disponibili per il pulsante CTA</a>. AMP localizzerà automaticamente le opzioni predefinite se necessario.

È consentito il testo personalizzato, ma sarà necessario implementare la propria localizzazione.

## Enumerazione testi del pulsante Invito all'azione <a name="call-to-action-button-text-enum"></a>

Il pulsante di invito all'azione può essere configurato scegliendo tra una serie predefinita di opzioni:

- `APPLY_NOW`: "Richiedi ora"
- `BOOK_NOW`: "Prenota"
- `BUY_TICKETS`: "Acquista biglietti"
- `DOWNLOAD`: "Download"
- `EXPLORE`: "Esplora ora"
- `GET_NOW`: "Ricevi ora"
- `INSTALL`: "Installa ora"
- `LISTEN`: "Ascolta ora"
- `MORE`: "Altro"
- `OPEN_APP`: "Apri app"
- `ORDER_NOW`: "Ordina ora"
- `PLAY`: "Gioca"
- `READ`: "Leggi ora"
- `SHOP`: "Fai shopping ora"
- `SHOWTIMES`: "Showtime"
- `SIGN_UP`: "Registrati"
- `SUBSCRIBE`: "Abbonati ora"
- `USE_APP`: "Usa app"
- `VIEW`: "Visualizza"
- `WATCH`: "Guarda"
- `WATCH_EPISODE`: "Guarda episodio"

[tip type="note"] **NOTA:** i collegamenti diretti alle app non sono supportati, ma i collegamenti alla pagina App Store o alla pagina Google Play Store sono supportati tramite http/https. L'enumerazione dei testi del pulsante CTA è specificata nel payload della risposta all'annuncio. [/tip]

Se si ritiene necessario disporre di altre opzione di enumerazione testi per il pulsante CTA, è possibile aprire una [segnalazione GitHub](https://github.com/ampproject/amphtml/issues/new).

## Pagina di destinazione annunci

È possibile specificare una di tre opzioni per la pagina di destinazione di un annuncio in storie AMP.

- `STORY`: la pagina di destinazione è una [storia sponsorizzata](story_ads_best_practices.md#sponsored-story).
- `AMP`: la pagina di destinazione è una pagina AMP valida.
- `NONAMP`: la destinazione è una pagina web di qualunque altro tipo.

## Layout

Le storie AMP sono disposte orizzontalmente e a schermo intero. Gli annunci nelle storie devono conformarsi a questo formato per fornire un'esperienza di utilizzo omogenea.

## Dimensioni di sovrimpressione

L'etichetta dell'annuncio appare in sovrimpressione su una barra di sfumatura scura per tutta la larghezza dell'annuncio e si estende dalla cima verso il basso per 46 pixel.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Esempio di sovrimpressione annuncio', caption='L\'annuncio in sovrimpressione inizia in cima', align='' ) }}

Il pulsante CTA si trova a 32 pixel dal fondo ed è centrato orizzontalmente. Occupa un'area di 120 per 36 pixel.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Esempio del pulsante CTA', caption='Il pulsante CTA si trova in fondo alla pagina', align='' ) }}

## Immagini e video

Le immagini e i video inclusi in annunci per storie AMP devono essere in formato standard 4:3 a schermo intero. Gli annunci che includono video devono utilizzare un [poster](../../../documentation/components/reference/amp-video.md#poster). Le dimensioni consigliate per l'immagine del poster sono 720p (720 largh. x 1280 alt.).

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Immagini

Le immagini di sfondo possono essere ridimensionate a schermo intero. Il seguente CSS è uno strumento efficace per ritagliare e centrare video e immagini.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Video

#### Utilizzare `<source>` invece di `src` quando si specifica la sorgente per un componente [`amp-video`](../../../documentation/components/reference/amp-video.md)

Quando si specifica la sorgente per un [`amp-video`](../../../documentation/components/reference/amp-video.md)

Esempio: indicazione di più file di origine

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Dimensioni e lunghezza dei video:

Per prestazioni ottimali, occorre fornire video di dimensioni non superiori a 4 MB. File di dimensioni inferiori consentono un download più veloce, quindi è conveniente adottare oggetti dalle minime dimensioni possibili.

#### Formati video:

Se è possibile fornire un solo formato video, utilizzare **MP4**. Tuttavia, ove possibile, utilizzare il video di tipo **HLS** e specificare MP4 come fallback per i browser che non supportano video HLS. HLS esegue lo streaming con bitrate adattivo, che permette di modificare la qualità del video per adattarla dinamicamente alla connessione di rete dell'utente.

[tip type="note"] **NOTA:** il formato video HLS non è supportato nel browser Chrome for Desktop (nemmeno tramite emulazione), pertanto è necessario specificare un fallback MP4 per qualsiasi traffico di tipo desktop sulla pagina. Per eseguire il debug dei video HLS, è necessario utilizzare un dispositivo mobile reale con debugging USB. [/tip]

#### Risoluzione video

I video delle storie Web hanno sempre orientamento verticale, con un formato di visualizzazione 16:9. Utilizzare la risoluzione consigliata a seconda del tipo di streaming video:

<table>
  <thead>
    <tr>
     <th>Tipo di streaming video</th>
     <th>Risoluzione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non adattivo</td>
     <td>720 x 1280 pixel</td>
    </tr>
    <tr>
     <td>Adattivo</td>
     <td>720 x 1280 pixel<br>540 x 960 pixel<br>360 x 480 pixel</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **NOTA:** per i dispositivi mobili che hanno un formato di visualizzazione diverso da 16: 9, il video può essere ritagliato in orizzontale o in verticale per adattarsi al riquadro di visualizzazione. [/tip]

#### Video codec

1. Per MP4, utilizzare `H.264`.
2. Per WEBM, utilizzare `VP9`.
3. Per HLS o DASH, utilizzare `H.264`.

#### Qualità video

##### Ottimizzazioni di transcodifica

Esistono vari strumenti che si possono utilizzare per codificare i video e regolarne la qualità durante la codifica. Di seguito ne elenchiamo alcuni:

<table>
  <thead>
    <tr>
     <th>Strumento</th>
     <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Ottimizzazioni consigliate: <ul> <li> Per MP4, usare <code>-crf 23</code>. </li> <li> Per WEBM, usare <code>-b:v 1M</code>. </li> </ul> </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Ottimizzazioni consigliate: <ul> <li> Per MP4, usare <code>-crf 23</code>. </li> <li> Per WEBM, usare <code>-b:v 1M</code>.</li> </ul> </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>Un codificatore che può anche generare il formato HLS inclusa la playlist.</td>
    </tr>
  </tbody>
</table>

##### Dimensione segmenti HLS

Verificare che le dimensioni dei segmenti HLS non durino in genere più di 10 secondi.

## Animazioni

Le animazioni nelle storie presentano alcuni elementi cui prestare attenzione, quali il concetto di ciò che è "visibile". Ad esempio, nella nostra vista desktop "a 3 pannelli" i tuoi contenuti creativi potrebbero essere visibili sulla pagina, ma non essere adeguatamente al centro dell'attenzione. Questo può essere un problema, se l'effetto desiderato è avviare le animazioni in una pagina che diventa l'elemento principale di una storia.

A questo scopo, AMP aggiungerà un attributo speciale `amp-story-visible` al corpo dei contenuti creativi quando essi rappresentano l'elemento principale in tutti i contesti di servizio. Si consiglia di attivare le animazioni in base a questo segnale.

Esempio: questa animazione si attiva quando la pagina viene messa al centro dell'attenzione e si riavvia se un utente fa clic su un'altra pagina della storia e poi torna alla pagina precedente.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Storie sponsorizzate <a name="sponsored-story"></a>

Una storia sponsorizzata esiste come URL sul web, che consente di indirizzare il traffico degli utenti verso la storia sponsorizzata dopo aver premuto il pulsante di invito all'azione nell'annuncio di una storia AMP. Una storia sponsorizzata è una storia AMP, ma focalizzata su un'esperienza coinvolgente e completa.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='Il pulsante CTA indirizza a una storia sponsorizzata', caption='Il pulsante CTA indirizza a una storia sponsorizzata', align='' ) }}

Puoi trovare maggiori informazioni sulla creazione di una [storia Web qui](../start/create_successful_stories.md).
