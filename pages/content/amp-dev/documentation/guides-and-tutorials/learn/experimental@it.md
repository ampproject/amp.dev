---
'$title': Attivazione funzionalità sperimentali
$order: 3
description: I componenti sperimentali AMP sono funzioni rilasciate ma non ancora pronte per un ampio utilizzo, quindi sono protette dallo stato sperimentale.
formats:
  - siti web
  - storie
  - annunci
---

I [componenti sperimentali AMP](https://github.com/ampproject/amphtml/tree/main/tools/experiments) sono funzioni rilasciate ma non ancora pronte per un ampio utilizzo, quindi sono protette dallo stato **sperimentale**.

Gli sviluppatori e gli utenti possono scegliere di utilizzare queste funzionalità prima che vengano rilasciate completamente. Ma dovrebbero essere usati con cautela, poiché potrebbero contenere bug o avere effetti collaterali inaspettati.

[tip type="important"] Esiste il rischio che alcuni esperimenti non vengano mai rilasciati come funzionalità definitive del progetto AMP. [/tip]

{% set experimental_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('experimental')|list %} {% if experimental_components|length %} Segue una lista dei componenti che sono attualmente in stato sperimentale e sono pronti all'utilizzo da parte degli sviluppatori allo scopo di ricevere il feedback del loro primo uso:

<ul><br>{% for component in experimental_components %}<br>  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li><br>{% endfor %}<br></ul><br>{% endif %}

## Iscrizione al canale AMP Dev

L'iscrizione al canale AMP Dev è un modo per consentire a un browser di utilizzare una versione più recente delle librerie AMP JS.

Il rilascio del canale AMP Dev **potrebbe essere meno stabile** e potrebbe contenere funzionalità non disponibili per tutti gli utenti. Attivare questa opzione per testare nuove versioni di AMP, segnalare bug o creare documenti che richiedono una nuova funzionalità che non è ancora disponibile per tutti.

L'attivazione del canale Dev permette di:

- eseguire operazioni di test e verifica di nuove funzionalità non ancora disponibili per tutti gli utenti.
- utilizzare nelle procedure di Quality Assurance (QA) per garantire che i siti siano compatibili con la successiva versione di AMP.

Se trovi un problema che sembra verificarsi solo nella versione del canale AMP Dev, [lo puoi segnalare](https://github.com/ampproject/amphtml/issues/new) con una descrizione del problema. Includi sempre un URL a una pagina che riproduce il problema.

Per iscrivere il tuo browser al canale AMP Dev, accedi alla [pagina degli esperimenti AMP](https://ampjs.org/experiments.html) e attiva l'esperimento "Canale AMP Dev". Per ricevere informazioni sulle principali modifiche ad AMP, iscriviti alla mailing list [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Attivazione di componenti sperimentali

#### Contenuti forniti da cdn.ampproject.org

Per i contenuti forniti da `https://*.cdn.ampproject.org`, vai a `/experiments.html` su un sottodominio della cache Google AMP e attiva (o disattiva) qualsiasi componente sperimentale.

Ad esempio, per abilitare contenuti sperimentali sulle pagine AMP memorizzate nella cache la cui sorgente originale è `www.example.com`, accedi a `www-example-com.cdn.ampproject.org/experiments.html`.

I componenti sperimentali attivati sono salvati in `localStorage` e sono possibili solo gli esperimenti su pagine AMP fornite dal dominio corrente.

#### Contenuti forniti da altri domini

Per i contenuti forniti da domini non CDN, gli esperimenti possono essere attivati nella console di devtools utilizzando:

```js
AMP.toggleExperiment('experiment');
```

Qualsiasi file AMP che include funzioni sperimentali non supererà la [convalida AMP](validation-workflow/validate_amp.md). Rimuovere questi componenti sperimentali dai documenti AMP pronti per la produzione.

## Attivazione di un esperimento per un particolare documento

In ogni documento è possibile attivare gli esperimenti richiesti. A tale scopo, inserire un meta tag del nome `amp-experiments-opt-in` nell'intestazione del documento HTML prima dello script AMP (`https://ampjs.org/v0.js`). Il valore del suo contenuto è una stringa contenente gli ID degli esperimenti da attivare, separati da virgole.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b" />
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://ampjs.org/v0.js"></script>
  ...
</head>
```

In questo modo, i contenuti sperimentali attivati saranno disponibili a tutti i visitatori del documento. Tuttavia, non tutti gli esperimenti possono essere attivati a livello di documento. Per l'elenco completo degli esperimenti consentiti, consultare l'attributo `allow-doc-opt-in` nel file [`prod-config.json`](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/prod-config.json) del progetto. Nota: le attivazioni dei componenti sperimentali a livello di documento possono essere annullate dall'utente.

## Prove sull'origine

[Le prove sull'origine](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md) consentono agli sviluppatori di utilizzare una funzionalità sperimentale in fase di produzione e forniscono un feedback essenziale.

Tradizionalmente, una funzionalità in modalità sperimentale può essere utilizzata in fase di sviluppo, ma non può essere trasferita in produzione. Con le prove sull'origine, gli sviluppatori interessati possono scegliere di testare una funzionalità sperimentale in fase di produzione, alle seguenti condizioni:

- Il test dura per un tempo limitato.
- La funzionalità subirà probabilmente alcune modifiche dopo le prove sull'origine.

Le prove sull'origine offrono l'opportunità di implementare e provare una nuova funzionalità prima che sia completamente attiva. La funzione risiederà sul sito dello sviluppatore, anziché essere protetta dallo stato sperimentale, e il feedback può influenzare direttamente lo sviluppo della funzione.

{% set trial_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('origin_trial')|list %} {% if trial_components|length %} I componenti nell'elenco seguente possono essere attualmente provati nell'origine:

<ul><br>{% for component in trial_components %}<br>  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li><br>{% endfor %}<br></ul><br>{% endif %}

### Attivazione di una prova sull'origine

Includere il seguente tag `<meta>` nel tag `<head>` su ogni pagina che utilizza l'esperimento di prova sull'origine:

```html
<meta name="amp-experiment-token" content="{copy your token here}" />
```

Nota: `"amp-experiment-token"` è la stringa con il valore letterale, `"amp-experiment-token"`. Non è il token stesso (che va nell'attributo content) o il nome dell'esperimento.
