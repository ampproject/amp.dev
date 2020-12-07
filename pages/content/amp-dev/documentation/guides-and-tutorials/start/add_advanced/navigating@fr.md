---
"$title": Naviguer sur votre site
"$order": '5'
description: La plupart des sites Internet mobiles incluent un menu de navigation sur le site. Ces menus peuvent prendre de nombreuses formes différentes. Dans ce tutoriel, nous allons essayer les exemples suivants pour ...
---

La plupart des sites Internet mobiles incluent un menu de navigation sur le site. Ces menus peuvent prendre de nombreuses formes différentes. Dans ce tutoriel, nous allons essayer les exemples suivants pour présenter la navigation dans les pages AMP :

- Un lien vers votre page d'accueil - l'option la plus simple.
- Une barre de navigation latérale à l'aide du composant [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## Lien vers la page d'accueil

Le moyen le plus simple d'amener vos utilisateurs à accéder aux options de navigation habituelles de votre site Web consiste simplement à les rediriger vers votre page d'accueil !

Essayez de **remplacer** votre section `<header>` par cette version qui inclut un lien :

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img class="home-button" src="icons/home.png" width="36" height="36"></amp-img>
  </a>
 <div class="site-name">News Site</div>
</header>
```

Et **ajoutez** ces règles de style à votre CSS intégré:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

**Actualisez** maintenant la page. Vous devriez voir un lien dans le coin supérieur gauche de la page pointant vers `homepage.html`. Si vous cliquez sur l'icône d'accueil, vous découvrirez rapidement qu'elle ne mène nulle part (car nous n'avons pas de fichier `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Home icon navigation') }}

Ce lien peut être remplacé par l'URL de la page d'accueil de votre site Internet pour permettre à vos utilisateurs de naviguer vers d'autres parties de votre site via la navigation de votre site Internet existant.

Il s'agit de l'approche la plus simple qui exploite la navigation de votre site existant. Ensuite, nous explorerons une option populaire pour la navigation sur le site.

## Naviguer avec une barre latérale

Une technique de navigation courante consiste à ajouter une icône de menu qui, lorsqu'elle est activée, révèle un ensemble de liens de navigation (sur le côté de la page). Dans AMP, nous pouvons créer une telle navigation avec le composant [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Tout d'abord, nous devons **ajouter** le JavaScript du composant [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) à la section `<head>` :

```html
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
```

Ensuite, nous voulons afficher une icône de menu. Lorsque l'icône est activée, la barre latérale s'ouvre. **Remplacez** le `<header>` par le code suivant pour afficher une icône ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button) au lieu d'une icône d'accueil :

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
  <div class="site-name">News Site</div>
</header>
```

Dans le code ci-dessus, nous activons/désactivons (`toggle`) la barre latérale via l'attribut d'action [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) sur l'élément [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md), qui est identifié par l'ID `sidebar1`. Ajoutons la barre latérale.

**Ajoutez** le code HTML suivant juste après `</header>` :

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div role="button" aria-label="close sidebar" on="tap:sidebar1.toggle" tabindex="0" class="close-sidebar">✕</div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Notre barre latérale sera masquée, mais lorsque l'utilisateur appuie sur l'icône hamburger, le menu apparaît sur le côté gauche de l'écran. Pour fermer le menu, l'utilisateur peut appuyer sur l'icône X.

Enfin, **ajoutez** ces règles de style à votre CSS intégré:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom:10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Très bien, voyons notre barre latérale. **Actualisez** et rechargez votre page AMP. Vous devriez obtenir un résultat similaire à ceci :

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Sidebar menu navigation') }}

Notre page est superbe ! Ajoutons une touche finale : une police personnalisée.
