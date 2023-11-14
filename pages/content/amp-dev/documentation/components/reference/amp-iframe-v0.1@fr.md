---
$title: amp-iframe
$category@: layout
teaser:
  text: Afficher un iFrame.
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Affiche un iFrame.


<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://ampjs.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemples</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">Exemple de code annoté pour amp-iframe</a></td>
  </tr>
</table>

# Comportement <a name="behavior"></a>

Il existe plusieurs différences notables entre le composant `amp-iframe` et les cadres iFrame "vanille" qui sont conçus dans une optique de sécurité accrue et pour éviter les fichiers AMP dominés par un seul iFrame :

* Un composant `amp-iframe` ne peut ne pas figurer près du bord supérieur du document (à l'exception des cadres iFrame qui utilisent `placeholder`, comme indiqué [ci-dessous](#iframe-with-placeholder)). L'iFrame doit soit se trouver à 600 pixels du haut du document, soit hors des 75 premiers % de la fenêtre d'affichage lorsque l'utilisateur fait défiler la page vers le haut, la plus petite des deux valeurs étant retenue.
* Par défaut, un composant amp-iframe est isolé dans un bac à sable (voir les [détails](#sandbox)).
* Un composant `amp-iframe` peut uniquement demander des ressources via HTTPS, à partir d'un URI de données ou via l'attribut `srcdoc`.
* Un composant `amp-iframe` ne peut pas se trouver dans la même origine que le conteneur, sauf si `allow-same-origin` n'est pas autorisé dans l'attribut `sandbox`. Pour plus d'informations sur les origines autorisées pour les cadres iFrame, consultez le document ["Iframe origin policy"](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md).

*Exemple : Intégration d'une carte Google dans un composant amp-iframe*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

Rendu effectué sous la forme suivante :

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&amp;q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
Pour regarder d'autres démos du composant `amp-iframe`, rendez-vous sur [AMP By Example](https://ampbyexample.com/components/amp-iframe/).
[/tip]

# Utilisation du composant amp-iframe pour les annonces <a name="usage-of-amp-iframe-for-advertising"></a>

Le composant `amp-iframe` **ne doit pas** être utilisé principalement dans le but de diffuser de la publicité. Vous pouvez cependant utiliser `amp-iframe` pour afficher des vidéos qui comprennent de la publicité. Cette règle AMP peut être appliquée en n'affichant pas les cadres iFrame respectifs.

Pour la publicité, il est conseillé d'utiliser plutôt le composant [`amp-ad`](amp-ad.md).

Il y a plusieurs raisons à cela :

* `amp-iframe` impose le système de bac à sable et le bac à sable est également appliqué aux cadres iFrame enfants. Cela signifie que les liens vers les pages de destination ne sont peut-être pas fonctionnels, même si l'annonce proprement dite semble fonctionner.
* `amp-iframe` ne fournit pas de mécanisme permettant de transmettre la configuration à l'iFrame.
* `amp-iframe` ne dispose pas d'un mécanisme de redimensionnement entièrement contrôlé par l'iFrame.
* Les informations de visibilité ne sont peut-être pas disponibles pour le composant `amp-iframe`.

# Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>L'attribut <code>src</code> se comporte essentiellement comme sur un iFrame standard, à une exception près : le fragment <code>#amp=1</code> est ajouté à l'URL pour que les documents sources sachent qu'ils sont intégrés dans le contexte AMP. Ce fragment n'est ajouté que si l'URL spécifiée par <code>src</code> ne comporte encore aucun fragment.</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency, referrerpolicy</strong></td>
    <td>Ces attributs doivent tous se comporter comme sur des cadres iFrame standards.
      <br>
        Si <code>frameborder</code> n'est pas spécifié, il est défini par défaut sur <code>0</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td>L'attribut <code>sandbox</code> est toujours défini sur les cadres iFrame créés par <code>amp-iframe</code>. Par défaut, la valeur est vide, ce qui signifie qu'ils ont atteint la valeur de bac à sable maximale. En définissant des valeurs <code>sandbox</code>, il est possible de réduire le nombre d'envois dans le bac à sable de l'iFrame. Toutes les valeurs acceptées par les navigateurs sont autorisées. Par exemple, <code>sandbox="allow-scripts"</code> permet à l'iFrame d'exécuter JavaScript, tandis que <code>sandbox="allow-scripts allow-same-origin"</code> lui permet d'exécuter JavaScript, d'effectuer des requêtes XHR non CORS, et de lire et d'écrire des cookies.
          <br><br>
            Si vous encadrez dans un iFrame un document qui n'a pas été spécialement conçu pour le bac à sable, vous devrez probablement ajouter <code>allow-scripts allow-same-origin</code> à l'attribut <code>sandbox</code>. Il se peut également que vous deviez autoriser des fonctionnalités supplémentaires.
            <br><br>
              Notez également que le bac à sable s'applique à toutes les fenêtres ouvertes à partir d'un iFrame isolé dans un bac à sable (sandboxed). Cela inclut les fenêtres créées par un lien avec <code>target=_blank</code> (ajoutez <code>allow-popups</code> pour que cela puisse se produire). Si <code>allow-popups-to-escape-sandbox</code> est ajouté à l'attribut <code>sandbox</code>, ces nouvelles fenêtres se comportent comme si elles n'étaient pas isolées dans un bac à sable, ce qui est généralement le comportement souhaité. Malheureusement, à l'heure où nous écrivons ces lignes, Chrome est le seul navigateur à accepter <code>allow-popups-to-escape-sandbox</code>.
              <br><br>
                Pour plus d'informations sur l'attribut sandbox, consultez les <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/iframe#attr-sandbox">documents sur MDN</a>.</td>
              </tr>
              <tr>
                <td width="40%"><strong>common attributes</strong></td>
                <td>Cet élément inclut des <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributs communs</a> étendus aux composants AMP.</td>
              </tr>
            </table>

# Cadre iFrame avec espace réservé <a name="iframe-with-placeholder"></a>

Il est possible de faire en sorte qu'un composant `amp-iframe` apparaisse en haut d'un document lorsqu'un élément ```placeholder` lui est associé, comme illustré dans l'exemple ci-dessous.

* Le composant `amp-iframe` doit contenir un élément avec l'attribut `placeholder` (un élément `amp-img`, par exemple) qui sera rendu en tant qu'espace réservé jusqu'à ce que l'iFrame soit prêt à être affiché.
* Il est possible de connaître la disponibilité de l'iFrame en écoutant l'événement `onload` correspondant ou un `postMessage` `embed-ready` qui sera envoyé par le document iFrame, selon la situation qui se présente en premier.

*Exemple : Cadre iFrame avec espace réservé*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*Exemple : Requête embed-ready de l'iFrame*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# Redimensionnement des cadres iFrame <a name="iframe-resizing"></a>

Une mise en page statique doit être définie pour un composant `amp-iframe`, comme c'est le cas pour tout autre élément AMP. Cependant, il est possible de redimensionner un composant `amp-iframe` au moment de l'exécution. Pour ce faire :

1. Le composant `amp-iframe` doit être défini avec l'attribut `resizable`.
1. Le composant `amp-iframe` doit comporter un élément enfant `overflow`.
1. Le composant `amp-iframe` doit définir l'attribut de bac à sable `allow-same-origin`.
1. Le document iFrame doit envoyer une requête `embed-size` en tant que message de fenêtre.
1. La requête `embed-size` est refusée si sa hauteur est inférieure à un certain seuil (100 px).

Notez que l'attribut `resizable` remplace la valeur de `scrolling` par `no`.

*Exemple : `amp-iframe` avec élément `overflow`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*Exemple : Requête de redimensionnement (resize) de l'iFrame*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

Une fois ce message reçu, l'exécution AMP tente de répondre à la demande dans les plus brefs délais, en tenant compte toutefois de l'emplacement actuel du lecteur, de l'état d'activation du défilement et de tout autre élément relatif aux performances ou à l'expérience utilisateur. Si la demande de redimensionnement ne peut pas être satisfaite, le composant `amp-iframe` affiche un élément `overflow`. Si l'utilisateur clique sur l'élément `overflow`, le composant `amp-iframe` est automatiquement redimensionné, car il est déclenché par une action de l'utilisateur.

Voici quelques facteurs qui ont une incidence sur la vitesse d'exécution du redimensionnement :

* Le redimensionnement est-il déclenché par l'action de l'utilisateur ?
* La demande de redimensionnement porte-t-elle sur un iFrame actif ?
* La demande de redimensionnement concerne-t-elle un iFrame situé en dessous ou au-dessus de la fenêtre d'affichage ?

# Visibilité des cadres iFrame <a name="iframe-viewability"></a>

Les cadres iFrame peuvent envoyer un message `send-intersections` à leurs éléments parents pour commencer à recevoir des [enregistrements de modification](https://developer.mozilla.org/fr/docs/Web/API/IntersectionObserverEntry) de type IntersectionObserver de l'intersection de l'iFrame avec la fenêtre d'affichage parent.

*Remarque : Dans les exemples suivants, nous partons du principe que le script se trouve dans l'iFrame créé, où `window.parent` est la fenêtre supérieure. Si le script réside dans un iFrame imbriqué, remplacez `window.parent` par la fenêtre AMP supérieure.*

*Exemple : Requête `send-intersections` de l'iFrame*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

L'iFrame peut écouter un message `intersection` provenant de la fenêtre parent afin de recevoir les données d'intersection.

*Exemple : Requête `send-intersections` de l'iFrame*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

Le parent envoie le message d'intersection à l'iFrame lorsque ce dernier est déplacé dans ou hors de la fenêtre d'affichage (ou s'il est partiellement visible), lorsque l'utilisateur fait défiler l'iFrame ou lorsqu'il le redimensionne.

# Cadres iFrame de suivi et d'analyse <a name="trackinganalytics-iframes"></a>

Nous recommandons vivement d'utiliser [`amp-analytics`](amp-analytics.md) à des fins d'analyse, car il s'agit d'une solution beaucoup plus robuste, complète et efficace. Cet outil peut, en outre, être configuré pour un large éventail de fournisseurs de solutions d'analyse.

AMP n'autorise qu'un seul iFrame par page, utilisé à des fins d'analyse et de suivi. Pour limiter l'utilisation des ressources, ces cadres iFrame sont supprimés du DOM cinq secondes après leur chargement, soit un temps suffisant pour terminer les tâches qui doivent être accomplies.

Les cadres iFrame sont identifiés en tant que cadres de suivi et d'analyse s'ils ne semblent pas avoir d'utilité directe pour l'utilisateur ; être invisibles ou de petite taille, par exemple.

# Conseil : Utiliser des composants AMP existants sur amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

Le composant `amp-iframe` doit être considéré comme une solution de remplacement si l'expérience utilisateur requise n'est pas possible autrement dans AMP ; c'est-à-dire, s'il n'existe pas encore de [composant AMP](../../../documentation/components/index.html) pour le cas d'utilisation. Cela s'explique par le fait que l'utilisation d'un composant AMP adapté à un cas d'utilisation spécifique présente de nombreux avantages. En voici un aperçu :

* Amélioration des performances et de la gestion des ressources.
* Dans certains cas, les composants personnalisés peuvent fournir des images d'espace réservé intégrées. Cela signifie, par exemple, l'obtention de la miniature vidéo appropriée avant le chargement d'une vidéo, ce qui simplifie les tâches de codage nécessaires pour ajouter manuellement un espace réservé.
* Redimensionnement intégré. Dans ce cas, un contenu d'iFrame de taille imprévisible peut être présenté plus souvent à l'utilisateur comme un élément natif de la page, plutôt que dans un cadre que l'utilisateur peut faire défiler.
* D'autres fonctionnalités peuvent être intégrées ; par exemple, la lecture automatique pour les lecteurs vidéo.

# Validation <a name="validation"></a>

Consultez les [règles relatives à amp-iframe](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii) dans les spécifications du validateur AMP.
