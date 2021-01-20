---
"$title": Test delle e-mail AMP
"$order": '2'
"$category": Develop
description: Testando le e-mail AMP prima di inviarle a un vasto pubblico, è possibile garantire la migliore esperienza agli utenti.
formats:
- email
author: fstanis
---

Testando le e-mail AMP prima di inviarle a un vasto pubblico, è possibile garantire la migliore esperienza agli utenti.

## Elenco di controllo dei test

1. Includere una versione HTML e/o in formato testo della e-mail AMP. I client di posta elettronica che non supportano AMP visualizzeranno il formato testo in alternativa.
2. Verificare che il codice AMP sia valido seguendo i passaggi descritti nel documento [Convalida email AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Controllare il documento [CSS supportati da AMP per e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) per verificare che il CSS in uso sia supportato su tutti i client di posta elettronica.
4. Verificare l'e-mail nel [playground AMP](https://playground.amp.dev/?runtime=amp4email) e assicurarsi che tutte le funzionalità dinamiche come i moduli funzionino correttamente.

## Test specifici per client e-mail

I client di posta elettronica che supportano AMP forniscono anche documentazione per gli sviluppatori che può contenere linee guida e requisiti aggiuntivi.

### Gmail

La documentazione di Gmail elenca le linee guida per i test alla pagina [Test delle e-mail AMP in Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Gli utenti di Gmail possono utilizzare [Gmail AMP per E-mail Playground](https://amp.gmail.dev/playground/) per inviarsi e-mail di test.

### Mail.ru

Il documento [E-mail AMP di Mail.ru](https://postmaster.mail.ru/amp) fornisce informazioni su come abilitare i test negli account Mail.ru.

Gli utenti di Mail.ru possono utilizzare [Mail.ru AMP E-mail Playground](https://postmaster.mail.ru/amp/playground.html) per inviarsi e-mail di test.
