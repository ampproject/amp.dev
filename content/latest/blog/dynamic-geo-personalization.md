---
class: post-blog post-detail
type: Blog
$title: "Dynamic geo-personalization"
id: dynamic-geo-personalization
author: Eric Lindley
role:  AMP Product Manager
origin: "https://amphtml.wordpress.com/2018/05/03/dynamic-geo-personalization/amp/"
excerpt: "AMP documents are often served from a third-party cache; this means it’s not always clear how to support dynamic or personalized content. There are a range of components and techniques to achieve many of these use cases (amp-list, amp-state, amp-form, and amp-iframe just to name a few), but there are some common cases the AMP [&#8230;]"
avatar: http://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2018-05-03T13:54:36-04:00
$date: May 3, 2018
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
inlineCSS: .amp-wp-inline-329fdb7771c10d07df9eb73273c95a60{font-weight:400;}
---

<div class="amp-wp-article-content">

		<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP documents are often served from a third-party cache; this means it’s not always clear how to support dynamic or personalized content. There are a range of components and techniques to achieve many of these use cases (</span><a href="https://www.ampproject.org/docs/reference/components/amp-list"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-list</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, </span><a href="https://www.ampproject.org/docs/reference/components/amp-bind#state"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-state</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, </span><a href="https://www.ampproject.org/docs/reference/components/amp-form"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-form</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, and </span><a href="https://www.ampproject.org/docs/reference/components/amp-iframe"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-iframe</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> just to name a few), but there are some common cases the AMP team can make a lot easier.</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">In particular, businesses often want to vary content by the geographic location of the user. The best way to do this for pages in different languages is to use the </span><a href="https://ampbyexample.com/introduction/internationalization/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">hreflang attribute</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, but this isn’t the best solution for pages with just a small geo-dependent variation, like a promotion for a particular locale. This is why we’ve created the amp-geo component, which is ready for testing, and targeting a full release next week.</span></p><h1><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-geo</span></h1><p><a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-geo/amp-geo.md"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-geo</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> makes it easy to vary small sections of web content for users based on an approximation of the users’ country-level location, similar to the level of an </span><a href="https://www.iso.org/obp/ui/#search"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">ISO Country Code</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">. As a developer, there are just a few steps:</span></p><p>1. Include the amp-geo script</p><pre class="brush: xml; title: ; notranslate" title="">
In the document &lt;head&gt;:

&lt;script async custom-element="amp-geo" src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"&gt;&lt;/script&gt;
</pre><p>2. Include the amp-geo tag</p><pre class="brush: xml; title: ; notranslate" title="">
In the document &lt;body&gt;:

&lt;amp-geo layout=”nodisplay”&gt;&lt;/amp-geo&gt;
</pre><p>3. Mark up your document with CSS to alter content based on the user’s approximate location</p><pre class="brush: xml; title: ; notranslate" title="">
In the &lt;style amp-custom&gt; tag:

/* defaults */
.flag { background-image: "./starsandstripes.png"; }
/* override */
.amp-iso-country-ca .flag { background-image: "./mapleleaf.png"; }


In the document &lt;body&gt;:

&lt;div height=”300” width=”500” layout=”responsive” class=”flag”&gt;
&lt;/div&gt;
</pre><h1></h1><h1><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Groups in amp-geo</span></h1><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Here’s a slightly more advanced case, where you can take advantage of the grouping feature in amp-geo to vary an aspect of English dialect by geo.</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">1. As above, include the amp-geo script in theof your document</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">2. Instead of just including an empty amp-geo tag, configure ISOCountryGroups to reduce the amount of code you have to write to specify behaviors across multiple locales.</span></p><pre class="brush: xml; title: ; notranslate" title="">
In the document &lt;body&gt;:

&lt;amp-geo layout=”nodisplay”&gt;
  &lt;script type="application/json"&gt;
  {
    “ISOCountryGroups”: {
      "soccer": [ "au", "ca", "ie", "nz", "us", "za" ],
      "football": [ "unknown" ]
    }
  }
  &lt;/script&gt;
&lt;/amp-geo&gt;
</pre><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">3. As in the previous example, mark up the document with CSS to alter content based on the user’s approximate location</span></p><pre class="brush: xml; title: ; notranslate" title="">
In the &lt;style amp-custom&gt; tag:

/* defaults */
.football:after { content: 'football';}
/* override */
.amp-geo-group-soccer .football:after { content: 'soccer' }


In the document &lt;body&gt;:

&lt;div&gt;
The game is called &lt;span class='football'&gt;&lt;/span&gt;!
&lt;/div&gt;
</pre><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">If the user is in any of the locales configured for “soccer”, then the text will read “The game is called soccer!” Otherwise, the text will read “The game is called football!”</span></p><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">You can find another, more complex example at </span><a href="https://ampbyexample.com/components/amp-geo/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">AMP by Example</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, and learn about more extended capabilities of the feature in the </span><a href="https://www.ampproject.org/docs/reference/components/amp-geo"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">official documentation</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">; for instance, you can integrate amp-geo with your analytics through variable substitution, or use it in more complex interactions through amp-bind.</span></p><h1><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Try it out</span></h1><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">amp-geo is targeting a full production release next week, but as of today you can test it on your site and tell us what you think. You can </span><a href="https://github.com/ampproject/amphtml/issues/new"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">file bugs and requests in Github</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, and feel free to reach out and chat on Slack. We look forward to hearing from you!</span></p><p>Posted by Eric Lindley, AMP Product Manager</p>	</div>

	

</div>

