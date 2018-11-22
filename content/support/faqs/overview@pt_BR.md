---
$title: Visão geral das Accelerated Mobile Pages

cta:
  title: Next FAQ
  link_text: Envolvimento de empresas de tecnologia e plataformas
  link_url: /content/support/faqs/platform-involvement.md

faq:
  - title: O que é o projeto Accelerated Mobile Pages?
    answer: |
      O projeto Accelerated Mobile Pages (AMP) é uma iniciativa de código aberto que surgiu de discussões entre editores e empresas de tecnologia sobre a necessidade de melhorar todo o ecossistema de conteúdo para dispositivos móveis para todos os envolvidos: editores, plataformas de consumidor, criadores de conteúdo e usuários.

      Hoje em dia, a expectativa é de que o carregamento do conteúdo seja muito rápido e a navegação seja fácil. A realidade é que o carregamento pode demorar vários segundos ou nem ser concluído, caso o usuário abandone a página por estar lenta. As Accelerated Mobile Pages são páginas da Web desenvolvidas para carregar quase instantaneamente. Elas são um passo importante na criação de uma Web para dispositivos móveis melhor para todos.
  - title: Quais são os benefícios das Accelerated Mobile Pages?
    answer: |
      Ser veloz é importante e ser instantâneo é ideal. Pesquisas mostraram que taxas de rejeição mais elevadas estão associadas a páginas da Web de carregamento mais lento. O uso do formato AMP fará com que seja muito mais atrativo para os usuários consumir e interagir com mais conteúdo. No entanto, nem tudo é velocidade e desempenho. Também queremos melhorar a distribuição para que editores e anunciantes possam aproveitar o potencial da Web aberta e exibir conteúdo rapidamente em todos os locais (qualquer plataforma e aplicativo), gerando mais receita.
  - title: Como as Accelerated Mobile Pages funcionam?
    answer: |
      As Accelerated Mobile Pages são como qualquer outra página HTML. No entanto, elas têm um conjunto limitado de recursos técnicos permitidos que são definidos e regidos pelas especificações de AMP de código aberto. Assim como todas as páginas da Web, as Accelerated Mobile Pages carregarão em qualquer navegador moderno ou WebView de aplicativo.

      Os arquivos AMP usam diversas abordagens técnicas e arquitetônicas que priorizam a velocidade a fim de proporcionar uma experiência mais rápida aos usuários. Os desenvolvedores de AMP podem usar uma biblioteca rica e crescente de componentes da Web que oferecem a capacidade de incorporar objetos de rich media, como vídeos e postagens sociais, exibir publicidade ou coletar dados para análises. O objetivo não é homogeneizar a aparência do conteúdo, mas sim construir um núcleo comum mais técnico entre as páginas de modo a acelerar o tempo de carregamento.

      Além disso, os arquivos das AMP podem ser armazenados em cache na nuvem a fim de reduzir o tempo que o conteúdo leva para chegar ao dispositivo móvel do usuário. Com esse formato, é possível disponibilizar o conteúdo dos arquivos AMP para armazenamento em cache por terceiros. Nesse tipo de estrutura, editores e anunciantes ainda controlam o conteúdo, mas as plataformas podem armazenar em cache ou espelhar o conteúdo com facilidade, otimizando a velocidade de exibição para os usuários. O [cache de AMP do Google](https://developers.google.com/amp/cache/) pode ser usado sem custo por qualquer pessoa e armazena todas as páginas AMP. Outras empresas também podem criar o próprio cache de AMP.

      Em resumo, o objetivo é fazer com que a combinação de recursos técnicos limitados e um sistema de distribuição com base em armazenamento em cache gere páginas com melhor desempenho e maior desenvolvimento do público-alvo.
  - title: Por que o projeto Accelerated Mobile Pages tem uma abordagem de código aberto?
    answer: |
      As empresas envolvidas no projeto querem fazer com que a Web para dispositivos móveis funcione melhor para todos, não somente para uma plataforma ou um conjunto de tecnologias, de editores ou de anunciantes. O uso de código aberto nesse projeto permite que as pessoas contribuam e compartilhem ideias e códigos para tornar a Web para dispositivos móveis mais rápida. É só o início dessa jornada, e esperamos que outros editores, anunciantes e empresas de tecnologia se juntem a nós.
  - title: Quem pode usar as Accelerated Mobile Pages?
    answer: |
      O projeto está aberto a todos os envolvidos no ecossistema: editores, plataformas de consumidores, anunciantes e criadores de conteúdo. Para saber quem são as empresas e os sites que usam AMP, acesse a [página "Quem"](/pt_br/support/faqs/supported-platforms.html).
  - title: O que acontece quando as Accelerated Mobile Pages são usadas?
    answer: |
      Ao usar o formato AMP, os criadores disponibilizam o conteúdo em arquivos das AMP para ser rastreado, indexado, exibido (sujeito ao protocolo de exclusão de robôs) e armazenado em cache por terceiros.
  - title: Quais são as responsabilidades de quem usa as Accelerated Mobile Pages?
    answer: |
      Se um editor ou anunciante coletar dados de usuários que visualizam as páginas AMP dele, essa prática será regida por uma Política de Privacidade específica.  É responsabilidade do editor ou do anunciante divulgar essa política, preferencialmente com a inclusão de um link para o acesso a ela em cada uma das páginas AMP.

      Além disso, a legislação de muitas jurisdições, como a União Europeia, exige que um site forneça aos visitantes informações sobre cookies e outras formas de armazenamento local usadas nas páginas, incluindo as AMP. Em muitos casos, essas legislações também exigem que o site receba o consentimento dos usuários.  É responsabilidade do site determinar, com base no uso de cookies, que tipo de aviso é ideal.  Veja mais informações e ferramentas para gerar avisos de cookies em www.cookiechoices.org (em inglês).  Com o componente AMP [amp-user-notification](/pt_br/docs/reference/components/amp-user-notification.html), é possível exibir uma notificação que pode ser dispensada pelo usuário.

      Se uma página AMP for exibida no visualizador de uma plataforma de terceiros, como o visualizador de AMP na Pesquisa Google, ele poderá funcionar como um ambiente híbrido, onde a página e a plataforma relacionadas poderão coletar dados sobre o usuário.  Nesse caso, a coleta de dados feita por cada parte será regida pela Política de Privacidade correspondente. Isso significa que, em um ambiente de visualização híbrido, os dados coletados pela página AMP e pela plataforma de terceiros precisarão estar em conformidade com as respectivas Políticas de Privacidade.  É responsabilidade de cada parte divulgar a própria Política de Privacidade e cumprir os regulamentos de dados relevantes, incluindo as legislações europeias relacionadas ao uso de cookies.
  - title: Que tipo de conteúdo funciona melhor com as Accelerated Mobile Pages?
    answer: |
      O objetivo é que todo o conteúdo publicado, como notícias, vídeos, blogs, páginas de comércio eletrônico e GIFs, funcione com as Accelerated Mobile Pages.
  - title: É mais trabalhoso fazer com que o meu conteúdo funcione com as Accelerated Mobile Pages?
    answer: |
      No geral, não muito. Como o "HTML para AMP" é construído inteiramente a partir de tecnologias da Web existentes, o processo de desenvolvimento reflete o que os editores e anunciantes já usam hoje. Os editores e anunciantes podem conhecer as especificações do HTML para AMP no GitHub. Para aqueles acostumados com o processo atual, não esperamos uma curva de aprendizagem significativa.
  - title: Como um editor ou um anunciante pode criar conteúdo em HTML para AMP?
    answer: |
      Os editores e fornecedores de sistema de gerenciamento de conteúdo (CMS, na sigla em inglês) podem desenvolver uma integração com o CMS deles para gerar conteúdo AMP. A Automattic já publicou um [plugin de AMP para WordPress](https://wordpress.org/plugins/amp/) (em inglês), e esperamos que todos os sistemas de gerenciamento de conteúdo adicionem a compatibilidade com páginas HTML para AMP.
  - title: A tecnologia AMP funciona somente em dispositivos móveis?
    answer: |
      A tecnologia AMP prioriza a capacidade de resposta e foi criada para funcionar em telas de *todos* os tamanhos.  No entanto, alguns recursos para plataformas de terceiros (como o carrossel de notícias principais do Google) são projetados apenas para a experiência em dispositivos móveis.  Consulte um representante da plataforma de terceiros para saber como eles usam as AMP.  Para saber mais sobre o funcionamento das páginas AMP em computadores e dispositivos móveis, veja a postagem do blog de Paul Bakaus em [Sobre as Accelerated Mobile Pages para dispositivos móveis](https://paulbakaus.com/2016/07/01/about-that-mobile-in-accelerated-mobile-pages/) (em inglês).

---
