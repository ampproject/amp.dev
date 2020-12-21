---
"$title": Formato URL della cache AMP e gestione delle richieste
"$order": '9'
toc: 'false'
formats:
- websites
- stories
- ads
author: Gregable
contributors:
- sebastianbenz
---

In questo documento imparerai a conoscere il formato URL della cache AMP e come essa gestisce le richieste.

## Formato URL

Se possibile, la cache AMP di Google creerà un sottodominio per il dominio di ciascun documento AMP convertendolo prima da [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) in UTF-8. Le cache sostituiscono ogni `-` (trattino) con `--` (2 trattini) e ogni `.` (punto) con `-` (trattino). Ad esempio, `pub.com` sarà tradotto in `pub-com.cdn.ampproject.org`.

Si può utilizzare questo calcolatore di URL per convertire un URL in una versione per la cache AMP:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Utilizzare il modulo [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) per tradurre un URL dall'origine nel formato URL Cache AMP. [/tip]

Questo documento descrive:

- La struttura dell'URL su una cache AMP.
- Come appariranno gli  URL su una cache AMP.
- Come riconvertire l'intestazione di un'origine AMP Cache per determinare il suo dominio di editore.

## Protocollo Nome Dominio

Tutti i documenti utilizzano il protocollo https nelle cache AMP.

## Suffisso Nome Dominio

Tutte le cache AMP sono registrate in un file JSON, disponibile online nell'[archivio AMPHTML](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). Un esempio di cache record in questo file sarà simile al seguente:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Una cache AMP fornisce i record nel dominio specificato da `cacheDomain`. In questo caso, il dominio è `cdn.ampproject.org`.

Questo documento utilizza URL con `cdn.ampproject.org` come esempi, ma le altre cache in genere utilizzano una struttura URL simile.

## Prefisso Nome Dominio

Una cache AMP fornisce i documenti su un URL modificato, come `example-com.cdn.ampproject.org`. Il primo componente con punto del nome di dominio originale, nell'esempio `example.com`, diventa `example-com`. Questo documento definisce tale stringa senza punto, `example-com`, come "prefisso di dominio". Di seguito è presentato l'algoritmo che esegue questa trasformazione.

In questo prefisso non è possibile usare più componenti con punto, come `example.com.cdn.ampproject.org`, a causa del vincolo sui certificati https (TLS), previsto dallo standard [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

I domini degli editori possono avere una lunghezza massima di 255 caratteri, mentre ogni prefisso di dominio è limitato a 63 caratteri, come richiesto dallo standard [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) che prevede:

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

Tutti i domini degli editori vengono mappati a un prefisso di dominio univoco. L'algoritmo che se ne occupa tenta di produrre un mapping leggibile all'uomo. Tuttavia, il mapping è riconvertito tramite un algoritmo di hashing sicuro per i domini degli editori se essi sono troppo lunghi e nei casi descritti di seguito:

### Algoritmo di base

L'algoritmo di base per convertire un dominio di editore in un prefisso di dominio è il seguente:

1. Effettuare la decodifica Punycode del dominio dell'editore. Consultare [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Sostituire ogni carattere "`-`" (trattino) nel risultato prodotto dal passo 1 con "`--`" (due trattini).
3. Sostituire ogni carattere "`.`" (punto) nel risultato prodotto dal passo 2 con "`-`" (trattino).
4. Se il risultato del passo 3 presenta un "`-`" (trattino) in entrambe le posizioni 3 e 4, aggiungere al risultato del passo 3 un prefisso "`0-`" e un suffisso "`-0` ". Consultare [# 26205](https://github.com/ampproject/amphtml/issues/26205) per altre informazioni.
5. Effettuare la codifica Punycode del risultato del passo 3. Consultare [RFC 3492](https://tools.ietf.org/html/rfc3492)

Alcuni esempi dell'algoritmo base:

<table>
  <tr>
   <td>
<strong>Dominio editore</strong>
   </td>
   <td>
<strong>Prefisso di dominio</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Dopo aver eseguito l'algoritmo base, se e solo se il prefisso di dominio non è un'etichetta DNS valida, eseguiremo l'algoritmo di fallback descritto di seguito.

Un prefisso di dominio non è un'etichetta DNS valida se è più lungo di 63 caratteri

### Algoritmo di fallback

L'algoritmo di fallback per convertire il dominio di un editore in un prefisso di dominio è il seguente:

1. Effettuare l'hashing del dominio dell'editore utilizzando l'algoritmo SHA256.
2. Effettuare l'escape base32 del risultato del passo 1.
3. Rimuovere gli ultimi 4 caratteri dal risultato del passo 2, che sono tutti caratteri `=` (uguale).

L'algoritmo di fallback produrrà una stringa di 52 caratteri come la seguente senza `-` (trattino): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Algoritmo combinato

L'algoritmo combinato prevede la seguente procedura:

1. Eseguire l'algoritmo di base. Se l'output è un'etichetta DNS valida, aggiungere il suffisso di dominio della cache e terminare, ad esempio `example-com.cdn.ampproject.org`. Altrimenti proseguire al passo 2.
2. Eseguire l'algoritmo di fallback. Aggiungere il suffisso di dominio della cache e terminare, ad esempio: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## Percorso URL

Il "percorso" di un URL nella cache AMP è sempre composto da una o più directory di prefisso, quali `/c`, seguite da un infisso `/s` solo se l'URL dell'editore è http `s`, seguito ancora dall'URL del documento dell'editore senza il protocollo.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Immagine che mostra i formati URL memorizzati in cache') }}

Le directory di prefisso, come `/c`, corrispondono ai diversi tipi di servizio che una cache AMP può fornire. Diverse cache AMP possono supportare diversi tipi di servizi e il seguente non è un elenco completo:

- `/c` - <strong>C</strong>ontenuto: questo è un documento AMP fornito come pagina autonoma cui è possibile collegarsi direttamente in alcune interfacce.
- `/v` - <strong>V</strong>isualizzatore: anche questo è un documento AMP, ma viene fornito in un [visualizzatore AMP](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer), che è un riquadro per la visualizzazione di documenti AMP nel contesto di una Pagina Risultati di Ricerca o altre interfacce.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage: questo è un documento AMP fornito come [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), una tecnologia Pacchetto web. Questi URL permettono di reindirizzare alla pagina di origine dell'editore.
- `/cert` - <strong>Cert</strong>ificato: questo è un certificato pubblico da utilizzare con un oggetto [signed exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
- `/i` - <strong>I</strong>mmagine: questa è un'immagine fornita dalla cache AMP, in genere come sottorisorsa del documento.
- `/ii` - <strong>I</strong>mmagine: anche questa è un'immagine fornita dalla cache AMP, ma in genere può essere combinata con altri parametri di configurazione della cache, quali `/ii/w800`, che indica una larghezza massima richiesta dal documento. La cache può produrre immagini con diverse dimensioni per risparmiare larghezza di banda per il browser.

Inoltre, le cache AMP possono scegliere di aggiungere parametri di query speciali in coda all'URL del documento che non fanno parte della query del documento dell'editore. Ad esempio, [`<amp-live-list>`](../../../components/reference/amp-live-list.md) effettua richieste di aggiornamento recuperando un documento con il parametro `amp_latest_update_time<`. Questi parametri non vengono passati all'origine durante la ricerca del documento, ma sono presenti solo per configurare la richiesta alla cache AMP.

## Origini CORS

Molti editori utilizzano le richieste CORS dal loro documento AMP per recuperare dati aggiuntivi. Le richieste CORS funzionano inviando un'intestazione HTTP `Origin:` nella richiesta che specifica l'origine del documento che la effettua. Come visto in precedenza, l'origine del documento è diversa su una cache AMP rispetto al documento originale. Nelle precedenti sezioni sui nomi di dominio, abbiamo presentato l'algoritmo per determinare l'origine di un URL della cache AMP dato l'URL dell'editore. Di seguito riportiamo l'algoritmo inverso per riconvertire l'intestazione di una richiesta CORS `Origin:` al dominio dell'editore originale.

### Dall'origine della cache AMP al dominio dell'editore

Il valore dell'intestazione Origin di una cache AMP sarà simile a uno dei seguenti esempi:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

Innanzitutto, rimuovere il prefisso del protocollo (`https://` ) e il suffisso del dominio della cache AMP, ad esempio `.cdn.ampproject.org`. Il suffisso può provenire da una qualsiasi delle cache elencate in [caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). La stringa rimanente sarà il "prefisso di dominio". Nel caso dei due esempi precedenti, il "prefisso di dominio" è:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Poi, occorre controllare se il "prefisso di dominio" contiene almeno un '`-`' (trattino). La presenza di uno o più trattini è di gran lunga il caso più comune. Se il "prefisso di dominio" non contiene almeno un '`-`' (trattino), l'origine della cache AMP non può essere riconvertita direttamente. Se invece è noto l'insieme dei possibili domini degli editori, è possibile creare l'insieme delle origini della cache AMP, utilizzando l'algoritmo del nome dominio presentato in questo documento. È quindi possibile effettuare una convalida rispetto all'insieme fissato.

Il resto dell'algoritmo assume che il "prefisso di dominio" contenga almeno un '`-`' (trattino).

1. Se il prefisso di dominio inizia con `xn--`, effettuare la decodifica punycode del "prefisso di dominio". Ad esempio `xn---com-p33b41770a` diventa `⚡😊-com`. Consultare lo standard [RFC 3492](https://tools.ietf.org/html/rfc3492) per i dettagli sulla codifica punycode.
2. Se il prefisso di dominio inizia con "`0-`" e termina con "`-0`", rimuovere sia il prefisso "`0-`" che il suffisso "-0".
3. Scorrere in ordine i caratteri del risultato del passo 2, inserendoli nel nuovo risultato come si trovano. Quando si incontra un "`-`" (trattino), dare un'occhiata al carattere successivo. Se anche il carattere successivo è un "`-`" (trattino), saltare entrambi i caratteri dall'input e inserire un singolo "`-`" (trattino). Se il carattere seguente è un qualsiasi altro carattere, saltare solo il singolo "`-`" (trattino) attualmente scandito e dare in output un " `.` " (punto). Ad esempio, `a--b-example-com` diventa `ab.example.com`.
4. Effettuare la codifica Punycode del risultato del passo 3. Consultare lo standard [RFC 3492](https://tools.ietf.org/html/rfc3492) per la codifica punycode.

Il risultato del passo 4 sarà il dominio dell'editore. Il protocollo non è disponibile dal dominio stesso, ma può essere solo `http` o `https`. La porta è sempre quella predefinita per il protocollo.

## Reindirizzamento e gestione degli errori

Di seguito sono riportati alcuni esempi di come la cache AMP gestisce i reindirizzamenti e gli errori:

**Reindirizzamenti**

La cache AMP segue i reindirizzamenti durante la risoluzione degli URL AMP. Ad esempio, se un URL reindirizza a un altro URL AMP:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Quindi la cache AMP restituirà il contenuto del reindirizzamento risolto per l'URL originale.

Esempio: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Importante: spostando la posizione dei file AMP sul proprio server, assicurarsi di definire un reindirizzamento dalla vecchia alla nuova posizione.

**Non trovato**

Quando una pagina non si trova nella cache AMP, il sistema mostrerà una pagina di errore e restituirà uno stato 404.

Esempio: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**Pagine AMP non valide**

Quando una pagina AMP non è valida, la cache AMP reindirizzerà alla pagina canonica.

Esempio: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Errori del server**

Se un URL restituisce un errore server di tipo 5XX, la cache AMP restituirà uno stato 404.

Esempio: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
