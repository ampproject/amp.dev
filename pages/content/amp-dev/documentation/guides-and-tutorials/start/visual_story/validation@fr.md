---
"$title": Valider votre code HTML AMP
"$order": '8'
description: Chaque fois que vous créez une page AMP, vous devez toujours vérifier que votre code HTML AMP est correct. Il existe [plusieurs méthodes que vous pouvez utiliser pour valider vos pages AMP ...
author: bpaduch
---

Étant donné que les stories Web sont créées avec AMP, vous devez toujours vérifier que votre code HTML AMP est correct. Il existe [plusieurs méthodes que vous pouvez utiliser pour valider les pages AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). Dans ce tutoriel, nous allons activer le validateur AMP en activant le mode développeur. Pour activer le mode développeur, ajoutez l'identifiant de fragment suivant à votre URL et rechargez la page :

```text
#development=1
```

Par exemple :

```text
http://localhost:8000/pets.html#development=1
```

Ouvrez la [console de développement](https://developer.chrome.com/devtools/docs/console) dans Chrome (ou votre navigateur préféré) et vérifiez qu'il n'y a pas d'erreurs AMP. Vous devrez peut-être actualiser votre navigateur pour voir les messages de validation. Si votre page ne contient pas d'erreurs, vous devriez voir le message :

```text
 AMP validation successful.
```
