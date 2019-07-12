---
$category@: ads-analytics
formats:
- websites
teaser:
  text: É um contêiner para a exibição de um anúncio.
---

# amp-ad / amp-embed

É um contêiner para a exibição de um anúncio. O `amp-embed` é um alias da tag `amp-ad`, tendo toda a funcionalidade dela, com um nome de tag diferente. Use `amp-embed` quando for mais preciso semanticamente. Os documentos de AMP são compatíveis somente com anúncios/incorporações veiculados via HTTPS.

# `amp-ad` / `amp-embed`


[tip type="note"]
as especificações do `amp-ad` / `amp-embed` provavelmente evoluirão significativamente com o passar do tempo. A abordagem atual foi desenvolvida para inicializar o formato, para poder exibir anúncios.
[/tip]


<!---
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
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Layouts compatíveis</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Consulte um <a href="https://ampbyexample.com/components/amp-ad/">exemplo de amp-ad</a> no site AMP By Example.</td>
  </tr>
</table>

## Comportamento

Os anúncios são carregados da mesma forma que todos os outros recursos em documentos AMP, com um elemento personalizado especial chamado `<amp-ad>`. Não é permitido exibir JavaScript fornecido pela rede de publicidade no documento AMP. Em vez disso, o ambiente de tempo de execução de AMP carrega como o documento AMP um iframe de uma origem diferente (por meio de um sandbox de iframe) e executa o JS da rede de publicidade dentro do sandbox desse iframe.

O `<amp-ad>` exige que os valores de largura e altura sejam especificados de acordo com [a regra](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) do tipo de layout dele. Ele precisa de um argumento `type` que selecione qual rede de publicidade será exibida. Todos os atributos `data-*` da tag serão passados automaticamente como argumentos para o código que renderizará o anúncio. A rede de publicidade define quais atributos `data-` são necessários para determinado tipo de rede, e os atributos precisam ser documentados com essa rede.

#### Exemplo: exibição de alguns anúncios

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Mostrar mais" overflow="" tabindex="0" role="button">Mostrar código completo</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## Atributos

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
    <td>Se fornecido, precisa da confirmação do <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> com o código HTML fornecido até que o "ID do cliente AMP" do usuário (semelhante a um cookie) seja passado ao anúncio. Isso significa que a renderização do anúncio é adiada até o usuário confirmar a notificação.</td>
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
    <td>Este elemento inclui <a href="https://www.ampproject.org/docs/reference/common_attributes">atributos comuns</a> estendidos a componentes de AMP.</td>
  </tr>
</table>

## Marcador

O `amp-ad` também pode ser compatível com um elemento filho com o atributo `placeholder`. Se for compatível com a rede de publicidade, esse elemento será exibido até que o anúncio esteja disponível para visualização. Saiba mais sobre [marcadores e substitutos](https://www.ampproject.org/docs/guides/responsive/placeholders).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Nenhum anúncio disponível

Se nenhum anúncio estiver disponível para o slot, a AMP tentará recolher o elemento `amp-ad` (ou seja, configurar para `display: none`). A AMP determina que essa operação possa ser realizada sem afetar a posição de rolagem do usuário. Se o anúncio estiver na janela de visualização atual, ele não será recolhido, porque isso afeta a posição de rolagem do usuário. No entanto, se o anúncio estiver fora da janela de visualização atual, ele será recolhido.

Caso a tentativa de recolhimento falhe, o componente `amp-ad` é compatível com um elemento filho que tenha o atributo `fallback`. Se houver um elemento substituto, o elemento substituto personalizado será mostrado. Caso contrário, a AMP aplicará um substituto padrão.

Exemplo com substituto:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Exibição de anúncios em vídeo

Há três formas de gerar receita para vídeos em AMP por meio de anúncios em vídeo:

1. As AMP são compatíveis com vários players de vídeo, como BrightCove, DailyMotion etc., que podem gerar receita com anúncios. Para ver uma lista completa, consulte os componentes de [mídia](https://www.ampproject.org/docs/reference/components#media).

2. Use o componente [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html), que vem com um SDK do IMA e um player de vídeo HTML5 integrados.
3. Caso seu player de vídeo não seja compatível com AMP, você pode exibir seu player personalizado usando [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Ao usar a abordagem do `amp-iframe`:

    * verifique se há um pôster caso o player seja carregado na primeira janela de visualização ([mais detalhes](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder));
    * o vídeo e o pôster precisam ser exibidos por HTTPS.</li>

## Exibição de anúncios a partir de um domínio personalizado

A AMP é compatível com o carregamento do iframe de inicialização usado para carregar anúncios de um domínio personalizado, como o seu.

Para ativar isso, copie o arquivo [remote.html](../../3p/remote.html) para seu servidor da Web. Em seguida, adicione a seguinte metatag aos seus arquivos de AMP:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  O atributo `content` da metatag é o URL absoluto para sua cópia do arquivo remote.html no seu servidor da Web. Esse URL precisa usar um esquema HTTPS. Ele não pode residir na mesma origem dos seus arquivos de AMP. Por exemplo, se você hospedar arquivos de AMP em `www.example.com`, esse URL não poderá estar em `www.example.com`, mas poderá estar em `something-else.example.com`. Consulte [Política de origem do Iframe](../../spec/amp-iframe-origin-policy.md) (link em inglês) para ver mais detalhes sobre as origens permitidas para iframes.

### Segurança

**Valide os dados de entrada** antes de passá-los para a função `draw3p` a fim de garantir que o iframe faça apenas o que é esperado. Isso é válido, em especial, para redes de publicidade que permitem a injeção de JavaScript personalizado.

Os iframes também precisam exigir que sejam colocados apenas nas origens em que esperam ser colocados. As origens seriam:

* suas próprias origens;
* `https://cdn.ampproject.org` para o cache de AMP.

No caso do cache de AMP, você também precisa verificar se a "origem da fonte" (origem do documento exibido por cdn.ampproject.org) é uma de suas origens.

A aplicação das origens pode ser feita com o terceiro argumento de `draw3p` e também precisa ser feita usando a diretiva [allow-from](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/X-Frame-Options) (link em inglês) para compatibilidade completa com o navegador.

### Melhorar a configuração de anúncios recebidos

Isto é completamente opcional: às vezes, é recomendável aprimorar a solicitação de anúncios antes de fazê-la ao servidor de anúncios.

Se sua rede de publicidade for compatível com o [Fast Fetch](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation), use o recurso de [configuração em tempo real](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC, na sigla em inglês). Por exemplo, as integrações do DoubleClick e do Google AdSense são compatíveis com o Fast Fetch e o RTC.

Se a rede de publicidade usar o Delayed Fetch, você poderá passar um callback para a chamada de função `draw3p` no arquivo [remote.html](../../3p/remote.html). O callback recebe a configuração de entrada como primeiro argumento e depois recebe outro callback como segundo argumento (chamado `done` no exemplo abaixo). Esse callback precisa ser chamado com a configuração atualizada para que a renderização do anúncio aconteça.

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

## Estilo

Elementos `<amp-ad>` não podem ter contêineres ou ser colocados em contêineres que tenham o CSS `position: fixed` configurado (com exceção de `amp-lightbox`).
Isso ocorre devido às implicações de UX dos anúncios de sobreposição de página inteira. Pode-se considerar a possibilidade de permitir formatos de anúncios semelhantes no futuro dentro de contêineres controlados por AMP que mantenham determinadas invariantes de UX.

## Validação

Consulte as [regras de amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) (link em inglês) nas especificações do validador de AMP.

## Redes de publicidade compatíveis

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md)
* [AdvertServe](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay](../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [DoubleClick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Fusion](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [I-Mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Yandex](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## Tipos de incorporação compatíveis

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)
