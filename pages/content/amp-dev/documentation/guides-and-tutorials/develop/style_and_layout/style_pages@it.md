---
$title: Stili CSS supportati
---

Come per tutte le pagine web, per le pagine AMP vengono utilizzati gli stili CSS, ma non puoi fare riferimento a fogli di stile esterni (ad eccezione dei [tipi di carattere personalizzati](#the-custom-fonts-exception)).
Inoltre, alcuni stili non sono consentiti a causa delle implicazioni legate al rendimento; gli attributi di stili in linea non sono consentiti.

Tutti gli stili devono essere inseriti nella sezione head del documento (leggi la sezione [Aggiungere stili a una pagina](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)).
Puoi però utilizzare i preprocessori e i modelli CSS per creare pagine statiche e poter così gestire meglio i tuoi contenuti.

**Nota.** Nei componenti AMP ci sono stili predefiniti integrati che facilitano la creazione di pagine reattive.
Questi stili sono definiti nell'elemento [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

## Utilizzare i preprocessori CSS <a name="using-css-preprocessors"></a>

L'output generato dai preprocessori funziona bene nelle pagine AMP così come in qualsiasi altra pagina web.
Ad esempio, il sito [amp.dev](https://amp.dev/) utilizza il linguaggio [Sass](http://sass-lang.com/) (noi utilizziamo [Grow](http://grow.io/) per creare le pagine AMP statiche del sito [amp.dev](https://amp.dev/)).

Se utilizzi i preprocessori, presta particolare attenzione a ciò che includi; carica soltanto gli elementi utilizzati nelle pagine.
Ad esempio, nella sezione [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) sono inclusi tutti gli elementi di markup AMP e gli stili CSS in linea necessari recuperati dai file sorgente `*.scss`.
È incluso, tra gli altri, anche lo script di elementi personalizzati per [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), per consentire di includere video di YouTube incorporati in tante pagine del sito.

[sourcecode:html] {% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Per sapere in che modo il codice precedente viene convertito in pagine HTML AMP formattate, visualizza il codice sorgente di qualsiasi pagina sul sito [amp.dev](https://amp.dev/).
In Chrome, fai clic con il pulsante destro del mouse e seleziona `Visualizza sorgente pagina`.

## Stili non consentiti

Gli stili che seguono non sono consentiti nelle pagine AMP:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Stile vietato</th>
      <th data-th="Description">Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Attributi di stili in linea</td>
      <td data-th="Description">Tutti gli stili devono essere definiti all'interno di un tag <code>&lt;style amp-custom&gt;</code> nella sezione <code>&lt;head&gt;</code> della pagina.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>important (qualificatore) </td>
      <td data-th="Description">Utilizzo non consentito.
      Si tratta di un requisito necessario per consentire l'applicazione delle regole di ridimensionamento degli elementi di AMP.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel="stylesheet"&gt;</code></td>
      <td data-th="Description">Non consentito, se non per i <a href="#leccezione-dei-tipi-di-carattere-personalizzati">tipi di carattere personalizzati</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (selettore universale)</td>
      <td data-th="Description">Ha implicazioni negative sul rendimento e potrebbe essere utilizzato per aggirare altre limitazioni dei selettori.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Potrebbe essere utilizzato per simulare il selettore universale.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudo-selettori, pseudo-classi e pseudo-elementi</td>
      <td data-th="Description">Pseudo-selettori, pseudo-classi e pseudo-elementi sono consentiti soltanto nei selettori che contengono nomi di tag, i quali non devono iniziare con <code>amp-</code>.
      Esempio corretto: <code>a:hover, div:last-of-type</code>
      Esempio errato: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">Classe <code>-amp-</code> e nomi di tag <code>i-amp-</code></td>
      <td data-th="Description">Nei fogli di stile con autore, i nomi di classi non possono iniziare con la stringa <code>-amp-</code>. Queste stringhe possono essere utilizzate solo internamente per il runtime AMP. Ne consegue che il foglio di stile dell'utente non può fare riferimento ai selettori CSS per le classi <code>-amp-</code> e i tag <code>i-amp</code>.</td>
    </tr>
  </tbody>
</table>

## Proprietà di transizioni e animazioni consentite <a name="the-custom-fonts-exception"></a>

AMP consente soltanto le proprietà di transizioni e animazioni che è possibile sottoporre ad accelerazione GPU nei browser più comuni.
Il progetto AMP autorizza attualmente le proprietà `opacity`, `transform` e `-vendorPrefix-transform`.

Negli esempi seguenti, `<property>` deve essere nella allowlist:

- `transition <property> (Also -vendorPrefix-transition)`
- @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

Alla proprietà `overflow` (e `overflow-y`, `overflow-x`) non può essere applicato lo stile “auto” o “scroll”.
Nessun elemento definito dall'utente in un documento AMP può avere una barra di scorrimento.

## L'eccezione dei tipi di carattere personalizzati <a name="leccezione-dei-tipi-di-carattere-personalizzati"></a>

Le pagine AMP non possono includere fogli di stile esterni, ad eccezione dei tipi di carattere personalizzati.
I due metodi supportati per i riferimenti ai tipi di carattere personalizzati sono l'utilizzo di tag link che rimandano ai fornitori di caratteri autorizzati e l'inclusione di `@font-face`.

I fornitori di caratteri possono essere autorizzati soltanto se supportano le integrazioni solo CSS e se pubblicano i tipi di carattere tramite HTTPS. Attualmente, soltanto le seguenti origini sono autorizzate e consentite per la pubblicazione dei tipi di carattere tramite tag link:

- [https://fast.fonts.net](https://fast.fonts.net)
- [https://fonts.googleapis.com](https://fonts.googleapis.com)

Esempio di tag link che rimanda al fornitore di caratteri autorizzato Google Fonts:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

In alternativa puoi utilizzare [`@font-face`](https://developer.mozilla.org/it-IT/docs/Web/CSS/@font-face).
I tipi di carattere inclusi tramite `@font-face` devono essere recuperati tramite lo schema HTTP o HTTPS.
