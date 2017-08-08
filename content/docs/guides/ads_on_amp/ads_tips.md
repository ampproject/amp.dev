---
$title : Tips for ads on AMP pages
$order : 1
---

### Placement & Controls: <br /> Optimize your ad placements

- **Create separate ad units** on AMP pages for targeting, reporting, and control purposes.
- **Place the same number of ads** on AMP Pages as your non-AMP pages to generate maximum revenue per page.
- **Place the first ad immediately below the first viewport** ("below the fold") to provide an optimal user experience.
- Unless you’re using advanced CSS or media queries, **ensure your ad units are centered on the page** to provide your users with an optimal mobile web experience.
- **Enable <a href="https://github.com/ampproject/amphtml/tree/master/ads#support-for-multi-size-ad-requests">multi-size ad requests</a>** on your AMP inventory to increase ad auction pressure and drive revenue.

### Demand & Pricing: <br /> Get the right price for your ads

- **Sell ad units on your AMP pages across all sales channels**, including direct and indirect to maximize competition for your inventory on AMP pages.
- **Price your ad inventory on AMP pages** similar to your inventory on non-AMP pages. Monitor performance and adjust pricing accordingly.
- **Ensure all ad demand channels are competing** for ad inventory on your AMP pages to drive up competition.

### Ad Types: <br /> Serve the best types of ads

- **Avoid heavy creatives** per <a href="http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf">IAB guidelines</a>.
- **Avoid interstitials** or other ad formats that cause the content to reflow on ad load.
- **Optimize for viewability** by setting the parameter:<br /> 
<em>data-loading-strategy = prefer-viewability-over-views</em>
- **Place ads in your video content** via [supported players](https://www.ampproject.org/docs/reference/components#media) or [`amp-iframe`](https://ampbyexample.com/components/amp-iframe/) to enable revenue on all types of content.
- **Implement native ads** to compete with display ads using multi-sized ad requests, adding demand pressure while providing your readers with a premium user experience.

### Innovation: <br /> Offer the most engaging ad products

- **Implement ads on ancillary AMP pages** to generate incremental revenue:
    - [Ads in your AMP Image Carousel](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-carousel-demo.html)
    - [Ads in your AMP Lightbox](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-lightbox-demo.html)
- **Implement new formats for direct sold ads** to equip your sales team with high-impact, innovative ad products:
    - [Sticky Ads](https://ampbyexample.com/components/amp-sticky-ad/)
    - [Flying Carpet](https://ampbyexample.com/components/amp-fx-flying-carpet/)
