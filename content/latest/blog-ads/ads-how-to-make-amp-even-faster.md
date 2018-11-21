---
class: post-blog post-detail
type: Blog
$title: "How to make AMP even faster"
id: ads-how-to-make-amp-even-faster
author: Sebastian Benz
role:  Partner Developer Advocate, Google
origin: "https://amphtml.wordpress.com/2018/10/08/how-to-make-amp-even-faster/amp/"
excerpt: "We’ve just published a new guide on ampproject.org: “Optimizing your hosted AMP pages” explaining how you can optimize AMP documents so that they load even faster. You may be thinking: wait &#8211; isn’t AMP supposed to be fast out-of-the-box? And you would be right: the AMP runtime is optimized for speed and all valid AMP [&#8230;]"
avatar: https://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2018-10-08T09:54:51-07:00
$date: October 8, 2018
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
inlineCSS: .amp-wp-inline-329fdb7771c10d07df9eb73273c95a60{font-weight:400;}.amp-wp-inline-b9bc28925ccea04474259c661e5c4e72{list-style-type:none;}.amp-wp-inline-3d4b98a8b5cbbf093a12b4e3a24e2e3e{max-width:1894px;}
---

<div class="amp-wp-article-content">

		<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">We’ve just published a new guide on ampproject.org: “</span><a href="https://www.ampproject.org/docs/fundamentals/optimize_amp#preload-hero-images"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Optimizing your hosted AMP pages</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">” explaining how you can optimize AMP documents so that they load even faster. </span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">You may be thinking: wait – isn’t AMP supposed to be fast out-of-the-box? And you would be right: the AMP runtime is optimized for speed and all valid AMP pages load fast. However, there are additional performance optimizations you can implement to help the browser load AMP pages even faster. These changes are trivial, but can significantly improve loading performance without breaking AMP validity. </span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">For example, the </span><a href="https://make.xwp.co/2018/09/06/amp-plugin-release-v1-0-beta3/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP WordPress plugin</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, which is being developed by XWP, already implements some of the techniques described in the guide. This resulted in the loading time for </span><a href="https://xwp.co/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">xwp.co</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> improving by </span><a href="https://www.webpagetest.org/video/compare.php?tests=180829_CC_c40727efd748d36403b1b8420b29843c%2C180829_H9_10487f1de5a521ab9483be4955465021&amp;thumbSize=200&amp;ival=100&amp;end=visual"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">12.6%</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">.</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Another example is </span><a href="https://www.standard.co.uk/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Evening Standard</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, they go one step further and publish optimized AMP with server-side-rendering (SSR). This resulted in their FCP improving by </span><a href="https://www.webpagetest.org/video/compare.php?tests=180903_BN_06c00c199201b550bb27a2c594e8f9c6,180903_A6_d164fbcd766815bdd90853a704aefcff"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">69%</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> over their valid AMP version.<br/></span></p><p> </p><h2><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Why should you care?</span></h2><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Let’s take a step back. Is this even necessary? Aren’t AMP documents always served by an AMP cache that automatically performs </span><a href="https://developers.google.com/amp/cache/overview#cache-optimizations-and-modifications"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">all these optimizations</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">? That’s true for some cases, such as when AMP documents are surfaced in Google or Bing search results. But there are other cases were AMP documents are served from the origin:</span></p><ol><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">When your canonical or mobile web pages are built with AMP, such as </span><a href="https://tasty.co"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">https://tasty.co</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Other platforms link to AMP documents on the origin. For example, Twitter </span><a href="https://searchengineland.com/twitter-ramps-amp-278300"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">started linking to AMP pages</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> instead of delivering the standard mobile version. This means that if a user clicks a link in one of Twitter’s mobile apps, the link goes to the AMP version of your page on your own server.</span></li>
</ol><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">For these cases, where you are serving AMP pages from your own servers, it is important to make sure that your AMP pages offer the optimal loading performance.<br/></span></p><p> </p><h2><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">How to help the browser load AMP pages faster?</span></h2><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Let’s take a quick look at how optimizing AMP’s loading performance works. The AMP runtime needs to be loaded for AMP specific elements such as </span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-img</span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> or </span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-video</span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> to work. This means an </span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-img</span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> will only start downloading an image once the AMP runtime has been loaded. </span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">This gives us two opportunities to make AMP pages load faster:</span></p><ol><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Make sure that the browser downloads the AMP runtime as quickly as possible.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Tell the browser to start downloading important assets such as images even before the AMP runtime is available. </span></li>
</ol><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">The key to achieving this is using resource hints such as </span><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">rel=preload</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> to prioritize the download of critical resources. The </span><a href="https://www.ampproject.org/docs/fundamentals/optimize_amp#preload-hero-images"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP optimization guide</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> describes different ways how you can use resource hints to optimize AMP pages. It’s also a good idea to take a look at the </span><a href="https://ampbyexample.com/boilerplate/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Boilerplate Generator</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> which allows you to quickly generate optimized AMP templates.<br/></span></p><p> </p><h2><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">How to improve first-contentful-paint?</span></h2><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">It’s also possible to take performance optimization one step further. The AMP runtime implements a </span><a href="https://www.ampproject.org/docs/design/amp-html-layout"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">static page layout system</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> to reduce rendering and scrolling junk. The way it works is that the </span><a href="https://www.ampproject.org/docs/fundamentals/spec/amp-boilerplate"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Boilerplate code</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> initially hides the document until the AMP runtime is loaded. Once it’s loaded, the runtime calculates the layout and shows the content. The downside of this approach causes the user to see an empty page until the AMP runtime is loaded and it does not support progressive rendering.</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">To offset the negatives, </span><a href="https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">first-contentful-paint</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> (FCP) times can be improved by using AMP </span><a href="https://docs.google.com/document/d/1gViU1hxtGXwMSTNnum2zY_p9ZWvFwMKoachNdIRUgh0/edit"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">server-side-rendering</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">. This way it’s possible to remove the AMP boilerplate so that the AMP document can be painted without running the AMP runtime JavaScript. For example, the server-side rendered version of the </span><a href="https://ampbyexample.com/boilerplate"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Boilerplate Generator</span></a> <a href="https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&amp;thumbSize=200&amp;ival=500&amp;end=visual"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">renders twice as fast</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> as the normal AMP version:</span></p><p></p><figure data-shortcode="caption" id="attachment_2180" class="wp-caption aligncenter amp-wp-inline-3d4b98a8b5cbbf093a12b4e3a24e2e3e"><amp-img class=" size-full wp-image-2180 aligncenter amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/10/blog-how-to-make-amp-faster-filmstrip.png?w=660" alt="blog-how-to-make-amp-faster-filmstrip" srcset="https://amphtml.files.wordpress.com/2018/10/blog-how-to-make-amp-faster-filmstrip.png?w=660 660w, https://amphtml.files.wordpress.com/2018/10/blog-how-to-make-amp-faster-filmstrip.png?w=1316 1316w, https://amphtml.files.wordpress.com/2018/10/blog-how-to-make-amp-faster-filmstrip.png?w=150 150w, https://amphtml.files.wordpress.com/2018/10/blog-how-to-make-amp-faster-filmstrip.png?w=300 300w, https://amphtml.files.wordpress.com/2018/10/blog-how-to-make-amp-faster-filmstrip.png?w=768 768w, https://amphtml.files.wordpress.com/2018/10/blog-how-to-make-amp-faster-filmstrip.png?w=1024 1024w" sizes="(min-width: 660px) 660px, 100vw" width="660" height="155"></amp-img><figcaption class="wp-caption-text"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Check out </span><a href="https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Optimizer</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> to learn how to optimize AMP documents on your server.</span></figcaption></figure><h2></h2><h2><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">What are the performance gains?</span></h2><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">To find out how optimizing affects loading performance I’ve created three different versions of the </span><a href="https://ampstart-iframes.firebaseapp.com/templates/e-commerce/landing.amp.html#amp=1"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Start Bike Shop template</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">’s landing page:</span></p><ol><li class="amp-wp-inline-b9bc28925ccea04474259c661e5c4e72">
<ol><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>No Images</b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">: to simulate the best case scenario where no visual content depends on the AMP runtime being loaded.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Images</b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">: to show loading times when content depends on the AMP runtime being loaded.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Self-hosted Font: <span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">to demonstrate the impact loading custom fonts.</span></b></li>
</ol></li>
</ol><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">For each page, I tested four different variants:</span></p><ol><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Original: </b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">the original valid AMP version.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Optimized: </b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">an optimized valid AMP version, which implements the following optimizations: </span>
<ol><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><a href="https://www.ampproject.org/docs/fundamentals/optimize_amp#optimize-the-amp-runtime-loading"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">optimizes runtime loading</span></a></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><a href="https://www.ampproject.org/docs/fundamentals/optimize_amp#preload-hero-images"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">preloads the hero image</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> (when applicable)</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><a href="https://www.ampproject.org/docs/fundamentals/optimize_amp#optimize-custom-fonts"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">optimizes custom fonts</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> (when applicable). </span></li>
</ol></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Optimized + SSR:</b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> implements the same optimizations as the previous version, but additionally uses </span><a href="https://www.ampproject.org/docs/fundamentals/optimize_amp#server-side-rendering"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">server-side-rendering</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> via </span><a href="https://github.com/ampproject/amp-toolbox/tree/master/optimizer"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Optimizer.</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> Note: this version is not valid AMP.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Cache: </b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">as a reference the version served by the Google AMP Cache.</span></li>
</ol><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">All tests are run three times by </span><a href="https://www.webpagetest.org/easy.php"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Webpagetest</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> in Chrome on a Motorola G (gen 4) on a 1.6 Mbps 3G connection with 300ms of latency. You can find the full results including links to Webpagetest in this </span><a href="https://docs.google.com/spreadsheets/d/1ISneUh6CcPimu2-XQKnH9ZaLwHmBZC2vCJThI53SdyI/edit?usp=sharing"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">doc</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">. As tests are run on a real device, execution times might vary.</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Now, let’s take a look at the results:</span></p><p> </p><h3><b>No Images</b><b></b></h3><table><tbody><tr><td></td>
<td><b>Load Time (s)</b></td>
<td></td>
<td><b>Start Render (s)</b></td>
<td></td>
<td><b>First Interactive (s)</b></td>
<td></td>
</tr><tr><td><b>Original</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.569</span></td>
<td></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.569</span></td>
<td></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.424</span></td>
<td></td>
</tr><tr><td><b>Optimized</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.564</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-0.11%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.564</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-0.11%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.423</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-0.02%</span></td>
</tr><tr><td><b>Optimized + SSR</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">2.233</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-51.13%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">2.233</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-51.13%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.48</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">1.27%</span></td>
</tr><tr><td><b>AMP Cache</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">2.039</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-55.37%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">2.039</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-55.37%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">3.508</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-20.71%</span></td>
</tr></tbody></table><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">The &gt;50% faster load times for the server-side rendered version clearly demonstrates the advantages of server-side rendering AMPs. However, time to interactive is unchanged as it still depends on the AMP runtime being loaded.</span></p><p> </p><h3><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Images </b></span></h3><table><tbody><tr><td></td>
<td><b>Load Time (s)</b></td>
<td></td>
<td><b>Start Render (s)</b></td>
<td></td>
<td><b>First Interactive (s)</b></td>
<td></td>
</tr><tr><td><b>Original</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">5.435</span></td>
<td></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.591</span></td>
<td></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">5.367</span></td>
<td></td>
</tr><tr><td><b>Optimized</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.591</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-15.53%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.566</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-0.54%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">5.094</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-5.09%</span></td>
</tr><tr><td><b>Optimized + SSR</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.095</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-24.66%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">1.892</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-58.79%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.818</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-10.23%</span></td>
</tr><tr><td><b>AMP Cache</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">3.827</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-29.59%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">1.834</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-60.05%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.13</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-23.05%</span></td>
</tr></tbody></table><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Here we can see that preloading images significantly improves load times. The valid optimized AMP version loads 15% faster, whereas the Optimized + SSR version “only” loads 24% faster. This is because image rendering depends on the AMP runtime being loaded.<br/></span></p><p> </p><h3><b>Self-hosted Font</b></h3><table><tbody><tr><td></td>
<td><b>Load Time (s)</b></td>
<td></td>
<td><b>Start Render (s)</b></td>
<td></td>
<td><b>First Interactive (s)</b></td>
<td></td>
</tr><tr><td><b>Original</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">5.509</span></td>
<td></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.609</span></td>
<td></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">5.424</span></td>
<td></td>
</tr><tr><td><b>Optimized</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.55</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-17.41%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.53</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-1.71%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">5.112</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-5.75%</span></td>
</tr><tr><td><b>Optimized + SSR</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.478</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-18.71%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">1.989</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-56.85%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">5.203</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-4.07%</span></td>
</tr><tr><td><b>AMP Cache</b></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">3.978</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-27.79%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">1.847</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-59.93%</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">4.317</span></td>
<td><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">-20.41%</span></td>
</tr></tbody></table><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">In this case, the overall load time difference between Optimized and Optimized + SSR becomes very small as the server-side rendered version is delayed by the additional font download. However, rendering still starts much faster with server-side-rendering.</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Note: the AMP Cache is faster in all cases. There are two main reasons: </span></p><ol><li><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> it performs additional image optimizations</span></li>
<li><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> it does not need to establish a second https connection to download the AMP runtimes as the runtime is served from the same domain.<br/></span></li>
</ol><p> </p><h2>Conclusion</h2><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">We’ve seen that it’s possible to make AMP pages load even faster on your own server. The key takeaways for everyone publishing AMP pages are: </span></p><ol><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Websites hosting paired AMPs should implement the recommendations in the </span><a href="https://www.ampproject.org/docs/fundamentals/optimize_amp"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP optimization guide</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> to ensure best loading performance from Twitter and other platforms linking to non-cached AMP documents. A few trivial changes can already mean that an AMP page loads 1 second faster.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Websites built with AMP should consider using </span><a href="https://github.com/ampproject/amp-toolbox/tree/master/optimizer"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP Optimizer</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> as it enables progressive rendering and greatly improve FCP times. </span></li>
</ol><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">We’re actively working on discovering new optimizations and improving the AMP loading experience.</span></p><p><em>Posted by Sebastian Benz, Partner Developer Advocate, Google</em></p>	</div>

	

</div>

