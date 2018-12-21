---
$title: Marcadores e substitutos
---
[TOC]

Uma prática recomendada para melhorar o desempenho e fazer aprimoramento progressivo do seu material é usar marcadores e substitutos nas AMP sempre que possível.

Se você fizer isso, alguns elementos até reduzirão as restrições. Por exemplo, se você usar um marcador para [`<amp-iframe>`](/pt_br/docs/reference/components/amp-iframe.html#iframe-with-placeholder), ele poderá ser usado na parte superior da página. Isso não seria possível sem o marcador.

## Marcadores

O elemento com o atributo `placeholder` atua
como um marcador para o elemento AMP pai.
Se um elemento `placeholder` for especificado, ele terá que ser um filho direto do elemento AMP.
Os elementos marcados como `placeholder` sempre terão a função `fill` em relação ao elemento AMP pai.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Mostrar mais">Mostrar código completo</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Por padrão, o marcador do elemento AMP é mostrado imediatamente,
mesmo que os recursos desse elemento não tenham sido inicializados nem transferidos por download.
Depois de pronto, o elemento AMP geralmente oculta o marcador e mostra o conteúdo.

[tip type="note"]

O marcador não precisa ser um elemento AMP.
Qualquer elemento HTML pode ter essa função.

[/tip]

## Substitutos

É possível especificar o atributo `fallback` em um elemento para indicar o comportamento de substituto:

* de qualquer elemento incompatível com o navegador;
* se o conteúdo não for carregado, por exemplo, tweet excluído;
* se o tipo de imagem não for compatível. Por exemplo, o WebP não é compatível com todos os navegadores.

O atributo `fallback` pode ser definido em *qualquer* elemento HTML, e não somente em elementos AMP. Quando especificado, o elemento `fallback` precisa ser um filho direto do elemento AMP.

##### Exemplo: recurso incompatível

No exemplo abaixo, o atributo `fallback` é usado para comunicar ao usuário que o navegador não é compatível com um determinado recurso:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Mostrar mais">Mostrar código completo</div>
  <div placeholder></div> 
</amp-iframe>
</div>

##### Exemplo: como exibir diferentes formatos de imagem

No exemplo abaixo, o atributo `fallback` é usado para instruir o navegador a usar o arquivo JPEG se o formato WebP não for compatível. 

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="Mostrar mais">Mostrar código completo</div><div placeholder></div></amp-iframe></div>

## Interação entre marcadores e substitutos

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

Muitos elementos AMP são colocados na lista de permissões para mostrar um "indicador de carregamento",
uma animação básica indicando que o elemento ainda não foi totalmente carregado.
É possível desativar esse comportamento nos elementos com a inclusão do atributo `noloading`.
 
