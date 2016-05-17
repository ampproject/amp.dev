---
layout: page
title: Configurazione di Analytics
order: 5
folder: analytics
locale: it
---

## Decidi prima di iniziare

Tutte le soluzioni di analisi si basano sulla conoscenza del tipo di dati necessari
e sul modo in cui si prevede di analizzare tali dati. Decidi prima di iniziare.

* Pensi di utilizzare strumenti di analisi di terzi per valutare il coinvolgimento degli utenti
oppure pensi di utilizzare una tua soluzione personalizzata?
* Quali comportamenti degli utenti prenderai in esame per capirne il livello di coinvolgimento?

### Pensi di inviare i dati a fornitori o a te stesso?

Se disponi di una soluzione personalizzata per la valutazione del coinvolgimento degli utenti,
l’unica cosa di cui avrai bisogno per integrare l’analisi AMP con tale soluzione è un URL.
È qui che invierai i tuoi dati.
Puoi anche inviare i dati a diversi URL.
Ad esempio, puoi inviare i dati di visualizzazione delle pagine a un URL
e i dati di coinvolgimento sui social a un altro URL.

L’analisi AMP è concepita appositamente per eseguire una sola misurazione e generare più tipi di rapporti.
Se collabori già con uno o più fornitori di soluzioni di analisi,
verifica la
[specifica amp-analytics](/docs/reference/extended/amp-analytics.html)
per vedere se hanno integrato AMP nella propria soluzione.
In tal caso, basta semplicemente creare il link ai relativi documenti dalla specifica
e iniziare a seguire le istruzioni.

Se il fornitore della soluzione di analisi non ha integrato il formato AMP,
contattalo per richiedere assistenza.
Ti invitiamo anche a [segnalare un problema relativo al progetto AMP](https://github.com/ampproject/amphtml/issues/new)
richiedendo l’aggiunta del fornitore.
Vedi anche la sezione 
[Integrazione degli strumenti di analisi in HTML AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Di quali dati hai bisogno?

Quali dati relativi ai tuoi utenti pensi di acquisire per valutarne il coinvolgimento?
Devi identificare questi dati prima di poterli configurare.

Fattori importanti relativi ai dati da prendere in considerazione:

* Eseguirai solamente il monitoraggio delle visualizzazioni di pagina o anche di altri modelli di coinvolgimento dell’utente
(vedi anche [amp-pixel o amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics))?
* Quali tipi di dati acquisirai relativamente ai tuoi utenti, ai tuoi contenuti,
a dispositivi o browser (vedi anche [Sostituzione delle variabili](/docs/guides/analytics/analytics_basics.html#variable-substition))?
* Come identificherai i tuoi utenti (vedi anche [Identificazione dell’utente](/docs/guides/analytics/analytics_basics.html#user-identification))?
