---
'$title': Utilizzo di ottimizzatori AMP
$order: 2
'$hidden': 'true'
description: "Gli ottimizzatori AMP sono strumenti che rendono possibili le ottimizzazioni delle cache AMP anche sul tuo sito. L'utilizzo di un ottimizzatore AMP permette di creare  pagine efficienti, che garantiscono risultati conformi ai requisiti Core Web Vitals. Questa guida spiega come utilizzare al meglio un ottimizzatore AMP per migliorare le proprie pagine AMP."
formats:
  - websites
  - stories
author: sebastianbenz
---

Gli ottimizzatori AMP sono strumenti che rendono possibili le ottimizzazioni delle cache AMP anche sul tuo sito. L'utilizzo di un ottimizzatore AMP permette di creare [pagine efficienti](https://developers.google.com/search/docs/guides/page-experience), che garantiscono risultati conformi ai requisiti [Core Web Vitals](https://developers.google.com/search/docs/guides/page-experience). Per saperne di più sul funzionamento degli ottimizzatori AMP, consultare la [guida dettagliata alle ottimizzazioni AMP](explainer.md).

## L'AMP non è già abbastanza veloce?

Potresti avere un dubbio: l'AMP non dovrebbe essere già abbastanza veloce e pronto all'uso? Ed è vero: il sistema di runtime AMP è già ottimizzato e tutte le pagine AMP valide si caricano velocemente. Tuttavia, esistono ulteriori ottimizzazioni che si possono implementare sul server per permettere ai browser di caricare le pagine AMP ancora più velocemente.

All'inizio, le cache AMP fornivano la maggior parte delle pagine AMP. Queste cache eseguono ulteriori ottimizzazioni sulle pagine per garantire un'esperienza utente sempre migliore. Ma, nel tempo, i collegamenti alle pagine AMP si sono moltiplicati e gli sviluppatori hanno iniziato a creare interi siti web in AMP. Ecco perché il team AMP ha iniziato a lavorare sugli ottimizzatori per consentire a tutti di pubblicare anche sulle proprie origini pagine AMP con prestazioni simili a quelle delle cache.

## Integrazione di ottimizzatori AMP

Esistono tre modi per utilizzare un ottimizzatore AMP:

1. Utilizzare generatori di siti o CMS con ottimizzatori incorporati.
2. Integrare ottimizzatori AMP nel proprio sistema di build o server.
3. Integrare ottimizzatori AMP nel proprio ambiente di hosting.

### CMS e generatori di siti

Il modo migliore per pubblicare pagine AMP ottimizzate è utilizzare CMS e generatori di siti con ottimizzatori AMP integrati. In questo caso, le pagine AMP verranno ottimizzate automaticamente. Attualmente, i seguenti generatori di siti e CMS integrano ottimizzatori AMP:

- [WordPress](https://wordpress.org/) tramite [Plugin AMP WordPress](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) tramite [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Build personalizzati o integrazioni nei server

Gli utenti possono anche integrare i propri ottimizzatori AMP. Sono disponibili più implementazioni open source dell'ottimizzatore AMP:

- [AMP Optimizer (Node.js)](node-amp-optimizer.md): una libreria basata su Node.js per la produzione di AMP ottimizzato. Dai un'occhiata alla nostra guida introduttiva qui su amp.dev. L'implementazione è gestita dal team AMP.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): una porta Python di Node AMP Optimizer.

Esistono diverse integrazioni per le pagine con rendering dinamico eseguito dal server e dai siti statici:

1. **In fase di build**: per i siti statici, è meglio ottimizzare le pagine AMP in fase di build. Questo approccio è ideale poiché l'ottimizzazione delle pagine AMP non influisce sulle prestazioni durante la pubblicazione. Dai un'occhiata a [questo esempio per un'integrazione di AMP Optimizer + Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **In fase di rendering**: se i siti web hanno una natura più dinamica o non sono in grado di applicare le trasformazioni in modo statico, l'ottimizzazione può essere eseguita dopo che il server ha eseguito il rendering dei documenti AMP. In tal caso, per garantire elaborazioni rapide, è meglio memorizzare nella cache le pagine trasformate per le richieste successive. La memorizzazione in cache può avvenire a livello CDN, sull'infrastruttura interna del sito (es: Memcached), o anche sul server stesso, se l'insieme di pagine è abbastanza piccolo da entrare in memoria. Per saperne di più su questo approccio, consultare [questa demo che integra AMP Optimizer in Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Integrazioni del fornitore di hosting

Alcuni fornitori di servizi di hosting consentono di eseguire logica personalizzata durante la distribuzione o la pubblicazione di una pagina Web. Questa è una buona possibilità per integrare AMP Optimizer. Esempi di integrazioni sono:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([presto disponibile](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([presto disponibile](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
