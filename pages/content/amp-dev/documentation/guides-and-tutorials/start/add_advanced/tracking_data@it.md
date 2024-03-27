---
'$title': "Tracciamento dell'engagement tramite strumenti di analisi"
$order: 4
description: Le piattaforme di analisi sono comunemente integrate nei siti web tramite frammenti JavaScript inline e chiamate a funzioni, che attivano eventi poi reinviati al sistema di analisi.
---

Le piattaforme di analisi sono comunemente integrate nei siti web tramite frammenti JavaScript inline e chiamate a funzioni, che attivano eventi poi reinviati al sistema di analisi. AMP fornisce una sintassi di configurazione JSON flessibile per replicare questo processo su diverse piattaforme di analisi.

Quello che segue è un esempio del tradizionale tracciamento di Google Analytics basato su JavaScript. Lo riscriveremo nel formato JSON di [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), ma prima diamo un

```html
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>
```

Questo codice JavaScript è abbastanza semplice; invia una notifica per tenere traccia di un evento di visualizzazione pagina.

Per replicare questa funzionalità in AMP, dobbiamo prima **includere** la libreria del componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) nella sezione `<head>` del nostro documento:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://ampjs.org/v0/amp-analytics-0.1.js"
></script>
```

Quindi, **aggiungiamo** il componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) alla fine della sezione `body` del documento:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Proprio come con l'esempio JavaScript nella parte alta di questa pagina, anche questo frammento di [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) invierà una notifica a Google Analytics indicando che una pagina è stata visualizzata.

A questo scopo, abbiamo impostato il valore `type` su `googleanalytics` e poi nella parte JSON abbiamo creato un trigger di nome "default pageview". Questo trigger sarà attivato quando la pagina è visibile (grazie all'istruzione `"on": "visible"`) e quando si attiva invieremo una richiesta di analisi `pageview` a Google Analytics con le `vars` specificate.

La parte JSON utilizzata per configurare [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) è un formato molto flessibile per descrivere quali dati di analisi inviare e quando inviarli. L'elemento [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ha i dettagli completi sul formato.

A partire dal precedente esempio, possiamo **aggiungere** un altro trigger di nome `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        },
        "click on #header trigger": {
          "on": "click",
          "selector": "#header",
          "request": "event",
          "vars": {
            "eventCategory": "examples",
            "eventAction": "clicked-header"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Come si intuisce dal nome di questo nuovo trigger, esso si attiverà quando viene cliccato l'elemento con l'ID `"header"` (come indicato dalle istruzioni `"on": "click"` e `"selector": "#header"`). Quando questo trigger si attiva, invieremo la richiesta `event` al nostro fornitore di analisi, indicando un paio di variabili da includere nella richiesta.

Disponendo di una piattaforma di tracciamento personalizzata con cui si intende eseguire l'integrazione, è comunque possibile utilizzare [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) e definire gli endpoint degli URL personalizzati a cui inviare i dati di tracciamento. Ulteriori informazioni sono disponibili nella documentazione di riferimento del componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **NOTA:** `“UA-YYYY-Y”` è un esempio di account Google Analytics; dovrebbe essere sostituito con il codice di tracciamento di Google Analytics del sito web per il quale si utilizza questo esempio. [/tip]

[tip type="tip"] **SUGGERIMENTO:** Se sei interessato a un sistema di tracciamento più semplice, potresti dare un'occhiata a [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Se hai solo bisogno di monitorare le visualizzazioni di pagina, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) è una soluzione più leggera di [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) perché serve solo a risolvere i requisiti del tracciamento di pixel tradizionale. Ulteriori informazioni in [Strumenti di analisi: guida di base](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
