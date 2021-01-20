---
$title: Mises en page compatibles
---

Dans le cas d'éléments, il suffit d'inclure le code `layout=responsive`.

## Valeurs autorisées pour l'attribut de mise en page <a name="the-layout-attribute"></a>

Par défaut, utilisez des mises en page responsives.

Voici la liste complète des valeurs autorisées pour l'attribut de mise en page :

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Type de mise en page</th>
      <th class="col-twenty" data-th="Width/height required">Largeur/hauteur requise</th>
      <th data-th="Behavior">Comportement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">Non</td>
      <td data-th="Behavior">Élément non affiché. Cette mise en page peut être appliquée à chaque élément AMP. Le composant n'occupe pas de place à l'écran, comme si son style d'affichage était inexistant. On considère que l'élément peut s'afficher de lui-même en cas d'action de l'utilisateur, par exemple <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Oui</td>
      <td data-th="Behavior">L'élément a une largeur et une hauteur fixes. Il ne s'adapte donc pas. Les seules exceptions sont les éléments <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> et <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Oui</td>
      <td data-th="Behavior">Élément ajusté à la largeur de son élément conteneur. Redimensionnement automatique de la hauteur au format donné par les attributs de largeur et de hauteur. Cette mise en page fonctionne très bien pour la plupart des éléments AMP, y compris <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> et <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. L'espace disponible dépend de l'élément parent et peut également être personnalisé en utilisant le CSS <code>max-width</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Hauteur seulement</td>
      <td data-th="Behavior">L'élément prend l'espace qui lui est offert, mais sa hauteur reste inchangée. Cette mise en page fonctionne bien pour les éléments tels qu'<a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, impliquant un contenu positionné horizontalement. L'attribut <code>width</code> ne doit pas être présent ou doit être égal à <code>auto</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">Non</td>
      <td data-th="Behavior">L'élément prend l'espace qui lui est offert, en termes de largeur et de hauteur. En d'autres termes, la mise en page d'un élément de remplissage correspond à son parent.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">Non</td>
      <td data-th="Behavior">L'élément permet à ses enfants de définir sa taille, comme une balise <code>div</code> HTML standard. Le composant n'est pas censé avoir une mise en page propre. Il fonctionne comme un conteneur. Ses enfants sont affichés immédiatement.</td>
    </tr>
  </tbody>
</table>

### Que se passe-t-il si la largeur et la hauteur ne sont pas définies ? <a name="what-if-width-and-height-are-undefined"></a>

Parfois, si `width` ou `height` ne sont pas spécifiés, l'exécution AMP peut utiliser les valeurs par défaut suivantes :

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): la largeur et la hauteur par défaut sont de 0.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): la largeur et la hauteur par défaut proviennent du navigateur.

### Que se passe-t-il si l'attribut de mise en page n'est pas défini ? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Le comportement de la mise en page est déterminé comme suit :

* Si `height` est présent et `width` est absent ou égal à `auto`, la mise en page `fixed-height` est utilisée.
* Si les attributs `width` ou `height` sont présents, ainsi que l'attribut `sizes`, la mise en page `responsive` est utilisée.
* Si les attributs `width` ou `height` sont présents, la mise en page `fixed` est utilisée.
* En l'absence de `width` et de `height`, la mise en page `container` est utilisée.

## Utiliser les attributs "@media" et "media"

Utilisez [`@media`](https://developer.mozilla.org/fr-FR/docs/Web/CSS/@media) pour contrôler la mise en page et le comportement de la page, comme sur n'importe quel autre site Web.
Lorsque la fenêtre du navigateur change de taille ou d'orientation, les requêtes média sont réévaluées, et les éléments sont cachés et présentés sur la base des nouveaux résultats.

Pour en savoir plus sur le contrôle de la mise en page grâce aux requêtes média, consultez [Utiliser des requêtes média CSS à des fins d'adaptabilité](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=fr).

<a name="element-media-queries"></a>

L'attribut `media` constitue une fonctionnalité supplémentaire de responsive design disponible dans l'AMP.
Cet attribut peut être utilisé avec tous les éléments AMP ; il fonctionne comme les requêtes média de votre feuille de style globale, mais ne concerne qu'un élément spécifique sur une seule page.

Par exemple, voici deux images avec des requêtes média qui s'excluent mutuellement.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

En fonction de la largeur de l'écran, l'une ou l'autre sera récupérée et affichée.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## Utiliser les attributs "srcset" et "sizes"

Utilisez l'attribut `srcset` pour contrôler les ressources d'un élément en fonction des différentes expressions de médias.
En particulier, utilisez-le pour toutes les balises [`amp-img`](../../../../documentation/components/reference/amp-img.md) pour indiquer les ressources d'images à utiliser en fonction des diverses tailles d'écran.

Dans cet exemple simple, `srcset` indique l'image à utiliser en fonction de la largeur de l'écran.
Le descripteur `w` indique au navigateur la largeur de chaque image de la liste :

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Remarque** : L'AMP accepte le descripteur `w` dans tous les navigateurs.

Pour en savoir plus sur la création d'images responsives à l'aide de l'attribut `srcset`, lisez [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now) (Utiliser des images responsives (Maintenant) – en anglais).

Vous pouvez également utiliser l'attribut `sizes` avec `srcset`.
L'attribut `sizes` décrit comment calculer la taille de l'élément en fonction des expressions de médias.
Sur la base de la taille calculée de l'élément, le user-agent sélectionne la source la plus pertinente fournie par l'attribut `srcset`.

Prenons l'exemple suivant :

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

L'attribut `sizes` fait en sorte que la largeur de l'élément corresponde à 50 % de la taille de la fenêtre d'affichage quand cette dernière fait au moins 650 pixels.
Par exemple, si la fenêtre d'affichage fait 800 pixels, la largeur de l'élément est définie sur 400 pixels.
Le navigateur sélectionne alors la ressource `srcset` la plus proche de 400 pixels, en supposant que le ratio en pixels de l'appareil est de 1, ce qui donne dans le cas présent `narrow.jpg` (320 pixels).

**Important** : Lorsque l'attribut "sizes" est spécifié, avec une largeur et une hauteur, la mise en page par défaut est `responsive`.

Pour en savoir plus sur les attributs `sizes` et `srcset` par rapport aux requêtes média, lisez cet article de blog [Srcset et sizes](https://ericportis.com/posts/2014/srcset-sizes/).

## Inclure des espaces réservés et des créations de remplacement

### placeholder

L'élément comportant l'attribut `placeholder` fonctionne comme un espace réservé pour l'élément AMP parent.
L'élément `placeholder`, s'il est indiqué, doit être un enfant direct de l'élément AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Par défaut, l'espace réservé est immédiatement affiché pour l'élément AMP, même si les ressources de l'élément AMP n'ont pas été téléchargées ni initialisées.
Une fois prêt, l'élément AMP cache généralement son espace réservé et affiche le contenu.

**Remarque** : Il n'est pas nécessaire que l'espace réservé soit un élément AMP ; tout élément HTML peut faire office d'espace réservé.

### fallback

Utilisez l'attribut `fallback` pour indiquer le comportement de la création de remplacement pour tout élément non compatible avec le navigateur.
Par exemple, utilisez l'attribut `fallback` pour indiquer à l'utilisateur que le navigateur n'accepte pas une fonctionnalité en particulier :

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

L'attribut `fallback` peut concerner n'importe quel élément HTML, et pas seulement les éléments AMP.
Le cas échéant, l'élément `fallback` doit être un enfant direct de l'élément AMP.

### noloading

De nombreux éléments AMP peuvent afficher un "indicateur de chargement", animation basique montrant que l'élément n'a pas encore complètement chargé.
Il est possible de désactiver un tel comportement des éléments en ajoutant l'attribut `noloading`.
