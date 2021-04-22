---
'$title': Używanie środowiska AMP Viewer do renderowania wiadomości e-mail
$order: 5
author: alabiaga
formats:
  - email
---

Programy pocztowe w celu obsługi AMP dla poczty e-mail powinny używać środowiska [AMP Viewer](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) do hostowania wiadomości e-mail AMP nadawcy. Przeglądarka utworzona przy użyciu [biblioteki AMP Viewer](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration) hermetyzuje dokument AMP i zapewnia [funkcje](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md) umożliwiające dwukierunkową komunikację z dokumentem AMP za pomocą metody postMessage. Funkcje te umożliwiają kontrolę widoczności poczty elektronicznej, przekazywanie metryk użytkownika oraz zapewnienie środków chroniących bezpieczeństwo żądań XHR wysyłanych z poczty elektronicznej.

## Przechwytywanie żądań XHR przez przeglądarkę

Funkcja `xhrInterceptor` z biblioteki AMP Viewer umożliwia przechwytywanie wychodzących żądań XHR. AMP Viewer może sprawdzić prawidłowość żądania i celu zapewnienia ochrony i prywatności użytkowników.

#### Żądania XHR

Składniki AMP takie jak [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) i [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) wymagają wywołań do punktów końcowych w celu przesłania lub pobrania danych. Wywołania te klasyfikuje się jako żądania XHR.

#### Komunikacja z przeglądarką i dokumentami AMP

Protokół używany do komunikacji między przeglądarką a dokumentem AMP jest osiągany za pomocą metody [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). Poniżej znajduje się prosty przykład roboczy zastosowania metody postMessage do przechwytywania żądań XHR, w którym przeglądarka za pomocą metody postMessage obsługuje żądanie xhr wysyłane z dokumentu AMP i zwraca odpowiedź niestandardową.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
  const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {
    type: 'application/json',
  });
  const response = new Reponse(blob, {status: 200});
  return response;
};
```

### Włączanie przechwytywania żądań XHR

Włączyć przechwytywanie xhr, wybierając przy inicjowaniu przeglądarki funkcję xhrInterceptor. Zobacz przykład wykonywania tego w przeglądarce i przykład przechwytywania xhr. Następnie dokument AMP musi wybrać opcję zezwolenia na przechwytywanie XHR. Dokumenty włączają ją poprzez dodanie atrybutu `allow-xhr-interception` do znacznika `<html amp4email>`. Program pocztowy musi ustawić ten atrybut w dokumencie AMP przed jego wyrenderowaniem, ponieważ jest to celowo nieprawidłowy atrybut i zostanie on oflagowany jak podczas walidacji dokumentu AMP.

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Renderowanie szablonu po stronie serwera przeglądarki

Funkcja `viewerRenderTemplate` pozwala na zarządzanie renderowaniem szablonów [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) oraz [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). Gdy jest włączona, środowisko uruchomieniowe AMP buforuje żądanie zawierające oryginalne wywołanie XHR, dane szablonu i wszelkie inne szczegóły wymagane do wyrenderowania zawartości składnika w przeglądarce. Pozwala to przeglądarce na zapoznanie się z zawartością danych punktu końcowego i zarządzanie renderowaniem [mustache](https://mustache.github.io/) szablonów w celu zweryfikowania i oczyszczenia danych. Zwróć uwagę, że jeżeli ta funkcja jest włączona wraz z xhrInterceptor, w składniku amp-form i amp-list funkcja `viewerRenderTemplate`, która również buforuje żądania do przeglądarki, będzie mieć pierwszeństwo przed funkcją xhrInterceptor.

Przykład [viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) pokazuje, jak można obsługiwać komunikat `viewerRenderTemplate` wysłany z dokumentu AMP. W tym przykładzie plik Viewer.prototype.processRequest\_ przechwytuje komunikat `viewerRenderTemplate` i w zależności od typu składnika amp dostępnego w żądaniu odsyła html do wyrenderowania w następującym formacie JSON.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) =>
  Promise.resolve({
    'html':
      "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>" +
      "<div class='product' role='listitem'>Apple</div>" +
      '</div>',
    'body': '',
    'init': {
      'headers': {
        'Content-Type': 'application/json',
      },
    },
  });
```

Jest to prosty przykład, w którym nie ma zależności od biblioteki [mustache](https://mustache.github.io/) ani oczyszczania zawartości.

Poniższa tabela przedstawia bardziej praktyczny przykład tego, jak dokument AMP w przeglądarce programu pocztowego z funkcją `viewerRenderTemplate` mógłby obsłużyć renderowanie szablonu [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

Środowisko uruchomieniowe AMP buforuje żądanie pobrania danych składnika [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) do przeglądarki, która z kolei przekaże to żądanie do serwera programu pocztowego. Serwer przekaże ten adres URL i wyniki pobrania danych z adresu URL poprzez różne usługi, prawdopodobnie sprawdzając poprawność adresu URL, zawartość danych zwróconych z tego adresu i wyrenderuje szablony [mustache](https://mustache.github.io/) przy użyciu tych danych. Następnie zwróci ów wyrenderowany szablon i prześle go z powrotem do przeglądarki w następującym formacie odpowiedzi JSON.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init": {
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

Tym, co zostanie wstrzyknięte do dokumentu AMP w celu wyrenderowania, będzie wartość html w ładunku JSON.

Poniższa tabela przedstawia funkcje i związane z nimi składniki:

<table>
  <thead>
    <tr>
      <th width="30%">Funkcja przeglądarki</th>
      <th>Powiązane składniki.</th>
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
