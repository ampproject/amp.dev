---
$title: Criar um blog ao vivo
---

Os blogs ao vivo são páginas da Web atualizadas com frequência durante eventos em andamento, como competições esportivas ou eleições. É possível implementar um blog ao vivo nas AMP por meio do componente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

Este tutorial oferece uma visão geral sobre o componente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) e se concentra em alguns detalhes de implementação dos blogs ao vivo, como a [paginação](#pagination) e os [links diretos](#deeplinking). A [amostra de blog ao vivo](live_blog.md) do AMP By Example será usada para ilustrar a implementação de blogs ao vivo nas AMP.

[tip type="success"]

Use a [marcação de metadados LiveBlogPosting](http://schema.org/LiveBlogPosting) (em inglês) para integrar seu blog a recursos de plataformas de terceiros.

[/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Visão geral do amp-live-list

O componente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) normalmente busca conteúdo atualizado no documento do host e atualiza o navegador do usuário à medida que novos itens se tornam disponíveis Assim, sempre que for preciso adicionar uma nova postagem no blog, o documento do host será atualizado pelo CMS para incluir a atualização no corpo e na [seção de metadados](../../../documentation/examples/documentation/Live_Blog.html#metadata) da página.

Este é um exemplo do código inicial do blog:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Vamos analisar esse código:

Cada componente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) precisa ter um código exclusivo, porque pode haver mais de um deles na página.  Nesse exemplo, especificamos `my-live-list` como o código exclusivo.

O atributo `data-poll-interval` especifica a frequência das pesquisas. Se o documento do host for atualizado, a atualização será disponibilizada para o usuário após o próximo intervalo.

Toda vez que um novo item for adicionado ao documento do host, o elemento `<button update on="tap:my-live-list.update">` exibirá um botão indicando que há atualizações ("You have updates", na imagem). Com um clique, ele mostra as últimas postagens na página.

O conteúdo dos blogs ao vivo pode aumentar bastante, o que deixa a página muito longa. Use o atributo `data-max-items-per-page` para especificar quantos itens poderão ser adicionados ao blog ao vivo. Se o número de itens após uma atualização for superior a `data-max-items-per-page`, as atualizações mais antigas que ultrapassarem esse número serão removidas. Por exemplo, se a página tiver 9 itens, `data-max-items-per-page` estiver definido como 10 e a última atualização tiver 3 itens novos, os 2 itens mais antigos serão removidos da página após essa atualização.

O componente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) exige que todas as postagens sejam filhas da tag `<div items></div>`. Ao se referir a cada postagem como um item, cada item precisa ter um `id` exclusivo e um `data-sort-time`.

## Detalhes da implementação

Agora que você conhece o componente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), veremos como implementar um blog ao vivo mais complexo. Leia mais para saber como implementar a paginação e como funcionam os links diretos.

### Paginação <a name="pagination"></a>

Os blogs longos podem usar a paginação para melhorar o desempenho ao limitar o número de itens exibidos em cada página. Para implementar a paginação, adicione o elemento `<div pagination></div>` ao componente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) e insira a marcação necessária para a paginação (por exemplo, um número de página ou links para a página seguinte e a anterior).

Com a paginação, o código simples que usamos antes ficará assim:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

Você precisa atualizar a página hospedada para preencher os itens de navegação corretamente. Por exemplo, na [amostra de blog ao vivo](live_blog.md), renderizamos a página por meio de um modelo no servidor e usamos um parâmetro de consulta para especificar o primeiro item do blog que deverá ser exibido na página. Limitamos o tamanho da página a 5 itens. Portanto, se o servidor tiver gerado mais de 5 itens, quando um usuário for para a página principal, ela mostrará o elemento "Próxima" na área de navegação. Consulte [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) para saber mais.

Quando o tamanho das postagens do blog ultrapassar o número máximo de itens especificado por `data-max-items-per-page`, os itens mais antigos serão exibidos nas páginas seguintes (por exemplo, na página 2). Como [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) pesquisa o servidor regularmente para ver se há alguma alteração nos itens, não será preciso fazer essa pesquisa se o usuário não estiver na primeira página.

É possível adicionar o atributo "disabled" à página hospedada para evitar a ação do mecanismo de pesquisa. Na amostra de blog ao vivo, usamos esse comportamento em um modelo no servidor. Quando a página solicitada não for a primeira, adicionaremos o atributo "disabled" ao componente amp-live-list.

### Links diretos <a name="deeplinking"></a>

Ao publicar uma postagem do blog, é importante poder criar links diretos para a postagem, porque isso permite o uso de recursos como o compartilhamento. Com o [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), basta usar o `id` do item do blog para criar um link direto. Por exemplo, na amostra [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3), é possível navegar diretamente para a postagem do blog com o código `post3`.

O AMP By Example usa um cookie na [amostra de blog ao vivo](live_blog.md) para gerar conteúdo novo. Assim, se for a primeira vez que você acessa a página, talvez a postagem com código "post3" não esteja disponível, mas você será redirecionado para a primeira postagem.

## Recursos

Saiba mais com estes recursos:

- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [amostra de blog ao vivo no AMP By Example](live_blog.md)
