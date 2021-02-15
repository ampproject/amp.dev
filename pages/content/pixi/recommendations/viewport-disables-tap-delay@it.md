---
"$title": Disabilitare il touch delay
"$order": '50'
tags:
- fid
---

Impostare la larghezza della finestra di visualizzazione in modo che corrisponda alla larghezza del dispositivo per disabilitare il touch delay, che può aumentare il FID. Per rimuovere questo touch delay di 300-350 ms, modificare la dichiarazione della finestra di visualizzaione nella sezione `<head>` della pagina in questo modo:

```
<meta name="viewport" content="width=device-width">
```

In questo modo la larghezza dell'area di visualizzazione sarà uguale a quella del dispositivo, cosa generalmente consigliata per i siti ottimizzati per dispositivi mobili. Puoi [trovare ulteriori informazioni sulla disattivazione del touch delay su web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
