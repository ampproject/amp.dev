---
$title: Create a seatmap
$order: 104
description: 'Seatmaps are important parts of ticketers web apps, but the implementation in AMP can be difficult. Read on to learn how to implement a seatmap in AMP by'
tutorial: true
formats:
  - websites
author: kul3r4
contributors:
  - pbakaus
---

Seatmaps are important parts of ticketers' web apps, but the implementation in AMP can be difficult. Read on to learn how to implement a seatmap in AMP by using a combination of available AMP components.

[tip]
A live sample implementing the practices described below is available [here](../../../documentation/examples/documentation/SeatMap.html).
[/tip]

## AMP Components needed

Let's start by reviewing the components needed:

### amp-pan-zoom
[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) allows to zoom and pan the content via double tap and pinching. This component serves as base for the seatmap implementation.

### amp-list
[`amp-list`](../../../documentation/components/reference/amp-list.md) fetches content dynamically from a CORS JSON endpoint and renders it using a supplied template. Used to fetch current seatmap availability, so that users always get the latest data.

### amp-bind
[`amp-bind`](../../../documentation/components/reference/amp-bind.md) adds interactivity to the page. Needed here to keep track of how many seats have been selected.

### amp-selector
[`amp-selector`](../../../documentation/components/reference/amp-selector.md) represents a control that presents a menu of options and lets the user choose from it. The entire seatmap can be considered a menu of options where each seat is an option. It makes styling the selected state for seats much easier by allowing you to use CSS expressions. For example, the following expression fills a seat with an orange color once selected.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Requirements

1. To draw a seatmap as an SVG where each seat is represented by a `rect` element, you need information on each seat: position `x` and `y`, `width` and `height` and possibly `rx` and `ry` to round the corners of the rectangles.
2. A unique identifier for very seat that can be used to make the booking.
3. A measure of the entire width and height of the seatmap to be used in the `viewbox` attribute.

## Drawing the seatmap

The seatmap is rendered via [`amp-list`](../../../documentation/components/reference/amp-list.md) and [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). After receiving the data from the [`amp-list`](../../../documentation/components/reference/amp-list.md) call, you can use said data to iterate through the seats:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Styling unavailable seats

In the above example, `{% raw %}{{unavailable}}{% endraw %}` is the value of a field returned by the JSON endpoint and used to style an unavailable seat. This approach doesn’t allow you to remove attributes like `option="{{id}}"` in case a seat is unavailable, as the template cannot wrap the entire pages' `<html>` element.

An alternative, more verbose approach is to repeat the tags as following:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Sizing your seatmap

Unless your seatmap's size is fixed, it's difficult to size the [`amp-list`](../../../documentation/components/reference/amp-list.md) containing the seatmap. [`amp-list`](../../../documentation/components/reference/amp-list.md) needs either fixed dimensions or use `layout="fill"` (to use the available space of the parent container). There are two ways to address this problem:

1. Calculate the available space on the page once you know the space used by other components like headers and footers. This calculation can be done in CSS by using the `calc` expression and assigning it as the `min-height` of a parent div of the [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Use a flex layout when knowing the height of the page layout.

## Styling amp-pan-zoom

If using the approach described in the previous section, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) needs to use `layout="fill"` as well.

[tip type="tip"]
**TIP –** To keep some white space around the seatmap and still make it part of the pinch and zooming area:

- Add a wrapping div for the svg
- Add padding

If you don’t have a wrapping div and add margin to the SVG instead, it won't make the margins part of the pinch and zooming area.
[/tip]

## Handling state

When users click on different seats, it’s possible to keep track of the selected seat `id`s in a variable by using `amp-state`, either by:

- Adding an [`amp-bind`](../../../documentation/components/reference/amp-bind.md) expression for every seat to add the selected seat to a list
- Or using [`amp-selector`](../../../documentation/components/reference/amp-selector.md) with the action `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` so that all the selected seats are added to a list

While the first approach doesn’t require the additional component [`amp-selector`](../../../documentation/components/reference/amp-selector.md), it can make the seatmap very slow because every [`amp-bind`](../../../documentation/components/reference/amp-bind.md) expression will be evaluated at every seat selection/deselection.

The second approach also allows you to reduce the duplication of the [`amp-bind`](../../../documentation/components/reference/amp-bind.md) expression for every seat that will be rendered by the template.

## Final HTML structure

For reference, here's the final HTML for the seatmap:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
