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
  - iframe
inlineCSS: .amp-wp-inline-329fdb7771c10d07df9eb73273c95a60{font-weight:400;}
---

<div class="amp-wp-article-content">

		<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">We’ve </span><a href="https://amphtml.wordpress.com/2017/04/06/from-amp-to-progressive-web-app/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">previously written plenty</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> about combining AMP &amp; PWA, short for Progressive Web Apps. While the idea of </span><a href="https://www.ampproject.org/docs/guides/pwa-amp/amp-to-pwa"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">preloading your PWA while the reader is reading your AMP page</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> is fairly straightforward, the other combination pattern, where </span><a href="https://www.ampproject.org/docs/guides/pwa-amp/amp-in-pwa"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP is used as data-source to power your PWA</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, is less understood.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">In my recent Google I/O talk</span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, I claimed that you could get an AMP page to render within your PWA within a few minutes of writing code, and while that might be true, it doesn’t reflect all the work to be done in a production app. It was time to eat <a href="https://en.wikipedia.org/wiki/Eating_your_own_dog_food" target="_blank" rel="noopener">our own dogfood</a> and build a production-ready PWAMP from scratch. Meet the Shadow Reader:</span></p>
<p> </p>
<div class="embed-httpsgfycatcom"><amp-iframe src="https://gfycat.com/ifr/sameamusinginganue" frameborder="0" width="640" height="360" allowfullscreen="" sandbox="allow-scripts allow-same-origin" sizes="(min-width: 640px) 640px, 100vw" class="amp-wp-enforced-sizes"><div placeholder="" class="amp-wp-iframe-placeholder"></div></amp-iframe></div>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><br/>
Contrary to our simpler previously released </span><a href="https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">React-based sample app</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, The ShadowReader demo app is is so-called ‘vanilla JS’ (with the exception of AMP, of course) – built from scratch to demonstrate all steps required to create the experience – and uses real-world feeds and AMP pages from The Guardian. You can experience it yourself on your phone (or via emulation) at </span><a href="https://amp.cards"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">https://amp.cards</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">So what’s special about this app? For once, it demonstrates how quickly you can spin up a so-called “app shell” if you already have a corpus of AMP pages. Instead of a giant app that includes all templating logic to display articles, this app simply reads the Guardian’s RSS feeds, then delegates to AMP for rendering an existing AMP page inline when you click a card. This makes the engineering effort and app itself incredibly lightweight. More highlights:</span></p>
<ul><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Pulling in real-world data means solving <a href="https://paulbakaus.com/tutorials/html5/building-a-pwamp-0-introducing-the-shadowreader/">real-world challenges</a></span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Weighs less than 10kb (~200kb if you include Guardian web fonts and AMP)</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Smooth card transitions and skeleton UI’s to further accelerate perceived performance</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Supports full URL-based navigation, sharing</span></li>
</ul><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">If you’re a developer, dive through the </span><a href="https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa-reader"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">source code</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> and </span><a href="https://paulbakaus.com/tutorials/html5/building-a-pwamp-0-introducing-the-shadowreader/">head over to my own blog</a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> to learn exactly how I’ve built each feature and element of the app, including the FLIP-based animations and the article views that seamlessly reconnect with lazy-loaded cards.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">The Shadow Reader is half inspiration, half tutorial. Use it to evaluate whether the </span><a href="https://www.ampproject.org/docs/guides/pwa-amp/amp-in-pwa"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">PWAMP</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> route makes sense for your use-case, and don’t hesitate to </span><a href="https://www.ampproject.org/support/developer/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">reach out</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> if you need help getting started. Now PWAMP all the things!</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Paul Bakaus<br/></span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Developer Advocate, Google</span></p>
	</div>

	


</div>

