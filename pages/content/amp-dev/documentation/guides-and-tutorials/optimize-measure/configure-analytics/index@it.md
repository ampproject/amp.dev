---
'$title': Configure analytics
$order: 5
'$hidden': 'true'
description: "Se utilizzi Google Analytics come fornitore di strumenti di analisi, dovrai imparare la configurazione base di Google Analytics per AMP e come collegare contenuti AMP e non AMP utilizzando l'ID client"
formats:
  - websites
  - stories
---

[tip] **SUGGERIMENTO -** Se utilizzi Google Analytics come fornitore di analisi, scopri [come la configurazione di base di Google Analytics di base per AMP](https://developers.google.com/analytics/devguides/collection/amp-analytics/#basic_setup_to_measure_page_views) e [come collegare contenuti AMP e non AMP utilizzando l'ID client](https://support.google.com/analytics/answer/7486764). [/tip]

## Decidi prima di iniziare

Tutte le soluzioni di analisi si basano sulla conoscenza del tipo di dati necessari e sul modo in cui si prevede di analizzare tali dati. Decidi prima di iniziare:

- Pensi di utilizzare strumenti di analisi di terzi per valutare il coinvolgimento degli utenti oppure pensi di utilizzare una tua soluzione personalizzata?
- Quali comportamenti degli utenti prenderai in esame per capirne il livello di coinvolgimento?

### Pensi di inviare i dati a fornitori o a te stesso?

L’analisi AMP è concepita appositamente per eseguire una sola misurazione e generare più tipi di rapporti. Se collabori già con uno o più fornitori di soluzioni di analisi, verifica la [specifica amp-analytics](../../../../documentation/components/reference/amp-analytics.md) per vedere se hanno integrato AMP nella propria soluzione. In tal caso, basta semplicemente creare il link ai relativi documenti dalla specifica e iniziare a seguire le istruzioni.

Se il fornitore della soluzione di analisi non ha integrato il formato AMP, contattalo per richiedere assistenza. Ti invitiamo anche a [segnalare un problema relativo al progetto AMP](https://github.com/ampproject/amphtml/issues/new) richiedendo l’aggiunta del fornitore. Vedi anche la sezione [Integrazione degli strumenti di analisi in HTML AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

Quali dati relativi ai tuoi utenti pensi di acquisire per valutarne il coinvolgimento? Devi identificare questi dati prima di poterli configurare.

### Di quali dati hai bisogno?

Quali dati sui tuoi utenti intendi acquisire per misurare il coinvolgimento? È necessario identificare questi dati prima di poterli configurare.

Fattori importanti relativi ai dati da prendere in considerazione:

- Eseguirai solamente il monitoraggio delle visualizzazioni di pagina o anche di altri modelli di coinvolgimento dell’utente (vedi anche [amp-pixel o amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics))?
- Quali tipi di dati acquisirai relativamente ai tuoi utenti, ai tuoi contenuti, a dispositivi o browser (vedi anche [Sostituzione delle variabili](analytics_basics.md#variable-substitution))?
- Come identificherai i tuoi utenti (vedi anche [Identificazione dell’utente](analytics_basics.md#user-identification))?

Ulteriori informazioni: continua ad approfondire gli strumenti di analisi con [Analytics: le nozioni di base](analytics_basics.md).
