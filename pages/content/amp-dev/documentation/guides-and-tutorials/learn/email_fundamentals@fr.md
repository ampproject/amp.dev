---
'$title': 'AMP pour e-mail: fondamentaux'
$order: 1
description: "Tout ce que vous devez savoir pour vous lancer dans la rédaction d'e-mails AMP valides."
author: CrystalOnScript
formats:
  - email
---

Bonne nouvelle pour les habitués d'AMP! AMP pour e-mail n'est qu'un sous-ensemble de la bibliothèque HTML AMP. Si vous n'êtes pas familier avec AMP, nous avons également une bonne nouvelle! Ce guide vous fournit l'essentiel pour commencer à rédiger des e-mails AMP valides!

## Balisage requis

Les e-mails AMP ressemblent aux e-mails HTML classiques, mais contiennent quelques différences. Vous trouverez ci-dessous le nombre minimum de balises requis pour transformer un e-mail en e-mail AMP valide.

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

Les fournisseurs de messagerie qui prennent en charge les e-mails AMP ont mis en place des contrôles de sécurité pour garantir aux utilisateurs une expérience agréable et sûre. Un e-mail créé avec AMP doit répondre à toutes les exigences:

- Commencer par le `<!doctype html>`. Ceci est également la norme pour HTML.
- Contenir une balise `<html amp4email>` de niveau supérieur ou une balise `<html ⚡4email>` si votre e-mail est hyper cool. Cela identifie le document comme un e-mail AMP afin qu'il puisse être traité comme tel.
- Définir les balises `<head>` et `<body>`. Ceci est facultatif en HTML, mais AMP gère les choses en grand!
- Inclure une balise ` <meta charset="utf-8">` comme premier enfant de la balise `<head>`.
- La bibliothèque AMP est importée via une balise `<script async src="https://ampjs.org/v0.js"></script>` placée dans `<head>`. Sans cela, aucune des fonctionnalités impressionnantes et dynamiques obtenues grâce à AMP ne fonctionnera! Une bonne pratique est de l'inclure le plus tôt possible dans `<head>`, directement sous `<meta charset="utf-8">` .
- Masquez initialement le contenu de l'e-mail jusqu'à ce que la bibliothèque AMP soit chargée en plaçant le modèle AMP pour e-mail dans `<head>`.

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### Remplacements de balises spécifiques à AMP

Étant donné que la bibliothèque AMP pour e-mails est un sous-ensemble de la bibliothèque HTML AMP, la plupart des mêmes règles s'appliquent; les balises spécifiques AMP remplacent les balises HTML lourdes en ressources et nécessitent une largeur et une hauteur définies. Cela permet au modèle AMP de masquer le contenu jusqu'à ce qu'il ait une idée de son apparence sur l'appareil de l'utilisateur.

#### Images

Pour harmoniser efficacement la page, toutes les balises `<img>` sont remplacées par [`<amp-img>`](../../../documentation/components/reference/amp-img.md). La balise `<amp-img>` nécessite une largeur et une hauteur définies et prend en charge [le système de mise en page AMP](amp-html-layout/index.md)

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

La balise `<amp-img>` est fournie avec des moyens puissants et intégrés pour contrôler la conception réactive et définir des solutions de secours.

[tip type="note"] En savoir plus sur l'utilisation de [la mise en page AMP et les requêtes multimédias](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) et comment définir des [images de secours](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

#### GIF

AMP a conçu [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), une balise spécifique pour les images GIF qui permet au runtime AMP de réduire l'utilisation du processeur lorsque l'animation est hors écran. Tout comme `<amp-img>`, la largeur et la hauteur sont définies et l'élément doit inclure une balise fermante.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

En outre, il prend en charge un `placeholder` enfant facultatif à afficher pendant le chargement du fichier `src` et prend en charge le système de disposition AMP.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Des e-mails stylés <a name="emails-with-style"></a>

Comme tous les clients de messagerie, AMP permet des attributs `style` intégrés, mais prend également en charge CSS dans la balise `<style amp-custom>` dans l'en-tête de l'e-mail.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

Comme les e-mails HTML, AMP pour e-mail prend en charge un sous-ensemble limité de sélecteurs et de propriétés CSS.

Consultez la section [CSS pris en charge par AMP pour e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) pour obtenir la liste complète des CSS autorisés sur les clients de messagerie prenant en charge AMP.

[tip type="important"] L'AMP impose une limite de taille de 75 000 octets pour le style. [/tip]

## Composants AMP autorisés

Les fonctionnalités dynamiques, visuelles et interactives des composants AMP sont ce qui font des e-mails AMP le futur de la messagerie électronique.

La liste complète [ des composants pris en charge dans AMP pour e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) est disponible dans les spécifications AMP pour e-mail.

## Authentification des demandes

La personnalisation du contenu d'un e-mail dynamique nécessite souvent l'authentification de l'utilisateur. Cependant, pour protéger les données des utilisateurs, toutes les requêtes HTTP effectuées dans des e-mails AMP peuvent être envoyées par proxy et dépourvues de cookies.

Pour authentifier les requêtes faites à partir des e-mails AMP, vous pouvez utiliser des jetons d'accès.

### Jetons d'accès

Vous pouvez utiliser des jetons d'accès pour authentifier l'utilisateur. Les jetons d'accès sont fournis et vérifiés par l'expéditeur de l'e-mail. L'expéditeur utilise les jetons pour garantir que seules les personnes ayant accès à l'e-mail AMP peuvent effectuer les requêtes contenues dans cet e-mail. Les jetons d'accès doivent être sécurisés par cryptographie et limités dans le temps et dans la portée. Ils sont inclus dans l'URL de la requête.

L'exemple suivant illustre l'utilisation de `<amp-list>` pour afficher des données authentifiées:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

De même, lorsque vous utilisez `<amp-form>`, placez votre jeton d'accès dans l'URL `action-xhr`.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Exemple

L'exemple suivant concerne un service de prise de notes hypothétique qui permet aux utilisateurs connectés d'ajouter des notes à leur compte et de les visualiser ultérieurement. Le service souhaite envoyer un e-mail à un utilisateur, `jane@example.com`, qui comprend une liste de notes qu'il a précédemment prises. La liste des notes de l'utilisateur actuel est disponible au point de terminaison <br>`https://example.com/personal-notes` au format JSON.

Avant d'envoyer l'e-mail, le service génère un jeton d'accès à usage limité sécurisé sur le plan cryptographique pour `jane@example.com: A3a4roX9x`. Le jeton d'accès est inclus dans le nom de champ `exampletoken` dans la requête URL:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

Le point de terminaison `https://example.com/personal-notes` est responsable de la validation du paramètre exampletoken et de la recherche de l'utilisateur associé au jeton.

### Jetons d'accès à usage limité

Les jetons d'accès à usage limité offrent une protection contre l'usurpation de requêtes et les [attaques par relecture](https://en.wikipedia.org/wiki/Replay_attack), garantissant que l'action est effectuée par l'utilisateur auquel le message a été envoyé. La protection est obtenue en ajoutant un paramètre de jeton unique aux paramètres de la requête et en le vérifiant lorsque l'action est appelée.

Le paramètre du jeton doit être généré en tant que clé qui ne peut être utilisée que pour une action spécifique et un utilisateur spécifique. Avant d'exécuter l'action demandée, vous devez vérifier que le jeton est valide et correspond à celui que vous avez généré pour l'utilisateur. Si le jeton correspond, l'action peut être effectuée et le jeton devient invalide pour les demandes futures.

Les jetons d'accès doivent être envoyés à l'utilisateur dans la propriété url de HttpActionHandler. Par exemple, si votre application gère les demandes d'approbation sur `http://www.example.com/approve?requestId=123`, vous devez envisager d'inclure un paramètre `accessToken` supplémentaire et d'écouter les requêtes envoyées à `http://www.example.com/approve?requestId=123&accessToken=xyz`.

La combinaison `requestId=123` et `accessToken=xyz` est celle que vous devez générer à l'avance, en vous assurant que `accessToken` ne peut pas être déduit de `requestId`. Toute demande d'approbation avec `requestId=123` et sans `accessToken` ou avec un `accessToken` qui n'est pas égal à `xyz` doit être rejetée. Une fois cette requête acceptée, toute requête future portant le même identifiant et le même jeton d'accès devrait également être rejetée.

## Test dans différents clients de messagerie

Les clients de messagerie prenant en charge AMP pour e-mail fournissent leur propre documentation et leurs propres outils de test pour vous aider dans votre intégration.

Consultez la section [Test des e-mails AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md) pour plus d'informations et des liens vers la documentation spécifique au client de messagerie.
