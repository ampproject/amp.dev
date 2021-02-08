---
'$title': Création de la page de garde
$order: 4
description: "Pour créer une page, ajoutez l'élément <amp-story-page> en tant qu'enfant d'amp-story. Attribuez un identifiant unique à la page. Pour notre première page, qui est la page de garde, attribuons un identifiant unique de couverture : ..."
author: bpaduch
---

Une page dans une story Web est représentée par le composant `<amp-story-page>`. Dans une [`amp-story`](../../../../documentation/components/reference/amp-story.md), vous pouvez avoir un ou plusieurs composants `<amp-story-page>`, contenant chacun des écrans individuels d'une histoire. La première page que vous spécifiez dans l'ordre des documents est la première page qui s'affiche dans l'histoire Web.

Pour créer une page, **ajoutez** l'élément `<amp-story-page>` en tant qu'enfant d'[`amp-story`](../../../../documentation/components/reference/amp-story.md). **Attribuez** un identifiant unique à la page. Pour notre première page, qui est la page de couverture, attribuons un identifiant unique de `cover` :

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
  <amp-story-page id="cover"> </amp-story-page>
</amp-story>
```

Nous avons maintenant le shell de notre page de garde. Cependant, notre histoire n'est toujours pas valide. Dans notre page, nous devons spécifier au moins une **couche**. {{image ('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='la page de garde a deux calques', align='right third')}}

## Couches dans une page

Comme les couches des graphiques, vous pouvez utiliser des couches dans les pages de stories AMP pour créer des effets visuels. Les couches sont empilées les unes sur les autres, donc la première couche est la couche inférieure et la couche suivante se trouve au-dessus, et ainsi de suite.

Notre page de garde est en fait composée de deux couches :

- **Couche 1** : une image qui nous sert de toile de fond
- **Couche 2** : le titre et la signature de la story

### Création de la couche 1

Ajoutons notre première couche à notre page de garde. La couche contient une image qui remplit l'écran.

Créez la couche en ajoutant l'élément `<amp-story-grid-layer>` en tant qu'enfant de `<amp-story-page>`. Comme nous voulons que l'image remplisse l'écran, spécifiez l'attribut `template="fill"` pour `amp-story-grid-layer`. À l'intérieur de la couche, ajoutez un élément [`amp-img`](../../../../documentation/components/reference/amp-img.md) pour le fichier `cover.jpg` et assurez-vous qu'il est réactif (par exemple, `layout="responsive"`) avec les dimensions de l'image de 720 x 1280 px. Voici à quoi ressemble notre couche :

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img
      src="assets/cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
    >
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Voyons comment la page s'affiche. Ouvrez la page dans votre navigateur : <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Elle devrait ressembler à ceci :

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Création de la couche 2

Alors, nous avons notre arrière-plan, mais maintenant nous avons besoin de la deuxième couche, qui se trouve au-dessus de la page de fond et contient notre titre et notre signature. Pour ajouter notre deuxième couche, effectuons les mêmes tâches que nous avons effectuées pour la couche 1, mais au lieu d'utiliser le modèle `fill`, nous utiliserons le modèle **`vertical`**. Cependant, avant d'aller plus loin, apprenons les modèles et comment nous pouvons organiser les éléments AMP et HTML dans un `amp-story-grid-layer>`.

#### Mise en page des éléments avec un modèle

L'élément `<amp-story-grid-layer>` dispose ses éléments enfants dans une grille (basée sur la [grille CSS](https://www.w3.org/TR/css-grid-1/)). Pour indiquer comment vous voulez que les enfants soient organisés, vous devez spécifier l'un des modèles de mise en page suivants :

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Modèle : fill</h5></td>
</tr>
<tr>
    <td width="65%">Le modèle <strong>fill</strong> remplit l'écran avec le premier élément enfant dans la couche. Tout autre enfant dans cette couche n'est pas affiché. Le modèle Fill fonctionne bien pour les arrière-plans, y compris pour les images et les vidéos.    <code class="nopad"><pre><amp-story-grid-layer template="fill">   <amp-img src="dog.png" width="720" height="1280" layout="responsive">   </amp-img> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Modèle : vertical</h5></td>
</tr>
<tr>
    <td width="65%">Le modèle <strong>vertical</strong> dispose les éléments enfants sur l'axe Y. Les éléments sont alignés en haut de l'écran, et occupent tout l'écran sur l'axe X. Le modèle vertical fonctionne bien quand vous souhaitez accumuler verticalement les éléments l'un après l'autre. <code><br>   <br>element 1<br><br>   <br>element 2<br><br>   <br>element 3<br><br> <br></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Modèle : horizontal</h5></td>
</tr>
<tr>
    <td width="65%">Le modèle <strong>horizontal</strong> dispose les éléments enfants sur l'axe X.  Les éléments sont alignés au début de l'écran, et occupent tout l'écran sur l'axe Y. Le modèle horizontal fonctionne bien lorsque vous souhaitez accumuler horizontalement les éléments l'un après l'autre.     <code class="nopad"><pre><amp-story-grid-layer template="horizontal">   <p>élément 1</p>   <p>élément 2</p>   <p>élément 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Modèle : thirds</h5></td>
</tr>
<tr>
<td width="65%"> Le modèle <strong>thirds</strong> divise l'écran en trois bandes de dimensions égales, et vous permet de loger du contenu dans chaque zone. Vous pouvez également spécifier une zone nommée <code>grid-area</code> pour indiquer dans quel tiers vous souhaitez placer votre contenu (<code>upper-third</code>, <code>middle-third</code>, ou <code>lower-third</code>). Les zones de grille nommées sont utiles pour modifier le comportement par défaut des endroits d'apparition des éléments. Par exemple, si vous avez deux éléments dans la couche, vous pouvez spécifier le premier élément pour qu'il se trouve dans la zone <code>grid-area="upper-third"</code> et le deuxième élément pour qu'il se trouve dans la zone <code>grid-area="lower-third"</code>. <code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">élément 1</h1>   <p grid-area="lower-third">élément 2</p> </amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Terminer notre page de garde

Maintenant que vous comprenez les modèles de couche, terminons notre deuxième couche pour la page de garde.

Pour la couche 2, nous voulons que le titre et la signature soient dans la partie supérieure, et nous voulons que les éléments se suivent l'un après l'autre, nous allons donc spécifier le modèle `vertical`. Notre deuxième `amp-story-grid-layer` suit la première, comme ceci :

```html
<amp-story-grid-layer>
  <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Actualisez votre navigateur et vérifiez votre travail. Notre page de garde est terminée.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
