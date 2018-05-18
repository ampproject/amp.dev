---
class: post-blog post-detail
type: Blog
$title: "Measuring AMP Performance"
id: measuring-amp-performance
author: amphtml
role: 
origin: "https://amphtml.wordpress.com/2018/01/17/measuring-amp-performance/amp/"
excerpt: "Editor’s note: The following was posted on Medium by Martin Schierle, Mobile Solutions Consultant, Google. TL;DR: Whenever performance testing AMP, keep in mind that a test from origin will include potentially suboptimal server settings like bad cache headers or missing image optimizations. Also the biggest speed gain (near instant load through prerendering) will not be reflected in [&#8230;]"
avatar: http://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2018-01-17T05:00:32-08:00
$date: January 17, 2018
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
inlineCSS: false
---

<div class="amp-wp-article-content">

		<p><em>Editor’s note: The following was <a href="https://medium.com/@martin.schierle/measuring-amp-performance-a75a804bb9b1" target="_blank" rel="noopener">posted on Medium</a> by Martin Schierle, Mobile Solutions Consultant, Google.</em></p><p id="48f4" class="graf graf--p graf-after--h3"><em>TL;DR:</em> Whenever performance testing AMP, keep in mind that a test from origin will include potentially suboptimal server settings like bad cache headers or missing image optimizations. Also the biggest speed gain (near instant load through prerendering) will not be reflected in commonly used performance tools and metrics.</p><p id="0bb6" class="graf graf--p graf-after--p">Developers implementing AMP are looking to get blazingly fast loading speeds, and are therefore often curious to see how much their site improved with AMP. However, a naive run of one of the many available performance tools (e.g. <a class="markup--anchor markup--p-anchor" href="https://developers.google.com/speed/pagespeed/insights/" target="_blank" rel="nofollow noopener">PageSpeed Insights</a> or <a class="markup--anchor markup--p-anchor" href="https://developers.google.com/web/tools/lighthouse/" target="_blank" rel="nofollow noopener">Lighthouse</a>) does sometimes yield surprising and seemingly suboptimal results.</p><p id="8db4" class="graf graf--p graf-after--p">To understand why this is happening, it is important to be aware that AMP speeds up a website on three different levels:</p><ol class="postList"><li id="e369" class="graf graf--li graf-after--p">AMP itself is already very fast, as custom JS is forbidden, critical path is unblocked, CSS is inlined and <a class="markup--anchor markup--li-anchor" href="https://www.ampproject.org/learn/about-how/" target="_blank" rel="nofollow noopener">many other optimizations</a>. However, there may still be bottlenecks from the server-side, e.g. unoptimized images or insufficient cache headers, which can’t easily be fixed by the client side AMP library.</li>
<li id="81ec" class="graf graf--li graf-after--li">The second level of speed-up is then achieved through the caching by the AMP Caches (e.g. the Google AMP Cache), which will reoptimize images, add prefetch hints, minify html, serve via HTTP/2, along with many <a class="markup--anchor markup--li-anchor" href="https://developers.google.com/amp/cache/overview#cache-optimizations-and-modifications" target="_blank" rel="nofollow noopener">other optimizations</a>. Keep in mind that the bulk of those optimizations can also be done on origin.</li>
<li id="c2ba" class="graf graf--li graf-after--li">The third (and potentially most impactful) level of speed improvement is based on the fact that AMP can be prerendered in a safe and secure way, by prerendering only assets in the first viewport, and not executing third-party scripts. This is described in far more detail <a class="markup--anchor markup--li-anchor" href="https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456#3be5" target="_blank" rel="noopener">here</a>.</li>
</ol><p id="b340" class="graf graf--p graf-after--li">So if a performance check is done on AMP on origin, the speed scores (while normally much faster than the canonical) are not yet representative. A better way to test is to run the performance test on the same site served from one of the AMP Caches (you can use <a class="markup--anchor markup--p-anchor" href="https://ampbyexample.com/advanced/using_the_google_amp_cache/#amp-cache-url-format" target="_blank" rel="nofollow noopener">this tool</a> to get a cache URL for the Google AMP cache). This will include optimizations through the cache into the measurement. This score will already be much better, and basically shows what you could achieve on your own host as well by applying optimizations like the ones described previously.</p><p id="4c08" class="graf graf--p graf-after--p">Let’s see what this might look like for an actual page, here <a class="markup--anchor markup--p-anchor" href="https://ampbyexample.com/samples_templates/product_browse_page/" target="_blank" rel="nofollow noopener">one of our example pages from ampbyexample.com</a>:</p><p><amp-img class=" size-full wp-image-1922 aligncenter amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/01/measure1.png?w=660" alt="measure1" srcset="https://amphtml.files.wordpress.com/2018/01/measure1.png?w=660 660w, https://amphtml.files.wordpress.com/2018/01/measure1.png?w=1320 1320w, https://amphtml.files.wordpress.com/2018/01/measure1.png?w=150 150w, https://amphtml.files.wordpress.com/2018/01/measure1.png?w=300 300w, https://amphtml.files.wordpress.com/2018/01/measure1.png?w=768 768w, https://amphtml.files.wordpress.com/2018/01/measure1.png?w=1024 1024w" sizes="(min-width: 660px) 660px, 100vw" width="660" height="349"></amp-img></p><p id="a3f8" class="graf graf--p graf-after--figure">Detailed results <a class="markup--anchor markup--p-anchor" href="https://www.webpagetest.org/video/compare.php?tests=171206_81_654bb6303a02d6659712c7d77478e389%2C171206_RP_6dcda15ebe2280a50571f36886de126c&amp;thumbSize=200&amp;ival=500&amp;end=visual#" target="_blank" rel="nofollow noopener">can be found here</a>. The chart nicely shows how the performance improves if measured from an AMP Cache instead of origin across most metrics. First meaningful paint is, for example, 0.9s faster from cache.</p><p id="eecb" class="graf graf--p graf-after--p">Unfortunately the third and most important case (near instant load through prerendering) can’t be measured easily with the regular tools, as it would need to be measured in the flow coming from an earlier visited site or app. It should however be obvious that a page can be shown near instantly, as long as all visible content was already prerendered beforehand. <a class="markup--anchor markup--p-anchor" href="https://www.webpagetest.org/" target="_blank" rel="nofollow noopener">Webpagetest.org</a> allows to test flows like this via the <a class="markup--anchor markup--p-anchor" href="https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting" target="_blank" rel="nofollow noopener">scripting option</a>, but it is cumbersome and error-prone to setup and maintain. A script could look like this:</p><pre id="4622" class="graf graf--pre graf-after--p">// don’t log data for first navigation step

logData 0 

// navigate to the first page (e.g. Google SRP) which prerenders AMP

navigate INSERT_URL_CALLED_BEFORE_AMP

// sleep a bit to give prerendering time,
// a user normally also doesn’t click through immediately

sleep 10

// start logging now for clickthrough to AMP

logData 1

// click through, insert correct query expression
// to find the right link to click for your doc

execAndWait document.querySelector(‘[…]’).click();</pre><p id="c3ed" class="graf graf--p graf-after--pre">When adding this in, the complete comparison of all three modes looks like this (with detailed results <a class="markup--anchor markup--p-anchor" href="https://www.webpagetest.org/video/compare.php?tests=171206_81_654bb6303a02d6659712c7d77478e389%2C171206_QE_b0cc21426822376798cab14a1d025b11%2C171206_RP_6dcda15ebe2280a50571f36886de126c&amp;thumbSize=200&amp;ival=500&amp;end=visual#" target="_blank" rel="nofollow noopener">being here</a>):</p><p><amp-img class=" size-full wp-image-1923 aligncenter amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/01/measure2.png?w=660" alt="measure2.png" srcset="https://amphtml.files.wordpress.com/2018/01/measure2.png?w=660 660w, https://amphtml.files.wordpress.com/2018/01/measure2.png?w=1318 1318w, https://amphtml.files.wordpress.com/2018/01/measure2.png?w=150 150w, https://amphtml.files.wordpress.com/2018/01/measure2.png?w=300 300w, https://amphtml.files.wordpress.com/2018/01/measure2.png?w=768 768w, https://amphtml.files.wordpress.com/2018/01/measure2.png?w=1024 1024w" sizes="(min-width: 660px) 660px, 100vw" width="660" height="339"></amp-img></p><p id="187a" class="graf graf--p graf-after--figure">This shows the advantage of prerendering, which makes it possible to start render pretty much instantaneously (66ms) and to be visually complete and interactive after approximately 1s.</p><p id="1aac" class="graf graf--p graf-after--p graf--trailing">So, whenever performance testing AMP, keep in mind that not all speed advantages are directly obvious, as some will come in through caching and especially prerendering.</p><p><em><a href="https://medium.com/@martin.schierle/measuring-amp-performance-a75a804bb9b1" target="_blank" rel="noopener">Posted on Medium</a> by Martin Schierle, Mobile Solutions Consultant, Google</em></p>	</div>

	

</div>

