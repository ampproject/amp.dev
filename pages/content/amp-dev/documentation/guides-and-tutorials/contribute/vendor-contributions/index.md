---
$title: Integrate your technology with AMP
$order: 0
$hidden: true
description: 'If you are a technology provider for publishers or advertisers on the web, we invite you to add support to AMP so your customers can continue to leverage your technology and ...'
formats:
  - websites
  - ads
  - stories
  - email
---

Thanks for your interest in contributing to AMP! We appreciate your participation in making the web a user forward platform. 

Publishers have created over 1.4 billion AMP documents, hosted on over 750 thousand unique domains. Such growth is only possible through the support of over 100 third party tech companies, already integrated with AMP. 

If you are a technology provider for publishers or advertisers on the web, we invite you to add support to AMP! Your customers can continue to leverage your technology while working to achieve our vision of building a better web.

This document outlines AMP third party expectations and defines contribution levels.

# Contributing guidelines

All general contributions are subject to the [AMPHTML universal guidelines in CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md). We expect the third party to test, maintain, and update their contribution to various degrees.

To qualify for inclusion, all contribution levels must:

*   Meet the [notability requirements of the English Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Notability).
*   Maintain or improve the same type of service level as AMP promises to both publishers and users. 
*   Be created in good quality.
*   Create a troubleshooting channel for their customers. 
*   Provide good integration test coverage to against AMP’s production and canary releases.
*   Fulfill a purpose that does not exist. 

There are 3 third party contribution levels. Levels are dependent on the amount of added logic:

* Component logic: Code that dictates the core features and functionality of the AMP component.  
* Third party logic: Code that is specific to the third party. This logic enables the component to leverage the third party service. 

The more logic added to the AMP repository, especially third party specific logic, increases the contribution level. A high contribution level requires more commitment from the third party. 

Level 1 and level 2 contributions share components between third parties. If there is a component fulfills a purpose similar to your business, consider reusing that component. This requires much less effort and is more long-term maintainable.

After deciding what level of contribution meets your use case, open a [GitHub issue](https://github.com/ampproject/amphtml/issues/new) to start. 


## Level 1 contribution

Level 1 contributions leverage the feature logic of existing components. They load third party specific logic as custom JavaScript in a cross origin iframe. For example, many ad networks provide ads through the [`amp-ad`](../../../components/reference/amp-ad.md) component, but control how the rendering of ads through their own logic. 

Third parties add configurations or features to existing extensions, using provided APIs, to implement their functionalities. If such a component does not exist they may propose a new one. 

The only third party specific logic checked into the AMP repository is a third party configuration. Adding a new third party to an existing level 1 contribution typically does not need a design review. Third parties can follow the integration documentation of the component, such as [Integrating ad networks into AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

### Expectations for third parties

*   Maintain and serve vendor’s custom JavaScript independently.
*   Provide tests for their configuration and respond to issues. 
*   Provide a troubleshooting channel for developers. 
*   Respond to any and all bug filings related to their service. 

### Level 1 example

[**amp-ad**](../../../components/reference/amp-ad.md)

Ad providers should read the [development overview](https://github.com/ampproject/amphtml/tree/master/ads#overview) and the [developer instructions](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) for adding your support to [`amp-ad`](../../../components/reference/amp-ad.md). Depending on the ad technology your company provides, you might find [these integration instructions ](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads)useful.

There are many ad providers who have added support for advertising related features like amp-ad. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/2299) from the ad network [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## Level 2 contribution 

Level 2 contributions leverage the feature logic of existing components. All logic is checked into the AMP repository, and no custom Javascript can be loaded into an iframe. For example, analytics providers add their configurations to the [`amp-analytics`](../../../components/reference/amp-analytics.md) component but including the endpoint to track data, such as user clicks.  

Third parties add configurations or features, such as new APIs, to existing components to implement their functionalities. If such a component does not exist they may propose a new one. 

All business logic is checked into AMP repository, but the only third party specific logic checked in is a third party configuration. If the component works with a third party provided config file, no design review is needed. If the third party configuration implements a new feature or new component it will need to pass AMP’s design review. 

### Expectations of third parties

*   Adding new third party service to an existing level 2 contribution typically does not need a design review. The third party can follow the documentation of that component. 
*   Proposing a new component for level 2 contribution will need to have feature logic that is shareable by other third party services.

### Level 2 examples

[**amp-analytics**](../../../components/reference/amp-analytics.md)

AMP analytics allows you to send events back to your server based on triggers configured by you. We have written an [analytics integration guide ](../../optimize-measure/configure-analytics/index.md)to get you started.

If you only need to add a tracking pixel with dynamic parameters to your tracking URL, check out [`amp-pixel`](../../../components/reference/amp-pixel.md). Be sure to document usage on your support pages for developers that may want to use your technology with AMP.

There are analytics providers who have added support to amp-analytics. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/1595) from the analytics provider [Parse.ly](https://www.parsely.com/help/integration/google-amp/).


[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

If you provide call tracking measurement services, your use case may be supported with [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). This component dynamically replaces a phone number in a hyperlink to enable call tracking, by executing a CORS request to substitute the number.

To learn more about how this component might work for you, please see the [reference documentation](../../../components/reference/amp-call-tracking.md).

## Level 3 contribution

A level 3 contribution introduces a new third party-specific component.
This is only applicable if third parties are unable to:

*   Find a component that exists for their use case. 
*   Request feature improvements to meet their use case.
*   Propose a component that applies to other third party services.

### Expectations of third parties

*   Write and propose a design review. 
*   Tests must be able to catch breakage. 
*   Fix, or request help, if the component breaks.
*   Provide thorough documentation with code samples.
*   Maintain and update documentation.  
*   Provide a troubleshooting channel for AMP developers to request assistance.
