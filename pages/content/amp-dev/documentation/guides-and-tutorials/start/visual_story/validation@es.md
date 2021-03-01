---
'$title': Validación del código AMP HTML
$order: 8
description: Cada vez que cree una página de AMP, siempre debe comprobar que el AMP HTML sea correcto. Existen [varios métodos que puede utilizar para validar sus páginas AMP...
author: bpaduch
---

Debido a que las Web Stories se construyen con AMP, siempre debe comprobar que el código AMP HTML sea correcto. Puede [validar sus páginas AMP de varias formas](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). En este tutorial, habilitaremos el validador AMP activando el modo desarrollador. Para hacerlo, agregue el siguiente identificador de fragmento a su URL y vuelva a cargar la página:

```text
#development=1
```

Por ejemplo:

```text
http://localhost:8000/pets.html#development=1
```

Abra [Developers Console](https://developer.chrome.com/devtools/docs/console) en Chrome (o en el navegador que prefiera) y revise que no haya ningún error de AMP. Es posible que deba actualizar el navegador para ver los mensajes de validación. Si no hay ningún error en su página, debe ver el siguiente mensaje:

```text
AMP validation successful.
```
