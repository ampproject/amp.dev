---
$title: Start
$view: /views/home.j2
---

[stage color="dark-blue"]
# Amp is a web component framework for easily creating user first
[/stage]

<section class="case-band">
  <div class="ad-o-case-band">
    <div class="ad-o-case-band-image ad-o-case-band-image-portrait ad-o-case-band-image-2"><amp-img src="/static/img/case-band-image-2.png" layout="responsive" width="9" height="16"></amp-img></div>
    <div class="ad-o-case-band-image ad-o-case-band-image-portrait ad-o-case-band-image-1"><amp-img src="/static/img/case-band-image-1.png" layout="responsive" width="9" height="16"></amp-img></div>
    <div class="ad-o-case-band-image ad-o-case-band-image-landscape ad-o-case-band-image-5"><amp-img src="/static/img/case-band-image-5.png" layout="responsive" width="16" height="9"></amp-img></div>
    <div class="ad-o-case-band-image ad-o-case-band-image-portrait ad-o-case-band-image-4"><amp-img src="/static/img/case-band-image-4.png" layout="responsive" width="9" height="16"></amp-img></div>
    <div class="ad-o-case-band-image ad-o-case-band-image-landscape ad-o-case-band-image-3"><amp-img src="/static/img/case-band-image-3.png" layout="responsive" width="16" height="9"></amp-img></div>
    <div class="ad-o-case-band-image ad-o-case-band-image-portrait ad-o-case-band-image-6"><amp-img src="/static/img/case-band-image-6.png" layout="responsive" width="9" height="16"></amp-img></div>
    <div class="ad-o-case-band-image ad-o-case-band-image-portrait ad-o-case-band-image-7"><amp-img src="/static/img/case-band-image-7.png" layout="responsive" width="9" height="16"></amp-img></div>
  </div>
</section>

[bevel]

<section class="ad--benefits-overview">
  <div class="ad-o-benefits ad--container">

    <div class="ad-o-benefits-overview-list ad-o-benefits-overview-list-developers">

      <h2>Benefits for Developers</h2>

      <div class="ad-m-benefit">
        <div class="ad-m-benefit-icon">
          {% do doc.icons.useIcon('icons/smile.svg') %}
          <svg class="ad-m-benefit-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#smile"></use></svg>
        </div>
        <div class="ad-m-benefit-text">
          <span class="ad-m-benefit-text-headline">Amp can be applied across various web touch points</span>
          <span class="ad-m-benefit-text-copy">Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on the web.</span>
        </div>
      </div>

      <div class="ad-m-benefit">
        <div class="ad-m-benefit-icon">
          {% do doc.icons.useIcon('icons/bolt.svg') %}
          <svg class="ad-m-benefit-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bolt"></use></svg>
        </div>
        <div class="ad-m-benefit-text">
          <span class="ad-m-benefit-text-headline">Web page speed improves the user experience and core business metrics</span>
          <span class="ad-m-benefit-text-copy">AMP pages load near instantly, enabling you to offer a consistently fast experience across all devices and platforms.</span>
        </div>
      </div>

      <div class="ad-m-benefit">
        <div class="ad-m-benefit-icon">
          {% do doc.icons.useIcon('icons/build.svg') %}
          <svg class="ad-m-benefit-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#build"></use></svg>
        </div>
        <div class="ad-m-benefit-text">
          <span class="ad-m-benefit-text-headline">Building AMP pages is simple and straightforward.</span>
          <span class="ad-m-benefit-text-copy">You can often convert your entire archive in days especially if you use a popular CMS such as Wordpress or Drupal.</span>
        </div>
      </div>

    </div>

    <div class="ad-o-benefits-overview-list ad-o-benefits-overview-list-business">

      <h2>Benefits for Business</h2>

      <div class="ad-m-benefit">
        <div class="ad-m-benefit-icon">
          {% do doc.icons.useIcon('icons/bolt-code.svg') %}
          <svg class="ad-m-benefit-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bolt-code"></use></svg>
        </div>
        <div class="ad-m-benefit-text">
          <span class="ad-m-benefit-text-headline">Maintain flexibility and control and reduce complexity in your code</span>
          <span class="ad-m-benefit-text-copy">You can use CSS to customize your styling, dynamic data to fetch the freshest data where needed, to build the best possible userexperience     for your customers.</span>
        </div>
      </div>

      <div class="ad-m-benefit">
        <div class="ad-m-benefit-icon">
          {% do doc.icons.useIcon('icons/web-page.svg') %}
          <svg class="ad-m-benefit-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#web-page"></use></svg>
        </div>
        <div class="ad-m-benefit-text">
          <span class="ad-m-benefit-text-headline">Build for a sustainable future in the open web for everyone</span>
          <span class="ad-m-benefit-text-copy">The AMP Project is an open source initiative to protect the future of the web helping everyone deliver a better, faster more user-friendly    experience.</span>
        </div>
      </div>

      <div class="ad-m-benefit">
        <div class="ad-m-benefit-icon">
          {% do doc.icons.useIcon('icons/code-small.svg') %}
          <svg class="ad-m-benefit-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#code-small"></use></svg>
        </div>
        <div class="ad-m-benefit-text">
          <span class="ad-m-benefit-text-headline">Less effort, more performance and built and controlled by you</span>
          <span class="ad-m-benefit-text-copy">It takes a lot of time and effort to build a great website. AMP components are already optimized for the best performance.</span>
        </div>
      </div>

    </div>

    <div class="ad-o-benefits-overview-link">
      <a href="#" class="ad-m-lnk ad-m-lnk-square">
        <div class="ad-a-ico ad-m-lnk-icon">
          {% do doc.icons.useIcon('icons/internal.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
        </div>
        <span class="ad-m-lnk-text">Get started with AMP</span>
      </a>
    </div>

  </div>
</section>

<section class="ad--content quote">
  <div class="ad-m-quote">
    <div class="ad-m-quote-source">
     <div class="ad-a-ico">
        {% do doc.icons.useIcon('icons/quote.svg') %}
        <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#quote"></use></svg>
     </div>
      <div class="ad-a-img ad-a-img-static">
        <amp-img src="/static/img/logo-dummy-washingtonpost.png" layout="responsive" height="96" width="630" alt="placeholder" />
      </div>
    </div>
    <div class="ad-m-quote-quote">
      <blockquote>
        <p class="ad-a-txt">As a source for breaking news and information, AMP stories allows us to showcase our quality journalism when there are multiple elements we want to bring together. Combiningreporting, photography, videos and motion graphics, this gives readers a more visual entry point when they are searching for our coverage.<p>
      </blockquote>
      <p>Greg Manifold, Design Director of The Washington Post</p>

      <a href="#" class="ad-m-lnk">
        <div class="ad-a-ico ad-m-lnk-icon">
          {% do doc.icons.useIcon('icons/internal.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
        </div>
        <span class="ad-m-lnk-text">Read Success Story</span>
      </a>
    </div>
  </div>
</section>

<section class="usecases">
  <div class="usecases-list">
    <div class="usecase-image"><amp-img src="/static/img/band.png" layout="responsive" width="536" height="460"></amp-img></div>
    <div class="usecase-image"><amp-img src="/static/img/education.png" layout="responsive" width="502" height="331"></amp-img></div>
    <div class="usecase-image"><amp-img src="/static/img/data.png" layout="responsive" width="468" height="343"></amp-img></div>
    <div class="usecase-image"><amp-img src="/static/img/choices.png" layout="responsive" width="372" height="409"></amp-img></div>
</section>