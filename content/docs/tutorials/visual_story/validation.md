---
$title: Validating your AMP HTML 
$order: 7
---

Whenever you create an AMP page, you should always validate that your AMP HTML is correct. There are [several methods that you can use to validate your AMP pages](/docs/guides/validate.html).  In this tutorial, we'll enable the AMP Validator by turning on the developer mode.  To turn on the developer mode, add the following fragment identifier to your URL and reload the page:

```text
#development=1
```

For example:

```text
http://localhost:8000/pets.html#development=1 
```

Open the [Developer Console](https://developer.chrome.com/devtools/docs/console) in Chrome (or your preferred browser), and verify there are no AMP errors. You might need to refresh your browser to see validation messages. If your page is free of errors, you should see the message:

```text
 AMP validation successful.
```

## Checking best practices

{{ image('/static/img/docs/tutorials/amp_story/pg7-dev-logs.png', 720, 1280, align='right third', alt='Developer Logs for Cover Page'  ) }}

When you turned on the development mode, you might have noticed something else that appears on your AMP page--developer logs.

In development mode for AMP stories, the AMP Runtime performs special checks that provide guidance on making your AMP stories performant.  The checks provide best practices, such as:

* For videos and images larger than 720 px, you should use srcset.
* Images and videos in the "fill" layout should be in portrait orientation.

Go through the screens, and verify that all pages adhere to the best practices. You should see green check marks in the logs for all pages.

For more information on best practices, see the [AMP Story best practices](/docs/guides/amp_story_best_practices.html) guide.



<div class="prev-next-buttons">
  <a class="button prev-button" href="/docs/tutorials/visual_story/create_bookedn.html"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="/docs/tutorials/visual_story/congratulations.html"><span class="arrow-next">Next</span></a>
</div>
