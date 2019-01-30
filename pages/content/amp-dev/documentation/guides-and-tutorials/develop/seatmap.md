---
$title: Create a seatmap
$order: 104
toc: true
tutorial: true
formats:
  - websites
---

Seatmaps are important parts of ticketers web apps, however the implementation in AMP can be difficult. This doc describes how to implement a seatmap in AMP by using a combination of available AMP components.
A living sample implementing the practices described below is available at [sample](https://ampbyexample.com/advanced/seatmap/preview/).

This tutorial will start by quickly reviewing the components needed to implement a seatmap in AMP.

## AMP Components

### amp-pan-zoom
[`amp-pan-zoom`](/docs/reference/components/amp-pan-zoom.html) allows to zoom and pan the content via double tap and pinching. This component is the base of the seatmap implementation.

### amp-list
[`amp-list`](/docs/reference/components/amp-list.html) fetches content dynamically from a CORS JSON endpoint and renders it using a supplied template. It’s required to implement seatmap availability so that the users always get the latest data.

### amp-bind
[`amp-bind`](/docs/reference/components/amp-bind.html) adds interactivity to the page. In a seatmap it’s needed to keep track of how many seats have been selected.

### amp-selector
[`amp-selector`](/docs/reference/components/amp-selector.html) represents a control that presents a menu of options and lets the user choose from it. The entire seatmap can be considered as a menu of options where each seat is an option. It becomes very useful when it comes to styling clicked-unclicked seats as you can use css expressions. For example, the following expression fills a seat with color orange once selected.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Requirements
In order to draw a seatmap as a SVG where each seat is represented by a rect, it’s required having informations for each seat such as: position x and y, width and height and possibly rx and ry to round the corners of the rectangles.

Also, every seat must have an unique identifier that can be used to make the booking. At the seatmap level, it’s required to have a measure of the entire width and height of the seatmap, so that this is information can be use in the viewbox attribute, read learn more about viewbox.

## Seatmap drawing
The seatmap is rendered by using `amp-list` and `amp-mustache`. Upon returning of the data from the `amp-list` call, the data can be used to iterate through the seats.

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Styling unavailable seats
In the above example, `{% raw %}{{unavailable}}{% endraw %}` is the value of a field returned by the json endpoint and used to style an unavailable seat. This approach doesn’t allow to remove attributes like `option="{{id}}"` in case a seat is unavailable because the template cannot break the entire html tag.

An alternative verbose approach, could be to repeat the tags as following:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Seatmap sizing
Unless you have a fixed size for the seatmap, it can become very difficult to size the `amp-list` containing the seatmap. `amp-list` needs either a dimension and can use `layout="fill"` which will use the available space of the parent container.

An approach could be to calculate the available space on the page once knowing the space used by other components like headers and footers. This calculation can be done in css by using the calc expression and assigning it as the `min-height` of a parent div of the `amp-list`.

Another approach is to use a flex layout when knowing the height of the page layout.

## amp-pan-zoom styling
If using the approach described in Seatmap Sizing, `amp-pan-zoom` needs to use `layout="fill"` as well.

[tip type="tip"]
**TIP –** If you want to keep some white space around the seatmap and still make it part of the pinch and zooming area, apply the following tip:

- Add a wrapping div for the svg
- Add padding
[/tip]

The alternative approach where you don’t have a wrapping div and adding margin to the svg, will not make the margins part of the pinch and zooming area.

## Seatmap state
While users click on different seats, it’s possible to keep track of the selected seat ids in a variable by using `amp-state`.

There are 2 possible approaches:
- Adding an `amp-bind` expression for every seat to add the selected seat to a list
- Use `amp-selector` with the action `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` so that all the selected seats are added to a list

While the first approach doesn’t require the additional component `amp-selector` it can make the seatmap very slow because every `amp-bind` expression will be evaluated at every seat selection/unselection.

The second approach allows also to reduce the duplication of the `amp-bind` expression for every seat that will be rendered by the template.

## Seatmap html structure

Here it follows the structure of a simple seatmap in terms of html tags:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" items="." single-item noloading>
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
