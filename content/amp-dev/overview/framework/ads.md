---
$title: What is AMP for ads
$view: /views/overview/overview-framework.j2
$titles:
  header: Framework
sub_navigation:
  - /content/amp-dev/overview/framework/ads.md
  - /content/amp-dev/overview/benefits/ads.md
---
[stage color="purple"]
<amp-img src="/static/img/stage_placeholder.png" height="1500" width="1450" layout="responsive" />

## What is AMP?
# AMP is a web component framework to easily create user first
[destination-switch type="selected" selected="ads"]
- [ads](/content/amp-dev/overview/framework/ads.md)
- [websites](/content/amp-dev/overview/framework/websites.md)
- [stories](/content/amp-dev/overview/framework/stories.md)
- [e-mails](/content/amp-dev/overview/framework/emails.md)
- [overview](/content/amp-dev/overview/framework/overview.md)
[/destination-switch]
[/stage]

[bevel]


<section class="main intro">
  [video]
  [](https://www.youtube.com/watch?v=9Cfxm7cikMY)
  [/video]

  <div class="intro">
    <p>These days, if it isn’t instant – its not fast enough. Even the most memorable creative won’t serve its purpose if the ad is slow and disruptive for a user. AMP is fundamentally changing the way ads are built, delivered and measured on the web, making them faster and minimizing disruptions for users. This increases viewability and click-through rates to improve monetization, making everyone happy: users, publishers and advertisers alike.</p>
  </div>
</section>

<section class="main kpi-grid">
  <div class="ad-o-teaser-grid">
    <div class="ad-o-teaser-grid-list ad-o-teaser-grid-list-count-3">

      <div class="ad-m-kpi ad-m-kpi-fluid ad-m-kpi-ads">
        <div class="ad-m-kpi-content">
          {% do doc.icons.useIcon('icons/bookmark.svg') %}
          <div class="ad-a-ico ad-m-kpi-icon">
            <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bookmark"></use></svg>
          </div>
          <span class="ad-m-kpi-number">3x</span>
          <span class="ad-m-kpi-text">lighter - Boost performance </span>
        </div>
      </div>

      <div class="ad-m-kpi ad-m-kpi-fluid ad-m-kpi-ads">
        <div class="ad-m-kpi-content">
          {% do doc.icons.useIcon('icons/bookmark.svg') %}
          <div class="ad-a-ico ad-m-kpi-icon">
            <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bookmark"></use></svg>
          </div>
          <span class="ad-m-kpi-number">6x</span>
          <span class="ad-m-kpi-text">fast - amplify your impact</span>
        </div>
      </div>

      <div class="ad-m-kpi ad-m-kpi-fluid ad-m-kpi-ads">
        <div class="ad-m-kpi-content">
          {% do doc.icons.useIcon('icons/bookmark.svg') %}
          <div class="ad-a-ico ad-m-kpi-icon">
            <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bookmark"></use></svg>
          </div>
          <span class="ad-m-kpi-number">13%</span>
          <span class="ad-m-kpi-text">more viewable - maximize your revenue</span>
        </div>
      </div>

    </div>
  </div>
</section>
{% do doc.styles.addCssFile('css/components/molecules/kpi.css') %}


<section class="main copy">
  <h1>A faster way to grow your business</h1>
  <p>A growing number of publishers and advertisers are adopting AMP to deliver faster and more engaging content to their users. As your clients embrace the speed of AMP and more users consume content on AMP pages, ensure that your business is positioned for the future and integrate your technology with AMP. Speeding up ads is the fastest way to boost performance. </p>

  <p>Although AMP pages support traditional HTML ads, these ads can be slow to load. To make ads themselves as fast as the rest of the AMP page, you can build ads in AMPHTML.  AMPHTML ads load as fast as content, so they are more viewable and more likely to be engaged with. <a href="">AMPHTML ads</a> are only delivered after being validated, ensuring that the ads are free of malware.</p>

  <p>With AMPHTML ads, your ads can serve on both AMP and non-AMP pages, meaning you can build your AMPHTML ads once and deliver a memorable brand experience everywhere. Similarly, AMP pages can be built once and distributed across a wide variety of distribution platforms simultaneously.</p>

  <a href="">Join the AMP Project to improve performance and grow your revenue</a>
</section>

<section class="main benefits ads">
  <h1>Explore benefits of AMP stories</h1>

  <div class="main benefit-cards">
    <div class="ad-m-benefit-card ad-m-benefit-card-left">
      <div class="ad-m-benefit-card-content">
        <h2>Benefits for developers</h2>
        <div class="ad-a-divider-benefit"></div>
        <p>IMAGE/ICON 1-3</p>
        <ul>
          <li>Reduced development effort and maintenance</li>
          <li>Inherently secure code</li>
          <li>Community support and collaboration</li>
        </ul>
      </div>
    </div>
    <div class="ad-m-benefit-card  ad-m-benefit-card-right">
      <div class="ad-m-benefit-card-content">
        <h2>Benefits for your business</h2>
        <div class="ad-a-divider-benefit"></div>
        <p>IMAGE/ICON 1-3</p>
        <ul>
          <li>Reliable speed measurements</li>
          <li>Ensures your website will always be fast and smooth</li>
          <li>and Distribution across popular platforms like Google, Bing, and Twitter.</li>
        </ul>
      </div>
    </div>
  </div>

  <a class="ad-m-lnk-square" href="http://localhost:8080/shared/fill-ins/use-case.html">
    <div class="ad-a-ico ad-m-lnk-square-icon">
      <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
    </div>
    <span class="ad-m-lnk-square-text">All benefits</span>
  </a>

</section>

<section class="main core-components">
  <h2>AMP Stories are built with 3 core components:</h2>
  <div class="component image">
    <div class="image-container">
      <amp-img src="/static/img/teaser-placeholder-1x1.jpg" layout="responsive" height="1" width="1"></amp-img>
    </div>
    <div class="component text">
      <h2>Images, videos and GIFs</h2>
      <p>Fascinate your readers with entertaining mobile-first full-screen content. Whether you use pictures, videos or GIFs is entirely up to you. Split long videos over multiple pages for excellent performance. Images and videos expand to visually fill the readers’ screens, providing a smooth and fully engaging experience. AMP allows you to specify the file type to account for the user’s network connection and browser capabilities.<p>
    </div>
  </div>
  <div class="component image">
    <div class="component text">
      <h2>Text and audio</h2>
      <p>Convey facts and figures via bite-sized chunks of one or two sentences – ideal for mobile devices. Choose from different font colors for basic readability. Or add visual elements like subtle black transparent gradient overlays to ensure readability even on random background imagery, for example user generated content. On top of this, you can use short audio files on every page to provide spoken information or background music.<p>
    </div>
    <div class="image-container">
      <amp-img src="/static/img/teaser-placeholder-1x1.jpg" layout="responsive" height="1" width="1"></amp-img>
    </div>
  </div>

</section>

[teaser-grid]
# Explore possibilities of AMP websites
[](content/shared/fill-ins/use-case-2.md)
[](content/shared/fill-ins/use-case-2.md)
[](content/shared/fill-ins/use-case-2.md)
[](content/shared/fill-ins/use-case-2.md)

[See more use cases](content/shared/fill-ins/use-case.md)
[/teaser-grid]

[teaser-grid]
# Explore AMP success stories
[](content/shared/fill-ins/success-story-3.md)
[](content/shared/fill-ins/success-story-3.md)
[](content/shared/fill-ins/success-story-3.md)
[](content/shared/fill-ins/success-story-3.md)

[See more success stories](content/shared/fill-ins/success-story.md)
[/teaser-grid]
