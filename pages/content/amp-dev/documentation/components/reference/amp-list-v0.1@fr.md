---
$title: amp-list
$category@: dynamic-content
teaser:
  text: Télécharger des données de manière dynamique et créer des éléments de liste à l'aide d'un modèle.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Ce composant récupère du contenu de manière dynamique à partir d'un point de terminaison JSON CORS et l'affiche à l'aide d'un modèle fourni.

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-list/">exemple de composant amp-list</a> sur AMP By Example.</td>
  </tr>
</table>

## Utilisation <a name="usage"></a>

Le composant `<amp-list>` récupère du contenu de manière dynamique à partir d'un point de terminaison JSON CORS. La réponse du point de terminaison contient des données, lesquelles sont affichées dans le modèle spécifié.

[tip type="important"]
Votre point de terminaison doit mettre en œuvre les exigences énoncées dans la spécification sur les [requêtes CORS dans AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

Vous pouvez spécifier un modèle de deux façons différentes :

* Attribut `template` faisant référence à un ID d'un élément `template` ou `script` existant
* Élément `template` ou `script` imbriqué directement dans l'élément `amp-list`

Pour en savoir plus sur les modèles, reportez-vous à la section [Modèles AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md).

*Exemple : Affichage d'une liste dynamique*

Dans l'exemple suivant, nous allons récupérer des données JSON contenant des URL et des titres, et afficher le contenu dans un modèle [amp-mustache](amp-mustache.md) imbriqué.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

Voici le fichier JSON que nous avons utilisé :

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
Le contenu récupéré a été mis en forme comme suit :

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## Comportement <a name="behavior"></a>

La requête émane toujours du client, même si le document a été diffusé à partir du cache AMP. Le chargement est déclenché à l'aide de règles AMP ordinaires, en fonction de la distance entre l'élément et la fenêtre d'affichage actuelle.

Si le composant `<amp-list>` a besoin d'espace supplémentaire après le chargement, il demande à l'exécution AMP de mettre à jour sa valeur de hauteur à l'aide du flux AMP standard. Si cette demande ne peut pas être satisfaite, l'exécution AMP affiche l'élément `overflow` lorsqu'il est disponible. Notez toutefois que le redimensionnement est presque toujours garanti en raison de l'emplacement standard des éléments `<amp-list>` (au bas du document).

Par défaut, `<amp-list>` ajoute un rôle ARIA `list` à l'élément "list" et un rôle `listitem` aux éléments "item" affichés par le biais du modèle.

### Traitements par lots de requêtes XHR <a name="xhr-batching"></a>

AMP regroupe les requêtes XHR (XMLHttpRequest) dans des points de terminaison JSON. En d'autres termes, vous pouvez utiliser une seule requête de données JSON comme source de données pour plusieurs consommateurs (plusieurs éléments `<amp-list>`, par exemple) sur une page AMP.  Supposons que l'élément `<amp-list>` adresse une requête XHR à un point de terminaison. Dans ce cas, lorsque la requête XHR sera en cours, les requêtes XHR ultérieures adressées au même point de terminaison ne se déclencheront pas et renverront, à la place, les résultats à partir de la première requête XHR.

Vous pouvez utiliser l'attribut [`items`](#items-optional) dans `<amp-list>` pour afficher un sous-ensemble de la réponse JSON. Ainsi, plusieurs éléments `<amp-list>` peuvent afficher un contenu différent, mais partager une même requête XHR.

### Spécifier un dépassement de capacité <a name="specifying-an-overflow"></a>

`<amp-list>` peut éventuellement contenir un élément avec un attribut `overflow`. Cet élément est affiché si l'exécution AMP n'est pas en mesure de satisfaire la demande de redimensionnement de l'élément `<amp-list>`.

*Exemple : Affichage d'un dépassement de capacité lorsque la liste a besoin d'espace supplémentaire*

Dans l'exemple suivant, nous allons afficher une liste d'images et de titres. Étant donné que le contenu `<amp-list>` nécessite davantage d'espace que ce qui est disponible, l'exécution AMP affiche l'élément "overflow".

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

Voici le code CSS de l'élément `overflow` :

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### Espace réservé et création de remplacement <a name="placeholder-and-fallback"></a>

L'utilisation d'espaces réservés et/ou de créations de remplacement est possible dans le composant `<amp-list>`.

* Un *espace réservé* est un élément enfant contenant l'attribut `placeholder`. Cet élément est affiché jusqu'au chargement du composant `<amp-list>`. Si une création de remplacement est également fournie, l'espace réservé est masqué en cas d'échec de chargement du composant `<amp-list>`.
* Une *création de remplacement* est un élément enfant contenant l'attribut `fallback`. Cet élément est affiché en cas d'échec de chargement du composant `<amp-list>`.

Pour en savoir plus sur les espaces réservés et les créations de remplacement, [cliquez ici](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). Notez qu'un élément enfant ne peut pas être à la fois un espace réservé et une création de remplacement.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### Actualiser les données <a name="refreshing-data"></a>

L'élément `<amp-list>` expose une action `refresh` à laquelle d'autres éléments peuvent faire référence dans les attributs `on="tap:..."`.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### Redimensionnement dynamique <a name="dynamic-resizing"></a>

##### Expérimental : amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

Dans certains cas, il se peut que l'élément `<amp-list>` doive être redimensionné lors d'une interaction de l'utilisateur ; par exemple, lorsque `<amp-list>` contient un élément amp-accordion sur lequel l'utilisateur peut appuyer, lorsque la taille du contenu de l'élément `<amp-list>` change en raison des classes CSS liées ou encore lorsque le nombre d'éléments à l'intérieur d'un élément `<amp-list>` est modifié en raison d'un attribut `[src]` lié. `changeToLayoutContainer` gère ce cas de figure en définissant la liste amp sur `layout="CONTAINER"` lors du déclenchement de cette action. Consultez l'exemple ci-dessous :

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

Cette action est disponible à titre expérimental sous `amp-list-resizable-children`.

## Attributs <a name="attributes"></a>

##### src (requis) <a name="src-required"></a>

URL du point de terminaison distant qui renvoie le fichier JSON qui sera affiché dans cet élément `<amp-list>`. Il doit s'agir d'un service HTTP CORS. L'URL doit utiliser le protocole HTTPS.

[tip type="important"]
Votre point de terminaison doit mettre en œuvre les exigences énoncées dans la spécification sur les [requêtes CORS dans AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

L'attribut `src` peut être omis si l'attribut `[src]` est présent. Cela s'avère utile si le contenu est affiché à la suite d'un geste de l'utilisateur plutôt que lors du chargement de la page lorsque le composant [`amp-bind`](amp-bind.md) est utilisé.

##### credentials (facultatif) <a name="credentials-optional"></a>

Définit une option `credentials` telle qu'elle est spécifiée par l'[API Fetch](https://fetch.spec.whatwg.org/).

* Valeurs acceptées : `omit`, `include`
* Valeur par défaut : `omit`

Pour envoyer des identifiants, transmettez la valeur `include`. Si cette valeur est définie, la réponse doit respecter les [consignes de sécurité CORS dans AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

Dans l'exemple ci-dessous, l'insertion d'identifiants est spécifiée pour afficher du contenu personnalisé dans une liste :

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items (facultatif) <a name="items-optional"></a>

Définit l'expression permettant de localiser le tableau à afficher dans la réponse. Il s'agit d'une expression avec notation par point qui parcourt les champs de la réponse JSON.
Par défaut, `<amp-list>` attend un tableau. L'attribut `single-item` peut être utilisé pour charger des données à partir d'un objet.

* La valeur par défaut est `"items"`. Réponse attendue : `{items: [...]}`.
* Si la réponse correspond au tableau souhaité, utilisez la valeur `"."`. Réponse attendue : `[...]`.
* La navigation imbriquée est autorisée (par exemple `"field1.field2"`). Réponse attendue : `{field1: {field2: [...]}}`.

Lorsque `items="items"` est spécifié (il s'agit de la valeur par défaut), la réponse doit être un objet JSON contenant une propriété de tableau appelée `"items"` :
```text
{
  "items": [...]
}
```

#### max-items (facultatif) <a name="max-items-optional"></a>

Valeur entière indiquant la longueur maximale du tableau "items" à afficher.
Le tableau `items` est réduit à `max-items` entrées si la valeur renvoyée est supérieure à `max-items`.

#### single-item (facultatif) <a name="single-item-optional"></a>

Fait en sorte que l'élément `<amp-list>` considère le résultat renvoyé comme s'il s'agissait d'un tableau à un seul élément. Une réponse d'objet est encapsulée dans un tableau afin que `{items: {...}}` se comporte comme s'il s'agissait de `{items: [{...}]}`.

#### reset-on-refresh (facultatif) <a name="reset-on-refresh-optional"></a>

Affiche à nouveau un indicateur de chargement et un espace réservé lorsque la source de la liste est actualisée à l'aide de l'élément `amp-bind` ou de l'action `refresh()`.

Par défaut, cet attribut ne se déclenche que lors d'une actualisation qui entraîne une récupération sur le réseau. Pour effectuer une réinitialisation lors de toutes les actualisations, utilisez `reset-on-refresh="always"`.

#### [is-layout-container] (expérimental, facultatif) <a name="binding-optional"></a>

Il s'agit d'un attribut pouvant être lié qui, par défaut, doit toujours être défini sur "false". Lorsque cet attribut est défini sur" "true" via `bind`, la mise en page de l'élément `<amp-list>` est remplacée par `CONTAINER`. Cet attribut est utile dans le cadre de la gestion du redimensionnement dynamique du composant amp-list. Par défaut, cet attribut ne peut pas être défini sur "true" pour la même raison que le composant `<amp-list>` n'est pas compatible avec la mise en page `CONTAINER` : un saut de contenu risque, en effet, de se produire lors du premier chargement. Cet attribut est disponible à titre expérimental sous `amp-list-resizable-children`. Vous pouvez également utiliser l'action `changeToLayoutContainer`.

#### binding (facultatif) <a name="is-layout-container-optional"></a>

Pour les pages qui utilisent `<amp-list>`, mais aussi le composant `amp-bind`, cet attribut détermine s'il faut empêcher le rendu des éléments enfants affichés jusqu'à ce que l'évaluation des liaisons (`[text]`, par exemple) soit terminée.

Il est conseillé d'utiliser `binding="no"` ou `binding="refresh"` pour bénéficier de meilleures performances.

* `binding="no"` : le contenu est toujours affiché **(option la plus rapide)**.
* `binding="refresh"` : ne pas empêcher l'affichage lors du chargement initial **(rapide)**.
* `binding="always"` : toujours empêcher l'affichage **(lent)**.

Si l'attribut `binding` n'est pas spécifié, la valeur par défaut est `always`.

## Expérimental : Charger plus et Défilement infini (amp-list-load-more) <a name="common-attributes"></a>

Les attributs `load-more` sont proposés avec les options "manual" et "auto" pour autoriser la pagination et le défilement infini. Vous pouvez activer cette fonctionnalité en activant le test "amp-list-load-more" sur la [page des tests](https://cdn.ampproject.org/experiments.html) et en ajoutant l'attribut `load-more` à `<amp-list>`. Cette fonctionnalité est actuellement en phase d'évaluation (Origin Trial) et les API finales peuvent évoluer.

#### Exemple d'utilisation <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

Pour obtenir des exemples fonctionnels, consultez les fichiers suivants : [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) et [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html).

### Attributs <a name="sample-usage"></a>

#### load-more (obligatoire) <a name="attributes-1"></a>

Cet attribut accepte deux valeurs : "auto" ou "manual". Lorsque la valeur de cet attribut est définie sur "manual", un bouton "load-more" est affiché à la fin de l'élément `<amp-list>`. Si elle est définie sur "auto", `<amp-list>` charge automatiquement davantage d'éléments trois fenêtres d'affichage plus bas afin de créer un effet de défilement infini.

#### load-more-bookmark (facultatif) <a name="load-more-mandatory"></a>

Cet attribut spécifie un nom de champ dans les données renvoyées pour indiquer l'URL des éléments suivants à charger. Si cet attribut n'est pas spécifié, `<amp-list>` s'attend à ce que la charge utile json contienne le champ `load-more-src`, qui correspond à l'URL suivante à charger. S'il s'avère que ce champ porte un autre nom, vous pouvez indiquer ce nom au moyen du champ `load-more-bookmark`.Dans l'exemple de charge utile ci-dessous, nous souhaitons spécifier `load-more-bookmark="next"`.

```
{ "items": [...], "next": "https://url.to.load" }
```

### Personnaliser les éléments load-more <a name="load-more-bookmark-optional"></a>

`<amp-list>` avec l'attribut `load-more` contient les éléments d'interface utilisateur suivants : un bouton load-more, un chargeur, un élément load-failed et éventuellement un élément end-cap marquant la fin de la liste. Ceux-ci peuvent être personnalisés en fournissant des éléments `<amp-list-load-more>` en tant qu'enfants du composant `<amp-list>` avec les attributs suivants :

#### load-more-button <a name="customizing-load-more-elements"></a>

L'élément `<amp-list-load-more>` avec l'attribut `load-more-button` est affiché en fin de liste (lorsque la valeur "manual" est définie pour l'attribut "load-more") si d'autres éléments doivent être chargés. Un clic sur cet élément déclenche une récupération afin de charger d'autres éléments à partir de l'URL contenue dans le champ`load-more-src` ou du champ des données renvoyées correspondant à l'attribut `load-more-bookmark`. Cet élément peut être personnalisé en fournissant à `<amp-list>` un élément enfant pourvu de l'attribut `load-more-button`.

##### Exemple : <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  `amp-mustache` peut être utilisé afin de créer un modèle pour cet élément.

##### Exemple : <a name="example"></a>

```html
{% raw %}
<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

Cet élément est un chargeur qui s'affiche si l'utilisateur atteint la fin de la liste alors que le contenu est toujours en cours de chargement ou après avoir cliqué sur l'élément `load-more-button` (alors que les nouveaux éléments enfants de `<amp-list>` sont toujours en cours de chargement). Cet élément peut être personnalisé en fournissant à `<amp-list>` un élément enfant pourvu de l'attribut `load-more-loading`. Exemple :
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

Élément `<amp-list-load-more>` contenant l'attribut `load-more-failed`, qui contient à son tour un bouton avec l'attribut `load-more-clickable`, qui sera affiché au bas du composant `<amp-list>` en cas d'échec du chargement. Un clic sur ce bouton déclenche l'actualisation de l'URL dont le chargement a échoué. Cet élément peut être personnalisé en fournissant à `<amp-list>` un élément enfant pourvu de l'attribut `load-more-failed`. En voici un exemple :

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

Dans l'exemple ci-dessus, l'intégralité de l'élément `load-more-failed` est cliquable. Cependant, cet élément se présente généralement sous la forme d'un élément "Échec du chargement" non cliquable contenant un bouton d'actualisation sur lequel l'utilisateur peut cliquer. Vous pouvez donc définir un élément généralement non cliquable avec un bouton contenant l'élément `load-more-clickable`. Par exemple :

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

Cet élément n'est pas fourni par défaut. Cependant, si un élément `<amp-list-load-more>` contenant l'attribut `load-more-end` est associé à `<amp-list>` en tant qu'élément enfant, il est affiché en bas du composant `<amp-list>` s'il n'y a plus d'autres éléments.  `amp-mustache` peut être utilisé afin de créer un modèle pour cet élément. En voici un exemple :

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### common attributes <a name="load-more-end"></a>

Cet élément inclut des [attributs communs](../../../documentation/guides-and-tutorials/learn/common_attributes.md) étendus aux composants AMP.

## Substitutions <a name="substitutions"></a>

Le composant `<amp-list>` autorise toutes les substitutions de variables d'URL standards.
Pour plus d'informations, consultez le [Guide des substitutions](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

Par exemple :
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
peut effectuer une requête vers une adresse telle que `https://foo.com/list.json?0.8390278471201`, où la valeur RANDOM est générée de manière aléatoire lors de chaque impression.

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-list](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii) dans les spécifications du validateur AMP.
