---
$title: Handling User Interactions
$order: 2
---

## Building A Menu

Users need a way to navigate websites with many pages. In many sites and apps you might have seen, this is accomplished with a navigation menu. The requirements for the menu from our product manager are as follows:

- Users open the menu by clicking an icon (`☰`) at the top of the page.

- Once the menu is open, it can be closed by clicking off of the menu or by clicking an `X` icon in the top right corner of the menu.

- The menu should contain several links that navigate to other pages when clicked.

From the [list]({{g.doc('/content/amp-dev/documentation/components/index.md', locale=doc.locale).url.path}}) of AMP components, we decide on the following:

- The menu will be implemented using `<amp-sidebar>`.

- The `☰` and `X` icons will be implemented as `<div>` tags that open the menu when clicked.

- The collection of page links will be implemented as an unordered list of anchor tags (`<ul>`, `<li>`, and `<a>` tags).

Some questions still remain. For example, how do we detect when a user has clicked the icons to open or close the menu? Or, how do we open the `<amp-sidebar>` component?

We need to understand how to detect user inputs in AMP and how to perform actions in response to those user inputs.

## Introduction to User Interaction and Events

Think of all the ways there are to interact with websites. These include clicking a mouse, tapping our fingers on our touchscreen, or typing with our keyboards. Clicking a button might mark all our email as read, or it might open a menu. Pressing Escape on our keyboard might close a pop-up. Swiping right with our fingers might accept a task or a connection with another user.

When a user interacts in any of these ways with an element on our website, an event is triggered. Events provide ways for the elements and components on our websites to tell us that something important just happened.

In AMP, we can choose which events are important to us and "handle" them by using the `on` property with HTML tags and AMP components to indicate a desire to react to an interaction. When a user performs an action like the ones we described above, an "event" is triggered on the affected component. In response to that event, the "action" specified in the `on` property will execute.

For example, imagine a button that makes a message disappear from the screen. In AMP, when the user clicks the button, the `tap` event is fired. If that event is included in the `on` attribute for that button, the event handler runs, which hides a warning message.

This sequence of events could be implemented in classic HTML like this:

[sourcecode:html]
{% raw %}<div id="warning">This is a warning.</div>
<button onclick="document.getElementById(‘warning’).hidden = true;">
    Hide Warning
</button>
{% endraw %}[/sourcecode]

If you’ve ever used jQuery, the equivalent would be the following:

[sourcecode:html]
{% raw %}<div id="warning">This is a warning.</div>
<button onclick="$('#warning').hide();">
    Hide Warning
</button>
{% endraw %}[/sourcecode]

In AMP, meanwhile, it would look like this:

[sourcecode:html]
{% raw %}<div id="warning">This is a warning.</div>
<button on="tap:warning.hide">
    Hide Warning
</button>
{% endraw %}[/sourcecode]

In the `on` attribute above, we see `tap:warning.hide`. In this case, `tap` is the event, `warning` is the ID of the element to act upon, and `hide` is the action to perform. Note that `hide` is one of the [generic actions]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path}}) that is available on every AMP component and even other HTML elements. The documentation for an AMP component will usually contain a list of actions that can be performed on that component.

Some actions take the form of functions and may accept arguments. In other cases, actions can be omitted entirely if the action is obvious. In each case, details can be found in the documentation for that component. We’ll see examples of each of these types of actions later in this course.

## Exercise 1: Building The Menu

Now it’s time to implement the navigation menu in our site using the `<amp-sidebar>` component. `<amp-sidebar>` is a panel of content that is initially hidden off-screen. When the sidebar is opened, the panel of content slides into view. The sidebar is opened by calling an action on the component. It can open on either the right or left side of the screen. The side the component appears on is controlled via the `side` attribute (default value is `left`). The sidebar remains on-screen until it is closed via an action, or until a user clicks outside of the component.

A sidebar with the ID `sidebar1` can be opened with the following actions:

- `sidebar1.open`

- `sidebar1.toggle`

- `sidebar1`

Once open, a sidebar with the ID `sidebar1` can be closed with the following actions:

- `sidebar1.close`

- `sidebar1.toggle`

Now, using the documentation for [`<amp-sidebar>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-sidebar.md', locale=doc.locale).url.path}}) and the list of [AMP Events and Actions]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path}}), add a navigation menu that matches the following specifications:

- In the `<header>` element of the page, add a `<div>` containing the text icon ☰ that toggles the sidebar when tapped.

- Add an `<amp-sidebar>` component with the `id` `sidebar1` that displays on the left-hand side of the screen.

- Add a list of four items to the menu that all link to `#` for now (it’s a link that goes nowhere, but we’ll add the actual URLs in a future step): Our Story, Our Bikes, Latest Models, and Contact.

- We need to make one button that opens the menu and another that closes it. At the top of sidebar, add a `<div>` containing an X that toggles the sidebar.

- Surround the list of links in the sidebar with a `<nav>` HTML element.

- Implement the list of links as an unordered list (`<ul>`) containing list items (`<li>`) containing anchor links (`<a>`).

Recommended CSS guidelines:

- Give the `<amp-sidebar>` a class of `sidebar`.

- Give the `nav` element a class of `nav`.

- Give the `ul` element a class of `label`.

- Give the `li` elements a class of `nav-item`.

Once you are done, your page should look like this before and after the menu slides out:

{{ image('/static/img/courses/intermediate/image5.png', 309, 550, align='center third', caption='The toggle button on the header.') }}

{{ image('/static/img/courses/intermediate/image13.png', 309, 550, align='center third', caption='The side menu.') }}

[tip type="read-on"]
**Note**: Keep in mind that the above styling recommendations are just that: recommendations! We have already added the custom CSS for you so that you can just use the relevant classes and style your content to end up with the same result as the screenshots above. If you want to add your own styling to your page, you can write your own CSS.
[/tip]

### Solution

The portion of the page containing the sidebar should look like this:

[sourcecode:html]
{% raw %}<header class="headerbar">
    <div class="navbar-trigger" role="button" tabindex="0" on="tap:sidebar1.toggle">☰</div>
    <h2>Chico's Cheese Bicycles</h2>
</header>
<amp-sidebar class="sidebar" id="sidebar1" layout="nodisplay" side="left">
    <div class="navbar-trigger" role="button" tabindex="0" on="tap:sidebar1.toggle">X</div>
    <nav class="nav">
        <ul class="label">
            <li class="nav-item">
                <a href="#">Our Story</a>
            </li>
            <li class="nav-item">
                <a href="#">Our Bikes</a>
            </li>
            <li class="nav-item">
                <a href="#">Latest Models</a>
            </li>
            <li class="nav-item">
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>
</amp-sidebar>
{% endraw %}[/sourcecode]

Also, remember to include the `<amp-sidebar>` JavaScript in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
{% endraw %}[/sourcecode]

## Accessibility

Did you check the AMP validator while you were making your sidebar? While you were working, you might have gotten error messages like these:

{{ image('/static/img/courses/intermediate/image6.png', 544, 197, align='center', caption='Validation errors') }}

Two different errors appear here, duplicated for each of the clickable elements to which we attached an `on` attribute. But why?

Remember that AMP enforces best practices on the web. In this case, AMP is making sure that your pages are accessible to users who use assistive technologies, such as screen readers.

Let’s see the first one:

```
The attribute 'role' in tag ‘div' is missing or incorrect, but required by attribute 'on'.
```

In this example, we added a `<div>` element that acts as a button. That is, the `<div>` is clickable, and triggers an "event" when clicked. People with certain disabilities require assistive technologies, such as screen readers, to browse the web. A screen reader needs to know which elements are behaving like buttons, so it can communicate that fact to the user. If your element is clickable, then you have to inform the screen reader. So, to get rid of the error, you have to add a `role="button"` attribute to your clickable `<div>`s.

Now for the second error:

```
The attribute 'tabindex' in tag 'div' is missing or incorrect, but required by attribute 'on'.
```

Some of our `<div>`s function as buttons. Buttons allow for user interaction, so that AMP knows they’re focusable. "Focusable" means that if a user navigates your webpage using only a keyboard, they can highlight and interact with the focusable component. In this case, the solution is to add a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) to the `<div>`s that toggle the sidebar, so users can reach the element using their keyboard.

## Exercise 2: Adding Submenus To Our Sidebar

Uh-oh! Our product manager calls and says that the marketing team has requested too many types of cheese bikes for the site to display in the menu as one single list. (After all, we recently added soft cheeses to our product inventory.) The manager suggests that it would be better to organize the extra sections into sub-menus. Clicking a section header would expand the corresponding sub-menu, revealing the nested links. Clicking the section header again would close the sub-menu, hiding all the contained links.

The documentation for <`amp-sidebar>` doesn’t explain how to implement a nested sub-menu. We need to find another component that we could use in conjunction with `<amp-sidebar>` that would give us the ability to add a collapsible sub-menu to our sidebar.

If we go to Google and search for "ui collapsible content," we see several search results about how to build an "accordion." We realize after looking through the results that an accordion is exactly what we need. But does AMP provide something that can work as an accordion?

Looking through the [list]({{g.doc('/content/amp-dev/documentation/components/index.md', locale=doc.locale).url.path}}) of AMP components, in the layout section we find that there is indeed an [`<amp-accordion>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-accordion.md', locale=doc.locale).url.path}}) component that matches our needs.

We can place the `<amp-accordion>` component inside of the `<amp-sidebar>` component just as we put `<ul>`, `<li>`, and `<a>` tags inside of the `<amp-sidebar>` in the previous exercise. When the menu is open, the accordion components will display in their default collapsed condition. Then the accordions can be expanded or closed by interacting with them. When the menu is closed, the accordions will disappear with all of the rest of the content in the menu. With `<amp-sidebar>` and `<amp-accordion>` working together, we can create a slide-out nested navigation menu!

[tip type="read-on"]
**Note**: We’ve actually already practiced putting AMP components inside of other components. Remember when we created our first image carousel by placing `<amp-img>` components inside of the `<amp-carousel>` component? Placing components inside of other components is one way that they can work together effectively. We’ll look at other ways to combine components later in this course.
[/tip]

{{ image('/static/img/courses/intermediate/image4.png', 465, 387, caption='Two-level navigation menu on the AMP website') }}

Using the documentation for [`<amp-accordion>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-accordion.md', locale=doc.locale).url.path}}), enhance your sidebar navigation to add sub-menus with the following specifications:


* Convert the "Our Bikes" list item in the `<amp-sidebar>` into an expandable list that contains Chico's Cheese Bicycles' available bikes: Ricotta Racer, Cheddar Chase, and Parmesan Pacer.

* Convert the "Latest Models" list item in the `<amp-sidebar>` into an expandable list that contains Chico's Cheese Bicycles' latest model: the notorious Ricotta Racer.

Recommended style guidelines:

* Add a `nav-dropdown` class to the `<li>`'s that contain expandable lists.

* Add a `dropdown` class to each `<amp-accordion>` that you added.

* Add a `dropdown-item` class to each of the nested list `<li>` elements and a `dropdown-items` class to the nested `<ul>` element.

* Give `<amp-accordion>` that you added a `layout` of `container`.

Once you have finished, your expanded side menu should look like this:

{{ image('/static/img/courses/intermediate/image2.png', 309, 550, align='center third', caption='The expanded menu.') }}

### Solution

[sourcecode:html]
{% raw %}<amp-sidebar class="sidebar" id="sidebar1" layout="nodisplay" side="left">
    <div class="navbar-trigger" on="tap:sidebar1.toggle">X</div>
    <nav class="nav">
        <ul class="label">
            <li class="nav-item">
                <a href="#">Our Story</a>
            </li>
            <li class="nav-item nav-dropdown">
                <amp-accordion layout="container" disable-session-states class="dropdown">
                    <section>
                        <header>Our Bikes</header>
                        <ul class="dropdown-items">
                            <li class="dropdown-item">
                                <a href="#">Ricotta Racer</a>
                            </li>
                            <li class="dropdown-item">
                                <a href="#">Cheddar Chaser</a>
                            </li>
                            <li class="dropdown-item">
                                <a href="#">Parmesan Pacer</a>
                            </li>
                        </ul>
                    </section>
                </amp-accordion>
            </li>
            <li class="nav-item nav-dropdown">
                <amp-accordion layout="container" disable-session-states class="dropdown">
                    <section>
                        <header>Latest Models</header>
                        <ul class="dropdown-items">
                            <li class="dropdown-item">
                                <a href="#">Ricotta Racer</a>
                            </li>
                        </ul>
                    </section>
                </amp-accordion>
            </li>
            <li class="nav-item">
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>
</amp-sidebar>
{% endraw %}[/sourcecode]

Remember to include the `<amp-accordion>` JavaScript in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
{% endraw %}[/sourcecode]
