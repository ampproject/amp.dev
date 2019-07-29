---
$title: Formatting guides & tutorials 
$order: 2
description: 'File formatting requirements for amp.dev'
formats:
  - websites
  - stories
  - ads
  - email
author: CrystalOnScript
---

Guides and tutorials are submitted in [Markdown](https://www.markdownguide.org/), with an additional frontmatter and shortcode formatting. 


## Documentation locations

Content on amp.dev is pulled from two repositories, amp.dev and AMPHTML. All reference documentation under components is pulled from AMPHTML, either from builtins or extensions. 



*   [Built-in components ](https://github.com/ampproject/amphtml/tree/master/builtins)
*   [Components](https://github.com/ampproject/amphtml/tree/master/extensions) 
*   [Courses](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses) 
*   [Examples](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
*   [Guides & tutorials](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

There are several other documents that are imported to amp.dev from AMPHTML. They are [listed in this file](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json)._ If you update any of these documents in the amp.dev repository it will be re-written on the next build_.  


## Frontmatter 

Frontmatter exists at the top of each guide and tutorial. 

Example:

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```
<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>The title of your document as it will appear in the table of contents. Capitalize the first letter of the first word, except for “AMP” and other proper nouns. Use the ampersand `&` instead of the word `and`.
   </td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>Define where in the table of contents your document appears. You may need to edit the `$order` in other documents for it to appear in the correct position. 
   </td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>List the AMP experiences your document is relevant to. If your document was relevant to AMP websites and AMP stories, but not AMP ads or AMP email, your frontmatter would like the following:
    ```yaml
        formats:
          - websties 
          - stories
    ```  
   </td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>The author is you! Use your GitHub username. 
   </td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>List anyone who contributed to your document. This field is optional.
   </td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>Write a brief description of your guide or tutorial. This helps with search engine optimization, getting your work into the hands of those who need it! 
   </td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>Add `tutorial: true` to the frontmatter for the website to add the tutorial icon next to it. Tutorials are at the bottom of their section in the table of contents.
   </td>
  </tr>
</table>

# Shortcodes

For a list of shortcodes and their uses, please view [documentation.md on GitHub](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes).

# Filtering sections
Some documents may be relevant for multiple AMP formats, but certain formats may need further explanation or information that is not relevant to the others. You can filter these sections by wrapping them in the following shortcode.

<div class="ap-m-code-snippet">
<pre>
&lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&lsqb;/filter]

&lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&lsqb;/filter]

&lsqb;filter formats="websites, email"]
This is visible for [websites](?format=websites) & [email](?format=email).
&lsqb;/filter]

&lsqb;filter formats="stories"]
This is visible for [stories](?format=stories).
&lsqb;/filter]
</pre>
</div>

