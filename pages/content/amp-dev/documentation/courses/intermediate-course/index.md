---
$title: Course Introduction
$order: 1
$titles:
  teaser: Intermediate Course
teaser:
  icon: paperplane
  label: Start now
description: 'Learn to combine components and create simple user interactions.'
---

## Welcome Back

In the previous course, we learned how to create a basic AMP site by starting a website for our fictional Chico’s Cheese Bike shop. We also learned how to add static content to our site using AMP components. We added a carousel of images, social media posts, a video, and other essential elements.

What’s next? Now, we want to add some more pizzazz to our site. We want to give users new ways to interact with our site. We want to be able to collect information from our site's visitors and to confirm that we received that information successfully.

What kind of features should we add to our site to accomplish these goals? Our product manager has some ideas. For example:

- As our site grows, we're going to need a way for users to navigate between the pages. A common way to accomplish this is with a slide-out menu. We will press a button to open the menu and then press another button to close it.

- To collect information about our users for our marketing team, we might decide to add a newsletter subscription form.

- When users fill out their information, we'll store their data on our server and display a confirmation message that says we registered them for our newsletter successfully.

Now we know what new features to create. How are we going to build them?

In the beginner training, we learned that, to add a feature, we just find and add the right component. But the problem is, there’s no "amp-newsletter-subscription-form" component. You might think the objective is to find a component such as "amp-newsletter-subscription-form." If there was a different AMP component for every feature developers want to build, the number of components would be limitless!

Instead, we can build up our features by combining components and having them work together. This type of approach is called "component composition."

Composing components isn't hard, but it does take some practice. First, we’ll identify the requirements of the feature we want to build. Second, we’ll look for basic HTML elements and AMP components that satisfy our requirements. Lastly, we’ll connect the components together by either placing one component inside of another, or by configuring them so that interacting with one of our components causes a change in another component.

Along the way, we’ll also:

- Learn how AMP handles user interaction with event handlers and actions.

- Discuss how to collect user information using `<amp-form>`.

- Explain how to format server data using AMP mustache templates.

- Explore how to enhance a feature with added components and interactions.

## Course Prerequisites

This course is designed for current developers who want to build more performant websites and for aspiring developers looking to build their first websites. Additionally, this course is well-suited for anyone who is maintaining or working on an existing AMP site.

To get the most from these courses, you should have a basic understanding of HTML and CSS. It is enough to be able to recognize and to be able to make minor additions and alterations to existing HTML and CSS. In addition, this course will introduce a JavaScript-like syntax in the form of AMP event handlers. Understanding how function calls are made in JavaScript or a similar language should be sufficient to complete the requirements of this course.

This course is intended to be a continuation of the beginning course. As such, it assumes an understanding of the concepts covered by that training. Those concepts include:

- AMP page structure

- AMP boilerplate

- the AMP Validator

- how to use the AMP component documentation

- the AMP cache

If any of these topics are unfamiliar to you, we suggest reviewing the material from the beginning course [here]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/index.md', locale=doc.locale).url.path}}).

## Getting Set Up

In this course, we will continue using [Glitch](https://glitch.com). If you completed the beginning course, you can continue to use the same Glitch repository to complete the intermediate training. If you’d like to start from a new Glitch repository, you can remix [this](https://glitch.com/~aquamarine-baritone) one, which has all of the code already implemented.

Want to learn more about Glitch? You can read about it in the [appendix]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).

This course also requires the AMP Validator. The AMP Validator is a tool for detecting errors in our AMP pages. The Chrome extension provides one convenient way to access the validator. To install the Chrome extension, visit this link [here](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc/related?hl=en).

Ready? Let’s get started!
