---
'$title': Formato AMP per e-mail
$order: 1
formats:
  - email
teaser:
  text: 'Markup obbligatori '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

AMP è una popolare tecnologia per lo sviluppo di pagine web molto veloci su client mobili. AMP è costituito da un insieme di tag HTML supportato da JavaScript che consente un'agevole disponibilità delle funzionalità offerte e rivolge un'attenzione particolare alle prestazioni e alla sicurezza. Ci sono [componenti AMP](https://amp.dev/documentation/components/) per le più svariate applicazioni, quale sequenze, elementi di moduli reattivi, recupero di contenuti aggiornati da endpoint remoti.

Il formato AMP per e-mail fornisce [un sottoinsieme di componenti AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md) che possono essere utilizzati nei messaggi e-mail. I destinatari delle e-mail AMP possono visualizzare e interagire con i componenti AMP direttamente nelle e-mail.

## Markup obbligatori

Il codice seguente rappresenta la quantità minima di markup richiesti da un messaggio e-mail in formato AMP valido:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Un messaggio e-mail AMP DEVE

- <a name="dctp"></a>Iniziare con il doctype `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>Contenere un tag di primo livello `<html ⚡>` (`<html amp>` è ugualmente accettato). [🔗](#ampd)
- <a name="crps"></a>Contenere i tag `<head>` e `<body>` (che sono opzionali in HTML). [🔗](#crps)
- <a name="chrs"></a>Contenere un tag `<meta charset="utf-8">` come primo elemento figlio del proprio tag di intestazione. [🔗](#chrs)
- <a name="scrpt"></a>Contenere un tag `<script async src="https://ampjs.org/v0.js"></script>` all'interno del proprio tag di intestazione. [🔗](#scrpt)
- <a name="boilerplate"></a>contenere il boilerplate amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) all'interno del proprio tag di intestazione per nascondere inizialmente il contenuto fino al caricamento di AMP JS. [🔗](#boilerplate)

L'intero markup AMPHTML non deve superare i 200.000 byte.

## Struttura e rendering <a name="structure-and-rendering"></a>

Il formato AMP per E-mail si basa sul sottotipo <a>MIME</a> <code>multipart/alternative</code> standard, come definito nel documento [RFC 1521, sezione 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Per ulteriori informazioni, consultare la sezione [Struttura e rendering delle e-mail AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md)._

## Componenti AMP supportati <a name="supported-amp-components"></a>

_Consultare il documento [Componenti supportati da AMP per e-mail](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md)._

## Requisiti HTML <a name="html-requirements"></a>

_Consultare il documento [Elementi HTML supportati in AMP per E-mail](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-html.md)._

## Requisiti CSS <a name="css-requirements"></a>

### Selettori e proprietà supportati <a name="supported-selectors-and-properties"></a>

_Consultare il documento [Elementi CSS supportati in AMP per E-mail](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-css.md)._

### Inserimento di elementi CSS in un documento AMP <a name="specifying-css-in-an-amp-document"></a>

Tutti gli elementi CSS presenti in ogni documento AMP devono essere inclusi in un tag `<style amp-custom>` all'interno dell'intestazione o come attributi `style` inline.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Nota: l'intero tag `<style>` non può superare i 50.000 byte. Lo strumento di convalida verificherà anche le dimensioni.

## Dimensioni del documento <a name="document-dimensions"></a>

- **Larghezza ottimale**: massimo 800 pixel (qualsiasi contenuto più largo potrebbe essere troncato inavvertitamente su alcuni client).

- **Altezza**: variabile, il client permette all'utente di scorrere i contenuti.

## Convalida <a name="validation"></a>

Per garantire che i messaggi e-mail soddisfino i rigorosi criteri del formato AMP per e-mail, si possono utilizzare gli strumenti di convalida di AMP già esistenti.

Per ulteriori informazioni, consultare il documento [Convalida di e-mail AMP](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/).

## Privacy e sicurezza <a name="privacy-and-security"></a>

### Tracciamento di interazioni e-mail <a name="tracking-email-opens-and-interaction"></a>

AMPHTML consente il controllo delle interazioni e-mail con tecniche di tracciamento dei pixel, come le normali e-mail HTML. Qualsiasi richiesta di dati avviata dall'utente da servizi esterni indicherà anche che l'utente sta interagendo con il messaggio. I client di posta elettronica offrono agli utenti la possibilità di disabilitare il caricamento di immagini remote e altre richieste esterne.

### Strumenti di analisi specifici di AMP <a name="amp-specific-analytics"></a>

Le seguenti tecniche di analisi specifiche di AMP non sono supportate:

- [AMP `CLIENT_ID</a>`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Sostituzione di variabili AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Considerazioni relative ai componenti <a name="component-specific-considerations"></a>

Le richieste di immagini all'interno di elementi [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) o [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) possono indicare al mittente che l'utente sta interagendo con il messaggio.

I reindirizzamenti in [`<amp-form>`](https://amp.dev/documentation/components/amp-form) non sono consentiti a runtime.

## Feedback e assistenza <a name="feedback--support"></a>

Per richieste di assistenza e invio di feedback su AMP per e-mail, potete utilizzare il seguente canale: [ongoing-participation](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#ongoing-participation)
