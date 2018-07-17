---
class: post-blog post-detail
type: Blog
$title: "Faster ads with ‘Render on Idle’"
id: ads-faster-ads-with-render-on-idle
author: Keith Wright
role:  Technical Lead, AMP Project
origin: "https://amphtml.wordpress.com/2018/03/05/faster-ads-with-render-on-idle/amp/"
excerpt: "We’ve launched a new feature called “Render on Idle” now available for publishers using the DoubleClick AMP ad tag, and any ad network choosing to implement Fast Fetch can also take advantage of it. With Render on Idle, ads load 12 viewports from the user’s scroll position (as opposed to 3) when the browser is [&#8230;]"
avatar: https://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2018-03-05T10:41:06-08:00
$date: March 5, 2018
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
inlineCSS: .amp-wp-inline-329fdb7771c10d07df9eb73273c95a60{font-weight:400;}
---

<div class="amp-wp-article-content">

		<p>We’ve launched a new feature called “<a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad-network-doubleclick-impl/amp-ad-network-doubleclick-impl-internal.md#render-on-idle">Render on Idle</a>” now available for publishers using the DoubleClick AMP ad tag, and any ad network choosing to implement Fast Fetch can also take advantage of it. With Render on Idle, ads load 12 viewports from the user’s scroll position (as opposed to 3) when the browser is idle, no other page content is being retrieved or rendered. This delivers better ad performance by loading ads earlier in the page lifecycle.</p><p>In early tests with publishers using DoubleClick AMP ad tags, we’ve seen a 13% increase in impressions per page (giving Fast Fetch an overall +18% increase compared to Delayed Fetch) and 0.5% increase in clicks and viewable queries from this feature.</p><p><amp-img class="alignnone size-full wp-image-1968 amp-wp-enforced-sizes" src="https://amphtml.files.wordpress.com/2018/03/render_on_idle.png?w=660" alt="Render_On_Idle" srcset="https://amphtml.files.wordpress.com/2018/03/render_on_idle.png?w=660 660w, https://amphtml.files.wordpress.com/2018/03/render_on_idle.png?w=150 150w, https://amphtml.files.wordpress.com/2018/03/render_on_idle.png?w=300 300w, https://amphtml.files.wordpress.com/2018/03/render_on_idle.png?w=768 768w, https://amphtml.files.wordpress.com/2018/03/render_on_idle.png 831w" sizes="(min-width: 660px) 660px, 100vw" width="660" height="376"></amp-img>Fast Fetch is AMP’s way to make ad requests earlier in the page lifecycle, ensuring a great user experience and better ad performance by reducing the likelihood of encountering an empty ad slot. When Fast Fetch was launched in Aug 2017, we saw some <a href="https://www.ampproject.org/latest/blog/even-faster-loading-ads-in-amp/">significant increases</a> in impressions and viewability for ad networks that adopted it.</p><h3>If you’re an ad network:</h3><p>Consider migrating from Delayed Fetch to Fast Fetch to receive these benefits. See instructions <a href="https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md">here</a>.</p><h3>If you’re a publisher:</h3><p>Most publishers won’t have to do anything and will automatically reap the benefits of using a Fast Fetch-enabled ad tag. However; there are a few exceptions that cause the AMP runtime to automatically fall back to delayed Fetch. The table below lists these exceptions and the mitigations that allow a publisher to take advantage of Fast Fetch. Note that Delayed Fetch will not be supported after 3/29/2018; please see this GitHub <a href="https://github.com/ampproject/amphtml/issues/11834">issue</a> for more information.</p><p>In summary, if you are using remote.html for any reason, switch to using Real-Time Config (<a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md">Instructions</a>).</p><p>If you are using  ‘useSameDomainRenderingUntilDeprecated’ in amp-ad, then remove this attribute your tags and instead, use the SafeFrame API, which is now exposed to ads on AMP pages (<a href="https://support.google.com/dfp_premium/answer/6023110">Help Center Article</a>).</p><p>As always, we look forward to your feedback or questions.</p><p><i><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Posted by Keith Wright, Technical Lead, AMP Project</span></i></p>	</div>

	

</div>

