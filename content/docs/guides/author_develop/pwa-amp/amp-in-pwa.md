---
$title: Embed & use AMP as data source
$order: 1
toc: true
---
[TOC]

If you've invested in AMP but haven't built a Progressive Web App yet, your AMP Pages can dramatically simplify your development of your PWA. In this guide you'll learn how to consume AMP within your PWA and use your existing AMP Pages as data-source.

## From JSON to AMP

In the most common scenario, a Progressive Web App is a single page application that connects to a JSON API via Ajax. This JSON API then returns sets of data to drive the navigation, and the actual content to render the articles.

You would then proceed and convert the raw content into usable HTML and render it on the client. This process is costly and often hard to maintain. Instead, you can reuse your already existing AMP Pages as content source. Best of all, AMP makes it trivial to do so in just a few lines of code.

##  Include "Shadow AMP" in your PWA

The first step is to include a special version of AMP we call “Shadow AMP” in your PWA. Yes, that’s right – we load the AMP library in the top level page, but it won’t actually control the top level content. It will only “amplify” the portions of our page that we tell it to.

Include Shadow AMP in the head of your page, like so:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

## Handle navigation in your PWA

You’ll still need to implement this step manually. After all, we don’t know how you want to present links to content in your navigation concept. A number of lists? A bunch of cards?

This step is up to you, but my guess is that you’ll fetch some JSON that returns ordered URLs with some metadata. In the end, you should end up with a function callback that fires when the user clicks on one of the links, and said callback should include the URL of the requested AMP page. If you have that, you’re all set for the final step.

## Use the Shadow API to render a page inline