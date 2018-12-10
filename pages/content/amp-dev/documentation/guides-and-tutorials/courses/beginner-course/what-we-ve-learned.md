---
$title: What We’ve Learned
$order: 4
toc: true
---
[TOC]

## Conclusions about building with AMP components

Take a look at what you have built! It’s an engaging AMP webpage, with images, a carousel, video and even an embedded social media posts from other websites! Think of all the work we didn’t have to do, like contacting Twitter’s servers for specific tweets, converting the results into HTML tags and custom CSS, and writing it to the page. We didn’t have to write JavaScript that allowed us to keep track of what slide of our carousel we were on, or have to figure out how to wrap our carousel around from the last slide to the first slide. We got to focus on building the type of site that was effective for our Cheese Bike business.

As you have seen through this course and by browsing through the [AMP Components Reference](https://www.ampproject.org/docs/reference/components) in the previous section, there are AMP components for most of the common elements on modern web sites. Like we’ve been doing so far, we can often build full-featured sites with very little additional coding required, just by using these available components. 

However, using these components presents opportunities for us to have made a validation error in our AMP page. We should always check and verify that our page is a valid AMP page. Use the AMP Validator to make sure that your page still has no validation issues. If you have any issues, you can try to resolve them yourself. If all else fails, go back to each section and copy the given solutions to help eliminate the errors. It’s expected that if you’ve followed all the examples as they were presented, you should have no validation errors.

## The benefits of the AMP Cache

So far, we’ve mentioned that it’s important for our sites to have no AMP validation errors, and we’ve mentioned that AMP provides several performance optimizations beyond just the scripts that run on our page. The reason for this is the AMP Cache.

The AMP cache is a content-delivery network (CDN) that helps your users get quicker, more reliable access to your AMP content. This means that your pages are stored under a new URL belonging to an [AMP Cache provider](https://www.ampproject.org/docs/fundamentals/how_cached), which will serve your page faster. Additionally, pages that are stored in the AMP cache are processed through several additional automatic performance optimizations that improve the performance of your sites even more.

For your AMP page to be hosted in an [AMP Cache](https://developers.google.com/amp/cache/overview), it must pass validation. Making sure your AMP pages are valid is crucial to the optimization of your pages’ performance. After your site is deployed and discovered by the web crawlers that look for pages on behalf of search engines, AMP pages that have no validation errors are automatically discovered and cached by the AMP caching system. You don’t have to do anything to get these powerful performance optimizations! That’s the power of the AMP system!

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/courses/beginner-course/thinking-in-components.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/courses/beginner-course/what-comes-next.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>