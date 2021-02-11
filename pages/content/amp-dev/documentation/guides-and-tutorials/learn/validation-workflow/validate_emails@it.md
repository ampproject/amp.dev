---
'$title': Convalida delle email AMP
$order: 1
author: CrystalOnScript
formats:
  - email
---

Le e-mail AMP dipendono dalla libreria AMP JS per consentire agli utenti coinvolgenti esperienze interattive e dinamiche. Per questo motivo, i fornitori di posta elettronica richiedono la convalida dei messaggi e-mail. La convalida dei markup AMP garantisce che le e-mail siano sicure e soddisfino in pieno gli standard di esperienza d'uso richiesti dall'utente.

# Come posso verificare se le mie e-mail AMP sono valide?

Sono disponibili diversi strumenti per la convalida delle e-mail AMP. Produrranno tutti lo stesso risultato, quindi si può scegliere quello che si adatta di più al proprio stile di sviluppo!

## Convalida basata su web

Lo [strumento di convalida AMP basato su Web](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) supporta la piattaforma AMP per e-mail. La convalida basata su web può essere effettuata incollando l'e-mail AMP da verificare nello strumento. Esso evidenzierà qualsiasi errore di convalida direttamente inline.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Convalida da riga di comando

I file delle e-mail AMP possono essere convalidati utilizzando lo [strumento della riga di comando per la convalida AMP HTML](https://www.npmjs.com/package/amphtml-validator).

### Installazione

1. Includere [Node.js con il relativo gestore di pacchetti 'npm'](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) sul proprio sistema.
2. Installare lo strumento della riga di comando per la convalida AMP HTML, eseguendo questo comando: `npm install -g amphtml-validator`.

### Utilizzo

Dopo aver installato lo strumento della riga di comando, eseguire il seguente comando, dopo aver sostituito `<amphtml file>` con il nome del file contenente l'e-mail AMP da verificare.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Se l'e-mail è valida, lo strumento della riga di comando mostra il risultato `PASS`. Se non è valida, lo strumento restituirà gli errori trovati.

## Playground AMP

Si possono convalidare le e-mail AMP anche utilizzando lo strumento [playground AMP](https://playground.amp.dev/?runtime=amp4email). Esso funziona in modo simile allo strumento di verifica basato sul web: incollando l'e-mail AMP nello strumento, il playground segnalerà eventuali errori di convalida direttamente inline.

### Convalida delle e-mail consegnate

A volte le e-mail AMP inviate potrebbero non essere valide anche se il markup e-mail creato è già stato convalidato dagli strumenti documentati in questa pagina. Questo di solito accade perché il proprio sistema [ESP](https://amp.dev/support/faq/email-support/) ha modificato il markup dell'e-mail rendendolo non valido, dopo l'invio della e-mail all'ESP per la consegna. Ad esempio, se come piattaforma ESP si usa SparkPost senza aver configurato i pixel di tracciamento HTTPS con SparkPost, esso aggiungerà un pixel di tracciamento HTTP non sicuro all'email. Poiché le e-mail AMP consentono solo immagini HTTPS, la e-mail AMP in questione non supererà la convalida.

Per verificare se un'e-mail consegnata alla propria casella di posta è in formato AMP valido:

1. [scaricare l'e-mail AMP come file `.eml`](https://www.codetwo.com/kb/export-email-to-file) dal proprio client di posta.
2. Aprire [playground AMP](https://playground.amp.dev/?runtime=amp4email).
3. Fare clic su "IMPORTA E-MAIL" e selezionare il file `.eml` appena scaricato.

Lo strumento playground importerà l'e-mail AMP scaricata nell'editor inline e segnalerà eventuali errori di convalida.

# Cosa succede se la mia e-mail non è valida?

Lo strumento di convalida AMP non è solo una comodità per lo sviluppo. I fornitori di posta elettronica che supportano le e-mail AMP eseguiranno automaticamente il fallback ai tipi MIME HTML o in testo semplice forniti. Un'e-mail AMP deve essere inviata solo se supera la convalida.
