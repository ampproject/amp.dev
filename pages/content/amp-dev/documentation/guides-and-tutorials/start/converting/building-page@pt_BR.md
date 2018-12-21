---
$title: Criar uma página HTML comum
---

O diretório do projeto contém um arquivo chamado [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). É para esse artigo que estamos criando uma página AMP equivalente.

1.  **Copie** todo o código do arquivo `article.html` e cole-o em um novo arquivo.
2.  **Salve** o novo arquivo como `article.amp.html`.

Observação: Não é preciso acrescentar `.amp.html` aos arquivos AMP. Eles podem ter qualquer extensão. Os editores normalmente adicionam parâmetros ao URL para diferenciar as páginas AMP das versões canônicas (por exemplo,  `http://publisher.com/article.html?amp`).

Seu arquivo `article.amp.html` precisa ter a seguinte forma:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

Essa página é bastante simples e tem elementos de artigo estáticos comuns: CSS, JavaScript e uma tag de imagem.

Por enquanto, a versão AMP do artigo é somente uma cópia do original. Vamos convertê-la para AMP.

Primeiro é preciso adicionar o arquivo da biblioteca AMP.  Isso não basta para converter a página, mas veremos a seguir como a biblioteca AMP pode nos ajudar a fazer isso.

Para incluí-la, **adicione** esta linha ao final da tag `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Carregue** a nova página `article.amp.html` no navegador em [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html). Em seguida, **abra** o [Developers Console](https://developer.chrome.com/devtools/docs/console) no Google Chrome ou no navegador de sua preferência.

Quando você verificar a saída do JavaScript no Developers Console, tendo selecionado a guia certa, esta entrada de registro aparecerá:

```text
Powered by AMP ⚡ HTML
```

Um [validador de AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md', locale=doc.locale).url.path}}) está incluído na biblioteca AMP. Ele mostrará se há algo impedindo sua página de ser um documento AMP válido.  **Ative** o validador ao adicionar este identificador de fragmento ao URL do seu documento:

```text
#development=1
```

Exemplo:

```text
http://localhost:8000/article.amp.html#development=1
```

Vários erros de validação aparecerão no Developers Console. Talvez seja preciso atualizar manualmente a página no navegador para vê-los:

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='erros de validação de AMP da sua amostra') }}

Para tornar o documento AMP válido, será preciso corrigir todos os erros. Faremos isso neste codelab.

Antes, porém, vamos **simular** uma experiência em um dispositivo móvel nas ferramentas do desenvolvedor no navegador, já que estamos trabalhando com um artigo para dispositivos móveis.  Por exemplo, no Chrome DevTools, clique no ícone de smartphone e selecione um dispositivo móvel no menu.

Uma resolução simulada em dispositivo móvel, como a mostrada abaixo, aparecerá no navegador:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Simulação da página AMP em dispositivo móvel ') }}

Agora podemos começar! Vamos analisar cada erro de validação e ver como eles estão relacionados a AMP.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/setting-up.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/resolving-errors.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
