---
'$title': Aggiunta di componenti AMP estesi
$order: 2
description: 'Il sistema dei componenti AMP consente di creare rapidamente e con il minimo sforzo funzionalità efficienti e reattive per i propri articoli. La libreria AMP HTML ha tre classificazioni per i componenti AMP: ...'
---

Il sistema dei componenti AMP consente di creare rapidamente e con il minimo sforzo funzionalità efficienti e reattive per i propri articoli. La libreria AMP HTML ha tre classificazioni per i componenti AMP:

- **integrati**: si tratta di componenti inclusi nella libreria AMP JavaScript di base (specificata nel tag `<head>`), quali [`amp-img`](../../../../documentation/components/reference/amp-img.md) e [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Questi componenti possono essere utilizzati immediatamente in un documento AMP.

- **estesi**: si tratta di estensioni alla libreria di base che devono essere incluse esplicitamente nel documento come elementi personalizzati. Gli elementi personalizzati richiedono script specifici che vanno aggiunti alla sezione `<head>` (ad es. `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **sperimentali**: si tratta di componenti rilasciati ma non ancora pronti per un ampio utilizzo. Gli sviluppatori possono scegliere di utilizzare queste funzionalità prima che vengano rilasciate completamente. Ulteriori informazioni sono disponibili nel documento [Funzionalità sperimentali](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Il nostro esempio fa già uso di componenti integrati, come [`amp-img`](../../../../documentation/components/reference/amp-img.md). Abbiamo già descritto come questo componente si integra nel sistema di layout AMP nell'esercitazione ["Convertire documenti HTML in AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md). Ora, aggiungeremo alcuni dei componenti AMP **estesi** più comuni per il nostro esempio dell'articolo di notizie.

## Monetizzazione degli annunci

Gli annunci in AMP vengono creati utilizzando il componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Il componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) consente di configurare gli annunci in diversi modi, ad esempio con le modalità larghezza, altezza e layout. Tuttavia, molte piattaforme di annunci richiedono la configurazione di parametri aggiuntivi, quali ID account della rete pubblicitaria, annuncio da fornire o le opzioni per il targeting pubblicitario. Queste opzioni possono essere facilmente specificate nel componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), utilizzando gli attributi HTML.

Consideriamo questo esempio di annuncio **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

Come si vede, la sua configurazione è molto semplice. Si può notare l'attributo `type`, che informa il componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) della piattaforma di annunci da utilizzare. In questo caso, vogliamo utilizzare la piattaforma [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md), per cui abbiamo indicato `doubleclick` come valore.

L'attributo `data-slot` è invece specifico della piattaforma. In [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), tutti gli attributi che iniziano con `data-` sono specifici del fornitore. Ciò significa che non tutti i fornitori richiederanno necessariamente questo particolare attributo, e che essi non saranno sempre efficaci se forniti. Ad esempio, confrontiamo il precedente esempio di **DoubleClick** con il seguente annuncio di prova della piattaforma [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Proviamo ad **aggiungere** entrambi gli esempi precedenti nel nostro articolo subito dopo il tag `<header>`.

Ricordiamo che non tutti i componenti sono inclusi nel file JavaScript della libreria AMP principale. Dobbiamo includere una richiesta JavaScript aggiuntiva per il componente degli annunci.

**Aggiungere** il seguente script al tag `<head>`:

```html
<script
  async
  custom-element="amp-ad"
  src="https://ampjs.org/v0/amp-ad-0.1.js"
></script>
```

**Aggiornando** la pagina, si dovrebbero vedere due annunci di prova:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **IMPORTANTE :** Si potrebbero verificare alcuni errori nella console per sviluppatori, come `Mixed Content` o `XMLHttpRequest cannot load`. Il primo errore è probabilmente correlato all'annuncio A9, perché non tutto il contenuto caricato è sicuro. Questo è un requisito importante per tutti gli annunci pubblicati in pagine AMP. [/tip]

I due elementi [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) utilizzati di seguito forniscono un buon esempio della flessibilità fornita da [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) per supportare le funzioni di una piattaforma di annunci. In questo caso abbiamo definito (utilizzando la dashboard di DoubleClick) due annunci di prova DoubleClick da mostrare solo in alcuni paesi: il primo verrà visualizzato solo nel Regno Unito e il secondo solo negli Stati Uniti. Proviamo ad **aggiungere** queste due configurazioni di annunci con targeting geografico nel documento AMP sotto gli annunci definiti in precedenza:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Aggiorniamo** la pagina e diamo un'occhiata. La schermata seguente è stata acquisita in Canada, per cui nessuno dei due annunci è stato caricato:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **NOTA:** All'interno di questi tag [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) sono presenti tag `div` aggiuntivi con un attributo denominato `fallback`. A cosa serve l'attributo <code>fallback</code>? Esso indica al sistema di caricamento AMP di mostrare i contenuti di quell'elemento solo quando non è possibile caricare correttamente l'elemento padre. Ulteriori informazioni nella sezione [Segnaposto e fallback](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **CONTINUA A LEGGERE:** Per informazioni sulle ultime reti di annunci supportate, consultare la documentazione di riferimento del componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **NOTA:** Nessun codice JavaScript fornito dalla rete di annunci può essere eseguito all'interno dei documenti AMP. Invece, il sistema di runtime AMP carica un iframe da un'origine diversa (tramite un iframe sandbox) come documento AMP ed esegue il codcie JS della rete di annunci all'interno di quell'iframe sandobox. [/tip]

Il nostro documento AMP ora include testo, un'immagine e un annuncio incorporato nella pagina: sono tutti elementi chiave per raccontare una storia e monetizzare sui contenuti. Tuttavia, i moderni siti web spesso includono molte funzionalità, oltre a semplici immagini e testi.

Cerchiamo di migliorare il nostro documento AMP e aggiungiamo funzionalità web più avanzate che si trovano comunemente negli articoli di notizie, quali:

- Video Youtube
- Tweet
- Citazioni di articoli

## Integrazione di un video YouTube

Proviamo a incorporare un video YouTube nel documento. **Aggiungiamo** il seguente codice subito dopo la sezione `<header>` del documento AMP (sopra gli elementi [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) appena aggiunti):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Aggiorniamo** la pagina. Invece del video, vedremo questo testo: _"Impossibile caricare il video"._

Anche se il browser può mostrare i video YouTube senza problemi, indicherà comunque questo errore. Perché? L'errore effettivo non è nel caricamento del video, ma nel componente in sé.

Ricordiamo che non tutti i componenti sono inclusi nel file JavaScript della libreria AMP principale. Dobbiamo includere una richiesta JavaScript aggiuntiva per il componente YouTube.

[tip type="note"] **NOTA:** Se la console per sviluppatori è ancora aperta e l'URL presenta il parametro `#development=1`, il sistema mostrerà a questo punto un errore di convalida AMP che ricorda di aggiungere il codice JavaScript [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) e presenta un link alla documentazione che indica il tag `script` da aggiungere. [/tip]

**Aggiungere** il seguente script al tag `<head>`:

```html
<script
  async
  custom-element="amp-youtube"
  src="https://ampjs.org/v0/amp-youtube-0.1.js"
></script>
```

**Aggiornando** la pagina, il video YouTube dovrebbe essere visibile:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Come per gli altri elementi della pagina, abbiamo specificato gli attributi `width` e `height` del video in modo che il sistema di layout AMP possa calcolare le proporzioni. Inoltre, impostiamo un `layout` di tipo `responsive`, in modo che il video riempia in larghezza il suo elemento padre.

Per ulteriori informazioni sull'inclusione di video YouTube, consultare la documentazione del componente [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Consultare anche l'[elenco dei componenti AMP multimediali](../../../../documentation/components/index.html#media).

[tip type="tip"] **SUGGERIMENTO:** Utilizzare l'attributo [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) per informare gli utenti se un componente non viene caricato o se non è supportato nel loro browser. [/tip]

## Visualizzazione di Tweet

L'inclusione di tweet pre-formattati da Twitter è un'altra caratteristica comunemente impiegata negli articoli di notizie. Il componente [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) può fornire questa funzionalità.

Aggiungiamo la seguente richiesta JavaScript al tag `<head>` del documento:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://ampjs.org/v0/amp-twitter-0.1.js"
></script>
```

Ora, **aggiungere** all'articolo questo codice per incorporare il Tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

L'attributo `data-tweetid` è un altro esempio di attributo personalizzato richiesto da una particolare piattaforma. In questo caso, Twitter associa il valore dell'attributo `data-tweetid` a un particolare Tweet.

**Aggiorniamo** il browser e diamo un'occhiata alla pagina. Ora il Tweet dovrebbe essere visibile:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Per saperne di più sull'inclusione dei Tweet, leggere la documentazione del componente [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **SUGGERIMENTO:** AMP fornisce anche altri componenti per incorporare contenuti dai social network. Consultare l'elenco degli ultimi [componenti social AMP](../../../../documentation/components/index.html#social) supportati. [/tip]

## Evidenziare citazioni di articoli

Una caratteristica comune alla maggior parte degli articoli di notizie è mettere in evidenza frammenti di testo particolarmente coinvolgenti dell'articolo. Ad esempio, la citazione di una particolare fonte o di un fatto importante potrebbero essere riportati in caratteri più grandi per attirare l'attenzione del lettore.

Tuttavia, non tutti i frammenti di testo hanno la stessa lunghezza di caratteri, il che può rendere difficile adattare caratteri di dimensioni maggiori alla quantità di spazio che il testo occupa sulla pagina.

AMP fornisce un componente specifico per queste situazioni, [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). Il componente [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) permette di definire un elemento di larghezza e altezza fissati e con una dimensione di caratteri massima. Il componente ridimensiona automaticamente il carattere per **adattare** il testo allo spazio in altezza e larghezza disponibile.

Proviamolo. Innanzitutto, **aggiungiamo** la libreria del componente al tag `<head>`:

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://ampjs.org/v0/amp-fit-text-0.1.js"
></script>
```

Aggiungere quanto segue alla pagina:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Aggiorniamo** la pagina e proviamola!

Ora, facciamo altre prove. Cosa succede se la citazione è molto più breve?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Oppure, cosa succede se la citazione è più lunga?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Come ultima prova di [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md), creiamo una breve porzione di testo, come "Salve" con un'altezza molto maggiore (ad esempio, un valore di 400), mantenendo il valore dell'attributo max-font-size di 42. Come sarà la pagina risultante? Il testo è centrato verticalmente? Oppure l'altezza del tag [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) si riduce per adattarsi alla dimensione massima del carattere? Prova a rispondere alla domanda prima di provare il codice, in base alle conoscenze che hai già acquisito sul sistema di layout AMP!

Maggiori informazioni su [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) sono disponibili nella [Demo live di AMP by Example](../../../../documentation/examples/documentation/amp-fit-text.html).
