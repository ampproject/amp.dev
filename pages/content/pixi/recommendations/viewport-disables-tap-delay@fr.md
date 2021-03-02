---
'$title': Désactiver le délai tactile
$order: 50
tags:
  - fid
---

Définissez la largeur de la fenêtre pour qu'elle corresponde à la largeur de l'appareil pour désactiver le délai tactile, ce qui peut augmenter le FID. Pour supprimer ce délai de frappe de 300 à 350ms, modifiez la déclaration de la fenêtre d'affichage dans la section `<head>` de votre page comme suit:

```
<meta name="viewport" content="width=device-width">
```

Cela définit la largeur de la fenêtre d'affichage à la même largeur que celle de l'appareil et constitue généralement une bonne pratique pour les sites optimisés pour les appareils mobiles. Vous pouvez en [savoir plus sur la désactivation du délai tactile sur web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
