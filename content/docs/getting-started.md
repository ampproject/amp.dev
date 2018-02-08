---
$title: Quickstart
$order: 0
toc: true
---

[TOC]

{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

This guide provides key resources to quickly get you up and running with AMP.  For in-depth information, dive into the [AMP documentation](https://www.ampproject.org/docs/) or our [YouTube channel](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw). 

<hr>

## Getting started with AMP

Implement these key steps to get up and running with AMP:

1.  [Create your AMP pages](#create-your-amp-pages)
2.  [Validate your AMP pages](#validate-and-test-amp-pages)
3.  [Make your content discoverable](#make-your-content-discoverable)

## Using AMP day-to-day

Keep your AMP momentum going with all the resources AMP has to offer.

<a class="button" href="#amp-day-to-day-resources"> See resources</a>

<hr>

### Create your AMP pages

See the relevant sections below for: [using a CMS](#using-a-cms?), [starting from scratch](#starting-from-scratch?), or [converting existing content](#converting-existing-content?).

#### Using a CMS?

AMP supports integration with many third-party publishing platforms. Refer to the documentation for your publishing platform on how to create AMP pages.

<div>
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'CMS' %}
      <ul>
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ul>
    {% endif %}
  {% endfor %}
</div>

#### Starting from scratch?

If you're creating AMP pages or creatives from scratch, visit these resources:

*   [Tutorial: Create your first AMP page](https://www.ampproject.org/docs/tutorials/create)
*   [Tutorial: Add advanced AMP features](https://www.ampproject.org/docs/tutorials/add_advanced)
*   [AMP HTML specification](https://www.ampproject.org/docs/reference/spec#the-amp-html-format): *includes boilerplate, required markup, allowed HTML*
*   [AMPHTML Ads format](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md): *provides details on creating performant ads in AMP*
*   [YouTube video: What's allowed in AMP and what isn't?](https://youtu.be/Gv8A4CktajQ)
*   [Templates from AMP Start](https://www.ampstart.com/): *Try out some ready-made AMP page templates*

#### Converting existing content?

If you are converting your existing HTML pages to AMPHTML, visit these resources:

*   [Tutorial: Convert HTML to AMP](https://www.ampproject.org/docs/tutorials/converting)
*   [YouTube video: Use AMP HTML for your existing site](https://youtu.be/OO9oKhs80aI)

### Validate and test AMP pages

Before publishing your content, make sure your AMP pages are valid.  Here are some resources to use:

*   [Validate AMP pages](https://www.ampproject.org/docs/guides/validate): *provides a list of validation tools and instructions for validating your pages*
*   [YouTube video: How to validate & debug AMP pages](https://www.youtube.com/watch?v=npum8JsITQE&t=13s)
*   [Testing CORS in AMP](https://www.ampproject.org/docs/guides/amp-cors-requests#testing-cors-in-amp)

### Make your content discoverable

Ensure users can discover your content on third-party platforms (e.g., Twitter, Google, Bing, etc.). Here are some helpful resources:

*   [Make your page discoverable](https://www.ampproject.org/docs/guides/discovery): *tips for linking AMP pages and using metadata*
*   [Google Search guidelines for AMP pages](https://support.google.com/webmasters/answer/6340290)

<hr>

## AMP day-to-day resources

These resources will help with your day-to-day AMP journey:

*   Keep the [list of AMP components](https://www.ampproject.org/docs/reference/components) handy.  Each component reference page provides detailed information on how to integrate and use the component on your AMP pages.
*   Want examples and demos?  Visit [AMP By Example](https://ampbyexample.com/), which provides hands-on samples and a playground for using AMP components.
*   Need inspiration?
    *   [AMP Start](https://www.ampstart.com/) provides pre-styled templates and components that you can use to create styled AMP sites from scratch.
    *   Our [Showcase](https://www.ampproject.org/learn/showcases/) highlights noteworthy AMP pages "in the wild".
*   Need support? See [Getting Support](https://www.ampproject.org/support/developer/get_support) resources.
*   Stay up-to-date with the latest AMP news:
    *   Subscribe to [our blog](https://amphtml.wordpress.com/)
    *   Subscribe to the [The AMP Channel on YouTube](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw)
    *   Follow us on Twitter  [@AMPhtml](https://twitter.com/amphtml)
