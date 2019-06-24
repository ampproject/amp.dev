---
$title: AMP for Email Viewer 
$order: 1
author: alabiaga
formats:
  - email
---

Email clients looking to support AMP for Email should implement a viewer to host their sender’s AMP emails. A viewer built with the AMP viewer library encapsulates an AMP document and enables capabilities that allow for bidirectional communication with the AMP document via postMessage. These capabilities include granting control of the email’s visibility, relaying of user metrics, and providing means of ensuring the safety of XHR requests made from the email.

## Viewer XHR interception

The AMP viewer library’s xhrInterceptor capability allows for the viewer to intercept outgoing XHR requests. The AMP viewer can introspect a request for its validity and intent to ensure the protection and privacy of it users.

#### XHR requests
AMP components such [`<amp-list>`](https://amp.dev/documentation/components/amp-list.html?format=email) and [`<amp-form>`](https://amp.dev/documentation/components/amp-form.html?format=email), require calls to endpoints to post or retrieve  data. These calls classify as XHR requests.

### Enabling XHR intercepting

Enable xhr intercepting by opting the viewer into the xhrInterceptor capability on initialization. Please see the viewer example on how this is done and for an example on xhr intercepting. The AMP document must then opt in to allowing XHR interception. Documents opt in by adding the allow-xhr-interception attribute to the <html amp4email> tag. The email client must set this attribute on the AMP document prior to rendering it as it is intentionally an invalid attribute and will be flagged as so in the during AMP doc validation.


```html
<!doctype html>
<html ⚡4email allow-xhr-interception>
  ...    
</html>
```

## Viewer server side template rendering

The viewerRenderTemplate capability allows the viewer to manage [`<amp-list>`](https://amp.dev/documentation/components/amp-list.html?format=email) and [`<amp-form>`](https://amp.dev/documentation/components/amp-form.html?format=email) template  rendering. With this enabled, the AMP runtime proxies a request containing the original XHR call, template data, and any other details required for rendering the component contents to the viewer.  This allows the viewer to introspect the endpoint data content and manage the mustache rendering of the templates to verify and sanitize the data. Note that if this capability is enabled along with the xhrInterceptor, in the amp-form and amp-list component, the viewerRenderTemplate capability which also proxies requests to the viewer will trump that of the xhrInterceptor.

The viewer.html example shows how one might handle the viewerRenderTemplate message sent from the AMP doc. In that example, the Viewer.prototype.processRequest_ catches the viewerRenderTemplate message and based on the amp component type available in the request, sends back the html to be rendered in the following JSON format.

```
Viewer.prototype.ssrRenderAmpListTemplate_ = function(data) {
return Promise.resolve({
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
     }
```

This is a trivial example where there is no mustache library dependency or sanitization of the content.

The diagram below illustrates a more real world example of how an AMP document in an email client viewer with a viewerRenderTemplate capability could handle the rendering of the  amp-list template.


The AMP runtime would proxy the [`<amp-list>`](https://amp.dev/documentation/components/amp-list.html?format=email) component data fetch request to the viewer, which in turn would forward this request to an email client server. The server would feed this URL and results of the URL fetch through various services, possibly inspecting the URL validity, the contents of the data returned from that URL and render the mustache templates with that data. It would then return that rendered template and send it back to the viewer in the following JSON response format.

```
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>"
+ "<div class='product' role='listitem'>List item 1</div>"
+ "<div class='product' role='listitem'>List item 2</div>",
+ "</div>",
"body" : "",
       "init" : {
         "headers": {
           "Content-Type": "application/json",
         }
  }
}
```
The html value in the JSON payload will be what is injected into the AMP document for rendering.

### Viewer and AMP document communication

The protocol used for communication between the viewer and AMP doc is achieved via postMessage.  The following is a trivial example of postMessage at work in the XHR intercepting use case, where the a viewer handles the xhr postMessage sent from an AMP doc and returns a custom response.

```
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = xhrRequestIntercepted => {
   const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {type: 'application/json'});
   const response = new Reponse(blob, {status: 200});
   return response;
};
```
