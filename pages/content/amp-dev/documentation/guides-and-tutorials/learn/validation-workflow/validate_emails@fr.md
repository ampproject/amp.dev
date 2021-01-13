---
"$title": Comment valider les e-mails AMP
"$order": '1'
author: CrystalOnScript
formats:
- email
---

Les e-mails AMP dépendent de la bibliothèque AMP JS pour offrir des expériences interactives, dynamiques et riches aux lecteurs. C'est pourquoi les fournisseurs de messagerie exigent que vos messages soient validés. Un balisage AMP valide garantit que vos e-mails sont sécurisés et dépassent les normes d'expérience utilisateur.

# Comment vérifier si mon e-mail AMP est valide?

Il existe plusieurs façons de valider un e-mail en tant qu'e-mail AMP valide. Ils produiront tous exactement le même résultat, alors choisissez celui qui convient le mieux à votre style de développement!

## Validateur Web

Le [validateur Web](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) AMP prend en charge la plate-forme AMP pour e-mails. Utilisez le validateur Web en collant votre e-mail AMP dans l'outil. Il signalera toutes les erreurs du validateur directement de manière intégrée.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Validateur de ligne de commande

Vous pouvez valider les fichiers d'e-mails AMP à l'aide de [l'outil de ligne de commande HTML AMP validator](https://www.npmjs.com/package/amphtml-validator).

### Installation

1. Assurez-vous que vous avez [Node.js avec son gestionnaire de package « npm »](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) sur votre système.
2. Installez l'outil de ligne de commande HTML AMP validator en exécutant la commande suivante: `npm install -g amphtml-validator`.

### Utilisation

Après avoir installé l'outil de ligne de commande, exécutez la commande suivante après avoir remplacé `<amphtml file>` par votre fichier comportant le contenu de l'e-mail AMP.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Si l'e-mail est valide, l'outil de ligne de commande affichera `PASS`. S'il n'est pas valide, il retournera avec les erreurs qu'il a trouvées.

## Playground AMP

Vous pouvez également valider les e-mails AMP à l'aide du [playground AMP](https://playground.amp.dev/?runtime=amp4email). Tout comme pour le validateur Web, collez votre e-mail AMP dans l'outil et le playground signalera toutes les erreurs du validateur directement en ligne.

### Comment valider les e-mails livrés

Parfois, vos e-mails AMP livrés peuvent être non valides même si le balisage d'e-mail que vous avez créé a déjà été validé par les outils documentés dans cette page. La raison la plus courante pour cela est que votre [ESP](https://amp.dev/support/faq/email-support/) a modifié votre balisage d'e-mail et l'a rendu non valide après avoir envoyé votre e-mail à votre ESP pour livraison. Par exemple, si votre ESP est SparkPost et que vous n'avez pas configuré les pixels de suivi HTTPS avec SparkPost, SparkPost ajoutera un pixel de suivi HTTP non sécurisé à votre e-mail. Étant donné que les e-mails AMP n'autorisent que les images HTTPS, cela rendra votre e-mail AMP non valide.

Pour vérifier si un e-mail livré dans votre boîte de réception est un e-mail AMP valide:

1. [Téléchargez l'e-mail AMP sous forme de fichier `.eml`](https://www.codetwo.com/kb/export-email-to-file) depuis votre client de messagerie.
2. Ouvrez le [playground AMP](https://playground.amp.dev/?runtime=amp4email).
3. Cliquez sur « IMPORTER E-MAIL » et sélectionnez le fichier `.eml` que vous venez de télécharger.

Le playground importera l'e-mail AMP que vous avez téléchargé dans l'éditeur en ligne et signalera toute erreur de validation.

# Que se passe-t-il si mon e-mail n'est pas valide?

Le validateur AMP n'est pas seulement pratique pour vous pendant le développement; les fournisseurs de messagerie prenant en charge les e-mails AMP utilisent automatiquement sur les types MIME HTML ou texte brut fournis comme solution de secours. Un e-mail AMP ne doit être envoyé que s'il est validé.
