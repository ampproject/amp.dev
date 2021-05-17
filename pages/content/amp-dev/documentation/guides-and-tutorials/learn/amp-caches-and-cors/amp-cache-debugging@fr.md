---
'$title': Déboguer les problèmes de cache AMP
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: ' Pourquoi mon document est-il cassé sur un cache AMP ?'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Pourquoi mon document est-il cassé sur un cache AMP ? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Les documents AMP valides apparaissent et se comportent généralement de la même manière sur les caches AMP que sur l'origine. Cependant, certains composants et configurations de serveur peuvent poser problème.

Si un document particulier apparaît et se comporte comme prévu sur votre origine, mais pas lorsqu'il est affiché via le cache ([comment cartographier les URL d'origine vers le cache AMP de Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), essayez ce qui suit :

1. Ouvrez la console des outils de développement/d'erreur de votre navigateur et résolvez les erreurs ou les avertissements qui apparaissent.
2. Exécutez le document via [AMPBench](https://search.google.com/test/amp) et résolvez les erreurs ou avertissements inattendus.

Si vous rencontrez toujours un problème après avoir suivi ces étapes, consultez le tableau ci-dessous.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Symptôme</th>
      <th width="30%">Problème</th>
      <th width="40%">Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Les polices Web n'apparaissent pas (des polices de remplacement sont utilisées)</td>
      <td>Le cache AMP n'est pas répertorié en blanc par le fournisseur de polices.</td>
      <td>Contactez le fournisseur de polices et demandez-lui d'autoriser <a href="amp-cors-requests.md#cors-security-in-amp">tous les caches</a> .</td>
    </tr>
    <tr>
      <td>Les éléments (par exemple, les polices et les images) n'apparaissent pas (<strong>origines HTTP uniquement</strong>)</td>
      <td>Le document utilise des URL relatives au protocole.</td>
      <td>Passez aux URL absolues (c'est-à-dire <code>http://www.site.com/doc/amp</code>, et non <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Les éléments (par exemple, les polices et les images) n'apparaissent pas</td>
      <td>Les éléments sont diffusés avec un type MIME incorrect.</td>
      <td>Spécifiez un <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">type MIME acceptable</a> .</td>
    </tr>
    <tr>
      <td>Le cache AMP ne peut pas accéder aux éléments.</td>
      <td>Assurez-vous que le cache AMP peut accéder à vos éléments et qu'il n'est pas bloqué par une adresse IP, ou un agent utilisateur, etc. (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Liste des agents utilisateurs utilisés par le robot d'exploration de Google</a>).</td>
    </tr>
    <tr>
      <td>Les éléments dynamiques tels que <code><amp-form></amp-form></code>, <code><amp-list></amp-list></code>, ne se comportent pas comme prévu.</td>
      <td>En-têtes CORS cassés ou manquants.</td>
      <td>Ces composants effectuent des requêtes vers l'origine depuis le cache AMP. Par défaut, les navigateurs bloquent ces requêtes. Pour les autoriser, émettez des <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">en-têtes CORS</a> qui permettent le listing de <a href="amp-cors-requests.md">tous les caches</a>.</td>
    </tr>
    <tr>
      <td>Le contenu diffusé doit être supprimé en raison d'un avis légal de retrait.</td>
      <td>Le cache AMP n'a pas encore pris en charge la suppression.</td>
      <td>Suivez les instructions pour chaque cache AMP afin d'actualiser le contenu. Pour Google AMP Cache, consultez la section <a href="https://developers.google.com/amp/cache/update-cache">Mettre à jour le contenu AMP</a> .</td>
    </tr>
</tbody>
</table>

</table>
