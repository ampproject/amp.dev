---
'$title': Creazione di una pagina AMP che richiede credenziali di accesso
$order: 0
description: "Alcune interazioni dell'utente con una pagina, come l'aggiunta di un commento, potrebbero richiedere un flusso di accesso. Per implementare un flusso di accesso ..."
numbered: '1'
'$hidden': 'true'
formats:
  - websites
---

Alcune interazioni dell'utente con una pagina, come l'aggiunta di un commento, potrebbero richiedere un flusso di accesso. Per implementare un flusso di accesso, si può usare il componente [`amp-access`](../../../../documentation/components/reference/amp-access.md) insieme al componente [`amp-form`](../../../../documentation/components/reference/amp-form.md).

[tip type="tip"] **SUGGERIMENTO:** un esempio di implementazione è disponibile alla pagina [esempio della sezione commenti](../../../../documentation/examples/documentation/Comment_Section.html) del sito [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

L'[esempio della sezione commenti](../../../../documentation/examples/documentation/Comment_Section.html) mostra l'uso combinato di [`amp-access`](../../../../documentation/components/reference/amp-access.md) e [`amp-form`](../../../../documentation/components/reference/amp-form.md) per creare una sezione di commenti abilitata solo quando l'utente ha effettuato l'accesso. Per spiegare come funziona questo esempio, seguiamo la serie di azioni che verranno eseguite una volta raggiunta la pagina.
