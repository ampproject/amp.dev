---
'$title': 'AMP pour e-mails: bonnes pratiques'
$order: 1
'$category': Develop
formats:
  - email
---

AMP offre de nouveaux types passionnants de contenus immersifs et attrayants dans les e-mails! Lors de la conception d'e-mails, gardez à l'esprit les bonnes pratiques suivantes pour vous assurer que vos e-mails sont performants et fiables sur toutes les plateformes et qu'ils fonctionnent comme vos utilisateurs le souhaitent.

#Vitesse

Lorsque vous utilisez [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) pour récupérer du contenu de manière dynamique, ajoutez un caractère de remplacement pour conserver l'intégrité de la structure des composants. Le caractère de remplacement doit avoir une mise en page aussi similaire que possible au document une fois qu'il a renvoyé les données demandées. Cela garantit que la taille du message ne change pas ou ne modifie pas la mise en page de manière significative.

#Utilisation et accessibilité

- Lorsque vous utilisez [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email), assurez-vous que l'attribut `controls` est défini. Cela permet aux utilisateurs d'appareils à écran tactile tels que les smartphones de naviguer dans le carrousel.
- Lorsque vous utilisez [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), gardez à l'esprit que tous les types d'entrée ne sont pas pris en charge sur iOS. Consultez les [Valeurs d'entrée prises en charge](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) dans la Référence HTML Safari pour plus de détails.
- Toutes les [valeurs d'attribut `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) sont pas prises en charge par les différents applications et navigateurs. Supposez que la saisie automatique n'est pas disponible pour vos utilisateurs et gardez les formulaires courts.

#Style

- Assurez-vous que votre e-mail n'utilise que du [CSS pris en charge par AMP pour e-mails](../learn/email-spec/amp-email-css.md?format=email)
- Évitez d'utiliser des unités de fenêtre (`vw`, `vh` , `vmin` et `vmax`) dans votre CSS et HTML. Étant donné que les e-mails AMP sont affichés dans une iframe, la fenêtre d'affichage de l'e-mail ne correspond pas à la fenêtre d'affichage du navigateur.
- Les navigateurs ont un style CSS différent par défaut. Utilisez une bibliothèque CSS qui normalise les styles si nécessaire. Pour plus d'informations sur les styles par défaut, la normalisation des styles et une liste des bibliothèques disponibles, voir [Redémarrage, réinitialisation et raisonnement](https://css-tricks.com/reboot-resets-reasoning/) .
- Faites attention aux marges débordantes dans CSS: elles peuvent ne pas être affcihées en raison d'une [limitation de mise en page AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Mobile

Assurez-vous que votre message s'affiche correctement sur toutes les tailles d'écran en utilisant [des requêtes multimédias CSS](style_and_layout/control_layout.md?format=email) pour identifier l'appareil. Les messages doivent être testés sur les appareils mobiles pour s'assurer que la mise en page est correcte et que les composants fonctionnent comme prévu.

#Autres avantages

Lorsque vous utilisez AMP pour e-mails, gardez à l'esprit les conseils et astuces suivants:

- Le playground AMP pour e-mails ne fournit pas de proxy aux XHR, contrairement à certains fournisseurs de messagerie.
- La partie AMP MIME doit apparaître avant la partie HTML MIME de votre e-mail pour garantir une compatibilité maximale entre les clients de messagerie.
- L'attribut `src` de [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) , l'attribut [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) de [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) , l'attribut `src` de [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) ou l'attribut href d'une balise `<a>` ne peut pas être muté par [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- Vos messages doivent inclure une version HTML statique dans le cas où un utilisateur est dirigé vers la version HTML du message, ou si cet utilisateur transfère le message.
