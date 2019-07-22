---
$title: Appendix
$order: 6
---

## What is Glitch?

To complete the code examples included in these courses, we will be using [Glitch](https://glitch.com/). Glitch is an online code editor that allows you to create and view web sites and server APIs without having to install anything on your computer.

The Glitch code editor environment looks like this:

{{ image('/static/img/courses/intermediate/image12.png', 533, 344, caption='The online editor of Glitch') }}

The red box above is the online editor where you will be inputting HTML and CSS. The green box marks the button that will take you to the live version of the page you are creating. The yellow box is the button that lets you create a copy of this project and edit it. The blue box indicates the files that you have available. In the assets folder, you can find your images.

Throughout these courses, you will need various images to complete the exercises. All of the images you need to complete these courses have already been added to the Glitch projects. To view the images in your project, click on the assets entry in the list of files on the left-hand side of the Glitch editor. To get the link to any single image, select the image from the list of assets on the right-hand side and click the “copy” button next to the URL in the pop-up that appears. You can use that link anywhere an image is needed.

{{ image('/static/img/courses/intermediate/image10.png', 1686, 936, caption='The assets view in Glitch') }}

{{ image('/static/img/courses/intermediate/image9.png', 1484, 1416, caption='The details pop-up -including URL- for an image in the assets collection') }}

Open [this](https://glitch.com/edit/#!/aquamarine-baritone) project. Click the “Remix This” button on the top right. This will create a new project that you can edit. You can continue to use this same editor for this and future trainings. Each future tutorial will give you the opportunity to start with a reference version of the solution up to that point.

It’s not necessary to use Glitch to complete these trainings. However, some of the code required to complete the exercises is not discussed in these courses, but is contained in the Glitch samples. If you’d like to use another editor, you may still need to go into the Glitch samples to copy the CSS and server code into your local solution.

## Viewing the server response

We know that we can render server responses by accessing the properties of the JSON object returned by the server. But, how can you check what these properties are, really?

In case you ever need to check a server response, you can do so using the developer tools in your browser. If you open Chrome DevTools and go to the Network tab, you will find your request there. It’s the “submit-form” request. If you click on it, you can see all the relevant information.

{{ image('/static/img/courses/intermediate/image1.png', 434, 289,align='center', caption='The server response') }}