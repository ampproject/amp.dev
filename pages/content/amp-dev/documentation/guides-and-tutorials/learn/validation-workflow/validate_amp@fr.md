---
$title: Valider les pages AMP
---

La principale force de l'AMP n'est pas seulement d'accélérer le chargement de vos pages. Sa particularité est de permettre de *valider* cette vitesse. Ainsi, cela peut inciter des tierces parties telles que Twitter, Instagram ou la recherche Google à proposer à leurs lecteurs des pages AMP de façon toujours plus intéressante.

## Comment puis-je vérifier si ma page AMP est valide ?

Il existe plusieurs façons de valider un document AMP. Elles produiront toutes le même résultat. Vous pouvez donc utiliser la plus adaptée à votre style de développement.

En plus d'être valide, votre document AMP doit également être [visible](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) par les plates-formes tierces.

### Developer Console dans le navigateur

Le validateur AMP est intégré à la bibliothèque JavaScript AMP. Il est donc disponible instantanément sur chaque page AMP. Pour procéder à la validation :

  * Ouvrez votre page AMP dans votre navigateur.
  * Ajoutez "`#development=1`" à l'URL, par exemple, `http://localhost:8000/released.amp.html#development=1`.
  * Ouvrez la [console des outils pour les développeurs Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) et vérifiez les erreurs de validation.

Les erreurs sont présentées de la façon suivante dans la Developer Console :

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Capture d&#39;écran des erreurs du validateur AMP dans la Developer Console Chrome"></amp-img>

### Interface Web

Le validateur AMP peut être utilisé comme interface Web sur [validator.ampproject.org](https://validator.ampproject.org/). Cette interface affiche les erreurs à côté du code source HTML de la page.
L'interface est un éditeur interactif : les modifications apportées au code HTML source entraînent une nouvelle validation interactive.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Capture d&#39;écran de validator.ampproject.org avec des exemples d&#39;erreurs."></amp-img>

### Extension du navigateur

Le validateur AMP est accessible directement à partir de la barre d'outils de votre navigateur en utilisant une extension dans le navigateur. Au fil de votre navigation, l'extension valide automatiquement chaque page AMP consultée et vous indique sous forme d'icône de couleur la validité de la page.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="Icône AMP rouge indiquant un document AMP incorrect."></amp-img>

    </td>
    <td>Si la page AMP comporte des erreurs, l'icône de l'extension concernée s'affiche en rouge et indique le nombre d'erreurs trouvées.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="Icône AMP verte indiquant un document AMP valide."></amp-img>

    </td>
    <td>Si la page AMP ne comporte pas d'erreur, l'icône s'affiche en vert et, le cas échéant, indique le nombre d'avertissements.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="Icône AMP bleue indiquant une variante AMP HTML si l&#39;on clique dessus."></amp-img>

    </td>
    <td>Si une version AMP d'une page standard est disponible, l'icône s'affiche en bleu, avec une icône de lien. Il suffit de cliquer sur l'extension pour être redirigé vers la version AMP de la page dans le navigateur.
    </td>
  </tr>
</table>

Extension du validateur AMP pour [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) et [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Outil de ligne de commande

Vous devez installer au préalable <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js et son gestionnaire de package `npm` sur votre système</a>.

Pour installer l'[outil de ligne de commande du validateur AMP HTML](https://www.npmjs.com/package/amphtml-validator), saisissez `npm install -g amphtml-validator`.

Validons à présent une véritable page AMP HTML.

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Cette page AMP HTML est valide. Rien de surprenant à cela. Intéressons-nous à présent à une page incorrecte : [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Pour exécuter la commande `amphtml-validator`, vous pouvez fournir l'URL de la page ou un nom de fichier local. Téléchargez et enregistrez [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) dans un fichier, puis exécutez :

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Le format des messages d'erreur comprend le nom du fichier, la ligne, la colonne et le message, le tout étant souvent suivi d'un lien vers la référence AMP HTML. Certains éditeurs, y compris Emacs (cherchez la commande de compilation et le mode de compilation), peuvent interpréter ce format et vous permettre d'accéder directement aux erreurs dans le fichier original.

Un bon point de départ pour créer votre propre page AMP consiste à utiliser [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) :

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

L'outil de ligne de commande offre des fonctionnalités supplémentaires, y compris la désactivation de la couleur, l'impression d'une sortie JSON ou l'exécution d'une version spécifique du validateur JavaScript (par défaut, il exécute le dernier script publié).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## Que se passe-t-il si ma page n'est pas valide ?

Le validateur AMP n'est pas seulement un outil pratique qui vous est destiné durant le développement. Il est également utilisé par des plates-formes comme Twitter ou Google qui intègrent vos pages AMP dans leur contenu et leurs résultats de recherche. Qui plus est, ces plates-formes ne demandent généralement pas à accéder à vos pages depuis votre serveur, mais elles utilisent le cache AMP Google, un service gratuit qui met en cache vos pages et les rend disponibles dans le monde entier, pour qu'elles se chargent encore plus vite.

Si le service de validation AMP détecte que votre page présente un problème, elle ne sera pas visible, ne sera pas diffusée par des sites Web tiers et ne s'affichera pas dans le cache AMP Google. Ainsi, non seulement vous perdrez les avantages du cache en termes de vitesse, mais votre page risque de ne pas s'afficher à de nombreux endroits. Ce serait dommage, alors assurons-nous que cela ne se produira pas.

## Comment puis-je corriger les erreurs de validation ?

Il est facile d'identifier et de corriger la plupart des erreurs de validation. Prenez cette balise HTML :

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Elle génère cette erreur de validation AMP, présentée dans ces différents outils :

 * Developer Console dans le navigateur
<amp-img alt="Erreur AMP : la balise &quot;img&quot; ne peut s&#39;afficher que comme descendante de la balise &quot;noscript&quot;.Vouliez-vous dire &quot;amp-img&quot; ?ligne 11, colonne 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

 * Interface Web
<amp-img alt="Erreur AMP : la balise &quot;img&quot; ne peut s&#39;afficher que comme descendante de la balise &quot;noscript&quot;.Vouliez-vous dire &quot;amp-img&quot; ?ligne 11, colonne 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

 * Extension du navigateur
<amp-img alt="Erreur AMP : la balise &quot;img&quot; ne peut s&#39;afficher que comme descendante de la balise &quot;noscript&quot;.Vouliez-vous dire &quot;amp-img&quot; ?ligne 11, colonne 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

Chaque outil donne plusieurs informations :

  * L'endroit (ligne et colonne) où l'erreur est survenue dans le document HTML. Certaines interfaces permettent de cliquer dessus pour mettre en surbrillance cet endroit. Dans le cas présent, le problème se trouve à la ligne 11, colonne 2.
  * Une ligne de texte décrivant l'erreur. Dans le cas présent, le texte indique que nous utilisons une balise `<img>`, alors que nous aurions dû utiliser une balise [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).
  * Un lien vers un document pertinent à propos de l'erreur. Dans le cas présent, il s'agit de la documentation concernant la balise [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). Toutes les erreurs ne génèrent pas de liens vers la documentation connexe.

En relisant attentivement la spécification, nous réalisons que nous utilisons une balise `<img>` au lieu d'une balise [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Pour mieux comprendre la liste complète des erreurs potentielles, consultez le [guide des erreurs de validation AMP](validation_errors.md).
Si vous êtes toujours bloqué après un examen minutieux du guide, [posez-nous votre question](http://stackoverflow.com/questions/tagged/amp-html) et nous essaierons de vous aider.
