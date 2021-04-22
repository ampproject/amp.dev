---
$title: Fornecedores de análise
---

Este documento lista os fornecedores de análise que têm configurações integradas para usar com o componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Para enviar dados de análise a um fornecedor terceirizado:

1. Na tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), adicione o atributo `type` e defina o valor do fornecedor especificado conforme descrito na seção [*Fornecedores*](#vendors) abaixo.
2. Determine quais dados você quer coletar e rastrear e especifique esses detalhes nos dados de configuração. Consulte a documentação do fornecedor para ver instruções sobre como coletar os dados de análise.

No exemplo a seguir, enviamos dados de page view para o [Google Analytics](#google-analytics), um fornecedor de análise terceirizado com uma configuração integrada para análise de AMP:

```html
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

[tip type="success"]

Se você tiver experiência em editar código, veja as configurações brutas no arquivo [`vendors.js`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/0.1/vendors.js) (em inglês).

[/tip]

[tip type="note"]

Os fornecedores que quiserem integrar os serviços ao [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) precisam consultar os detalhes no artigo sobre [integrar ferramentas de análise às AMP](../../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md).

[/tip]

<hr>

## Fornecedores <a name="vendors"></a>

### Acquia Lift

Valor do atributo de tipo: `acquialift`

Adiciona compatibilidade com o Acquia Lift. As variáveis `decisionApiUrl`, `accountId` e `siteId` precisam ser especificadas. Veja mais informações sobre o Acquia Lift em [https://docs.acquia.com/lift](https://docs.acquia.com/lift) (em inglês).

### Adobe Analytics

Digite o valor de atributo: `adobeanalytics`

Adiciona compatibilidade com o Adobe Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Adobe Analytics em [marketing.adobe.com](https://marketing.adobe.com/resources/help/pt_BR/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics

Valor do atributo de tipo: `afsanalytics`

Adiciona compatibilidade com o AFS Analytics. Além disso, as variáveis `websiteid` e `server` precisam ser especificadas. Veja mais detalhes sobre como adicionar compatibilidade com o AFS Analytics em [afsanalytics.com](https://www.afsanalytics.com/articles/developers/) (indisponível em português).

### Alexa Internet

Valor do atributo de tipo: `alexametrics`

Adiciona compatibilidade com as métricas de site certificadas da Alexa. As variáveis `atrk_acct` e `domain` precisam ser especificadas. Veja mais informações nas [Perguntas frequentes sobre as métricas certificadas da Alexa](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics) (em inglês).

### AT Internet

Valor do atributo de tipo: `atinternet`

Adiciona compatibilidade com o AT Internet. Veja mais detalhes sobre como adicionar compatibilidade com o AT Internet em [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/) (em inglês).

### Baidu Analytics

Valor do atributo de tipo: `baiduanalytics`

Adiciona compatibilidade com o Baidu Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Baidu Analytics em [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0) (indisponível em português).

### Burt

Valor do atributo de tipo: `burt`

Adiciona compatibilidade com o Burt. Além disso, a variável `trackingKey` precisa ser especificada. Também é possível especificar as variáveis opcionais `category` e `subCategory`. Veja mais detalhes em [burtcorp.com](http://burtcorp.com) (em inglês).

### Chartbeat

Valor do atributo de tipo: `chartbeat`

Adiciona compatibilidade com o Chartbeat. Veja mais detalhes sobre como adicionar compatibilidade com o Chartbeat em [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp) (em inglês).

### Clicky Web Analytics

Valor do atributo de tipo: `clicky`

Adiciona compatibilidade com o Clicky Web Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Clicky em [clicky.com](https://clicky.com/help/apps-plugins) (em inglês).

### comScore

Valor do atributo de tipo: `comscore`

Adiciona compatibilidade com as análises de page view do comScore Unified Digital Measurement™. Exige a definição da *var* `c2` com o *c2 id* fornecido pela comScore. Veja mais informações em [comscore.com](http://www.comscore.com) (em inglês).

### Cxense

Valor do atributo de tipo: `cxense`

Adiciona compatibilidade com a análise do Cxense Insight. Exige definição da *var* `siteId` com *siteId* fornecido pela Cxense. Veja mais detalhes em [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration) (em inglês).

### Dynatrace

Valor do atributo de tipo: `dynatrace`

Adiciona compatibilidade com o monitoramento de usuários reais da Dynatrace. Exige a definição da *var* `app` com o *código do aplicativo* fornecido pela Dynatrace e da *var* `tenant` com um *identificador de ambiente* fornecido pela Dynatrace. Veja mais detalhes sobre como adicionar o monitoramento de usuários reais da Dynatrace em [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/) (em inglês).

### Eulerian Analytics

Valor do atributo de tipo: `euleriananalytics`

Adiciona compatibilidade com a Eulerian Technologies Analytics. Exige a definição da *var* `analyticsHost` com o domínio delegado da Eulerian. Veja mais detalhes em [eulerian.wiki](https://eulerian.wiki) (em inglês).

### Facebook Pixel

Valor do atributo de tipo: `facebookpixel`

Adiciona compatibilidade com o [Pixel do Facebook](https://www.facebook.com/business/a/facebook-pixel). Na configuração da análise de AMP, é preciso definir seu código de pixel como `pixelId: YOUR-PIXEL-ID`. Os eventos compatíveis com os valores de evento correspondentes que podem ser especificados estão listados na [documentação do desenvolvedor do Pixel do Facebook](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius

Valor do atributo de tipo: `gemius`

Adiciona compatibilidade com as análises do Gemius Audience/Prism. Além disso, as variáveis `prefix` e `identifier` fornecidas pela Gemius precisam ser especificadas. Também é possível especificar a variável opcional `extraparams` (chave1=valor1|chave2=valor2). Veja mais detalhes em [gemius.com](https://www.gemius.com) (em inglês).

### Google AdWords

Valor do atributo de tipo: `googleadwords`

Adiciona compatibilidade com o remarketing e o acompanhamento de conversões do Google AdWords. Veja mais detalhes na seção da Central de Ajuda do Google AdWords sobre [acompanhamento de conversões](https://support.google.com/adwords/answer/1722054?hl=pt-BR) e [remarketing](https://support.google.com/adwords/answer/2453998?hl=pt-BR). As duas tags podem ser usadas independentemente uma da outra.

### Google Analytics <a name="google-analytics"></a>

Valor do atributo de tipo: `googleanalytics`

Adiciona compatibilidade com o Google Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Google Analytics em [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### INFOnline / IVW

Valor do atributo de tipo: `infonline`

Adiciona compatibilidade com o [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de) (indisponível em português). Exige uma cópia de [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) em um subdomínio diferente daquele que inclui os arquivos AMP ([saiba mais nesta postagem em inglês](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)). O arquivo precisa ser disponibilizado por HTTPS. Por exemplo, se os arquivos AMP estiverem hospedados em `www.example.com`, `amp-analytics-infonline.html` precisará estar em outro subdomínio, como `iframe.example.com` ou `assets.example.com`.

Além disso, as seguintes variáveis precisam ser definidas:

* `st`: Angebotskennung
* `co`: comentário
* `cp`: código
* `url`: localização HTTPS de `amp-analytics-infonline.html`

Veja mais detalhes sobre como adicionar compatibilidade com o INFOnline / IVW em [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/) (indisponível em português).

### Krux

Valor do atributo de tipo: `krux`

Adiciona compatibilidade com o Krux.  Veja mais detalhes sobre a configuração em [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608) (indisponível em português).

### Linkpulse

Valor do atributo de tipo: `linkpulse`

Adiciona compatibilidade com o Linkpulse. Veja mais detalhes sobre a configuração em [docs.linkpulse.com](http://docs.linkpulse.com) (em inglês).

### Lotame

Valor do atributo de tipo: `lotame`

Adiciona compatibilidade com o Lotame.  Veja mais informações e detalhes de configuração em [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP) (em inglês).

### Médiamétrie

Valor do atributo de tipo: `mediametrie`

Adiciona compatibilidade com as páginas de rastreamento da Médiamétrie. Exige a definição da *var* `serial`. As variáveis de `level1` a `level4` são opcionais.  Veja mais informações em [mediametrie.com](http://www.mediametrie.com/) (indisponível em português).

### mediarithmics

Valor do atributo de tipo: `mediarithmics`

Adiciona compatibilidade com o mediarithmics. Veja mais informações e detalhes de configuração em [developer.mediarithmics.com](https://developer.mediarithmics.com/) (em inglês).

### mParticle

Valor do atributo de tipo: `mparticle`

Adiciona compatibilidade com o mParticle. Veja mais detalhes sobre como adicionar compatibilidade com o mParticle em [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp) (em inglês).

### New Relic

Valor do atributo de tipo: `newrelic`

Adiciona compatibilidade com o navegador New Relic para avaliar a capacidade e o desempenho de AMP. Ao adicionar o valor de atributo `newrelic`, será peciso adicionar `app ID` e `license key` a partir de sua conta do navegador New Relic para coletar dados. Veja mais detalhes na página de documentação AMP do navegador New Relic em [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser) (em inglês).

### Nielsen

Valor do atributo de tipo: `nielsen`

Adiciona compatibilidade com o Nielsen DCR. Entre em contato com o representante da Nielsen para configurar o `apid`e receber ajuda na definição dos outros parâmetros da seção `vars`. Para mais informações, consulte a [documentação de suporte da Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) (em inglês).

### Nielsen Marketing Cloud

Valor do atributo de tipo: `nielsen-marketing-cloud`

Adiciona compatibilidade com o Nielsen Marketing Cloud. Veja mais detalhes em [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html) (em inglês).

### OEWA

Valor do atributo de tipo: `oewa`

Adiciona compatibilidade com [OEWA](https://www.oewa.at) (indisponível em português). Exige uma cópia de [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) em um subdomínio diferente daquele que inclui os arquivos AMP ([saiba mais nesta postagem em inglês](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)). O arquivo precisa ser disponibilizado por HTTPS. Por exemplo, se os arquivos AMP estiverem hospedados em `www.example.com`, `amp-analytics-oewa.html` precisará estar em outro subdomínio, como `oewa-amp.example.com`. Veja mais detalhes sobre [como adicionar compatibilidade com o OEWA](http://www.oewa.at/Implementierung) (indisponível em português).

Além disso, as seguintes variáveis precisam ser definidas:

Na seção `vars`:

- `s`: oferta
- `cp`: caminho da categoria

Na seção `requests`:

- `url`: localização HTTPS de `amp-analytics-oewa.html`

[tip type="note"]

Há uma variação chamada `oewadirect` que não usa a solução iframe-ping e tem uma melhor detecção de cliente com o uso de `AMP CLIENT_ID`.  No momento, esse recurso é EXPERIMENTAL e proibido pela OEWA, porque não usa `oewa2.js`.

[/tip]

### Parsely

Valor do atributo de tipo: `parsely`

Adiciona compatibilidade com o Parsely. Veja mais detalhes sobre a configuração em [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html) (em inglês).

### Piano

Valor do atributo de tipo: `piano`

Adiciona compatibilidade com o Piano.  Veja mais detalhes sobre a configuração em [vx.piano.io](http://vx.piano.io/javascript-tracking-amp) (em inglês).

### Quantcast Measurement

Valor do atributo de tipo: `quantcast`

Adiciona compatibilidade com a Quantcast Measurement. Veja mais detalhes sobre como adicionar compatibilidade com a Quantcast Measurement em [quantcast.com](https://www.quantcast.com/help/guides/) (em inglês).

### Segment

Valor do atributo de tipo: `segment`

Adiciona compatibilidade para exibições de página e eventos do Segment.
Para ver a lista completa de campos que você pode enviar, consulte as [especificações do Segment](https://segment.com/docs/spec/) (em inglês).

### SOASTA mPulse

Valor do atributo de tipo: `mpulse`

Adiciona compatibilidade com o [SOASTA mPulse](https://www.soasta.com/mPulse). Veja mais detalhes sobre a configuração em [docs.soasta.com](http://docs.soasta.com/) (em inglês).

### SimpleReach

Valor do atributo de tipo: `simplereach`

Adiciona compatibilidade com o SimpleReach. Veja mais detalhes sobre a configuração em [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation) (em inglês).

### Snowplow Analytics

Valor do atributo de tipo: `snowplow`

Adiciona compatibilidade com o Snowplow Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Snowplow Analytics em [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker) (em inglês).

### Rambler/TOP-100

Valor do atributo de tipo: `top100`

Adiciona compatibilidade com o Rambler/TOP-100. Veja mais detalhes sobre a configuração em [top100.rambler.ru](https://top100.rambler.ru/docs) (indisponível em português).

### Top.Mail.Ru

Valor do atributo de tipo: `topmailru`

Adiciona compatibilidade com o Top.Mail.Ru. Veja mais detalhes sobre a configuração na [Ajuda do Top.Mail.Ru](https://help.mail.ru/top/amp-analytics) (indisponível em português).

### Umeng+ Analytics

Valor do atributo de tipo: `umenganalytics`

Adiciona compatibilidade com o Umeng+ Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Umeng+ Analytics em [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5) (indisponível em português).

### Treasure Data

Valor do atributo de tipo: `treasuredata`

Adiciona compatibilidade com o Treasure Data. Veja mais detalhes sobre a configuração em [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp) (indisponível em português).

### Webtrekk

O valor do atributo ~~`webtrekk`~~ está obsoleto (será removido em 31/12/2018). Use `webtrekk_2`.

Adiciona compatibilidade com o Webtrekk. Veja mais detalhes sobre a configuração em [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html) (indisponível em português).

### Yandex Metrica

Valor do atributo de tipo: `metrika`

Adiciona compatibilidade com a Yandex Metrica.  Veja mais detalhes sobre a configuração no [suporte da Yandex](https://yandex.com/support/metrica/code/install-counter-amp.xml) (em inglês).
