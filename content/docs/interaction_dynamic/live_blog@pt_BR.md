---
$title: Criar um blog ao vivo
---

[TOC]

Os blogs ao vivo são páginas da Web atualizadas com frequência durante um evento em andamento, como a Copa do Mundo.

Um blog ao vivo pode ser implementado nas AMP por meio do componente `amp-live-list` usando a marcação LiveBlogPosting. Para ver um exemplo de implementação que você pode usar como ponto de partida, acesse a [amostra de blog ao vivo](https://www.ampbyexample.com/samples_templates/live_blog/) em [ampbyexample.com](https://www.ampbyexample.com).

Este tutorial oferece uma visão geral sobre o componente `amp-live-list` e se concentra em alguns detalhes de implementação como a paginação e os links diretos. A amostra de blog ao vivo será usada como exemplo para todos esses casos.

## Visão geral do amp-live-list

O componente `amp-live-list` normalmente busca conteúdo atualizado no documento do host e atualiza o navegador do usuário final à medida que novos itens se tornam disponíveis. Assim, sempre que for preciso adicionar uma nova postagem no blog, o documento do host deverá ser atualizado pelo CMS para incluir a atualização no corpo e na seção de metadados.

Esta é a aparência de um blog inicial:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">Você tem atualizações.</button>
    <div items></div>
</amp-live-list>
[/sourcecode]

O atributo `data-poll-interval` permite especificar a frequência das pesquisas. Se o documento do host for atualizado, a atualização será disponibilizada para o usuário após o próximo intervalo de tempo.

Toda vez que um novo item for adicionado ao documento do host, o elemento `<button update on="tap:my-live-list.update">` exibirá um botão para acionar a exibição das últimas postagens na página.

Os blogs ao vivo podem crescer, o que torna a página muito longa. Por isso, o atributo `data-max-items-per-page` permite que você especifique quantos itens podem ser adicionados à página do blog ao vivo. Se o número de itens após uma atualização for superior a `data-max-items-per-page`, as atualizações mais antigas que ultrapassarem esse número serão removidas. Por exemplo, se a página tiver nove itens, `data-max-items-per-page` estiver definido como 10 e a última atualização tiver três itens novos, os dois itens mais antigos serão removidos da página após a atualização.

`amp-live-list` exige que todas as postagens sejam derivadas da tag `<div items></div>`. Ao se referir a cada publicação como um item, cada item precisa ter um único `id` e um `data-sort-time`.

## Detalhes da implementação de blog ao vivo

Agora que você está familiarizado com o componente `amp-live-list`, veremos como implementar um blog ao vivo mais complexo. Leia mais para saber sobre como implementar a paginação e como funcionarão os links diretos.

## Paginação

Os blogs longos podem usar a paginação para melhorar o desempenho limitando o número de itens de blog exibidos em uma página. Para implementar a paginação, adicione o elemento `<div pagination></div>` no componente `amp-live-list` e insira a marcação necessária para a paginação (por exemplo, um número de página ou um link para a página seguinte e a anterior).

Ao usar a paginação, o código simples que usamos anteriormente fica assim:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">Você tem atualizações.</button>
    <div items></div>
    <div pagination>
        <nav>
            <ul>
                <li>1</li>
                <li>Próxima</li>
            </ul>
        </nav>
    </div>
</amp-live-list>
[/sourcecode]

É sua responsabilidade preencher os itens de navegação corretamente com a atualização da página hospedada. Por exemplo, na [amostra de blog ao vivo](https://www.ampbyexample.com/samples_templates/live_blog/) processamos a página através de um modelo do lado do servidor e usamos um parâmetro de consulta para especificar qual deve ser o primeiro item do blog. Limitamos o tamanho da página a cinco itens. Portanto, se o servidor tiver gerado mais de cinco itens, quando um usuário for para a página principal, ela mostrará o elemento "Próxima" na área de navegação.

<amp-img src="/static/img/liveblog-pagination.png" alt="Live blog pagination" height="526" width="300"></amp-img>

Quando o tamanho das postagens do blog ultrapassar o número máximo de itens especificados por `data-max-items-per-page`, os itens de blog mais antigos serão exibidos nas páginas seguintes, por exemplo, na página 2. Como `amp-live-list` pesquisa no servidor regularmente para ver se há alguma alteração nos itens, não será preciso pesquisar o servidor se o usuário não estiver na primeira página.

É possível adicionar o atributo "disabled" à página hospedada para evitar a ação do mecanismo de pesquisa. Na amostra de blog ao vivo, usamos esse comportamento em um modelo do lado do servidor. Quando a página solicitada não é a primeira, adicionamos o atributo "disabled" ao componente amp-live-list.

## Links diretos

Ao publicar uma postagem de blog, é importante poder fazer um link direto para a postagem a fim de habilitar recursos como o compartilhamento. Com o `amp-live-list`, é possível fazer um link direto somente com o código do item do blog. Por exemplo, [https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3) permite que você navegue diretamente para a postagem do blog com código "post3".

Na [amostra de blog ao vivo](https://www.ampbyexample.com/samples_templates/live_blog/) usamos uma técnica baseada em um cookie para gerar conteúdo novo (veja mais detalhes sobre esse recurso na seção "Amostra de blog ao vivo"). Assim, caso seja seu primeiro acesso à página, a postagem com código "post3" poderá não estar disponível e redirecionaremos você para a primeira postagem.

