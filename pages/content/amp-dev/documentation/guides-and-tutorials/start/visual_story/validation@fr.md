---
"$title": Validating your AMP HTML
"$order": '8'
description: Whenever you create an AMP page, you should always validate that your AMP HTML is correct. There are [several methods that you can use to validate your AMP pages ...
author: bpaduch
---

Because Web Stories are built with AMP, you should always validate that your AMP HTML is correct. There are [several methods that you can use to validate AMP pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). In this tutorial, we'll enable the AMP Validator by turning on the developer mode.  To turn on the developer mode, add the following fragment identifier to your URL and reload the page:

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
