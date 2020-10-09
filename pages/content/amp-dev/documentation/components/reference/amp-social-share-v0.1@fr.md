---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: Fonctionnalité de suivi des partages en cours de développement.
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



Ce composant affiche un bouton de partage sur les réseaux sociaux.

<table>
  <tr>
    <td class="col-fourty"><strong>Script requis</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"&gt;&lt;script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-social-share/">exemple de composant amp-social-share</a> sur AMP By Example.</td>
  </tr>
</table>

## Aperçu <a name="overview"></a>

Le composant `amp-social-share` affiche un bouton de partage sur les réseaux sociaux pour différents fournisseurs de plates-formes.

## Exemples <a name="examples"></a>

**Exemple : Bouton de partage de base sur les réseaux sociaux**

Le bouton de partage identifie automatiquement certaines valeurs par défaut pour quelques fournisseurs préconfigurés. Il part du principe que l'URL canonique du document en cours correspond à l'URL que vous souhaitez partager et que le titre de la page correspond au texte à partager.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**Exemple : Transmission de paramètres**

Si vous souhaitez transmettre des paramètres au point de terminaison du partage, vous pouvez spécifier l'attribut `data-param-<attribute>` qui y sera ajouté.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

LinkedIn fait partie des fournisseurs préconfigurés. Il n'est donc pas nécessaire de spécifier l'attribut `data-share-endpoint`.

## Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (obligatoire)</strong></td>
    <td>Permet de sélectionner un type de fournisseur. Cela est obligatoire pour les fournisseurs préconfigurés et non configurés.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>Indique la cible dans laquelle la cible doit être ouverte. La valeur par défaut est <code>&#95;blank</code>, sauf pour les e-mails et les SMS sous iOS. Dans ce cas, la cible est définie sur <code>&#95;top</code>.
        Notez qu'il est conseillé de n'utiliser cette exception que pour les e-mails.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>Cet attribut est <strong>obligatoire pour les fournisseurs non configurés</strong>.
        <br>
          Certains fournisseurs populaires proposent des points de terminaison de partage préconfigurés. Pour plus d'informations à ce sujet, reportez-vous à la section <a href="#pre-configured-providers">Fournisseurs préconfigurés</a>. Dans le cas des fournisseurs non configurés, vous devez spécifier le point de terminaison du partage.</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td>Tous les attributs précédés de <code>data-param-*</code> sont transformés en paramètres d'URL et transmis au point de terminaison du partage.</td>
        </tr>
      </table>

## Fournisseurs préconfigurés <a name="pre-configured-providers"></a>

Le composant `amp-social-share` s'accompagne de [quelques fournisseurs préconfigurés](0.1/amp-social-share-config.js) qui connaissent leurs points de terminaison de partage, ainsi que de certains paramètres par défaut.

<table>
  <tr>
    <th class="col-twenty">Fournisseur</th>
    <th class="col-twenty">Type</th>
    <th>Paramètres</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">API Web Share</a> (ouvre la boîte de dialogue de partage du système d'exploitation)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code> : facultatif. Valeur par défaut : "Titre de la page active"</li>
        <li><code>data-mode</code> : facultatif. Si la valeur est définie sur <code>replace</code>, toutes les autres options de partage sont supprimées.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>E-mail</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code> : facultatif. Valeur par défaut : Titre de la page active</li>
        <li><code>data-param-body</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
        <li><code>data-param-recipient</code> : facultatif. Valeur par défaut : '' (chaîne vide)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code> : <strong>obligatoire</strong>. Valeur par défaut : aucune. Ce paramètre correspond à l'<code>app_id</code> Facebook qui est requis pour la <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">boîte de dialogue de partage Facebook</a>.</li>
        <li><code>data-param-href</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
        <li><code>data-param-quote</code> : facultatif. Peut être utilisé pour partager une citation ou un texte.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code> : facultatif (mais il est vivement recommandé de le définir). Valeur par défaut : aucune. URL de l'élément multimédia à partager sur Pinterest. Si ce paramètre n'est pas défini, l'utilisateur final est invité à importer un élément multimédia via Pinterest.</li>
        <li><code>data-param-url</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
        <li><code>data-param-description</code> : facultatif. Valeur par défaut : Titre de la page active</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Google+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
        <li><code>data-param-text</code> : facultatif. Valeur par défaut : Titre de la page active</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
        <li><code>data-param-text</code> : facultatif. Valeur par défaut : Titre de la page active</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>WhatsApp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code> : facultatif. Valeur par défaut : "Titre de la page active - URL de la page active"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code> : facultatif. Valeur par défaut : URL <code>rel=canonical</code></li>
        <li><code>data-param-text</code> : facultatif. Valeur par défaut : Titre de la page active</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code> : facultatif. Valeur par défaut : URL <code>rel=title - rel=canonical</code></li></ul>
      </td>
    </tr>
  </table>

## Fournisseurs non configurés <a name="non-configured-providers"></a>

En plus des fournisseurs préconfigurés, vous pouvez utiliser des fournisseurs non configurés en spécifiant des attributs supplémentaires dans le composant `amp-social-share`.

**Exemple : Création d'un bouton de partage pour un fournisseur non configuré**

L'exemple suivant illustre la création d'un bouton de partage via Facebook Messenger en définissant l'attribut `data-share-endpoint` sur le point de terminaison approprié pour le protocole personnalisé de Facebook Messenger.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

Étant donné que ces fournisseurs ne sont pas préconfigurés, vous devez créer les styles et l'image de bouton appropriés.

## Styles <a name="styles"></a>

### Styles par défaut <a name="default-styles"></a>

Par défaut, le composant `amp-social-share` inclut quelques fournisseurs préconfigurés bien connus. La couleur et le logo officiels de ces fournisseurs sont utilisés pour les boutons. La largeur et la hauteur par défaut sont respectivement de 60 pixels et de 44 pixels.

[tip type="success"]
Rendez-vous sur [AMP Start](https://ampstart.com/components#links-and-sharing) pour obtenir des liens de partage prédéfinis à utiliser dans vos pages AMP.
[/tip]

### Styles personnalisés <a name="custom-styles"></a>

Sachez que vous avez la possibilité de fournir votre propre style. Dans ce cas, il vous suffit d'ignorer les styles fournis comme suit :
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## Substitution de variables <a name="variable-substitution"></a>

Vous pouvez utiliser la [substitution de variables AMP globale](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) dans l'élément `<amp-social-share>`. Dans l'exemple ci-dessous, `TITLE` est remplacé par le titre de la page et `CANONICAL_URL` est remplacé par l'URL canonique du document.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-social-share](https://github.com/ampproject/amphtml/blob/master/extensions/amp-social-share/validator-amp-social-share.protoascii) dans les spécifications du validateur AMP.
