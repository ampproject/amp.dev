---
"$title": Modify presentation and layout
"$order": '3'
description: "Le pagine AMP sono pagine web; l’applicazione di stili alla pagina e ai suoi elementi viene effettuata tramite proprietà CSS comuni. Definisci gli stili degli elementi tramite selettori di classi o..."
author: pbakaus
contributors:
- bpaduch
---

## Modifica della presentazione

Le pagine AMP sono pagine web; l’applicazione di stili alla pagina e ai suoi elementi viene effettuata tramite proprietà CSS comuni. Definisci gli stili degli elementi tramite selettori di classi o elementi in un foglio di stile incorporato nel tag `<head>`, denominato `<style amp-custom>`:

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

Ciascuna pagina AMP può avere solamente un foglio di stile inline e l’uso di alcuni selettori non è consentito. [Scopri tutte le informazioni utili sullo stile](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Controllo del layout

AMP segue regole più severe per il layout degli elementi nella pagina. In una normale pagina HTML, per il layout degli elementi utilizzi quasi esclusivamente CSS. Tuttavia, per questioni legate alle prestazioni, AMP impone in partenza un limite esplicito per tutti gli elementi.

[tip type="read-on"] **CONTINUA A LEGGERE:** Scopri in che modo viene eseguito il rendering e il layout di una pagina in AMP e come fare per modificare il layout nella sezione <a class="" href="">Layout e media query</a>. [/tip]
