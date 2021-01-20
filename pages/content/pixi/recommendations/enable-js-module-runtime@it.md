---
$title: Utilizzare la versione del modulo JavaScript del runtime AMP
$order: 25
tags:
- lcp
- fid
---

È importante rispettare i tuoi utenti e la loro larghezza di banda. L'uso dei [moduli JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) può fare un'enorme differenza positiva sulle prestazioni della tua pagina nei browser Web moderni. Puoi attivare la versione del modulo JavaScript del runtime AMP e i componenti AMP utilizzando il flag [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) con l'ultima versione [dell'ottimizzatore AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/). Esso mantiene l'implementazione aggiornata, dividendo i programmi JavaScript in moduli separati e importando solo ciò che è necessario! Tieni presente che poiché questa funzione è sperimentale (verrà rilasciataa breve!), l'utilizzo di questa funzione renderebbe la pagina AMP non valida.
