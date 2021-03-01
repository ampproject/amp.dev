---
'$title': Validando o seu AMP HTML
$order: 8
description: Sempre que você criar uma página AMP, você deve validar se o seu AMP HTML está correto. Existem vários métodos que você pode usar para validar páginas AMP ...
author: bpaduch
---

Como as Histórias Web são criadas com AMP, você deve sempre validar se o seu AMP HTML está correto. Existem [vários métodos que você pode usar para validar páginas AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). Neste tutorial, vamos ativar o Validador AMP mudando para o modo de desenvolvedor. Para ativar o modo de desenvolvedor, adicione o seguinte identificador de fragmento à sua URL e recarregue a página:

```text
#development=1
```

Exemplo:

```text
http://localhost:8000/pets.html#development=1
```

Abra o [DevTools Console](https://developer.chrome.com/devtools/docs/console) no Chrome (ou no navegador que você preferir) e verifique se há erros de AMP. Talvez seja preciso atualizar o navegador para ver as mensagens de validação. Se a página não tiver erros, esta mensagem será exibida:

```text
AMP validation successful.
```
