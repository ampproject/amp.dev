---
class: post-blog post-detail
type: Blog
$title: Test amp-bind on your site with an origin trial
id: test-amp-bind-on-your-site-with-an-origin-trial
author: Eric Lindley
role:  Product Manager, AMP Project
origin: "https://amphtml.wordpress.com/2017/04/19/test-amp-bind-on-your-site-with-an-origin-trial/amp/"
excerpt: "All features in AMP need to be tested (that’s why we build things using experiments). However, particularly large, complex, and flexible features need a bit more attention. In particular, they need to be implemented end-to-end in real-world applications, for real users. That way, we can be sure that these features work well when they’re launched. [&#8230;]"
avatar: http://1.gravatar.com/avatar/42ecb1ea497ca9d0ffe1e406cae70e27?s=96&d=identicon&r=G
date_data: 2017-04-19T13:38:34-07:00
$date: April 19, 2017
$parent: /content/latest/list-blog.html
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
---

<div class="amp-wp-article-content">
<p><strong>All features in AMP need to be tested (that’s why we build things using </strong><a href="https://www.ampproject.org/docs/reference/experimental"><strong>experiments</strong></a><strong>). However, particularly large, complex, and flexible features need a bit more attention. In particular, they need to be implemented end-to-end in real-world applications, for real users. That way, we can be sure that these features work well when they’re launched.</strong></p>
<p><strong>We recently announced </strong><a href="https://www.ampproject.org/docs/reference/components/dynamic/amp-bind"><b>amp-bind</b></a><strong>, an </strong><a href="https://www.ampproject.org/docs/reference/experimental"><strong>experimental</strong></a><strong> data binding system that provides a more flexible, expansive way of supporting interactivity in AMP. Along with that flexibility comes a lot of complexity, unknowns, and the necessity to thoroughly test in order to make sure it works right from the start. For that reason, amp-bind stands to gain a lot from the ability to run in production, on websites where developers can implement with a real-world purpose. That’s why we’re setting up </strong><b>origin trials</b><strong> for amp-bind.</strong></p>
<p>&nbsp;</p>
<h2><strong>What is amp-bind?</strong></h2>
<p><strong>In short, </strong><a href="https://www.ampproject.org/docs/reference/components/dynamic/amp-bind"><strong>amp-bind</strong></a><strong> fundamentally changes the model for interactivity in AMP, while retaining AMP’s essential performance and UX assurances. amp-bind works more like a coding layer on top of AMP—going beyond the AMP Project’s historical approach of limiting interactivity to scoped, use-case-driven components like </strong><a href="https://www.ampproject.org/docs/reference/components/layout/amp-carousel"><strong>amp-carousel</strong></a><strong> and </strong><a href="https://www.ampproject.org/docs/reference/components/layout/amp-accordion"><strong>amp-accordion</strong></a><strong>. amp-bind links user actions with triggers for different document states, giving developers much more freedom in the types of interactions they can define.</strong></p>
<p><div class="wp-image   wp-image-1253 aligncenter"><amp-img layout='fixed' width="334" height="601" src="https://amphtml.files.wordpress.com/2017/04/product-detail-bind1.gif?w=334&#038;h=601"></amp-img></p>
<p><strong>To get an idea of what amp-bind can support on your AMP pages, check out some of its </strong><a href="https://ampbyexample.com/components/amp-bind/"><strong>basic behaviors</strong></a><strong>, such as how it can work together with an </strong><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind"><strong>image carousel</strong></a><strong>. You can also see how it can be integrated into a </strong><a href="https://ampbyexample.com/samples_templates/product/preview/"><strong>basic product detail page</strong></a><strong>.</strong></p>
<p>&nbsp;</p>
<h2><strong>What are origin trials?</strong></h2>
<p><strong>Origin trials (inspired by </strong><a href="https://github.com/jpchase/OriginTrials/blob/gh-pages/explainer.md"><strong>the Google Chrome team</strong></a><strong>) are useful when a feature is far enough along that it’s ready to be tested with real users, but some changes are still expected based on developer feedback.</strong></p>
<p><strong>Traditionally, a feature at this stage is put into </strong><a href="https://www.ampproject.org/docs/reference/experimental"><strong>experimental</strong></a><strong> mode, where developers can try it in development, but it won’t work in production yet. This can be useful, but developers won’t necessarily try something out unless they see immediate benefit, so it’s hard for them to justify putting work into something that won’t work in production.</strong></p>
<p><strong>Enter origin trials: interested developers can opt-in to a test where they can use a new feature in production, with the expectations a) that the test is for a limited time, and b) that the feature will likely undergo some changes after origin trials. Unlike Chrome origin trials, which restrict the experiment to a small percentage of users, amp-bind origin trials will enable the feature for every visitor visiting a whitelisted domain.</strong></p>
<p><strong>Origin trials are a great opportunity to try out a new feature before it&#8217;s fully live: you get to benefit immediately from the work you put into a feature (because the feature will be live on your site, rather than still guarded by an experiment), and </strong><a href="https://github.com/ampproject/amphtml/issues/new"><strong>your feedback</strong></a><strong> can directly influence the direction of the feature.</strong></p>
<p>&nbsp;</p>
<h2><strong>How to whitelist your site for origin trials with amp-bind</strong></h2>
<p><strong>Sign up </strong><a href="https://docs.google.com/a/google.com/forms/d/e/1FAIpQLSfGCAjUU4pDu84Sclw6wjGVDiFJhVr61pYTMehIt6ex4wmr1Q/viewform"><strong>here</strong></a><strong> to let us know you’re interested origin trials for amp-bind on your site, and we’ll get back to you with next steps. Note that we can whitelist only a limited number of domains for the feature, given the AMP team’s limited bandwidth for developer support.</strong></p>
<p><strong>As always, we want your </strong><a href="https://github.com/ampproject/amphtml/issues/new"><strong>feedback</strong></a><strong> for amp-bind—whether your site is whitelisted for origin trials, or if you’ve just checked out the documentation and samples. Once we have enough input from the AMP community, and have made any necessary changes, we’ll release the feature to production for all sites, regardless of their status with respect to origin trials. We’re looking forward to hearing from you, and to seeing a lot more interactivity in AMP!</strong></p>
<p><i><strong>Posted by Eric Lindley, Product Manager, AMP Project</strong></i></p><br />  
</div>

