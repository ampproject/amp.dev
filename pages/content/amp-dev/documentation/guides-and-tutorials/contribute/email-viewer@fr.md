---
"$title": Utilisation de la visionneuse AMP pour afficher les e-mails
"$order": '5'
author: alabiaga
formats:
- email
---

Les clients de messagerie qui souhaitent prendre en charge AMP pour e-mails doivent utiliser la [visionneuse AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) pour héberger les e-mails AMP de leur expéditeur. Une visionneuse créée avec la [bibliothèque AMP Viewer](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration) encapsule un document AMP et active des [fonctionnalités](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/CAPABILITIES.md) permettant une communication bidirectionnelle avec le document AMP via postMessage. Ces capacités comprennent l'octroi du contrôle de la visibilité de l'e-mail, le relayage des métriques utilisateur et la fourniture de moyens d'assurer la sécurité des demandes XHR effectuées à partir de l'e-mail.

## Interception de la visionneuse XHR

La fonction `xhrInterceptor` la bibliothèque de la visionneuse AMP permet à celle-ci d'intercepter les requêtes XHR sortantes. La visionneuse AMP peut vérifier la validité et l'intention d'une requête afin d'assurer la protection et la confidentialité de ses utilisateurs.

#### Requêtes XHR

Les composants AMP tels que [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) et [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) nécessitent des appels aux points de terminaison pour publier ou récupérer des données. Ces appels sont appelées requêtes XHR.

#### Communication entre la visionneuse et le document AMP

Le protocole utilisé pour la communication entre la visionneuse et le document AMP est réalisé via [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). L'exeple suivant illustre postMessage au travail dans le cadre d'une interception XHR, où le visualiseur gère le postMessage xhr envoyé à partir d'un document AMP et renvoie une réponse personnalisée.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
   const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {type: 'application/json'});
   const response = new Reponse(blob, {status: 200});
   return response;
};
```

### Activation de l'interception XHR

Activez l'interception xhr en activant la visionneuse dans la fonction xhrInterceptor lors de l'initialisation. Veuillez consulter l'exemple de la visionneuse pour savoir comment cela est fait et pour un exemple sur l'interception xhr. Vous devez donc autoriser l'interception XHR sur le document. Pour ce faire, vous devez ajouter l'attribut `allow-xhr-interception` à la balise `<html amp4email>`. Le client de messagerie doit définir cet attribut sur le document AMP avant le rendu car l'un est intentionnellement invalide et sera signalé comme tel lors de la validation du document AMP.

```html
<!doctype html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Rendu du modèle côté serveur de la visionneuse

La fonction `viewerRenderTemplate` permet à la visionneuse de gérer le rendu des modèles [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) et [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). Lorsque cette fonction est activée, le runtime AMP transmet une requête contenant l'appel XHR original, les données du modèle et tout autre détail nécessaire pour le rendu du contenu du composant dans la visionneuse.  Cela permet à la visionneuse de vérifier le contenu des données du terminal et de gérer le rendu [moustache](https://mustache.github.io/) des modèles pour vérifier et nettoyer les données. Notez que si cette capacité est activée en même temps que xhrInterceptor, dans le composant amp-form et amp-list, la fonction `viewerRenderTemplate`, qui permet également d'envoyer des requêtes à la visionneuse, l'emportera sur celle de xhrInterceptor.

L'exemple [viewer.html](https://github.com/ampproject/amphtml/blob/master/examples/viewer.html) montre comment on peut traiter le message `viewerRenderTemplate` envoyé par le document AMP. Dans cet exemple, Viewer.prototype.processRequest_ capte le message `viewerRenderTemplate` et, en fonction du type de composant amp disponible dans la requête, renvoie le html à afficher au format JSON suivant.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) => Promise.resolve({
  "html":
    "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>"
      + "<div class='product' role='listitem'>Apple</div>"
      + "</div>",
  "body" : "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
});
```

Ceci est un exemple trivial où il n'y a pas de dépendance de bibliothèque de [moustache](https://mustache.github.io/) ou de nettoyage du contenu.

Le diagramme ci-dessous illustre un exemple plus réel de la façon dont un document AMP dans une visionneuse de client de messagerie doté d'une fonction `viewerRenderTemplate` pourrait gérer le rendu du modèle [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

Le runtime AMP transmettrait par proxy la demande de récupération de données du composant [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) au visualiseur, qui à son tour transmettrait cette demande à un serveur client de messagerie. Le serveur chargerait cette URL et les résultats de l'extraction d'URL via divers services, inspectant éventuellement la validité de l'URL, le contenu des données renvoyées par cette URL et afficherait les modèles de [moustache](https://mustache.github.io/) avec ces données. Il renverrait ensuite ce modèle rendu et le renverrait à la visionneuse dans le format de réponse JSON suivant.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
}
```

La valeur html dans la charge utile JSON sera ce qui est injecté dans le document AMP pour l'affichage.

Le tableau ci-dessous présente les fonctions et les composants concernés:

<table>
  <thead>
    <tr>
      <th width="30%">Fonction de visionneuse</th>
      <th>Composants concernés</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
