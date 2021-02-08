---
'$title': Verwendung des AMP Viewers zum Rendern von E-Mails
$order: 5
author: alabiaga
formats:
  - email
---

E-Mail Clients, die AMP für E-Mail unterstützen möchten, sollten den [AMP Viewer](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) verwenden, um die AMP E-Mails ihres Absenders zu hosten. Ein Viewer, der mit der [AMP Viewer Bibliothek](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration) erstellt wurde, kapselt ein AMP Dokument ein und bietet [Funktionen](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/CAPABILITIES.md), die via postMessage eine bidirektionale Kommunikation mit dem AMP Dokument ermöglichen. Diese Funktionen ermöglichen es, die Kontrolle über die E-Mail Sichtbarkeit zu gewähren, Benutzermetriken weiterzugeben und Methoden bereitzustellen, mit denen die Sicherheit der von der E-Mail ausgehenden XHR Anforderungen gewährleistet wird.

## XHR Abfangfunktion des Viewers

Die Funktion `xhrInterceptor` der AMP Viewer Bibliothek erlaubt dem Viewer, ausgehende XHR Anforderungen abzufangen. Der AMP Viewer kann eine Anforderung auf ihre Gültigkeit und ihren Zweck prüfen, um den Schutz und die Privatsphäre seiner Benutzer zu gewährleisten.

#### XHR Anforderungen

AMP Komponenten wie [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) und [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) erfordern Aufrufe an Endpoints, um Daten zu veröffentlichen oder abzurufen. Diese Aufrufe werden als XHR Anforderungen klassifiziert.

#### Kommunikation zwischen Viewer und AMP Dokument

Das Protokoll für die Kommunikation zwischen dem Viewer und dem AMP Dokument wird über [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) realisiert. Es folgt ein einfaches Beispiel für postMessage zum Abfangen von XHR: Der Viewer verarbeitet die von einem AMP Dokument gesendete xhr postMessage und gibt eine benutzerdefinierte Antwort zurück.

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

### XHR Abfangfunktion aktivieren

Aktiviere das Abfangen von xhr, indem du bei der Initialisierung den Viewer für die Funktion xhrInterceptor aktivierst. Wie das funktioniert, siehst du im Viewer Beispiel und im Beispiel für das Abfangen von xhr. Dann muss das AMP Dokument die XHR Interception zulassen. Die Funktion wird für Dokumente aktiviert, indem das Attribut `allow-xhr-interception` zum Tag `<html amp4email>` hinzugefügt wird. Der E-Mail Client muss dieses Attribut vor dem Rendern im AMP Dokument festlegen, da es bewusst ein ungültiges Attribut ist und bei der Validierung des AMP Dokuments als solches markiert wird.

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Rendern serverseitiger Templates durch den Viewer

Mit der Funktion `viewerRenderTemplate` kann der Viewer das Rendern der Templates [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) und [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) verwalten. Ist diese Option aktiviert, so leitet die AMP Runtime eine Anforderung an den Viewer weiter, die den ursprünglichen XHR Aufruf, Template Daten und andere Details enthält, die zum Rendern des Komponenteninhalts erforderlich sind. Dadurch kann der Viewer den Inhalt der Endpoint Daten überprüfen und das [mustache](https://mustache.github.io/) Rendering der Templates verwalten, um die Daten zu verifizieren und zu bereinigen. Wichtig: Wenn diese Funktion zusammen mit xhrInterceptor in der Komponente amp-form und amp-list aktiviert ist, dominiert die Funktion `viewerRenderTemplate`, die ebenfalls Anforderungen an den Viewer weiterleitet, gegenüber der Funktion von xhrInterceptor.

Das Beispiel [viewer.html](https://github.com/ampproject/amphtml/blob/master/examples/viewer.html) zeigt, wie die vom AMP Dokument gesendete Nachricht `viewerRenderTemplate` verarbeitet werden kann. In diesem Beispiel fängt Viewer.prototype.processRequest\_ die Nachricht `viewerRenderTemplate` ab und sendet das zu rendernde HTML im folgenden JSON Format zurück, wobei der in der Anforderung angegebene AMP Komponententyp berücksichtigt wird.

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

In diesem trivialen Beispiel gibt es keine Abhängigkeit der [mustache](https://mustache.github.io/) Bibliothek und keine Inhaltsbereinigung.

Das folgende Diagramm zeigt ein realistischeres Beispiel dafür, wie ein AMP Dokument in einem E-Mail Client Viewer mit der Funktion `viewerRenderTemplate` das Rendern des Templates [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) handhaben kann.

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

Die AMP Runtime leitet die Anforderung zum Abrufen von [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) Komponentendaten an den Viewer weiter, der diese Anforderung wiederum an einen E-Mail Client Server weiterleitet. Der Server speist diese URL und die Ergebnisse des URL Abrufs über verschiedene Dienste ein, überprüft eventuell die Gültigkeit der URL und den Inhalt der von dieser URL zurückgegebenen Daten und rendert die [mustache](https://mustache.github.io/) Templates mit diesen Daten. Dieses gerenderte Template wird dann zurückgegeben und im folgenden JSON Antwortformat an den Viewer zurückgesendet.

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

Der HTML Wert im JSON Payload wird zum Rendern in das AMP Dokument eingefügt.

Die folgende Tabelle enthält die Funktionen und die betroffenen Komponenten:

<table>
  <thead>
    <tr>
      <th width="30%">Viewer Funktion</th>
      <th>Betroffene Komponenten</th>
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
