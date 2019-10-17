---
$title: Validar el código AMP HTML
---

Siempre que crees una página AMP, debes comprobar que el código AMP HTML sea correcto. Puedes [validar tus páginas AMP de varias formas](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md).  En este tutorial, habilitaremos el validador AMP activando el modo desarrollador. Para hacerlo, añade el siguiente identificador de fragmento a tu URL y vuelve a cargar la página:

```text
#development=1
```

Por ejemplo:

```text
http://localhost:8000/pets.html#development=1
```

Una vez que lo hayas hecho, abre [Developers Console](https://developer.chrome.com/devtools/docs/console) en Chrome (o en el navegador que uses) y verifica que no haya ningún error de AMP. Es posible que tengas que actualizar el navegador para ver los mensajes de validación. Si no hay ningún error en tu página, deberías ver el siguiente mensaje:

```text
AMP validation successful.
```
