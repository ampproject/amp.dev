---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: É um contêiner para a exibição de um anúncio.
---



É um contêiner para a exibição de um anúncio. O `amp-embed` é um alias da tag `amp-ad`, tendo toda a funcionalidade dela, com um nome de tag diferente. Use `amp-embed` quando for mais preciso semanticamente. Os documentos de AMP são compatíveis somente com anúncios/incorporações veiculados via HTTPS.

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"]
as especificações do `amp-ad` / `amp-embed` provavelmente evoluirão significativamente com o passar do tempo. A abordagem atual foi desenvolvida para inicializar o formato, para poder exibir anúncios.
[/tip]


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<table>
  <tr>
    <td class="col-fourty"><strong>Descrição</strong></td>
    <td>É um contêiner para a exibição de um anúncio. O <code>amp-embed</code> é um alias da tag <code>amp-ad</code>, tendo toda a funcionalidade dela, com um nome de tag diferente. Use <code>amp-embed</code> quando for mais preciso semanticamente. Os documentos de AMP são compatíveis somente com anúncios/incorporações veiculados via HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;/script></code><br>Observação: o amp-ad ainda pode funcionar sem esse script, mas ele é altamente recomendável para compatibilidade futura.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Consulte um <a href="https://ampbyexample.com/components/amp-ad/">exemplo de amp-ad</a> no site AMP By Example.</td>
  </tr>
</table>

## Comportamento <a name="behavior"></a>

Os anúncios são carregados da mesma forma que todos os outros recursos em documentos AMP, com um elemento personalizado especial chamado `<amp-ad>`. Não é permitido exibir JavaScript fornecido pela rede de publicidade no documento AMP. Em vez disso, o ambiente de tempo de execução de AMP carrega como o documento AMP um iframe de uma origem diferente (por meio de um sandbox de iframe) e executa o JS da rede de publicidade dentro do sandbox desse iframe.

O `<amp-ad>` exige que os valores de largura e altura sejam especificados de acordo com [a regra](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) do tipo de layout dele. Ele precisa de um argumento `type` que selecione qual rede de publicidade será exibida. Todos os atributos `data-*` da tag serão passados automaticamente como argumentos para o código que renderizará o anúncio. A rede de publicidade define quais atributos `data-` são necessários para determinado tipo de rede, e os atributos precisam ser documentados com essa rede.

#### Exemplo: exibição de alguns anúncios <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (obrigatório)</strong></td>
    <td>Especifica um identificador para a <a href="#supported-ad-networks">rede de publicidade</a>. O atributo <code>type</code> seleciona o modelo a ser usado na tag de anúncio.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (opcional)</strong></td>
    <td>Use este atributo para carregar uma tag de script para a rede de publicidade especificada. Ele pode ser usado para redes de publicidade que precisam que exatamente uma tag de script seja inserida na página. O valor <code>src</code> precisa ter um prefixo na lista de permissões da rede de publicidade especificada, e o valor precisa usar o protocolo <code>https</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>A maioria das redes de publicidade exige mais configurações, que podem ser passadas para a rede usando atributos HTML <code>data-</code>. Os nomes de parâmetros estão sujeitos à conversão de traço para CamelCase do atributo de dados padrão. Por exemplo, "data-foo-bar" é enviado ao anúncio para configuração como "fooBar". Consulte a documentação da <a href="#supported-ad-networks">rede de publicidade</a> em que os atributos podem ser usados.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>Atributos que começam com <code>data-vars-</code> são reservados para as <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">variáveis do <code>amp-analytics</code></a> (link em inglês).</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (opcional)</strong></td>
    <td>Use o atributo para passar uma configuração ao anúncio como um objeto JSON arbitrariamente complexo. O objeto é transmitido para o anúncio no estado em que se encontra, sem nenhuma configuração feita nos nomes.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (opcional)</strong></td>
    <td>Se fornecido, precisa da confirmação do <a href="amp-user-notification.md">amp-user-notification</a> com o código HTML fornecido até que o "ID do cliente AMP" do usuário (semelhante a um cookie) seja passado ao anúncio. Isso significa que a renderização do anúncio é adiada até o usuário confirmar a notificação.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (opcional)</strong></td>
    <td>Instrui o anúncio a começar o carregamento quando ele estiver a um determinado número de janelas de visualização em relação à janela de visualização atual. Sem o atributo <code>data-loading-strategy</code>, o número é 3 por padrão. Você pode especificar um valor flutuante no intervalo de [0, 3]. Se o valor não for especificado, será definido como 1,25. Use um valor menor para ter um grau maior de visibilidade (isto é, para aumentar a chance de um anúncio ser visto depois de carregado), mas com o risco de gerar menos impressões, ou seja, menos anúncios carregados. Se o atributo for especificado, mas o valor for deixado em branco, o sistema atribuirá um valor flutuante, que otimiza a visibilidade sem afetar drasticamente as impressões. A especificação de <code>prefer-viewability-over-views</code> como o valor também otimiza automaticamente a visibilidade.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (opcional)</strong></td>
    <td>Informa o anúncio realcionado ao código do componente do contêiner no caso de tentativa de recolhimento. O componente do contêiner precisa ser um componente <code>&lt;amp-layout&gt;</code> que seja pai do anúncio. Quando o <code>data-ad-container-id</code> é especificado e um componente de contêiner <code>&lt;amp-layout&gt;</code> é encontrado, o ambiente de tempo de execução de AMP tenta recolher o componente de contêiner em vez do componente do anúncio em branco. Esse recurso pode ser útil quando um indicador de anúncio está presente.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Este elemento inclui <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comuns</a> estendidos a componentes de AMP.</td>
  </tr>
</table>

## Marcador <a name="placeholder"></a>

O `amp-ad` também pode ser compatível com um elemento filho com o atributo `placeholder`. Se for compatível com a rede de publicidade, esse elemento será exibido até que o anúncio esteja disponível para visualização. Saiba mais sobre [marcadores e substitutos](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Nenhum anúncio disponível <a name="no-ad-available"></a>

Se nenhum anúncio estiver disponível para o slot, a AMP tentará recolher o elemento `amp-ad` (ou seja, configurar para `display: none`). A AMP determina que essa operação possa ser realizada sem afetar a posição de rolagem do usuário. Se o anúncio estiver na janela de visualização atual, ele não será recolhido, porque isso afeta a posição de rolagem do usuário. No entanto, se o anúncio estiver fora da janela de visualização atual, ele será recolhido.

Caso a tentativa de recolhimento falhe, o componente `amp-ad` é compatível com um elemento filho que tenha o atributo `fallback`. Se houver um elemento substituto, o elemento substituto personalizado será mostrado. Caso contrário, a AMP aplicará um substituto padrão.

Exemplo com substituto:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Exibição de anúncios em vídeo <a name="serving-video-ads"></a>

Há três formas de gerar receita para vídeos em AMP por meio de anúncios em vídeo:

1. As AMP são compatíveis com vários players de vídeo, como BrightCove, DailyMotion etc., que podem gerar receita com anúncios. Para ver uma lista completa, consulte os componentes de [mídia](../../../documentation/components/index.html#media).

2. Use o componente [amp-ima-video](amp-ima-video.md), que vem com um SDK do IMA e um player de vídeo HTML5 integrados.
3. Caso seu player de vídeo não seja compatível com AMP, você pode exibir seu player personalizado usando [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Ao usar a abordagem do `amp-iframe`:

    * verifique se há um pôster caso o player seja carregado na primeira janela de visualização ([mais detalhes](amp-iframe.md#iframe-with-placeholder));
    * o vídeo e o pôster precisam ser exibidos por HTTPS.</li>

## Exibição de anúncios a partir de um domínio personalizado <a name="running-ads-from-a-custom-domain"></a>

A AMP é compatível com o carregamento do iframe de inicialização usado para carregar anúncios de um domínio personalizado, como o seu.

Para ativar isso, copie o arquivo [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html) para seu servidor da Web. Em seguida, adicione a seguinte metatag aos seus arquivos de AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  O atributo `content` da metatag é o URL absoluto para sua cópia do arquivo remote.html no seu servidor da Web. Esse URL precisa usar um esquema HTTPS. Ele não pode residir na mesma origem dos seus arquivos de AMP. Por exemplo, se você hospedar arquivos de AMP em `www.example.com`, esse URL não poderá estar em `www.example.com`, mas poderá estar em `something-else.example.com`. Consulte [Política de origem do Iframe](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) (link em inglês) para ver mais detalhes sobre as origens permitidas para iframes.

### Segurança <a name="security"></a>

**Valide os dados de entrada** antes de passá-los para a função `draw3p` a fim de garantir que o iframe faça apenas o que é esperado. Isso é válido, em especial, para redes de publicidade que permitem a injeção de JavaScript personalizado.

Os iframes também precisam exigir que sejam colocados apenas nas origens em que esperam ser colocados. As origens seriam:

* suas próprias origens;
* `https://cdn.ampproject.org` para o cache de AMP.

No caso do cache de AMP, você também precisa verificar se a "origem da fonte" (origem do documento exibido por cdn.ampproject.org) é uma de suas origens.

A aplicação das origens pode ser feita com o terceiro argumento de `draw3p` e também precisa ser feita usando a diretiva [allow-from](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/X-Frame-Options) (link em inglês) para compatibilidade completa com o navegador.

### Melhorar a configuração de anúncios recebidos <a name="enhance-incoming-ad-configuration"></a>

Isto é completamente opcional: às vezes, é recomendável aprimorar a solicitação de anúncios antes de fazê-la ao servidor de anúncios.

Se sua rede de publicidade for compatível com o [Fast Fetch](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad), use o recurso de [configuração em tempo real](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC, na sigla em inglês). Por exemplo, as integrações do DoubleClick e do Google AdSense são compatíveis com o Fast Fetch e o RTC.

Se a rede de publicidade usar o Delayed Fetch, você poderá passar um callback para a chamada de função `draw3p` no arquivo [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html). O callback recebe a configuração de entrada como primeiro argumento e depois recebe outro callback como segundo argumento (chamado `done` no exemplo abaixo). Esse callback precisa ser chamado com a configuração atualizada para que a renderização do anúncio aconteça.

Exemplo:

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() >‚ 0.5 ? 'sport' : 'fashion';
  // Don't actually call setTimeout here. This should only serve as an
  // example that is OK to call the done callback asynchronously.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## Estilo <a name="styling"></a>

Elementos `<amp-ad>` não podem ter contêineres ou ser colocados em contêineres que tenham o CSS `position: fixed` configurado (com exceção de `amp-lightbox`).
Isso ocorre devido às implicações de UX dos anúncios de sobreposição de página inteira. Pode-se considerar a possibilidade de permitir formatos de anúncios semelhantes no futuro dentro de contêineres controlados por AMP que mantenham determinadas invariantes de UX.

## Validação <a name="validation"></a>

Consulte as [regras de amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) (link em inglês) nas especificações do validador de AMP.

## Redes de publicidade compatíveis <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/master/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/master/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/master/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/master/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/master/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/master/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/master/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/master/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/master/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/master/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/master/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/master/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/master/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/master/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/master/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/master/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/master/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/master/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/master/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/master/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/master/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/master/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/master/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/master/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/master/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/master/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/master/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/master/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/master/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/master/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/master/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/master/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/master/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/master/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/master/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/master/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/master/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/master/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/master/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/master/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/master/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/master/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/master/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/master/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/master/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/master/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/master/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/master/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/master/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/master/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/master/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/master/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/master/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/master/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/master/ads/dotandads.md)
* [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/master/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/master/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/master/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/master/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/master/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/master/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/master/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/master/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/master/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/master/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/master/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/master/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/master/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/master/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/master/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/master/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/master/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/master/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/master/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/master/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/master/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/master/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/master/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/master/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/master/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/master/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/master/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/master/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/master/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/master/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/master/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/master/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/master/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/master/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/master/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/master/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/master/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/master/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/master/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/master/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/master/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/master/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/master/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/master/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/master/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/master/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/master/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/master/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/master/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/master/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/master/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/master/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/master/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/master/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/master/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/master/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/master/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/master/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/master/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/master/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/master/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/master/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/master/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/master/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/master/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/master/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/master/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/master/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/master/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/master/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/master/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/master/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/master/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/master/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/master/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/master/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/master/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/master/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/master/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/master/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/master/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/master/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/master/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/master/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/master/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/master/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/master/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/master/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/master/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/master/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/master/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/master/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/master/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/master/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/master/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/master/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/master/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/master/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/master/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/master/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/master/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/master/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/master/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/master/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/master/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/master/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/master/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/master/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/master/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/master/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/master/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/master/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/master/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/master/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/master/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/master/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/master/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/master/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/master/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/master/ads/zucks.md)

## Tipos de incorporação compatíveis <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/master/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/master/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/master/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/master/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/master/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/master/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/master/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/master/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/master/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/master/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/master/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/master/ads/zergnet.md)