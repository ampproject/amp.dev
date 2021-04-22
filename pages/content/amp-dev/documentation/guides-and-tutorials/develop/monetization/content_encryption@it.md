---
formats:
  - websites
'$title': Protezione dei contenuti degli utenti con la crittografia lato client
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: Tutti i problemi di crittografia dei contenuti possono essere risolti implementando procedure di verifica degli abbonati premium e la decrittografia dei contenuti sul lato client. Con questa soluzione, gli utenti con accesso premium potranno decrittografare i contenuti senza dover caricare una nuova pagina o attendere la risposta di un backend!
author: CrystalOnScript
---

Gli editori che pubblicano contenuti online probabilmente offrono servizi in abbonamento ai propri clienti da cui ricavano profitti. I contenuti premium offerti potrebbero essere protetti dietro un paywall sul client utilizzando degli strumenti di [offuscamento CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='I contenuti premium sono accessibili solo agli utenti autenticati.') }}

Purtroppo, gli utenti più esperti di tecnologia sono spesso in grado di aggirare questi strumenti.

Si potrebbe allora adottare una soluzione che mostra agli utenti un documento completamente privo di contenuti premium! Quindi si potrebbe fornire una pagina completamente nuova solo dopo che il backend ha effettuato la verifica dell'utente. Sebbene più sicuro, questo metodo costa tempo, risorse e non soddisfa gli utenti.

Entrambi questi problemi possono essere risolti implementando procedure di verifica degli abbonati premium e la decrittografia dei contenuti sul lato client. Con questa soluzione, gli utenti con accesso premium potranno decrittografare i contenuti senza dover caricare una nuova pagina o attendere la risposta di un sistema di backend!

# Panoramica della configurazione

Per implementare la decrittografia sul lato client, occorre combinare procedure di crittografia a chiave simmetrica con procedure di crittografia a chiave pubblica, nel modo seguente:

1. Creare una chiave simmetrica casuale per ogni documento, assegnando a ogni documento una chiave _univoca_. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Chiavi univoche per ciascun documento.') }}
2. Crittografare i contenuti premium con la chiave simmetrica del suo documento. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Usare la chiave del documento per crittografare i contenuti premium.') }} La chiave simmetrica permette di usare la stessa chiave per crittografare e decrittografare i contenuti. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='La stessa chiave permette di crittografare e decrittografare i contenuti.') }}
3. Crittografare la chiave del documento con una chiave pubblica, usando un protocollo di [crittografia ibrido](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) per crittografare le chiavi simmetriche. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='Un protocollo di crittografia ibrido permette di crittografare la chiave simmetrica con una chiave pubblica.') }}
4. Usare i componenti [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) e/o [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) per memorizzare la chiave del documento crittografato all\'interno del documento AMP, insieme ai contenuti premium crittografati. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Entrambe la chiavi sono memorizzate all\'interno del documento AMP.') }}

Il documento AMP conserva la chiave crittografata al suo interno. Ciò impedisce il disaccoppiamento del documento crittografato dalla chiave che lo decodifica.

# Come funziona questo processo?

1. AMP è in grado di individuare la chiave nel contenuto criptato dei documenti di destinazione dell'utente. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='Crittografia con chiave pubblica e simmetrica.') }}
2. Durante la pubblicazione dei contenuti premium, AMP invia la chiave simmetrica crittografata dal documento al provider di autorizzazioni nell'ambito della procedura di lettura dei diritti dell'utente. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP invia la chiave simmetrica crittografata dal documento al provider di autorizzazioni nell\'ambito della procedura di lettura dei diritti dell\'utente.') }}
3. Il provider di autorizzazioni decide se l'utente dispone delle credenziali corrette. In caso affermativo, l'autorizzazione prosegue decrittografando la chiave simmetrica del documento con la chiave privata del provider, che dispone della coppia chiave pubblica/privata. Quindi il provider di autorizzazioni restituisce la chiave del documento alla [logica del componente amp-subscriptions](https://github.com/ampproject/amphtml/blob/main/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP si occupa della decrittografia delle chiavi.') }}
4. Quindi AMP si occupa della decrittografia dei contenuti premium con la chiave del documento e li mostra all'utente! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP si occupa della decrittografia dei contenuti premium con la chiave del documento e li mostra all\'utente.') }}

# Passi dell'implementazione

Applicare la seguente procedura per integrare la gestione della procedura di crittografia AMP nel server interno delle credenziali.

## Passo 1: creare una coppia di chiavi pubblica/privata

Per crittografare la chiave simmetrica del documento, è necessario disporre della propria coppia di chiavi pubblica/privata. La crittografia a chiave pubblica è un protocollo di [crittografia ibrido](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), in particolare quello adottato è un sistema di crittografia asimmetrica ECIES a [Curva Ellittica P-256](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) integrato con un sistema di crittografia simmetrica [AES-GCM](https://tools.ietf.org/html/rfc5288) (a 128 bit).

Richiediamo che la gestione della chiave pubblica venga eseguita con [Tink](https://github.com/google/tink) utilizzando [questo tipo di chiave asimmetrica](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Per creare la coppia di chiavi pubblica-privata, utilizzare uno dei seguenti strumenti:

- Classe [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) di Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (strumento di generazione chiavi di Tink)

Entrambi gli strumenti supportano la rotazione delle chiavi. L'utilizzo della rotazione delle chiavi riduce la vulnerabilità del sistema alla violazione delle chiavi private.

Per semplificare la creazione di chiavi asimmetriche, abbiamo creato [questo script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). Esso permette di:

1. Creare una nuova chiave ECIES con AEAD.
2. Memorizzare la chiave pubblica in un file di output in formato testo.
3. Memorizzare la chiave privata in un altro file di output.
4. Crittografare la chiave privata generata utilizzando una chiave ospitata su Google Cloud (GCP) prima di scriverla sul file di output (procedura comunemente denominata [crittografia di tipo envelope](https://cloud.google.com/kms/docs/envelope-encryption)).

Richiediamo che il [Set di chiavi pubbliche Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) dell'utente sia memorizzato/pubblicato in [formato JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Ciò consente ad altri strumenti forniti da AMP di funzionare perfettamente. Il nostro script dà in output la chiave pubblica in questo formato.

## Passo 2: crittografia degli articoli

Occorre poi scegliere se crittografare manualmente o automaticamente i contenuti premium.

### Crittografia manuale

Richiediamo che i contenuti premium siano crittografati con il sistema simmetrico [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) che utilizza lo strumento Tink. La chiave simmetrica del documento utilizzata per crittografare il contenuto premium deve essere univoca per ogni documento. Aggiungere la chiave del documento a un oggetto JSON contenente la chiave in formato testo semplice con codifica base64, insieme agli SKU richiesti per accedere ai contenuti crittografati del documento.

Il seguente oggetto JSON contiene un esempio della chiave in formato testo semplice con codifica base64 e gli SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Crittografare tale oggetto JSON utilizzando la chiave pubblica generata al passo Creazione di una coppia di chiavi pubblica/privata.

Aggiunere il risultato della procedura di crittografia come valore alla chiave `"local"`. Memorizzare la coppia chiave-valore all'interno di un oggetto JSON racchiuso in un tag `<script type="application/json" cryptokeys="">`. Posizionare il tag nell'intestazione del documento.

```
<head>
...
<script type="application/json" cryptokeys="">
{
  "local": ['y0^r$t^ff'], // Questo è per il tuo ambiente
  "google.com": ['g00g|e$t^ff'], // Questo è per l'ambiente Google
}
</script>
…
</head>
```

È necessario crittografare la chiave del documento con l'ambiente locale e [la chiave pubblica di Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). L'inclusione della chiave pubblica di Google consente alla cache AMP Google di pubblicare il documento. Occorre creare un'istanza di un [Set di chiavi Tink](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) per accettare la chiave pubblica di Google dal suo URL:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

La chiave pubblica di Google è un [Set di chiavi Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) in [formato JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). [Qui](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) è disponibile un esempio di utilizzo di questo set di chiavi.

Continua a leggere: [Guarda un esempio di documento AMP crittografato funzionante.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Crittografia automatica

Il documento può essere crittografato utilizzando il nostro [script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). Lo script accetta un documento HTML ed esegue la crittografia di tutti i contenuti all'interno della sezione `<section subscriptions-section="content" encrypted>`. Servendosi delle chiavi pubbliche che si trovano negli URL passati allo script, esso procederà alla crittografia della chiave del documento creata dallo script. L'utilizzo di questo script garantisce che tutto il contenuto sia codificato e formattato correttamente per la pubblicazione. [Qui](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) sono disponibili ulteriori istruzioni sull'utilizzo di questo script.

## Passo 3: integrazione del provider di autorizzazioni

È necessario aggiornare il proprio provider di autorizzazioni per procedere alla decrittografia delle chiavi del documento quando un utente dispone dei diritti richiesti. Il componente amp-subscriptions invia automaticamente la chiave del documento crittografata al sistema di autorizzazione `"local"` tramite un parametro URL ["crypt ="](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70). Esso esegue:

1. L'analisi della chiave del documento dal campo della chiave JSON `"local"`.
2. La decrittografia dei documenti.

Per decrittografare le chiavi del documento occorre usare Tink nel proprio provider di autorizzazioni. Per eseguire la decrittografia con Tink, occorre creare l'istanza di un client [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) utilizzando le chiavi private generate nella sezione Creazione di una coppia di chiavi pubblica/privata. La procedura va applicata all'avvio del server per ottimizzare le prestazioni.

La distribuzione del proprio provider di autorizzazioni/HybridDecrypt deve coincidere all'incirca con le rotazioni delle chiavi previste. Ciò rende tutte le chiavi generate disponibili al client HybridDecrypt.

Tink offre una vasta gamma di [documenti](https://github.com/google/tink/tree/master/docs) ed [esempi](https://github.com/google/tink/tree/master/examples) in C ++, Java, Go e Javascript per facilitare l'implementazione dei sistemi lato server.

### Gestione delle richieste

Quando il provider di autorizzazioni riceve una richiesta:

1. Analizza l'URL di pingback delle credenziali per il parametro "crypt=".
2. Decodifica il valore del parametro "crypt =" con base64. Il valore memorizzato nel parametro URL è l'oggetto JSON crittografato con codifica base64.
3. Quando la chiave crittografata è in forma di byte grezzi, usa la funzione di decrittografia di HybridDecrypt per decrittografare la chiave tramite la relativa chiave privata.
4. Se la decrittografia riesce, analizza il risultato in un oggetto JSON.
5. Verifica l'accesso dell'utente a uno dei diritti elencati nel campo JSON AccessRequirements.
6. Restituisce la chiave del documento prelevata dal campo "Key" dell'oggetto JSON decrittografato nella risposta alla verifica dei diritti. Aggiunge la chiave decrittografata del documento in un nuovo campo denominato "decryptedDocumentKey" nella risposta alla verifica dei diritti. Ciò garantisce l'accesso al framework AMP.

L'esempio seguente mostra un frammento di pseudo-codice che riepiloga i passaggi della procedura descrtta sopra:

```js
string decryptDocumentKey(string encryptedKey, List < string > usersEntitlements,
    HybridDecrypt hybridDecrypter) {
    // 1. Decodifica in Base64 la chiave crittografata di input.
    bytes encryptedKeyBytes = base64.decode(encryptedKey);
    // 2. Tenta di decrittografare la chiave.
    bytes decryptedKeyBytes;
    try {
        decryptedKeyBytes = hybridDecrypter.decrypt(
            encryptedKeyBytes, null /* contextInfo */ );
    } catch (error e) {
        // Errore di decrittografia. Gestirlo come necessario.
        LOG("Errore durante la decrittografia: ", e);
        return "";
    }
    // 3. Analizza il testo decrittografato in un oggetto JSON.
    string decryptedKey = new string(decryptedKeyBytes, UTF_8);
    json::object decryptedParsedJson = JsonParser.parse(decryptedKey);
    // 4. Controlla se l'utente che ha inviato la richiesta dispone dei diritti
    // indicati nella sezione AccessRequirements dell'oggetto JSON.
    for (entitlement in usersEntitlements) {
        if (decryptedParsedJson["AccessRequirements"]
            .contains(entitlement)) {
            // 5. Restituisce la chiave del documento se l'utente ha i diritti.
            return decryptedParsedJson["Key"];
        }
    }
    // Se l'utente non ha le credenziali richieste, restituisce stringa vuota.
    return "";
}

JsonResponse getEntitlements(string requestUri) {
    // Qui esegue la normale gestione dei diritti…
    List < string > usersEntitlements = getUsersEntitlementInfo();

    // Controlla se l'URI della richiesta URI ha il parametero "crypt".
    String documentCrypt = requestUri.getQueryParameters().getFirst("crypt");

    // Se URI ha param."crypt", prova a decrittografarlo.
    string documentKey;
    if (documentCrypt != null) {
        documentKey = decryptDocumentKey(
            documentCrypt,
            usersEntitlements,
            this.hybridDecrypter_);
    }

    // Costruisce risposta JSON.
    JsonResponse response = JsonResponse {
        signedEntitlements: getSignedEntitlements(),
        isReadyToPay: getIsReadyToPay(),
    };
    if (!documentKey.empty()) {
        response.decryptedDocumentKey = documentKey;
    }
    return response;
}
```

# Risorse correlate

Consultare la documentazione e gli esempi disponibili nella [pagina Github Tink](https://github.com/google/tink).

Tutti gli script di supporto si trovano nell'[archivio Github subscriptions-project / encryption](https://github.com/subscriptions-project/encryption).

# Ulteriore supporto

In caso di dubbi, domande o commenti, inviaci una [segnalazione GitHub](https://github.com/subscriptions-project/encryption/issues).
