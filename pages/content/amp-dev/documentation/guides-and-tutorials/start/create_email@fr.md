---
'$title': Créer votre premier e-mail AMP
$order: 0
description: Découvrez ce qui différencie les e-mails AMP en créant votre premier e-mail.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

AMP pour e-mail permet aux expéditeurs d'e-mails d'utiliser AMP dans leurs e-mails pour prendre en charge une multitude de nouvelles fonctionnalités. Les e-mails écrits avec AMP peuvent contenir des éléments interactifs, tels que des carrousels d'images ou des accordéons, le maintien à jour du contenu du message et la possibilité pour les destinataires d'agir, par exemple en répondant à un formulaire sans quitter leur boîte de réception.

AMP pour e-mail est compatible avec les e-mails existants. La version AMP du message est intégrée dans l'e-mail en tant que nouvelle partie MIME, en plus du HTML et du texte brut, garantissant la compatibilité entre tous les clients de messagerie.

Conseil : pour obtenir une liste des plateformes de messagerie (ESP), clients et fournisseurs qui prennent en charge AMP e-mail, reportez-vous à la section [Plateformes de messagerie prises en charge](../../../support/faq/email-support.md) dans la FAQ.

Suivez ce tutoriel pour créer et envoyer votre premier e-mail dynamique optimisé par AMP. Vous pouvez voir le code terminé [ici](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Commencez avec le modèle AMP

Le Playground AMP prend en charge le format AMP pour e-mail, ce qui vous permet de développer, tester et valider vos e-mails AMP. Ouvrez le [playground AMP](https://playground.amp.dev/?runtime=amp4email) et assurez-vous que le format est défini sur `AMP for Email` dans le coin supérieur gauche. Vous devriez voir le code suivant :

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
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Il contient tout le balisage requis et le code minimum pour constituer un e-mail AMP valide. Notez également les nombreux autres exemples de modèles de courrier électronique valides dans la liste déroulante du menu déroulant en haut à droite.

Prenons un moment pour souligner quelques différences notables par rapport aux e-mails HTML classiques :

- Les e-mails AMP doivent s'identifier comme tels en incluant `⚡4email`, ou `amp4email`, dans la balise html.
- La section `<head>` doit également contenir un `<script>` qui charge le moteur d'exécution AMP. `<script async src="https://ampjs.org/v0.js"></script>`
- Un modèle passe-partout CSS pour masquer initialement le contenu jusqu'à ce qu'AMP soit chargé. `<style amp4email-boilerplate>body{visibility:hidden}</style>`

Si vous avez déjà travaillé avec des e-mails, l'idée de placer un script dans un e-mail peut déclencher une alarme dans votre tête ! Rassurez-vous, les fournisseurs de messagerie qui prennent en charge les e-mails AMP appliquent des contrôles de sécurité féroces qui n'autorisent que les scripts AMP approuvés à s'exécuter dans leurs clients. Cela permet aux fonctionnalités dynamiques et interactives de s'exécuter directement dans les boîtes aux lettres des destinataires sans aucune vulnérabilité de sécurité ! En savoir plus sur le balisage requis pour les e-mails AMP ici.

[tip type="important"] Seuls les scripts AMP des [composants pris en charge](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) peuvent être inclus dans les e-mails AMP. [/tip]

# Inclure une image

La plupart des balises HTML utilisées dans les e-mails peuvent être utilisées dans les e-mails AMP. Cependant, certaines balises, telles que `<img>` sont remplacées par un équivalent AMP, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

La balise `<amp-img>` nécessite que la largeur et la hauteur d'une image soient définies et contrairement à `<img>`, `<amp-img>` doit être explicitement fermé via `</amp-img>`.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

De plus, les fichiers GIF sont pris en charge via [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Étant donné que les e-mails ne sont pas hébergés sur votre serveur, les URL doivent utiliser des chemins absolus dans les e-mails AMP et doivent être HTTPS.

[Placekitten](https://placekitten.com/) est un site Web qui utilise des images de chatons comme caractères de remplacement. Ils vous permettent de choisir la taille d'une image directement dans l'URL !

Nous pouvons inclure une image dans notre premier e-mail en ajoutant le code ci-dessous.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Rendez l'ensemble réactif

Les e-mails sont affichés sur une variété d'appareils et de tailles d'écran, et AMP est livré avec un système de mise en page intégré ! Avec le système [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) et les requêtes multimédias, la mise en œuvre d'e-mails réactifs est facile. Pour dimensionner notre image de chaton placée sur les écrans appropriés, ajoutez l'attribut `layout="responsive"` à votre `<amp-image>` .

[tip type="read-on"] [En savoir plus sur le fonctionnement d'AMP avec les requêtes de mise en page et multimédias](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Agrandissez et réduisez la fenêtre du navigateur pour voir l'image se redimensionner ! Consultez la [liste des composants spécifiques à la mise en page pris en charge ici](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Modifier la présentation et la mise en page

Une image, c'est bien, mais que faire si nous voulons en afficher davantage ? AMP pour e-mail prend en charge les éléments de mise en page, tels que les accordéons et les barres latérales.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

Pour ce tutoriel, nous allons utiliser [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) pour afficher des photos de chats à adopter.

Ajoutez le script `amp-carousel` en tête de votre e-mail.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Ensuite, enveloppez notre première image dans les balises `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Vous remarquerez peut-être que rien n'a changé, et c'est une bonne chose ! Notre carrousel a reçu l'attribut `type=slides`, ce qui signifie qu'il affichera une photo à la fois. Puisque nous n'avons placé qu'une seule photo dans les balises, cela ne fournit pas de flèches de curseur à l'utilisateur.

Ensuite, remplacez l'image du chaton par nos chats AMP à adopter dans votre `<amp-carousel>`.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Vous devriez maintenant pouvoir changer de photo en cliquant sur les flèches de navigation sur les côtés gauche ou droit du carrousel !

## Envoyer avec un style

AMP permet de styliser la tête du document dans `<style amp-custom>`. De plus, les classes CSS et pseudo-classes précédemment interdites sont désormais utilisables. [Lisez la liste complète ici](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Mettons à jour `Hello, AMP4EMAIL world` comme un vrai titre.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

Et puis ajoutons un peu de style dans la tête.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Ajouter des capacités dynamiques

En général, les e-mails autorisent uniquement du contenu statique. Grâce à AMP, les e-mails sont ouverts à un tout nouveau monde de possibilités ! Les utilisateurs peuvent désormais répondre aux [formulaires](/content/amp-dev/documentation/components/reference/amp-form.md), obtenir le [contenu mis à jour dynamiquement](/content/amp-dev/documentation/components/reference/amp-list.md) et interagir avec le contenu.

Dans ce tutoriel, nous utiliserons [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) pour afficher le nom de notre chat à adopter et une description lorsque l'utilisateur consulte la diapositive de ce chat. Commencez par inclure le script `amp-bind` dans la tête de votre e-mail.

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

Ensuite, nous déclarerons une variable de liaison AMP "myState" en tant que chaîne JSON dans une [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Puisque nous avons quatre photos de chat, nous inclurons l'état pour les quatre.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[Les actions et événements AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) déclenchent différents états. Dans notre cas, nous voulons mettre à jour l'état lorsque l'utilisateur clique sur les flèches de navigation du carrousel. amp-carousel déclenche un événement [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides), sur lequel nous mettrons à jour la variable `currentCat` en utilisant `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

Ce code définit l'état de `currentCat` pour qu'il corresponde à la photo du chat dans l'index du carrousel. Donc, si nous sommes à la diapositive `event.index=2`, l'état correspondra à l'élément dans l'index 2 du tableau.

La seule chose qui reste à faire est d'afficher le nom et les descriptions de notre chat. Ajoutez le code suivant sous la balise de fermeture `amp-carousel`.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

L'extension `amp-bind` utilise des [expressions](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) et des [liaisons](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) pour modifier le contenu de manière dynamique. L'exemple de code ci-dessus utilise la liaison `[text]` pour mettre à jour le texte dans `<span>` chaque fois que l'état est modifié en évaluant `"myState.cats[currentCat].name"`.

[tip type="note"] Pour les performances et pour éviter le risque de saut de contenu inattendu, amp-bind n'évalue pas les expressions lors du chargement de la page. Cela signifie que les éléments visuels doivent avoir un état par défaut et ne pas compter sur amp-bind pour le rendu initial. [/tip]

N'oubliez pas d'ajouter nos descriptions de chats après `</div>` !

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Désormais, lorsque vous modifiez la photo du chat dans le carrousel, son nom et sa description doivent également être mis à jour !

# Envoyer votre e-mail AMP

Pour savoir comment envoyer votre e-mail dans votre boîte de réception, consultez [en savoir plus sur le test des e-mails AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Félicitations ! Vous avez envoyé votre premier e-mail AMP !

Pour les étapes suivantes, consultez [en savoir plus sur les principes de base d'AMP pour e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
