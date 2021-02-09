---
'$title': Comment créer une page AMP nécessitant une connexion
$order: 0
description: Sur une page, les interactions des utilisateurs, tels que les commentaires, peuvent être conditionnées un processus de connexion. Vous pouvez implémenter un processus de connexion ...
numbered: '1'
'$hidden': 'true'
formats:
  - websites
---

Sur une page, les interactions des utilisateurs, tels que les commentaires, peuvent être conditionnées un processus de connexion. Vous pouvez implémenter un processus de connexion avec AMP en utilisant le composant [`amp-access`](../../../../documentation/components/reference/amp-access.md) que vous associez au composant [`amp-form`](../../../../documentation/components/reference/amp-form.md).

[tip type="tip"] **CONSEIL –** Pour voir un exemple d'implémentation, consultez [l'exemple de section de commentaire](../../../../documentation/examples/documentation/Comment_Section.html) sur [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

[L'exemple de section de commentaire](../../../../documentation/examples/documentation/Comment_Section.html) combine [`amp-access`](../../../../documentation/components/reference/amp-access.md) et [`amp-form`](../../../../documentation/components/reference/amp-form.md) pour créer une section de commentaire qui ne s'active que lorsqu'un utilisateur s'est connecté. Afin d'expliquer le fonctionnement de cet exemple, jetons un œil à l'ensemble des actions qui seront effectuées une fois que vous aurez atterri sur la page.
