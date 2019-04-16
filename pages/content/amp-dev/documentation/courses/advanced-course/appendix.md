---
$title: Appendix
$order: 4
---

## What is JSON?

`<amp-list>`, `<amp-bind>` and `<amp-state>` can read JSON data. JSON is short for JavaScript Object Notation. It is a "lightweight data-interchange format."  Even though it is based on a subset of JavaScript, it is language independent, which means that all languages can read and understand it. JSON data are represented, usually, in two ways: either as a collection of key (name) and value pairs, or as an ordered list of values (what we know as a list or array). The JSON syntax looks usually like this:

[sourcecode:json]
{
    "people": {
        "number": 2,
        "names": ["Alice", "Bob"]
    }
}
[/sourcecode]

If you want a full specification, you can look at the [official documentation](https://www.json.org/).

## What is Deep Merge?

We explained that when `AMP.setState()` is called, `<amp-bind>` will "deep-merge the provided object literal with the current state." The deep-merge functionality will not overwrite anything, but will rather merge the two objects. [In the example]({{g.doc('/content/amp-dev/documentation/components/amp-bind.html', locale=doc.locale).url.path}}#deep-merge-with-ampsetstate) on the `<amp-bind>` documentation, we see that providing only an age for the employee will just update the value of the age of the employee in the state.

[sourcecode:html]
{% raw %}<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
{% endraw %}[/sourcecode]

The result after the second button is pressed updates the age:

[sourcecode:json]
{
    employee: {
        name: 'John Smith',
        age: 64,
        vehicle: 'Car',
    }
}
[/sourcecode]

If amp-bind was applying a shallow merge, the result after the second button was pressed would be the following:

[sourcecode:json]
{
    employee: {
        age: 64,
    }
}
[/sourcecode]

A shallow copy would just update the whole structure. Deep merge takes care to add to the state new elements merging existing entries, rather than updating them completely.

## What is Glitch?

To complete the code examples included in these courses, we will be using [Glitch](https://glitch.com/). Glitch is an online code editor that allows you to create and view web sites and server APIs without having to install anything on your computer.

The Glitch code editor environment looks like this:

{{ image('/static/img/courses/intermediate/image12.png', 533, 344, caption='The online editor of Glitch') }}

The red box above is the online editor where you will be inputting HTML and CSS. The green box marks the button that will take you to the live version of the page you are creating. The yellow box is the button that lets you create a copy of this project and edit it. The blue box indicates the files that you have available. In the assets folder, you can find your images.

Throughout these courses, you will need various images to complete the exercises. All of the images you need to complete these courses have already been added to the Glitch projects. To view the images in your project, click on the assets entry in the list of files on the left-hand side of the Glitch editor. To get the link to any single image, select the image from the list of assets on the right-hand side and click the “copy” button next to the URL in the pop-up that appears. You can use that link anywhere an image is needed.

{{ image('/static/img/courses/intermediate/image10.png', 1686, 936, caption='The assets view in Glitch') }}

{{ image('/static/img/courses/intermediate/image9.png', 1484, 1416, caption='The details pop-up -including URL- for an image in the assets collection') }}

Open [this](https://glitch.com/edit/#!/enshrined-eyebrow) project. Click the “Remix This” button on the top right. This will create a new project that you can edit. You can continue to use this same editor for this and future trainings. Each future tutorial will give you the opportunity to start with a reference version of the solution up to that point.

It’s not necessary to use Glitch to complete these trainings. However, some of the code required to complete the exercises is not discussed in these courses, but is contained in the Glitch samples. If you’d like to use another editor, you may still need to go into the Glitch samples to copy the CSS and server code into your local solution.
