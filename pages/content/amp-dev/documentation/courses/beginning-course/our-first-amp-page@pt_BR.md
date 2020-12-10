---
$title: Nossa primeira página AMP
$order: 3
leveled: true
---

[filter level="beginner"]
## Iniciando nossa jornada

É o primeiro dia da nossa equipe construindo o site da Chico's Cheese Bike. Até agora, o site é uma página HTML básica, com um cabeçalho contendo o título do nosso site, uma imagem de uma de nossas bicicletas e algum texto de marketing.

{{ image('/static/img/courses/beginner/image17.png', 275, 263,  align='center half', caption='Nosso site HTML básico') }}

Em seu projeto Glitch, abra index.html e verifique se o HTML se parece com isto:

[sourcecode:html]
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Chico's Cheese Bicycles</title>
    <link
      rel="shortcut icon"
      href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214"
    />
  </head>
  <body>
    <header class="headerbar"><h2>Chico's Cheese Bicycles</h2></header>
    <main>
      <div class="main-content">
        <img
          src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746"
        />
        <div class="below-hero">
          <h2 class="main-heading">What we're about</h2>
          <p class="main-text">
            We sell the only ten-speed bicycles in the world made entirely of
            cheese. They get you where you need to go, and you never arrive
            hungry. Our bikes are 100% biodegradable. And with our new
            rodent-repelling varnish they last longer than ever!
          </p>
        </div>
      </div>
    </main>
  </body>
</html>
{% endraw %}[/sourcecode]

Nossa equipe determinou que o uso de AMP tornará mais fácil construir os recursos do site que desejamos. Portanto, é nosso trabalho transformar essa página HTML em uma página AMP válida.

Primeiro, precisamos indicar ao mundo que estamos tentando construir um site AMP. Para fazer isso, vamos adicionar alguma indicação à nossa tag `<html>`. Se a tag `<html>` contiver um símbolo ⚡ ou a palavra ʻamp`, ferramentas como o validador de AMP e o cache de AMP tratarão nosso site como um site de AMP.

Em seu projeto Glitch, adicione o símbolo ⚡ à tag `<html>`, assim:

[sourcecode:html]
{% raw %}<html ⚡ lang="en">{% endraw %}[/sourcecode]

Este símbolo é essencial. Isso indica que estamos criando um site AMP. A seguir, discutiremos como ferramentas como o validador de AMP podem nos ajudar a determinar as mudanças de que precisamos para tornar o site válido.

## Validação e cache de AMP

Mencionamos o conceito de escrever “AMP válido” algumas vezes. Vamos discutir o que isso significa e por que é importante.

Em primeiro lugar, um site AMP válido é importante porque é bom para seus usuários. As regras de AMP representam as práticas recomendadas em desempenho, acessibilidade e segurança. Portanto, os erros de validação são a maneira do AMP de dizer que há espaço para melhorar seu site para os usuários!

Em segundo lugar, um AMP válido é importante devido à utilidade do cache de AMP. O cache é uma parte poderosa da arquitetura AMP. É uma rede de distribuição de conteúdo (CDN) projetada para:

- Servir apenas páginas AMP válidas.

- Permite que as páginas AMP sejam pré-carregadas com eficiência e segurança.

- Executa várias otimizações de desempenho nas páginas do cache.

Quando os usuários solicitam seu site AMP, eles podem receber o site de um servidor de cache de AMP próximo a eles. Se seu site estiver no cache de AMP, ele pode ser pré-carregado com eficiência em segundo plano quando você estiver usando mecanismos de pesquisa como o Google. Se os usuários selecionarem seu site nos resultados da pesquisa, ele aparecerá em segundos, mesmo com uma conexão ruim. Além disso, o cache de AMP executará otimizações automáticas em seu site, como:

- Realiza o cache das fontes

- Armazenar em cache e compacta as imagens e as converte em formatos mais novos, como WebP.

- Sanitiza documentos AMP para evitar ataques de script entre sites ou outras vulnerabilidades.

- Corrige problemas de HTML que podem resultar em renderização inconsistente em vários navegadores; ou seja, fecha todas as tags, coloca nomes de atributos em letras minúsculas ou texto de escape

Ao criar sites com AMP e fazer os exercícios desses treinamentos, verifique se seus sites são válidos. Para rastrear erros de validação, usaremos o validador de AMP que instalamos em [introdução ao curso](course-introduction.md#setting-up-the-amp-validator).

## Exercício 1: Usando o AMP Validator

Depois de instalar a extensão AMP Validator do Chrome, o validador será executado automaticamente em qualquer página aberta que tenha o símbolo AMP (⚡) em sua tag `<html>`, como o nosso agora. Abra seu projeto Glitch e olhe para o ícone da extensão AMP Validator. Deve ser semelhante ao vermelho abaixo com o emblema indicando que há 7 erros de validação.

{{ image('/static/img/courses/beginner/image6.png', 58, 58,  align='center third', caption='A extensão AMP Validator do Chrome mostrando problemas de AMP.') }}

Ao clicar no ícone do validador de AMP abre um pop-up que lista os erros de validação da página atual e fornece algumas soluções possíveis para nossos problemas.

{{ image('/static/img/courses/beginner/image22.png', 1548, 1170, align='center', caption='Os problemas exibidos na extensão do Chrome para validador de AMP.') }}

Para a entrada sobre a tag `<img>`:

`The tag <img> may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?`

Clique no link “Debug” no final da mensagem. O link Debug leva você diretamente para a linha de código em sua página que contém o erro listado. Isso ajuda a localizar os erros que ocorrem em seus arquivos e ajuda a fornecer o contexto necessário para entender como corrigi-los.
E não se preocupe: esta mensagem pode parecer pouco clara agora, mas é fácil de corrigir. Precisamos usar o componente AMP `<amp-img>` em vez da tag HTML `<img>`. Na seção [Thinking in Components] (thinking-in-components.md) deste curso, exploraremos porque esse erro aparece, o que é `<amp-img>` e como corrigi-lo.

{{ image('/static/img/courses/beginner/image16.png', 1999, 798, align='center', caption='O depurador de AMP mostra um erro embutido.') }}

Para qualquer outra mensagem de erro de validação, clique no link “Learn more”. Este link leva você diretamente da descrição do erro para a documentação de AMP correspondente, que o ajudará a corrigir o problema.

{{ image('/static/img/courses/beginner/image21.png', 512, 342, align='center', caption='Documentação de AMP acessada por meio do link "Saiba mais" no Validador de AMP.') }}

[tip type="read-on"]
**Nota**: Você não consegue descobrir como corrigir um erro com base nas opções "Debug" e "Learn More" na extensão do Validador de AMP? Leia a lista completa de erros de validação e ações corretivas sugeridas [aqui](../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md).
[/tip]

A próxima etapa é corrigir esses erros de validação. Para fazer isso, precisamos aprender um pouco mais sobre os elementos obrigatórios de uma página AMP. Precisamos fazer mais do que adicionar um raio ao nosso HTML para criar uma página AMP válida.

## A anatomia de uma página AMP

Toda página AMP começa com o mesmo modelo básico. Em seguida, personalizamos e construímos a página a partir daí. Às vezes, esse modelo inicial é chamado de padrão AMP. O boilerplate é uma combinação de tags que configuram o AMP runtime  e ajudam as páginas AMP a funcionar sem problemas.

Nesta seção, vamos explicar um pouco sobre cada parte do padrão AMP. No entanto, você não precisa se lembrar de adicionar essas tags em todas as páginas que você criar com AMP. Você pode simplesmente iniciar suas futuras páginas AMP com [esse](../../../documentation/guides-and-tutorials/start/create/basic_markup.md) boilerplate.

As seguintes tags são necessárias nas páginas AMP. As páginas AMP válidas devem:

- Começar com o doctype `<! Doctype html>`.

- Conter as tags `<head>` e `<body>`.

- Conter uma tag `<meta charset =" utf-8 ">` como o primeiro filho da tag `<head>`.

- Conter uma tag `<meta name="viewport" content="width=device-width">` dentro de sua tag `<head>`. **Nota**: Também é recomendado incluir `initial-scale=1`.

As regras a seguir são especificamente para configurar o AMP runtime. As páginas AMP válidas também devem:

- Conter uma tag `<html ⚡>` de nível superior. O símbolo de raio indica que este é um site AMP. **Nota**: `<html amp>` também é aceito.

- Conter a tag`<script async src="https://cdn.ampproject.org/v0.js"></script>` dentro da tag `<head>`. Isso carrega a biblioteca JavaScript AMP. **Nota**: Como prática recomendada, você deve incluir o script no`<head>`.

- Conter uma tag `<link rel="canonical" href="$SOME_URL">` dentro de seu `<head>`.  Isso aponta para a versão HTML normal do seu site, se houver, ou aponta para si mesmo, se não houver uma versão não AMP do site. **Nota**: Você deve substituir `$SOME_URL` no atributo` href` acima pelo URL real de sua página.

- Conter o código padrão de estilo AMP na tag `<head>`. Este CSS oculta o conteúdo da página até que a biblioteca AMP termine de carregar. O boilerplate de estilo AMP é o seguinte snippet:

[sourcecode:html]
{% raw %}
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
{% endraw %}[/sourcecode]

[tip type="note"]
**Nota**: O boilerplate do AMP deve ser copiado e colado como está. O código está reduzido acima, mas também funciona se você estiver usando um formatador automático em seu código, como o Prettier. Certifique-se de não alterar a ordem do texto dentro das tags acima ou alterar os valores. Se você quiser saber mais sobre o que essas tags no boilerplate de AMP significam e por que são importantes, leia sobre elas no [apêndice](appendix.md).
[/tip]

## CSS e o AMP

CSS personaliza a aparência de seus sites. Quase sempre você adicionará estilos personalizados às suas páginas AMP. Ainda assim, esteja ciente de que o AMP impõe algumas restrições ao uso de CSS:

- Os estilos só podem residir no cabeçalho do documento dentro de uma tag `<style amp-custom>` ou como atributos `style` embutidos, quando necessário. Essa limitação impede o carregamento de uma folha de estilo externa, mas também salva uma solicitação de rede, permite o armazenamento em cache e melhora o desempenho.

- Uma página AMP só pode ter uma tag `<style amp-custom>` (tag de estilo customizado).

- A página não pode incluir mais de 75K de CSS.

- A regra `!important` é restrita.

- Para mais regras CSS proibidas ou restritas, verifique a documentação
  [aqui](../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

Para praticar a adição de estilos personalizados à sua página AMP, adicione a seguinte tag `<style amp-custom>` à sua página no `<head>` e veja o que acontece. Quando terminar, você pode remover os estilos de sua página.

[sourcecode:html]
{% raw %}<style amp-custom>
    body {
        font-family: sans-serif;
        line-height: 1.5rem;
        padding: 20px;
    }
    p, h2 {
        border: 1px dotted red;
    }
</style>
{% endraw %}[/sourcecode]

{{ image('/static/img/courses/beginner/image10.png', 185, 323, align='center third', caption='CSS personalizado afetando nossa página.') }}

## Exercício 2: convertendo o resto de nossa página HTML

Agora é hora de corrigir os erros de validação em nosso site que descobrimos no exercício anterior. Para fazer isso, precisamos adicionar as partes que faltam do modelo padrão AMP ao nosso site HTML básico.

Para este e todos os exercícios futuros, vamos aplicar o que aprendemos para implementar mudanças reais de código em nosso site no Glitch. Daremos algumas dicas ao longo do caminho. No final de cada exercício, forneceremos a solução completa. Tente fazer os exercícios você mesmo, mas se tiver dúvidas ou precisar de dicas, fique à vontade para copiar o código das seções de solução.

Além disso, no início e no final de cada um desses cursos, forneceremos um modelo Glitch que inclui todo o código que completamos até aquele ponto. Se você perder sua página atual de Glitch ou quiser começar a partir de nossas soluções, pode copiar o código desses exemplos de Glitch ou simplesmente remixar esses exemplos e seguir em frente a partir daí.

Usando a [documentação](../../../documentation/guides-and-tutorials/start/create/basic_markup.md) para o boilerplate AMP e os comentários acima, atualize seu projeto Glitch para que apenas o erro de validação da tag `<img>` persista. Além disso, para nos ajudar a construir o site da Chico’s Cheese Bikes, fornecemos alguns CSS para usar durante os treinamentos. Se você abrir [esta](https://pastebin.com/vNws2bA1) página, a tag `<style amp-custom>` estará lá com os estilos de que você precisa. Você deve copiar esses estilos para o projeto em que está trabalhando.

### Solução

A solução pode ser encontrada nesse <a href="https://glitch.com/~hungry-modem" target="_blank">examplo do Glitch</a>. A parte da página que contém as alterações deve ser semelhante a esta:

[sourcecode:html]
{% raw %}<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <title>Chico's Cheese Bicycles</title>
  <link rel="shortcut icon" href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214">
  <meta name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="https://hungry-modem.glitch.me/">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    ... styles elided due to length ...
  </style>
</head>
{% endraw %}[/sourcecode]

## A Valid AMP Page...Almost

Se você completou todos os exercícios acima, parabéns! Sua página é quase uma página AMP válida. Se você abrir sua página e o Chrome DevTools (`Command + Option + I` no Mac ou` Control + Shift + I` no Windows / Linux) e selecionar a guia **Console**, deverá ver esta mensagem no console , indicando que a biblioteca AMP foi carregada com sucesso:

```
Powered by AMP ⚡ HTML
```

Em seguida, se você abrir a extensão do Validador de AMP, isso mostra que chegamos ao último erro:

```
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
```

Este é um erro importante de entender. Algumas tags HTML não são permitidas em documentos AMP. Em alguns casos, o AMP exige que você use uma alternativa. Chamamos essas tags HTML personalizadas e não padrão de "componentes" e iremos discuti-las com mais detalhes posteriormente na próxima seção deste treinamento

[tip type="note"]

**Nota**: Você pode iniciar suas futuras páginas AMP usando o HTML [aqui](../../../documentation/guides-and-tutorials/start/create/basic_markup.md) como ponto de partida. Este HTML inclui o boilerplate AMP acima. Ele contém todas as tags e elementos necessários que abordamos até agora. Como alternativa, você pode personalizar seu ponto de partida com recursos adicionais usando a ferramenta de geração de boilerplate [aqui](https://amp.dev/boilerplate).

[/tip]
[/filter]
[filter level="advanced"]
## Iniciando nossa jornada

É o primeiro dia da nossa equipe construindo o site da Chico's Cheese Bike. Até agora, o site é uma página HTML básica, com um cabeçalho contendo o título do nosso site, uma imagem de uma de nossas bicicletas e algum texto de marketing. Nosso objetivo é converter esta página em AMP!

{{ image('/static/img/courses/beginner/image17.png', 824, 790,  align='center half', caption='Nosso site HTML básico') }}

Em <a href="https://glitch.com/edit/#!/nosy-leech" target="_blank"> seu </a> projeto Glitch, abra ʻindex.html` e verifique se o HTML parece isto:

[sourcecode:html]
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Chico's Cheese Bicycles</title>
    <link
      rel="shortcut icon"
      href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214"
    />
  </head>
  <body>
    <header class="headerbar"><h2>Chico's Cheese Bicycles</h2></header>
    <main>
      <div class="main-content">
        <img
          src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746"
        />
        <div class="below-hero">
          <h2 class="main-heading">What we're about</h2>
          <p class="main-text">
            We sell the only ten-speed bicycles in the world made entirely of
            cheese. They get you where you need to go, and you never arrive
            hungry. Our bikes are 100% biodegradable. And with our new
            rodent-repelling varnish they last longer than ever!
          </p>
        </div>
      </div>
    </main>
  </body>
</html>
{% endraw %}[/sourcecode]

Para transformar isso em uma página AMP, primeiro precisamos dizer ao mundo que é AMP. Para fazer isso, vamos adicionar alguma decoração à nossa tag `<html>`. Se a tag `<html>` contiver um símbolo `⚡` ou a palavra amp, ferramentas como o validador de AMP e o cache de AMP tratarão nosso site como um site de AMP.

Em seu projeto Glitch, adicione o símbolo `⚡` à tag` <html> `, como este:

[sourcecode:html]
{% raw %}<html ⚡ lang="en">{% endraw %}[/sourcecode]

Este símbolo é essencial. Isso indica que estamos criando um site AMP. A seguir, discutiremos como ferramentas como o validador de AMP podem nos ajudar a determinar as mudanças de que precisamos para tornar o site válido.

## Validação e cache de AMP

Por que é importante escrever AMP válido?

Em primeiro lugar, AMP válido é importante porque é bom para seus usuários. As regras de AMP representam as práticas recomendadas em desempenho, acessibilidade e segurança. Portanto, os erros de validação são a maneira do AMP de dizer que há espaço para melhorar o seu site para os usuários!

Em segundo lugar, um AMP válido é importante devido à utilidade do cache de AMP. O cache é uma parte poderosa da arquitetura AMP. É uma rede de distribuição de conteúdo (CDN) projetada para:

- Servir apenas páginas AMP válidas.

- Permitir que as páginas AMP sejam pré-carregadas com eficiência e segurança.

- Executar várias otimizações de desempenho nas páginas do cache.

Os indexadores da Web estão por aí procurando páginas AMP válidas. Quando esse indexador encontra uma página AMP válida, um cache de AMP correspondente armazena seu HTML. Então, quando os usuários solicitam seu site AMP, eles podem receber o site de um servidor de cache de AMP próximo a eles. Se seu site estiver em um cache de AMP, ele pode ser pré-carregado em segundo plano quando você estiver usando mecanismos de pesquisa como o Google. Se os usuários selecionarem seu site nos resultados da pesquisa, ele aparecerá em segundos, mesmo com uma conexão ruim. Além disso, o cache de AMP executará otimizações automáticas em seu site, como:

- Realiza o cache das fontes

- Armazenar em cache e compacta as imagens e as converte em formatos mais novos, como WebP.

- Sanitiza documentos AMP para evitar ataques de script entre sites ou outras vulnerabilidades.

- Corrige problemas de HTML que podem resultar em renderização inconsistente em vários navegadores; ou seja, fecha todas as tags, coloca nomes de atributos em letras minúsculas ou texto de escape

Ao criar sites com AMP e fazer os exercícios desses treinamentos, verifique se seus sites são válidos. Para rastrear erros de validação, usaremos o AMP Validator que instalamos em [introdução ao curso]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/course-introduction.md', locale=doc.locale).url.path}}#setting-up-the-amp-validator).

## Exercício 1: usando o AMP Validator

Depois de instalar a extensão AMP Validator do Chrome, o validador será executado automaticamente em qualquer página aberta que tenha o símbolo AMP (⚡) em sua tag `<html>`, como o nosso agora. Abra seu projeto Glitch e olhe para o ícone da extensão AMP Validator. Deve ser semelhante ao vermelho abaixo com o emblema indicando que há 7 erros de validação.

{{ image('/static/img/courses/beginner/image6.png', 58, 58,  align='center third', caption='A extensão AMP Validator do Chrome mostrando problemas de AMP.') }}

Clicar no ícone do validador de AMP abre um pop-up que lista os erros de validação da página atual e fornece algumas soluções possíveis para nossos problemas.

{{ image('/static/img/courses/beginner/image22.png', 1548, 1170, align='center', caption='Os problemas exibidos na extensão do Chrome para validador de AMP.') }}

Para a mensagem sobre a tag `<img>`:

`The tag <img> may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?`

Clique no link "Debug" no final da entrada. O link Debug leva você diretamente para a linha de código em sua página que contém o erro listado. Isso ajuda a localizar os erros que ocorrem em seus arquivos e ajuda a fornecer o contexto necessário para entender como corrigi-los. Este erro específico informa que você precisa usar o componente AMP `<amp-img>` em vez da tag HTML `<img>`. Na seção [Pensando em componentes]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/thinking-in-components.md', locale=doc.locale).url.path}}) deste curso, exploraremos por que esse erro aparece, o que é `<amp-img>` e como corrigi-lo.

{{ image('/static/img/courses/beginner/image16.png', 1999, 798, align='center', caption='O depurador de AMP mostra um erro embutido.') }}

Para qualquer outra mensagem de erro de validação, clique no link "Learn more". Este link leva você diretamente da descrição do erro para a documentação de AMP correspondente, que o ajudará a corrigir o problema.

{{ image('/static/img/courses/beginner/image21.webp', 1024, 684, align='center', caption='Documentação de AMP acessada por meio do link "Learn more" no AMP Validator.') }}

[tip type="read-on"]
**Nota**: Não consegue descobrir como corrigir um erro com base nas opções "Debug" e "Learn more" na extensão do AMP Validator? Leia a lista completa de erros de validação e ações corretivas sugeridas [aqui]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md', locale=doc.locale).url.path}}).
[/tip]

A próxima etapa é corrigir esses erros de validação. Para fazer isso, precisamos aprender um pouco mais sobre os elementos obrigatórios de uma página AMP.

## A anatomia de uma página AMP

Toda página AMP começa com o mesmo modelo básico. Em seguida, personalizamos e construímos a página a partir daí. Às vezes, esse modelo inicial é chamado de padrão AMP. O boilerplate é uma combinação de tags que configuram o AMP runtime  e ajudam as páginas AMP a funcionar sem problemas.

Nesta seção, vamos explicar um pouco sobre cada parte do padrão AMP. No entanto, você não precisa se lembrar de adicionar essas tags em todas as páginas que você criar com AMP. Você pode simplesmente iniciar suas futuras páginas AMP com [esse](../../../documentation/guides-and-tutorials/start/create/basic_markup.md) boilerplate.

As seguintes tags são necessárias nas páginas AMP. As páginas AMP válidas devem:

- Começar com o doctype `<! Doctype html>`.

- Conter as tags `<head>` e `<body>`.

- Conter uma tag `<meta charset =" utf-8 ">` como o primeiro filho da tag `<head>`.

- Conter uma tag `<meta name="viewport" content="width=device-width">Nota**: Também é recomendado incluir `initial-scale=1`.

As regras a seguir são especificamente para configurar o AMP runtime. As páginas AMP válidas também devem:

- Conter uma tag `<html ⚡>` de nível superior. O símbolo de raio indica que este é um site AMP. **Nota**: `<html amp>` também é aceito.

- Conter a tag`<script async src="https://cdn.ampproject.org/v0.js"></script>` dentro da tag `<head>`. Isso carrega a biblioteca JavaScript AMP. **Nota**: Como prática recomendada, você deve incluir o script no`<head>`.

- Conter uma tag `<link rel="canonical" href="$SOME_URL">` dentro de seu `<head>`.  Isso aponta para a versão HTML normal do seu site, se houver, ou aponta para si mesmo, se não houver uma versão não AMP do site. **Nota**: Você deve substituir `$SOME_URL` no atributo` href` acima pelo URL real de sua página.

- Conter o código padrão de estilo AMP na tag `<head>`. Este CSS oculta o conteúdo da página até que a biblioteca AMP termine de carregar. O boilerplate de estilo AMP é o seguinte snippet:

[sourcecode:html]
{% raw %}

<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

{% endraw %}[/sourcecode]

O boilerplate do AMP deve ser copiado e colado como está. O código está reduzido acima, mas também funciona se você estiver usando um formatador automático em seu código, como o Prettier. Certifique-se de não alterar a ordem do texto dentro das tags acima ou alterar os valores. Se você quiser saber mais sobre o que essas tags no boilerplate de AMP significam e por que são importantes, leia sobre elas no [apêndice]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).

[tip type="note"]
**Nota**: Você pode simplesmente iniciar suas futuras páginas AMP com [esse](/content/amp-dev/documentation/guides-and-tutorials/start/create/basic_markup.md) boilerplate. O código está reduzido acima, mas também funciona se você estiver usando um formatador automático em seu código, como o Prettier. Certifique-se de não alterar a ordem do texto dentro das tags acima ou alterar os valores. Se você quiser saber mais sobre o que essas tags no boilerplate de AMP significam e por que são importantes, leia sobre elas no [apêndice]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).
[/tip]

## CSS e o AMP

Para garantir um bom desempenho e permitir que a AMP faça o que é necessário, a AMP impõe algumas restrições ao uso de CSS:

- Os estilos só podem residir no cabeçalho do documento dentro de uma tag `<style amp-custom>` ou como atributos `style` embutidos, quando necessário. Essa limitação impede o carregamento de uma folha de estilo externa, mas também salva uma solicitação de rede, permite o armazenamento em cache e melhora o desempenho.

- Uma página AMP só pode ter uma tag `<style amp-custom>` (tag de estilo customizado).

- A página não pode incluir mais de 75K de CSS.

- A regra `!important` é restrita.

- Para mais regras CSS proibidas ou restritas, verifique a documentação
  [aqui](../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

[sourcecode:html]
{% raw %}<style amp-custom>
    body {
        font-family: sans-serif;
        line-height: 1.5rem;
        padding: 20px;
    }
    p, h2 {
        border: 1px dotted red;
    }
</style>
{% endraw %}[/sourcecode]

{{ image('/static/img/courses/beginner/image10.png', 738, 1290, align='center third', caption='CSS personalizado estilizando a nossa página.') }}

## Exercício 2: convertendo o resto de nossa página HTML

Agora é hora de corrigir os erros de validação em nosso site que descobrimos no exercício anterior. Para fazer isso, precisamos adicionar as partes que faltam do template boilerplate do AMP ao nosso site HTML básico.

Para este e todos os exercícios futuros, vamos aplicar o que aprendemos para implementar mudanças reais de código em nosso site no Glitch. Tente fazer os exercícios você mesmo, mas se tiver dúvidas ou precisar de dicas, fique à vontade para copiar as seções de solução. No início e no final de cada um desses cursos, forneceremos um modelo Glitch que inclui todo o código que concluímos até aquele ponto.

Usando a [documentação]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/basic_markup.md', locale=doc.locale).url.path}}) para o boilerplate AMP e os comentários acima, atualize seu projeto Glitch para que apenas o erro de validação da tag `<img>` persista. Além disso, para nos ajudar a construir o site da Chico's Cheese Bikes, fornecemos alguns CSS para usar durante os treinamentos. Se você abrir [esta](https://pastebin.com/vNws2bA1) página, a tag `<style amp-custom>` estará lá com os estilos de que você precisa. Você deve copiar esses estilos para o projeto em que está trabalhando.

### Solução

A solução pode ser encontrada nesse <a href="https://glitch.com/~hungry-modem" target="_blank">Glitch</a> de exemplo. A parte da página que contém as alterações deve ser semelhante a esta:

[sourcecode:html]
{% raw %}<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <title>Chico's Cheese Bicycles</title>
  <link rel="shortcut icon" href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214">
  <meta name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="https://hungry-modem.glitch.me/">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    ... styles elided due to length ...
  </style>
</head>
{% endraw %}[/sourcecode]

## Uma página AMP válida ... Quase

Se você completou todos os exercícios acima, parabéns! Sua página é quase uma página AMP válida. Se você abrir sua página e verificar o Console no Chrome DevTools, deverá ver esta mensagem indicando que a biblioteca AMP foi carregada com sucesso:

```
Powered by AMP ⚡ HTML
```

Em seguida, se você abrir a extensão do AMP Validator , isso mostra que chegamos ao último erro:

```
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
```

Este é um erro importante de entender. Algumas tags HTML não são permitidas em documentos AMP. Em alguns casos, o AMP exige que você use uma alternativa. Chamamos essas tags HTML personalizadas e não padrão de "componentes" e iremos discuti-las com mais detalhes posteriormente na próxima seção deste treinamento.
[/filter]
