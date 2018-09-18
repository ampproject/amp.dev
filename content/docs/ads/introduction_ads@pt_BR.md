---
$title: Introdução à publicidade nas AMP
---

A meta do Projeto AMP é fazer o melhor para o usuário, acelerando a exibição das páginas da Web. No caso da publicidade nas AMP, a meta é a mesma: veicular anúncios rápidos, seguros, interessantes e eficazes para os usuários. Como isso é feito?  

Exibir anúncios em páginas AMP não é muito diferente de veicular anúncios tradicionais em páginas HTML:

{{ image('/static/img/docs/ads/ads_in_amp.svg', 647, 263, alt='exibir anúncios em páginas AMP', align='' ) }}

1.  Em uma página AMP, os editores criam um local para exibir anúncios. No método tradicional, isso é feito com a inserção de um snippet de JavaScript, mas nas AMP, os editores adicionam uma tag [`<amp-ad>`](/pt_br/docs/reference/components/amp-ad.html) à página AMP referente a uma rede de publicidade específica. Para saber mais detalhes, consulte o guia sobre [monetização de páginas AMP com anúncios](/pt_br/docs/ads/monetization.html).

2.  Quando um usuário carrega uma página AMP, a tag `<amp-ad>` envia uma solicitação de anúncio para a rede de publicidade. Para retornar um anúncio à página AMP, as redes de publicidade criam uma implementação `amp-ad`. Para saber mais detalhes, consulte o guia de [integração de redes de publicidade em AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md) (em inglês).

3.  As redes de publicidade fornecem os criativos gerados pelos anunciantes. Os anunciantes podem gerar criativos usando o HTML tradicional ou o novo formato, [HTML para AMP](/pt_br/docs/ads/amphtml_ads.html). 

## Redes de publicidade compatíveis

As AMP são compatíveis com um grande número de [servidores de anúncios e redes de publicidade](/pt_br/docs/ads/ads_vendors.html).

{% call callout('Observação', type='note') %}
Precisa integrar sua tecnologia de anúncio às AMP? [Confira estas diretrizes](/pt_br/docs/ads/integration-guide.html).
{% endcall %}

## Anúncios compatíveis

As AMP são compatíveis com anúncios tradicionais e com anúncios HTML para AMP, que são mais rápidos e seguros.  Independentemente de como foram criados, os anúncios nas páginas AMP são como qualquer recurso externo e precisam obedecer às mesmas [restrições impostas a todos os recursos em AMP](/pt_br/learn/about-how/).   Para saber mais sobre os requisitos de anúncios em AMP, consulte [este guia](https://github.com/ampproject/amphtml/blob/master/ads/README.md#constraints) (em inglês).

### Mais velocidade com os anúncios HTML para AMP

Os anúncios HTML para AMP são uma maneira mais rápida, leve e segura de anunciar na Web. Embora as páginas AMP sejam compatíveis com anúncios HTML tradicionais, o carregamento deles pode demorar. Para exibir anúncios tão rápidos quanto a página AMP, use o formato HTML para AMP. Os anúncios HTML para AMP só serão exibidos após serem validados. Isso garante que eles estejam livres de malware. Além do mais, esses anúncios podem ser exibidos em qualquer lugar na Web, não apenas nas páginas AMP.

Saiba mais sobre os anúncios HTML para AMP [neste guia](/pt_br/docs/ads/amphtml_ads.html).


## Primeiros passos

Acesse estes guias para começar a exibir anúncios AMP:

* [Monetizar páginas AMP com anúncios](/pt_br/docs/ads/monetization.html)
* [Integrar com AMP para veicular anúncios gráficos](/pt_br/docs/ads/adnetwork_integration.html)
* [Anúncios HTML para AMP](/pt_br/docs/ads/amphtml_ads.html)
 
