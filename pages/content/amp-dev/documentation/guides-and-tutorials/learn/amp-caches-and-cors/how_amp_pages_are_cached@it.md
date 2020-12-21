---
"$title": Memorizzazione nella cache delle pagine AMP
"$order": '0'
description: "In questo documento impareremo a conoscere il ruolo della cache AMP nell'ecosistema AMP e in che modo le pagine AMP sono memorizzate nella cache."
formats:
- websites
- stories
- ads
---

In questo documento impareremo a conoscere il ruolo della cache AMP nell'ecosistema AMP e in che modo le pagine AMP sono memorizzate nella cache.

## Cos'è una cache AMP?

Una cache AMP è una rete di distribuzione dei contenuti (CDN, Content Delivery Network) basata su proxy per la fornitura di documenti AMP validi. Le cache AMP sono progettate per:

1. Fornire solo pagine AMP valide.
2. Consentire il precaricamento di pagine AMP in modo efficiente e sicuro.
3. Eseguire ulteriori ottimizzazioni sulle prestazioni dei contenuti a beneficio dell'utente.

[tip type="note"] I documenti di e-mail AMP non usano la cache AMP. [/tip]

Ulteriori informazioni sulle cache AMP sono disponibili nel video YouTube riportato di seguito o nel post del blog [Perché si usano le cache AMP](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Guarda questo video per scoprire a che servono le cache AMP.']

## Quali cache AMP sono disponibili?

Attualmente, ci sono due fornitori di cache AMP:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP è un ecosistema aperto e il progetto AMP incoraggia attivamente lo sviluppo di più cache AMP. Per informazioni sulla creazione di cache AMP, consultare le [Linee guida per le cache AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Come scegliere una cache AMP?

In qualità di editore, non dovrai scegliere una cache AMP, in *effetti è la piattaforma* che si collega ai tuoi contenuti che sceglie la cache AMP da utilizzare (se presente).

Questo meccanismo capovolge il modello tipico in cui la consegna dei contenuti è responsabilità dell'editore. Tuttavia, questo modello consente alle piattaforme di fornire ai propri utenti prestazioni dal carico prevedibile e, tra le altre cose, consente loro di garantire le proprietà fisse di sicurezza e privacy richieste durante la fase di pre-rendering dei contenuti AMP. Per conoscere le stringenti linee guida applicate per la creazione di cache AMP, consultare il documento [Linee guida per le cache AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Si può disattivare la memorizzazione nella cache?

La memorizzazione nella cache è una parte fondamentale dell'ecosistema AMP. La pubblicazione di documenti AMP validi attiva automaticamente l'opzione nella consegna con cache.

Se si preferisce che i propri documenti non siano memorizzati nella cache, è possibile rimuovere l'attributo `amp` dal tag HTML. Ciò rende il documento AMP tecnicamente non valido, senza influire sulla funzionalità del documento.

## Chi richiede pagine AMP memorizzate nella cache?

Le pagine AMP memorizzate nella cache sono accessibili da piattaforme (come Google Search, Google News e Bing) e app per dispositivi mobili. Le app mobili possono collegarsi al contenuto AMP memorizzato nella cache tramite l'URL (consultare l'[API AMP URL](https://developers.google.com/amp/cache/use-amp-url) di Google) o tramite richieste XHR multi-origine nelle app web progressive (ulteriori informazioni disponibili nel documento [Incorporare e usare AMP come origine dati](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## Come viene memorizzata nella cache la mia pagina AMP?

Utilizzando il formato AMP, i contenuti sono disponibili per essere memorizzati nella cache AMP. Esistono vari modi in cui una pagina AMP può finire in una cache AMP:

- **Individuazione tramite piattaforma**: le piattaforme individuano i contenuti AMP tramite il tag `<html ⚡>` o `<html amp>` e memorizzano nella cache i contenuti. Ad esempio, Google Search indicizza i contenuti; il contenuto di ogni pagina AMP valida individuata è memorizzato nella cache AMP Google.

- **Richiesta URL cache** : le piattaforme possono richiedere specificamente una pagina AMP utilizzando il formato URL cache AMP. La cache AMP funge da proxy inverso, pertanto, quando la piattaforma accede alla pagina, la pagina viene automaticamente memorizzata nella cache.

    - Esempio di URL della cache AMP Google: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **NOTA:** l'URL della cache AMP non è un URL rivolto all'utente, cioè gli utenti in genere non richiedono contenuti tramite tali URL. [/tip]

- **Aggiunta dell'editore**: gli editori possono aggiungere in modo specifico le pagine AMP alla cache AMP. Questa opzione è applicabile solo alla cache AMP Google (consultare [Cache AMP Google: aggiornamento del contenuto AMP](https://developers.google.com/amp/cache/update-cache)).

## Risorse aggiuntive

- [Linee guida per la cache AMP del progetto AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
- [Panoramica della cache AMP Google](https://developers.google.com/amp/cache/overview)
- [Documentazione della cache AMP Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
