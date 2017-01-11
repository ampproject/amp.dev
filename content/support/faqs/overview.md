---
$title: AMP Overview
$order: 0
$parent: /content/support/faqs.md
class: faqs

cta:
  title@: Next FAQ
  link_text@: Platform and Technology Company Involvement
  link_url: platform-involvement.html

faq:
  - section_title: Category One
    questions:
    - title: What is the Accelerated Mobile Pages project?
      answer: |
        The Accelerated Mobile Pages (“AMP”) Project is an open source initiative that came out of discussions between publishers and technology companies about the need to improve the entire mobile content ecosystem for everyone -- publishers, consumer platforms, creators, and users.

        Today, the expectation is that content should load super fast and be easy to explore. The reality is that content can take several seconds to load, or, because the user abandons the slow page, never fully loads at all. Accelerated Mobile Pages are web pages designed to load near instantaneously -- they are a step towards a better mobile web for all.
    - title: What are the benefits of Accelerated Mobile Pages?
      answer: |
        Speed matters and instant is the ideal. Research has shown higher bounce rates associated with slower-loading web pages. Using the AMP format will make it far more compelling for people to consume and engage with more content. But this isn’t just about speed and performance. We also want to promote enhanced distribution so that publishers can take advantage of the open web’s potential for their content to appear everywhere quickly -- across platforms and apps -- which can lead to more revenue via ads and subscriptions.
    - title: How do Accelerated Mobile Pages work?
      answer: |
        Accelerated Mobile Pages are just like any other HTML page, but with a limited set of allowed technical functionality that is defined and governed by the open source AMP spec. Just like all web pages, Accelerated Mobile Pages will load in any modern browser or app webview.

        AMP files take advantage of various technical and architectural approaches that prioritize speed to provide a faster experience for users. AMP developers can use a rich and growing library of web components that offer the ability to embed rich media objects like video and social posts, display advertising, or collect analytics. The goal is not to homogenize how content looks and feels, but instead to build a more common technical core between pages that speeds up load times.

        In addition, AMP files can be cached in the cloud in order to reduce the time content takes to get to a user’s mobile device. By using the AMP format, content producers are making the content in AMP files available to be cached by third parties. Under this type of framework, publishers continue to control their content, but platforms can easily cache or mirror the content for optimal delivery speed to users. Google has provided the [Google AMP Cache](https://developers.google.com/amp/cache/) that can be used by anyone at no cost, and all AMPs will be cached by the Google AMP Cache. Other companies may build their own AMP cache as well.

        In summary, the goal is that the combination of limited technical functionality with a distribution system built around caching will lead to better performing pages, and increased audience development for publishers.
    - title: Why does the Accelerated Mobile Pages Project take an open source approach?
      answer: |
        The companies involved in the project want to make the mobile web work better for all -- not just for one platform, one set of technologies, or one set of publishers. Making the project open source enables people to share and contribute their ideas and code for making the mobile web fast. We are just at the beginning of that journey and we look forward to other publishers and technology companies joining along the way.
  - section_title: Category Two
    questions:
    - title: Who can use Accelerated Mobile Pages?
      answer: |
        The project is open to all players in the ecosystem - publishers, consumer platforms, and creators. To get an idea who some of the companies and sites are who use AMP, head to the [Who page](/who).
    - title: What are the consequences of using Accelerated Mobile Pages?
      answer: |
        By using the AMP format, content producers are making the content in AMP files available to be crawled, indexed & displayed (subject to the robots exclusion protocol) and cached by third parties.
    - title: What type of content works best using Accelerated Mobile Pages?
      answer: |
        The goal is for all published content, from news stories to videos and from blogs to photographs and GIFs, to work using Accelerated Mobile Pages.
  - section_title: Category Three
    questions:
    - title: As a publisher, does making my content work for Accelerated Mobile Pages entail more work?
      answer: |
        In short, not much. Since “AMP HTML” is built entirely out of existing web technologies, the development process mirrors the one publishers are already using today. Publishers can familiarize themselves with the AMP HTML specification on GitHub. For those used to the current process, we don’t expect a significant learning curve.
    - title: How can a publisher get content into AMP HTML?
      answer: |
        Publishers and Content Management System (CMS) providers can develop an integration with their CMS to generate AMP content. Automattic has already published a [WordPress AMP plugin](https://wordpress.org/plugins/amp/) and we hope that all content management systems will add support for AMP HTML pages.

---

{% include "views/partials/faq-accordion.html" %}
