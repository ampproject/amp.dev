---
'$title': Aggiunta di caratteri
$order: 6
description: 'I caratteri personalizzati possono essere inclusi nelle pagine AMP in due modi: 1. Tramite un tag <link>: solo per i fornitori di caratteri autorizzati. 2. Utilizzando ...'
---

Per velocizzare il caricamento dei documenti, le pagine AMP non possono includere fogli di stile esterni. Tuttavia, c'è un'eccezione a questa regola: i **caratteri**.

I caratteri personalizzati possono essere inclusi nelle pagine AMP in due modi:

1. Tramite un tag <code><link></code>: solo per i fornitori di caratteri autorizzati.
2. Utilizzando la regola CSS `@font-face`: non ci sono restrizioni, tutti i caratteri sono consentiti.

In questa esercitazione, useremo un tag `<link>` per aggiungere caratteri alla nostra pagina. **Aggiungiamo** un link al foglio di stile nella sezione `<head>` per richiedere il carattere Raleway:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

Ora **aggiorniamo** il selettore CSS `body` per includere un riferimento a Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Aggiorniamo** la pagina e controlliamo il nuovo aspetto dei caratteri. Poi, controlliamo il risultato dello strumento di convalida AMP. Non dovrebbero esserci errori per questa richiesta di un foglio di stile esterno.

[tip type="note"] I caratteri web possono compromettere le prestazioni di un sito, anche se si tratta di un veloce sito AMP. Usiamo la proprietà CSS [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) per ottimizzare il caricamento dei caratteri. [/tip]

Hai completato il tuo articolo AMP di notizie! Ecco come dovrebbe apparire:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
