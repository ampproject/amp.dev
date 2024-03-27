---
'$title': Добавление AMP в существующие письма
$order: 1
author: CrystalOnScript
formats:
  - email
---

Il formato AMP per e-mail è integrato come una nuova parte MIME. Se la tua e-mail viene inviata a un fonitore che supporta contenuti AMP per e-mail, verrà visualizzata correttamente. In caso contrario, non ti preoccupare! Il fornitore visualizzerà il relativo codice HTML o il formato in testo semplice. Usa questa guida per includere contenuti AMP nelle tue e-mail.

# Inclusione della parte MIME AMP

La struttura dell'e-mail è un [albero MIME](https://en.wikipedia.org/wiki/MIME), che contiene il corpo del messaggio e-mail e gli eventuali allegati. Per includere contenuti AMP nelle tue e-mail, dovrai aggiungere una nuova parte MIME con il tipo di contenuto `text/x-amp-html`.

La parte MIME AMP deve essere inserita sotto un nodo `multipart/alternative` e coesistere con le eventuali parti `text/html` o `text/plain` già esistenti. Questo garantisce che i messaggi e-mail saranno riprodotti su tutti i client.

```html
From: Persona A
<persona@example.com>
  To: Persona B
  <personb@example.com>
    Subject: Un'e-mail AMP! Content-Type: multipart/alternative;
    boundary="001a114634ac3555ae05525685ae" --001a114634ac3555ae05525685ae
    Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes Ciao
    mondo in testo semplice! --001a114634ac3555ae05525685ae Content-Type:
    text/x-amp-html; charset="UTF-8"

    <!DOCTYPE html>
    <html ⚡4email data-css-strict>
      <head>
        <meta charset="utf-8" />
        <style amp4email-boilerplate>
          body {
            visibility: hidden;
          }
        </style>
        <script async src="https://ampjs.org/v0.js"></script>
      </head>
      <body>
        Ciao mondo in AMP!
      </body>
    </html>
    --001a114634ac3555ae05525685ae-- Content-Type: text/html; charset="UTF-8"

    <span>Ciao mondo in HTML!</span>
    --001a114634ac3555ae05525685ae</personb@example.com
  ></persona@example.com
>
```

[tip type="important"] Alcuni client di posta elettronica riprodurranno solo l'ultima parte MIME. Per garantire il rendering di un'e-mail, posizionare la parte MIME `text/x-amp-html` prima della parte MIME `text/html`. [/tip]

# Cosa succede quando i destinatari inoltrano o rispondono a un'e-mail AMP?

Quando un utente inoltra o risponde a un'e-mail AMP, la parte `text/x-amp-html` dell'albero MIME viene rimossa. Ecco perché è importante fornire contenuti alternativi nella parte HTML, anche quando si inviano e-mail AMP a client che supportano il relativo tipo MIME.
