---
layout: page
title: Prévisualiser et valider
order: 3
locale: fr
---

Prévisualisez la page AMP comme tout autre site HTML statique. Aucune étape de création ni aucun prétraitement ne sont requis. Soit :

  - **Ouvrez la page directement dans le navigateur à partir du système de fichiers** (certains éléments peuvent ne pas fonctionner en raison de l'échec de XMLHttpRequests). Soit :
  - **Utilisez un serveur Web local, tel qu'Apache 2 ou Nginx**.
    *(Conseil: Pour un serveur Web rapide, exécutez `python -m SimpleHTTPServer`.)*

Ensuite, vérifiez que votre page AMP **est une page AMP valide**. Dans le cas contraire, elle ne pourra pas être détectée ni distribuée par des plateforme tierces telles que Google Search. Pour valider :

  1. Ouvrez votre page dans votre navigateur.
  1. Ajoutez « `#development=1` » à l'URL, par exemple, `http://localhost:8000/released.amp.html#development=1`.
  1. Ouvrez la [console Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) et vérifiez les erreurs de validation.

[En savoir plus sur la validation](/docs/guides/validate.html) et la procédure à suivre en cas d'erreurs.

{% include button.html title="Continuer à l'Étape 5" link="/docs/get_started/create/prepare_for_discovery.fr.html" %}
