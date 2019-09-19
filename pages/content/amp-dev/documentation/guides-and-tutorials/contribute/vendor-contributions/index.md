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

Publishers have created over 1.4B AMP documents that are hosted on over 750K unique domains. Such growth would have been impossible without strong support from over 100 third party tech companies that have already integrated with AMP.

If you are a technology provider for publishers or advertisers on the web, we invite you to add support to AMP so your customers can continue to leverage your technology and achieve our joint vision to build a better web.

This document outlines third party vendor expectations and defines contribution levels. 

# Contributing guidelines

All general contributions are subject to the [AMPHTML universal guidelines in CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md). We expect vendors to test, maintain, and update their contribution to various degrees.

To qualify for inclusion, all contribution levels must:

*   Meet the [notability requirements of the English Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Notability).
*   Maintain or improve the same type of service level as AMP promises to both publishers and users. 
*   Be created in good quality.
*   Create a troubleshooting channel for their customers. 
*   Provide good integration test coverage from their side to test against both AMP’s prod & canary releases.
*   Fulfill a purpose that does not exist. 

Vendor contributions are divided into three different levels. Each level is dependent on how much additional business logic and vendor specific logic (logic that is not shared with other vendors) is added to the AMP repo. A general principle is that the more logic, especially vendor specific logic, added to AMP, the higher contribution level is and the more commitment needed from the vendor.

Level one & level two contributions share components between vendors. If there is a component fulfills a purpose similar to your business, consider reusing that component. This requires much less effort and is more long-term maintainable.

After deciding what level of contribution meets your use case, open a [GitHub issue](https://github.com/ampproject/amphtml/issues/new) to start. 


## Level one contribution

Level one contributions share components and load vendor specific logic as custom JavaScript in a cross origin iframe. 

Vendors add configurations or features to existing extension to implement their functionalities. If such a component does not exist they may propose a new one. 

The only vendor specific logic checked into AMP repo is a vendor configuration. Adding a new vendor to an existing level one contribution typically does not need a design review. Vendors can follow the documentation of the component.

Vendor expectations:

*   Maintain and serve vendor’s custom JavaScript independently.
*   Provide tests for their configuration and respond to issues. 
*   Provide a troubleshooting channel for developers. 
*   Respond to any and all bug filings related to their service. 

### Level one example

[**amp-ad**](../../../components/amp-ad/?format=websites)

If you are an ad technology provider looking to integrate with AMP, read the [development overview](https://github.com/ampproject/amphtml/tree/master/ads#overview) or jump to the [developer instructions](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) for adding your support to [`amp-ad`](../../../components/amp-ad/?format=websites). Depending on the ad technology your company provides, you might find [these integration instructions ](ad-integration-guide/?format=ads)useful.

There are 90+ ad providers who have added support for advertising related features like amp-ad. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/2299) from the ad network [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## Level two contribution 

Level two vendor contributions share components. All logic is checked into the AMP repository, and no custom Javascript can be loaded into an iframe.  Vendors add configurations or features to existing extensions to implement their functionalities. If such a component does not exist they may propose a new one. 

All business logic is checked into AMP repo, but the only vendor specific logic checked in is a vendor configuration. If component works with a vendor provided config file, no design review is needed. If the vendor configuration implements a new feature or new component it will need to pass AMP’s design review. 

### Vendor expectations

*   Adding a new vendor to an existing level two contribution typically does not need a design review. Vendor can just follow the documentation of that component. 
*   Proposing a new component for level two contribution will need to be generic and shareable by other vendors.

### Level two examples

[**amp-analytics**](../../../components/amp-analytics/?format=websites)

AMP analytics allows you to send events back to your server based on triggers configured by you. We have written an [analytics integration guide ](../../optimize-and-measure/configure-analytics/?format=websites)to get you started.

If you only need to add a tracking pixel with dynamic parameters to your tracking URL, check out [`amp-pixel`](../../../components/amp-pixel/?format=websites). Be sure to document usage on your support pages for developers that may want to use your technology with AMP.

There are 20+ analytics providers who have added support to amp-analytics. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/1595) from the analytics provider [Parse.ly](https://www.parsely.com/help/integration/google-amp/).


[**amp-call-tracking**](../../../components/amp-call-tracking/?format=websites)

If you provide call tracking measurement services, your use case may be supported with [`amp-call-tracking`](../../../components/amp-call-tracking/?format=websites). This component dynamically replaces a phone number in a hyperlink to enable call tracking, by executing a CORS request to substitute the number.

To learn more about how this extension might work for you, please see [an example](../../../examples/components/amp-call-tracking/?format=websites) or read about the [reference documentation](../../../components/amp-call-tracking/?format=websites).

## Level three contribution

A level three contribution introduces a new vendor-specific component.
This is only applicable if vendors are unable to:

*   Find a component that exists for their use case. 
*   Request feature improvements to meet their use case.
*   Propose a component that applies to other vendors.

### Expectations

*   Write and propose a design review. 
*   Tests must be able to catch breakage. 
*   Fix, or request help, if the component breaks.
*   Provide through documentation with code samples.
*   Maintain and update documentation.  
*   Provide a troubleshooting channel for AMP developers to request assistance.
