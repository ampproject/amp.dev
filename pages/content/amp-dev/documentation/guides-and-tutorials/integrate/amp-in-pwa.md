---
$title: Use AMP as a data source for your PWA
$order: 1
description: If you've invested in AMP but haven't built a Progressive Web App yet, your AMP Pages can dramatically simplify your development of your Progressive Web App.
formats:
  - websites
author: pbakaus
---

If you've invested in AMP but haven't built a Progressive Web App yet, your AMP Pages can dramatically simplify your development of your Progressive Web App. In this guide you'll learn how to consume AMP within your Progressive Web App and use your existing AMP Pages as a data source.

## From JSON to AMP

In the most common scenario, a Progressive Web App is a single page application that connects to a JSON API via Ajax. This JSON API then returns sets of data to drive the navigation, and the actual content to render the articles.

You would then proceed and convert the raw content into usable HTML and render it on the client. This process is costly and often hard to maintain. Instead, you can reuse your already existing AMP Pages as a content source. Best of all, AMP makes it trivial to do so in just a few lines of code.

##  Include "Shadow AMP" in your Progressive Web App

The first step is to include a special version of AMP we call “Shadow AMP” in your Progressive Web App. Yes, that’s right – you load the AMP library in the top level page, but it won’t actually control the top level content. It will only “amplify” the portions of our page that you tell it to.

Include Shadow AMP in the head of your page, like so:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### How do you know when the Shadow AMP API is ready to use?

We recommend you load the Shadow AMP library with the `async` attribute in place. That means, however, that you need to use a certain approach to understand when the library is fully loaded and ready to be used.

The right signal to observe is the availability of the global `AMP` variable, and Shadow AMP uses a “[asynchronous function loading approach](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)” to help with that. Consider this code:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

This code will work, and any number of callbacks added this way will indeed fire when AMP is available, but why?

This code translates to:

  1. “if window.AMP doesn't exist, create an empty array to take its position”
  1. "then push a callback function into the array that should be executed when AMP is ready"

It works because the Shadow AMP library, upon actual load, will realize there's already an array of callbacks under `window.AMP`, then process the entire queue. If you later execute the same function again, it will still work, as Shadow AMP replaces `window.AMP` with itself and a custom `push` method that simply fires the callback right away.

[tip type="tip"]
**TIP –** To make the above code sample practical, we recommend that you wrap it into a Promise, then always use said Promise before working with the AMP API. Look at our [React demo code](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) for an example.
[/tip]

## Handle navigation in your Progressive Web App

You’ll still need to implement this step manually. After all, it's up to you how you present links to content in your navigation concept. A number of lists? A bunch of cards?

In a common scenario, you’d fetch some JSON that returns ordered URLs with some metadata. In the end, you should end up with a function callback that fires when the user clicks on one of the links, and said callback should include the URL of the requested AMP page. If you have that, you’re all set for the final step.

## Use the Shadow AMP API to render a page inline

Finally, when you want to display content after a user action, it's time to fetch the relevant AMP document and let Shadow AMP take over. First, implement a function to fetch the page, similar to this one:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"]
**IMPORTANT –** To simplify the above code example, we skipped over error handling. You should always make sure to catch and handle errors gracefully.
[/tip]

Now that we have our ready-to-use `Document` object, it's time to let AMP take over and render it. Get a reference to the DOM element that serves as container for the AMP document, then call `AMP.attachShadowDoc()`, like so:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"]
**TIP –** Before you actually hand the document over to AMP, it's the perfect time to remove page elements that make sense when displaying the AMP page standalone, but not in embedded mode: For example, footers and headers.
[/tip]

And that's it! Your AMP page renders as a child of your overall Progressive Web App.

## Clean up after yourself

Chances are your user will navigate from AMP to AMP within your Progressive Web App. When discarding the previous rendered AMP Page, always make sure to tell AMP about it, like so:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

This will tell AMP that you're not using this document any longer and will free up memory and CPU overhead.

## See it in action

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

You can see the "AMP in PWA" pattern in action in the [React sample](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) we've built. It demonstrates smooth transitions during navigation and comes with a simple React component that wraps the above steps. It's the best of both worlds – flexible, custom JavaScript in the Progressive Web App, and AMP to drive the content.

* Grab the source code here: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
* Use the React component standalone via npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
* See it in action here: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (best on your phone or mobile emulation)

You can also see a sample of PWA and AMP using Polymer framework. The sample uses [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) to embed AMP pages.

* Grab the code here: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
* See it in action here: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
