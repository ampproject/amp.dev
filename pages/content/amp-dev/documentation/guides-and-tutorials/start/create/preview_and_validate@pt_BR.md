---
$title: Visualizar e validar
---

Visualize a página AMP exatamente como visualizaria qualquer outro site HTML estático. Não é necessário uma etapa de compilação ou de pré-processamento. Uma das possibilidades:

  - **Abra a página diretamente no navegador a partir do sistema de arquivos** (certos elementos podem não funcionar devido a uma falha de XMLHttpRequests)
  - **Use um servidor da Web local, como o Apache 2 ou Nginx**.
    *(Dica: Para um servidor da Web rápido, execute `python -m SimpleHTTPServer`.)*

Depois, certifique-se de que sua página AMP** seja realmente válida para AMP**, caso contrário, ela não será descoberta e distribuída por plataformas de terceiros como a Pesquisa do Google. Para validar:

  1. Abra sua página no navegador.
  1. Adicione "`#development=1`“ ao URL, por exemplo,`http://localhost:8000/released.amp.html#development=1`.
  1. Abra o [console Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) e verifique se há erros de validação.

[Saiba mais sobre validação]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md', locale=doc.locale).url.path}}) e o que fazer quando ocorrerem erros.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/presentation_layout.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/prepare_for_discovery.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
