---
class: post-blog post-detail
type: Blog
$title: 'Title of Blog Post 2'
id: title-of-blog-post-2
author: 'Author 2'
role: 'Project Manager'
origin: https://amphtml.wordpress.com/2016/12/02/teads-brings-ampd-mobile-video-inventory-to-premium-publishers/amp/
excerpt: 'Today we are announcing a change to the domain scheme of the Google AMP Cache. Beginning soon, the Google AMP Cache will serve each site from its own subdomain of https://cdn.ampproject.org. This change will allow content served from the Google AMP Cache to be protected by the fundamental security model of the web: the HTML5 origin.'
avatar: https://secure.gravatar.com/avatar/0342fb9db5636638e886dff44d5ec94c?d=identicon&r=g
date_data: 2016-11-02T15:15:28+00:00
$date: November 2, 2016
$parent: /content/latest/list-blog.html

components:
  - social-share
---

<div class="amp-wp-article-content">
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Whether you’re running an online news, travel, or e-commerce site, you’ve likely invested time in reviewing your site’s design and user journeys to make your experiences more useful to your users. Often this means running A/B-style experiments to learn which enhancements work best.&nbsp;To enable this in AMP, we’ve launched </span><a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-experiment/amp-experiment.md"><b>&lt;amp-experiment&gt;</b></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">, a new AMP component that allows you to conduct user experience experiments on an AMP page.</span></p>
<h3><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">How it works</span></h3>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">You can now design experiments and specify how much traffic to drive to specific variations. AMP handles the traffic diversion on the client side and provides a way to collect data with either </span><a href="https://www.ampproject.org/docs/reference/amp-pixel.html"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">&lt;amp-pixel&gt;</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> or </span><a href="https://www.ampproject.org/docs/reference/extended/amp-analytics.html"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">&lt;amp-analytics&gt;</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">.</span></p>
<p>There are three key steps to getting a content experiment set up on your AMP page:</p>
<ol><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Configure the experiment</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Implement variations</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Collect the data</span></li>
</ol><h4><i><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Configure the experiment</span></i></h4>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">&lt;amp-experiment&gt; is a new custom element that you use to specify all experiment behaviors via a JSON configuration. Here’s a code sample that configures an experiment called “recommendedLinksExperiment”:</span></p>
<pre class="brush: plain; title: ; notranslate" title="">
&lt;amp-experiment&gt;
&lt;script type=”application/json”&gt;
&nbsp; &nbsp; {
&nbsp; &nbsp; &nbsp; recommendedLinksExperiment: {
&nbsp; &nbsp; &nbsp; &nbsp; sticky: true,
&nbsp; &nbsp; &nbsp; &nbsp; variants: {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; shorterList: 25.0,
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; longerList: 25.0,
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; control: 50.0,
&nbsp; &nbsp; &nbsp; &nbsp; },
&nbsp; &nbsp; &nbsp; },
&nbsp; &nbsp; &nbsp; bExperiment: {...}
&nbsp; &nbsp; }
&nbsp; &lt;/script&gt;
&lt;/amp-experiment&gt;

</pre>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">The JSON configuration supports specifying the following attributes of one or several experiments:</span></p>
<ul><li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>Whether assignment to a given experiment is sticky</b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">: Should a given user always be assigned to the same experiment variants across pageviews? In the example above, the experiment is indeed sticky.</span></li>
<li class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"><b>How much traffic to expose to each variant of a given experiment</b><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">: Do you want a random 50% of users to see version A and 50% to see version B? What about 20% for each of versions A through E? In the sample above, we allocate 50% of users into the control experience and allocate 25% each into either an experience with a shorter list of recommendations or one with a longer list of recommendations.</span></li>
</ul><p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Please consult the </span><a href="https://www.ampproject.org/docs/reference/extended/amp-experiment.html#configuration"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">configuration documentation</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> for other advanced settings like experiment dependencies (groups) and employing a user notification constraint when using the sticky setting.</span></p>
<h4><i><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Implement the variations</span></i></h4>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Next up, you need to implement how each variant in each experiment should behave. &lt;amp-experiment&gt; will </span><a href="https://www.ampproject.org/docs/reference/extended/amp-experiment.html#style-a-variant"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">expose</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> an attribute on the &lt;body&gt; element for each variant the user has been assigned to. You can then use CSS to change styling or visibility to construct variants as you’d like users to experience them:</span></p>
<pre class="brush: plain; title: ; notranslate" title="">
body[amp-x-recommendedLinksExperiment=”control”] .extra-links {
display: none;
}

</pre>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">In the above example, the “control” variant of the </span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">recommendedLinksExperiment</span><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> is meant to not display (“display: none”) the extra links for building the longer recommendation list, as indicated by the class name “extra-links”. This behavior will give just the right list length that we want to test as the experimental control experience.</span></p>
<h4><i><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Collect the data</span></i></h4>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Finally, AMP takes the configuration and decides what variant to assign across all experiments and for all users. As users receive different experiences based on the experiment variants you’ve defined, you collect data so that you can measure the key metrics of interest such as button clicks or time spent.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">&lt;amp-experiment&gt; exposes a couple </span><a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-experiment/amp-experiment.md#reporting"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">new reporting features</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">. There is a new substitution variable called VARIANT that you can use to look up which experiment variants were assigned to a user on a given page view. If you’re running multiple experiments, you can use the VARIANTS variable to get the assigned variants across each defined experiment in a serialized format. You can use the combination of the user’s experiment combinations and the data indicating how they behaved during their visit to judge the success of each variant.</span></p>
<h3><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Try it out!</span></h3>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">The &lt;amp-experiment&gt; feature gives developers a handy tool to optimize their users’ experiences.</span></p>
<p><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Please read the </span><a href="https://www.ampproject.org/docs/reference/extended/amp-experiment.html#override-variant-allocation"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">documentation</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> for a full overview of features supported in this initial version and check out the </span><a href="https://ampbyexample.com/components/amp-experiment/"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">sample at AMP By Example</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">. Drop by GitHub and </span><a href="https://github.com/ampproject/amphtml/issues/new"><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">let us know</span></a><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60"> your feedback and any ideas you have to enhance amp-experiment to be even more useful for the content experiments you’d like to run.</span></p>
<p><i><span class="amp-wp-inline-329fdb7771c10d07df9eb73273c95a60">Posted by Rudy Galfi, Product Manager, AMP Project</span></i></p>
</div>
