---
'$title': Rapporti tra contenuti AMP e PWA
$order: 7
description: "Le app web progressive (PWA) e le pagine AMP funzionano perfettamente insieme. In effetti, in molti casi, si completano a vicenda in un modo o nell'altro. Ora impareremo a ..."
formats:
  - websites
components:
  - youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Watch the intro to combining AMP and PWA.']

Le app web progressive (PWA) e le pagine AMP funzionano perfettamente insieme. In effetti, in molti casi, si completano a vicenda in un modo o nell'altro. Ora impareremo a:

1. [Abilitare le funzioni PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) per le pagine AMP
2. Creare un'[esperienza coinvolgente e ultra-veloce](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) che condurrà gli utenti dai contenuti AMP alle app PWA
3. [Semplificare le app PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) utilizzando la potenza dei contenuti AMP

[tip type="note"]

Ulteriori informazioni sulle [applicazioni web progressive](https://developers.google.com/web/progressive-web-apps/) nei Fondamenti del web.

[/tip]

## Pagine AMP con funzionalità di tipo PWA

Le pagine AMP possono utilizzare molte funzionalità PWA in modo autonomo, a condizione che siano fornite dalla nostra origine (il dominio del nostro sito) anziché da una cache AMP. Ciò significa che le funzionalità PWA non si attivano quando si fruisce di una pagina AMP all'interno di una piattaforma come Google o Bing, ma lo faranno nel prosieguo del viaggio, o se gli utenti visitano direttamente le pagine AMP nel loro dominio di origine.

[tip type="read-on"] **CONTINUA A LEGGERE:** Scopri come [abilitare le funzioni PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) per le pagine AMP. [/tip]

## Contenuti AMP come punto di accesso alle app PWA

Un esclusivo punto di forza dei contenuti AMP è la **disponibilità quasi istantanea**, una caratteristica che rende il sistema AMP la soluzione perfetta per garantire agli utenti la prima interazione con il nostro sito web al meglio. _Le app web progressive_ consentono **maggiore interattività e numerose funzionalità coinvolgenti**, ma il loro primo caricamento è spesso ostacolato dal fatto che il Processo di lavoro del sito, e quindi le sue risorse e la shell dell'app, possono solo accelerare la disponibilità dei caricamenti successivi.

Una buona strategia è quella di implementare il punto di accesso al proprio sito con una pagina AMP, quindi preparare l'app PWA dietro le quinte e passare ad essa per il prosieguo.

[tip type="read-on"] **CONTINUA A LEGGERE:** Scopri come [collegare contenuti AMP ad app PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) tramite componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md). [/tip]

## AMP come origine dei dati per le app PWA

Una delle caratteristiche principali delle pagine AMP è che possono essere incorporate in modo facile e sicuro, per cui un numero sempre crescente di piattaforme è in grado di distribuirle e gestirle.

Gli editori che stanno creando un'app web progressiva, possono sfruttare gli stessi vantaggi e ridurre drasticamente la complessità delle soluzioni backend e client **riutilizzando le proprie pagine AMP come origine dati per le app PWA**.

[tip type="read-on"] **CONTINUA A LEGGERE:** Scopri come utilizzare le [pagine AMP all'interno di un'app PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md). [/tip]
