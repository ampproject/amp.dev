---
'$title': Convalida del codice AMP HTML
$order: 8
description: Ogni volta che crei una pagina AMP, devi sempre verificare che il suo codice AMP HTML sia corretto. Esistono [diversi metodi che puoi utilizzare per convalidare le pagine AMP ...
author: bpaduch
---

Poiché le storie web sono create con AMP, occorre sempre verificare che il loro codice AMP HTML sia corretto. Esistono [diversi metodi per convalidare le pagine AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). In questa esercitazione, utilizzeremo lo strumento di convalida AMP attivando la modalità sviluppatore. Per attivare la modalità sviluppatore, aggiungere il seguente identificatore di frammento all'URL e ricaricare la pagina:

```text
#development=1
```

Per esempio:

```text
http://localhost:8000/pets.html#development=1
```

Aprire la [Console per sviluppatori](https://developer.chrome.com/devtools/docs/console) in Chrome (o sul proprio browser preferito) e verificare che non ci siano errori AMP. Occorre aggiornare il browser per consultare i messaggi di convalida. Se la pagina è senza errori, il sistema mostrerà il messaggio:

```text
 AMP validation successful.
```
