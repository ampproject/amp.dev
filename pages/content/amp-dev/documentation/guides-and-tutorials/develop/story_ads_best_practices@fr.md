---
'$title': Bonnes pratiques pour créer une story publicitaire Web
$order: 16
description: "Les stories Web s'affichent en plein écran et plongent les lecteurs dans le contenu. Les annonces qui apparaissent dans les stories Web doivent avoir une conception constante et cohérente avec l'expérience utilisateur des stories Web."
formats:
  - ads
  - stories
---

Les stories Web s'affichent en plein écran et plongent les lecteurs dans le contenu. Les annonces qui apparaissent dans les stories Web doivent avoir une conception constante et cohérente avec l'expérience utilisateur des stories Web. Cela empêche une expérience utilisateur discordante ou interrompue. Ce guide explique comment créer une annonce pour les stories Web.

## Principes des stories publicitaires Web

Les formats d'annonces actuels, tels que les bannières et les encadrés, ne s'intègrent pas bien avec le format des stories AMP. Les publicités classiques sont lentes, interrompues et ne semblent pas adaptées aux stories AMP.

Les annonces Web Story sont conformes aux principes suivants:

- Annonce AMPHTML valide: suivez les mêmes spécifications techniques qu'une [annonce AMPHTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md) classique.
- Visuel d'abord: état d'invitation attrayant, gras et contextuel.
- Native: la page d'annonce a les mêmes dimensions qu'une page de story normale.
- Modèle d'interaction identique: l'utilisateur peut passer à l'écran suivant comme il le ferait avec une page de story normale.
- Rapide: l'annonce ne s'affiche jamais chargée à moitié.

Pour être cohérent avec ces principes, le runtime Web Story détermine le bon emplacement d'une page d'annonce au milieu de la story Web. Vous trouverez plus de détails sur les mécanismes de placement d'annonces dans [Annonces dans les stories Web](advertise_amp_stories.md).

## Exemple d'annonce Web Story

Les annonces Web Story sont des annonces AMPHTML, mais elles comportent des balises de métadonnées, répondent aux spécifications de mise en page définies et aux éléments d'interface utilisateur requis. Une annonce Web Story contient toujours un bouton d'appel à l'action (CTA) et un libellé d'annonce affiché en haut de la page sous forme de texte de clause de non-responsabilité.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Example of an AMP Story ad', caption='Example of an AMP Story ad', align='' ) }}

Pour que l'expérience utilisateur reste cohérente, le runtime Web Story se charge d'afficher le libellé de l'annonce et le bouton CTA.

[tip type="important"] **IMPORTANT:** Seul le bouton CTA est actionnable dans une annonce Web Story; gardez cela à l'esprit lorsque vous développez votre création. [/tip]

## Balises de métadonnées

Les balises de métadonnées spécifient que l'annonce respecte le format Web Story, définit l'énumération du texte du bouton CTA, indique où le bouton dirigera l'utilisateur et le type de page dont il s'agit.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://ampjs.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

Il est recommandé de choisir la balise amp-cta-type parmi les [options de texte disponibles du bouton CTA](#call-to-action-button-text-enum). AMP localisera automatiquement les options prédéfinies le cas échéant.

Vous pouvez utiliser du texte personnalisé, mais vous devrez implémenter votre propre localisation.

## Énumération du texte du bouton d'appel à l'action <a name="call-to-action-button-text-enum"></a>

Le bouton d'appel à l'action peut être configuré à partir d'un ensemble de choix prédéfini:

- `APPLY_NOW`: « Appliquer »
- `BOOK_NOW`: « Réserver »
- `BUY_TICKETS`: « Acheter des tickets »
- `DOWNLOAD`: « Télécharger »
- `EXPLORE`: « Explorer »
- `GET_NOW`: « Obtenir »
- `INSTALL`: « Installer »
- `LISTEN`: « Écouter »
- `MORE`: « Plus »
- `OPEN_APP`: « Ouvrir l'appli »
- `ORDER_NOW`: « Commander »
- `PLAY`: « Jouer »
- `READ`: « Lire »
- `SHOP`: « Acheter »
- `SHOWTIMES`: « Spectacles »
- `SIGN_UP`: « S'inscrire »
- `SUBSCRIBE`: « S'abonner »
- `USE_APP`: « Utiliser l'appli »
- `VIEW`: « Afficher »
- `WATCH`: « Regarder »
- `WATCH_EPISODE`: « Regarder épisode »

[tip type="note"] **REMARQUE:** les liens profonds vers les applications ne sont pas pris en charge, mais les liens vers la page de l'App Store ou du Google Play Store sont pris en charge en utilisant http/https. L'énumération du texte du bouton CTA est spécifiée dans la charge utile de la réponse publicitaire. [/tip]

Si une assistance est nécessaire pour une nouvelle énumération de texte de bouton CTA, veuillez ouvrir un [ticket GitHub](https://github.com/ampproject/amphtml/issues/new).

## Landing page d'annonce

Vous pouvez spécifier l'une des trois options suivantes comme landing page d'une annonce Web Story.

- `STORY`: la page de destination est une [story sponsorisée](story_ads_best_practices.md#sponsored-story).
- `AMP`: la page de destination est une page AMP valide.
- `NONAMP`: tout autre type de page Web.

## Mise en page

Les stories AMP sont horizontales et en plein écran. Les annonces de story doivent correspondre à ce format pour offrir une expérience utilisateur cohérente.

## Dimensions de superposition

Le libellé de l'annonce superpose une barre dégradée sombre sur toute la largeur de l'annonce et s'étend du haut jusqu'à 46 pixels vers le bas.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='The ad overlay sits at the top', align='' ) }}

Le bouton CTA se trouve à 32 pixels du bas et est centré horizontalement. Il mesure 120 pixels sur 36 pixels.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='The CTA Button sits near the bottom', align='' ) }}

## Images et vidéos

Les images et vidéos incluses dans une annonce AMP Story doivent être en plein écran au format 4:3 standard. Les annonces avec vidéo doivent utiliser une [affiche](../../../documentation/components/reference/amp-video.md#poster) Les dimensions recommandées pour une image d'affiche sont de 720p (720 l x 1280 h).

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Images

Les images d'arrière-plan peuvent être affichées en plein écran. Le CSS suivant est un moyen efficace pour rogner et centrer des vidéos et des images.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Vidéos

#### Spécifier `<source>` vs `src`

Lorsque vous spécifiez la source d'une [`amp-video`](../../../documentation/components/reference/amp-video.md)

Exemple: spécification de plusieurs fichiers source

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Taille et longueur de la vidéo

Pour des performances optimales, vous devez fournir des vidéos d'une taille maximale de 4 Mo. Plus le fichier est petit, plus le téléchargement est rapide, alors soyez le plus minimaliste possible.

#### Formats vidéo

Si vous ne pouvez ajouter qu'un seul format vidéo, ajoutez le format **MP4**. Cependant, lorsque cela est possible, utilisez le format vidéo **HLS** et spécifiez MP4 comme solution de secours pour les navigateurs qui ne prennent pas encore en charge le format HLS. HLS permet une lecture à débit adaptatif, c'est-à-dire que la qualité de la vidéo peut être modifiée pour s'adapter au mieux à la connexion réseau de l'utilisateur.

[tip type="note"] **REMARQUE:** Le format vidéo HLS n'est pas pris en charge par le navigateur Chrome pour ordinateurs de bureau (même pas via l'émulation), il est donc nécessaire de spécifier un format MP4 de secours pour tout accès à votre page depuis un ordinateur de bureau. Pour déboguer les vidéos HLS, vous devez utiliser un appareil mobile réel via le débogage USB. [/tip]

#### Résolution vidéo

Les vidéos Web Story sont toujours verticales (c'est-à-dire en mode portrait), avec un format par défaut de 16:9. Utilisez la résolution recommandée pour le type de diffusion vidéo:

<table>
  <thead>
    <tr>
     <th>Type de diffusion vidéo</th>
     <th>Résolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non adaptative</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptative</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **REMARQUE:** Pour les appareils mobiles qui diffèrent du format 16:9, la vidéo peut être recadrée horizontalement ou verticalement pour s'adapter à la fenêtre d'affichage. [/tip]

#### Codec vidéo

1. Pour le format MP4, utilisez `H.264`.
2. Pour le format WEBM, utilisez `VP9`.
3. Pour le format HLS ou DASH, utilisez `H.264`.

#### Qualité vidéo

##### Optimisations de transcodage

Il existe différents outils que vous pouvez utiliser pour encoder des vidéos et ajuster la qualité de la vidéo pendant l'encodage. En voici quelques-uns:

<table>
  <thead>
    <tr>
     <th>Outil</th>
     <th>Remarque</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Optimisations recommandées:       <ul>         <li>Pour MP4, utilisez <code>-crf 23</code>.</li>         <li>Pour WEBM, utilisez <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Optimisations recommandées:       <ul>         <li>Pour MP4, utilisez <code>-crf 23</code>.</li>         <li>Pour WEBM, utilisez <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>Un encodeur qui peut également lire le format HLS, y compris la liste de lecture.</td>
    </tr>
  </tbody>
</table>

##### Taille du segment HLS

Assurez-vous que vos segments HLS ne durent généralement pas plus de 10 secondes.

## Animation

il y a quelques mises en garde au sujet des animations dans les stories, comme le concept de ce qui est « visible ». Par exemple, dans notre vue de bureau à « 3 panneaux », votre création peut être visible sur la page, mais pas encore au centre. Cela peut être problématique si l'effet souhaité est de démarrer des animations lorsqu'une page devient le point focal principal.

Pour remédier à cela, AMP ajoutera un attribut spécial `amp-story-visible` au corps de votre création lorsqu'il est le point focal dans tous les contextes de diffusion. Il est recommandé de déclencher vos animations en fonction de ce signal.

Exemple: cette animation se déclenchera lorsque la page sera le point focal, et redémarrera si un utilisateur clique sur une autre page de la story et retourne dessus.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Story sponsorisée <a name="sponsored-story"></a>

Une story sponsorisée existe sous forme d'URL sur le Web, permettant de diriger l'utilisateur vers une story sponsorisée à partir du bouton d'appel à l'action sur une annonce AMP Story. Une story sponsorisée est une story AMP qui met l'accent sur une expérience publicitaire immersive et expansive.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='CTA button directs to a Sponsored Story', align='' ) }}

Vous trouverez plus de détails sur la création d'une [story Web ici](../start/create_successful_stories.md).
