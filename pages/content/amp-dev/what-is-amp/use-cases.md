---
$title: Use cases
$view: /views/overview/use-cases.j2
---

<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 1
    }
  </script>
</amp-state>


<section class="ad-o-stage">
  <button on="tap:AMP.setState({selected: {slide: selected.slide - 1}})" class="ad-o-fragment-slider-prevbtn slide1" [class]='"ad-o-fragment-slider-prevbtn slide" +selected.slide'>
    <div class="ad-a-ico ad-m-lnk-icon">
      {% do doc.icons.useIcon('icons/internal.svg') %}
        <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
    </div>
  </button>

  <button on="tap:AMP.setState({selected: {slide: selected.slide + 1}})" class="ad-o-fragment-slider-nextbtn" [class]='"ad-o-fragment-slider-nextbtn slide" +selected.slide'>
    <div class="ad-a-ico ad-m-lnk-icon">
      {% do doc.icons.useIcon('icons/internal.svg') %}
      <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
    </div>
  </button>


  {% do doc.styles.addCssFile('css/components/organisms/fragment-slider.css') %}
  <div [class]='"ad-o-fragment-slider slide" +selected.slide' class="ad-o-fragment-slider slide1">

    <div class="slide slide1">
      <amp-img src="/static/img/dummy-use-cases-example-01.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>

      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small01"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small02"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small03"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small04"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small05"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small06"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
    </div>

    <div class="slide slide2">
      <amp-img src="/static/img/dummy-use-cases-example-02.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 02">
      </amp-img>

      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small01"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small02"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small03"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small04"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small05"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small06"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
    </div>

    <div class="slide slide3">
      <amp-img src="/static/img/dummy-use-cases-example-03.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 03">
      </amp-img>

      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small01"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small02"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small03"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small04"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small05"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small06"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
    </div>

    <div class="slide slide4">
      <amp-img src="/static/img/dummy-use-cases-example-04.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 04">
      </amp-img>

      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small01"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small02"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small03"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small04"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small05"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small06"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
    </div>

    <div class="slide slide5">
      <amp-img src="/static/img/dummy-use-cases-example-01.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 05">
      </amp-img>

      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small01"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small02"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small03"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small04"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small05"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small06"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
    </div>

    <div class="slide slide6">
      <amp-img src="/static/img/dummy-use-cases-example-02.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 06">
      </amp-img>

      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small01"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small02"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small03"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small04"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small05"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
      <amp-img src="/static/img/dummy-use-cases-example-01-1.png"
        class="small small06"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 01">
      </amp-img>
    </div>

  </div>
</section>

<section class="main">

  
  


  <div [class]='"ad-o-fragment-slider-text slide" +selected.slide' class="ad-o-fragment-slider-text slide1">

    <div class="slide1">
      <h3>Use case 01</h3>
      <h2>Just another AMP page </h2>
      <div class="copy copy-right">
        
        <p>The Google AMP Cache can be used to serve cached AMP HTML pages.</p>

        <p>The Google AMP Cache is a proxy-based content delivery network for delivering all valid AMP documents. It fetches AMP HTML pages, caches them, and improves page performance automatically. When using the Google AMP Cache, the document, all JS files and all images load from the same origin that is using HTTP 2.0 for maximum efficiency.
        The cache also comes with a built-in validation system which confirms that the page is guaranteed to work, and that it doesn't depend on external resources. The validation system runs  a series of assertions confirming the page’s markup meets the AMP HTML specification.</p>

        <p>Another version of the validator comes bundled with every AMP page. This version can log validation errors directly to the browser’s console when the page is rendered, allowing you to see how complex changes in your code might impact performance and user experience.</p>
      </div>

      <div class="cta">
        <a href="#" class="ad-m-lnk ad-m-lnk-square">
          <div class="ad-a-ico ad-m-lnk-icon">
            {% do doc.icons.useIcon('icons/internal.svg') %}
              <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
          </div>
          <span class="ad-m-lnk-text">Learn more about testing your Amp page</span>
        </a>
      </div>
    </div>

    <div class="slide2">
      <h3>Use case 02</h3>
      <h2>Just another AMP page </h2>
      <div class="copy copy-right">
        
        <p>The Google AMP Cache can be used to serve cached AMP HTML pages.</p>

        <p>The Google AMP Cache is a proxy-based content delivery network for delivering all valid AMP documents. It fetches AMP HTML pages, caches them, and improves page performance automatically. When using the Google AMP Cache, the document, all JS files and all images load from the same origin that is using HTTP 2.0 for maximum efficiency.
        The cache also comes with a built-in validation system which confirms that the page is guaranteed to work, and that it doesn't depend on external resources. The validation system runs  a series of assertions confirming the page’s markup meets the AMP HTML specification.</p>

        <p>Another version of the validator comes bundled with every AMP page. This version can log validation errors directly to the browser’s console when the page is rendered, allowing you to see how complex changes in your code might impact performance and user experience.</p>
      </div>

      <div class="cta">
        <a href="#" class="ad-m-lnk ad-m-lnk-square">
          <div class="ad-a-ico ad-m-lnk-icon">
            {% do doc.icons.useIcon('icons/internal.svg') %}
              <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
          </div>
          <span class="ad-m-lnk-text">Learn more about testing your Amp page</span>
        </a>
      </div>
    </div>

    <div class="slide3">
      <h3>Use case 03</h3>
      <h2>Just another AMP page </h2>
      <div class="copy copy-right">
        
        <p>The Google AMP Cache can be used to serve cached AMP HTML pages.</p>

        <p>The Google AMP Cache is a proxy-based content delivery network for delivering all valid AMP documents. It fetches AMP HTML pages, caches them, and improves page performance automatically. When using the Google AMP Cache, the document, all JS files and all images load from the same origin that is using HTTP 2.0 for maximum efficiency.
        The cache also comes with a built-in validation system which confirms that the page is guaranteed to work, and that it doesn't depend on external resources. The validation system runs  a series of assertions confirming the page’s markup meets the AMP HTML specification.</p>

        <p>Another version of the validator comes bundled with every AMP page. This version can log validation errors directly to the browser’s console when the page is rendered, allowing you to see how complex changes in your code might impact performance and user experience.</p>
      </div>

      <div class="cta">
        <a href="#" class="ad-m-lnk ad-m-lnk-square">
          <div class="ad-a-ico ad-m-lnk-icon">
            {% do doc.icons.useIcon('icons/internal.svg') %}
              <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
          </div>
          <span class="ad-m-lnk-text">Learn more about testing your Amp page</span>
        </a>
      </div>
    </div>

    <div class="slide4">
      <h3>Use case 04</h3>
      <h2>Just another AMP page </h2>
      <div class="copy copy-right">
        
        <p>The Google AMP Cache can be used to serve cached AMP HTML pages.</p>

        <p>The Google AMP Cache is a proxy-based content delivery network for delivering all valid AMP documents. It fetches AMP HTML pages, caches them, and improves page performance automatically. When using the Google AMP Cache, the document, all JS files and all images load from the same origin that is using HTTP 2.0 for maximum efficiency.
        The cache also comes with a built-in validation system which confirms that the page is guaranteed to work, and that it doesn't depend on external resources. The validation system runs  a series of assertions confirming the page’s markup meets the AMP HTML specification.</p>

        <p>Another version of the validator comes bundled with every AMP page. This version can log validation errors directly to the browser’s console when the page is rendered, allowing you to see how complex changes in your code might impact performance and user experience.</p>
      </div>

      <div class="cta">
        <a href="#" class="ad-m-lnk ad-m-lnk-square">
          <div class="ad-a-ico ad-m-lnk-icon">
            {% do doc.icons.useIcon('icons/internal.svg') %}
              <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
          </div>
          <span class="ad-m-lnk-text">Learn more about testing your Amp page</span>
        </a>
      </div>
    </div>

    <div class="slide5">
      <h3>Use case 05</h3>
      <h2>Just another AMP page </h2>
      <div class="copy copy-right">
        
        <p>The Google AMP Cache can be used to serve cached AMP HTML pages.</p>

        <p>The Google AMP Cache is a proxy-based content delivery network for delivering all valid AMP documents. It fetches AMP HTML pages, caches them, and improves page performance automatically. When using the Google AMP Cache, the document, all JS files and all images load from the same origin that is using HTTP 2.0 for maximum efficiency.
        The cache also comes with a built-in validation system which confirms that the page is guaranteed to work, and that it doesn't depend on external resources. The validation system runs  a series of assertions confirming the page’s markup meets the AMP HTML specification.</p>

        <p>Another version of the validator comes bundled with every AMP page. This version can log validation errors directly to the browser’s console when the page is rendered, allowing you to see how complex changes in your code might impact performance and user experience.</p>
      </div>

      <div class="cta">
        <a href="#" class="ad-m-lnk ad-m-lnk-square">
          <div class="ad-a-ico ad-m-lnk-icon">
            {% do doc.icons.useIcon('icons/internal.svg') %}
              <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
          </div>
          <span class="ad-m-lnk-text">Learn more about testing your Amp page</span>
        </a>
      </div>
    </div>

    <div class="slide6">
      <h3>Use case 06</h3>
      <h2>Just another AMP page </h2>
      <div class="copy copy-right">
        
        <p>The Google AMP Cache can be used to serve cached AMP HTML pages.</p>

        <p>The Google AMP Cache is a proxy-based content delivery network for delivering all valid AMP documents. It fetches AMP HTML pages, caches them, and improves page performance automatically. When using the Google AMP Cache, the document, all JS files and all images load from the same origin that is using HTTP 2.0 for maximum efficiency.
        The cache also comes with a built-in validation system which confirms that the page is guaranteed to work, and that it doesn't depend on external resources. The validation system runs  a series of assertions confirming the page’s markup meets the AMP HTML specification.</p>

        <p>Another version of the validator comes bundled with every AMP page. This version can log validation errors directly to the browser’s console when the page is rendered, allowing you to see how complex changes in your code might impact performance and user experience.</p>
      </div>

      <div class="cta">
        <a href="#" class="ad-m-lnk ad-m-lnk-square">
          <div class="ad-a-ico ad-m-lnk-icon">
            {% do doc.icons.useIcon('icons/internal.svg') %}
              <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
          </div>
          <span class="ad-m-lnk-text">Learn more about testing your Amp page</span>
        </a>
      </div>
    </div>

  </div>

</section>