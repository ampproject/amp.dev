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

<section class="main">

  <button [class]='"ad-o-fragment-slider-prevbtn slide" +slide' class="ad-o-fragment-slider-prevbtn slide1" on="tap:AMP.setState({slide: slide - 1})">
    <div class="ad-a-ico ad-m-lnk-icon">
      {% do doc.icons.useIcon('icons/internal.svg') %}
        <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
    </div>
  </button>

  <button [class]='"ad-o-fragment-slider-nextbtn slide" +slide' class="ad-o-fragment-slider-nextbtn slide1" on="tap:AMP.setState({slide: slide + 1})">
    <div class="ad-a-ico ad-m-lnk-icon">
      {% do doc.icons.useIcon('icons/internal.svg') %}
      <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#internal"></use></svg>
    </div>
  </button>
  
  {% do doc.styles.addCssFile('css/components/organisms/fragment-slider.css') %}
  <div [class]='"ad-o-fragment-slider slide" +slide' class="ad-o-fragment-slider slide1">

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
    </div>

    <div class="slide slide3">
      <amp-img src="/static/img/dummy-use-cases-example-03.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 03">
      </amp-img>
    </div>

    <div class="slide slide4">
      <amp-img src="/static/img/dummy-use-cases-example-04.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 04">
      </amp-img>
    </div>

    <div class="slide slide5">
      <amp-img src="/static/img/dummy-use-cases-example-01.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 05">
      </amp-img>
    </div>

    <div class="slide slide6">
      <amp-img src="/static/img/dummy-use-cases-example-02.png"
        width="1000"
        height="650"
        layout="responsive"
        alt="Use case 06">
      </amp-img>
    </div>

  </div>


  <div [class]='"ad-o-fragment-slider-text slide" +slide' class="ad-o-fragment-slider-text slide1">

    <div class="slide1">
      <h3>Use case 01</h3>
      <h2>Just another AMP page </h2>
    </div>

    <div class="slide2">
      <h3>Use case 02</h3>
      <h2>Just another AMP page </h2>
    </div>

    <div class="slide3">
      <h3>Use case 03</h3>
      <h2>Just another AMP page </h2>
    </div>

    <div class="slide4">
      <h3>Use case 04</h3>
      <h2>Just another AMP page </h2>
    </div>

    <div class="slide5">
      <h3>Use case 05</h3>
      <h2>Just another AMP page </h2>
    </div>

    <div class="slide6">
      <h3>Use case 06</h3>
      <h2>Just another AMP page </h2>
    </div>

  </div>

</section>