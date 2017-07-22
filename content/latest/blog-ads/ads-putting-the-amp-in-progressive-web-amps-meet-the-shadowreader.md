---
class: post-blog post-detail
type: Blog
$title: "Putting the AMP in Progressive Web AMPs: Meet the ShadowReader"
id: ads-putting-the-amp-in-progressive-web-amps-meet-the-shadowreader
author: amphtml
role: 
origin: "https://amphtml.wordpress.com/2017/07/20/putting-the-amp-in-progressive-web-amps-meet-the-shadowreader/amp/"
excerpt: "We’ve previously written plenty about combining AMP &#38; PWA, short for Progressive Web Apps. While the idea of preloading your PWA while the reader is reading your AMP page is fairly straightforward, the other combination pattern, where AMP is used as data-source to power your PWA, is less understood. In my recent Google I/O talk, [&#8230;]"
avatar: http://amphtml.files.wordpress.com/2017/07/featured.png
date_data: 2017-07-20T15:50:15-07:00
$date: July 20, 2017
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
---

<div class="amp-wp-article-content">
<p><strong>We’ve </strong><a href="https://amphtml.wordpress.com/2017/04/06/from-amp-to-progressive-web-app/"><strong>previously written plenty</strong></a><strong> about combining AMP &amp; PWA, short for Progressive Web Apps. While the idea of </strong><a href="https://www.ampproject.org/docs/guides/pwa-amp/amp-to-pwa"><strong>preloading your PWA while the reader is reading your AMP page</strong></a><strong> is fairly straightforward, the other combination pattern, where </strong><a href="https://www.ampproject.org/docs/guides/pwa-amp/amp-in-pwa"><strong>AMP is used as data-source to power your PWA</strong></a><strong>, is less understood.</strong></p>
<p><strong>In my recent Google I/O talk</strong><strong>, I claimed that you could get an AMP page to render within your PWA within a few minutes of writing code, and while that might be true, it doesn’t reflect all the work to be done in a production app. It was time to eat <a href="https://en.wikipedia.org/wiki/Eating_your_own_dog_food" target="_blank" rel="noopener">our own dogfood</a> and build a production-ready PWAMP from scratch. Meet the Shadow Reader:</strong></p>
<p>&nbsp;</p>
<div class="embed-httpsgfycatcom"><iframe src='https://gfycat.com/ifr/sameamusinginganue' frameborder='0' scrolling='no' width='640' height='360'  allowfullscreen></iframe></div>
<p><strong><br />
Contrary to our simpler previously released </strong><a href="https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa"><strong>React-based sample app</strong></a><strong>, The ShadowReader demo app is is so-called ‘vanilla JS’ (with the exception of AMP, of course) – built from scratch to demonstrate all steps required to create the experience &#8211; and uses real-world feeds and AMP pages from The Guardian. You can experience it yourself on your phone (or via emulation) at </strong><a href="https://amp.cards"><strong>https://amp.cards</strong></a><strong>.</strong></p>
<p><strong>So what’s special about this app? For once, it demonstrates how quickly you can spin up a so-called “app shell” if you already have a corpus of AMP pages. Instead of a giant app that includes all templating logic to display articles, this app simply reads the Guardian’s RSS feeds, then delegates to AMP for rendering an existing AMP page inline when you click a card. This makes the engineering effort and app itself incredibly lightweight. More highlights:</strong></p>
<ul>
<li ><strong>Pulling in real-world data means solving <a href="https://paulbakaus.com/tutorials/html5/building-a-pwamp-0-introducing-the-shadowreader/">real-world challenges</a></strong></li>
<li ><strong>Weighs less than 10kb (~200kb if you include Guardian web fonts and AMP)</strong></li>
<li ><strong>Smooth card transitions and skeleton UI’s to further accelerate perceived performance</strong></li>
<li ><strong>Supports full URL-based navigation, sharing</strong></li>
</ul>
<p><strong>If you’re a developer, dive through the </strong><a href="https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa-reader"><strong>source code</strong></a><strong> and </strong><a href="https://paulbakaus.com/tutorials/html5/building-a-pwamp-0-introducing-the-shadowreader/">head over to my own blog</a><strong> to learn exactly how I’ve built each feature and element of the app, including the FLIP-based animations and the article views that seamlessly reconnect with lazy-loaded cards.</strong></p>
<p><strong>The Shadow Reader is half inspiration, half tutorial. Use it to evaluate whether the </strong><a href="https://www.ampproject.org/docs/guides/pwa-amp/amp-in-pwa"><strong>PWAMP</strong></a><strong> route makes sense for your use-case, and don’t hesitate to </strong><a href="https://www.ampproject.org/support/developer/"><strong>reach out</strong></a><strong> if you need help getting started. Now PWAMP all the things!</strong></p>
<p><strong>Paul Bakaus<br />
</strong><strong>AMP Developer Advocate, Google</strong></p><br />  
</div>

