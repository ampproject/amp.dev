---
'$title': Preview and validate
$order: 5
description: 'Visualize a página AMP exatamente como visualizaria qualquer outro site HTML estático. Não é necessário uma etapa de compilação ou de pré-processamento. Você pode: ...'
author: pbakaus
contributors:
  - bpaduch
---

## Visualize

Visualize a página AMP exatamente como visualizaria qualquer outro site HTML estático. Não é necessário uma etapa de compilação ou de pré-processamento. Você pode:

- **Abrir a página diretamente no navegador a partir do sistema de arquivos** (certos elementos podem não funcionar devido a falha de XMLHttpRequests)
- **Usar um servidor da Web local, como o Apache 2 ou Nginx**. _(Dica: Para um servidor da Web rápido, execute `python -m SimpleHTTPServer`.)_

## Valide

Depois, certifique-se de que sua página AMP <strong>seja válida para AMP</strong>, caso contrário, ela não será descoberta e distribuída por plataformas de terceiros como a Busca do Google. Para validar:

1. Abra sua página no navegador.
2. Adicione "`#development=1`" à URL, por exemplo,`http://localhost:8000/released.amp.html#development=1`.
3. Abra o [console Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) e verifique se há erros de validação.

[tip type="read-on"] <strong>LEIA MAIS –</strong> [Saiba mais sobre validação](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) e o que fazer quando ocorrerem erros.[/tip]
