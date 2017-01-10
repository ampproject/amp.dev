---
$title : "Getting Started"
$order : 0
---

## Three Easy Steps to Serving Ads on Your AMP Page

Not sure how to get started? In this tutorial, you’ll learn how to quickly and easily serve ads on your AMP page.

### 1. Add the `<amp-ads>` component to your AMP page:

[sourcecode:html]
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
[/sourcecode]

### 2. You added the ads framework, now specify the ad server or ad network in the `type` attribute:

[sourcecode:html]
<amp-ad
      type="a9">
  </amp-ad>
[/sourcecode]

[Here](https://github.com/ampproject/amphtml/tree/master/ads) is a list of supported ad networks.

### 3. You just defined the ad server type, but you also need to define the ad size. Specify your ad unit’s height and width:

[sourcecode:html]
<amp-ad width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302">
  </amp-ad>
[/sourcecode]

Note: The additional data attributes are telling the ad network to pull the right size and pub from their servers. Each ad network has different attributes to send. [Learn more](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks).

### 4. [OPTIONAL] AMP supports an optional placeholder attribute. Depending on the ad network, you can choose to show a placeholder until the ad is available for viewing. This provides a better user experience by preventing a blank space from showing:

[sourcecode:html]
 <amp-ad width="300"
      height="200"
      type="doubleclick"
      data-slot="/4119129/doesnt-exist">
    <amp-img placeholder src="placeholder-image.jpg"></amp-img>
  </amp-ad>
[/sourcecode]

### 5. [OPTIONAL] AMP supports an optional fallback attribute. Depending on the ad network, you can choose to show this fallback element if no ad is available to serve:

[sourcecode:html]
<amp-ad width="300"
      height="200"
      type="doubleclick"
      data-slot="/4119129/doesnt-exist">
    <amp-img fallback src="fallback-image.jpg"></amp-img>
  </amp-ad>
[/sourcecode]

### 6. Congratulations! You are now serving ads on your AMP page!
