---
"$title": Como funciona um Otimizador AMP
"$order": '1'
description: Um Otimizador AMP pega um documento AMPHTML válido como entrada e o transforma numa versão otimizada, aplicando otimizações adicionais que seriam trabalhosas de fazer "manualmente". Este guia explica em detalhes como o Otimizador AMP funciona.
formats:
- websites
- stories
author: sebastianbenz
---

Um Otimizador AMP pega um documento AMPHTML válido como entrada e o transforma numa versão otimizada, aplicando otimizações adicionais que seriam trabalhosas de fazer "manualmente". Você pode reconhecer o “**AMP transformado**” resultante no elemento `html` através do atributo `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

Observação: os caches de AMP usam uma flag transformed diferente, por exemplo, os caches de AMP do Google adicionam `transformed=google;v=1`.

Os Otimizadores AMP realizam várias otimizações em um documento AMP, desde a renderização de layouts do lado do servidor até a otimização de imagens. Aqui está um exemplo que mostra as diferenças entre uma página AMP e sua versão otimizada ([clique para uma versão maior](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

No restante deste guia, introduziremos essas otimizações de forma mais detalhada.

### Renderização de Layouts AMP do lado do servidor

A renderização dos layouts AMP do lado do servidor é quem tem o maior potencial para melhorar o desempenho de carregamento de sua página AMP. Para evitar saltos no conteúdo, o AMP exige que os sites adicionem o [código boilerplate do AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) no cabeçalho. O boilerplate do AMP oculta o conteúdo da página, definindo a propriedade opacity do body da página em 0. Depois que o AMP é carregado, será possível calcular o layout da página. Depois disso, o AMP altera a propriedade opacity do body para 1, tornando o conteúdo da página visível. Infelizmente, essa abordagem precisa baixar o framework AMP antes que seja possível processar a página.

Para melhorar isso, layouts AMP, como os layouts `responsive` ou `fixed-height`, podem ser renderizados do lado do servidor antes de servir a página ao cliente. Dessa forma, será possível remover o boilerplate AMP e ainda evitar [alterações de conteúdo](https://web.dev/cls/) durante a carga da página.

A renderização lado-servidor realiza três tarefas:

⁣ **1. Remove o boilerplate AMP: ** para cada elemento que usa um layout AMP, a marcação específica do layout é injetada.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: &lt;style amp-runtime>...&lt;/style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

** 3. Layouts AMP renderizados no servidor: ** para cada elemento que usa um layout AMP, os elementos sizer específicos do layout são injetados.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Aviso: o bolierplate AMP nem sempre pode ser removido. Você pode descobrir se o boilerplate foi removido, verificando se o atributo `i-amphtml-no-boilerplate` está presente no elemento `html`. Por exemplo, o componente `amp-experiment` altera o conteúdo da página em tempo de execução. Para evitar mudanças de conteúdo, é necessário que o boilerplate AMP esteja presente se `amp-experiment` for usado numa página.

### Otimização de Hero Images

Um Otimizador AMP pode melhorar significativamente o tempo que leva para renderizar imagens no primeiro viewport. Isto é crítico ao otimizar os [tempos de LCP](https://web.dev/lcp/) para atender os [Core Web Vitals](https://web.dev/vitals).

No AMP, imagens hero podem ser declaradas explicitamente anotando um `amp-img` com o atributo `data-hero`:

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Os Otimizadores AMP suportam no máximo duas imagens hero por página para evitar o bloqueio de largura de banda para outros recursos críticos. Se esse limite não funcionar para você, [avise-nos](https://github.com/ampproject/amp-toolbox/issues).

Os Otimizadores AMP também detectam automaticamente imagens hero para os elementos `amp-img`, `amp-iframe`, `amp-video` ou `amp-video-iframe` e injetam `link rel=preload` para o `src` da imagem. A detecção automática funciona analisando a marcação HTML e layouts de imagem para detectar imagens grandes no primeiro viewport.

No caso de `amp-img`, os Otimizadores AMP também irão renderizar no lado do servidor a tag `img` dentro de `amp-img`. Isto permite que o navegador renderize a imagem imediatamente, sem que o tempo de execução de AMP seja necessário.

### Otimização de Imagens

Otimizadores AMP podem lhe ajudar a servir imagens responsivas otimizadas ao gerar atributos `srcset` específicos do layout AMP. Por exemplo, a seguinte declaração `amp-img`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

é melhorada com a seguinte definição de `srcset`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Para que isto funcione, seu ambiente de build/hospedagem precisa suportar o redimensionamento/otimização de imagens. Confira os guias individuais do otimizador sobre como melhor integrar a otimização de imagens.

### AMP Module Build (em breve)

Há uma versão menor do Runtime AMP e dos componentes disponíveis com base em [Módulos JavaScript](https://v8.dev/features/modules#browser), que requer que os usuários baixem menos JavaScript ao visualizar uma página AMP. Os Otimizadores AMP ativam a criação do AMP Module por default, transformando:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

em:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Navegadores que entendem `type="module"` ignoram scripts com um atributo `nomodule`. Isto significa que os usuários com navegadores modernos se beneficiarão dos bundles de runtime menores, enquanto os usuários de navegadores mais antigos usarão como fallback a versão sem módulo do runtime AMP.

Observação: o AMP Module Build está disponível apenas para AMP transformado, pois requer que o CSS do Runtime AMP seja incorporado.
