---
$title: Registrazione per la distribuzione da parte dei mittenti
$order: 1
description: Registrazione per la distribuzione da parte del mittente delle email AMP
$category: Inizio
author: CrystalOnScript
---

I client di posta elettronica richiedono la registrazione del mittente per visualizzare le e-mail AMP agli utenti. Segui questa guida per inserire il tuo indirizzo mittente nell'elenco dei consentiti sui client supportati!

# Creazione e invio di e-mail AMP pronte per la produzione

Occorre conoscere e rispettare il formato delle e-mail AMP. Le e-mail devono:

- Trasmettere [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) con TLD corrispondente con indirizzo "Da:"
- Avere una parte MIME "text/html" di fallback
- Rispettare tutti i requisiti del mittente del client

Inviare un'email AMP pronta per la produzione ai seguenti indirizzi:

- amphtmltest@outlook.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# Compilare il modulo globale

È necessario compilare il documento [AMP per E-mail: modulo di registrazione del mittente](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628). Questo è l'unico modulo da compilare per essere autorizzato a inviare e-mail AMP con tutti i client di posta elettronica supportati.

# Rispettare le norme sulla privacy

È necessario rispettare le norme sulla privacy di ogni client.

**Gmail**

[Google: Privacy e Condizioni](https://policies.google.com/privacy)

**Mail.ru**

- [Utenti non residenti in Russia](https://help.mail.ru/engmail-help/privacy)
- [Utenti residenti in Russia](https://agent.mail.ru/legal/privacypolicy/en)

**Microsoft**

[Informativa sulla privacy di Microsoft](https://privacy.microsoft.com/en-us/privacystatement)

**Verizon Media (Yahoo Mail)**

- [Informativa sulla privacy di Verizon Media - USA](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- Per altri paesi, visitare [questa pagina](https://www.verizonmedia.com/policies/).

# Conferma

Ogni client di posta elettronica ti avviserà dello stato del tuo elenco di autorizzazioni tramite e-mail. In caso di problemi, contattare il gruppo di lavoro AMP per E-mail tramite [GitHub](https://github.com/ampproject/wg-amp4email).

# Aggiungere il supporto del proprio client

Se sei il gestore di un client di posta elettronica interessato a supportare AMP per e-mail, [contatta il nostro team su GitHub](https://github.com/ampproject/wg-amp4email/)!
