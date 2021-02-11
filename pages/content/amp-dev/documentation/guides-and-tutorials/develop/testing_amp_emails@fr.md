---
'$title': "Test d'e-mails AMP"
$order: 2
'$category': Develop
description: Assurez une excellente expérience utilisateur en testant vos e-mails AMP avant de les envoyer à un large public.
formats:
  - email
author: fstanis
---

Assurez une excellente expérience utilisateur en testant vos e-mails AMP avant de les envoyer à un large public.

## Liste de contrôle pour le test

1. Ajoutez une version HTML et/ou texte brut de votre e-mail AMP. Les clients de messagerie qui ne prennent pas en charge AMP l'afficheront comme solution de secours.
2. Assurez-vous que votre AMP est valide en suivant les étapes décrites dans [Valider les e-mails AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Consultez la section [CSS pris en charge par AMP pour e-mails](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) pour vous assurer que le CSS que vous utilisez est pris en charge par tous les clients de messagerie.
4. Testez votre e-mail dans le [playground AMP](https://playground.amp.dev/?runtime=amp4email) et assurez-vous que toutes les fonctionnalités dynamiques telles que les formulaires fonctionnent correctement.

## Tests spécifiques aux clients de messagerie

Les clients de messagerie prenant en charge AMP fournissent également une documentation destinée aux développeurs qui peut contenir des instructions et des exigences supplémentaires.

### Gmail

La documentation Gmail répertorie les consignes à suivre pour les tests dans la section [Tester vos e-mails AMP dans Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Les utilisateurs de Gmail peuvent utiliser le [playground Gmail AMP pour e-mail](https://amp.gmail.dev/playground/) pour s'envoyer un e-mail à des fins de test.

### Mail.ru

[Les e-mails AMP Mail.ru](https://postmaster.mail.ru/amp) fournissent des informations sur comment activer les tests dans votre compte Mail.ru.

Les utilisateurs de Mail.ru peuvent utiliser le [playground AMP Mail.ru](https://postmaster.mail.ru/amp/playground.html) pour s’envoyer un e-mail à des fins de test.
