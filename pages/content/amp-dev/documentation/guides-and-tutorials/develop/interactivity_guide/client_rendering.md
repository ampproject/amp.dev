---
formats:
  - websites
$title: Client-side rendering in AMP
$order: 4
description: This guide outlines client-side rendering possibilities in AMP.
author: CrystalOnScript
contributors:
  - sbenz
---

This guide outlines client-side rendering possibilities in AMP. By default, AMP pages are server-side rendered. However, in certain cases it's necessary to dynamically render data, such as a list of articles or items in a user’s shopping cart.

# Rendering on page load

Although its name may be misleading, [`amp-list`](../../../components/reference/amp-list.md) is the go-to solution for client-side rendering in AMP. The amp-list component works in a wide range of client-side rendering needs. It can render a single item or provide infinite scrolling and pagination. It allows dynamic content rendering on page load and can [update that content after a user interacts with the page](#rendering-after-user-interaction). Use the default loading indicator, or [build your own](https://amp.dev/documentation/examples/multimedia-animations/custom_loading_indicators/), for the best UX, especially when fetching from a remote endpoint.

The amp-list component uses a remote JSON endpoint, a local amp-state element, or a local amp-script element, to render dynamic content on page load. Default use of amp-list requires each JSON to have an items array.

[example preview="top-frame" playground="true" imports="amp-bind, amp-list" template="amp-mustache"]
```html
<amp-state id="weekdays">
    <script type="application/json">
    {
      "items": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    }
    </script>
  </amp-state>
  <amp-list layout="fixed-height" 
            height="126" 
            src="amp-state:weekdays" 
            binding="no">    {% raw %}
    <template type="amp-mustache">
      {{.}}
    </template>
    {% endraw %}
  </amp-list>
```
[/example]

This is adjustable through use of the `single-item` and `items` attributes.

[example preview="top-frame" playground="true" imports="amp-bind, amp-list" template="amp-mustache"]
```html
  <amp-list layout="fixed-height" 
            height="18" 
            src="/documentation/examples/api/time" 
            binding="no" 
            single-item 
            items=".">
    {% raw %}<template type="amp-mustache">
      The time is: {{time}}
    </template>{% endraw %}
  </amp-list>
```
[/example]

AMP render's content using [`amp-mustache`](../../../components/reference/amp-mustache.md) templates.

For the best user experience, and to remain AMP-valid, you must predefine the height of rendered content. This can be done with the following layouts:

*   `responsive`
*   `fill`
*   `fixed-height`
*   `fixed`
*   `flex-item`

A best practice is to use the `fixed-height` layout attribute on the amp-list element.

To avoid blank space while content is loading, display a [placeholder](../style_and_layout/placeholders.md) within the `amp-list` component.

[example preview="top-frame" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list height="32" width="80"
    src="/login-button"
    binding="no"
    items="."
    single-item>{% raw %}
    <template type="amp-mustache">
    {{#loggedIn}}
    <button>Logout</button>
    {{/loggedIn}}
    {{^loggedIn}}
    <button>Login</button>
    {{#loggedIn}}
  </template>
  {% endraw %}
  <button disabled placeholder>Login</button>
</amp-list>
```
[/example]

If using multiple `amp-list` implementations, a best practice is to use a single fetch and share the data.

## Render from a JSON endpoint

When rendering from a JSON endpoint, and not a local amp-state element, include the <code>[binding](../../../components/reference/amp-list.md#binding-(optional))</code> attribute and set it to `no`.

[example preview="top-frame" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list layout="fixed-height"
  height="100"
  src="/static/samples/json/examples.json"
  binding="no">{% raw %}
  <template type="amp-mustache">
    <div><a href="{{url}}">{{title}}</a></div>
  </template>
  {% endraw %}
</amp-list>
```
[/example]

If `binding="no"` is not specified, amp-list defaults to `binding="always"`. This means bindings are executed on page load, causing AMP to block the render and slow your page.

## Rendering on page load from amp-state

Using amp-list enables state rendering from amp-bind on page load. You can render data from a local amp-state element on page load by using the [amp-state prefix in the src](../../../components/reference/amp-list.md#initialization-from-amp-state) attribute value.

[example preview="top-frame" playground="true" imports="amp-bind, amp-list" template="amp-mustache"]
```html
  <amp-state
    id="hikes">
    <script type="application/json">
          {
        "items": [
          {
            "title": "Coastal Sights",
            "city": "San Francisco",
            "length": "9.3 Miles",
            "hikeUrl": "/coast",
            "credit": "Photo by Joseph Barrientos",
            "imageUrl": "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            "altDescription": "Photo of the Golden Gate Bridge."
          },
          {
            "title": "Through the Park",
            "city": "San Francisco",
            "length": "5 Miles",
            "hikeUrl": "/park",
            "credit": "Photo by Claudia Lorusso",
            "imageUrl": "https://images.unsplash.com/photo-1565086565717-351194b2488b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
            "altDescription": "Photo of the Academy of Sciences in Golden Gate Park."
          },
          {
            "title": "Historic Brownstones",
            "city": "New York City",
            "length": "1.2 Miles",
            "hikeUrl": "#",
            "credit": "Photo by Rachel Martin",
            "imageUrl": "https://images.unsplash.com/photo-1542042238232-3a0b14425b71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
            "altDescription": "Photo of Brownstone building in New York City."
          },
          {
            "title": "Big Apple, Big Bites",
            "city": "New York City",
            "length": "3.2 Miles",
            "hikeUrl": "#",
            "credit": "Photo by Peter Bond",
            "imageUrl": "https://images.unsplash.com/photo-1515711127392-4c62a99c3393?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2854&q=80",
            "altDescription": "Photo of a diner."
          }
        ]
      }
    </script>
  </amp-state>
  <amp-list
    width="auto"
    height="300"
    layout="fixed-height"
    src="amp-state:hikes"
    [src]="hikes"
    binding="always"
    reset-on-refresh>
    {% raw %}
    <template type="amp-mustache">
      <div class="hike-display">
        <amp-img src="{{imageUrl}}" width="300" height="225" alt="{{altDescription}}"></amp-img>
        <br />
        <span class="image-credit">{{credit}}</span>
        <br />
        <a class="hike-title" href="{{hikeUrl}}">{{title}}</a>
        <br />
        <span class="image-credit">{{city}}</span>
      </div>
    </template>
    {% endraw %}
    <div overflow class="list-overflow" style="background-color:red;">
      See more
    </div>
  </amp-list>
```
[/example]

Read more about this implementation in [The value of amp-list initialization from state](https://blog.amp.dev/2020/07/21/the-value-of-amp-list-initialization-from-state/) blog post.

## Customized solution with amp-script

For client-side rendering that requires customized logic, amp-script is available. It allows custom JavaScript and supports use of an additional UI library. Similar to `amp-list`, you can only render content on the page with amp-script if the layout height is known in advance.

# Rendering after user-interaction <a name="rendering-after-user-interaction"></a>

You may change an amp-list component’s JSON endpoint or amp-state variable after user interaction through amp-bind. This allows fresh content rendering after a user interacts with your page.

[example preview="top-frame" playground="true" imports="amp-bind, amp-list" template="amp-mustache"]
```html
  <button on="tap:AMP.setState({
                colors: ['red', 'blue', 'green', 'yellow']
              })">Add list content</button>

  <amp-list width="0"
            height="0"
            [src]="colors" 
            [is-layout-container]="true" 
            items="." 
            binding="no">
    {% raw %}
    <template type="amp-mustache">
      {{.}}
    </template>
    {% endraw %}
  </amp-list>
```
[/example]

Changing the content displayed within an amp-list component may require a change in size. Using the [`[is-layout-container]` bindable attribute](../../../components/reference/amp-list.md#[is-layout-container]-(optional)) changes the layout to `container`, allowing amp-list’s children to define its size.

# Updating live content without user interaction

The [`amp-live-list`](../../../components/reference/amp-live-list.md) component provides a wrapper and minimal UI to update content live. Some cases of rendering live content may require more customization than amp-live-list provides. In these cases, `amp-script` allows complex logic and can use additional UI libraries, such a [Preact](https://preactjs.com/) or [Vue.js](https://vuejs.org/) and use of the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

However, rendering live content with amp-script comes with a few restrictions. This approach allows the creation of any non-AMP elements, but _only_ the [`amp-img`](../../../components/reference/amp-img.md) and [`amp-layout`](../../../components/reference/amp-layout.md) components. You may work around this by writing updates to amp-state and rendering via amp-list.

# Personalization with amp-access

The [`amp-access`](../../../components/reference/amp-access.md) component allows personalization of page content. This data is provided via a JSON endpoint, which uses amp-mustache to update page content.

The biggest advantage of `amp-access` is the lack of layout restrictions. This gives a lot of flexibility, but you must ensure it doesn’t lead to content jump. This could hurt your Web Vital score.

# Rendering form responses

The [`amp-form`](../../../components/reference/amp-form.md) component allows a client-rendering JSON response. Used with [`amp-mustache`](../../../components/reference/amp-mustache.md), forms are able to communicate submit success and failure.
