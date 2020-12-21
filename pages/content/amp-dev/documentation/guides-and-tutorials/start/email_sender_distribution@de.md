---
"$title": Registrierung für Absenderverteilung
"$order": '1'
description: Registrierung für Absenderverteilung von AMP E-Mails
"$category": Start
formats:
- email
author: CrystalOnScript
---

E-Mail Clients erfordern die Registrierung des Absenders, um Benutzern AMP E-Mails anzuzeigen. Befolge diese Anleitung, damit deine Absenderadresse von Clients mit entsprechender Unterstützung in die Positivliste aufgenommen wird!

# Erstelle und versende produktionsreife AMP E-Mails

Du musst nachweisen, dass du die Anforderungen des AMP E-Mail Formats verstehst und einhältst. E-Mails müssen:

- die Überprüfungen [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) bestehen, wobei die TLD mit der Adresse unter "From:" übereinstimmen muss,
- einen MIME Teil "text/HTML" als Fallback haben,
- alle Anforderungen des Clients an den Absender erfüllen.

Sende eine produktionsreife AMP E-Mail an die folgenden Adressen:

- ampverification@yahoo.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# Fülle das globale Formular aus

Du musst das Formular [AMP for Email: Sender Registration form](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628) ausfüllen. Das ist das einzige Formular, das du ausfüllen musst, um in die Positivliste aller E-Mail Clients mit entsprechender Unterstützung aufgenommen zu werden und AMP E-Mails versenden zu können.

# Befolge die Datenschutzrichtlinien

Du musst die Datenschutzrichtlinien aller Clients befolgen.

**Gmail**

[Google Datenschutzerklärung & Nutzungsbedingungen](https://policies.google.com/privacy)

**Mail.ru**

- [Benutzer außerhalb von Russland](https://help.mail.ru/engmail-help/privacy)<br>
- [Benutzer in Russland](https://agent.mail.ru/legal/privacypolicy/en)<br>

**Verizon Media (Yahoo Mail)**

- [Verizon Media Privacy Policy - US](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- Die Richtlinien für andere Länder findest du [hier](https://www.verizonmedia.com/policies/).

# Bestätigung

Jeder E-Mail Client benachrichtigt dich per E-Mail über deinen Status auf der Positivliste. Bei Problemen wende dich bitte über [GitHub](https://github.com/ampproject/wg-amp4email) an die Arbeitsgruppe "AMP for Email".

# Unterstützung für deinen Client

Wenn du einen eigenen E-Mail Client hast und AMP für E-Mails unterstützen möchtest, [kontaktiere bitte das Team auf GitHub](https://github.com/ampproject/wg-amp4email/)!
