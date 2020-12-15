---
"$title": Elementi di base su AMP per e-mail
"$order": '1'
description: Qui troverai tutto quello che devi sapere per iniziare a realizzare e-mail AMP valide.
author: CrystalOnScript
formats:
- email
---

Se sei pratico di contenuti AMP,  abbiamo ottime notizie per te! AMP per E-mail è un semplice sottoinsieme della libreria AMP HTML. Anche se non hai conoscenze dei contenuti AMP, ci sono ottime notizie! Questa guida ti fornirà tutte le informazioni di cui avrai bisogno per iniziare a creare e-mail AMP valide!

## Markup obbligatori

Le e-mail AMP assomigliano alle e-mail HTML classiche, ma presentano alcune differenze. Lo schema seguente mostra la minima struttura di markup richiesti per realizzare un'e-mail AMP valida.

```html
<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
<body>
  Hello, AMP4EMAIL world.
</body>
</html>
```

I fornitori di servizi di posta elettronica che supportano le email AMP prevedono controlli di sicurezza per garantire agli utenti un'esperienza piacevole e sicura. Le e-mail realizzate in formato AMP devono soddisfare tutti i requisiti seguenti:

- Iniziare con il doctype `<!doctype html>`. Questo è richiesto anche per i documenti HTML standard.
- Contenere un tag di primo livello `<html amp4email>` o un tag `<html ⚡4email>` per rendere l'e-mail ancora più elegante. Tali tag identificano il documento come e-mail AMP in modo che possa essere gestito come tale.
- Definire entrambi i tag `<head>` e `<body>`. Questo è facoltativo in HTML, ma AMP ne ha bisogno per garantire l'integrità della struttura!
- Contenere un tag `<meta charset="utf-8">` come primo elemento figlio del tag `<head>`. Questo identifica il formato per la codifica della pagina.
- La libreria AMP viene importata tramite un tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` inserito nella sezione `<head>`. Senza tale tag, nessuna delle straordinarie e dinamiche funzionalità messe a disposizione da AMP sarebbero utilizzabili! Le procedure consigliate suggeriscono di includere il tag quanto prima possibile nella sezione `<head>`, direttamente sotto il tag `<meta charset="utf-8">`.
- Inizialmente il contenuto dell'e-mail deve essere nascosto fino a quando la libreria AMP non è caricata, posizionando il boilerplate AMP per E-mail nella sezione `<head>`.

```html
<head>
...
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
```

### Sostituzione di tag specifici per AMP

Poiché la libreria AMP per e-mail è un sottoinsieme di quella AMP HTML, si applicano molte delle stesse regole; i tag specifici per AMP sostituiscono i tag HTML che consumano risorse e richiedono una larghezza e un'altezza definite. Ciò consente al boilerplate AMP di nascondere il contenuto, finché non è in grado di stabilire l'aspetto dei contenuti sul dispositivo dell'utente.

#### Immagini

Per consentire il tracciamento delle pagina in modo efficace, tutti i tag `<img>` vengono sostituiti con [`<amp-img>`](../../../documentation/components/reference/amp-img.md). I tag `<amp-img>` richiedono una larghezza e un'altezza definite e supportano [il sistema di layout AMP](amp-html-layout/index.md)

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

Il tag `<amp-img>` è dotato di potenti metodi integrati per controllare la struttura dei componenti reattivi e impostare gli elementi di fallback.

[tip type="note"] Leggere ulteriori informazioni sull'uso [di layout e media query](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) AMP e sulla definizione degli elementi di [fallback per le immagini](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

#### GIF

AMP ha creato [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), un tag specifico per le immagini GIF che consente al sistema di runtime AMP di ridurre l'utilizzo della CPU quando l'animazione è fuori dallo schermo. Come per il tag `<amp-img>`, occorre definire la larghezza e l'altezza e l'elemento deve includere un tag di chiusura.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Inoltre, esso supporta un elemento figlio `placeholder` opzionale da visualizzare durante il caricamento del file `src` e supporta il sistema di layout AMP.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Realizzare e-mail, con stile <a name="emails-with-style"></a>

Come tutti i client di posta elettronica, AMP consente attributi `style` inline, ma supporta anche elementi CSS all'interno del tag `<style amp-custom>` nell'intestazione dell'e-mail.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

Come nelle e-mail HTML, il formato AMP per e-mail supporta un sottoinsieme limitato di selettori e proprietà CSS.

Per un elenco completo degli elementi CSS consentiti sui client di posta che supportano AMP, consultare il documento [CSS supportati da AMP per e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md).

[tip type="important"] AMP impone una dimensione limite di 75.000 byte per gli elementi di stile. [/tip]

## Componenti AMP consentiti

Le caratteristiche dinamiche, visive e di interattività dei componenti AMP rendono il formato AMP ideale per i futuri sviluppi dei sistemi di posta elettronica.

L'[elenco completo dei componenti supportati da AMP per E-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) è disponibile nell'ambito delle specifiche AMP.

## Autenticazione delle richieste

L'inclusione di contenuti dinamici e personalizzati nelle e-mail spesso richiede l'autenticazione dell'utente. Quindi, per proteggere i dati dell'utente, tutte le richieste HTTP effettuate dall'interno delle e-mail AMP possono essere inviate tramite proxy e private dei cookie.

Per autenticare le richieste effettuate dalle email AMP, si possono utilizzare i token di accesso.

### Token di accesso

È possibile utilizzare i token di accesso per autenticare l'utente. I token di accesso vengono forniti e controllati dal mittente dell'e-mail. Il mittente utilizza i token per garantire che solo coloro che hanno accesso all'e-mail AMP possano effettuare le richieste in essa contenute. I token di accesso devono essere protetti tramite crittografia e limitati in termini di tempo e ambito. Vanno inclusi nell'URL della richiesta.

Questo esempio mostra un possibile utilizzo di `<amp-list>` per visualizzare i dati autenticati:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache">
    ...
  </template>
</amp-list>
```

Analogamente, quando si utilizzano elementi `<amp-form>`, occorre posizionare il token di accesso nell'URL `action-xhr`.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Esempio

L'esempio seguente considera un ipotetico servizio per la registrazione di note, che consente agli utenti che hanno effettuato l'accesso di aggiungere note al proprio account e visualizzarle in seguito. Il servizio desidera inviare un'e-mail a un utente con indirizzo `jane@example.com`. Tale e-mail comprende un elenco delle note precedentemente registrate. L'elenco delle note per l'utente in questione è disponibile nell'endpoint `https://example.com/personal-notes` in formato JSON.

Prima di inviare l'e-mail, il servizio genera un token di accesso a uso limitato, protetto tramite crittografia, utilizzabile da `jane@example.com: A3a4roX9x`. Il token di accesso è incluso nel nome del campo `exampletoken` all'interno dell'URL della query:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

L'endpoint `https://example.com/personal-notes` si occupa della convalida del parametro exampletoken e della ricerca dell'utente associato al token.

### Token di accesso ad uso limitato

I token di accesso ad uso limitato forniscono protezione contro i tentativi di spoofing delle richieste e dagli [attacchi replay](https://en.wikipedia.org/wiki/Replay_attack), garantendo che l'azione sia eseguita solo dall'utente a cui è stato inviato il messaggio. La protezione si ottiene aggiungendo un parametro token univoco ai parametri della richiesta e verificandolo quando viene richiamata l'azione.

Il parametro token deve essere generato sotto forma di chiave che può essere utilizzata solo per un'azione specifica e un utente specifico. Prima di eseguire l'azione richiesta, è necessario verificare che il token sia valido e corrisponda a quello generato per l'utente in questione. Se il token corrisponde, l'azione può essere eseguita e il token non è più valido per richieste future.

I token di accesso devono essere inviati all'utente nell'ambito delle proprietà url di HttpActionHandler. Ad esempio, se un'applicazione gestisce le richieste di approvazione all'indirizzo `http://www.example.com/approve?requestId=123`, occorre includere un parametro `accessToken` aggiuntivo e ricevere le richieste inviate a `http://www.example.com/approve?requestId=123&accessToken=xyz`.

La combinazione degli attributi `requestId=123` e `accessToken=xyz` va generata in anticipo, assicurandosi che l'`accessToken` non possa essere ricavato dall'elemento `requestId`. Qualsiasi richiesta di approvazione con `requestId=123` e senza `accessToken` o con `accessToken` diverso da `xyz` deve essere rifiutata. Una volta che tale richiesta è stata ricevuta e accettata, anche qualsiasi richiesta futura con la stessa coppia ID/token di accesso dovrà essere rifiutata.

## Test specifici in vari client e-mail

I client di posta elettronica che supportano AMP per e-mail forniscono la propria documentazione e strumenti di test per favorirne l'integrazione.

Consultare il documento [Test delle e-mail AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md) per ulteriori informazioni e per i link alla documentazione di specifici client di posta.
