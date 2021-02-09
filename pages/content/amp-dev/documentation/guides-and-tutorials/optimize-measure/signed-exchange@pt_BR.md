---
'$title': Sirva páginas AMP usando trocas HTTP assinadas
$order: 4
formats:
  - websites
author: CrystalOnScript
---

O AMP oferece benefícios de velocidade acima e além do formato através de técnicas como armazenamento em cache e pré-carregamento. Esses benefícios podem trazer [desvantagens](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/), como URLs extras sendo exibidas quando incorporadas em um [AMP Viewer](https://developers.google.com/search/docs/guides/about-amp). Ao servir conteúdo AMP usando trocas assinadas, você pode usar um novo recurso de plataforma da Web para superar todos esses problemas.

Uma [troca assinada](https://developers.google.com/web/updates/2018/11/signed-exchanges) é composta por um documento AMP válido e a URL original do conteúdo. Essas informações são protegidas por assinaturas digitais que vinculam o documento à sua URL com segurança. Isso permite que os navegadores exibam com segurança a URL original na barra de URL do navegador, em vez do nome do host da máquina que entregou os bytes ao navegador.

O conteúdo AMP assinado é entregue _além do_ (em vez de no lugar do) conteúdo AMP regular.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] Este recurso é atualmente suportado no Chrome, mas a implementação está planejada para navegadores adicionais. [/tip]

# As trocas assinadas funcionarão para mim?

Para implementar trocas assinadas, você deve atender aos seguintes requisitos:

- Capacidade de configurar e controlar os cabeçalhos HTTP gerados pelo seu servidor. (A maior parte das soluções de hospedagem puramente baseadas na web, como o Blogger, _não_ são compatíveis com trocas assinadas.)
- A capacidade de gerar trocas AMP assinadas, como através da execução do [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), como um [binário Go](https://golang.org/doc/install) ou em uma [máquina virtual Docker](https://docs.docker.com/machine/get-started/).
  - O packager precisa ser atualizado a cada seis semanas.
- A capacidade de usar [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) nos cabeçalhos `Accept` e `AMP-Cache-Transform` em servidores HTTP de ponta, retornando conteúdo diferente para a mesmo URL.
- O sistema que executa o `amppackager` precisa ser capaz de fazer solicitações de saída para:
  - A autoridade de certificação que emite seu certificado
  - O servidor do editor que hospeda os documentos AMP a serem assinados
  - `cdn.ampproject.org` para obter a versão atual do AMP
- Um sistema de arquivos de armazenamento compartilhado persistente entre todas as instâncias de `amppackager` que estiverem em execução no mesmo data center.

# Implementando trocas assinadas

Abaixo está a ordem sugerida de implementação para oferecer suporte a trocas assinadas em seus documentos AMP.

## Adquira um certificado TLS suportado

Para produzir trocas assinadas, você precisa de um certificado TLS com a extensão `CanSignHttpExchanges`. Desde abril de 2019, a [DigiCert](https://www.digicert.com/) é o único provedor que suporta esta extensão ([mais informações aqui](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

Para gerar o certificado, a autoridade de certificação (CA) exigirá uma solicitação de assinatura de certificado (Certificate Signing Request - CSR), que pode ser gerada por `openssl`. Veja um exemplo de CSR para `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Determine quais URLs serão assinadas

Você terá que criar um padrão de URL que defina quais documentos devem ser assinados. É fundamental que conteúdo privado, como informações personalizadas, não seja assinado, para evitar o envio de conteúdo enganoso ou incorreto.

Para melhor desempenho, o packager deve receber apenas documentos AMP válidos como entrada. Alguns documentos inválidos de AMP podem ser usados em último caso, se necessário, mas você deve evitar enviar todo o tráfego pelo packager.

## Instale o packager em um servidor de testes

Você deve primeiro configurar trocas assinadas em um servidor de teste para verificar se sua configuração está correta antes de migrar para a produção.

Recomendamos o uso de [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) para gerar trocas assinadas. No entanto, se isto não for adequado para seu ambiente de produção, você pode usar os clientes de linha de comando [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) e [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange), e cuidar você mesmo das tarefas de negociação de conteúdo e gerenciamento de certificados.

As instruções a seguir se aplicam às implantações usando `amppackager`.

### Configuração

O arquivo de configuração do [`amppackager`](https://github.com/ampproject/amppackager)(`amppkg.toml`) precisa de um **CertFile** e um **KeyFile**.

O **KeyFile** é a chave privada(`ampbyexample-packager.key` no exemplo acima), e deve ter o seguinte formato. (Observação: não compartilhe sua própria chave privada e mantenha protegida de compartilhamento indevido!)

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

O **CertFile** é o certificado público. Se o DigiCert forneceu o certificado, ele pode ser criado concatenando o certificado da origem fornecido pelo DigiCert e o arquivo `DigiCertCA.crt`.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Instalação

Siga as instruções [aqui para configurar o `amppackager` para seu site](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Veja [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (usado por `amp.dev`) para um exemplo das mudanças lado-servidor que você terá que fazer para rotear as requisições necessárias ao `amppkg`. [/tip]

### Testes

Certifique-se que o seu site de testes responde com conteúdo do tipo MIME `application/signed-exchange` quando especificado pela solicitação HTTP. Por exemplo (substitua `staging.example.com` com seu servidor de testes):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

A saída deve incluir esta linha:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] O `v="1..100"` na requisição é um placeholder. Não corresponda a este valor exato; em vez disso, conforme [descrito nas instruções de instalação do amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), verifique apenas a existência do cabeçalho `amp-cache-transform` e ignore o valor.[/tip]

[tip type="important"] O string de versão `v=b3` na resposta é a versão de agosto de 2019. Esta versão será alterada. [/tip]

A maior parte da resposta deve ser sua página AMP (em texto simples). Há um pequeno cabeçalho binário e, se a página for maior que 16kb, terá mais alguns bytes binários espalhados pela resposta.

A [ferramenta `dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) pode ser usada para inspecionar a resposta:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Observe que a chave `-verify` não vai funcionar neste ponto porque os certificados necessários não estão no servidor `https://example.com/`.)

Verifique que a resposta _sempre_ inclua o cabeçalho `Vary` com o valor `Accept,AMP-Cache-Transform` (independentemente de o tipo MIME ser `text/html`, `application/signed-exchange`, ou algo diferente):

```sh
$ curl -si https://staging.example.com/ | less
```

Esta saída deve incluir esta linha:

```txt
vary: Accept,AMP-Cache-Transform
```

## Implante o packager em produção

### Instalação

Ajuste as etapas de implantação de teste acima conforme seja apropriado para seu ambiente de produção.

### Testes

#### Com ferramentas de linha de comando

Execute os mesmos testes acima. `dump-signedexchange -verify` agora também deve funcionar.

#### Com o Chrome

Você também pode testar no Chrome com a ajuda da [extensão ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Instale-a a partir da Chrome Webstore e configure `Request Headers` para `amp-cache-transform` com um `Value` de `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

Depois de solicitar `https://example.com/` seu servidor entregará uma troca assinada, mas o resultado deve ter a mesma aparência e comportamento de antes. Você precisará verificar se uma troca assinada está sendo devolvida corretamente através do [console DevTools](https://developers.google.com/web/tools/chrome-devtools/).

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

Sob a tab `Network`,clique no seu nome de domínio e verifique que `Signed HTTP exchange` aparece sob `Preview`.

#### Com o Cache de AMP do Google

Confirme que as trocas assinadas sejam compatíveis com o cache de AMP do Google. Isto está relacionado à sua capacidade de descoberta por mecanismos de busca como a Busca do Google.

Para testar as trocas assinadas no cache de AMP do Google, abra a aba Network no DevTools, ative `Preserve log` e visite uma URL como `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

O DevTools mostrará um `200` com uma linha `signed-exchange` e uma linha `from signed-exchange`, se a requisição teve sucesso.

Se não tiver êxito, as linhas de troca assinada não aparecem ou serão destacadas em vermelho. Um cabeçalho `warning` também poderá estar presente, fornecendo informações adicionais.

## Trocas assinadas na Busca do Google

Se suas páginas AMP foram distribuídas com sucesso como trocas assinadas, os resultados da pesquisa exibirão ícone de raio AMP, como antes, mas tocar nos resultados mostrará `https://example.com` na barra da URL, em vez de uma URL começando com `https://www.google.com/amp/….`. Além disso, a barra `viewer` não vai aparecer.

No console do DevTools, sob a tab `network` você verá `signed-exchange` abaixo da coluna `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Provedores de serviço de troca assinada

Aqui está uma lista de CDNs e provedores de hospedagem que suportam trocas assinadas. Usar um deles é a maneira mais fácil de começar com trocas assinadas:

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) O [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) é uma ferramenta para melhorar as URLs do AMP ao servir AMP usando Trocas Assinadas. Leia mais no [Blog do AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) é uma das maiores redes do mundo. Hoje, empresas, organizações sem fins lucrativos, blogueiros e qualquer pessoa com presença na Internet usufruem de sites e aplicativos mais rápidos e seguros graças ao Cloudflare.
