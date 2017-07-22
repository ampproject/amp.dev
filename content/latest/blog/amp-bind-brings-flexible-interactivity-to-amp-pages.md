---
class: post-blog post-detail
type: Blog
$title: "amp-bind brings flexible interactivity to AMP pages"
id: amp-bind-brings-flexible-interactivity-to-amp-pages
author: Eric Lindley
role:  Product Manager, AMP Project
origin: "https://amphtml.wordpress.com/2017/07/12/amp-bind-brings-flexible-interactivity-to-amp-pages/amp/"
excerpt: "We invited developers to try out amp-bind in April to experiment with greater AMP page interactivity. Today we’d like to highlight that amp-bind is generally available and take a deeper dive into the feature, in order to give you a sense of just how much this expands AMP support—especially for e-commerce. What is amp-bind? We [&#8230;]"
avatar: http://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2017-07-12T12:02:25-07:00
$date: July 12, 2017
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
---

<div class="amp-wp-article-content">
<p><strong>We </strong><a href="https://amphtml.wordpress.com/2017/04/19/test-amp-bind-on-your-site-with-an-origin-trial/amp/"><strong>invited developers to try out</strong></a> <a href="https://www.ampproject.org/docs/reference/components/dynamic/amp-bind"><strong>amp-bind</strong></a><strong> in April to </strong><a href="https://www.ampproject.org/docs/reference/experimental"><strong>experiment</strong></a><strong> with greater AMP page interactivity. Today we’d like to highlight that </strong><b>amp-bind is generally available</b><strong> and take a deeper dive into the feature, in order to give you a sense of just how much this expands AMP support—especially for e-commerce.</strong></p>
<h2><strong>What is amp-bind?</strong></h2>
<p><strong>We introduced amp-bind </strong><a href="https://amphtml.wordpress.com/2017/04/19/test-amp-bind-on-your-site-with-an-origin-trial/amp/"><strong>in an April blog post</strong></a><strong> by saying:</strong></p>
<blockquote><p><a href="https://www.ampproject.org/docs/reference/components/dynamic/amp-bind"><strong>amp-bind</strong></a><strong> fundamentally changes the model for interactivity in AMP, while retaining AMP’s essential performance and UX assurances. amp-bind works more like a coding layer on top of AMP—going beyond the AMP Project’s historical approach of limiting interactivity to scoped, use-case-driven components like </strong><a href="https://www.ampproject.org/docs/reference/components/layout/amp-carousel"><strong>amp-carousel</strong></a><strong> and </strong><a href="https://www.ampproject.org/docs/reference/components/layout/amp-accordion"><strong>amp-accordion</strong></a><strong>. amp-bind links user actions with triggers for different document states, giving developers much more freedom in the types of interactions they can define.</strong></p></blockquote>
<p><strong>While this definition is technically accurate, it&#8217;s also pretty abstract. The feature is so flexible that a broad description doesn’t really reveal what it can actually do.</strong></p>
<h2><strong>What can amp-bind do?</strong></h2>
<p><strong>One good way to start is to take a look at some of the </strong><a href="https://ampbyexample.com/components/amp-bind/"><strong>basic behaviors</strong></a><strong> for the feature. After that, you can try it out yourself by tweaking some of the code in </strong><a href="https://ampbyexample.com/playground/#url=https%3A%2F%2Fampbyexample.com%2Fcomponents%2Famp-bind%2Fsource%2F"><strong>the AMP by Example playground</strong></a><strong>.</strong></p>
<p><strong>Building on what you’ve learned after mastering the basics, the examples below show you some of what’s possible when you combine amp-bind with other AMP HTML features.</strong></p>
<ul>
<li ><strong>Product color and size selection (<a href="#product-color-and-size-selection">detailed example below</a>)</strong></li>
<li ><strong>Server-side filter &amp; sort (<a href="#server-side-filter-and-sort">detailed example below</a>)</strong></li>
<li ><strong>Search results without page reload (<a href="#search-results-without-reload">detailed example below</a>)</strong></li>
<li ><strong>Search auto-suggest (<a href="#auto-suggest">detailed example below</a>)</strong></li>
<li ><strong>Carousel slide indicators (<a href="#slide-indicators">detailed example below</a>)</strong></li>
<li ><strong>Trigger navigation from &#8220;select&#8221; input</strong></li>
<li ><strong>Smart buttons that update the state of the entire page state based on “like”, “thumbs up”, “add to cart”, etc. Could reveal a carousel of personalized recommendations based on this action, increment number of items in cart or “like” count.</strong></li>
<li ><strong>Toggle between different views (list v. grid) of an array of items.</strong></li>
<li ><strong>Toggle overlaying UI panels to customize product options before purchase</strong></li>
<li ><strong>Hide/show tooltips</strong></li>
<li ><strong>Use custom sliders to filter amp-list data</strong></li>
<li ><strong>Change currency (e.g. from US dollars to euros) w/out updating the entire page</strong></li>
<li ><strong>And more!</strong></li>
</ul>
<h3 id="product-color-and-size-selection"><i><strong>Product color and size selection</strong></i></h3>
<p><div class="wp-image alignnone  wp-image-1474 aligncenter"><amp-img layout='fixed' width="348" height="623" src="https://amphtml.files.wordpress.com/2017/07/bind-product2.gif?w=348&#038;h=623"></amp-img></p>
<p><a href="https://ampbyexample.com/samples_templates/product_page/preview/"><strong>This example</strong></a><strong> incorporates a number of features that are commonly found on product detail pages, though these features could also be separated and used individually if you don’t need the entire interaction. Here, amp-bind coordinates events and actions between amp-form, amp-selector, amp-carousel, and some basic CSS.</strong></p>
<ol>
<li ><strong>User makes a selection in amp-form (with inputs using amp-selector for easy customization and clear semantics)</strong></li>
<li ><strong>There’s an event associated with each of these selections</strong></li>
<li ><strong>This event is coordinated through amp-bind to do a few things:</strong>
<ol>
<li ><strong>trigger CSS display of one of three different amp-carousels (one for each color of apple)</strong></li>
<li ><strong>trigger “disabled” attributes (and therefore style) on form inputs where a particular size isn’t available for a particular color apple</strong></li>
<li ><strong>trigger updates to the price, based on the color of the apple</strong></li>
</ol>
</li>
</ol>
<p><strong>Because the page uses amp-bind, the user has visual confirmation of their selections, so they have the best possible understanding of their purchase before submitting the form.</strong></p>
<h3 id="server-side-filter-and-sort" ><i><strong>Server-side filter &amp; sort</strong></i></h3>
<h3 ><div class="wp-image alignnone  wp-image-1477"><amp-img layout='fixed' width="327" height="570" src="https://amphtml.files.wordpress.com/2017/07/bind-filter-sort1.gif?w=327&#038;h=570"></amp-img></h3>
<p><a href="https://ampbyexample.com/samples_templates/product_browse_page/preview/"><strong>Sorting &amp; filtering with server-side data</strong></a><strong> is now possible through amp-list[src] binding. It uses amp-bind to coordinate events and actions between the &#8220;select&#8221; input and amp-list. Let’s take a look step by step:</strong></p>
<ol>
<li ><strong>User selects a sorting or filtering rule (let’s say “low to high”)</strong></li>
<li ><strong>There’s an event associated with changing the &#8220;select&#8221; input state</strong></li>
<li ><strong>This event is coordinated through amp-bind to trigger an update to an amp-list’s src attribute, appending a query param matching the sorting rule (?sort=price-ascending), which sends a call to the server</strong></li>
<li ><strong>The server responds with a list of results according to the sorting rule, which are rendered by amp-list according to its defined template</strong></li>
</ol>
<p><strong>Because bind events can be triggered by an array of inputs, you can use this basic pattern for many other features, like adding additional results via a “show more” button, or paginating list results, so users can explore additional items in a list without re-loading the parent page. Developers You could even implement an experience where users refresh a list of personalized recommendations.</strong></p>
<p><strong>Best practice: statically display results on first loading the page, using div[placeholder], so there is no delay before the results are displayed to the user. Then, when the user interacts with the sorting &amp; filtering mechanism, you can use amp-bind to issue a call through amp-list to an updated URL defined in the “src” attribute to display the results.</strong></p>
<h3 id="search-results-without-reload"><i><strong>Search results without page reload</strong></i></h3>
<p><div class="wp-image alignnone  wp-image-1479 aligncenter"><amp-img layout='fixed' width="332" height="665" src="https://amphtml.files.wordpress.com/2017/07/bind-auto-search1.gif?w=332&#038;h=665"></amp-img></p>
<p><strong>By </strong><a href="https://ampbyexample.com/samples_templates/product_browse_page/preview/"><strong>fetching and displaying search results inline without a full page reload</strong></a><strong>, users save bandwidth and can have a more seamless experience by retaining the context of the current page. The implementation approach is another application of binding to amp-list, this time using amp-form as well.</strong></p>
<ol>
<li ><strong>User searches for “pear” through amp-form</strong></li>
<li ><strong>The event triggered by this search is coordinated through amp-bind to trigger an update to amp-list’s src attribute, appending a query param matching the search query (?searchProduct=pear), which sends a call to the server</strong></li>
<li ><strong>The server responds with a list of results according to the search query, which are rendered by amp-list according to its defined template</strong></li>
</ol>
<h3 id="auto-suggest"><i><strong>Search auto-suggest</strong></i></h3>
<p><div class="wp-image alignnone  wp-image-1481 aligncenter"><amp-img layout='fixed' width="393" height="304" src="https://amphtml.files.wordpress.com/2017/07/bind-autosuggest1.gif?w=393&#038;h=304"></amp-img></p>
<p><strong>This one (</strong><a href="https://github.com/ampproject/amphtml/blob/master/examples/autosuggest.amp.html"><strong>code here</strong></a><strong>) adds a little bit more complexity to the amp-list[src] binding. It uses amp-bind to coordinate events and actions between amp-form and amp-list.</strong></p>
<ol>
<li ><strong>User starts typing in the search box</strong></li>
<li ><strong>There’s an event associated with text input into form fields (</strong><a href="https://css-tricks.com/the-difference-between-throttling-and-debouncing/"><strong>debounced</strong></a><strong>, to prevent these events from getting triggered with every button press)</strong></li>
<li ><strong>This event is coordinated through amp-bind to do two things:</strong>
<ol>
<li ><strong>trigger visibility on a hidden div containing amp-list</strong></li>
<li ><strong>trigger an update to that amp-list’s src attribute, which sends a call to the server containing the partial query that the user has typed into the form</strong></li>
</ol>
</li>
<li ><strong>The server responds with a list of potential results, based on this query, which amp-list renders through its template — and the user sees these options as auto-suggestions</strong></li>
<li ><strong>The amp-list template coordinates tapping on any one of these suggestions to update the form field, completing the interaction</strong></li>
</ol>
<p><strong>Note: remember to turn off the browser’s automatic auto-suggest if you’re building your own, to avoid overlaying two different UIs for this function at the same time</strong></p>
<p><strong>Take a look at </strong><a href="https://github.com/ampproject/amphtml/blob/master/examples/autosuggest.amp.html"><strong>the example on GitHub</strong></a><strong> to dive more into how this works. You can just copy-and-paste the example into your own page, and customize the template and your back end to serve just about anything: on one end of simplicity you could have more granular suggestions for words that the user could search for, and on the other you could display detail-rich cards for product results with prices, pictures, and ratings.</strong></p>
<h3 id="slide-indicators"><i><strong>Carousel slide indicators</strong></i></h3>
<p><div class="wp-image alignnone  wp-image-1485 aligncenter"><amp-img layout='fixed' width="318" height="612" src="https://amphtml.files.wordpress.com/2017/07/bind-carousel-indices2.gif?w=318&#038;h=612"></amp-img></p>
<p><strong>Here amp-bind is simply used to coordinate the index of amp-carousel with CSS styles on a simple page indicator (those four dots in the lower-left of the carousel).</strong></p>
<ol>
<li ><strong>User swipes the slide in the carousel</strong></li>
<li ><strong>There’s an event associated with the change of the visible slide</strong></li>
<li ><strong>This event is coordinated through amp-bind to trigger a change in CSS styles for the pagination dots</strong></li>
</ol>
<p><strong>This capability means that developers can configure a wide range of affordances to indicate that the carousel is swipeable, and don’t need to rely on the amp-carousel default arrows.</strong></p>
<h2><strong>What’s next?</strong></h2>
<p><strong>amp-bind is stable now, but it’s still actively getting more features. Based on feedback we’ve gotten from the community, we’re adding capabilities that make the component even more powerful—without sacrificing AMP’s essential performance and UX guarantees.</strong></p>
<p><strong>Among other things, the roadmap includes: updating URL query parameters and corresponding history state from bindings, to complete the sorting/filtering use-case; enabling messaging between iframes and their parent document, to enable rich interactions that cross the boundary between what can be inlined &amp; embedded in AMP; and updated bindings to coordinate page state with forms validated through server calls.</strong></p>
<h2><strong>Go forth! Explore! (and share what you find)</strong></h2>
<p><strong>In the end, developers out there will probably discover more new capabilities than what we’ve identified here on the AMP team. So go forth! Explore! Experiment with amp-bind and </strong><a href="https://groups.google.com/forum/#!forum/amphtml-discuss"><strong>let us know what you find</strong></a><strong>—we’d love to see what you’ve built, and share with the broader AMP community.</strong></p>
<p><strong>As always, we want your </strong><a href="https://github.com/ampproject/amphtml/issues/new"><strong>feedback</strong></a><strong> for amp-bind, and for any other feature you need support for in AMP. We’re looking forward to hearing from you!</strong></p>
<p><i><strong>Posted by Eric Lindley, Product Manager, AMP Project</strong></i></p><br />  
</div>

