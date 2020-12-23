---
"$title": Création de la page de garde
"$order": '4'
description: 'Pour créer une page, ajoutez l''élément <amp-story-page> en tant qu''enfant d''amp-story. Attribuez un identifiant unique à la page. Pour notre première page, qui est la page de garde, attribuons un identifiant unique de couverture : ...'
author: bpaduch
---

A page within an Web Story is represented by the `<amp-story-page>` component. Within an [`amp-story`](../../../../documentation/components/reference/amp-story.md), you can have one or more `<amp-story-page>` components, containing each of the individual screens of a story. The first page you specify in the document order is the first page that displays in the Web Story.

Pour créer une page, **ajoutez** l'élément `<amp-story-page>` en tant qu'enfant d'[`amp-story`](../../../../documentation/components/reference/amp-story.md). **Attribuez** un identifiant unique à la page. Pour notre première page, qui est la page de couverture, attribuons un identifiant unique de `cover` :

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

Now we have the shell for our cover page. However, our story still isn't valid.  Within our page, we need to specify at least one **layer**. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='cover page has two layers', align='right third' ) }}

## Couches dans une page

Like layers in graphics, you can use layers in AMP story pages to create visual effects. Layers are stacked on top of one another, so, the first layer is the bottom layer and the next layer is on top of that, and so on.

Notre page de garde est en fait composée de deux couches :

- **Couche 1** : une image qui nous sert de toile de fond
- **Layer 2**: The title and byline for the story

### Création de la couche 1

Ajoutons notre première couche à notre page de garde. La couche contient une image qui remplit l'écran.

Create the layer by adding the `<amp-story-grid-layer>` element as a child of `<amp-story-page>`. As we want the image to fill the screen, specify the `template="fill"` attribute for the `amp-story-grid-layer`. Inside the layer, add an [`amp-img`](../../../../documentation/components/reference/amp-img.md) element for the `cover.jpg` file, and make sure it's responsive (i.e., `layout="responsive"`) with the image's dimensions of 720 x 1280 px.  Here's what our layer looks like:

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280"
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Voyons comment la page s'affiche. Ouvrez la page dans votre navigateur : <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Here's what it should look like:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Création de la couche 2

So, we have our backdrop but now we need the second layer, which sits on top of the backdrop and contains our heading and byline.  To add our second layer, let's complete the same tasks we performed for layer 1, but instead of using the `fill` template, we'll use the **`vertical`** template. However, before we go any further, let's learn about templates and how we can arrange AMP and HTML elements in an `<amp-story-grid-layer>`.

#### Laying out elements with a template

The `<amp-story-grid-layer>` element lays out its children elements in a grid (based off the [CSS grid](https://www.w3.org/TR/css-grid-1/)).  To indicate how you want the children arranged, you need to specify one of the following layout templates:

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
    <td width="65%">The <strong>vertical</strong> template lays the children elements along the y-axis. The elements are aligned to the top of the screen, and take up the entire screen along the x-axis.     The vertical template works well when you want to vertically stack elements one right after the other.    <code class="nopad"><pre><amp-story-grid-layer template="vertical">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>     </td>
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
<td width="65%"> The <strong>thirds</strong> template divides the screen into three equally-sized rows, and allows you to slot content into each area. You can also specify a named <code>grid-area</code> to indicate which third you want your content to be in—the <code>upper-third</code>, <code>middle-third</code>, or <code>lower-third</code>. Named grid areas are useful for changing the default behavior of where elements appear.  For example, if you have two elements in the layer, you can specify the first element to be in <code>grid-area="upper-third"</code> and the second element to be in the <code>grid-area="lower-third"</code>. <code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">element 1</h1>   <p grid-area="lower-third">element 2</p> </amp-story-grid-layer> </pre></code> </td>
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

Refresh your browser and review your work.  Our cover page is complete.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
