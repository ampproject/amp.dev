---
$title: Início rápido
---

[TOC]

{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

Neste guia, você encontra os principais recursos para começar a usar a AMP.  Se quiser informações mais detalhadas, confira a [documentação da AMP](/pt_br/docs/) ou nosso [canal no YouTube](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw). 

<hr>

## Primeiros passos na AMP

Siga estas três etapas para começar a usar a AMP:

1.  [Crie páginas AMP](#create-your-amp-pages).
2.  [Valide as páginas AMP](#validate-and-test-amp-pages).
3.  [Torne seu conteúdo detectável](#make-your-content-discoverable).

## Usar a AMP no dia a dia

Aproveite cada vez mais os recursos que a AMP tem para oferecer.

<a class="button" href="#amp-day-to-day-resources"> Ver recursos</a>

<hr>

### Criar páginas AMP

Confira as seções a seguir para saber como [usar um CMS](#using-a-cms), [começar do zero](#starting-from-scratch) ou [converter conteúdo existente](#converting-existing-content).

#### Usar um CMS

A AMP é compatível com integrações a várias plataformas de publicação de terceiros. Consulte a documentação da sua plataforma para saber como criar páginas AMP.

<div>
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'CMS' %}
      <ul>
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ul>
    {% endif %}
  {% endfor %}
</div>

#### Começar do zero

Se você estiver criando páginas ou criativos AMP do zero, acesse estes recursos:

*   [tutorial: Criar sua primeira página AMP](/pt_br/docs/getting_started/create.html)
*   [tutorial: Adicionar recursos de AMP avançados](/pt_br/docs/fundamentals/add_advanced.html)
*   [especificação de HTML para AMP](/pt_br/docs/fundamentals/spec.html#the-amp-html-format) *com boilerplate, marcação obrigatória e HTML permitido*
*   [formato do anúncio HTML para AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md) *com detalhes sobre a criação de anúncios de alto desempenho nas AMP*
*   [vídeo do YouTube sobre o que é permitido e o que não é permitido na AMP](https://youtu.be/Gv8A4CktajQ) (em inglês)
*   [modelos da AMP Start](https://www.ampstart.com/) para *testar alguns modelos prontos de página AMP*

#### Converter conteúdo existente

Se você estiver convertendo páginas HTML em HTML para AMP, confira estes recursos:

*   [tutorial: Converter HTML em AMP](/pt_br/docs/fundamentals/converting.html)
*   [vídeo do YouTube sobre como usar o HTML para AMP em um site existente](https://youtu.be/OO9oKhs80aI) (em inglês)

### Validar e testar páginas AMP

Antes de publicar conteúdo, verifique se as páginas AMP são válidas.  Veja alguns recursos disponíveis:

*   O artigo [Validar páginas AMP](/pt_br/docs/fundamentals/validate.html) *fornece uma lista de ferramentas de validação e instruções para validar suas páginas*.
*   Assista o [vídeo do YouTube sobre como validar e depurar páginas AMP](https://www.youtube.com/watch?v=npum8JsITQE&t=13s) (em inglês).
*   Acesse a página sobre [testar CORS nas AMP](/pt_br/docs/fundamentals/amp-cors-requests.html#testing-cors-in-amp).

### Tornar o conteúdo detectável

É preciso que os usuários consigam encontrar seu conteúdo em plataformas de terceiros, como Twitter, Google, Bing etc. Veja alguns recursos úteis para isso:

*   artigo [Torne sua página detectável](/pt_br/docs/fundamentals/discovery.html) (*dicas sobre como vincular páginas AMP e usar metadados*)
*   [diretrizes da Pesquisa Google para AMP](https://support.google.com/webmasters/answer/6340290)

<hr>

## Recursos da AMP no dia a dia

Estes recursos são úteis para o trabalho diário com a AMP:

*   Confira regularmente a [lista de componentes AMP](/pt_br/docs/reference/components.html).  As páginas de referência de cada componente oferecem informações detalhadas sobre como integrá-los e usá-los nas páginas AMP.
*   Quer ver exemplos e demonstrações?  Acesse a [AMP By Example](https://ampbyexample.com/), que conta com amostras práticas e um espaço para usar os componentes AMP.
*   Precisa de inspiração?
    *   A [AMP Start](https://www.ampstart.com/) oferece modelos e componentes com estilos predefinidos que podem ser usados para criar sites AMP do zero.
    *   Nosso [Showcase](/pt_br/learn/showcases/) mostra as páginas AMP mais importantes na Web.
*   Precisa de ajuda? Confira os [recursos de Suporte](/pt_br/support/developer/get_support.html).
*   Fique por dentro das últimas notícias da AMP:
    *   Inscreva-se no [nosso blog](https://amphtml.wordpress.com/).
    *   Inscreva-se no [canal da AMP no YouTube](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw).
    *   Siga-nos no Twitter: [@AMPhtml](https://twitter.com/amphtml).
 
