---
layout: page
title: Como o AMP acelera o desempenho
order: 2
locale: pt-br
---

Combinadas, as otimizações a seguir são a razão das páginas AMP serem tão rápidas que parecem carregar instantaneamente:

{% include toc.html %}

Se você prefere ouvir em vez de ler, este vídeo feito pelo engenheiro-chefe em AMP, Malte Ubl, passa uma visão geral semelhante aos próximos parágrafos.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Permitir apenas scripts assíncronos

O JavaScript é uma ferramenta eficaz,
que pode modificar praticamente todos os aspectos da página,
mas também pode bloquear uma construção em DOM e atrasar a renderização da página
(veja também [Adicionar interatividade com o JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
Para evitar que o JavaScript atrase a renderização da página,
o AMP permite apenas o JavaScript assíncrono. 

Páginas AMP não podem incluir JavaScript escrito pelo autor.
Em vez de usar JavaScript,
os recursos interativos da página são processados em elementos AMP personalizados.
Os elementos AMP personalizados podem incluir JavaScript,
mas são projetados cuidadosamente para garantir que não atrapalhem o desempenho.

Embora JS de terceiros seja permitido nos iframes,
ele não pode bloquear a renderização.
Por exemplo, se o JS de terceiros usar a
[API `document.write` muito prejudicial para o desempenho](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/),
ela não bloqueará a renderização da página principal.

## Dimensionar todos os recursos estaticamente

Recursos externos, como imagens, anúncios ou iframes, devem informar seu tamanho no HTML
para que o AMP possa determinar o tamanho e a posição de cada elemento antes de que seja feito o download dos recursos.
O AMP carrega o layout da página sem esperar que seja feito o download dos recursos.

O AMP separa o layout do documento do layout do recurso.
Apenas uma solicitação HTTP é necessária para se ter o layout do documento inteiro
([+fontes](#font-triggering-must-be-efficient)).
Como o AMP é otimizado para evitar recálculos de estilo e layouts pesados no navegador,
o layout não será recriado quando os recursos forem carregados.

## Não permitir que mecanismos de extensões bloqueiem a renderização

O AMP não permite que mecanismos de extensões bloqueiem a renderização da página.
O AMP oferece suporte a extensões para itens como
[efeitos Lightbox](/docs/reference/extended/amp-lightbox.html),
[incorporações do Instagram](/docs/reference/extended/amp-instagram.html),
[tweets](/docs/reference/extended/amp-twitter.html) etc.
Embora eles precisem de solicitações HTTP adicionais,
essas solicitações não bloqueiam o layout e a renderização da página. 

Qualquer página que use um script personalizado deve informar ao sistema AMP
que ela futuramente terá uma tag personalizada.
Por exemplo, o script [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
informa ao sistema que haverá uma tag `amp-iframe`.
O AMP cria a caixa de iframe antes mesmo de saber o que ela incluirá: 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Remover qualquer JavaScript de terceiros do caminho essencial

JS de terceiros costuma usar o carregamento síncrono de JS.
Eles também gostam de `document.write` mais scripts síncronos.
Por exemplo, se tiver cinco anúncios e cada um realizar três carregamentos de sincronização
em uma conexão com 1 segundo de latência,
você terá 18 segundos de carregamento apenas para carregar o JS. 

As páginas AMP permitem o uso de JavaScript de terceiros, mas apenas em iframes com sandbox.
Ao serem restritos a iframes, eles não podem bloquear a execução da página principal.
Mesmo que façam com que o estilo seja recalculado várias vezes,
seus iframes pequenos contêm muito pouco DOM. 

Recálculos de estilos e layouts são típicos para o tamanho de DOM,
então os recálculos de iframe são muito rápidos em comparação
a um recálculo de estilos e layout para a página.

## Qualquer CSS deve ser inline e de tamanho limitado

O CSS bloqueia toda a renderização, bloqueia o carregamento da página e costuma ser excessivo.
Nas páginas AMP HTML, apenas estilos inline são permitidos.
Isso remove uma ou até mais solicitações HTTP do caminho essencial de renderização
em comparação com a maioria das páginas da Web.

Além disso, a folha de estilo inline deve ter um tamanho máximo de 50 kilobytes.
Embora esse tamanho seja grande o suficiente para páginas muito sofisticadas,
ele ainda exige que o autor da página otimize o CSS.

## O acionamento de fontes deve ser eficiente

As fontes da Web são muito grandes, então uma
[otimização de fontes da Web](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
é essencial para o desempenho.
Em uma página comum, com poucos scripts de sincronização e poucas folhas de estilo externas,
o navegador fica esperando para começar a fazer o download dessas fontes enormes até que tudo isso aconteça.

O sistema AMP declara zero solicitação HTTP até que comece o download das fontes.
Isso só é possível porque todo JS em AMP tem o atributo de sincronização
e apenas folhas de estilo inline são permitidas;
nenhuma solicitação HTTP impede que o navegador faça o download das fontes.

## Minimizar os recálculos de estilo

Cada vez que você mede algo, recálculos de estilo são acionados, o que é pesado,
pois o navegador precisa refazer o layout da página inteira.
Nas páginas AMP, todas as leituras de DOM são realizadas primeiro, antes de todas as gravações.
Isso garante que ocorra, no máximo, um recálculo de estilos por frame.

Saiba mais sobre o impacto dos recálculos de estilo e layout em
[desempenho de renderização](https://developers.google.com/web/fundamentals/performance/rendering/).

## Executar apenas animações aceleradas por GPU

A única maneira de ter otimizações rápidas é executá-las na GPU.
A GPU entende camadas, sabe como realizar atividades nessas camadas,
pode movê-las, pode desvanecê-las, mas não pode atualizar o layout da página;
ela passa essa tarefa para o navegador e isso não é bom.

As regras para CSS relacionado a animações garantem que as animações possam ser aceleradas pela GPU.
Especificamente, o AMP permite animação e transição apenas em transform e opacity
para que o layout da página não seja necessário.
Saiba mais sobre como
[usar transform e opacity em alterações de animação](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count).

## Priorizar o carregamento de recursos

O AMP controla todos os downloads de recursos: ele prioriza o carregamento de recursos,
carregando apenas o necessário, e realiza a pré-busca de recursos de carregamento lento. 

Quando o AMP baixa recursos, ele otimiza os downloads
para que se faça primeiro o download dos recursos mais importantes no momento.
Somente é feito o download de imagens e anúncios quando forem ser vistos pelo usuário,
vistos acima da dobra ou se for provável que o usuário chegue a eles rapidamente.  

O AMP também realiza a pré-busca de recursos de carregamento lento.
Os recursos são carregados o mais tarde possível, mas a pré-busca é feita assim que possível.
Dessa forma, tudo é carregado muito rapidamente, mas a CPU só é usada
quando os recursos são exibidos aos usuários.

## Carregar páginas em um instante

A nova [preconnect API](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
é muito usada para garantir que as solicitações HTTP sejam tão rápidas quanto possível ao serem feitas.
Assim,
uma página pode ser renderizada antes de o usuário informar explicitamente que deseja navegar até ela;
a página pode já estar disponível quando o usuário a selecionar,
fazendo com que o carregamento seja instantâneo.

Embora a pré-renderização possa ser aplicada a todo o conteúdo Web,
ela também pode usar muita largura de banda e recursos de CPU. O AMP é otimizado para reduzir esses fatores. A pré-renderização somente faz o download dos recursos acima da dobra
e não renderiza itens que possam ser pesados em termos de uso de CPU.

Quando documentos AMP são pré-renderizados para carregamento instantâneo,
somente é feito o download dos recursos acima da dobra.
Quando documentos AMP são pré-renderizados para carregamento instantâneo,
não é feito o download de recursos que podem usar muitos recursos de CPU (como iframes de terceiros). 

Saiba mais sobre
[por que o AMP HTML não aproveita ao máximo o scanner de pré-carregamento](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e).

## Ajude a tornar o AMP mais rápido
AMP é um esforço de código aberto.
Precisamos da sua ajuda para deixá-lo ainda mais rápido.
Saiba [como contribuir](/docs/support/contribute.html).
