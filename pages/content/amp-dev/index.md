---
$title: Start
$view: /views/home.j2

news:
  - title: News
    image: /static/img/dummy-news-1.png
    headline: Setka provides beautiful post design with AMP
    date: September 26, 2018
    url: /
  - title: Announcement
    image: /static/img/dummy-news-2.png
    headline: Optimize yor AMP pages for high ad viewability Lorem
    date: September 26, 2018
    url: /
  - title: News
    image: /static/img/dummy-news-1.png
    headline: Setka provides beautiful post design with AMP
    date: September 26, 2018
    url: /
  - title: Announcement
    image: /static/img/dummy-news-2.png
    headline: Optimize yor AMP pages for high ad viewability
    date: September 26, 2018
    url: /
  - title: News
    image: /static/img/dummy-news-1.png
    headline: Setka provides beautiful post design with AMP
    date: September 26, 2018
    url: /

format_explainer:
  websites:
    name: websites
    visual: views/partials/format-visual.j2
    headline: AMP enables great experiences across many web destinations
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on the web. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/websites.html
  stories:
    name: stories
    visual: views/partials/format-visual.j2
    headline: AMP enables great experiences across many stories
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on stories. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/stories.html
  ads:
    name: ads
    visual: views/partials/format-visual.j2
    headline: AMP enables great experiences across many ads
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on ads. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/ads.html
  emails:
    name: emails
    visual: views/partials/format-visual.j2
    headline: AMP enables great experiences across many emails
    description: Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on emails. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.
    url: /what-is-amp/email.html
---

<section class="ad--stage ad--container-fluid">
[stage]
# Amp is a web component framework for easily creating user first
[/stage]

{% include 'views/partials/case-band.j2' %}
</section>

<section class="ad--news ad--container-fluid">
  {% do doc.styles.addCssFile('css/components/organisms/news.css') %}

  <div class="ad-m-copy">
    <h2>The latest News</h2>
    <p>Duis dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero.</p>
    
    <a href="#" class="ad-m-lnk ad-m-lnk-square">
      <div class="ad-a-ico ad-m-lnk-icon">
        {% do doc.icons.useIcon('icons/internal.svg') %}
        <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
      </div>
      <span class="ad-m-lnk-text">Subscribe</span>
    </a>
  </div>
  
  <div class="ad-o-news">
    <div class="ad-o-news-list">
      {% for news in doc.news %}
      <a class="ad-o-news-item" href="{{ news.url }}">
        <div class="ad-o-news-card">
          <div class="ad-o-news-title">{{ news.title }}</div>
          <div class="ad-o-news-image">
            <amp-img
              src="{{ news.image }}"
              layout="responsive"
              width="16"
              height="9">
            </amp-img>
          </div>
          <h5 class="ad-o-news-headline">{{ news.headline }}</h5>
          <div class="ad-o-news-date">{{ news.date }}</div>
        </div>
      </a>
      {% endfor %}
    </div>
  </div>

</section>

<section class="ad--format-explainer">
  <div class="ad-o-format-explainer ad--container-fluid">
    <amp-state id="formats">
      <script type="application/json">
        {
          "websites": {
            "headline": "{{ doc.format_explainer.websites.headline }}",
            "description": "{{ doc.format_explainer.websites.description }}",
            "url": "{{ doc.format_explainer.websites.url }}"
          },
          "stories": {
            "headline": "{{ doc.format_explainer.stories.headline }}",
            "description": "{{ doc.format_explainer.stories.description }}",
            "url": "{{ doc.format_explainer.stories.url }}"
          },
          "ads": {
            "headline": "{{ doc.format_explainer.ads.headline }}",
            "description": "{{ doc.format_explainer.ads.description }}",
            "url": "{{ doc.format_explainer.ads.url }}"
          },
          "emails": {
            "headline": "{{ doc.format_explainer.emails.headline }}",
            "description": "{{ doc.format_explainer.emails.description }}",
            "url": "{{ doc.format_explainer.emails.url }}"
          }
        }
      </script>
    </amp-state>
    
    <amp-animation id="switchFormat" layout="nodisplay">
      <script type="application/json">
        [{
          "duration": "1.5s",
          "delay": "0s",
          "fill": "forwards",
          "easing": "cubic-bezier(0.25, 0.1, 0.25, 1)",
          "iterations": "1",
          "selector": ".ad-o-format-explainer-visual",
          "keyframes": [{
            "opacity": "0",
            "transform": "translateX(-15%)"
          },
          {
            "opacity": "1",
            "transform": "translateX(0%)"
          }]
        }]
      </script>
    </amp-animation>
    
    <div class="ad-o-format-explainer-visual">
      <div class="ad-o-format-explainer-visual-{{ doc.format_explainer.websites.name }}"
        [hidden]="activeFormat != '{{ doc.format_explainer.websites.name }}'">
        {% include doc.format_explainer.websites.visual %}
      </div>
      <div hidden class="ad-o-format-explainer-visual-{{ doc.format_explainer.stories.name }}"
        [hidden]="activeFormat != '{{ doc.format_explainer.stories.name }}'">
        {% include doc.format_explainer.websites.visual %}
      </div>
      <div hidden class="ad-o-format-explainer-visual-{{ doc.format_explainer.ads.name }}"
        [hidden]="activeFormat != '{{ doc.format_explainer.ads.name }}'">
        {% include doc.format_explainer.websites.visual %}
      </div>
      <div hidden class="ad-o-format-explainer-visual-{{ doc.format_explainer.emails.name }}"
        [hidden]="activeFormat != '{{ doc.format_explainer.emails.name }}'">
        {% include doc.format_explainer.websites.visual %}
      </div>
    </div>
    
    <div class="ad-o-format-explainer-content ad-m-copy">
      <h2 class="ad-o-format-explainer-headline" [text]="formats[activeFormat].headline">{{ doc.format_explainer.websites.headline }}</h2>
      <p class="ad-o-format-explainer-copy" [text]="formats[activeFormat].description">{{ doc.format_explainer.websites.description }}</p>
      
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.websites.name }} active"
        [class]="activeFormat == '{{ doc.format_explainer.websites.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.websites.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.websites.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.websites.name }}'}),switchFormat.restart">
        <div class="ad-o-format-explainer-button-icon ad-a-ico active"
        [class]="activeFormat == '{{ doc.format_explainer.websites.name }}' ? 'ad-o-format-explainer-button-icon ad-a-ico active' : 'ad-o-format-explainer-button-icon ad-a-ico'">
          {% do doc.icons.useIcon('icons/amp-websites.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#amp-websites"></use></svg>
        </div>
        <span class="ad-o-format-explainer-button-text">AMP {{ doc.format_explainer.websites.name }}</span>
      </button>
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.stories.name }}"
        [class]="activeFormat == '{{ doc.format_explainer.stories.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.stories.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.stories.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.stories.name }}'}),switchFormat.restart">
        <div class="ad-o-format-explainer-button-icon ad-a-ico"
        [class]="activeFormat == '{{ doc.format_explainer.stories.name }}' ? 'ad-o-format-explainer-button-icon ad-a-ico active' : 'ad-o-format-explainer-button-icon ad-a-ico'">
          {% do doc.icons.useIcon('icons/amp-stories.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#amp-stories"></use></svg>
        </div>
        <span class="ad-o-format-explainer-button-text">AMP {{ doc.format_explainer.stories.name }}</span>
      </button>
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.ads.name }}"
        [class]="activeFormat == '{{ doc.format_explainer.ads.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.ads.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.ads.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.ads.name }}'}),switchFormat.restart">
        <div class="ad-o-format-explainer-button-icon ad-a-ico"
        [class]="activeFormat == '{{ doc.format_explainer.ads.name }}' ? 'ad-o-format-explainer-button-icon ad-a-ico active' : 'ad-o-format-explainer-button-icon ad-a-ico'">
          {% do doc.icons.useIcon('icons/amp-ads.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#amp-ads"></use></svg>
        </div>
        <span class="ad-o-format-explainer-button-text">AMP {{ doc.format_explainer.ads.name }}</span>
      </button>
      <button class="ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.emails.name }}"
        [class]="activeFormat == '{{ doc.format_explainer.emails.name }}' ? 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.emails.name }} active' : 'ad-o-format-explainer-button ad-o-format-explainer-button-{{ doc.format_explainer.emails.name }}'"
        on="tap:AMP.setState({activeFormat: '{{ doc.format_explainer.emails.name }}'}),switchFormat.restart">
        <div class="ad-o-format-explainer-button-icon ad-a-ico"
        [class]="activeFormat == '{{ doc.format_explainer.emails.name }}' ? 'ad-o-format-explainer-button-icon ad-a-ico active' : 'ad-o-format-explainer-button-icon ad-a-ico'">
          {% do doc.icons.useIcon('icons/amp-emails.svg') %}
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#amp-emails"></use></svg>
        </div>
        <span class="ad-o-format-explainer-button-text">AMP {{ doc.format_explainer.emails.name }}</span>
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

  <div class="ad--container-fluid">
    {% include 'views/partials/case-grid.j2' %}
  </div>
</section>

[bevel]

<section class="ad--teaser-grid ad--container">
[teaser-grid]
[](content/shared/fill-ins/success-story.md)
[](content/shared/fill-ins/success-story.md)
[](content/shared/fill-ins/success-story.md)
[](content/shared/fill-ins/success-story.md)
[/teaser-grid]

  <div class="ad-m-copy">
    <h2>Explore AMP<br> success stories</h2>
    <p>Whether used by publishers, ad tech companies or email providers, AMP enables the easy creation of great experiences on the web. By ensuring user experience comes first, developers can rest assured what they create will be compelling and engaging.</p>
    
    <a href="#" class="ad-m-lnk ad-m-lnk-square">
      <div class="ad-a-ico ad-m-lnk-icon">
        {% do doc.icons.useIcon('icons/internal.svg') %}
        <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
      </div>
      <span class="ad-m-lnk-text">See all success stories</span>
    </a>
  </div>
</section>
