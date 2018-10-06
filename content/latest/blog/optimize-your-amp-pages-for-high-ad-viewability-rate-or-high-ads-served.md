---
class: post-blog post-detail
type: Blog
$title: "Optimize your AMP pages for high ad viewability rate or high ads served"
id: optimize-your-amp-pages-for-high-ad-viewability-rate-or-high-ads-served
author: amphtml
role: 
origin: "https://amphtml.wordpress.com/2018/09/24/optimize-your-amp-pages-for-high-ad-viewability-rate-or-high-ads-served/amp/"
excerpt: "Editor’s note: The following was originally posted on Medium by Vamsee Jasti, AMP Product Manager at Google. This post is part of a larger AMP monetization series. I’m endlessly fascinated that an advertiser would pay for an ad impression that a user never saw. Yet, that’s how most default ad contracts are written. Many brands are changing how they negotiate [&#8230;]"
avatar: https://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2018-09-24T12:27:38-07:00
$date: September 24, 2018
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
inlineCSS: .amp-wp-inline-660a4eb3b3f27841502afb34c9530dcc{max-width:1440px;}
---

<div class="amp-wp-article-content">

		<p><em>Editor’s note: The following was <a href="https://medium.com/ampfuel/optimize-your-amp-pages-for-high-ad-viewability-rate-or-high-ads-served-311f6b539c73">originally posted on Medium</a> by Vamsee Jasti, AMP Product Manager at Google. <em class="markup--em markup--p-em">This post is part of a larger <a href="https://medium.com/ampfuel">AMP monetization series</a></em><em class="markup--em markup--p-em">.</em></em></p><p>I’m endlessly fascinated that an advertiser would pay for an ad impression that a user never saw. Yet, that’s how most default ad contracts are written. Many brands are <a class="markup--anchor markup--p-anchor" href="https://www.adweek.com/digital/brands-with-their-own-viewability-standards-are-causing-headaches-for-the-ad-tech-industry/" target="_blank" rel="noopener nofollow">changing</a> how they negotiate contracts or <a class="markup--anchor markup--p-anchor" href="https://www.campaignlive.co.uk/article/group-m-rolls-viewability-standards-globally/1442325" target="_blank" rel="noopener nofollow">redefining</a> what they’d consider viewable. Plus the terminology itself can be <a class="markup--anchor markup--p-anchor" href="https://github.com/ampproject/docs/issues/667" target="_blank" rel="noopener nofollow">confusing</a>.</p><figure class="wp-caption aligncenter amp-wp-inline-660a4eb3b3f27841502afb34c9530dcc"><amp-img class=" aligncenter amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/09/80ec1-13qpexnqlpxfibk8ymifalq.jpeg?w=1440&amp;h=1001" width="1440" height="1001" sizes="(min-width: 660px) 660px, 100vw"></amp-img><figcaption class="wp-caption-text">Balancing page viewability rate with ad served</figcaption></figure><p id="48e9" class="graf graf--p graf-after--figure">Viewability rate (also known as viewability %) is defined as (number of ads viewed / total number of ads served) X 100. Depending on the advertisers it works with, a publisher uniquely configures its site for higher viewability rate or for increasing the number of ads served since they are inversely correlated.</p><p id="159e" class="graf graf--p graf-after--p"><strong class="markup--strong markup--p-strong">In AMP, tweaking your pages to drive higher viewability rate or views is easy for publishers using the ‘data-loading-strategy’ attribute on the `amp-ad` component.</strong></p><h3 id="b9d2" class="graf graf--h3 graf-after--p">Data Loading Strategy on amp-ad</h3><p id="5439" class="graf graf--p graf-after--h3">The data loading strategy attribute takes a float value between [0,3]. The value represents the number of viewports between the user and the ad on the page. The smaller the number, the longer the runtime will wait to make the ad request and vice versa. If you are a publisher that wants to increase viewability rate, then you’d keep this value to be as small as possible and if you set this to a larger value (e.g. 3), you are instructing the runtime to start loading the ad as long as it’s within 3 viewports of the user’s location on the page.</p><pre id="b12a" class="graf graf--pre graf-after--p">&lt;amp-ad width="300"
  height="250"
  type="a9"
  data-loading-strategy=1
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"&gt;
&lt;/amp-ad&gt;</pre><p>If a publisher doesn’t configure this value or the value is set to ‘prefer-viewability-over-views’, then the runtime sets the float value to a default value of 1.25, which is the tried and tested value to deliver a high viewability rate without drastically impacting the total ads served.</p><pre id="58a1" class="graf graf--pre graf-after--p">data-loading-strategy="prefer-viewability-over-views"</pre><h3 id="113b" class="graf graf--h3 graf-after--pre">Effect of Render on Idle</h3><p id="3604" class="graf graf--p graf-after--h3">Last year, the DoubleClick Fast Fetch extension introduced a mechanism called ‘<a class="markup--anchor markup--p-anchor" href="https://www.ampproject.org/latest/blog/faster-ads-with-render-on-idle/" target="_blank" rel="nofollow noopener">Render on Idle</a>’ where the runtime would start to request ads that were very far below the viewport if the runtime detected that it was done loading all other components on the page and was idle. As a result, this would lead to a drop in viewability rate but would increase the number of ads served improving the chances of an loading in time for the user to view it. Therefore, note that if you configure ‘data-load-strategy’, then render on idle would be disabled on the page.</p><p id="1b6a" class="graf graf--p graf-after--p"><strong class="markup--strong markup--p-strong">As the industry makes its shift towards compensating for viewability vs views, publishers can easily configure and test different strategies for ad loading by changing a </strong><a class="markup--anchor markup--p-anchor" href="https://www.ampproject.org/docs/reference/components/amp-ad#data-loading-strategy-%28optional%29" target="_blank" rel="nofollow noopener"><strong class="markup--strong markup--p-strong">single line of code</strong></a><strong class="markup--strong markup--p-strong"> on AMP pages</strong>.</p><p id="8c6d" class="graf graf--p graf-after--p graf--trailing">Publishers can even consider configuration at the CMS level for additional flexibility.</p><p><span>Thanks to</span> <a class="link u-baseColor--link" href="https://medium.com/@rudygalfi?source=post_page">Rudy Galfi</a> and <a class="link u-baseColor--link" href="https://medium.com/@maggieshiels?source=post_page">Maggie Shiels</a> for this post.</p>	</div>

	

</div>

