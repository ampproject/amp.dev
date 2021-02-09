---
'$title': Offerta di contenuti AMP utilizzando scambi firmati
$order: 4
formats:
  - websites
author: CrystalOnScript
---

AMP offre vantaggi in termini di velocità che vanno al di là del formato in uso grazie all'impiego di tecniche come la memorizzazione in cache e il pre-caricamento. Questi vantaggi possono portare alcuni [effetti negativi](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/), come la visualizzazione di URL aggiuntivi incorporati in un [visualizzatore AMP](https://developers.google.com/search/docs/guides/about-amp). L'offerta di contenuti AMP utilizzando scambi firmati permette di utilizzare una nuova funzionalità della piattaforma web per evitare questi problemi.

Uno [scambio firmato](https://developers.google.com/web/updates/2018/11/signed-exchanges) è costituito da un documento AMP valido e dall'URL originale dei contenuti ad esso associato. Queste informazioni sono protette da firme digitali che legano in modo sicuro i documenti al loro URL richiesto. Ciò consente ai browser di visualizzare in modo sicuro l'URL originale nella barra di navigazione al posto del nome della macchina host che ha trasmesso i dati al browser.

I contenuti AMP firmati _si aggiungono a_ (e non sostituiscono) i normali contenuti AMP.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] Questa funzione è attualmente supportata su Chrome, ma la sua mplementazione è prevista su molti altri browser. [/tip]

# Gli scambi firmati funzioneranno per i miei contenuti?

Per implementare gli scambi firmati, occorre soddisfare i seguenti requisiti:

- Capacità di configurare e controllare le intestazioni HTTP generate dal proprio server. (La maggior parte delle soluzioni di hosting basate solo su web, quali Blogger, _non_ sono compatibili con gli scambi firmati).
- La capacità di generare scambi firmati AMP, ad esempio eseguendo [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), come [Go binary](https://golang.org/doc/install) o all'interno di [macchine virtuali Docker](https://docs.docker.com/machine/get-started/).
  - Il packager deve essere aggiornato ogni sei settimane.
- La possibiltà di usare [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) nelle intestazioni `Accept` e `AMP-Cache-Transform` sui server HTTP perimetrali, in grado di restituire contenuti diversi per lo stesso URL.
- Il sistema su cui è in esecuzione `amppackager` deve essere in grado di effettuare richieste di rete in uscita per:
  - L'autorità di certificazione che emette il certificato
  - Il server dell'editore che ospita i documenti AMP da firmare
  - `cdn.ampproject.org` per accedere alla versione attuale di AMP
- Un file system persistente per l'archiviazione condivisa tra tutte le istanze di `amppackager` in esecuzione nello stesso centro dati.

# Implementazione di scambi firmati

Di seguito è riportata la sequenza di implementazione suggerita per supportare gli scambi firmati sui documenti AMP.

## Acquisizione di un certificato TLS supportato

Per produrre scambi firmati, è necessario un certificato TLS con l'estensione `CanSignHttpExchanges`. A partire dall'aprile 2019, [DigiCert](https://www.digicert.com/) è l'unico fornitore di questa estensione (qui [maggiori informazioni](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

Per generare il certificato, l'autorità di certificazione (CA) avrà bisogno di una richiesta di firma del certificato (CSR), che può essere generata da `openssl`. Un esempio di CSR per `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Individuazione di quali URL verranno firmati

Occorre creare uno schema di URL che definisca quali documenti devono essere firmati. È fondamentale che i contenuti privati, come le informazioni personalizzate, non vengano firmati, per evitare di inviare contenuti fuorvianti o errati.

Per garantire le migliori prestazioni, il packager dovrà ricevere in input solo documenti AMP validi. Alcuni documenti AMP non validi possono anche essere accettati se necessario, ma è meglio evitare l'invio di tutto il traffico tramite il packager.

## Distribuzione del packager a un server di gestione temporanea

È necessario innanzitutto configurare gli scambi firmati su un server di gestione temporaea per verificare che la configurazione sia corretta prima di passare alla produzione.

Si consiglia di utilizzare [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) per produrre scambi firmati. Tuttavia, se questo strumento non è adatto al proprio ambiente di produzione, si possono utilizzare i client della riga di comando [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) e [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange) e gestire personalmente la negoziazione dei contenuti e la gestione dei certificati.

Le seguenti istruzioni si applicano alle distribuzioni che utilizzano `amppackager`.

### Configurazione

Il file di configurazione di [`amppackager`](https://github.com/ampproject/amppackager) (`amppkg.toml`) richiede un **FileCert** e un **KeyFile.**

Il **KeyFile** contiene la chiave privata (`ampbyexample-packager.key` nell'esempio precedente) e dovrebbe avere il seguente formato. (Nota: non rendere pubblica la chiave privata e proteggerla da condivisioni involontarie!)

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

Il **FileCert** è il certificato pubblico. Se DigiCert ha fornito il certificato, questo può essere creato concatenando insieme il certificato specifico dell'origine fornito da DigiCert e il file `DigiCertCA.crt`.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Installazione

Seguire le istruzioni riportate [qui per configurare `amppackager` sul proprio sito](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Consultare il file [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (usato da `amp.dev`) che contiene un esempio delle modifiche lato server che dovranno essere applicate per instradare le richieste ad `amppkg`. [/tip]

### Test

Verificare che il proprio sito di gestione temporanea risponda con contenuti di tipo MIME `application/signed-exchange` quando specificato dalla richiesta HTTP. Ad esempio (sostituire `staging.example.com` con il proprio server di gestione temporanea):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

L'output deve includere questa riga:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] L'elemento `v="1..100"` nella richiesta è un segnaposto. Non verificare la corrispondenza a questo valore esatto; invece, come [descritto nelle istruzioni di installazione di amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), controllare solo l'esistenza dell'intestazione `amp-cache-transform` e ignorarne il valore. [/tip]

[tip type="important"] La stringa della versione `v=b3` nella risposta indica la versione di agosto 2019. Essa è destinata a cambiare. [/tip]

La parte principale della risposta dovrebbe contenere la pagina AMP (in testo semplice). C'è una piccola intestazione binaria e, se la pagina è più grande di 16 kb, altri byte binari potranno trovarsi sparsi qua e là.

Lo [strumento `dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) può essere utilizzato per controllare la risposta:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Nota: il commutatore `-verify` non funzionerà a questo punto perché i certificati richiesti non si trovano sul server `https://example.com/`).

Verificare che la risposta includa _sempre_ l'intestazione `Vary` con il valore `Accept,AMP-Cache-Transform` (indipendentemente dal fatto che il tipo MIME sia `text/html`, `application/signed-exchange` o altro):

```sh
$ curl -si https://staging.example.com/ | less
```

L'output deve includere questa riga:

```txt
vary: Accept,AMP-Cache-Transform
```

## Distribuzione del packager alla produzione

### Installazione

Adattare la procedura di distribuzione nella fase di gestione temporanea sopra descritta in base alle esigenze del proprio ambiente di produzione.

### Test

#### Con strumenti da riga di comando

Eseguire gli stessi test sopra descritti. Anche `dump-signedexchange -verify` ora dovrebbe funzionare.

#### Con Chrome

I test possono anche essere eseguiti in Chrome grazie all'[estensione ModHeade](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Installarla da Chrome Webstore e configurare le `Request Headers` per `amp-cache-transform` con un `Value` pari a `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

Dopo aver richiesto `https://example.com/`, il server consegnerà uno scambio firmato, ma il documento dovrebbe apparire e comportarsi come prima. Tramite la [console DevTools](https://developers.google.com/web/tools/chrome-devtools/) si dovrà verificare che uno scambio firmato sia restituito correttamente.

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

Nella scheda `Network`, fare clic sul nome del proprio dominio e verificare che il valore `Signed HTTP exchange` sia visualizzato in `Preview`.

#### Con la cache AMP Google

Verificare che gli scambi firmati siano compatibili con la cache AMP Google. Ciò garantisce la loro individuabilità sui motori di ricerca come Google Search.

Per testare gli scambi firmati nella cache AMP Google, aprire la scheda di rete in DevTools, abilitare l'opzione `Preserve log` e visitare un URL come `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

Se la richiesta ha avuto successo, DevTools mostrerà un `200` con una riga `signed-exchange` e una riga `from signed-exchange`.

In caso di esito negativo, le righe dello scambio firmato mancheranno o saranno evidenziate in rosso. Potrebbe essere presente anche un'intestazione `warning` che fornisce informazioni aggiuntive.

## Scambi firmati in Google Search

Se la distribuzione delle pagine AMP con scambi firmati è avvenuta correttamente, i risultati della loro ricerca mostreranno il simbolo del fulmine AMP, come prima, ma toccando i risultati nella barra degli URL verrà visualizzato l'indirizzo `https://example.com`, invece di un URL che inizia con `https://www.google.com/amp/….`. Inoltre, la barra del `viewer` non comparirà.

Nella scheda `network` della console DevTools, sarà possibile vedere l'indicazione `signed-exchange` sotto la colonna `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Fornitori di servizi per scambi firmati

Segue un elenco di CDN e fornitori di servizi di hosting che già supportano scambi firmati. Il loro utilizzo è il modo più semplice per iniziare con gli scambi firmati:

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) è uno strumento che permette di migliorare gli URL AMP, fornendo contenuti AMP tramite Scambi firmati. Ulteriori informazioni sono disponibili sul [Blog AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [URL reali di Cloudflare AMP](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) è una delle reti più grandi al mondo. Oggi, aziende, organizzazioni non-profit, blogger e chiunque abbia una presenza su Internet può contare su siti web e app più veloci e sicuri grazie a Cloudflare.
