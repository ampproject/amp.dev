---
'$title': Integrazione di AMP nelle app
$order: 2
description: "Questa guida si rivolge agli sviluppatori di app mobili e per web, che desiderano fare uso e fornire collegamenti a pagine AMP. Ad esempio, consideriamo un'app di chat per dispositivi mobili ..."
formats:
  - websites
---

Questa guida si rivolge agli sviluppatori di app mobili e per web, che desiderano fare uso e fornire collegamenti a pagine AMP. Ad esempio, consideriamo un'app di chat per dispositivi mobili che carica la versione AMP di un URL condiviso per garantire agli utenti un'esperienza d'uso più veloce.

## Conversione dei collegamenti in formato AMP

Con AMP è possibile eseguire il rendering quasi istantaneo di siti web esterni all'interno di app web native o per dispositivi mobili. Puoi farlo abbinando gli URL dei tuoi contenuti agli URL AMP corrispondenti (se ne esistono) e aprendo la versione AMP invece di quella originale. A questo scopo, puoi utilizzare strumenti come [l'API URL AMP di Google](https://developers.google.com/amp/cache/use-amp-url).

Ad esempio, il seguente messaggio può essere trasformato per consentire la gestione di versioni AMP sostituendo tutti gli URL con le rispettive versioni AMP (se esistenti). Per ridurre i tempi di caricamento e garantire che l'AMP generato sia valido, è necessario collegarsi alle pagine AMP memorizzate nella cache AMP.

Messaggio originale:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Messaggio trasformato:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **SUGGERIMENTO:** valuta la possibilità di fornire agli utenti l'opzione di visualizzare la versione non AMP al posto di quella AMP tramite le impostazioni delle preferenze nella tua app. [/tip]

### Modi per trasformare i collegamenti

Esistono tre modi per trasformare sistematicamente i collegamenti:

1. **Al momento della scrittura lato server (consigliato)**: questo metodo recupera l'URL tramite l'API URL AMP di Google al momento della scrittura di un URL e archivia gli URL AMP sul lato server. Quindi passa entrambi gli URL al client perché l'URL originale potrebbe essere necessario per la condivisione. Questo è l'approccio consigliato perché ci sono meno richieste di rete sul lato client. Quando si adotta questo approccio, è importante sottoporre a scansione periodica (ad esempio, tutti i giorni) i collegamenti per le versioni AMP poiché sempre più siti web adottano il formato AMP.
2. **Al momento della lettura lato server (usato da alcuni)**: questo metodo recupera l'URL AMP tramite l'API URL AMP di Google prima di passare il contenuto al client. Come accennato in precedenza, occorre passare entrambi gli URL (AMP e non AMP) al client perché l'URL originale potrebbe essere necessario per la condivisione. Questo metodo può essere utile per i servizi a basso fan out.
3. **Lato client (se il lato server non è possibile)**: questo metodo recupera l'URL AMP tramite API URL AMP di Google dal client. Utilizzare questo approccio se la trasformazione dell'URL sul lato server non è possibile (ad esempio, per app di messaggistica che utilizzano la crittografia end-to-end). Assicurarsi di attivare la trasformazione dell'URL non appena il contenuto è disponibile, prima che abbia luogo qualsiasi interazione con l'utente.

[tip type="important"] **IMPORTANTE:** non richiedere mai gli URL AMP tramite API AMP di Google dopo le interazioni con l'utente, perché ciò peggiora le prestazioni dell'app in quanto introduce una richiesta di rete aggiuntiva. Utilizzare invece uno dei tre approcci sopra descritti. [/tip]

#### API AMP URL di Google

Google fornisce l'API URL AMP per recuperare gli URL HTML AMP corrispondenti a un dato elenco di URL ([documentazione ufficiale](https://developers.google.com/amp/cache/use-amp-url) / [demo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html). Gli URL non devono essere necessariamente le versioni canoniche. Se esiste una versione AMP, la risposta include l'URL AMP originale e l'URL della pagina AMP memorizzata sulla cache AMP Google.

Ad esempio, per un dato elenco di URL:

```json
{
  "urls": [
    "https://www.example.org/article-with-amp-version",
    "http://www.example.com/no-amp-version.html"
  ]
}
```

Il corpo della risposta contiene la mappatura degli URL AMP in formato JSON:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL non trovato.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] **NOTA:** gli URL per le pagine AMP memorizzate in cache AMP non Google non possono essere recuperati tramite l'API URL AMP. Tuttavia, è possibile ricavare facilmente l'URL memorizzato nella cache dall'URL AMP restituito (ampURL). [/tip]

## Uso di cache AMP

Una [cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) è una rete per la distribuzione di contenuti (CDN) basata su proxy per la fornitura di documenti AMP validi. Le cache AMP sono progettate per:

- Fornire solo pagine AMP valide.
- Consentire il pre-caricamento di pagine AMP in modo efficiente e sicuro.
- Eseguire ulteriori ottimizzazioni sulle prestazioni dei contenuti a beneficio dell'utente.

Attualmente, ci sono due fornitori di cache AMP:

- [Cache AMP Google](https://developers.google.com/amp/cache/)
- [Cache AMP Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Ci sono due opzioni per visualizzare un file AMP in un'app, utilizzando:

1. la versione ospitata dall'editore
2. la versione ospitata in una cache AMP

Si consiglia l'uso della cache AMP per i seguenti motivi:

- Migliore esperienza utente grazie a tempi di caricamento più rapidi e bassa latenza (tempo di caricamento più veloce di oltre 1 secondo).
- Vantaggi sulle prestazioni ottenute e sui consumi di banda dovuti alla memorizzazione nella cache aggiuntiva di oggetti dipendenti dal client, ad esempio memorizzazione nella cache di versioni diverse della stessa immagine, a seconda della dimensione del riquadro di visualizzazione del client.
- Il file AMP originale potrebbe non essere più valido, il che potrebbe comportare problemi nell'esperienza utente. In questo caso, la cache AMP fornisce l'ultima versione valida del file AMP.
- Gli editori meno accurati potrebbero fornire due diversi documenti a un crawler della cache AMP e ai tuoi utenti. L'uso di una cache AMP garantisce che gli utenti vedano sempre lo stesso file AMP della cache.

[tip type="important"] **IMPORTANTE:** quando fornisci pagine AMP tramite Cache AMP, stai offrendo un'esperienza di visualizzazione che mostra chiaramente l'origine AMP con l'opzione per gli utenti di condividere l'URL canonico (consulta anche le due sezioni seguenti per maggiori informazioni su questo aspetto). [/tip]

## Implementazione di un visualizzatore AMP

Il sistema di runtime AMP fornisce un'API per visualizzatori, che comprende un protocollo per lo scambio di messaggi tra il sistema di runtime AMP e il visualizzatore. Ciò consente di controllare il pre-rendering dei documenti AMP, lo scorrimento tra gli articoli e gli strumenti del sistema Runtime AMP. Per saperne di più sull'API per visualizzatori AMP, consulta la guida [Collegamento di visualizzatori AMP alle pagine AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md). Le implementazioni del visualizzatore per [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) e [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) sono disponibili su [GitHub](https://github.com/ampproject/amp-viewer). Un visualizzatore Android non è ancora disponibile, ma puoi consultare [questa risposta](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) su Stack Overflow per configurare al meglio un WebView per la visualizzazione di pagine AMP.

Ecco alcune procedure generali consigliate per l'implementazione di un visualizzatore AMP:

- Fornire le pagine AMP da una cache AMP (tempi di caricamento più veloci di oltre 1 secondo).
- Visualizzare le info di origine dell'editore dell'articolo (ad esempio, in un'intestazione comprimibile).
- Fornire un'azione di condivisione (consultare anche la successiva sezione "[Condivisione di contenuti AMP](#sharing-amp-content)").
- Nei visualizzatori basati su webView, abilitare i cookie di terzi.
- Definire un referente per la propria piattaforma/app.

### Condivisione di contenuti AMP <a name="sharing-amp-content"></a>

Quando si condivide un documento AMP dall'interno del visualizzatore AMP di una piattaforma, la piattaforma dovrebbe condividere l'URL canonico quando tecnicamente possibile. Ad esempio, se la piattaforma fornisce un pulsante di condivisione, questo pulsante dovrebbe condividere l'URL canonico.

La filosofia del Progetto AMP è quella di lasciare alle piattaforme la scelta della versione dei documenti da presentare all'utente. Per questo motivo, ha più senso condividere la versione canonica (anziché la versione AMP) quando si condivide su una piattaforma diversa, per poi lasciare alla piattaforma di destinazione la scelta giusta.
