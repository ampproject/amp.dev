---
$title: AMP Overview
$order: 0
$parent: /content/support/faqs.md
class: faqs

cta:
  title: Next FAQ
  link_text: Platform and Technology Company Involvement
  link_url: /content/support/faqs/platform-involvement.md

faq:
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
  - title: Who can use Accelerated Mobile Pages?
    answer: |
      The project is open to all players in the ecosystem - publishers, consumer platforms, and creators. To get an idea who some of the companies and sites are who use AMP, head to the [Who page](/support/faqs/supported-platforms.html).
  - title: What are the consequences of using Accelerated Mobile Pages?
    answer: |
      By using the AMP format, content producers are making the content in AMP files available to be crawled, indexed & displayed (subject to the robots exclusion protocol) and cached by third parties.
  - title: As a publisher, what responsibilities do I have when using Accelerated Mobile Pages?
    answer: |
      If a publisher collects data from users who view its AMP pages, such data collection is governed by the publisher’s privacy policy.  It is the publisher’s responsibility to disclose its privacy policy, ideally by including a link to it within each of the publisher’s AMP pages.

      Furthermore, the laws in many jurisdictions, such as in the European Union, require a publisher to give visitors information about cookies and other forms of local storage used on the publisher’s web pages (including AMP pages). In many cases, these laws also require that the publisher obtain consent.  It is the publisher’s responsibility to determine, based on its use of cookies, what type of notice would be appropriate.  Additional information and tools for generating cookie notices can be found at www.cookiechoices.org.  Note that the AMP component [amp-user-notification](/docs/reference/components/amp-user-notification.html) provides a way to display a dismissable notification to the user.

      If an AMP page is shown within a viewer on a third party platform, such as a Google AMP Viewer on Google Search, the viewer may be a hybrid environment in which the AMP publisher and the third party platform may each collect data about the user.  In such a case, data collection by each party is governed by that party’s privacy policy (i.e., in a hybrid viewer environment, data collected by the AMP publisher is governed by its privacy policy and data collected by the third party platform is governed by the platform’s privacy policy).  It is each party’s responsibility to disclose its privacy policy and comply with relevant data regulations, including European laws relating to its use of cookies.
  - title: What type of content works best using Accelerated Mobile Pages?
    answer: |
      The goal is for all published content, from news stories to videos and from blogs to photographs and GIFs, to work using Accelerated Mobile Pages.
  - title: As a publisher, does making my content work for Accelerated Mobile Pages entail more work?
    answer: |
      In short, not much. Since “AMP HTML” is built entirely out of existing web technologies, the development process mirrors the one publishers are already using today. Publishers can familiarize themselves with the [AMP HTML specification](/docs/reference/spec.html) on GitHub. For those used to the current process, we don’t expect a significant learning curve.
  - title: How can a publisher get content into AMP HTML?
    answer: |
      Publishers and Content Management System (CMS) providers can develop an integration with their CMS to generate AMP content. Automattic has already published a [WordPress AMP plugin](https://wordpress.org/plugins/amp/) and we hope that all content management systems will add support for AMP HTML pages.
  - title: Is AMP only for mobile?  
    answer: |
      AMP was designed with responsiveness in mind, to work across *all* screen sizes.  However, some features for third-party platforms (e.g., Google's Top Stories carousel) may only be designed for the mobile experience.  Check with the third-party platform for how they use AMP.  For more information about mobile and desktop AMP pages, see Paul Bakaus' blog post on [About that ‘mobile’ in Accelerated Mobile Pages](https://paulbakaus.com/2016/07/01/about-that-mobile-in-accelerated-mobile-pages/).

---

