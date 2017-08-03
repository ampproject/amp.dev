---
$title : Getting started
$order : 0
---

## Three Easy Steps to Serving Ads on Your AMP Page

Not sure how to get started? In this short guide, you’ll learn how to quickly and easily serve ads on your AMP page.

### 1. Add the `<amp-ads>` component to your AMP page:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

By adding the `amp-ads` component, you've added the ads framework to your AMP page.

### 2. Specify the ad server or ad network in the `type` attribute:

```html
<amp-ad type="a9">
 ...
</amp-ad>
```

[Here](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks) is a list of supported ad networks.

### 3. Specify your ad unit’s height and width:

```html
<amp-ad width="300"
    height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

By defining your ad unit's height and weight, you've specified the ad size on your AMP page.

{% call callout('Note', type='note') %}
The additional data attributes are telling the ad network to pull the right size and publisher from their servers. Each ad network has different attributes to send. [Learn more](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks).
{% endcall %}

### 4. [OPTIONAL] Specify a placeholder:

```html
<amp-ad width="300"
    height="200"
    type="doubleclick"
    data-slot="/4119129/doesnt-exist">
    <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

AMP supports an optional placeholder attribute. Depending on the ad network, you can choose to show a placeholder until the ad is available for viewing. This provides a better user experience by preventing a blank space.

{% call callout('Note', type='note') %}
[Learn more about `placeholder`](/docs/guides/responsive/placeholders#placeholders).
{% endcall %}

### 5. [OPTIONAL] Specify a fallback attribute:

```html
<amp-ad width="300"
    height="200"
    type="doubleclick"
    data-slot="/4119129/doesnt-exist">
    <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

AMP supports an optional fallback attribute. Depending on the ad network, you can choose to show this fallback element if no ad is available to serve.

{% call callout('Note', type='note') %}
[Learn more about `fallback`](/docs/guides/responsive/placeholders#fallbacks).
{% endcall %}

### 6. Congratulations! You are now serving ads on your AMP page!
