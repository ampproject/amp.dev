---
$title: Course Introduction
$order: 1
toc: true
---

[TOC]

## Who is this course for?

This course is designed for aspiring first-time web developers and current developers looking to build performant websites. Throughout this and the following courses, you will:

- Be introduced to the ways AMP pages differ from traditional “vanilla” websites.

- Incrementally build a sample project using real AMP components and best practices.

- Learn strategies for building modern websites.

## Prerequisites

To get the most from these courses, you should have a basic understanding of HTML and CSS. It is enough to be able to recognize HTML and CSS code, and to be able to make minor additions and alterations as instructed through the exercises. Please note that teaching these concepts is beyond the scope of this course. If necessary, you can find a refresher on HTML [here](https://developer.mozilla.org/en-US/docs/Web/HTML) and on CSS [here](https://developer.mozilla.org/en-US/docs/Web/CSS).

## Follow the Code With Glitch

To complete the code examples included in these courses, we will be using [Glitch](https://glitch.com/). Glitch is an online code editor that allows you to create and view websites without the need to install anything on your computer. It also allows you to create a server, all within the Glitch interface.

The Glitch code editor environment looks like this:

{{ image('/static/img/courses/beginner/image13.png', 1024, 768, caption='Glitch environment') }}

The red box above indicates the online editor where you will be typing HTML and CSS. The green box indicates the button that will take you to the live version of the page you are creating. The yellow box is the button that lets you create a copy of this project and edit it. The blue box indicates the files that you have available. In the assets folder, you can find your images.

Throughout these courses, you will need various images to complete the exercises. All of the images you need to complete these courses are contained within our Glitch projects. To view the images in your project, click on the assets entry in the list of files on the left-hand side of the Glitch editor. To get the link to any single image, select the image from the list of assets on the right-hand side. Click the “copy” button next to the URL in the pop-up that appears. You can then use that link anywhere an image is needed.

{{ image('/static/img/courses/beginner/image8.png', 1024, 768, caption='The assets view in Glitch') }}

{{ image('/static/img/courses/beginner/image12.png', 1024, 768, caption='The details pop-up (including URL) for an image in the assets collection') }}

In this course, we will start with a basic HTML page. We have created an empty project on Glitch containing a few images, server code that you’ll need later, and an index.html file with a title and a single image.

Open [this](https://glitch.com/edit/#!/nosy-leech) project to begin. Click the “Remix This” button on the top right-hand side to create a new project that you can edit. You can continue to use this editor for this and future courses. Each future course will also give you the opportunity to start with a reference version of the solution to that point.

You don’t have to use Glitch to complete these trainings. However, some of the code required to complete the exercises is only contained in the Glitch samples. If you’d like to use another editor, you may still need to use the Glitch samples to find this code.

## Setting Up The AMP Validator

To detect errors in our AMP pages, we have a valuable tool at our fingertips: the AMP Validator. Writing valid AMP pages is key to accessing the framework’s full benefits. The AMP Validator can be accessed in two ways: via a Chrome extension, or by adding a parameter to our URL so that our AMP page uses the built-in validator. For the purposes of this course, we suggest you use the Chrome extension, as it’s easier to use and access while you build your site.

- To install the Chrome extension, visit the link [here](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc/related?hl=en).

- To instead use the built-in AMP Validator, add `#development=1` at the end of your AMP page URL, and open the developer console in your browser to see the results. You don’t need to add this parameter if you’re using the Chrome extension.

[tip type="note"]

Note on using Glitch: To witness the validator in action, open your page in a new window to see it live by clicking the “Show Live” button on the top left. When the page is open, the icon for the AMP Validator will light up, indicating that it recognizes the page as AMP.

If you’re using the Chrome extension, look at the top right of your browser just to the right of the address bar. You should see the AMP sign there. Click it.

If you want to use the built-in validator, add the hash to your URL like this:

For example, your URL

`https://YOUR_PROJECT.glitch.me/` will become

`https://YOUR_PROJECT.glitch.me/#development=1`

[/tip]

## What we'll build

Throughout this and the following two courses, you will build a website for Chico’s Cheese Bicycles Shop. Chico has developed a revolutionary bicycle made entirely out of cheese! Demand for the new bicycles is so high that Chico needs to get a website up as quickly as possible to handle orders and market their new products! When we’re finished with these courses, Chico’s site will look very much like this:

{{ image('/static/img/courses/beginner/image12.png', 311, 550, caption='Completed AMP page for this tutorial') }}

You can click on [this link](https://nice-consonant.glitch.me/) to see a live preview. Play around with the site. We have videos, embedded tweets, a login form, an image carousel, and ways to share our site on social media! Open the navigation menu by clicking on the icon made of three lines in the upper-left corner (also called a ‘hamburger menu icon’). Once the menu expands, click on the link to view the list of products. Notice how the list of products can be both sorted by price and filtered by category. Click on any of the products. Notice how more details about that product pop up on the screen?

This site is a collection of features we see on many sites online today. This site was built entirely using AMP, and over the course of these lessons, you’re going to build this site yourself as well.

<div class="prev-next-buttons">
<a class="button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/courses/beginner-course/our-first-amp-page.md', locale=doc.locale).url.path}}"><span class="arrow-next">Let’s dive in!</span></a>
</div>
