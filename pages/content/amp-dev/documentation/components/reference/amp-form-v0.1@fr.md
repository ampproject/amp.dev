---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>Description</strong></td>
    <td>Permet de créer des balises <code>form</code> et <code>input</code>.</td>
  </tr>
  <tr>
  <td><strong>Required Script</strong></td>
  <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">Mises en page compatibles</a></strong></td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><strong>Exemples</strong></td>
    <td>Consultez les exemples de composant <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> sur AMP By Example.</td>
  </tr>
</table>


# Comportement <a name="behavior"></a>

L'extension `amp-form` vous permet de créer des formulaires (`<form>`) afin d'envoyer des champs de saisie dans un document AMP. L'extension `amp-form` fournit également des [polyfills](#polyfills) pour certains comportements indisponibles dans les navigateurs.

[tip type="important"]
Si vous envoyez des données dans votre formulaire, votre point de terminaison serveur doit mettre en œuvre les exigences relatives à la [sécurité CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Avant de créer une balise `<form>`, vous devez inclure le script requis pour l'extension `<amp-form>`, sans quoi votre document ne sera pas valide. Si vous utilisez des balises `input` à d'autres fins que l'envoi de leurs valeurs (des entrées situées à l'extérieur d'une balise `<form>`, par exemple), il n'est pas nécessaire de charger l'extension `amp-form`.

Voici un exemple de formulaire de base :

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# Attributs <a name="attributes"></a>

# target <a name="target"></a>

Indique où afficher la réponse du formulaire après avoir envoyé ce dernier. La valeur doit être `_blank` ou `_top`.

# action <a name="action"></a>

Indique un point de terminaison serveur affecté à la gestion de la saisie du formulaire. La valeur doit être une URL `https` (absolue ou relative), et non un lien vers un CDN.

* Pour `method=GET` : utilisez cet attribut ou [`action-xhr`](#action-xhr).
* Pour `method=POST` : utilisez l'attribut [`action-xhr`](#action-xhr).

[tip type="note"]
Les attributs `target` et `action` ne sont utilisés que pour les requêtes GET autres que xhr. L'exécution AMP utilise l'attribut `action-xhr` pour effectuer la requête ; `action` et `target` sont ignorés. En l'absence d'attribut `action-xhr`, AMP effectue une requête GET vers le point de terminaison `action` et utilise `target` pour ouvrir une nouvelle fenêtre (si la valeur est définie sur `_blank`). L'exécution AMP peut également se tourner vers l'utilisation des attributs `action` et `target` en cas d'échec du chargement de l'extension `amp-form`.
[/tip]

# action-xhr <a name="action-xhr"></a>

Indique un point de terminaison serveur affecté à la gestion de la saisie du formulaire et à l'envoi du formulaire via XMLHttpRequest (XHR). On parle de requête XHR (parfois appelée requête AJAX) lorsque le navigateur effectue une requête sans procéder à un chargement complet de la page, ni ouvrir une nouvelle page. Les navigateurs envoient la requête en arrière-plan à l'aide de l'[API Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) lorsqu'elle est disponible et de l'[API XMLHttpRequest](https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest) pour les navigateurs plus anciens.

[tip type="important"]
Votre point de terminaison XHR doit mettre en œuvre les exigences relatives à la [sécurité CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Cet attribut est obligatoire pour `method=POST` et facultatif pour `method=GET`.

La valeur de l'attribut `action-xhr` peut être le même point de terminaison que l'attribut `action` ou un point de terminaison différent. Les exigences sont identiques à celles décrites ci-dessus pour `action`.

Pour en savoir plus sur la redirection de l'utilisateur après l'envoi du formulaire, consultez la section [Redirection après un envoi](#redirecting-after-a-submission) ci-dessous.

# Autres attributs de formulaire <a name="other-form-attributes"></a>

Tous les autres [attributs de formulaire](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form) sont facultatifs.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

Cet attribut facultatif permet d'activer et de sélectionner une stratégie de signalement de validation personnalisée. Les valeurs valides sont `show-first-on-submit`, `show-all-on-submit` et `as-you-go`.

Pour en savoir plus, consultez la section [Validation personnalisée](#custom-validations).

# Entrées et champs <a name="inputs-and-fields"></a>

**Éléments autorisés** :

* Autres éléments liés à un formulaire, y compris `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>`, etc.
* `<input type=password>` et `<input type=file>` à l'intérieur de `<form method=POST action-xhr>`.
* [`amp-selector`](amp-selector.md)

**Éléments non autorisés** :

* `<input type=button>`, `<input type=image>`
* La plupart des attributs liés à un formulaire sur des entrées, y compris `form`, `formaction`, `formtarget`, `formmethod`, etc.

Il se peut que nous nous penchions à nouveau sur l'assouplissement de certaines de ces règles à l'avenir. Si vous en avez besoin, [merci de nous en informer](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#suggestions-and-feature-requests) et de nous fournir des cas d'utilisation.

Pour plus d'informations sur les entrées et les champs valides, consultez les [règles relatives à amp-form](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) dans les spécifications du validateur AMP.

# Actions <a name="actions"></a>

L'élément `amp-form` expose les actions suivantes :

| Action | Description |
|--------|-------------|
| `submit` | Permet de déclencher l'envoi d'un formulaire lors de l'exécution d'une action spécifique ; par exemple, appuyer sur un lien ou [envoyer un formulaire lors de la modification d'une entrée](#input-events). |
| `clear` | Efface les valeurs de chaque entrée du formulaire. Cela permet aux utilisateurs de procéder rapidement à un nouveau remplissage des formulaires. |

[tip type="read-on"]
[Actions et événements dans AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)
[/tip]

# Événements <a name="events"></a>

L'élément `amp-form` expose les événements suivants :

| Événement | Se déclenche dans les cas suivants |
|-------|-------------|
| `submit` | Lorsque le formulaire est envoyé et avant la fin de l'envoi. |
| `submit-success` | Lorsque l'envoi du formulaire est terminé et que l'opération est un succès. |
| `submit-error` | Lorsque l'envoi du formulaire est terminé et qu'une erreur a été renvoyée. |
| `verify` | Lorsque la validation asynchrone est lancée. |
| `verify-error` | Lorsque la validation asynchrone est terminée et qu'une erreur a été renvoyée. |
| `valid` | Lorsque l'état de validation du formulaire est défini sur "valide" (conformément à la [stratégie de signalement](#reporting-strategies) applicable). |
| `invalid` | Lorsque l'état de validation du formulaire est défini sur "non valide" (conformément à la [stratégie de signalement](#reporting-strategies) applicable). |

Ces événements peuvent être utilisés au moyen de [l'attribut `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on).

Par exemple, le code suivant écoute les événements `submit-success` et `submit-error`, et affiche des modes Lightbox différents en fonction de l'événement :

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

Pour afficher l'intégralité du code, [cliquez ici](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Événements de saisie <a name="input-events"></a>

AMP expose les événements `change` et `input-debounced` sur les éléments `<input>` enfants. Cela vous permet d'utiliser l'[attribut `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on) pour exécuter une action sur n'importe quel élément en cas de changement d'une valeur d'entrée.

Par exemple, il est courant d'envoyer un formulaire lors de la modification d'une entrée : sélection d'une case d'option pour répondre à un sondage, choix d'une langue dans une entrée `select` pour traduire une page, etc.

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

Pour afficher l'intégralité du code, [cliquez ici](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Déclencheurs d'analyse <a name="analytics-triggers"></a>

L'extension `amp-form` déclenche les événements suivants dont vous pouvez effectuer le suivi dans votre configuration [amp-analytics](amp-analytics.md) :

| Événement                     | Se déclenche dans les cas suivants                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | Une demande de formulaire est lancée.      |
| `amp-form-submit-success` | Une réponse indiquant que l'opération a bien été réalisée est renvoyée (l'état de la réponse est `2XX`). |
| `amp-form-submit-error`   | Une réponse indiquant que l'opération a échoué est renvoyée (l'état de la réponse n'est pas `2XX`). |

Vous pouvez configurer vos solutions d'analyse de manière à envoyer ces événements comme dans l'exemple suivant :

```html
<amp-analytics>
  <script type="application/json">
  {
    "requests": {
      "event": "https://www.example.com/analytics/event?eid=${eventId}",
      "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
    },
    "triggers": {
      "formSubmit": {
        "on": "amp-form-submit",
        "request": "searchEvent"
      },
      "formSubmitSuccess": {
        "on": "amp-form-submit-success",
        "request": "event",
        "vars": {
          "eventId": "form-submit-success"
        }
      },
      "formSubmitError": {
        "on": "amp-form-submit-error",
        "request": "event",
        "vars": {
          "eventId": "form-submit-error"
        }
      }
    }
  }
  </script>
</amp-analytics>
```

Les trois événements génèrent un ensemble de variables qui correspondent au formulaire spécifique et aux champs qu'il contient. Ces variables peuvent être utilisées dans le cadre de l'analyse.

Par exemple, le formulaire suivant comprend un seul champ :

```html
<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="Commentaire">
    </form>
```

Lorsque l'événement `amp-form-submit`, `amp-form-submit-success` ou `amp-form-submit-error` est déclenché, il génère les variables suivantes contenant les valeurs spécifiées dans le formulaire :

  * `formId`
  * `formFields[comment]`

# Affichage des réponses de réussite ou d'erreur <a name="successerror-response-rendering"></a>

Vous pouvez afficher les réponses de réussite ou d'erreur dans votre formulaire en utilisant des [modèles étendus](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates), comme [amp-moustache](amp-mustache.md). Pour afficher des réponses de réussite, vous pouvez utiliser la liaison de données avec [amp-bind](amp-bind.md) et les attributs de réponse suivants :

| Attribut de réponse | Description |
|-----------|---------------------|
| `submit-success` | Peut être utilisé pour afficher un message de réussite si la réponse indique une réussite (c'est-à-dire si son état est défini sur `2XX`). |
| `submit-error` | Peut être utilisé pour afficher une erreur d'envoi si la réponse indique un échec (c'est-à-dire si son état n'est pas défini sur `2XX`).  |
| `submitting` | Peut être utilisé pour afficher un message lors de l'envoi du formulaire. Le modèle de cet attribut a accès aux champs de saisie du formulaire à des fins d'affichage. Consultez l'[exemple de formulaire complet ci-dessous](#example-submitting) pour savoir comment utiliser l'attribut `submitting`. |

# Pour afficher des réponses avec la création de modèles, procédez comme suit : <a name="to-render-responses-with-templating"></a>

* Appliquez un attribut de réponse à *tout élément enfant direct* de l'élément `<form>`.
* Affichez la réponse dans l'élément enfant en y incluant un modèle à l'aide de la balise `<template></template>` ou `<script type="text/plain"></script>`, ou en référençant un modèle avec un attribut `template="id_of_other_template"`.
* Indiquez un objet JSON valide pour les réponses à `submit-success` et `submit-error`. Les réponses de réussite et d'erreur doivent comporter un en-tête `Content-Type: application/json`.

<a id="example-submitting"></a>

# Exemple : Le formulaire affiche des messages de réussite, d'erreur et d'envoi en cours <a name="example-form-displays-success-error-and-submitting-messages"></a>

Dans l'exemple suivant, les réponses sont affichées dans un modèle intégré au sein du formulaire.

[sourcecode:html]
{% raw %}<form ...>
  <fieldset>
    <input type="text" name="firstName" />
    ...
  </fieldset>
  <div verify-error>
    <template type="amp-mustache">
      There is a mistake in the form!
      {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting>
    <template type="amp-mustache">
      Form submitting... Thank you for waiting {{name}}.
    </template>
  </div>
  <div submit-success>
    <template type="amp-mustache">
      Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
      to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
    </template>
  </div>
  <div submit-error>
    <template type="amp-mustache">
      Oops! {{name}}, {{message}}.
    </template>
  </div>
</form>
{% endraw %}[/sourcecode]

Le point de terminaison `action-xhr` de l'éditeur renvoie les réponses JSON suivantes :

En cas de réussite :

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

En cas d'erreur :
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

Vous pouvez afficher les réponses dans un modèle référencé défini précédemment dans le document, en utilisant l'identifiant du modèle comme valeur de l'attribut `template`, lequel est défini sur les éléments avec les attributs `submit-success` et `submit-error`.

[sourcecode:html]
{% raw %}<template type="amp-mustache" id="submit_success_template">
  Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
  to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template type="amp-mustache" id="submit_error_template">
  Oops! {{name}}, {{message}}.
</template>

<form ...>
  <fieldset>
  ...
  </fieldset>
  <div submit-success template="submit_success_template"></div>
  <div submit-error template="submit_error_template"></div>
</form>
{% endraw %}[/sourcecode]

Pour afficher l'intégralité du code, [cliquez ici](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Afficher une réponse positive avec la liaison de données <a name="to-render-a-successful-response-with-data-binding"></a>

* Utilisez l'[attribut on](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) pour lier l'attribut *submit-success* à [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29).
* Utilisez la propriété `event` pour capturer les données de réponse.
* Ajoutez l'attribut d'état à l'élément souhaité pour lier la réponse de formulaire.

L'exemple suivant illustre une réponse `submit-success` de formulaire avec [`amp-bind`](amp-bind.md) :
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

Une fois le formulaire envoyé, il renvoie une réponse JSON semblable à celle-ci :

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
`amp-bind` met ensuite à jour le texte de l'élément `<p>` pour qu'il corresponde à l'état `subscribe` :

```html
...
  <p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# Redirection après un envoi <a name="redirecting-after-a-submission"></a>

Vous pouvez rediriger les utilisateurs vers une nouvelle page après l'envoi réussi d'un formulaire. Pour ce faire, définissez l'en-tête de réponse `AMP-Redirect-To` et indiquez une URL de redirection. L'URL de redirection doit être au format HTTPS, sans quoi une erreur sera renvoyée par AMP et la redirection n'aura pas lieu.  La configuration des en-têtes de réponse HTTP s'effectue via votre serveur.

Veillez à mettre à jour l'en-tête de réponse `Access-Control-Expose-Headers` de manière à inclure `AMP-Redirect-To` dans la liste des en-têtes autorisés.  Pour en savoir plus sur ces en-têtes, consultez la section [Sécurité CORS dans AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

*Exemples d'en-têtes de réponse :*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
Reportez-vous aux sections [Form Submission with Update](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) et [Product Page](https://ampbyexample.com/samples_templates/product_page/#product-page) sur AMP By Example pour consulter des exemples de redirection consécutive à l'envoi d'un formulaire.
[/tip]

# Validations personnalisées <a name="custom-validations"></a>

L'extension `amp-form` vous permet de créer votre propre interface de validation personnalisée en utilisant l'attribut `custom-validation-reporting` avec l'une des stratégies de signalement suivantes : `show-first-on-submit`, `show-all-on-submit` ou `as-you-go`.

Pour spécifier une validation personnalisée sur votre formulaire, procédez comme suit :

1. Définissez l'attribut `custom-validation-reporting` dans votre `formulaire` sur l'une des [stratégies de signalement de validation](#reporting-strategies).
1. Fournissez votre propre interface de validation, balisée avec des attributs spéciaux. AMP détecte les attributs spéciaux et les signale au moment opportun, en fonction de la stratégie que vous avez spécifiée.

Exemple :

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

Pour consulter d'autres exemples, reportez-vous au fichier [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

Dans le cas des messages de validation, si votre élément est dépourvu de contenu textuel, AMP y indique le message de validation par défaut du navigateur. Dans l'exemple ci-dessus, lorsque l'entrée `name5` est vide et que la validation est lancée (en d'autres termes, l'utilisateur a essayé d'envoyer le formulaire), AMP indique `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` avec le message de validation du navigateur et présente cet élément `span` à l'utilisateur.

[tip type="important"]
Vous devez fournir votre propre interface de validation pour chaque type d'état non valide que l'entrée peut afficher. Si aucun état n'est présent, aucun attribut `custom-validation-reporting` n'est présenté aux utilisateurs pour l'état d'erreur manquant. Les états de validité sont disponibles dans la [documentation officielle sur le signalement de validation HTML du W3C](https://www.w3.org/TR/html50/forms.html#validitystate).
[/tip]

# Stratégies de signalement <a name="reporting-strategies"></a>

Indiquez l'une des options de signalement suivantes pour l'attribut de `custom-validation-reporting` :

# Show First on Submit (Afficher la première lors de l'envoi) <a name="show-first-on-submit"></a>

L'option de signalement `show-first-on-submit` imite le comportement par défaut du navigateur lors du lancement de la validation par défaut. Elle indique la première erreur de validation détectée et s'arrête là.

# Show All on Submit (Tout afficher lors de l'envoi) <a name="show-all-on-submit"></a>

L'option de signalement `show-all-on-submit` affiche toutes les erreurs de validation sur l'ensemble des entrées non valides lors de l'envoi du formulaire. Cela s'avère utile si vous souhaitez afficher un récapitulatif des validations.

# As You Go (Au fur et à mesure) <a name="as-you-go"></a>

L'option de signalement `as-you-go` permet à l'utilisateur d'afficher les messages de validation à mesure qu'il interagit avec l'entrée. Par exemple, si l'utilisateur saisit une adresse e-mail incorrecte, l'erreur est affichée immédiatement.  Une fois la valeur corrigée, l'erreur disparaît.

# Interact and Submit (Interagir et envoyer) <a name="interact-and-submit"></a>

L'option de signalement `interact-and-submit` est la combinaison des options `show-all-on-submit` et `as-you-go`. Les erreurs sont immédiatement affichées dans les différents champs après les interactions de l'utilisateur. Lors de l'envoi du formulaire, les erreurs sont également affichées dans tous les champs non valides.

# Validation <a name="verification"></a>

Les commentaires fournis par la validation HTML5 reposent uniquement sur les informations disponibles sur la page (le fait de savoir si une valeur correspond à un certain schéma, par exemple). La validation `amp-form` vous permet de transmettre à l'utilisateur des informations que la validation HTML5 seule n'est pas en mesure de lui fournir. Par exemple, la validation peut être utilisée dans un formulaire pour vérifier si une adresse e-mail a déjà été enregistrée. Elle peut également servir à valider la correspondance entre les champs de saisie de la ville et du code postal.

Exemple :
[sourcecode:html]
{% raw %}<h4>Verification example</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_ blank"{% endif %}>

  <fieldset>
    <label>
      <span>E-mail</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>Code postal</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>Ville</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>Document</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="Envoyer">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>Félicitations ! Vous êtes inscrit avec l'adresse {{email}}</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>Il y a eu un problème. Réessayer plus tard ?</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}[/sourcecode]


Le formulaire envoie un champ `__amp_form_verify` dans le cadre des données de formulaire pour informer le serveur qu'il s'agit d'une requête de validation et non d'un envoi formel.
Il s'agit d'une information utile, en ce sens qu'elle indique au serveur de ne pas stocker la requête de validation si le même point de terminaison est utilisé à la fois pour la validation et pour les envois formels.

Voici un aperçu d'une réponse d'erreur pour la validation :
```json
{
    "verifyErrors": [
      {"name": "email", "message": "That email is already taken."},
      {"name": "zip", "message": "The city and zip do not match."}
    ]
  }
```

Pour supprimer un champ de la requête `verify-xhr`, ajoutez l'attribut `no-verify` à l'élément d'entrée.

Pour consulter d'autres exemples, reportez-vous au fichier [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Substitutions de variables <a name="variable-substitutions"></a>

L'extension `amp-form` autorise les [substitutions de variables de plate-forme](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) pour les entrées qui sont masquées et qui comportent l'attribut `data-amp-replace`. À chaque envoi de formulaire, `amp-form` recherche tous les attributs `input[type=hidden][data-amp-replace]` dans le formulaire, applique des substitutions de variables à son attribut `value`, puis le remplace par le résultat de la substitution.

Vous devez fournir les variables que vous utilisez pour chaque substitution sur chaque entrée en spécifiant une chaîne des variables utilisées dans `data-amp-replace` (voir l'exemple ci-dessous). Les variables de cette chaîne doivent être séparées par des espaces. AMP ne remplace pas les variables qui ne sont pas spécifiées explicitement.

L'exemple ci-dessous montre les entrées avant et après les substitutions (notez que vous devez utiliser la syntaxe des substitutions de variables de la plate-forme et non celle de la solution d'analyse) :
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

Une fois que l'utilisateur tente d'envoyer le formulaire, AMP essaie de résoudre les variables et de mettre à jour l'attribut `value` de tous les champs avec les substitutions appropriées. Dans le cas des envois XHR, il est probable que toutes les variables soient remplacées et résolues. Cependant, dans les envois GET non XHR, il se peut que les valeurs qui nécessitent une résolution asynchrone ne soient pas disponibles, car elles n'ont pas été résolues auparavant. `CLIENT_ID`, par exemple, n'est pas résolu s'il n'a pas été résolu et mis en cache précédemment.

```html
<!-- User submits the form, variables values are resolved into fields' value -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

Notez que l'élément `CANONICAL_HOSTNAME` ci-dessus n'a pas été remplacé, car il ne figurait pas dans la liste blanche jusqu'à l'attribut `data-amp-replace` dans le premier champ.

Les remplacements seront effectués lors de chaque envoi ultérieur. En savoir plus sur les [substitutions de variables dans AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)

# Polyfills <a name="polyfills"></a>

L'extension `amp-form` fournit des polyfills pour les comportements et les fonctionnalités qui sont indisponibles dans certains navigateurs ou qui seront mis en œuvre dans la prochaine version de CSS.

# Info-bulle de message de validation et de blocage d'envois non valides <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

Depuis août 2016, les navigateurs qui utilisent des moteurs basés sur Webkit n'acceptent plus les envois de formulaire non valides. Il s'agit par exemple de Safari sur toutes les plates-formes et de tous les navigateurs iOS. L'extension `amp-form` émule ce comportement pour bloquer tout envoi non valide et affiche des info-bulles de messages de validation sur les entrées non valides.

# Pseudo-classes d'interaction avec l'utilisateur <a name="user-interaction-pseudo-classes"></a>

Les pseudo-classes `:user-invalid` et `:user-valid` font partie de la [future spécification CSS Selectors 4](https://drafts.csswg.org/selectors-4/#user-pseudos). Elles autorisent de meilleurs hooks pour appliquer un style aux champs valides/non valides sur la base de quelques critères.

L'une des différences majeures entre `:invalid` et `:user-invalid` se situe au niveau de leur application à l'élément. La classe `:user-invalid` est appliquée après que l'utilisateur a interagi de manière significative avec le champ (par exemple, l'utilisateur saisit une valeur dans un champ ou floute le champ).

L'extension `amp-form` fournit des [classes](#classes-and-css-hooks) pour émuler ces pseudo-classes. Elle ``propage également ces éléments aux ancêtres `fieldsetelements` et `form`.

# Validation des éléments `<textarea>` <a name="-validation"></a>

La correspondance d'expression régulière est une fonctionnalité de validation courante, compatible en mode natif avec la plupart des éléments d'entrée, à l'exception de `<textarea>`. Cette fonctionnalité est émulée et l'attribut `pattern` est accepté sur les éléments `<textarea>`.

AMP Form fournit un attribut `autoexpand` pour les éléments `<textarea>`. La zone de texte peut ainsi être redimensionnée pour s'adapter aux lignes de saisie de l'utilisateur, avec comme limite la taille maximale du champ. Si l'utilisateur redimensionne manuellement le champ, le comportement de développement automatique est supprimé.

```html
<textarea autoexpand></textarea>
```

# Application d'un style <a name="styling"></a>

# Classes et hooks CSS <a name="classes-and-css-hooks"></a>

L'extension `amp-form` fournit aux éditeurs des classes et des hooks CSS pour leur permettre d'appliquer un style à leurs formulaires et à leurs entrées.

Les classes suivantes peuvent être utilisées pour indiquer l'état de l'envoi du formulaire :

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

Les classes suivantes constituent un [polyfill pour les pseudo-classes d'interaction avec l'utilisateur](#user-interaction-pseudo-classes) :

* `.user-valid`
* `.user-invalid`

Ces classes permettent aux éditeurs d'appliquer un style à leurs entrées et jeux de champs, de telle sorte qu'ils interagissent avec les actions des utilisateurs (il peut s'agir, par exemple, de la mise en évidence d'une entrée non valide avec une bordure rouge après que l'utilisateur l'a floutée).

Pour en savoir plus sur l'utilisation de ces classes, consultez l'[intégralité du code](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

[tip type="success"]
Rendez-vous sur [AMP Start](https://ampstart.com/components#form-elements) pour découvrir des éléments de formulaire mis en forme et réactifs que vous pouvez utiliser dans vos pages AMP.
[/tip]

# Points à noter concernant la sécurité <a name="security-considerations"></a>

# Protection contre les attaques XSRF <a name="protecting-against-xsrf"></a>

Outre les consignes de la [spécification AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md), prêtez une attention particulière aux informations de la section ["Processing state changing requests"](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests) pour vous protéger comme les [attaques XSRF](https://fr.wikipedia.org/wiki/Cross-site_request_forgery) au cours desquelles un pirate informatique peut exécuter des commandes non autorisées à l'aide de la session utilisateur en cours, à l'insu de l'utilisateur.

Veuillez garder à l'esprit les points suivants lorsque vous acceptez des entrées de l'utilisateur :

* Utilisez uniquement POST pour les requêtes de changement d'état.
* Utilisez les requêtes GET non XHR uniquement à des fins de navigation (pour la recherche, par exemple).
    * Les en-têtes "origin" reçus par les requêtes GET non XHR manquent de précision et les backends ne peuvent pas offrir de protection contre XSRF avec le mécanisme décrit ci-dessus.
    * En règle générale, il est conseillé de n'utiliser des requêtes GET XHR/non XHR que dans le cadre de la navigation ou de la récupération d'informations.</li>
* Les requêtes POST non XHR ne sont pas autorisées dans les documents AMP. Cela est dû au fait que l'en-tête `Origin` est défini de manière incohérente sur ces requêtes en fonction du navigateur. De plus, leur prise en charge entraînerait des complications dans le cadre de la protection contre les attaques XSRF. Ce point pourra être réexaminé ultérieurement. Si vous estimez que cela est nécessaire, veuillez nous en faire part.
