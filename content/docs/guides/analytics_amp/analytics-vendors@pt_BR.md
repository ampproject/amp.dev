---

$title: "Fornecedores de análise"
$order: 4
toc: true
---

[TOC]

 Este documento lista os fornecedores de análise que têm configurações integradas para uso com o componente [`amp-analytics`](/pt_br/docs/reference/components/amp-analytics.html) .

Ao especificar o nome de um fornecedor de análise com o atributo `type`, é possível configurar rapidamente `amp-analytics` para usar o respectivo produto. Configurações adicionais (como seu código de usuário) ainda podem ser necessárias.

 Consulte a documentação do seu fornecedor. Pode haver um link para ela nas seções abaixo. Você também pode consultar o arquivo [vendors.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js) para mais informações sobre a configuração de cada fornecedor.

**Exemplo:**

Veja um snippet que especifica `type` para um fornecedor de análise chamado `XYZ`:

```html
<amp-analytics type="XYZ"> … </amp-analytics>
```

{% call callout('Leia mais', type='read') %}
 Saiba mais sobre as análises de rastreamento com [`amp-analytics`](/pt_br/docs/reference/components/amp-analytics.html)
.{% endcall %}

## Fornecedores

### Acquia Lift

Valor do atributo de tipo: `acquialift`

 Adiciona a compatibilidade com o Acquia Lift. As variáveis `decisionApiUrl`, `accountId` e `siteId` precisam ser especificadas. Veja mais informações sobre o Acquia Lift em [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics

Valor do atributo de tipo: `adobeanalytics`

 Adiciona compatibilidade com o Adobe Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Adobe Analytics em [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics

Valor do atributo de tipo: `afsanalytics`

 Adiciona compatibilidade com o AFS Analytics. Além disso, as variáveis `websiteid` e `server` precisam ser especificadas. Veja mais detalhes sobre como adicionar compatibilidade com o AFS Analytics em [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### AT Internet

Valor do atributo de tipo: `atinternet`

 Adiciona compatibilidade com o AT Internet. Veja mais detalhes sobre como adicionar compatibilidade com o AT Internet em [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics

Valor do atributo de tipo: `baiduanalytics`

 Adiciona compatibilidade com o Baidu Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Baidu Analytics em [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### Burt

Valor do atributo de tipo: `burt`

 Adiciona compatibilidade com o Burt. Além disso, a variável `trackingKey` precisa ser especificada. Também é possível especificar as variáveis ​​opcionais `category` e `subCategory`. Veja mais detalhes em [burtcorp.com](http://burtcorp.com).

### Chartbeat

Valor do atributo de tipo: `chartbeat`

 Adiciona compatibilidade com o Chartbeat. Veja mais detalhes sobre como adicionar compatibilidade com o Chartbeat em [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics

Valor do atributo de tipo: `clicky`

 Adiciona compatibilidade com o Clicky Web Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Clicky Web Analytics em [clicky.com](https://clicky.com/help/apps-plugins).

### comScore

Valor do atributo de tipo: `comscore`

 Adiciona compatibilidade com as análises de exibição de página do comScore Unified Digital Measurement&trade;. Exige a definição da*var*  `c2` com o*c2 id* fornecido pela comScore. Veja mais informações em [comscore.com](http://www.comscore.com).

### Cxense

Valor do atributo de tipo: `cxense`

 Adiciona compatibilidade com a análise do Cxense Insight. Exige a definição da*var*  `siteId` com o*siteId* fornecido pela Cxense. Veja mais detalhes em [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Dynatrace

Valor do atributo de tipo: `dynatrace`

 Adiciona compatibilidade com o monitoramento de usuários reais da Dynatrace. Exige a definição da *var* `app` com o *código do aplicativo* fornecido pela Dynatrace e da *var* `tenant` com um *identificador de ambiente* fornecido pela Dynatrace. Veja mais detalhes sobre como adicionar compatibilidade com a Dynatrace em [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### Eulerian Analytics

Valor do atributo de tipo: `euleriananalytics`

 Adiciona compatibilidade com a Eulerian Technologies Analytics. Exige a definição da*var*  `analyticsHost` com o domínio delegado da Eulerian. Veja mais detalhes em [eulerian.wiki](https://eulerian.wiki).

### Gemius

Valor do atributo de tipo: `gemius`

 Adiciona compatibilidade com as análises do Gemius Audience/Prism. Além disso, as variáveis `prefix` e `identifier` fornecidas pela Gemius precisam ser especificadas. Também é possível especificar a variável ​​opcional `extraparams` (chave1=valor1|chave2=valor2). Veja mais detalhes em [gemius.com](https://www.gemius.com).

### Google AdWords

Valor do atributo de tipo: `googleadwords`

 Adiciona compatibilidade com o remarketing e o acompanhamento de conversões do Google AdWords. Veja mais detalhes na seção da Central de Ajuda do Google AdWords sobre [acompanhamento de conversões](https://support.google.com/adwords/answer/1722054?hl=en)  e [remarketing](https://support.google.com/adwords/answer/2453998?hl=en). As duas tags podem ser usadas independentemente uma da outra.

### Google Analytics

Valor do atributo de tipo: `googleanalytics`

 Adiciona compatibilidade com o Google Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Google Analytics em [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### INFOnline / IVW

Valor do atributo de tipo: `infonline`

 Adiciona compatibilidade com o [INFOnline](https://www.infonline.de)  / [IVW](http://www.ivw.de) . Exige uma cópia de [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) em um subdomínio diferente daquele que inclui os arquivos AMP ([saiba mais](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). O arquivo precisa ser veiculado por HTTPS. Por exemplo, se os arquivos AMP estiverem hospedados em `www.example.com`, `amp-analytics-infonline.html` precisará estar em outro subdomínio, como `iframe.example.com` ou `assets.example.com`.

Além disso, as seguintes variáveis precisam ser definidas:

* `st`: Angebotskennung
* `co`: comentário
* `cp`: código
* `url`: localização HTTPS de `amp-analytics-infonline.html`

 Veja mais detalhes sobre como adicionar compatibilidade com o INFOnline / IVW em [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/).

### Krux

Valor do atributo de tipo: `krux`

 Adiciona compatibilidade com o Krux. Veja mais detalhes sobre a configuração em [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse

Valor do atributo de tipo: `linkpulse`

 Adiciona compatibilidade com o Linkpulse. Veja mais detalhes sobre a configuração em [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame

Valor do atributo de tipo: `lotame`

 Adiciona compatibilidade com o Lotame. Veja mais informações e detalhes de configuração em [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Médiamétrie

Valor do atributo de tipo: `mediametrie`

 Adiciona compatibilidade com as páginas de rastreamento da Médiamétrie. Exige a definição da*var*  `serial`. As variáveis de `level1` a `level4` são opcionais. Veja mais informações em [mediametrie.com](http://www.mediametrie.com/).

### mParticle

Valor do atributo de tipo: `mparticle`

 Adiciona compatibilidade com o mParticle. Veja mais detalhes sobre como adicionar compatibilidade com o mParticle em [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Nielsen

Valor do atributo de tipo: `nielsen`

 Adiciona compatibilidade com o Nielsen DCR. Entre em contato com o representante da Nielsen para configurar o `apid` e receber ajuda na definição dos outros parâmetros da seção `vars`. Para mais informações, consulte: [Documentação de suporte da Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### OEWA

Valor do atributo de tipo: `oewa`

 Adiciona compatibilidade com o [OEWA](https://www.oewa.at). Exige uma cópia de [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) em um subdomínio diferente daquele que inclui os arquivos AMP ([saiba mais](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) ). O arquivo precisa ser veiculado por HTTPS. Por exemplo, se os arquivos AMP estiverem hospedados em `www.example.com`, `amp-analytics-oewa.html` precisará estar em outro subdomínio, como `oewa-amp.example.com`. Veja mais detalhes sobre [como adicionar compatibilidade com o OEWA](http://www.oewa.at/basic/implementierung).

Além disso, as seguintes variáveis precisam ser definidas:

Na seção `vars`:

- `s`: oferta
- `cp`: caminho da categoria

Na seção `requests`:

- `url`: localização HTTPS de `amp-analytics-oewa.html`

{% call callout('Observação', type='caution') %}
há uma variação chamada `oewadirect` que não usa a solução iframe-ping e tem uma melhor detecção de cliente com o uso de `AMP CLIENT_ID`. Esse recurso atualmente é EXPERIMENTAL e proibido pela OEWA, porque não usa `oewa2.js`.
{% endcall %}

### Parsely

Valor do atributo de tipo: `parsely`

 Adiciona compatibilidade com o Parsely. Veja mais detalhes sobre a configuração em [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Piano

Valor do atributo de tipo: `piano`

 Adiciona compatibilidade com o Piano. Veja mais detalhes sobre a configuração em [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Quantcast Measurement

Valor do atributo de tipo: `quantcast`

 Adiciona compatibilidade com a Quantcast Measurement. Veja mais detalhes sobre como adicionar compatibilidade com a Quantcast Measurement em [quantcast.com](https://www.quantcast.com/help/guides/)

### Segment

Valor do atributo de tipo: `segment`

 Adiciona compatibilidade para exibições de página e eventos do Segment. Para ver a lista completa de campos que você pode enviar, consulte as [Especificações do Segment](https://segment.com/docs/spec/).

### SOASTA mPulse

Valor do atributo de tipo: `mpulse`

 Adiciona compatibilidade com o [SOASTA mPulse](https://www.soasta.com/mPulse). Veja mais detalhes sobre a configuração em [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach

Valor do atributo de tipo: `simplereach`

 Adiciona compatibilidade com o SimpleReach. Veja mais detalhes sobre a configuração em [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation).

### Snowplow Analytics

Valor do atributo de tipo: `snowplow`

 Adiciona compatibilidade com o Snowplow Analytics. Veja mais detalhes sobre como adicionar compatibilidade com o Snowplow Analytics em [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100

Valor do atributo de tipo: `top100`

 Adiciona compatibilidade com a Rambler/TOP-100. Veja mais detalhes sobre a configuração em [top100.rambler.ru](https://top100.rambler.ru/docs).

### Webtrekk

Valor do atributo de tipo: `webtrekk`

 Adiciona compatibilidade com o Webtrekk. Veja mais detalhes sobre a configuração em [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica

Valor do atributo de tipo: `metrika`

 Adiciona compatibilidade com a Yandex Metrica. Veja mais detalhes sobre a configuração em [Suporte da Yandex](https://yandex.com/support/metrica/code/install-counter-amp.xml).

