---
$title: Add Interactivity support to Web Story tools
$order: 4
description: 'The [amp-story-interactive](https://amp.dev/documentation/components/amp-story-interactive/?format=stories) component provides various imersive elements that can be integrated into tools. Given the wide variety of options available to customize the elements, we have detailed what tools can do to have a seamless integration into the story creation workflow'
formats:
  - stories 
---

Interactive experiences provide a first-class support for user interactivity in Web Stories, and are designed with customization in mind. However, all the customization options can be overwhelming for users designing stories with interactive elements. We will be covering ways tools can integrate the interactive experiences into their existing workflows, and best practices to take into account.

## Import scripts

It's important when creating the stories to import the script by adding the following line:

```html
<script async custom-element="amp-story-interactive" src="https://cdn.ampproject.org/v0/amp-story-interactive-0.1.js"></script>
```

## Understanding the elements

Understanding how the elements work is crucial to integrating them successfully, so we have created [a Codepen collection](https://codepen.io/collection/DEGRLE) to host demos of the components and some of their styling variants.

Check out our guides on [how to integrate polls](https://amp.dev/documentation/examples/components/amp-story-interactive-poll/?format=stories) or [how to integrate quizzes with analytics](https://amp.dev/documentation/examples/components/amp-story-interactive-quiz/?format=stories) to Web Stories.

## Tips on integrating into tools

We have provided [Codepens](https://codepen.io/collection/DEGRLE) to show how the interactive elements might look in an editor. As shown there, it's possible to offer inline editing of the content, by reusing the HTML and CSS from each demo. Individual elements such as quizzes or polls have limited content customization besides the prompt and options content, but can be customized using many combinations of CSS variables and attributes.

### Sizing

The interactive elements work great across different screen resolutions by having a size that is dependent on the `font-size` value, which is by default set to a percentage of the screen size to adapt the elements correctly. However, story creators can resize the elements by changing the `font-size` rule. The recommended way of integrating sizing into editors is either to not allow users to change the size at all, or to give users a slider with good boundaries. For instance, if a tool wants to use `amp-story-grid-layer[aspect-ratio]` layouts, they might want to set a slider to go between 0.15ems and 0.3ems, which are good extremes for very large and very small elements. Tools can use ems, rems or percentage of `var(--story-page-vmin)` for instance, but is recommended to use the same type of units that they use for text, as these elements can be thought of as "regular text containers". Changing the `width` property should only be made within the predefined min and max values (if at all).

### Content management

Different tools have different degrees of content customization, but interactive elements have a fixed set of attributes that have to be specified in the elements for them to work properly. Tools should provide placeholders for 2 options and allow users to add up to 4 options when possible (either by editing the content inline or on a side menu), but should never allow a number of options that is not supported by the validation rules.

Elements that require image URLs such as amp-story-interactive-results can use already existing workflows to upload and show images.

Multi-state elements such as amp-story-interactive-results should allow users to change the values on each state independently either inline or on a side panel, but it's a good idea for users to preview each state as they are working on them, so having a preview selector could be a good idea.

Some content values are not easily visualized by previews such as confetti effects, but tools can get a preview of the animation working on the editor and show the animation as users change the values of confetti. Remember that some elements allow all options to have a confetti emoji, while others limit the confetti to certain options. Adding animations to the previews can also allow `animate-in` effects in the interactive elements, which are a great way to customize the experience further.

Some components receive specific fields for some options, which will require custom code in the UI to input (eg: what option is correct in a quiz), but most elements share to some extent all the content attributes, so reusing the code and UI is a good idea.

### Style management

Most elements support the same set of styling options, either through CSS variables or element attributes. All tools have different ways of styling elements, so they will provide a unique approach to customizing them. Tools that focus on consistent styling could incorporate an existing color palette for a story into all components at the same time, since applying the same set of CSS values to all the elements yield consistent results. Tools that focus on individual customization of elements may mave more refined controls over all CSS variables that are exposed for each element.

In terms of actual implementations, it's a good idea to give users control over the theme and chip-style of the elements, and ideally also allow them to control the accent color and prompt alignment. Variables such as prompt text and prompt background are interesting for users since they allow prompt backgrounds to be gradients, and they allow prompt text to be colored to match better the story design cues and improve contrast.

Tools can go above and beyond to give extra customization options for creators since the styling variants are so diverse. Many interesting designs can be implemented with the `chip-style="transparent"` attribute. For inspiration check out the [amp-story-interactive-results Codepen](https://codepen.io/mszylkowski/pen/abNWzdb) which contains creative designs for transparent styles. Those require extra CSS rules to be modified for the elements, such as the actual element's background, border (and border-radius), box-shadow, backdrop-filter, etc. When enabling extra options, keep in mind use-cases for them, as many CSS rules will not work on the elements (eg: font-family).

### Integrating amp-story-interactive-results

The interactive experience of gathering the answers to polls or quizzes might be complex for first-time users to understand, so tools should provide some guidance on that regard. Percentage results automatically link to quizzes while polls require extra configuration, but either way, users should get a warning when adding a result if no quizzes or poll were added to the story.

For quiz results, it's a good idea to allow users to set the thresholds visually (eg: with a slider split up into many sections) and be able to edit/preview all the states separately.

For categorical results (linked to polls) users should have a way of easily linking the `results-category` attributes to the states of the amp-story-interactive-results element. Confusion can happen if users manually mistype the category, resulting in the options not being properly linked to the result state, so it's a good idea to either give feedback to the user when the category in an option doesn't match the other categories defined on the story, or to provide users with dropdowns to link options to already defined categories.

More templated tools can also create entire workflows to make stories with polls and results, but this approach will not fit most WYSIWYG editors.

### Backends

Tools can support their own backends to aggregate the data, but it is recommended to use one of the already available endpoints in the [documentation](https://amp.dev/documentation/components/amp-story-interactive?format=stories). Setting up a backend is a significant effort and might require forward support as more types of experiences are rolled out.

If using one of the provided backends, tools should be able to fetch the state of the interactive data directly through the same endpoint as provided in the backend. This information can be either gathered server side or on the frontend.
