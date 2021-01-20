---
$title: Navigating your site
$order: 5
description: Most mobile websites include a site navigation menu. These menus can take many different forms. In this tutorial, we'll try out the following examples for ...
---

Most mobile websites include a site navigation menu. These menus can take many different forms. In this tutorial, we'll try out the following examples for presenting navigation in AMP pages:

- A link back to your home page - the simplest option.
- A side navigation bar by using the [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) component.

## Link back home

The simplest way to get your users to access your website’s regular navigation options is to just funnel them back to your homepage!

Try **replacing** your `<header>` tag with this version that includes a link:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img class="home-button" src="icons/home.png" width="36" height="36"></amp-img>
  </a>
 <div class="site-name">News Site</div>
</header>
```

And **add** these style rules to your inline CSS:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

Now **refresh** the page. You should see a link in the top-left corner of the page pointing to `homepage.html`.  If you click the home icon, you’ll quickly discover it doesn’t lead anywhere (because we don't have a `homepage.html` file).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Home icon navigation') }}

This link can be replaced with the URL of your website’s homepage to allow your users to navigate to other parts of your site through your existing website’s navigation.

This is the simplest approach that leverages your existing website navigation. Next, we’ll explore a popular option for site navigation.

## Navigate with a sidebar

A common navigation technique is to add a menu icon that when clicked reveals a set of navigation links (from the side of the page). In AMP,  we can create such navigation with the [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) component.

First, we must **add** the [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) component’s JavaScript to the `<head>` tag:

```html
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
```

Next, we want to display a menu icon.  When the icon is tapped, it will open the sidebar. **Replace** the `<header>` with the following code to display a ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button) icon instead of a home icon:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
  <div class="site-name">News Site</div>
</header>
```

In the above code, we `toggle` the sidebar through the [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) action attribute on the [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) element, which is identified by the `sidebar1` ID.  Let's add the sidebar.

**Add** the following HTML just after the `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div role="button" aria-label="close sidebar" on="tap:sidebar1.toggle" tabindex="0" class="close-sidebar">✕</div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Our sidebar will be hidden, but when the user taps the hamburger icon, the menu will appear from the left side of the screen.  To close the menu, the user can tap the X icon.

Finally, **add** these style rules to your inline CSS:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom:10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Okay, let's see our sidebar. **Refresh** and reload your AMP page.  You should see something like this:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Sidebar menu navigation') }}

Our page is looking great!  Let's add one final touch&mdash;a custom font.
