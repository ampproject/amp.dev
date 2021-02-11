---
'$title': Formato da URL do Cache do AMP e tratamento de solicitações
$order: 9
toc: 'false'
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

Neste documento, você aprenderá sobre o formato da URL do Cache do AMP e como ele lida com solicitações.

## Formato da URL

Quando possível, o Cache do Google AMP criará um subdomínio para cada domínio de documento AMP, inicialmente convertendo-o do formato [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) para UTF-8. Os caches substituem cada `-` (traço) por `--` (2 traços) e substituem cada `.`(ponto) por `-` (traço). Por exemplo, `pub.com` será mapeado a `pub-com.cdn.ampproject.org`.

Você pode usar esta calculadora de URL para converter uma URL na versão usada no cache do AMP:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Use o módulo [Node.js](https://nodejs.org) da [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) para traduzir uma URL da origem para o formato de URL do Cache do AMP.[/tip]

Este documento descreve:

- A estrutura da URL em um cache do AMP.
- Como prever o formato das suas URLs em um cache do AMP.
- Como fazer decodificação reversa sobre um Cabeçalho Origin no Cache do AMP para determinar qual era o domínio original do editor.

## Protocolo do nome de domínio

Todos os documentos usam o protocolo https nos caches do AMP.

## Sufixo do nome de domínio

Todos os caches do AMP são registrados em um arquivo JSON, encontrado on-line no [repositório AMPHTML](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). Abaixo está mostrado um exemplo do registro de cache nesse arquivo:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Um Cache do AMP serve registros no domínio especificado por `cacheDomain`. Neste caso, o domínio é `cdn.ampproject.org`.

Este documento usa URLs contendo `cdn.ampproject.org` a título de exemplo, mas outros caches típicos usam uma estrutura de URL semelhante.

## Prefixo do nome de domínio

Um cache do AMP serve documentos em uma URL alterada, como por exemplo `example-com.cdn.ampproject.org`. O primeiro componente com ponto, do nome de domínio original, no exemplo, `example.com`, torna-se `example-com`. Este documento define o string sem pontos `example-com`, como o "prefixo de domínio". Veja abaixo o algoritmo que realiza essa transformação.

Este prefixo não contém múltiplos componentes com pontos, como `example.com.cdn.ampproject.org`, devido à restrições impostas pelos certificados https (TLS), [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

Os domínios pertencentes ao editor podem ter até 255 caracteres, enquanto cada prefixo de domínio é limitado a 63 caracteres, conforme a [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) que diz o seguinte:

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

Todos os domínios do editor são mapeados a um prefixo de domínio exclusivo. O algoritmo para fazer essa transformação tenta deixar o mapeamento legível por humanos, no entanto, o mapeamento será revertido para um formato de hash seguro para os domínios do editor, caso forem longos demais ou se encaixarem nas situações detalhadas abaixo:

### Algoritmo básico

O algoritmo básico para converter um domínio de editor em prefixo de domínio é o seguinte:

1. Decodifique o domínio do editor com Punycode. Veja [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Substitua qualquer "`-`" (hífen) na saída do primeiro passo por "`--`" (dois hífens).
3. Substitua qualquer "`.`" (ponto) na saída do segundo passo por "`-`" (hífen).
4. Se a saída do terceiro passo contiver "`-`" (hífen) nas posições 3 e 4, então acrescente um prefixo de "`0-`" e um sufixo de "`-0`" para a saída do terceiro passo. Veja detalhes em [#26205](https://github.com/ampproject/amphtml/issues/26205).
5. Codifique a saída do terceiro passo com Punycode. Veja [RFC 3492](https://tools.ietf.org/html/rfc3492)

Alguns exemplos do algoritmo básico:

<table>
  <tr>
   <td>
<strong>Domínio do editor</strong>
   </td>
   <td>
<strong>Prefixo do domínio</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Depois de executar o algoritmo básico, se e somente se o prefixo do domínio não for um rótulo DNS válido, executamos o Algoritmo de Reserva descrito abaixo.

Um prefixo de domínio não será considerado um rótulo DNS válido se contiver mais de 63 caracteres

### Algoritmo de reserva

O algoritmo de reserva para converter um domínio do editor em um prefixo de domínio é o seguinte:

1. Gere um hash do domínio do editor usando SHA256.
2. Escape a saída do primeiro passo usando Base32.
3. Remova os últimos quatro caracteres da saída do segundo passo, que sempre são caracteres `=` (igual).

O algoritmo de reserva produzirá uma sequência de 52 caracteres, como a seguinte, sem `-` (hífen): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Algoritmo combinado

O algoritmo combinado é:

1. Execute o algoritmo básico. Se a saída for um rótulo DNS válido, anexe o sufixo do domínio do Cache e retorne, por exemplo `example-com.cdn.ampproject.org`. Caso contrário, prossiga para o segundo passo.
2. Execute o algoritmo de reserva. Anexe o sufixo de domínio do cache e retorne, por exemplo:`v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## Caminho da URL

O "caminho" (path) de uma URL no Cache AMP é sempre composto por um ou mais diretórios de prefixo, tais como `/c`, seguido por um infixo `/s` somente se a URL do editor for http `s`, seguida pela URL do documento do editor sem o protocolo.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

Os diretórios de prefixo, como `/c`, correspondem a diferentes tipos de serviço que um Cache do AMP pode executar. Diferentes Caches do AMP podem oferecer suporte a diferentes tipos de serviço, e esta não é uma lista completa:

- `/c` - <strong>C</strong>ontent (Conteúdo): Este é um documento AMP servido como uma página standalone, que pode receber um link direto em algumas interfaces.
- `/v` - <strong>V</strong>iewer: Este também é um documento AMP, mas é servido em um [AMP Viewer](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) que é um ambiente de frame que exibe um documento AMP no contexto de uma Página de Resultados de Busca ou outra interface.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage: Este é um documento AMP servido como [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), uma tecnologia de Web Package. Essas URLs atuam como redirecionamentos para a origem do próprio editor.
- `/cert` - <strong>Cert</strong>ificate (Certificado): Este é um certificado público para uso com um [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
- `/i` - <strong>I</strong>mage (Imagem): Esta é uma imagem exibida pelo cache AMP, normalmente como sub-recurso do documento.
- `/ii` - <strong>I</strong>mage (Imagem): Essa também é uma imagem exibida pelo cache do AMP, mas é geralmente combinada com outros parâmetros de configuração de cache, tais como `/ii/w800` que indica uma largura máxima que o documento está solicitando. O cache pode produzir imagens em escalas diferentes para economizar largura de banda para o navegador.

Além disso, os Caches do AMP podem preferir anexar parâmetros de consulta especiais à URL do documento que não fazem parte da query do documento do editor. Por exemplo, [`<amp-live-list>`](../../../components/reference/amp-live-list.md) realiza solicitações de atualização ao buscar um documento com o parâmetro `amp_latest_update_time<`. Esses parâmetros não são transmitidos para a origem quando o documento é rastreado, mas estão sempre presentes para configurar a solicitação no Cache AMP.

## Origens CORS

Muitos editores usam as solicitações CORS do seu documento AMP para recuperar dados adicionais. As solicitações CORS funcionam enviando um cabeçalho HTTP `Origin:` na solicitação, especificando a origem do documento que está fazendo a solicitação. Como visto acima, a origem do documento é diferente em um cache do AMP e no documento original. Nas seções de nome de domínio mostradas acima, você pode encontrar o algoritmo para determinar a Origem de uma URL de Cache do AMP, a partir de uma URL do editor. Abaixo descrevemos o algoritmo reverso para decodificar um cabeçalho de solicitação CORS `Origin:` de volta ao domínio original do editor.

### Do Origin de um Cache do AMP ao domínio do editor

Um valor do cabeçalho Origin em um Cache do AMP será similar a um dos exemplos a seguir:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

Primeiro, remova o prefixo do protocolo (`https://`) e o sufixo do domínio do Cache do AMP, como `.cdn.ampproject.org`. O sufixo pode ser de qualquer um dos caches listados em [caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). A string restante será o "prefixo de domínio". No caso dos dois exemplos acima, o "prefixo de domínio" será:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Em seguida, verifique se o "prefixo do domínio" contém pelo menos um ‘`-`’ (hífen). Conter um ou mais hífens é o caso mais comum. Se o "prefixo de domínio" não contiver pelo menos um ‘`-`’ (hífen), a Origin do Cache AMP não poderá ser revertida diretamente. Alternativamente, se você conhece o conjunto de domínios possíveis do editor, você poderá criar o conjunto de Origins do Cache do AMP usando o algoritmo de Nome de Domínio descrito acima. Você poderá, então, realizar a validação em relação ao esse conjunto fixo.

O restante do algoritmo pressupõe que o "prefixo de domínio" contenha pelo menos um ‘`-`’ (hífen).

1. Se o prefixo do domínio começar com `xn--`, use punycode para decodificar o “prefixo de domínio”. Por exemplo, `xn---com-p33b41770a` torna-se ` ⚡😊-com`. Veja mais sobre o protocolo Punycode em [RFC 3492](https://tools.ietf.org/html/rfc3492).
2. Se o prefixo começar com "`0-`" e terminar com "`-0`", remova tanto o prefixo "`0-`" como o sufixo "-0".
3. Faça uma iteração pelos caracteres produzidos no segundo passo em ordem, emitindo-os à medida em que forem encontrados. Quando você encontrar um "`-`" (hífen), leia o caractere seguinte. Se o caractere a seguir também for um "`-`" (hífen), pule os dois caracteres da entrada e emita um único "`-`" (hífen). Se o caractere seguinte for qualquer outro caractere, pule apenas o único "`-`" (hífen) atual e emita um "`.`" (ponto). Por exemplo, `a--b-example-com` torna-se `a-b.example.com`.
4. Codifique o resultado do terceiro passo com Punycodee. Veja [RFC 3492](https://tools.ietf.org/html/rfc3492).

O resultado do quarto passo será o Domínio do Editor. Não é possível obter o protocolo do próprio domínio, mas ou é `http` ou `https`. O valor da porta é sempre o default para o protocolo correspondente.

## Redirecionamento e tratamento de erros

Eis alguns exemplos de como o Cache do AMP lida com redirecionamentos e erros:

**Redirecionamentos**

O Cache do AMP segue os redirecionamentos quando resolve as URLs AMP. Por exemplo, se uma URL redirecionar para outra URL AMP:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Então o Cache do AMP devolverá o conteúdo do redirecionamento resolvido para a URL original.

Exemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Importante: Se você alterar a localização dos arquivos AMP no seu servidor, certifique-se de configurar um redirecionamento da localização antiga para a nova.

**Página não encontrada**

Quando uma página não é encontrada no Cache do AMP, ele mostrará uma página de erro e retornará o status 404.

Exemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**AMP inválido**

Quando o conteúdo uma página for AMP inválido, o Cache do AMP irá redirecionar para a página canônica.

Exemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Erros de servidor**

Se uma URL retornar erros 5XX do servidor, o Cache do AMP retornará um status 404.

Exemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
