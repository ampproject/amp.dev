---
$title: Use AMP components in non-AMP pages
$order: 1
description: 'Use a subset of AMP components as standalone elements in non-AMP pages with Bento AMP.'
tutorial: false
toc: true
formats:
  - websites
author: CrystalOnScript
---

Use a subset of AMP components as standalone elements in non-AMP pages with Bento AMP. Bento AMP is a project that embraces use of AMP components without the need to commit to fully valid AMP. This creates copy and past-able code for common UI widgets, allows testing if AMP is the right switch for your website, and using Bento in a migration plan. 

[tip type="important"]
 Bento is only available [experimentally](../learn/experimental.md). Read our [Blog Post](TODO) for information on future plans and how to get involved! 
[/tip]

# Use Bento components in non-AMP pages

Bento components are available for experimental use in the developer preview.


## Enable Bento Experiment 

Bento components are available experimentally and you must [enable experimental features](../learn/experimental.md).

You can enable all Bento components by including the script below:


```
<script>
  (self.AMP = self.AMP || []).push(function (AMP) {
    AMP.toggleExperiment('bento', true);
  });
</script>
```


Or enable a single Bento component by including the script below. Ensure you replace `bento-foo` with the desired [supported component](#available-bento-components) name given on its documentation page:


```
<script>
  (self.AMP = self.AMP || []).push(function (AMP) {
    AMP.toggleExperiment('bento-foo', true);
  });
</script>
```



## Import AMP runtime and Bento component logic

You must include the AMP runtime script and import the logic for each individual Bento component desired.

```
<script async src="https://cdn.ampproject.org/v0.js"></script>

<script async custom-element="amp-bento" src="https://cdn.ampproject.org/v0/amp-bento-1.0.js"></script>
``` 

Read each Bento component’s reference documentation for implementation details.


# Available Bento components 

Bento supported AMP components are listed below:



*   [amp-accordion](../../../documentation/components/reference/amp-accordion.md)
*   [amp-base-carousel](../../../documentation/components/reference/amp-base-carousel.md)
*   [amp-inline-gallery](../../../documentation/components/reference/amp-inline-gallery.md)
    *   amp-inline-gallery-pagination
    *   amp-inline-gallery-thumbnails
*   [amp-stream-gallery](TODO)
*   [amp-date-countdown](../../../documentation/components/reference/amp-date-countdown.md)
*   [amp-date-display](../../../documentation/components/reference/amp-date-display.md)
*   [amp-fit-text](../../../documentation/components/reference/amp-fit-text.md)
*   [amp-instagram](../../../documentation/components/reference/amp-instagram.md)
*   [amp-lightbox](../../../documentation/components/reference/amp-lightbox.md)
*   [amp-selector](../../../documentation/components/reference/amp-selector.md)
*   [amp-social-share](../../../documentation/components/reference/amp-social-share.md)
*   [amp-timeago](../../../documentation/components/reference/amp-timeago.md)
*   Video components
    *   [amp-video](../../../documentation/components/reference/amp-video.md)
    *   [amp-youtube](../../../documentation/components/reference/amp-youtube.md)
    *   [amp-video-iframe](../../../documentation/components/reference/amp-video-iframe.md)

# Working with experiments

Bento AMP is in experimental mode and available through the developer preview. The AMP team welcomes developer feedback through [GitHub](https://github.com/ampproject/amphtml/issues) and our [Slack](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) channel. Please reach out with any questions or issues. 


## Page experience

Bento components are designed to be highly performant and contribute to an excellent page experience. Developers are highly encouraged to [file issues](https://github.com/ampproject/amphtml/issues) if they see contradictory results.  


## AMP caches and validation

Using Bento components during the limited developer preview makes your web page an invalid AMP page. Therefore, your doc and any Bento components are not added to any AMP caches.