---
'$title': Intégrer des stories dans des pages Web
$order: 3
description: 'Le '
formats:
  - websites
  - stories
---

Les stories sont des contenus immersifs en plein écran. Elles sont hébergées sur le Web ouvert avec leur propre URL, ce qui permet de les partager facilement. Mais que faire si vous souhaitez intégrer des stories dans votre propre site, par exemple dans un blog, une description de produit ou un article de presse?

Lecteur de story AMP vous permet d'intégrer sur une page Web des stories sur lesquelles les utilisateurs peuvent appuyer ou cliquer. Suivez ce guide détaillé pour savoir comment procéder.

# Afficher des stories dans une page non AMP

Vous pouvez intégrer des stories AMP dans une page non-AMP, permettant aux utilisateurs d'appuyer ou de cliquer dessus sans quitter le document hôte!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## Intégrer le lecteur de story AMP

L'affichage d'une story AMP dans une page non-AMP nécessite l'utilisation de l'élément [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md).

### Importer des scripts

Incluez les deux scripts requis dans l'en-tête de votre document:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

Le premier script importe la logique du lecteur et le second définit le style par défaut.

### Spécifier une story

Incluez l'élément `<amp-story-player>` dans le `body` du document. Spécifiez ensuite la story souhaitée en plaçant une balise `<a>` dans l'élément `<amp-story-player>`. Pointez l'attribut `href` vers l'emplacement de la story. L'attribut `href` peut pointer vers l'URL d'une story hébergée ou un chemin relatif. Placez le titre de la story dans les balises `<a>`.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### Dimensionner le lecteur

Vous pouvez définir la largeur `width` , la hauteur `height` et d'autres styles du lecteur de story intégré ou comme vous le feriez pour le style de tout autre élément.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

Nous vous recommandons de conserver un format 3: 5 pour une meilleure expérience utilisateur, mais vous pouvez définir la largeur et la hauteur qui vous conviennent.

#### Dimensionnement réactif

La réactivité du lecteur de story fonctionne comme n'importe quel autre élément de bloc. Utilisez CSS pour conserver les ratios de largeur et de hauteur, comme dans l'exemple ci-dessous:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### Fournir un caractère de remplcaement

Ajoutez une image d'affiche représentative en ajoutant une balise `<img>` en tant qu'enfant de la balise `<a>` de la story avec la configuration suivante. Le lecteur de story AMP affiche cette image lors du chargement de la story complète.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

Pour une meilleure expérience utilisateur, nous vous recommandons fortement d'inclure une image d'affiche. Si vous n'incluez pas d'image d'affiche, le lecteur de story affichera une roulette de chargement avec un arrière-plan gris.

## Intégrer plusieurs stories

Vous pouvez ajouter plusieurs stories dans le même élément `<amp-story-player>` en définissant plusieurs balises `<a>`. Le lecteur présente la page de couverture de la deuxième story après que l'utilisateur a cliqué sur la première.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

Vous pouvez intégrer autant d'instances de `<amp-story-player>` que vous le souhaitez. Elles s'affichent en tant que visionneuses individuelles.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Afficher des stories dans une page AMP

Pour utiliser le composant `<amp-story-player>` dans les pages AMP, lisez la documentation de la [version AMP de amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories).
