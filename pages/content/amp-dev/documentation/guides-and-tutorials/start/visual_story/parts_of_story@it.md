---
"$title": Comprensione delle parti di una storia AMP
"$order": '2'
description: "Una storia web è un'esperienza di narrazione visiva a schermo intero che trasmette informazioni con immagini, video, grafica, audio e altro ancora. È perfetto per gli utenti ..."
author: bpaduch
---

Una storia web è un'esperienza di narrazione visiva a schermo intero che trasmette informazioni con immagini, video, grafica, audio e altro ancora. È uno strumento perfetto per gli utenti che desiderano accedere a contenuti in dimensioni limitate e visivamente ricchi.

Gli ingredienti di base che entrano in una storia web sono le singole **pagine**. Queste pagine, a loro volta, sono composte da singoli **livelli** che contengono **elementi** HTML e AMP di base.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Ciascuno di questi ingredienti viene tradotto in componenti AMP, dove la storia è rappresentata dall'elemento [`amp-story`](../../../../documentation/components/reference/amp-story.md), la pagina è rappresentata dagli elementi `amp-story-page` e i livelli sono rappresentati dagli elementi `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Cominciamo a creare la nostra storia web con il contenitore [`amp-story`](../../../../documentation/components/reference/amp-story.md).
