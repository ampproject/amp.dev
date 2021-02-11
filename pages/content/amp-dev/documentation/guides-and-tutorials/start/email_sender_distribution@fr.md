---
'$title': "S'inscrire à la distribution des expéditeurs"
$order: 1
description: "S'inscrire à la distribution des expéditeurs d'e-mails AMP"
'$category': Start
formats:
  - email
author: CrystalOnScript
---

Les clients de messagerie nécessitent l'enregistrement de l'expéditeur pour afficher les e-mails AMP aux utilisateurs. Suivez ce guide pour que votre adresse d'expéditeur soit répertoriée sur les clients pris en charge !

# Créez et envoyez un e-mail AMP prêt pour la production

Vous devez comprendre et vous conformer au format d'e-mail AMP. Les e-mails doivent :

- Passer [SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) avec le TLD correspondant avec l’adresse "De :"
- Avoir une partie MIME "text/html" de secours
- Satisfaire toutes les exigences de l'expéditeur du client

Envoyez un e-mail AMP prêt pour la production aux adresses suivantes :

- ampverification@yahoo.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# Remplissez le formulaire global

Vous devez remplir le formulaire [AMP pour e-mail: enregistrement de l'envoyeur](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628). C'est le seul formulaire que vous devez remplir pour être autorisé(e) à envoyer des e-mails AMP pour tous les clients de messagerie pris en charge.

# Respectez les politiques de confidentialité

Vous devez respecter la politique de confidentialité de chaque client.

**Gmail**

[Conditions de confidentialité de Google](https://policies.google.com/privacy)

**Mail.ru**

- [Utilisateurs basés hors de la Russie](https://help.mail.ru/engmail-help/privacy)
- [Utilisateurs basés en Russie](https://agent.mail.ru/legal/privacypolicy/en)

**Verizon Media (Yahoo Mail)**

- [Politique de confidentialité de Verizon Media - États-Unis](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- Pour les autres pays, veuillez visiter [cette page](https://www.verizonmedia.com/policies/).

# Confirmation

Chaque client de messagerie vous informera de l'état de votre liste d'autorisation par e-mail. Si vous rencontrez des problèmes, veuillez contacter le groupe de travail AMP pour e-mail via [GitHub](https://github.com/ampproject/wg-amp4email).

# Ajoutez le support de votre client

Si vous êtes un client de messagerie intéressé par l'ajout de la prise en charge d'AMP pour les e-mails, veuillez [contacter l'équipe sur GitHub](https://github.com/ampproject/wg-amp4email/) !
