---
$title: Using the AMP Viewer to render emails
$order: 5
author: alabiaga
formats:
  - email
---

Email clients looking to support AMP for Email should use the [AMP Viewer](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) to host their sender’s AMP emails. A viewer built with the [AMP Viewer library](https://github.com/ampproject/amphtml/tree/main/extensions/amp-viewer-integration) encapsulates an AMP document and enables [capabilities](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md) that allow for bidirectional communication with the AMP document via postMessage. These capabilities include granting control of the email’s visibility, relaying of user metrics, and providing means of ensuring the safety of XHR requests made from the email.

## Viewer XHR interception

The AMP Viewer library’s `xhrInterceptor` capability allows for the viewer to intercept outgoing XHR requests. The AMP Viewer can introspect a request for its validity and intent to ensure the protection and privacy of it users.

#### XHR requests
AMP components such [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) and [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email), require calls to endpoints to post or retrieve  data. These calls classify as XHR requests.

#### Viewer and AMP document communication

The protocol used for communication between the viewer and AMP doc is achieved via [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).  The following is a trivial example of postMessage at work in the XHR intercepting use case, where the a viewer handles the xhr postMessage sent from an AMP doc and returns a custom response.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
   const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {type: 'application/json'});
   const response = new Reponse(blob, {status: 200});
   return response;
};
```

### Enabling XHR intercepting

Enable xhr intercepting by opting the viewer into the xhrInterceptor capability on initialization. Please see the viewer example on how this is done and for an example on xhr intercepting. The AMP document must then opt in to allowing XHR interception. Documents opt in by adding the `allow-xhr-interception` attribute to the `<html amp4email>` tag. The email client must set this attribute on the AMP document prior to rendering it as it is intentionally an invalid attribute and will be flagged as so in the during AMP doc validation.


```html
<!doctype html>
<html ⚡4email allow-xhr-interception>
  ...    
</html>
```

## Viewer server side template rendering

The `viewerRenderTemplate` capability allows the viewer to manage [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) and [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) template  rendering. With this enabled, the AMP runtime proxies a request containing the original XHR call, template data, and any other details required for rendering the component contents to the viewer.  This allows the viewer to introspect the endpoint data content and manage the [mustache](https://mustache.github.io/) rendering of the templates to verify and sanitize the data. Note that if this capability is enabled along with the xhrInterceptor, in the amp-form and amp-list component, the `viewerRenderTemplate` capability which also proxies requests to the viewer will trump that of the xhrInterceptor.

The [viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) example shows how one might handle the `viewerRenderTemplate` message sent from the AMP doc. In that example, the Viewer.prototype.processRequest_ catches the `viewerRenderTemplate` message and based on the amp component type available in the request, sends back the html to be rendered in the following JSON format.

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

This is a trivial example where there is no [mustache](https://mustache.github.io/) library dependency or sanitization of the content.

The diagram below illustrates a more real world example of how an AMP document in an email client viewer with a `viewerRenderTemplate` capability could handle the rendering of the [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) template.

<amp-img alt="Viewer render template diagram"
    layout="responsive"
    width="372" height="279"
    src="/static/img/docs/viewer_render_template_diagram.png">
</amp-img>

The AMP runtime would proxy the [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) component data fetch request to the viewer, which in turn would forward this request to an email client server. The server would feed this URL and results of the URL fetch through various services, possibly inspecting the URL validity, the contents of the data returned from that URL and render the [mustache](https://mustache.github.io/) templates with that data. It would then return that rendered template and send it back to the viewer in the following JSON response format.

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

The html value in the JSON payload will be what is injected into the AMP document for rendering.

The table below outlines the capabilities and the affected components:

<table>
  <thead>
    <tr>
      <th width="30%">Viewer capability</th>
      <th>Affected components</th>
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
