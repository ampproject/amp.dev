---
"$title": Programma dei rilasci AMP
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- Canali di rilascio"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Release Channels](#release-channels)
    - [Nightly](#nightly)
    - [Weekly](#weekly)
        - [Experimental and Beta channels](#experimental-and-beta-channels)
    - [Long-Term Stable (lts)](#long-term-stable-lts)
- [Determining if your change is in a release](#determining-if-your-change-is-in-a-release)
- [Release Cadence](#release-cadence)
    - [Detailed schedule](#detailed-schedule)
    - [Release Freezes](#release-freezes)

Tutti i martedì avviene la distribuzione push di una nuova versione AMP a tutte le pagine AMP. **Una volta che una modifica in AMP viene unita al ramo master dell'archivio amphtml, in genere occorrono 1-2 settimane prima che la modifica sia attiva per tutti gli utenti.**

## Canali di rilascio <a name="release-channels"></a>

Il sistema runtime e le estensioni AMP sono forniti attraverso una serie di vari *canali di rilascio*. Ciascun canale è finalizzato a realizzare uno scopo degli sviluppatori e del Progetto AMP HTML stesso. Consultare la [sezione frequenze di rilascio](#release-cadence) per maggiori informazioni su modalità e tempi secondo i quali i codici nell'archivio  [`ampproject/amphtml`](https://github.com/ampproject/amphtml) sono compilati nei build di rilascio.

Per determinare se una richiesta pull è stata inclusa in uno dei seguenti canali di rilascio, cercare le etichette GitHub *PR Use: In Canary*, *PR Use: In production* o *PR Use: In LTS* (consultare la sezione che spiega come [Individuare se una modifica è compresa in un rilascio](#determining-if-your-change-is-in-a-release) per maggiori dettagli).

### Notturno <a name="nightly"></a>

Il canale di rilascio **notturno** viene aggiornato (come indica il nome) ogni notte durante la settimana. Questo processo è automatizzato e non vi è alcuna garanzia che una data versione notturna sia priva di bug o altri problemi. Ogni sera dopo la mezzanotte (orario del Pacifico), l'ultimo commit "verde" del giorno viene selezionato come punto di interruzione del rilascio. Un build di rilascio verde indica che tutti i test automatici eseguiti su di esso sono stati superati.

I rilasci notturni forniscono uno strumento per rilevare e risolvere i problemi rapidamente e prima che raggiungano i canali di rilascio *settimanali* più trafficati. Serve anche a ridurre il numero di utenti interessati dagli eventuali problemi introdotti dal nuovo rilascio.

È possibile attivare il canale **notturno**, per testare le richieste pull che sono state unite negli ultimi giorni. Per i dettagli, consultare la [sezione sulle attivazioni](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) nel documento [DEVELOPING.md].

### Settimanali <a name="weekly"></a>

I canali di rilascio *settimanale* sono considerati i principali canali di rilascio sempre pronti. Ogni settimana il rilascio **beta** della settimana precedente viene promosso al canale di rilascio **stabile**, mentre l'ultima versione rilasciata nel canale **notturno** della settimana precedente viene promossa ai canali per i rilasci **sperimentali** e **beta** (consultare il [programma dettagliato](#detailed-schedule)).

Ci sono due insiemi di configurazioni utilizzate per creare i build di rilascio: la configurazione *canary* e quella *production*. I canali dei rilasci **sperimentali** e **beta** sono realizzati a partire dallo stesso commit. La differenza è che il canale **sperimentale** utilizza la configurazione *canary*, mentre il canale **beta** usa la configurazione *production*. La configurazione *canary* abilita componenti e funzioni sperimentali che possono essere disattivati in configurazione *production*. I canali  **sperimentali** e **beta** possono essere attivati dalla [pagina degli esperimenti](https://cdn.ampproject.org/experiments.html).

Il canale dei rilasci **stabili** è realizzato con la configurazione *production* e fornito alla maggior parte del traffico AMP. Poiché anche il canale di rilascio **beta** è realizzato con la configurazione *production*, esso rappresenta esattamente i build che diventeranno **stabili** la settimana successiva (con la possibilità di operazioni di cerry-pick per risolvere i problemi dell'ultimo minuto; consultare la sezione [contributi al codice](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)).

#### Canali beta e sperimentale <a name="beta-and-experimental-channels"></a>

I *Canali Beta* e *quello sperimentale* contengono le versioni pre-selezionate per i prossimi rilasci Stabili di AMP. Ogni martedì (ad eccezione delle settimane con il [blocco dei rilasci](#release-freezes)), il canale **notturno** dell'ultima settimana è promosso ai canali **beta** e **sperimentali** attivabili dagli sviluppatori. Dopo un periodo di test di un giorno in cui verifichiamo che in questi canali non siano stati introdotti peggioramenti funzionali o dal punto di vista delle prestazioni, si procede il mercoledì alla distribuzione di questo rilascio su una piccola porzione di traffico. Questo stesso rilascio viene quindi promosso al canale **stabile** il martedì della settimana seguente.

È possibile attivare questi canali. Per i dettagli, consultare la [sezione relativa all'attivazione](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) in [DEVELOPING.md].

Il *canale beta* è destinato a:

- operazioni di test e verifica di funzionamento sulla versione del sistema di runtime AMP che verrà rilasciata a breve
- utilizzo nelle procedure di Quality Assurance (QA) per garantire che i siti siano compatibili con la successiva versione di AMP

Il *canale sperimentale* è destinato a:

- operazioni di test e verifica di nuove funzionalità non ancora disponibili per tutti gli utenti
- utilizzo nelle procedure di Quality Assurance (QA) per garantire che i siti siano compatibili con le prossime funzionalità di AMP ancora in fase di sviluppo

Il *canale sperimentale* **potrebbe essere meno stabile** e potrebbe contenere funzionalità non ancora disponibili per tutti gli utenti.

### Stabili a lungo termine (lts) <a name="long-term-stable-lts"></a>

Il canale di rilascio **lts** mette a disposizione il rilascio di un precedente build **stabile** per intervalli di un mese. Il secondo lunedì di ogni mese, la versione per il rilascio **stabile** corrente viene promossa al canale **lts**. Questo canale non è consigliato a tutti gli editori AMP. Esso è fornito in modo che gli editori che intendono eseguire un ciclo di procedure di QA sul loro sito web meno frequentemente possano farlo, inserendo specifiche pagine web nel canale **lts** (consultare i [file readme degli **its**](https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md)).

Se il secondo lunedì del mese cade in un giorno festivo, la promozione dei rilasci verrà eseguita al termine del [blocco dei rilasci](#release-freezes).

Importante: gli editori che utilizzano il canale di rilascio **lts** non dovrebbero utilizzare le nuove funzionalità introdotte. A causa del ciclo di gestione più lungo cui sono sottoposti, i rilasci **its** possono essere dal punto di vista funzionale fino a sette settimane indietro rispetto alla versione `HEAD` di [`ampproject/amphtml`](https://github.com/ampproject/amphtml). Per verificare se una modifica sarà pronta nel ciclo di rilascio scelto, consultare la sezione con le informazioni per [individuare se una modifica è compresa in un rilascio](#determining-if-your-change-is-in-a-release).

## Individuare se una modifica è compresa in un rilascio <a name="determining-if-your-change-is-in-a-release"></a>

[Le segnalazioni GitHub di *Tipo: rilasci*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) sono utilizzate per tenere traccia dello stato dei rilasci attuali e precedenti: dalla fase iniziale alla fase di test tramite i canali **sperimentali**/**beta**, fino all'eventuale rilascio tramite i canali **stabili** e **lts**. Gli annunci sui rilasci sono pubblicati sul [canale Slack AMP #release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([iscrizione a Slack](https://bit.ly/amp-slack-signup)).

È possibile determinare quali modifiche sono presenti in un dato build di rilascio utilizzando uno dei seguenti metodi:

- Le [segnalazioni GitHub di *Tipo: Rilasci*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) includeranno per ciascun build di rilascio un collegamento alla [pagina del rilascio](https://github.com/ampproject/amphtml/releases) in questione, che riporta un elenco delle modifiche riportate in tali rilasci.
- Le etichette [*PR Use: In Beta / Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [*PR Use: In Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) e [*PR Use: In LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) sono aggiunte alle richieste push che trasformano i build in questione in build  *settimanali* o **lts**. Ci possono essere dei ritardi tra la creazione del build e l'aggiunta dell'etichetta.

## Frequenza di rilascio<a name="release-cadence"></a>

Siamo sempre volutamente cauti sulle nostre frequenze di rilascio.

Per stabilire la frequenza con cui distribuire tramite richieste push nuove versioni di AMP a tutti, dobbiamo valutare molti fattori, quali:

- stabilità per milioni di siti/miliardi di pagine create utilizzando elementi AMP
- danneggiamento delle cache che potrebbe verificarsi quando si distribuisce una nuova versione
- esigenza di rendere rapidamente disponibili nuove funzionalità

Dopo aver preso in considerazione tutti questi fattori, siamo arrivati a cicli di distribuzione tramite notifiche push di 1-2 settimane. Finora abbiamo ritenuto che si tratti di un ragionevole compromesso, ma continueremo a valutare tutti questi fattori e potremmo apportare modifiche in futuro.

### Programma dettagliato <a name="detailed-schedule"></a>

Cerchiamo di attenerci a questo programma il più fedelmente possibile, sebbene le complicazioni possano causare ritardi. Si può tenere traccia dello stato più recente di qualsiasi versione nelle [Segnalaioni GitHub di *Tipo: Rilasci*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) e nel [canale Slack AMP #release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([iscrizione a Slack](https://bit.ly/amp-slack-signup)).

- Martedì alle [11 Orario del Pacifico](https://www.google.com/search?q=11am+pacific+in+current+time+zone): nuovi build di rilascio **sperimentali** e **beta** sono creati  a partire dall'[ultimo build master che ha passato tutti i nostri test](https://travis-ci.org/ampproject/amphtml/branches) e sono distribuiti agli utenti AMP che sono iscritti al [Canale Sperimentale AMP](#amp-experimental-and-beta-channels) o al [Canale Beta AMP](#amp-experimental-and-beta-channels), rispettivamente.
- Mercoledì: controlliamo le segnalazioni di bug per gli utenti del *Canale sperimentale* e del *Canale Beta* e, se tutto è OK, distribuiamo il canale **beta** all'1% delle pagine AMP.
- Giovedì-Lunedì: continuiamo a controllare la frequenza degli errori e la segnalazione dei bug per gli utenti del *Canale Sperimentale* e del *Canale Beta* e sull'1% delle pagine con i build per i rilasci **sperimentali**/**beta**.
- Martedì della settimana successiva: il build **beta** è completamente promosso al livello **stabile** (ovvero tutte le pagine AMP ora useranno questo build)

### Blocco dei rilasci <a name="release-freezes"></a>

Ci sono occasioni in cui saltiamo i rilasci AMP in fase di produzione, i cosiddetti blocchi dei rilasci.

Se viene annunciato un blocco del rilasci di una settimana per la settimana N:

- Il build di rilascio della settimana precedente rimane in versione **sperimentale**/**beta** per una settimana in più, ovvero la versione di rilascio nella settimana N-1 non viene passato al livello **stabile** nella settimana N come accadrebbe normalmente. Invece, il build passerà al livello **stabile** nella settimana N + 1.
- *Non* sono creati nuovi build di rilascio nella settimana di blocco (settimana N).
- Il normale programma riprenderà nella settimana N + 1, ovvero le versioni **sperimentali**/**beta** sono preparate nella settimana N + 1 e promosse al livello **stabile** nella settimana N + 2.
- Se la versione **stabile** promossa durante la settimana N-1 era originariamente programmata per passare al livello **lts** durante la settimana N, ora diventerà **lts** il lunedì della settimana N + 1.
- I rilasci **notturni** sono ancora generati e promossi di livello, dato che la procedura è completamente automatica.

Un blocco dei rilasci potrebbe verificarsi  a causa di:

- Momenti in cui non ci sono abbastanza persone disponibili per eseguire la distribuzione push di un rilascio AMP **stabile** e monitorarla. Attualmente la maggior parte delle persone che eseguono i rilasci AMP risiede negli Stati Uniti, quindi di solito i blocchi si verificano nelle settimane in cui cadono le principali festività statunitensi, quali Independence Day (4 luglio), Thanksgiving (quarto Giovedì di Novembre), Natale (25 Dicembre) Capodanno e Vigilia (31 Dicembre/1 Gennaio).
- Una situazione di emergenza, quali  problemi di sicurezza o privacy individuati dal [Comitato direttivo tecnico (TSC)](https://github.com/ampproject/meta-tsc) o dalle persone che eseguono il rilascio.
- Altre situazioni in cui si ritiene che la stabilità della base di codice sia particolarmente importante secondo l'opinione del TSC.

In tutti i casi, ad eccezione delle emergenze, i blocchi dei rilasci verranno annunciati con almeno un mese di anticipo.

Nota: salvo i casi di annunci contrari, il blocco dei rilasci non implica il blocco del codice. Il codice può ancora essere scritto, rivisto e unito durante le fasi di blocco dei rilasci.
