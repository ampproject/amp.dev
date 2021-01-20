---
"$title": Usando o Visualizador AMP para renderizar e-mails
"$order": '5'
author: alabiaga
formats:
- email
---

Clientes de E-mail que buscam oferecer suporte ao AMP para e-mail devem usar o [Visualizador AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) para hospedar os e-mails AMP dos seus remetentes. Um visualizador construído com a [biblioteca do Visualizador AMP](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration)  encapsula um documento AMP e habilita [capacidades](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/CAPABILITIES.md) que viabilizam a comunicação bidirecional com o documento AMP através de postMessage. Essas capacidades incluem a concessão do controle da visibilidade do e-mail, a retransmissão de métricas de usuário e formas de garantir a segurança das solicitações XHR realizadas a partir do e-mail.

## Intercepção XHR pelo visualizador

A capacidade `xhrInterceptor` da biblioteca do Visualizador AMP permite ao visualizador interceptar solicitações XHR de saída. O visualizador AMP pode analisar um pedido quanto à sua validade e intenção para garantir a proteção e privacidade dos seus usuários.

#### Solicitações XHR

Componentes AMP tais como [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) e [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) requerem chamadas a endpoints para postar ou recuperar dados. Estas chamadas são classificadas como solicitações XHR.

#### Comunicação entre o visualizador e documento AMP

O protocolo usado para a comunicação entre o visualizador e o documento AMP é realizado via [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). Segue um exemplo trivial do uso de postMessage no caso de uso de interceptação XHR, onde o visualizador processa a postMessage xhr enviada a partir de um documento AMP e retorna uma resposta personalizada.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
   const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {type: 'application/json'});
   const response = new Reponse(blob, {status: 200});
   return response;
};
```

### Ativação da interceptação XHR

Habilite a intercepção do xhr configurando o visualizador para a capacidade xhrInterceptor durante a inicialização. Veja o exemplo do visualizador sobre como isto é feito e também para um exemplo de intercepção xhr. O documento AMP deve então ser configurado para permitir a intercepção XHR. Os documentos são configurados adicionando o atributo `allow-xhr-interception` à tag `<html amp4email>`. O cliente de e-mail deve configurar este atributo no documento AMP antes de renderizá-lo já que é intencionalmente um atributo inválido e será sinalizado como tal durante a validação do documento AMP.

```html
<!doctype html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Renderização do modelo para o visualizador no lado do servidor

A capacidade `viewerRenderTemplate` permite ao visualizador gerenciar a renderização com [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) e [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). Com isto habilitado, o runtime AMP intermedeia uma solicitação contendo a chamada XHR original, dados do modelo e quaisquer outros detalhes necessários para renderizar o conteúdo do componente para o visualizador. Isto permite ao visualizador analisar o conteúdo de dados do endpoint e gerenciar a renderização [mustache](https://mustache.github.io/) dos modelos para verificar e limpar os dados. Observe que se esta capacidade for ativada nos componentes amp-form e amp-list juntamente com o xhrInterceptor, a capacidade `viewerRenderTemplate` que também intermedeia solicitações ao visualizador irá se sobrepor à do xhrInterceptor.

O exemplo [viewer.html](https://github.com/ampproject/amphtml/blob/master/examples/viewer.html)  mostra como é possível processar a mensagem `viewerRenderTemplate` enviada a partir do documento AMP. Nesse exemplo, o Viewer.prototype.processRequest_ captura a mensagem `viewerRenderTemplate` e com base no tipo de componente amp disponível na solicitação, envia de volta o html para ser renderizado no seguinte formato JSON.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) => Promise.resolve({
  "html":
    "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>"
      + "<div class='product' role='listitem'>Apple</div>"
      + "</div>",
  "body" : "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
});
```

Este é um exemplo trivial onde não há dependência de biblioteca [mustache](https://mustache.github.io/) ou limpeza do conteúdo.

O diagrama abaixo mostra um exemplo mais próximo do mundo real sobre como um documento AMP dentro de um visualizador de cliente de e-mail com capacidade `viewerRenderTemplate` poderia realizar a renderização do modelo [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

O runtime AMP iria intermediar a solicitação de obtenção de dados do componente [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) para o visualizador, que por sua vez iria encaminhar essa solicitação para um servidor cliente de e-mail. O servidor iria alimentar esta URL e os resultados da busca da URL através de vários serviços, possivelmente inspecionando a validade da URL, o conteúdo dos dados retornados a partir dessa URL e renderizar os modelos [mustache](https://mustache.github.io/) com esses dados. Ele então retornaria o modelo renderizado e o enviaria de volta ao visualizador no seguinte formato de resposta JSON.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
}
```

O valor html no payload JSON será o código que será injetado no documento AMP para renderização.

A tabela abaixo descreve as capacidades e os componentes afetados:

<table>
  <thead>
    <tr>
      <th width="30%">Capacidade do visualizador</th>
      <th>Componentes afetados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
