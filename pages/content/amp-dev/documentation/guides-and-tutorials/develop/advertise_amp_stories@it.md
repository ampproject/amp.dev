---
'$title': Annunci nelle storie Web
$order: 3
description: "Le storie Web sono una coinvolgente esperienza a schermo intero, con contenuti abilitati per il tocco, che immerge gli utenti nella loro lettura. L'inclusione di inserzioni pubblicitarie in storie Web consente un'integrazione distribuzione continua e senza problemi..."
formats:
  - stories
author: CrystalOnScript
---

Le storie web sono una coinvolgente esperienza a schermo intero, con contenuti abilitati per il tocco, che immerge gli utenti nella loro lettura. L'inclusione di inserzioni pubblicitarie in storie web consente un'integrazione continua e senza problemi con i contenuti, mantenendo elevati il coinvolgimento e la fruibilità della piattaforma per gli utenti.

## Posizionamento degli annunci

Le storie web utilizzano un singolo componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) per stabilire la quantità e il posizionamento degli annunci.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) è un wrapper che racchiude il componente [`amp-ad`](../../../documentation/components/reference/amp-ad.md) e inserisce dinamicamente uno o più annunci mentre l'utente fruisce dei contenuti della storia. Per garantire la migliore esperienza di utilizzo:

1. Il rendering degli annunci è realizzato in via preliminare dal sistema di runtime delle storie Web e solo dopo gli annunci sono inseriti. Ciò garantisce che agli utenti non verrà mai mostrato un annuncio vuoto o non caricato completamente.

2. La densità degli annunci inseriti è ottimizzata in rapporto ai contenuti per evitare problemi di saturazione eccessiva. Il componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) determina quando e dove inserire gli annunci mentre l'utente procede nella storia.

Una storia web inserisce il primo annuncio in una posizione dopo le prime due pagine con l'obiettivo di ottimizzare i ricavi di monetizzazione e l'esperienza dell'utente.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **NOTA:** una storia web più lunga crea maggiori opportunità per il posizionamento degli annunci. L'esatto posizionamento dell'annuncio continuerà a essere ottimizzato nel tempo dal relativo algoritmo. [/tip]

## Interazioni utente

Gli utenti possono procedere oltre gli annunci allo stesso modo con cui avanzano tra le normali pagine della storia, cioè toccando i due terzi della parte destra dello schermo.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Immagine che mostra l\'area che gli utenti possono toccare per saltare un annuncio', caption='Gli utenti possono procedere oltre gli annunci toccando i due terzi della parte destra dello schermo.', align ='') }}

Gli utenti possono interagire direttamente con l'annuncio toccando il pulsante [invito all'azione](story_ads_best_practices.md#call-to-action-button-text-enum) generato dal sistema, che appare nell'ultimo terzo in fondo a tutti gli annunci nelle storie web. Il pulsante può essere configurato per inviare gli utenti a un URL arbitrario (oppure al relativo app store).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Immagine che mostra che gli utenti sono reindirizzati a una pagina di destinazione, ma possono tornare alla storia.', caption='Gli utenti sono reindirizzati a una pagina di destinazione dell\'annuncio, ma possono tornare alla storia.', align='' ) }}

## Configurazione di una storia web per gli annunci

Le storie Web non possono supportare un elemento [`amp-ad`](../../../documentation/components/reference/amp-ad.md) direttamente sulla pagina. Invece, tutti gli annunci sono prelevati e visualizzati dal componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md). Il componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) deve essere posizionato direttamente come elemento figlio di [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html]
<amp-story>
<amp-story-auto-ads>
<script type="application/json">
{
"ad-attributes": {
// ad server configuration
}
}
</script>
</amp-story-auto-ads>
<amp-story-page>
...
</amp-story>
[/sourcecode]

A differenza di un normale elemento [`amp-ad`](../../../documentation/components/reference/amp-ad.md), non sono richiesti elementi `<fallback>` o `<placeholder>`, poiché gli annunci delle storie web saranno visualizzati una sola volta dopo averne eseguito il rendering completo.

## Come iniziare con gli annunci nelle storie

Il modo più semplice per includere annunci nelle storie web è quello di gestirli tramite un server annunci supportato.

Server di annunci che attualmente supportano gli annunci nelle storie web:

- Google Ad Manager <a name="google-ad-manager"></a>
  - [Annunci a vendita diretta](https://support.google.com/admanager/answer/9038178)
  - [Annunci programmati](https://support.google.com/admanager/answer/9416436)
- Google AdSense (presto disponibile)
- Mgid
  - [Annunci a vendita diretta](https://help.mgid.com/generate-revenue-with-amp-web-stories)
- Si possono integrare anche altre piattaforme pubblicitarie (contattaci per i [dettagli tramite Github](https://github.com/ampproject/amphtml/issues/30769))

Se sei un inserzionista interessato a pubblicare i tuoi annunci all'interno di storie web, ti preghiamo di [contattarci](mailto:story-ads-wg@google.com) per ulteriori informazioni.

Gli editori possono anche inserire annunci personalizzati se impostano un proprio server annunci. [Il processo dettagliato è disponibile qui](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Leggere la pagina [Traffico di elementi creativi personalizzati nelle storie Web](https://support.google.com/admanager/answer/9038178) per informazioni sul caricamento di annunci su Google Ad Manager e consultare la nostra guida sulle [procedure consigliate per la creazione di un annuncio in storie AMP](story_ads_best_practices.md).[/tip]
