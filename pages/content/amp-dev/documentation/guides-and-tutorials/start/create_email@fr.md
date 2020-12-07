---
"$title": Create your first AMP Email
"$order": '0'
description: Learn what makes AMP emails different by creating your first email.
tutorial: 'true'
formats:
- email
author: CrystalOnScript
---

AMP pour e-mail permet aux expéditeurs d'e-mails d'utiliser AMP dans leurs e-mails pour prendre en charge une multitude de nouvelles fonctionnalités. Les e-mails écrits avec AMP peuvent contenir des éléments interactifs, tels que des carrousels d'images ou des accordéons, le maintien à jour du contenu du message et la possibilité pour les destinataires d'agir, par exemple en répondant à un formulaire sans quitter leur boîte de réception.

AMP pour e-mail est compatible avec les e-mails existants. La version AMP du message est intégrée dans l'e-mail en tant que nouvelle partie MIME, en plus du HTML et du texte brut, garantissant la compatibilité entre tous les clients de messagerie.

Conseil : pour obtenir une liste des plateformes de messagerie (ESP), clients et fournisseurs qui prennent en charge AMP e-mail, reportez-vous à la section [Plateformes de messagerie prises en charge](../../../support/faq/email-support.md) dans la FAQ.

Follow this tutorial to build and send your first dynamic email powered by AMP. You can view the finished code [here](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Commencez avec le modèle AMP

Le Playground AMP prend en charge le format AMP pour e-mail, ce qui vous permet de développer, tester et valider vos e-mails AMP. Ouvrez le [playground AMP](https://playground.amp.dev/?runtime=amp4email) et assurez-vous que le format est défini sur `AMP for Email` dans le coin supérieur gauche. Vous devriez voir le code suivant :

```html
<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
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

It contains all the required markup and the minimum code to be a valid AMP email. Also note the many other examples of valid email templates in the drop down list on the top right drop down menu.

Let's take a moment to call out some notable differences from classic HTML emails:

- AMP emails must identify themselves as such by including `⚡4email`, or `amp4email`, in the html tag.
- The `<head>` tag must also contain a `<script>` tag that loads the AMP runtime. `<script async src="https://cdn.ampproject.org/v0.js"></script>`
- Un modèle passe-partout CSS pour masquer initialement le contenu jusqu'à ce qu'AMP soit chargé. `<style amp4email-boilerplate>body{visibility:hidden}</style>`

If you have worked with emails before, the idea of placing a script into an email may set off alarm bells in your head! Rest assured, email providers who support AMP emails enforce fierce security checks that only allow vetted AMP scripts to run in their clients. This enables dynamic and interactive features to run directly in the recipients mailboxes with no security vulnerabilities! Read more about the required markup for AMP Emails here.

[tip type="important"] Only AMP scripts for [supported components](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) can be included in AMP Emails. [/tip]

# Include an image

Most HTML tags that are used in emails can be used in AMP emails. However, some tags, such as the `<img>` tag are replaced with an AMP equivalent, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

The `<amp-img>` tag requires the width and height of an image is defined and unlike `<img>`, `<amp-img>` has to be explicitly closed via `</amp-img>`.

```html
<amp-img src="https://link/to/img.jpg"
         alt="photo description"
         width="100"
         height="100">
</amp-img>
```

Additionally, GIF files are supported through [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Since emails are not hosted on your server, URLs must use absolute paths in AMP emails and must be HTTPS.

[Placekitten](https://placekitten.com/) est un site Web qui utilise des images de chatons comme caractères de remplacement. Ils vous permettent de choisir la taille d'une image directement dans l'URL !

We can include an image in our first email by adding the code below.

```html
<body>
  <amp-img src="https://placekitten.com/800/400"
           alt="Welcome"
           width="800"
           height="400">
  </amp-img>
</body>
```

## Make it responsive

Emails are viewed across a variety of devices and screen sizes, and AMP comes with a built-in layout system! With the [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) system and media queries, implementing responsive emails is easy. To size our placed kitten image to the appropriate screens, add the `layout="responsive"` attribute to your `<amp-image>`.

[tip type="read-on"] [En savoir plus sur le fonctionnement d'AMP avec les requêtes de mise en page et multimédias](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Agrandissez et réduisez la fenêtre du navigateur pour voir l'image se redimensionner ! Consultez la [liste des composants spécifiques à la mise en page pris en charge ici](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Modify presentation and layout

Une image, c'est bien, mais que faire si nous voulons en afficher davantage ? AMP pour e-mail prend en charge les éléments de mise en page, tels que les accordéons et les barres latérales.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

For this tutorial, we're going to use [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) to display photos of cats up for adoption.

Add the `amp-carousel` script to the head of your email.

```html
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

Then wrap our first image in the `<amp-carousel>` tags.

```html
<amp-carousel layout="responsive"
              width="800"
              height="400"
              type="slides">
        <amp-img layout="fill" src="https://placekitten.com/800/400"  alt="Welcome" height="400" width="800"></amp-img>
</amp-carousel>
```

You might notice that nothing has changed, and that's a good thing! Our carousel has been given the attribute `type=slides`, which means it will show one photo at a time. Since we've only placed one photo within the tags it doesn't give the user slider arrows.

Next, replace the place kitten image with our AMP cats up for adoption inside your `<amp-carousel>`.

```html
<amp-carousel id="carousel-with-preview"
    width="800"
    height="400"
    layout="responsive"
    type="slides"
    on="slideChange:AMP.setState({currentCat: event.index})">
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"  alt="photo courtesy of Unsplash"></amp-img>
 </amp-carousel>
```

You should now be able to change photos by clicking the navigation arrows on the left or right hand sides of the carousel!

## Send with style

AMP allows for styling in the head of the document within the `<style amp-custom>` tag. Additionally, previously banned CSS classes and pseudo-classes are now usable. [Read the full list here](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Let's update `Hello, AMP4EMAIL world` to a real title.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

And then add some styling into the head.

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

# Add Dynamic Capabilities

En général, les e-mails autorisent uniquement du contenu statique. Grâce à AMP, les e-mails sont ouverts à un tout nouveau monde de possibilités ! Les utilisateurs peuvent désormais répondre aux [formulaires](/content/amp-dev/documentation/components/reference/amp-form.md), obtenir le [contenu mis à jour dynamiquement](/content/amp-dev/documentation/components/reference/amp-list.md) et interagir avec le contenu.

In this tutorial, we'll use [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) to display our adoptable cat's name and a description when the user is on that cat's slide. Start by including the `amp-bind` script in the head of your email.

```html
 <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

Next, we'll declare an AMP bind variable "myState" as a JSON string inside an [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state) tag. Since we have four cat photos, we'll include state for all four.

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
```

[Les actions et événements AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) déclenchent différents états. Dans notre cas, nous voulons mettre à jour l'état lorsque l'utilisateur clique sur les flèches de navigation du carrousel. amp-carousel déclenche un événement [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides), sur lequel nous mettrons à jour la variable `currentCat` en utilisant `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel width="800"
              height="400"
              layout="responsive"
              type="slides"
              on="slideChange:AMP.setState({ currentCat: event.index} )">
  ...
</amp-carousel>
```

This code set the state of `currentCat` to match the cat photo at the carousel index. So if we are at slide `event.index=2`, the state will map to the item in index 2 of the array.

The only thing left is to display our cat's name and descriptions. Add the following code under the closing `amp-carousel` tag.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

The `amp-bind` extension uses [expressions](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) and [bindings](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) to change content dynamically. The code example above uses the `[text]` binding to update the text within the `<span>` tag each time the state is changed by evaluating the `"myState.cats[currentCat].name"` expression.

[tip type="note"] For performance and to avoid the risk of unexpected content jumping, amp-bind does not evaluate expressions on page load. This means that the visual elements should be given a default state and not rely amp-bind for initial render. [/tip]

Don't forget to add our cat descriptions after the `</div>` tag!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Now, when you change the cat photo in the carousel, their name and description should update too!

# Send your AMP email

To learn how to send your email to your inbox, [read more about testing AMP emails](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Congratulations! You've sent your first AMP email!

Pour les étapes suivantes, consultez [en savoir plus sur les principes de base d'AMP pour e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
