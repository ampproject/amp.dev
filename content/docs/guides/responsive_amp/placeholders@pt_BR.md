---
$title: Marcadores e substitutos
$order: 3
toc: true
components:
- iframe
---
[TOC]

Para melhorar o desempenho e fazer aprimoramentos constantes, uma prática recomendada é usar marcadores e substitutos nas AMP sempre que possível.

Se você fizer isso, alguns elementos até reduzirão as restrições. Por exemplo, se você usar um marcador para [`<amp-iframe>`](/pt_br/docs/reference/components/amp-iframe.html#iframe-with-placeholder), ele poderá ser usado na parte superior da página. Isso não seria possível sem o marcador.

## Marcadores

O elemento marcado com o atributo `placeholder` age como marcador para o elemento AMP pai. Se um elemento `placeholder` for especificado, ele terá que ser um derivado direto do elemento AMP. Os elementos marcados como `placeholder` sempre terão a função de `fill` o elemento AMP pai.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div> 
</amp-iframe>
</div>

Por padrão, o marcador do elemento AMP é exibido imediatamente, mesmo que isso seja antes do download ou da inicialização dos recursos do elemento AMP. Quando estiver pronto, o elemento AMP normalmente ocultará o marcador e exibirá o conteúdo.

{% call callout('Observação', type='note') %}
O marcador não precisa ser um elemento AMP. Qualquer elemento HTML pode agir como marcador.
{% endcall %}

## Substitutos

Use o atributo `fallback` a fim de indicar o comportamento de substituto para qualquer elemento que não seja compatível com o navegador. Por exemplo, use o atributo `fallback` para comunicar ao usuário que o navegador não é compatível com um recurso específico:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div> 
</amp-iframe>
</div>

O atributo `fallback` pode ser definido em qualquer elemento HTML, não somente em elementos AMP. Se o elemento `fallback` for especificado, ele terá que ser um derivado direto do elemento AMP.

## Interação de marcadores e substitutos

No caso dos componentes AMP que dependem de conteúdo dinâmico (por exemplo, `amp-twitter` e `amp-list`), a interação entre marcadores e substitutos é a seguinte:

<ol>
  <li>O marcador é exibido durante o carregamento do conteúdo.</li>
  <li>Quando o conteúdo for carregado, o marcador será ocultado para a exibição do conteúdo.</li>
  <li>Quando ocorrer uma falha no carregamento do conteúdo:
    <ol>
      <li>Se houver um elemento substituto, ele será exibido.</li>
      <li>Caso contrário, o marcador continuará em exibição.</li>
    </ol>
  </li>
</ol>

## Ocultar indicadores de carregamento

Muitos elementos AMP são colocados na lista de permissões para mostrar um "indicador de carregamento", uma animação básica indicando que o elemento ainda não foi totalmente carregado. É possível desativar esse comportamento nos elementos com a inclusão do atributo `noloading`.
