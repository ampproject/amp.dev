---
class: post-blog post-detail
type: Blog
$title: 'Title of Blog Post 1'
id: title-of-blog-post-1
author: 'Author 1'
role: 'Project Manager'
origin: https://amphtml.wordpress.com/2016/12/02/teads-brings-ampd-mobile-video-inventory-to-premium-publishers/amp/
excerpt: 'Today we are announcing a change to the domain scheme of the Google AMP Cache. Beginning soon, the Google AMP Cache will serve each site from its own subdomain of https://cdn.ampproject.org. This change will allow content served from the Google AMP Cache to be protected by the fundamental security model of the web: the HTML5 origin.'
avatar: https://secure.gravatar.com/avatar/0342fb9db5636638e886dff44d5ec94c?d=identicon&r=g
date_data: 2016-12-02T15:15:28+00:00
$date: December 2, 2016
$parent: /content/pages/list-blog.html
---

<div class="amp-wp-article-content">
  <p><em>The following was originally <a href="https://developers.googleblog.com/2016/12/amp-cache-updates.html">posted</a> on the Google Developers Blog by John Coiner, Software Engineer, Google.</em></p>
  <p>Today we are announcing a change to the domain scheme of the <a href="https://developers.google.com/amp/cache/overview?utm_campaign=product%20area_launch_ampcache_120516&amp;utm_source=gdev&amp;utm_medium=blog">Google AMP Cache</a>. Beginning soon, the Google AMP Cache will serve each site from its own subdomain of <code><a href="https://cdn.ampproject.org" rel="nofollow">https://cdn.ampproject.org</a></code>. This change will allow content served from the Google AMP Cache to be protected by the fundamental security model of the web: <a href="https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html">the HTML5 origin</a>.</p>
  <p>No immediate changes are required for most publishers of AMP documents. However, to benefit from the additional security, it is recommended that all AMP publishers update their <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md">CORS implementation</a> in preparation for the new Google AMP Cache URL scheme. The Google AMP Cache will continue to support existing URLs, but those URLs will eventually redirect to the new URL scheme.</p>
  <br>
  <h4>How subdomain names will be created on the Google AMP Cache</h4>
  <p>The subdomains created by the Google AMP Cache will be human-readable when character limits and technical specs allow, and will closely resemble the publisher’s own domain.</p>
  <p>When possible, the Google AMP Cache will create each subdomain by first converting the AMP document domain from IDN (punycode) to UTF-8. Every “-” (dash) will be replaced with “–“(2 dashes) and every “.” (dot) will be replaced with a “-” (dash). For example, <code>pub.com</code> will map to <code>pub-com.cdn.ampproject.org</code>. Where technical limitations prevent a human readable subdomain, a one-way hash will be used instead.</p>
  <br>
  <h4>Updates needed for hosts and service providers with remote endpoints</h4>
  <p>Due to the changes described above, CORS endpoints will begin seeing requests with new origins. The following updates will be required:</p>
  <ul><li><strong>Expand request acceptance to the new subdomain: </strong>Sites that currently only accept CORS requests from <code><a href="https://cdn.ampproject.org" rel="nofollow">https://cdn.ampproject.org</a></code> and the publisher’s own origins must update their systems to accept requests from <code>https://%5B<em>pub-com</em>].cdn.ampproject.org</code>, <code><a href="https://cdn.ampproject.org" rel="nofollow">https://cdn.ampproject.org</a></code>, and the AMP publisher’s own origins.</li>
  <li><strong>Tighten request acceptance for security: </strong>Sites that currently accept CORS requests from <code>https://*.ampproject.org</code> as described in the AMP <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md#cors-security-in-amp">spec</a>, can improve security by restricting acceptance to requests from <code>https://%5B<em>pub-com</em>].cdn.ampproject.org</code>, <code><a href="https://cdn.ampproject.org" rel="nofollow">https://cdn.ampproject.org</a></code>, and the AMP publisher’s own origins. Support for <code>https://*.ampproject.org</code> is no longer necessary.</li>
  <li><strong>Support for new subdomain pattern by ads, analytics, and other technology providers: </strong>Service providers such as analytics and ads vendors that have a CORS endpoint will also need to ensure that their systems accept requests from the Google AMP Cache’s subdomains (e.g.<code><a href="https://ampbyexample-com.cdn.ampproject.org" rel="nofollow">https://ampbyexample-com.cdn.ampproject.org</a></code>), in addition to their own hosts.</li>
  </ul><br><h4>Retrieving the Google AMP Cache URL</h4>
  <p>For platforms that display AMP documents and serve from the Google AMP Cache, the best way to retrieve Google AMP Cache URLs is to continue using the <a href="https://developers.google.com/amp/cache/reference/acceleratedmobilepageurl/rest/?utm_campaign=product%20area_launch_ampcache_120516&amp;utm_source=gdev&amp;utm_medium=blog">Google AMP Cache URL API</a>. The Google AMP Cache URL API will be updated in Q1 2017 to return the new cache URL scheme that includes the subdomain.</p>
  <p>You can use an interactive tool to find the Google AMP Cache subdomain generated for each site over at <a href="https://ampbyexample.com/advanced/using_the_google_amp_cache/">ampbyexample.com</a>.</p>
  <p><a href="https://ampbyexample.com/advanced/using_the_google_amp_cache/" target="_blank"><amp-img class="wp-image-875 aligncenter amp-wp-enforced-sizes -amp-element i-amphtml-layout-responsive i-amphtml-layout-size-defined i-amphtml-layout" src="https://amphtml.files.wordpress.com/2016/12/screen-shot-2016-12-05-at-3-55-53-pm.png?w=488&amp;h=59" alt="screen-shot-2016-12-05-at-3-55-53-pm" width="488" height="59" sizes="(min-width: 488px) 488px, 100vw" style="width: 488px;"><i-amphtml-sizer style="display: block; padding-top: 12.0902%;"></i-amphtml-sizer><img alt="screen-shot-2016-12-05-at-3-55-53-pm" class="-amp-fill-content -amp-replaced-content" src="https://amphtml.files.wordpress.com/2016/12/screen-shot-2016-12-05-at-3-55-53-pm.png?w=488&amp;h=59"></amp-img></a></p>
  <br>
  <h4>Timing and testing resources</h4>
  <p>Google Search is planning to begin using the new URL scheme as soon as possible and is monitoring sites’ compatibility.</p>
  <p>In addition, a developer testing sandbox is available at <strong><a href="https://g.co/ampdemo/cache">g.co/ampdemo/cache</a></strong> to help ensure a smooth transition. After making the updates described above, please use the sandbox to test accessing your site via Google Search. The sandbox loads AMP pages using the new domain scheme, so if you spot CORS-related errors in this configuration, these issues should be addressed to avoid errors when the domain scheme change is fully rolled out.</p>
</div>
