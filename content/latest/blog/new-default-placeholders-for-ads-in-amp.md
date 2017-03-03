---
class: post-blog post-detail
type: Blog
$title: New default placeholders for ads in AMP
id: new-default-placeholders-for-ads-in-amp
author: Vamsee Jasti
role:  Product Manager, AMP Project
origin: "https://amphtml.wordpress.com/2017/02/02/new-default-placeholders-for-ads-in-amp/amp/"
excerpt: "We want to share a somewhat small but visually impactful feature that we are planning to launch on AMP. Content loads incredibly fast on AMP pages, but traditional ads often load relatively slowly. This leaves blank areas on publisher pages, which is a poor reading experience for the user as it can feel like the [&#8230;]"
avatar: http://0.gravatar.com/avatar/0342fb9db5636638e886dff44d5ec94c?s=96&d=identicon&r=G
date_data: 2017-02-02T13:14:47-08:00
$date: February 2, 2017
$parent: /content/latest/list-blog.html

components:
  - social-share
---

<div class="amp-wp-article-content">
<p><span style="font-weight:400;">We want to share a somewhat small but visually impactful feature that we are planning to launch on AMP. </span></p>
<p>Content loads incredibly fast on AMP pages, but traditional ads often load relatively slowly. This leaves blank areas on publisher pages, which is a poor reading experience for the user as it can feel like the page is missing content.</p>
<p><span style="font-weight:400;">To deliver faster, lighter and more secure ads that are as fast as your AMP content, consider switching over to </span><a href="https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md" target="_blank">AMP Ads</a><span style="font-weight:400;">.</span></p>
<p><span style="font-weight:400;">In the meantime, in order to address the issue of blank ad spaces, we’ve added two default features to every ad placement on AMP pages. If an ad does not have a publisher-configured placeholder, AMP will automatically add:</span></p>
<ol>
<li style="font-weight:400;"><span style="font-weight:400;">A clearly marked “Ad” label</span></li>
<li style="font-weight:400;"><span style="font-weight:400;">A subtle loading animation at the top indicating that the ad is loading</span></li>
</ol>
<p style="text-align:center;"><img data-attachment-id="1006" data-permalink="https://amphtml.wordpress.com/2017/02/02/new-default-placeholders-for-ads-in-amp/fansided/" data-orig-file="https://amphtml.files.wordpress.com/2017/02/fansided.gif?w=660&#038;h=526" data-orig-size="660,526" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="fansided" data-image-description="" data-medium-file="https://amphtml.files.wordpress.com/2017/02/fansided.gif?w=660&#038;h=526?w=300" data-large-file="https://amphtml.files.wordpress.com/2017/02/fansided.gif?w=660&#038;h=526?w=660" class=" size-full wp-image-1006 aligncenter" src="https://amphtml.files.wordpress.com/2017/02/fansided.gif?w=660&#038;h=526" alt="fansided" width="660" height="526" /></p>
<p style="text-align:center;"><i><span style="font-weight:400;">The new default ad loading indicator and placeholder feature</span></i></p>
<p><span style="font-weight:400;">The clearly labeled placeholder allows the user to focus on the content and selectively shift their attention to ads. It also ensures that the user doesn’t think there</span><span style="font-weight:400;"> is missing content while the ad is loading.</span></p>
<p><img data-attachment-id="997" data-permalink="https://amphtml.wordpress.com/2017/02/02/new-default-placeholders-for-ads-in-amp/ad-animation/" data-orig-file="https://amphtml.files.wordpress.com/2017/02/ad-animation.gif?w=660" data-orig-size="480,82" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="ad-animation" data-image-description="" data-medium-file="https://amphtml.files.wordpress.com/2017/02/ad-animation.gif?w=660?w=300" data-large-file="https://amphtml.files.wordpress.com/2017/02/ad-animation.gif?w=660?w=480" class=" size-full wp-image-997 aligncenter" src="https://amphtml.files.wordpress.com/2017/02/ad-animation.gif?w=660" alt="ad-animation"   /></p>
<p style="text-align:center;"><span style="font-weight:400;">     </span><i><span style="font-weight:400;">  A close-up of the subtle loading indicator</span></i></p>
<p><span style="font-weight:400;">We realize this could be a breaking change for a few publishers who have already configured </span><a href="https://www.ampproject.org/docs/reference/components/amp-ad#placeholder" target="_blank">default placeholders </a><span style="font-weight:400;">o</span><span style="font-weight:400;">n</span> <span style="font-weight:400;">t</span><span style="font-weight:400;">h</span><span style="font-weight:400;">e</span><span style="font-weight:400;">i</span><span style="font-weight:400;">r</span> <span style="font-weight:400;">p</span><span style="font-weight:400;">a</span><span style="font-weight:400;">g</span><span style="font-weight:400;">e</span><span style="font-weight:400;">s</span><span style="font-weight:400;">, but these change come with significant user benefits described above. Publisher-configured placeholders will always retain full control over the ad loading experience.</span></p>
<p><span style="font-weight:400;">We recommend that you try out how this treatment fits with existing content by </span><a href="https://www.ampproject.org/docs/reference/experimental" target="_blank">opting into the AMP dev channel</a><span style="font-weight:400;"> and subscribing into the ‘amp-ad-loading-ux’ experiment. This change is planned for a production release on Thursday Feb 9th, 2017.</span></p>
<p><span style="font-weight:400;">We look forward to your </span><a href="https://github.com/ampproject/amphtml/issues/5918"><span style="font-weight:400;">feedback</span></a><span style="font-weight:400;">!</span></p>
<p><i><span style="font-weight:400;">Posted by Vamsee Jasti, Product Manager, AMP Project</span></i></p><br />  <a rel="nofollow" href="http://feeds.wordpress.com/1.0/gocomments/amphtml.wordpress.com/993/"><img alt="" border="0" src="http://feeds.wordpress.com/1.0/comments/amphtml.wordpress.com/993/" /></a> <img alt="" border="0" src="https://pixel.wp.com/b.gif?host=amphtml.wordpress.com&#038;blog=102788268&#038;post=993&#038;subd=amphtml&#038;ref=&#038;feed=1" width="1" height="1" />
</div>

