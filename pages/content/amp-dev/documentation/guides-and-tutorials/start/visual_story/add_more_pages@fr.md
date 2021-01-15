---
"$title": Ajouter plus de pages
"$order": '5'
description: "Maintenant que vous êtes familiarisé(e) avec l'ajout d'une page à une story Web, l'ajout des pages suivantes dans notre story \"La joie des animaux domestiques\" est très similaire."
author: bpaduch
---

Maintenant que vous êtes familiarisé(e) avec l'ajout d'une page à une story Web, l'ajout des pages suivantes dans notre histoire "La joie des animaux domestiques" est très similaire. Sur la base des informations fournies ci-dessous, **créez les pages restantes** en utilisant ce que vous avez appris jusqu'à présent. Si vous êtes bloqué(e), regardez le code complet (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>).

[tip type="tip"] **CONSEIL -** N'oubliez pas que chaque page a besoin d'un attribut unique "id" (par exemple, `id="page1"`). [/tip]

## Page 1 : chats

Montre comment afficher une image et du texte dans une seule couche.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Contient 1 couche : <ul> <li>Implémente le modèle <a href="create_cover_page.md#vertical"><code>vertical</code></a>. </li> <li>Contient 3 éléments : <ul> <li>Un élément <code><h1></code> avec le titre : <em>Chats</em> </li> <li>Un <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> réactif (<code class="filename">cat.jpg</code> 720 x 1280px)</li>
<li> Un élément <code><q></code> pour la citation suivante : <em>Les chiens viennent quand on les appelle. Les chats prennent le message et reviennent vers vous quand ça les arrange. --Mary Bly</em> </li> </ul> </li> </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## Page 2 : chiens

Montre comment organiser le texte et afficher une image de remplissage d'écran avec deux couches.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Contient 2 couches: <ul> <li> <b>Couche1</b>: implémente le modèle <a href="create_cover_page.md#fill"><code>fill</code></a>, et contient un <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> interactif (<code class="filename">dog.jpg</code>, 720 x 1280px).</li> <li> <b>Couche 2</b>: implémente le modèle <a href="create_cover_page.md#thirds"><code>thirds</code></a> et contient 2 éléments: <ul> <li>un élément <code><h1></code> avec le titre: <em>Chiens</em> </li> <li>Un élément <code><p></code> qui spécifie une zone <a href="create_cover_page.md#thirds"><code>grid-area</code></a> qui occupe la zone<a><code>lower-third</code></a> et contient le texte suivant: <em>Les chiens sont probablement les premiers animaux que nous avons apprivoisés. Ils accompagnent les humains depuis près de 10 000 ans. Certains scientifiques affirment que tous les chiens, domestiques et sauvages, partagent comme ancêtre commun le loup d'Asie du Sud.</em> </li> </ul> </li> </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## Page 3 : oiseaux

Montre comment organiser le texte, afficher une image qui remplit l'écran et fournir un son d'arrière-plan pour la page.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contient 3 couches :       <ul>         <li> <b>Couche 1</b> : implémente le modèle <a href="create_cover_page.md#fill"><code>fill</code></a> et contient une image réactive <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280px).</li>         <li> <b>Couche 2</b> : implémente le modèle <a href="create_cover_page.md#vertical"><code>vertical</code></a> et contient un élément :           <ul>             <li>Un élément <code><h1></code> avec le titre : <em>Oiseaux</em> </li>           </ul>         </li>         <li> <b>Couche 3</b> :  implémente le modèle <a href="create_cover_page.md#vertical"><code>vertical</code></a> et contient un élément :           <ul>             <li>Un élément <code><q></code> pour la citation suivante : <em>Un oiseau se résume en trois choses : les plumes, le vol et le chant. Et les plumes sont ce qu'il y a de moins important.--Marjorie Allen Seiffert</em> </li>             <li>Cette troisième couche spécifie <code>class="bottom"</code> pour aligner les éléments enfants au bas de l'écran.</li>           </ul>         </li>       </ul>
</li>
      <li>Joue un fichier audio en arrière-plan lorsque la page est affichée. Vous pouvez reproduire du son en arrière-plan pour toute l'histoire ou pour une seule page.  Pour reproduire du son pour une page, ajoutez l'attribut <code>background-audio="assets/bird-singing.mp3"</code> à l'élément <code><amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## Page 4 : lapins

Demonstrates how to arrange text and display a screen-filling video for the page.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contient 3 couches :       <ul>         <li> <b>Couche 1</b> : Implémente le modèle <code>fill</code>, et contient une vidéo interactive <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code>).           <ul>             <li>Souvenez-vous d'ajouter le <strong>script requis</strong> pour le composant <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> dans votre section <code></code> pour que la vidéo apparaisse.</li>             <li>Spécifiez une image <code>poster</code> (<code class="filename">rabbit.jpg</code>). Cet attribut est <strong>requis</strong> pour les stories AMP valides.</li>             <li>Configurez la vidéo pour qu'elle se reproduise automatiquement avec l'attribut <code>autoplay</code>. Cet attribut est <strong>requis</strong> pour les stories AMP valides.</li>             <li>Configurez la vidéo pour qu'elle soit lue en boucle avec l'attribut <code>loop</code>.</li>             <li>Configurez les dimensions sur <code>width="720"</code> <code>height="1280"</code> et <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>Couche 2</b> :  Implémente le modèle <code>vertical</code> et contient un élément :           <ul>             <li>Un élément <code><h1></code> avec le titre : <em>Lapins</em> </li>           </ul>         </li>         <li> <b>Couche 3</b> :  Implémente le modèle <code>vertical</code> et contient un élément :           <ul>             <li>A <code><p></code> qui contient le texte suivant : <em>Les lapins peuvent apprendre à suivre des ordres vocaux simples et viennent lorsqu'on les appelle par leur nom. Ils sont également curieux et joueurs</em>.</li>             <li>Appliquez la classe CSS <code>bottom</code> à la couche pour aligner les éléments enfants au bas de l'écran.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Our "Joy of Pets" story is nearly complete. We'll use animations in our last page to bring all the pets together.
