---
$title: Start
$view: /views/home.j2

format_explainer:
  websites:
    name: websites
    image: /static/img/stage-image.png
    headline: AMP enables great experiences across many web destinations
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on the web. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/websites.html
  stories:
    name: stories
    image: /static/img/story.png
    headline: AMP enables great experiences across many stories
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on stories. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/stories.html
  ads:
    name: ads
    image: /static/img/ad.png
    headline: AMP enables great experiences across many ads
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on ads. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/ads.html
  emails:
    name: emails
    image: /static/img/e-mail.png
    headline: AMP enables great experiences across many emails
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on emails. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/email.html
---

[stage color="dark-blue"]
# Amp is a web component framework for easily creating user first
[/stage]

<section class="ad--case-band">
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

<section class="ad--format-explainer">
  <div class="ad-o-format-explainer ad--container">
    <amp-state id="formats">
      <script type="application/json">
        {
          "websites": {
            "image": "{{ doc.format_explainer.websites.image }}",
            "headline": "{{ doc.format_explainer.websites.headline }}",
            "description": "{{ doc.format_explainer.websites.description }}",
            "url": "{{ doc.format_explainer.websites.url }}"
          },
          "stories": {
            "image": "{{ doc.format_explainer.stories.image }}",
            "headline": "{{ doc.format_explainer.stories.headline }}",
            "description": "{{ doc.format_explainer.stories.description }}",
            "url": "{{ doc.format_explainer.stories.url }}"
          },
          "ads": {
            "image": "{{ doc.format_explainer.ads.image }}",
            "headline": "{{ doc.format_explainer.ads.headline }}",
            "description": "{{ doc.format_explainer.ads.description }}",
            "url": "{{ doc.format_explainer.ads.url }}"
          },
          "emails": {
            "image": "{{ doc.format_explainer.emails.image }}",
            "headline": "{{ doc.format_explainer.emails.headline }}",
            "description": "{{ doc.format_explainer.emails.description }}",
            "url": "{{ doc.format_explainer.emails.url }}"
          }
        }
      </script>
    </amp-state>
        
    <div class="ad-o-format-explainer-image">
      <amp-img
        width="1"
        height="1"
        layout="responsive"
        src="{{ doc.format_explainer.websites.image }}"
        [src]="formats[activeFormat].image">
      </amp-img>
    </div>
    
    <div class="ad-o-format-explainer-content ad-m-copy">
      <h2 class="ad-o-format-explainer-headline" [text]="formats[activeFormat].headline">{{ doc.format_explainer.websites.headline }}</h2>
      <p class="ad-o-format-explainer-copy" [text]="formats[activeFormat].description">{{ doc.format_explainer.websites.description }}</p>
      
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.websites.name }} active"
        [class]="activeFormat == '{{ doc.format_explainer.websites.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.websites.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.websites.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.websites.name }}'})">
        AMP {{ doc.format_explainer.websites.name }}
      </button>
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.stories.name }}"
        [class]="activeFormat == '{{ doc.format_explainer.stories.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.stories.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.stories.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.stories.name }}'})">
        AMP {{ doc.format_explainer.stories.name }}
      </button>
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.ads.name }}"
        [class]="activeFormat == '{{ doc.format_explainer.ads.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.ads.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.ads.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.ads.name }}'})">
        AMP {{ doc.format_explainer.ads.name }}
      </button>
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.emails.name }}"
        [class]="activeFormat == '{{ doc.format_explainer.emails.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.emails.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.emails.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.emails.name }}'})">
        AMP {{ doc.format_explainer.emails.name }}
      </button>
                
      <a href="{{ doc.format_explainer.websites.url }}" [href]="formats[activeFormat].url" class="ad-o-format-explainer-link ad-m-lnk ad-m-lnk-square">
        <div class="ad-a-ico ad-m-lnk-icon">
          {% do doc.icons.useIcon('icons/internal.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
        </div>
        <span [text]="'Learn more about AMP ' + activeFormat" class="ad-m-lnk-text">Learn more about AMP {{ doc.format_explainer.websites.name }}</span>
      </a>
    </div>
  </div>
</section>

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

<section class="ad--quote ad--container">
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

<section class="ad--case-grid">
  <div class="ad--container">
    <h1 class="ad-o-case-grid-headline">Get inspired by AMP use cases</h1>
  </div>

  <div class="ad-o-case-grid">
    <div class="ad-o-case-grid-image ad-o-case-grid-image-4"><amp-img src="/static/img/case-grid-data.png" layout="responsive" width="936" height="686"></amp-img></div>
    <div class="ad-o-case-grid-image ad-o-case-grid-image-3"><amp-img src="/static/img/case-grid-education.png" layout="responsive" width="1004" height="662"></amp-img></div>
    <div class="ad-o-case-grid-image ad-o-case-grid-image-2"><amp-img src="/static/img/case-grid-choices.png" layout="responsive" width="744" height="818"></amp-img></div>
    <div class="ad-o-case-grid-image ad-o-case-grid-image-1"><amp-img src="/static/img/case-grid-band.png" layout="responsive" width="1072" height="920"></amp-img></div>
    
    <div class="ad-o-case-grid-link">
      <a href="#" class="ad-m-lnk ad-m-lnk-square">
        <div class="ad-a-ico ad-m-lnk-icon">
          {% do doc.icons.useIcon('icons/internal.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
        </div>
        <span class="ad-m-lnk-text">See all use cases</span>
      </a>
    </div>
  </div>
</section>
