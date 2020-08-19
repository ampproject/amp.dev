---
formats:
  - websites
$title: Client-side rendering in AMP
$order: 4
description: "This guide outlines client-side rendering possibilities in AMP."
author: CrystalOnScript
contributors:
  - sbenz
---

This guide outlines client-side rendering possibilities in AMP. By default, AMP pages are server-side rendered. However, in certain cases it's necessary to dynamically render data, such as a list of articles or items in a user’s shopping cart.

# Rendering on page load

Although its name may be misleading, amp-list is the go-to solution for client-side rendering in AMP. The amp-list component works in a wide range of client-side rendering needs. It can render a single item or provide infinite scrolling and pagination. It allows dynamic content rendering on page load and can [update that content after a user interacts with the page](#rendering-after-user-interaction). Use the default loading indicator, or [build your own](https://amp.dev/documentation/examples/multimedia-animations/custom_loading_indicators/), for the best UX, especially when fetching from a remote endpoint.

The amp-list component uses a remote JSON endpoint, or a local amp-state element, to render dynamic content on page load. Default use of amp-list requires each JSON to have an items array.

_Example of JSON structure_

```html
<amp-state id="weekdays">
    <script type="application/json">{
      "items": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    }</script>
  </amp-state>
  <amp-list layout="fixed-height" 
            height="126" 
            src="amp-state:weekdays" 
            binding="no">
    {% raw %}<template type="amp-mustache">
      {{.}}
    </template>{% endraw %}
  </amp-list>
```

_[Playground](https://playground.amp.dev/#share=PCFkb2N0eXBlIGh0bWw+CjxodG1sIOKaoT4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0idXRmLTgiPgogIDx0aXRsZT5NeSBBTVAgUGFnZTwvdGl0bGU+CiAgPGxpbmsgcmVsPSJjYW5vbmljYWwiIGhyZWY9InNlbGYuaHRtbCIgLz4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTEiPgogIDxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fTwvc3R5bGU+PG5vc2NyaXB0PjxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfTwvc3R5bGU+PC9ub3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgYXN5bmMgY3VzdG9tLWVsZW1lbnQ9ImFtcC1iaW5kIiBzcmM9Imh0dHBzOi8vY2RuLmFtcHByb2plY3Qub3JnL3YwL2FtcC1iaW5kLTAuMS5qcyI+PC9zY3JpcHQ+CiAgPHNjcmlwdCBhc3luYyBjdXN0b20tdGVtcGxhdGU9ImFtcC1tdXN0YWNoZSIgc3JjPSJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC9hbXAtbXVzdGFjaGUtMC4yLmpzIj48L3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIGN1c3RvbS1lbGVtZW50PSJhbXAtbGlzdCIgc3JjPSJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC9hbXAtbGlzdC0wLjEuanMiPjwvc2NyaXB0Pgo8L2hlYWQ+Cjxib2R5PgogIDxhbXAtc3RhdGUgaWQ9IndlZWtkYXlzIj4KICAgIDxzY3JpcHQgdHlwZT0iYXBwbGljYXRpb24vanNvbiI+ewogICAgICAiaXRlbXMiOiBbCiAgICAgICAgIk1vbmRheSIsCiAgICAgICAgIlR1ZXNkYXkiLAogICAgICAgICJXZWRuZXNkYXkiLAogICAgICAgICJUaHVyc2RheSIsCiAgICAgICAgIkZyaWRheSIsCiAgICAgICAgIlNhdHVyZGF5IiwKICAgICAgICAiU3VuZGF5IgogICAgICBdCiAgICB9PC9zY3JpcHQ+CiAgPC9hbXAtc3RhdGU+CiAgPGFtcC1saXN0IGxheW91dD0iZml4ZWQtaGVpZ2h0IiAKICAgICAgICAgICAgaGVpZ2h0PSIxMjYiIAogICAgICAgICAgICBzcmM9ImFtcC1zdGF0ZTp3ZWVrZGF5cyIgCiAgICAgICAgICAgIGJpbmRpbmc9Im5vIj4KICAgIDx0ZW1wbGF0ZSB0eXBlPSJhbXAtbXVzdGFjaGUiPgogICAgICB7ey59fQogICAgPC90ZW1wbGF0ZT4KICA8L2FtcC1saXN0Pgo8L2JvZHk+CjwvaHRtbD4=)_

This is adjustable through use of the `single-item` and `items` attributes.

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

[Playground](https://playground.amp.dev/#share=PCFkb2N0eXBlIGh0bWw+CjxodG1sIOKaoT4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0idXRmLTgiPgogIDx0aXRsZT5NeSBBTVAgUGFnZTwvdGl0bGU+CiAgPGxpbmsgcmVsPSJjYW5vbmljYWwiIGhyZWY9InNlbGYuaHRtbCIgLz4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTEiPgogIDxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fTwvc3R5bGU+PG5vc2NyaXB0PjxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfTwvc3R5bGU+PC9ub3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgYXN5bmMgY3VzdG9tLXRlbXBsYXRlPSJhbXAtbXVzdGFjaGUiIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAvYW1wLW11c3RhY2hlLTAuMi5qcyI+PC9zY3JpcHQ+CiAgPHNjcmlwdCBhc3luYyBjdXN0b20tZWxlbWVudD0iYW1wLWxpc3QiIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAvYW1wLWxpc3QtMC4xLmpzIj48L3NjcmlwdD4KPC9oZWFkPgo8Ym9keT4KICA8YW1wLWxpc3QgbGF5b3V0PSJmaXhlZC1oZWlnaHQiIAogICAgICAgICAgICBoZWlnaHQ9IjE4IiAKICAgICAgICAgICAgc3JjPSIvZG9jdW1lbnRhdGlvbi9leGFtcGxlcy9hcGkvdGltZSIgCiAgICAgICAgICAgIGJpbmRpbmc9Im5vIiAKICAgICAgICAgICAgc2luZ2xlLWl0ZW0gaXRlbXM9Ii4iPgogICAgPHRlbXBsYXRlIHR5cGU9ImFtcC1tdXN0YWNoZSI+CiAgICAgIFRoZSB0aW1lIGlzOiB7e3RpbWV9fQogICAgPC90ZW1wbGF0ZT4KICA8L2FtcC1saXN0Pgo8L2JvZHk+CjwvaHRtbD4=)

AMP render's content using amp-mustache templates.

For the best user experience, and to remain AMP-valid, you must predefine the height of rendered content. This can be done with the following layouts:

*   `responsive`
*   `fill`
*   `fixed-height`
*   `fixed`
*   `flex-item`

A best practice is to use the `fixed-height` layout attribute on the amp-list element.

To avoid blank space while content is loading, display a [placeholder](../style_and_layout/placeholders.md) within the amp-list component.

```html
<amp-list height="32" width="80"
    src="/login-button"
    binding="no"
    items="."
    single-item>
 {% raw %}<template type="amp-mustache">
    {{#loggedIn}}
    <button>Logout</button>
    {{/loggedIn}}
    {{^loggedIn}}
    <button>Login</button>
    {{#loggedIn}}
  </template>{% endraw %}
  <button disabled placeholder>Login</button>
</amp-list>
```

If using multiple amp-list implementations, a best practice is to use a single fetch and share the data.

_Example?_

## Render from a JSON endpoint

When rendering from a JSON endpoint, and not a local amp-state element, include the <code>[binding](../../../components/reference/amp-list.md#binding-(optional))</code> attribute and set it to no.

```html
<amp-list layout="fixed-height"
  height="100"
  src="/static/samples/json/examples.json"
  binding="no">
  {% raw %}<template type="amp-mustache">
    <div><a href="{{url}}">{{title}}</a></div>
  </template>{% endraw %}
</amp-list>
```

If `binding="no"` is not specified, amp-list defaults to `binding="always"`. This means bindings are executed on page load, causing AMP to block the render and slow your page.

## Rendering on page load from amp-state

Using amp-list enables state rendering from amp-bind on page load. You can render data from a local amp-state element on page load by using the [amp-state prefix in the src](../../../components/reference/amp-list.md#initialization-from-amp-state) attribute value.

```
<amp-list
    src="amp-state:searchResponse"
    [src]="searchResponse.items"
    ...>
…
<amp-state
    id="searchResponse"
    [src]="'/api/search?order=' + filter.order + '&size=' + filter.size"
  >
    <script type="application/json">
      ... server side injected initial AMP state goes here ...
    </script>
  </amp-state>
```

Read more about this implementation in [The value of amp-list initialization from state](https://blog.amp.dev/2020/07/21/the-value-of-amp-list-initialization-from-state/) blog post.

## Customized solution with amp-script

For client-side rendering that requires customized logic, amp-script is available. It allows custom JavaScript and supports use of an additional UI library. Similar to `amp-list`, you can only render content on the page with amp-script if the layout height is known in advance.

# Rendering after user-interaction

You may change an amp-list component’s JSON endpoint or amp-state variable after user interaction through amp-bind. This allows fresh content rendering after a user interacts with your page.

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
    {% raw %}<template type="amp-mustache">
      {{.}}
    </template>{% endraw %}
  </amp-list>
```

[Playground](https://playground.amp.dev/#share=PCFkb2N0eXBlIGh0bWw+CjxodG1sIOKaoT4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0idXRmLTgiPgogIDx0aXRsZT5NeSBBTVAgUGFnZTwvdGl0bGU+CiAgPGxpbmsgcmVsPSJjYW5vbmljYWwiIGhyZWY9InNlbGYuaHRtbCIgLz4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTEiPgogIDxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fTwvc3R5bGU+PG5vc2NyaXB0PjxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfTwvc3R5bGU+PC9ub3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgYXN5bmMgY3VzdG9tLWVsZW1lbnQ9ImFtcC1iaW5kIiBzcmM9Imh0dHBzOi8vY2RuLmFtcHByb2plY3Qub3JnL3YwL2FtcC1iaW5kLTAuMS5qcyI+PC9zY3JpcHQ+CiAgPHNjcmlwdCBhc3luYyBjdXN0b20tdGVtcGxhdGU9ImFtcC1tdXN0YWNoZSIgc3JjPSJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC9hbXAtbXVzdGFjaGUtMC4yLmpzIj48L3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIGN1c3RvbS1lbGVtZW50PSJhbXAtbGlzdCIgc3JjPSJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC9hbXAtbGlzdC0wLjEuanMiPjwvc2NyaXB0Pgo8L2hlYWQ+Cjxib2R5PgogIDxidXR0b24gb249InRhcDpBTVAuc2V0U3RhdGUoewogICAgICAgICAgICAgICAgY29sb3JzOiBbJ3JlZCcsICdibHVlJywgJ2dyZWVuJywgJ3llbGxvdyddCiAgICAgICAgICAgICAgfSkiPkFkZCBsaXN0IGNvbnRlbnQ8L2J1dHRvbj4KCiAgPGFtcC1saXN0IHdpZHRoPSIwIgogICAgICAgICAgICBoZWlnaHQ9IjAiCiAgICAgICAgICAgIFtzcmNdPSJjb2xvcnMiIAogICAgICAgICAgICBbaXMtbGF5b3V0LWNvbnRhaW5lcl09InRydWUiIAogICAgICAgICAgICBpdGVtcz0iLiIgCiAgICAgICAgICAgIGJpbmRpbmc9Im5vIj4KICAgIDx0ZW1wbGF0ZSB0eXBlPSJhbXAtbXVzdGFjaGUiPgogICAgICB7ey59fQogICAgPC90ZW1wbGF0ZT4KICA8L2FtcC1saXN0PgoKPC9ib2R5Pgo8L2h0bWw+)

Changing the content displayed within an amp-list component may require a change in size. Using the [`[is-layout-container]` bindable attribute](../../../components/reference/amp-list.md#[is-layout-container]-(optional)) changes the layout to [`container`](../../learn/amp-html-layout.md), allowing amp-list’s children to define its size. 


# Updating live content without user interaction

The amp-live-list component provides a wrapper and minimal UI to update content live. Some cases of rendering live content may require more customization than amp-live-list provides. In these cases, amp-script allows complex logic and can use additional UI libraries, such a preact or vue.js and use of websockets.


```
Example: show something that updates continuously 
```


However, rendering live content with amp-script comes with a few reactions. This approach only allows the creation of any non-AMP elements, but only the amp-img and amp-layout components. You may work around this by writing updates to amp-state and rendering via amp-list. 

Example live updating content with amp-script


```
<script id="stock-price" type="text/plain" target="amp-script">
  const span = document.getElementById('price');
  const apiURL = 'pathto/api';

  function updatePrice() {
    fetch(apiURL)
    .then(async (response) => {
      let price = await response.text();
      span.innerHTML = Number(price).toFixed(2);
    });
  }

  setInterval(updatePrice, 5000);
</script>

...

<h1>Stock ticker</h1>
<amp-script layout="fixed" script="stock-price" height="200" width="300">
  Current price: <span id="price">62.00</span>
</amp-script>

```


# Personalization with amp-access

The amp-access component allows personalization of page content. This data is provided via a JSON endpoint, which uses amp-mustache to update page content. 


```html
<head>
<script id="amp-access" type="application/json">
    {
      "authorization": "/documentation/examples/api/time",
      "pingback": "/documentation/examples/api/echo"
    }
  </script>
</head>
<body>
  <section amp-access="true">
    {% raw %}<template amp-access-template type="amp-mustache">
      The time is: {{time}}
    </template>{% endraw %}
  </section>
</body>
```


[Playground](https://playground.amp.dev/#share=PCFkb2N0eXBlIGh0bWw+CjxodG1sIOKaoT4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0idXRmLTgiPgogIDx0aXRsZT5NeSBBTVAgUGFnZTwvdGl0bGU+CiAgPGxpbmsgcmVsPSJjYW5vbmljYWwiIGhyZWY9InNlbGYuaHRtbCIgLz4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTEiPgogIDxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fTwvc3R5bGU+PG5vc2NyaXB0PjxzdHlsZSBhbXAtYm9pbGVycGxhdGU+Ym9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfTwvc3R5bGU+PC9ub3NjcmlwdD4KICA8c2NyaXB0IGFzeW5jIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgYXN5bmMgY3VzdG9tLWVsZW1lbnQ9ImFtcC1hY2Nlc3MiIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAvYW1wLWFjY2Vzcy0wLjEuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgYXN5bmMgY3VzdG9tLXRlbXBsYXRlPSJhbXAtbXVzdGFjaGUiIHNyYz0iaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAvYW1wLW11c3RhY2hlLTAuMi5qcyI+PC9zY3JpcHQ+CiAgPHN0eWxlIGFtcC1jdXN0b20+CiAgICBoMSB7CiAgICAgIG1hcmdpbjogMXJlbTsKICAgIH0KICA8L3N0eWxlPgogIDxzY3JpcHQgaWQ9ImFtcC1hY2Nlc3MiIHR5cGU9ImFwcGxpY2F0aW9uL2pzb24iPgogICAgewogICAgICAiYXV0aG9yaXphdGlvbiI6ICIvZG9jdW1lbnRhdGlvbi9leGFtcGxlcy9hcGkvdGltZSIsCiAgICAgICJwaW5nYmFjayI6ICIvZG9jdW1lbnRhdGlvbi9leGFtcGxlcy9hcGkvZWNobyIKICAgIH0KICA8L3NjcmlwdD4KPC9oZWFkPgo8Ym9keT4KICA8c2VjdGlvbiBhbXAtYWNjZXNzPSJ0cnVlIj4KICAgIDx0ZW1wbGF0ZSBhbXAtYWNjZXNzLXRlbXBsYXRlIHR5cGU9ImFtcC1tdXN0YWNoZSI+CiAgICAgIFRoZSB0aW1lIGlzOiB7e3RpbWV9fQogICAgPC90ZW1wbGF0ZT4KICA8L3NlY3Rpb24+CjwvYm9keT4KPC9odG1sPg==)

The biggest advantage of amp-access is the lack of layout restrictions. This gives a lot of flexibility, but you must ensure it doesn’t lead to content jump. This could hurt your Web Vital’s score. 

EXAMPLE :D


# Rendering form responses

The amp-form component allows a client-rendering JSON response. Used with amp-mustache, forms are able to communicate submit success and failure. 


```
Example: render search results
```

