---
layout: page
title: Il metodo di AMP per ottimizzare le prestazioni
order: 2
locale: it
---

Grazie alla combinazione tra seguenti ottimizzazioni, le pagine AMP sono così veloci da sembrare di essere caricate in pochi istanti:

{% include toc.html %}

Se preferisci ascoltare anziché leggere, il seguente video realizzato da Malte Ubl, AMP engineering lead, offre una panoramica simile al contenuto delle seguenti sezioni.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Consentire solo gli script asincroni

JavaScript è potente,
può modificare praticamente qualsiasi aspetto della pagina,
ma può anche bloccare la costruzione DOM e ritardare il rendering della pagina
(vedi anche [Aggiunta di interattività con JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
Per impedire che JavaScript ritardi il rendering della pagina,
AMP consente solo JavaScript asincrono. 

Le pagine AMP non possono includere JavaScript scritto dall’autore.
Anziché utilizzare JavaScript,
le funzioni interattive della pagina vengono gestite in elementi AMP personalizzati.
Gli elementi AMP personalizzati possono contenere JavaScript che funzionano dietro le quinte
e sono attentamente progettati per garantire che non provochino cali delle performance.

Benché il codice JavaScript di terzi sia consentito in iframe,
non può bloccare il rendering.
Ad esempio, se il codice JavaScript di terzi utilizza l’
[API `document.write` pessima amica delle prestazioni](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/),
non blocca il rendering della pagina principale.

## Definire le dimensioni di tutte le risorse in modo statico

Le risorse esterne come le immagini, gli annunci o iframe devono dichiarare le proprie dimensioni nell’HTML
affinché AMP possa determinare le dimensioni e la posizione di ciascun elemento prima che le risorse vengano scaricate.
AMP carica il layout della pagina senza attendere il download di alcuna risorsa.

AMP separa il layout del documento da quello delle risorse.
Per il layout dell’intero documento ([e dei font](#font-triggering-must-be-efficient)) è necessaria solamente una richiesta HTTP
.
Dal momento che AMP è ottimizzato per evitare dispendiosi ricalcoli di stile e layout nel browser,
non è necessario rielaborare i layout al caricamento delle risorse.

## Non consentire ai meccanismi delle estensioni di bloccare il rendering

AMP non consente ai meccanismi delle estensioni di bloccare il rendering della pagina.
AMP supporta le estensioni per componenti come 
[lightbox](/docs/reference/extended/amp-lightbox.html),
[incorporamenti instagram](/docs/reference/extended/amp-instagram.html),
[tweet](/docs/reference/extended/amp-twitter.html) e così via.
Benché questi avanzino ulteriori richieste HTTP,
tali richieste non bloccano il layout e il rendering della pagina. 

Tutte le pagine che utilizzano uno script personalizzato devono indicare al sistema AMP
che prima o poi avrà un tag personalizzato.
Ad esempio, lo script [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
indica al sistema che ci sarà un tag `amp-iframe`.
AMP crea la casella dell’iframe prima ancora di sapere cosa conterrà: 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Tenere lontano dalla fase critica qualsiasi codice JavaScript di terzi

Al codice JavaScript di terzi piace usare il caricamento JS sincrono.
Ama anche usare `document.write` per creare più script sincroni.
Ad esempio, se hai cinque annunci e ognuno di essi esegue tre caricamenti sincroni
con una latenza di connessione di 1 secondo,
ti ritrovi con 18 secondi di tempo di caricamento solo per il caricamento JS. 

Le pagine AMP consentono codice JavaScript di terzi ma solo in iframe in modalità sandbox.
Circoscrivendo questo codice agli iframe gli viene impedito di bloccare l’esecuzione della pagina principale.
Anche se attiva più ricalcoli di stile,
i rispettivi piccoli iframe hanno DOM molto limitati. 

I ricalcoli di stile e i layout sono tipici delle dimensioni DOM,
pertanto i ricalcoli degli iframe sono molto veloci rispetto
alle operazioni di ricalcolo degli stili e dei layout per la pagina.

## Tutto il codice CSS deve essere in linea e di dimensioni limitate

Il codice CSS blocca tutto il rendering, interrompe il caricamento delle pagine e tende a gonfiarsi.
Nelle pagine HTML AMP sono consentiti solo gli stili incorporati.
Questo elimina una o spesso più richieste HTTP dalla fase di rendering critica
rispetto a quanto accade nella maggior parte delle pagine web.

Inoltre, il foglio di stile incorporato ha una dimensione massima di 50 kilobyte.
Sebbene queste dimensioni siano sufficienti per pagine più complesse,
impone comunque all’autore della pagina di adottare una buona dose di moderazione nell’uso del codice CSS.

## L’attivazione dei font deve essere efficiente

I font web sono particolarmente grandi, per cui
l’[ottimizzazione dei font web](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
è fondamentale per le performance.
In una pagina tipica dotata di alcuni script sincroni e di alcuni fogli di stile esterni,
il browser attende il completamento di tali operazioni per iniziare il download dei font di grandi dimensioni.

Il sistema AMP dichiara zero richieste HTTP fino a quando non inizia il download dei font.
Questo è possibile solamente perché tutto il codice JS in AMP ha l’attributo asincrono
e perché sono consentiti solo i fogli di stile incorporati,
non ci sono richieste HTTP che impediscono al browser di scaricare i font.

## Ridurre al minimo i ricalcoli di stile

Ogni volta che misuri qualcosa si attivano dispendiosi ricalcoli di stile
in quanto il browser deve elaborare il layout dell’intera pagina.
Nelle pagine AMP, tutte le operazioni di lettura DOM vengono eseguite prima di tutte quelle di scrittura.
In questo modo si garantisce un massimo di un ricalcolo di stili per frame.

Per ulteriori informazioni sull’impatto dei ricalcoli di stile e layout consulta la sezione sulle
[performance del rendering](https://developers.google.com/web/fundamentals/performance/rendering/).

## Eseguire solamente animazioni con accelerazione GPU

L’unico modo per avere ottimizzazioni veloci è quello di eseguirle sulla GPU.
La GPU è cosciente dei livelli, sa come eseguire alcune operazioni su questi livelli,
è in grado di spostarli o applicare una dissolvenza su di essi ma non può aggiornare il layout della pagina,
passa perciò il compito al browser e questa non è una buona idea.

Le regole per il codice CSS correlato alle animazioni garantiscono che queste possano usufruire dell’accelerazione GPU.
In particolare, AMP consente solamente l’animazione e la transizione su trasformazione e opacità
per cui il layout della pagina non è necessario.
Consulta ulteriori informazioni sull’
[utilizzo delle variazioni di trasformazione e opacità per le animazioni](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count).

## Dare priorità al caricamento delle risorse

AMP controlla tutti i download delle risorse: assegna la priorità al caricamento delle risorse,
caricando solo ciò che è necessario, ed esegue la prelettura delle risorse di tipo lazy-load. 

Quando AMP scarica le risorse, ottimizza i download
in modo tale che vengano scaricate prima le risorse attualmente più importanti.
Le immagini e gli annunci vengono scaricati solo se ci sono probabilità che vengano visualizzati dall’utente,
nella parte visibile della pagina (above the fold), o se ci sono probabilità che l’utente scorra rapidamente su di esse.  

AMP esegue anche la prelettura delle risorse di tipo lazy-load, ovvero quelle che non vengono caricate finché non richieste.
Le risorse vengono caricate con il maggior ritardo possibile, ma la loro prelettura viene eseguita il prima possibile.
In tal modo i componenti vengono caricati molto rapidamente ma la CPU viene utilizzata unicamente
quando le risorse vengono effettivamente mostrate agli utenti.

## Caricare le pagine in un attimo

La nuova [API preconnect](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
viene utilizzata intensamente per garantire che le richieste HTTP vengano completate il più rapidamente possibile.
Grazie a questo,
il rendering della pagina può essere eseguito prima che l’utente dichiari in modo esplicito che vorrebbe navigare verso di essa e
la pagina potrebbe essere già disponibile nel momento in cui l’utente la seleziona effettivamente,
con conseguente caricamento istantaneo.

Sebbene il prerendering possa applicarsi a tutto il contenuto web,
può anche consumare una grande quantità di larghezza di banda e CPU. AMP è ottimizzato per limitare al minimo entrambi questi fattori. Il prerendering scarica unicamente le risorse più visibili della pagina (above the fold)
e non esegue il rendering di elementi che potrebbero essere dispendiosi in termini di uso della CPU.

Quando viene eseguito il prerendering dei documenti AMP per il caricamento istantaneo,
vengono effettivamente scaricate solo le risorse visibili della pagina (above the fold).
Quando viene eseguito il prerendering dei documenti AMP per il caricamento istantaneo,
le risorse che potrebbero pesare in modo eccessivo sulla CPU (come iframe di terzi) non vengono scaricate. 

Scopri 
[perché HTML AMP non sfrutta appieno la funzione di scansione di precaricamento](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e).

## Aiutare a rendere AMP ancora più veloce
AMP è una specifica open source.
Ci serve il tuo aiuto per rendere AMP ancora più veloce.
Scopri [come dare il tuo contributo](/docs/support/contribute.html).
