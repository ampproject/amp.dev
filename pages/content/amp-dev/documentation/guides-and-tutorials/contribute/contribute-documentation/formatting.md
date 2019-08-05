---
$title: Formatting guides & tutorials 
$order: 3
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

Content on amp.dev is pulled from two repositories, [amp.dev](https://github.com/ampproject/amp.dev) and [AMPHTML](https://github.com/ampproject/amphtml). All reference documentation under components is pulled from AMPHTML, either from builtins or extensions. 

*   [Built-in components ](https://github.com/ampproject/amphtml/tree/master/builtins)
*   [Components](https://github.com/ampproject/amphtml/tree/master/extensions) 
*   [Courses](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses) 
*   [Examples](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
*   [Guides & tutorials](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

There are several other documents that are imported to amp.dev from AMPHTML. They are [listed in this file](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). Don't update these documents in the amp.dev repository – your changes will get overwritten on subsequent builds!  

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
          - websites 
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

## Filtering sections
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

## Tips
You can add tips and callouts by wrapping text in the following shortcode:

<div class="ap-m-code-snippet">
<pre>
&lsqb;tip type="default"]
Default tip
[/tip]

&lsqb;tip type="important"]
Important
[/tip]

&lsqb;tip type="note"]
Note
[/tip]

&lsqb;tip type="read-on"]
Read-on
[/tip]
</pre>
</div>

## Code snippets
Place code snippets inside sets of three backticks, specify the language at the end of the first set of backticks.

<div class="ap-m-code-snippet">
<pre>
&#96;&#96;&#96;html
  // code sample
&#96;&#96;&#96; 

&#96;&#96;&#96;css
  // code sample
&#96;&#96;&#96;

&#96;&#96;&#96;js
  // code sample
&#96;&#96;&#96;
</pre>
</div>

If your code contains double curly braces, which often is the case if you use [`amp-mustache`]({{g.doc('/content/amp-dev/documentation/components/amp-mustache.md', locale=doc.locale).url.path}}?format=websites) templates, you have to wrap the code part:

<div class="ap-m-code-snippet">
<pre>
&#96;&#96;&#96;html
&#123;&#37; raw	&#37;&#125;
  // code with double curly braces
&#123;&#37; endraw	&#37;&#125;
&#96;&#96;&#96;
</pre>
</div>

### Code snippets in lists
Python-Markdown has some limitations. Use the following syntax when including code snippets in lists:

<div class="ap-m-code-snippet">
<pre>
1. First: 
    &lsqb;sourcecode:html]
      &#60;html>
        &#60;p>Indented content.&#60;/p>
      &#60;/html>
    &lsqb;/sourcecode]
  2. Second
  3. Third
</pre>
</div>

## Links
Guides and tutorials are filterable by AMP format, such as AMP websites or AMP stories. Readers who filter their content often want to keep it this way. When linking out to a different guide or tutorial, use the following structure:

<div class="ap-m-code-snippet">
<pre>
 &lsqb;link](&#123;&#123;g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path&#125;&#125;?format=websites)
</pre>
</div>

The structure can be broken down into:

<div class="ap-m-code-snippet">
<pre>
//Explains it is a page that exists in the docs repository. 

(&#123;&#123;g.doc

// When linking to another guide and tutorial this will be the filepath, 
// fill in the rest with the proper document route. 

&#47;content&#47;amp-dev&#47;documentation&#47;guides-and-tutorials

//If linking to an example.

&#47;content&#47;amp-dev&#47;documentation&#47;examples&#47;

//Keeps the document on the chosen language, if available. 

locale=doc.locale

//Explains the page exists in the docs repository.

)url.path&#125;&#125;


//Define the filtered format. 
//Default to websites if your document is relevant to websites and another format. 

?format=websites
</pre>
</div>

## Document Structure 
### Titles, headings and subheadings
The first letter of the first word in titles, headings and subheadings is capitalized, what follows is lowercase. Expectations include AMP and other proper nouns. No heading is titled `Introduction`, introductions follow the document title.

### Document naming
Name documents with the dash naming convention. 

<table>
  <tr>
   <td><strong>Do</strong>
   </td>
   <td><strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md
   </td>
   <td>hello_world_tutorial.md
   </td>
  </tr>
  <tr>
   <td>website-fundamentals.md
   </td>
   <td>websiteFundamentals.md 
   </td>
  </tr>
  <tr>
   <td>actions-and-events.md
   </td>
   <td>actionsandevents.md
   </td>
  </tr>
</table>
