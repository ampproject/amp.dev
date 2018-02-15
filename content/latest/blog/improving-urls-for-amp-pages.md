---
class: post-blog post-detail
type: Blog
$title: "Improving URLs for AMP pages"
id: improving-urls-for-amp-pages
author: amphtml
role: 
origin: "https://amphtml.wordpress.com/2018/01/09/improving-urls-for-amp-pages/amp/"
excerpt: "TL;DR: We are making changes to how AMP works in platforms such as Google Search that will enable linked pages to appear under publishers’ URLs instead of the google.com/amp URL space while maintaining the performance and privacy benefits of AMP Cache serving. When we first launched AMP in Google Search we made a big trade-off: [&#8230;]"
avatar: http://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2018-01-08T21:02:48-05:00
$date: January 8, 2018
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
inlineCSS: .amp-wp-inline-329fdb7771c10d07df9eb73273c95a60{font-weight:400;}
---

<div class="amp-wp-article-content">

		<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">TL;DR: We are making changes to how AMP works in platforms such as Google Search that will enable linked pages to appear under publishers’ URLs instead of the google.com/amp URL space while maintaining the performance and privacy benefits of AMP Cache serving.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">When we first launched AMP in Google Search we made a big trade-off: to achieve the user experience that users were telling us that they wanted, instant loading, we needed to start loading the page before the user clicked. As we detailed in a deep-dive </span><a href="https://developers.googleblog.com/2017/02/whats-in-amp-url.html"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">blog post</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> last year,  privacy reasons make it basically impossible to load the page from the publisher’s server. Publishers shouldn’t know what people are interested in until they actively go to their pages. Instead, AMP pages are loaded from the Google AMP Cache but with that behavior the URLs changed to include the google.com/amp/ URL prefix.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">We are huge fans of meaningful URLs ourselves and recognize that this isn’t ideal. Many of y’all agree. It is certainly the #1 piece of feedback we hear about AMP. We sought to ensure that these URLs show up in as few places as possible. Over time our Google Search native apps on Android and iOS started defaulting to showing the publishers URLs and we worked with browser vendors to share the publisher’s URL of an article where possible. We couldn’t, however, fix the state of URLs where it matters most: on the web and the browser URL bar.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">We embarked on a multi-month long effort, and today we finally feel confident that we found a solution: As </span><a href="https://www.w3.org/2001/tag/doc/distributed-content/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">recommended by the W3C TAG</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, we intend to implement a new version of AMP Cache serving based on the emerging </span><a href="https://github.com/WICG/webpackage"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Web Packaging standard</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">. Based on this web standard AMP navigations from Google Search can take advantage of privacy-preserving preloading and the performance of Google’s servers, while URLs remain as the publisher intended and the primary security context of the web, the origin, remains intact. We have built a prototype based on the Chrome Browser and an experimental version of Google Search to make sure it actually does deliver on both the desired UX and performance in real use cases. This step gives us confidence that we have a promising solution to this hard problem and that it will soon become the way that users will encounter AMP content on the web. </span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">The next steps are moving towards fully implementing the new web standard in web browsers and in the Google AMP Cache. Our goal is that Web Packaging becomes available in as many browsers as possible (after all Web Packaging has exciting use cases beyond just AMP such as offline pages, ES6 module loading, and resource bundling). In particular, we intend to extend </span><a href="http://frederic-wang.fr/amp-and-igalia-working-together-to-improve-the-web-platform.html"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">existing work on WebKit</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> to include the implementation of Web Packaging and the Google Chrome team’s implementation is getting started.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">We’re super excited about getting this work under way and we expect the changes to first reach users in the second half of 2018. Thanks for all of your feedback on the matter and we will keep you all updated on the progress right here in this blog!</span></p>
<p><a href="https://twitter.com/cramforce"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Malte Ubl</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, Tech Lead for the AMP Project at Google.</span></p>
	</div>

	


</div>

