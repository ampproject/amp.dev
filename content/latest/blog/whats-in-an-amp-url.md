---
class: post-blog post-detail
type: Blog
$title: What’s in an AMP URL?
id: whats-in-an-amp-url
author: amphtml
role: 
origin: "https://amphtml.wordpress.com/2017/02/06/whats-in-an-amp-url/amp/"
excerpt: "The following was posted on the Google Developers Blog by Alex Fischer, Software Engineer, Google Search. TL;DR: Today, we’re adding a feature to the AMP integration in Google Search that allows users to access, copy, and share the canonical URL of an AMP document. But before diving deeper into the news, let’s take a step [&#8230;]"
avatar: http://0.gravatar.com/avatar/0342fb9db5636638e886dff44d5ec94c?s=96&d=identicon&r=G
date_data: 2017-02-06T11:12:42-08:00
$date: February 6, 2017
$parent: /content/latest/list-blog.html

components:
  - social-share
---

<div class="amp-wp-article-content">
<p><em>The following was <a href="https://developers.googleblog.com/2017/02/whats-in-amp-url.html" target="_blank">posted on the Google Developers Blog</a> by Alex Fischer, Software Engineer, Google Search.</em></p>
<p><strong>TL;DR: Today, we’re adding a feature to the AMP integration in Google Search </strong><strong>that allows users to access, copy, and share the canonical URL of an AMP document. But before diving deeper into the news, let’s take a step back to elaborate more on URLs in the AMP world and how they relate to the speed benefits of AMP.</strong></p>
<p><strong>What’s in a URL? On the web, a lot &#8211; URLs and </strong><a href="https://tools.ietf.org/html/rfc6454"><strong>origins</strong></a><strong> represent, to some extent, trust and ownership of content. When you’re reading a New York Times article, a quick glimpse at the URL gives you a level of trust that what you’re reading represents the voice of the New York Times. Attribution, brand, and ownership are clear.</strong></p>
<p><strong>Recent product launches in different mobile apps and the recent launch of </strong><a href="https://search.googleblog.com/2015/12/amp-projects-fast-mobile-pages-coming.html"><strong>AMP in Google Search</strong></a><strong> have blurred this line a little. In this post, I’ll first try to explain the reasoning behind some of the technical decisions we made and make sense of the different kinds of AMP URLs that exist. I’ll then outline changes we are making to address the concerns around URLs. </strong></p>
<p><strong>To start with, AMP documents have three different kinds of URLs:</strong></p>
<ul>
<li>Original URL: The publisher&#8217;s document written in the AMP format
<pre><code>http://www.example.com/amp/doc.html
</code></pre>
</li>
<li>AMP Cache URL: The document served through an AMP Cache (e.g., all AMPs served by Google are served through the <a href="https://developers.google.com/amp/cache/">Google AMP Cache</a>). Most users will never see this URL.
<pre><code>https://www-example-com.cdn.ampproject.org/c/www.example.com/amp/doc.html</code></pre>
</li>
<li>Google AMP Viewer URL: The document displayed in an AMP viewer (e.g., when rendered on the search result page).
<pre><code>https://www.google.com/amp/www.example.com/amp.doc.html</code></pre>
</li>
</ul>
<p><div class="wp-image  size-full wp-image-1051 aligncenter"><amp-img layout='responsive' width="970" height="676" src="https://amphtml.files.wordpress.com/2017/02/image1.png?w=660" srcset="https://amphtml.files.wordpress.com/2017/02/image1.png?w=660 660w, https://amphtml.files.wordpress.com/2017/02/image1.png?w=150 150w, https://amphtml.files.wordpress.com/2017/02/image1.png?w=300 300w, https://amphtml.files.wordpress.com/2017/02/image1.png?w=768 768w, https://amphtml.files.wordpress.com/2017/02/image1.png 970w" sizes="(max-width: 660px) 100vw, 660px"></amp-img><br />
Although having three different URLs with different origins for essentially the same content can be confusing, there are two main reasons why these different URLs exist: caching and pre-rendering. Both are large contributors to AMP’s speed, but require new URLs and I will elaborate on why that is.</p>
<h1><strong>AMP Cache URLs</strong></h1>
<p><strong>Let’s start with AMP Cache URLs. Paul Bakaus, a Google Developer Advocate for AMP, has an excellent post describing </strong><a href="https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456"><strong>why AMP Caches exist</strong></a><strong>. Paul’s post goes into great detail describing the benefits of AMP Caches, but it doesn’t quite answer the question why they require new URLs. The answer to this question comes down to one of the design principles of AMP: build for easy adoption. AMP tries to solve some of the problems of the mobile web at scale, so its components must be easy to use for everyone. </strong></p>
<p><strong>There are a variety of options to get validation, proximity to users, and other benefits provided by AMP Caches. For a small site, however, that doesn’t manage its own DNS entries, doesn’t have engineering resources to push content through complicated APIs, or can’t pay for content delivery networks, a lot of these technologies are inaccessible. </strong></p>
<p><strong>For this reason, the Google AMP Cache works by means of a simple URL “transformation.” A webmaster only has to make their content available at some URL and the Google AMP Cache can then cache and serve the content through Google’s world-wide infrastructure through a new URL that mirrors and transforms the original. It’s as simple as that. Leveraging an AMP Cache using the original URL, on the other hand, would require the webmaster to modify their DNS records or reconfigure their name servers. While some sites do just that, the URL-based approach is easier to use for the vast majority of sites.</strong></p>
<h1><strong>AMP Viewer URLs</strong></h1>
<p><strong>In the previous section, </strong><strong>we learned about Google AMP Cache URLs &#8212; URLs that point to the cached version of an AMP document. But what about </strong><strong><a href="http://www.google.com/amp" rel="nofollow">http://www.google.com/amp</a></strong><strong> URLs? Why are they needed? These are “AMP Viewer” URLs and they exist because of pre-rendering.</strong></p>
<p><strong>AMP&#8217;s built-in support for privacy and resource-conscientious pre-rendering is rarely talked about and often misunderstood. AMP documents can be pre-rendered without setting off a cascade of resource fetches, without hogging up users’ CPU and memory, and without running any privacy-sensitive analytics code. This works regardless of whether the embedding application is a mobile web page or a native application. The need for new URLs, however, comes mostly from mobile web implementations, so I am using Google’s mobile search result page (SERP) as an illustrative example.</strong></p>
<h3><u><strong>How does pre-rendering work?</strong></u></h3>
<p><strong>When a user performs a Google search that returns AMP-enabled results, some of these results are pre-rendered behind the scenes. When the user clicks on a pre-rendered result, the AMP page loads instantly. </strong></p>
<p>Pre-rendering works by loading a hidden iframe on the embedding page (the search result page) with the content of the AMP page and an additional parameter that indicates that the AMP document is only being pre-rendered. The JavaScript component that handles the lifecycle of these iframes is called “AMP Viewer”.</p>
<center><strong><div class="wp-image   wp-image-1052 aligncenter"><amp-img layout='responsive' width="970" height="1064" src="https://amphtml.files.wordpress.com/2017/02/image2.png?w=572&#038;h=628" srcset="https://amphtml.files.wordpress.com/2017/02/image2.png?w=572&amp;h=628 572w, https://amphtml.files.wordpress.com/2017/02/image2.png?w=137&amp;h=150 137w, https://amphtml.files.wordpress.com/2017/02/image2.png?w=273&amp;h=300 273w, https://amphtml.files.wordpress.com/2017/02/image2.png?w=768&amp;h=842 768w, https://amphtml.files.wordpress.com/2017/02/image2.png 970w" sizes="(max-width: 572px) 100vw, 572px"></amp-img><br />
</strong><b><i>The AMP Viewer pre-renders an AMP document in a hidden iFrame.</i></b></center>
<p><strong>The user’s browser loads the document and the AMP runtime and starts rendering the AMP page. Since all other resources, such as images and embeds, are managed by the AMP runtime, nothing else is loaded at this point. The AMP runtime may decide to fetch some resources, but it will do so in a resource and privacy sensible way. </strong></p>
<p><strong>When a user clicks on the result, all the AMP Viewer has to do is show the iframe that the browser has already rendered and let the AMP runtime know that the AMP document is now visible.</strong></p>
<p><strong>As you can see, this operation is incredibly cheap &#8211; there is no network activity or hard navigation to a new page involved. This leads to a near-instant loading experience of the result. </strong></p>
<h3><u><strong>Where do google.com/amp URLs come from?</strong></u></h3>
<p><strong>All of the above happens while the user is still on the original page (in our example, that’s the search results page). </strong><strong>In other words, the user hasn&#8217;t gone to a different page; they have just viewed an iframe on the same page and so the browser doesn&#8217;t change the URL</strong><strong>. </strong></p>
<p><strong>We still want the URL in the browser to reflect the page that is displayed on the screen and make it easy for users to link to. When users hit refresh in their browser, they expect the same document to show up and not the underlying search result page. So the AMP viewer has to manually update this URL. This happens using the History API. This API allows the AMP Viewer to update the browser’s URL bar without doing a hard navigation.</strong></p>
<p><strong>The question is what URL the browser should be updated to. Ideally, this would be the URL of the result itself (e.g., </strong><strong><a href="http://www.example.com/amp/doc.html" rel="nofollow">http://www.example.com/amp/doc.html</a></strong><strong>); or the AMP Cache URL (e.g., </strong><strong>www-example-com.cdn.ampproject.org/www.example.com/amp/doc.html</strong><strong>). Unfortunately, it can’t be either of those. One of the main restrictions of the History API is that the new URL must be on the same origin as the original URL (</strong><a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API"><strong>reference</strong></a><strong>). This is enforced by browsers (for </strong><a href="https://www.w3.org/TR/2011/WD-html5-20110113/history.html#the-history-interface"><strong>security reasons</strong></a><strong>), but it means that in Google Search, this URL has to be on the </strong><strong><a href="http://www.google.com" rel="nofollow">http://www.google.com</a></strong><strong> origin. </strong></p>
<h3><u><strong>Why do we show a header bar?</strong></u></h3>
<p><strong>The previous section explained restrictions on URLs that an AMP Viewer has to handle. These URLs, however, can be confusing and misleading. They can open up the doors to phishing attacks. If an AMP page showed a login page that looks like Google&#8217;s and the URL bar says </strong><strong><a href="http://www.google.com" rel="nofollow">http://www.google.com</a></strong><strong>, how would a user know that this page isn&#8217;t actually Google&#8217;s? That&#8217;s where the need for additional attribution comes in.</strong></p>
<p><strong>To provide appropriate attribution of content, every AMP Viewer must make it clear to users where the content that they&#8217;re looking at is coming from. And one way of accomplishing this is by adding a header bar that displays the “true” origin of a page.</strong></p>
<p><div class="wp-image   wp-image-1050 aligncenter"><amp-img layout='responsive' width="817" height="593" src="https://amphtml.files.wordpress.com/2017/02/image3.png?w=624&#038;h=453" srcset="https://amphtml.files.wordpress.com/2017/02/image3.png?w=624&amp;h=453 624w, https://amphtml.files.wordpress.com/2017/02/image3.png?w=150&amp;h=109 150w, https://amphtml.files.wordpress.com/2017/02/image3.png?w=300&amp;h=218 300w, https://amphtml.files.wordpress.com/2017/02/image3.png?w=768&amp;h=557 768w, https://amphtml.files.wordpress.com/2017/02/image3.png 817w" sizes="(max-width: 624px) 100vw, 624px"></amp-img></p>
<h1><strong>What’s next?</strong></h1>
<p><strong>I hope the previous sections made it clear why these different URLs exist and why there needs to be a header in every AMP viewer. We have heard how you feel about this approach and the importance of URLs. So what next? As you know, we want to be thoughtful in what we do and ensure that we don&#8217;t break the speed and performance users expect from AMP pages. </strong></p>
<p><strong>Since the launch of </strong><a href="https://amphtml.wordpress.com/2016/02/24/amping-up-in-google-search/"><strong>AMP in Google Search</strong></a><strong> in Feb 2016, we have taken the following steps:</strong></p>
<ul>
<li ><strong>All Google URLs (i.e., the Google AMP cache URL and the Google AMP viewer URL) reflect the original source of the content as best as possible:</strong><strong><br />
</strong></p>
<pre><strong>www.google.com/amp/</strong><b>www.example.com/amp/doc.html</b></pre>
</li>
<li ><strong>When users scroll down the page to read a document, the AMP viewer header bar hides, freeing up precious screen real-estate.</strong></li>
<li ><strong>When users visit a Google AMP viewer URL on a platform where the viewer is not available, we redirect them to the canonical page for the document.</strong></li>
</ul>
<p>In addition to the above, many users have requested a way to access, copy, and share the canonical URL of a document. Today, we’re adding support for this functionality in form of an anchor button in the AMP Viewer header on Google Search. This feature allows users to use their browser’s native share functionality by long-tapping on the link that is displayed.</p>
<p><div class="wp-image   wp-image-1049 aligncenter"><amp-img layout='responsive' width="614" height="1064" src="https://amphtml.files.wordpress.com/2017/02/image4.png?w=457&#038;h=792" srcset="https://amphtml.files.wordpress.com/2017/02/image4.png?w=457&amp;h=792 457w, https://amphtml.files.wordpress.com/2017/02/image4.png?w=87&amp;h=150 87w, https://amphtml.files.wordpress.com/2017/02/image4.png?w=173&amp;h=300 173w, https://amphtml.files.wordpress.com/2017/02/image4.png 614w" sizes="(max-width: 457px) 100vw, 457px"></amp-img></p>
<p><strong>In the coming weeks, the Android Google app will share the original URL of a document when users tap on the app’s share button. This functionality is already available on the iOS Google app.</strong></p>
<p><strong>Lastly, we’re working on leveraging upcoming web platform APIs that allow us to improve this functionality even further. One such API is the </strong><a href="https://developers.google.com/web/updates/2016/10/navigator-share"><strong>Web Share API</strong></a><strong> that would allow AMP viewers to invoke the platform’s native sharing flow with the original URL rather than the AMP viewer URL.</strong></p>
<p><strong>We as Google have every intention in making the AMP experience as good as we can for both, users and publishers. A thriving ecosystem is very important to us and attribution, user trust, and ownership are important pieces of this ecosystem. I hope this blog post helps clear up the origin of the three URLs of AMP documents, their role in making AMP fast, and our efforts to further improve the AMP experience in Google Search. Lastly, an ecosystem can only flourish with your participation: give us </strong><a href="https://twitter.com/googledevs"><strong>feedback</strong></a><strong> and </strong><a href="https://github.com/ampproject/amphtml"><strong>get involved</strong></a><strong> with AMP.<br />
</strong><br />
<em><strong>Posted by Alex Fischer, Software Engineer, Google Search.</strong></em></p><br />  
</div>

