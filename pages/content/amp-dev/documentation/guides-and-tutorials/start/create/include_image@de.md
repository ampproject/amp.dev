---
"$title": Include an image
"$order": '2'
description: Die meisten HTML Tags können direkt in AMP HTML verwendet werden, aber bestimmte Tags wie z. B. <img> werden durch äquivalente oder leicht verbesserte …
author: pbakaus
contributors:
- bpaduch
---

Die meisten HTML Tags können direkt in AMP HTML verwendet werden, aber bestimmte Tags wie z. B. `<img>` werden durch äquivalente oder leicht verbesserte benutzerdefinierte AMP HTML Tags ersetzt (einige problematische Tags sind vollständig untersagt, siehe [HTML Tags in der Spezifikation](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#html-tags)).

To demonstrate what additional markup could look like, here’s the code required to embed an image into the page:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **READ ON –** To learn why we’re replacing tags like `<img>` with [`<amp-img>`](../../../../documentation/components/reference/amp-img.md), and how many are available, visit [Include Images & Video](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md). [/tip]
