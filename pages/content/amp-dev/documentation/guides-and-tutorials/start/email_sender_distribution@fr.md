---
"$title": "S'inscrire à la distribution des expéditeurs"
"$order": '1'
description: "S'inscrire à la distribution des expéditeurs d'e-mails AMP"
"$category": Start
formats:
- email
author: CrystalOnScript
---

Les clients de messagerie nécessitent l'enregistrement de l'expéditeur pour afficher les e-mails AMP aux utilisateurs. Suivez ce guide pour que votre adresse d'expéditeur soit répertoriée sur les clients pris en charge !

# Créez et envoyez un e-mail AMP prêt pour la production

You must demonstrate an understanding and compliance of the AMP email format. Emails must:

- Passer [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) avec le TLD correspondant avec l’adresse "De :"
- Have a fallback "text/html" MIME part
- Satisfaire toutes les exigences de l'expéditeur du client

Envoyez un e-mail AMP prêt pour la production aux adresses suivantes :

- amphtmltest@outlook.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# Remplissez le formulaire global

You must fill out the [AMP for Email: Sender Registration form](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628). This is the only form you need to fill out to be allowlisted to send AMP emails for all supporting email clients.

# Respectez les politiques de confidentialité

Vous devez respecter la politique de confidentialité de chaque client.

**Gmail**

[Conditions de confidentialité de Google](https://policies.google.com/privacy)

**Mail.ru**

- [Non-Russian based users](https://help.mail.ru/engmail-help/privacy)
- [Utilisateurs basés en Russie](https://agent.mail.ru/legal/privacypolicy/en)

**Microsoft**

[Déclaration de confidentialité de Microsoft](https://privacy.microsoft.com/en-us/privacystatement)

**Verizon Media (Yahoo Mail)**

- [Politique de confidentialité de Verizon Media - États-Unis](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- Pour les autres pays, veuillez visiter [cette page](https://www.verizonmedia.com/policies/).

# Confirmation

Each email client will notify you of your allowlist status via email. If you have any issues please reach out to the AMP for Email Working Group via [GitHub](https://github.com/ampproject/wg-amp4email).

# Ajoutez le support de votre client

Si vous êtes un client de messagerie intéressé par l'ajout de la prise en charge d'AMP pour les e-mails, veuillez [contacter l'équipe sur GitHub](https://github.com/ampproject/wg-amp4email/) !
