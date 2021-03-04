---
'$title': Depuração de problemas de cache do AMP
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: Por que meu documento está corrompido no cache AMP?
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Por que meu documento está corrompido no cache AMP? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Documentos AMP válidos geralmente aparecem e se comportam da mesma forma tanto nos caches de AMP como na origem. No entanto, existem alguns componentes e configurações de servidor que podem ser problemáticos.

Se um documento específico aparecer e se comportar conforme o esperado em sua origem, mas não quando visualizado através do cache ([como mapear URLs de origem ao cache do Google AMP](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), experimente o seguinte:

1. Abra o console das ferramentas de erro/desenvolvedor do seu navegador e resolva quaisquer erros ou advertências que aparecerem.
2. Execute o documento através da [AMPBench](https://search.google.com/test/amp) resolva quaisquer erros ou advertências que aparecerem.

Se você ainda tiver problemas após seguir estas etapas, verifique a tabela abaixo.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Sintoma</th>
      <th width="30%">Problema</th>
      <th width="40%">Solução</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>As fontes da Web não aparecem (são usadas fontes de reserva)</td>
      <td>O Cache AMP não aparece na lista de sites liberados (allowlist) pelo provedor de fontes.</td>
      <td>Entre em contato com o provedor de fontes solicite que sejam liberados <a href="amp-cors-requests.md#cors-security-in-amp">todos os caches</a>.</td>
    </tr>
    <tr>
      <td>Os ativos (por exemplo, fontes e imagens) não aparecem (<strong>apenas origens HTTP</strong>)</td>
      <td>O documento usa URLs relativas ao protocolo.</td>
      <td>Troque por URLs absolutas (ou seja,<code>http://www.site.com/doc/amp</code>, não <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Os ativos (por exemplo, fontes e imagens) não aparecem</td>
      <td>Os ativos são servidos com o componente MIME incorreto.</td>
      <td>Indique um <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">componente MIME aceito</a>.</td>
    </tr>
    <tr>
      <td>O cache do AMP não pode acessar os ativos.</td>
      <td>Verifique se o AMP Cache pode acessar seus ativos e se não está bloqueado por um endereço IP ou cliente, etc.(<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Lista de clientes usados pelo crawler do Google</a>).</td>
    </tr>
    <tr>
      <td>Elementos dinâmicos tais como <code><amp-form></amp-form></code>, <code><amp-list></amp-list></code>, não se comportam como esperado.</td>
      <td>Cabeçalhos CORS com erro ou ausentes.</td>
      <td>Esses componentes fazem solicitações cross-origin do AMP Cache até sua origem. Por default, os navegadores bloqueiam essas solicitações. Para permitir essas requisições, emita <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">cabeçalhos CORS</a> que liberem <a href="amp-cors-requests.md">todos os caches</a>.</td>
    </tr>
    <tr>
      <td>Está sendo servido conteúdo que deve ser removido devido a um aviso legal de remoção.</td>
      <td>O AMP Cache ainda não acessou a remoção.</td>
      <td>Siga as diretrizes para  para atualizar o conteúdo de cada cache de AMP. Para o cache de AMP do Googler, veja <a href="https://developers.google.com/amp/cache/update-cache">Update AMP Content</a>.</td>
    </tr>
</tbody>
</table>

</table>
