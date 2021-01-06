---
"$title": Integrazione delle tecnologie per annunci in AMP
order: '3'
formats:
- ads
teaser:
  text: Se sei un fornitore di tecnologie per annunci che intende integrare i propri contenuti in AMP HTML, consulta le seguenti linee guida.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Se sei un fornitore di tecnologie per annunci che intende integrare i propri contenuti in AMP HTML, consulta le seguenti linee guida. Per garantire la necessaria qualità e ridurre al minimo i ritardi, è possibile applicare le istruzioni riportate [qui](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads) prima di inviare richieste pull al progetto open-source AMP. Le linee guida generali per iniziare a contribuire al progetto AMP sono disponibili alla pagina [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md).

## Server di annunci <a name="ad-server"></a>

*Esempi : DFP, A9*

Gli editori da te supportati includono librerie JavaScript da te fornite In qualità di server di annunci e alcuni "frammenti di annunci", che si basano sulla libreria JavaScript per recuperare gli annunci e riprodurli sul sito web dell'editore.

Poiché AMP non consente agli editori di eseguire codici JavaScript arbitrari, dovrai contribuire al codice open source AMP per consentire al tag `amp-ad` di richiedere annunci al tuo server.

Ad esempio: il server Amazon A9 può essere richiamato con la seguente sintassi:

[sourcecode:html]
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
[/sourcecode]

Gli attributi che seguono `type` dipendono dai parametri che il server A9 di Amazon si aspetta per fornire gli annunci. Il file [a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) mostra la traduzione dei parametri richiesti per realizzare il codice JavaScript che invoca il server A9 tramite l'URL `https://c.amazon-adsystem.com/aax2/assoc.js`. I parametri corrispondenti passati dal tag annunci AMP sono aggiunti in coda all'URL per la restituzione dell'annuncio.

Per ulteriori informazioni sull'integrazione della rete di annunci con AMP, è possibile consultare la pagina [Integrazione di reti di annunci in AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Piattaforma lato venditore (Supply Side Platform - SSP) o Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

*Esempi : Rubicon, Criteo oppure Appnexus, Ad-Exchange*

Se offri una piattaforma lato vendita che deve essere richiamata direttamente dalla pagina web di un editore, dovrai seguire le stesse indicazioni sopra elencate per l'integrazione con un server di annunci. L'aggiunta del proprio valore di `type` al tag amp-ad consente di distribuire il tag direttamente all'editore, in modo che i tag possano essere inseriti direttamente nelle loro pagine AMP.

Più comunemente, gli SSP collaborano con l'editore per gestire il traffico dei tag di annunci dell'SSP nel proprio server di annunci. In questo caso, assicurati che tutte le risorse caricate dallo script nel contenuto creativo del server di annunci siano realizzati tramite HTTPS. Esistono alcune restrizioni su alcuni formati di annunci come quelli espandibili, quindi ti consigliamo di testare i formati creativi utilizzati più comunemente con i tuoi editori.

## Agenzie di annunci <a name="ad-agency"></a>

*Esempi : Essence, Omnicom*

Collabora con il tuo editore per assicurarti che i contenuti creativi sviluppati siano conformi all'AMP. Poiché tutti i contenuti creativi sono forniti in iframe la cui dimensione è determinata al richiamo dell'annuncio, occorre verificare che i contenuti creativi non tentino di modificare la dimensione dell'iframe.

Verifica che tutte le risorse che fanno parte dei contenuti creativi siano richieste tramite HTTPS. Alcuni formati di annunci al momento non sono completamente supportati e si consiglia di testare i contenuti creativi in un ambiente AMP. Alcuni esempi sono: annunci multimediali elaborati espandibili, annunci intermedi, annunci a livello di pagina.

## Lettori Video <a name="video-player"></a>

*Esempi : Brightcove, Ooyala*

Un lettore video che funziona nelle pagine HTML normali non funziona in AMP, per cui dovrà essere creato un apposito tag che permetta al sistema AMP di caricare il lettore. Brightcove ha creato un tag personalizzato [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md) che permette la riproduzione di contenuti multimediali ed annunci in pagine AMP.

Un lettore Brightcove può essere richiamato con il seguente codice:

[sourcecode:html]
<amp-brightcove
  data-account="1290862519001"
  data-video-id="ref:amp-docs-sample"
  data-player="S1Tt8cgaM"
  layout="responsive"
  width="480"
  height="270"
>
</amp-brightcove>
[/sourcecode]

Per istruzioni su come sviluppare un tag amp come quello di Brightcove, consultare [questa richiesta pull](https://github.com/ampproject/amphtml/pull/1052).

## Reti di annunci video <a name="video-ad-network"></a>

*Esempi : Tremor, Brightroll*

Se sei un fornitore di reti di annunci video, collabora con il tuo editore e verifica le seguenti condizioni:

- Tutte le risorse video sono fornite tramite HTTPS
- Il lettore video dell'editore supporta contenuti AMP

## Piattaforma di gestione dati (Data Management Platform - DMP) <a name="data-management-platform-dmp"></a>

*Esempi : KRUX, Bluekai*

Consulta la sezione [come ottimizzare la configurazione di annunci personalizzati](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

Puoi utilizzare un approccio simile per arricchire la chiamata, ad esempio per passare alla chiamata dell'annuncio informazioni sui segmenti di pubblico ricevute dai cookie dell'utente.

## Fornitori di visibilità <a name="viewability-provider"></a>

*Esempi : MOAT, Integral Ad Science*

I contenuti dei fornitori di visibilità si integrano in genere con quelli degli editori tramite i wrapper creativi del server di annunci. In tal caso, assicurarsi che il wrapper creativo carichi tutte le risorse tramite HTTPS.

Ad esempio per MOAT, verificare che `http://js.moatads.com` sia cambiato in `https://z.moatads.com`

Inoltre, consultare anche le informazioni sull'approccio di utilizzo dell'[observer pattern di Intersection](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability) .

## Piattaforma di suggerimento di contenuti <a name="content-recommendation-platform"></a>

*Esempi : Taboola, Outbrain*

Utile se ci sono pezzi di JavaScript incorporati nel sito web dell'editore, il cui approccio non funzionerà nelle pagine AMP. Se desideri consigliare i contenuti su una pagina AMP, ti suggeriamo di utilizzare l'[estensione `amp-embed`](https://amp.dev/documentation/components/amp-ad) per richiedere i dettagli del contenuto. Consultare l'esempio di [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md) .
