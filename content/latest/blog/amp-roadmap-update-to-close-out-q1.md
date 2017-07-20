---
class: post-blog post-detail
type: Blog
$title: AMP Roadmap update to close out Q1
id: amp-roadmap-update-to-close-out-q1
author: Rudy Galfi
role:  Product Manager, AMP Project
origin: "https://amphtml.wordpress.com/2017/03/31/amp-roadmap-update-to-close-out-q1/amp/"
excerpt: "We’ve updated the AMP Roadmap to reflect some of the progress made in the first quarter of 2017. You can read more about some of the highlights below. Format We continue to place a big focus on making the AMP format conducive to more interactive and engaging user experiences. We’ve made amp-bind, a flexible event [&#8230;]"
avatar: http://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2017-03-31T14:55:48-07:00
$date: March 31, 2017
$parent: /content/latest/list-blog.html

components:
  - social-share
---

<div class="amp-wp-article-content">
<p><strong>We’ve updated the </strong><a href="https://www.ampproject.org/roadmap/"><strong>AMP Roadmap</strong></a><strong> to reflect some of the progress made in the first quarter of 2017. You can read more about some of the highlights below.</strong></p>
<h2><strong>Format</strong></h2>
<p><strong>We continue to place a big focus on making the AMP format conducive to more interactive and engaging user experiences. We’ve made </strong><a href="https://www.ampproject.org/docs/reference/components/dynamic/amp-bind"><strong>amp-bind</strong></a><strong>, a flexible event binding system that enables vastly more interactivity in AMP, available in an experimental beta release. This means you can test out some of the </strong><a href="https://ampbyexample.com/components/amp-bind/"><strong>basic behaviors of amp-bind</strong></a><strong>, such as how it can work together with an </strong><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind"><strong>image carousel</strong></a><strong>—but amp-bind won’t yet be valid for use in production AMP pages until its launch, which is targeted for later this quarter. </strong></p>
<p><strong>We’re also working on scroll-dependent interactions</strong><strong>. We’ve started by directly addressing two concrete use cases: </strong><a href="https://github.com/ampproject/amphtml/issues/1443"><strong>parallax scrolling</strong></a><strong> and </strong><a href="https://github.com/ampproject/amphtml/issues/8268"><strong>contextually-displayed headers</strong></a><strong>. In addition, we&#8217;re working on a general, flexible framework for <a href="https://github.com/ampproject/amphtml/issues/8411">scroll-bound animations</a>.</strong></p>
<p><strong>Finally, earlier this month we launched </strong><a href="https://ampstart.com"><strong>AMP Start</strong></a><strong>, a collection of quick-start code templates and components, intended to give developers and designers the tools to create great-looking AMP sites quickly and easily. In the coming weeks we’ll be working on ways to make it easier to use and configure these pages without having to edit the code directly.</strong></p>
<p>&nbsp;</p>
<h2><strong>Ads</strong></h2>
<p><strong>We’ve made an </strong><a href="https://github.com/ampproject/amphtml/issues/6597"><strong>update</strong></a><strong> to sticky ads by removing the restriction to load the ad only after the first viewport &#8211; this should boost viewability. We’re hopeful this change can also drive greater monetization due to the viewability increase for your sticky ads implementation. We’ve also updated the </strong><a href="https://github.com/ampproject/amphtml/issues/6184"><strong>sticky ad to collapse</strong></a><strong> when there are no ad fills instead of displaying an empty container.</strong></p>
<p><strong>In addition, this quarter we reached the milestone of </strong><a href="https://www.ampproject.org/docs/reference/components/ads/amp-ad#supported-ad-networks"><strong>100 ad networks</strong></a> supporting AMP<strong>. To help these ad networks serve AMP ads, Cloudflare has launched an </strong><a href="https://github.com/ampproject/amphtml/issues/7351"><strong>ad network implementation</strong></a><strong> that makes it easy for any ad network to serve them. In addition, Cloudflare launched </strong><a href="https://blog.cloudflare.com/firebolt/"><strong>Firebolt</strong></a><strong>, a suite of services that makes it easy for publishers and ad networks to serve AMP ads.</strong></p>
<p><strong>We’ve launched support for </strong><a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-call-tracking/amp-call-tracking.md"><strong>dynamic call tracking</strong></a><strong>, which is typically used in ad landing pages for identifying ad attribution.</strong></p>
<p><strong>In the next quarter, we’re working on performance improvements to non-AMP ads being served to AMP pages. In addition, we’ll also be working on serving AMP ads to non-AMP pages.</strong></p>
<p>&nbsp;</p>
<h2><strong>Analytics</strong></h2>
<p><strong>We expanded support for variable substitutions, notably Client ID, to </strong><a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#variable-substitution-in-links"><strong>links</strong></a><strong> and </strong><a href="https://www.ampproject.org/docs/reference/components/dynamic/amp-form#variable-substitutions"><strong>forms</strong></a><strong>. The former can be used to </strong><a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md#task-5-using-client-id-in-linking-and-form-submission"><strong>manage user state</strong></a><strong> involving multi-page sessions. The latter is useful to build add-to-cart flows for e-commerce.</strong></p>
<p><strong>We also completed a </strong><a href="https://github.com/ampproject/amphtml/issues/5697"><strong>migration to Intersection Observer</strong></a><strong> to support visibility features. You’ll hopefully notice no changes as a result of this migration. It does, however, shift AMP analytics toward a highly respected approach for measuring element viewability. We also introduced a new trigger, </strong><a href="https://www.ampproject.org/docs/reference/components/ads/amp-analytics#initial-load-trigger"><strong>“ini-load”</strong></a><strong>, which is triggered when the initial contents of an AMP element or an AMP document have been loaded. In contrast to the document-level “visible” trigger that has long been available, “ini-load” used at the document level will not fire until all of the content elements visible in the viewport are also loaded. This is helpful to support AMP Ad–related features and offers a different way to measure engagement based on actual content visibility. </strong></p>
<p><strong>Finally, we’ve started a project that will enable extensions to </strong><a href="https://github.com/ampproject/amphtml/issues/6417"><strong>take advantage of amp-analytics to report data to extension authors</strong></a><strong> so that extension authors have greater visibility into how their extensions are performing.</strong></p>
<p><strong>* * *</strong></p>
<p><strong>Thanks to the AMP development community for your work and feedback. As always, please </strong><a href="https://groups.google.com/forum/#!forum/amphtml-discuss"><strong>let us know</strong></a><strong> if you have any issues or feature requests.</strong></p>
<p><i><strong>Posted by Rudy Galfi, Product Manager, AMP Project</strong></i></p><br />  
</div>

