---
$title: Componenti sperimentali
---

I [componenti sperimentali AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) sono funzioni che sono state rilasciate ma che non sono ancora pronte per essere utilizzate pubblicamente, quindi sono protette da uno stato sperimentale.

Gli sviluppatori e gli utenti possono decidere di utilizzare queste funzioni prima che vengano rilasciate completamente, ma devono prestare attenzione perché potrebbero contenere bug o avere effetti collaterali imprevisti.

## Attivare l'AMP Dev Channel

L'AMP Dev Console Channel consente di attivare l'utilizzo di una versione più recente delle librerie JS AMP in un browser.

Per attivare l'AMP Dev Channel nel tuo browser, visita la [pagina degli esperimenti AMP](https://cdn.ampproject.org/experiments.html) e attiva l'esperimento relativo al canale.

## Attivare un componente sperimentale

Per i contenuti pubblicati da [https://cdn.ampproject.org](https://cdn.ampproject.org), visita la [pagina degli esperimenti AMP](https://cdn.ampproject.org/experiments.html) e attiva (o disattiva) qualsiasi componente sperimentale utilizzando la relativa opzione. Quando attivi un componente sperimentale, nel browser viene impostato un cookie che attiverà l'esperimento per tutte le pagine AMP pubblicate tramite la cache AMP di Google.

Per i contenuti pubblicati da qualsiasi altro dominio, è possibile attivare/disattivare gli esperimenti nella console devtools (quando è attiva la modalità sviluppo) utilizzando:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Tutti i file AMP che includono funzioni sperimentali non supereranno la [convalida AMP](validation-workflow/validate_amp.md).
Rimuovi questi componenti sperimentali per i documenti AMP pronti per la produzione.
