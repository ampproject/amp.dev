---
$title: Loading and Displaying Server Content
$order: 2
---

## Adding Products To Our Site

Now it's time to go back and add some products to our Chico's Cheese Bikes page! Our goal is to add a new page to our site that allows us to:

* Display product name, images, price, and rating for each product.

* Filter products to only display products for certain categories (e.g., bikes, helmets, gloves, etc.).

* Sort the list of products by price from high-to-low or low-to-high.

What might be the best way to do that? We could use HTML, CSS, and AMP components to represent a single product, and then we could duplicate that manually for each product we want to add. However, this poses a couple of significant problems.

First, every time we update one of our products, we have to update the code of our AMP site and publish it again to the web. If products go out of stock or we run a sale, then our developers would have to update all of our product pages. This is a long, potentially error-prone way of keeping our site up to date with our product catalog.

Secondly, we need to be able to show only a certain subset of products or to change the order in which products appear. In AMP, there's no way to reorganize or filter content that is already rendered on the page. To attempt this using bindings and state variables would require a lot of code that would get unwieldy with more products and categories.

Instead, we want to have product information maintained on a server independently from our website. When our site loads, we want to reach out to that server, download the latest product data, and display that data in a consistent way. We could define a template made of HTML, CSS, and AMP components that describes what a single product looks like on our site. Later, when the product data from the server arrives, each product is applied to the template and added to the page. Then, all we need to do to filter or reorder elements on the screen is to get a new set of filtered or reordered product data from the server, apply the result to the templates again, and finally display those results onscreen.

The component we use to retrieve and display server data like this is called `<amp-list>`. We will also use the `<amp-mustache>` templates, which we first mentioned in the intermediate training when discussing forms.

## Loading and Displaying Server Content

Before we can discover how to retrieve server data with AMP, let's discuss how servers provide data.

You can think of a server that provides data as a file cabinet. A server has an API (Application Program Interface) that is built of one or more endpoints. Each endpoint can be accessed via a unique URL and returns a different collection of data. In our analogy, the API would be the collection of folders inside of the cabinet, the endpoints would be individual folders in the cabinet, and the URL addresses would be the labels affixed to the top of each folder to make it easier to find.

We will retrieve and display server data using the [`<amp-list>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-list.md', locale=doc.locale).url.path}}) component. The `<amp-list>` component reaches out to the remote JSON API endpoint at a given URL to retrieve data. The `<amp-list>` component also contains an `<amp-mustache>` template. Each entry in the data returned from the server is applied individually to the `<amp-mustache>` template, and the result is added to the page. For example, the following code will retrieve a list of names and display them on the page as a collection of `<p>` tags:

[sourcecode:html]
{% raw %}<amp-list width="auto" height="100" layout="fixed-height" src="https://some.url/data.json">
    <template type="amp-mustache">
        <p>{{name}}</p>
    </template>
</amp-list>
{% endraw %}[/sourcecode]

The src property of `<amp-list>` contains the URL for the server endpoint that provides the data to be displayed on the page. By default, `<amp-list>` expects the server to respond with a JSON object that contains a property named `items`, which contains an array of objects to display on the screen. For the previous example, the data returned from the server might look like the following:

[sourcecode:json]
{
    "items": [
        {
            "name": "Alice",
            "age": 42
        },
        {
            "name": "Bob",
            "Age": 55
        },
        {
            "name": "Carol",
            "Age": 28
        },
        {
            "name": "Dan",
            "age": 22
        }
    ]
}
[/sourcecode]

The templates we use with `<amp-list>` are `<amp-mustache>` templates. This means that we don't use the property binding bracket syntax to display text. Instead, we can embed values into our templates using the double-brace (or mustache) syntax. The variable names included in the mustache templates are in the context of each individual element returned by the server. So, in our above example, the `{% raw %}{{{% endraw %}name}}` refers specifically to the `name` property of each object in the returned `items` array. We can use the mustache syntax to insert variables into both our tags and our attributes (e.g. the `src` property of an `<amp-img>` component).

We discussed `<amp-mustache>` templates at length in the intermediate course. If necessary, refer to the [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-mustache.md', locale=doc.locale).url.path}}) of `<amp-mustache>` or the previous [course]({{g.doc('/content/amp-dev/documentation/courses/intermediate-course/accepting-user-input-and-displaying-output.md', locale=doc.locale).url.path}}) to review this templating style.

The output from an `<amp-list>` template is not exempt from the layout optimizations of AMP. This means that before any server data is even requested, AMP reserves a particular amount of space on the page to place the results. If the data returned from the server cannot be displayed in the available space, AMP will try to allocate additional space. To make it more likely that AMP will allow an `<amp-list>` to expand, make the `<amp-list>` component the last thing on your page.

Because requests to the server take time and are not guaranteed to succeed, we may want to detect when our requests are in progress or when they fail. This would allow us to display notifications that we're loading data or to show an error message. For that purpose, AMP provides the `placeholder` and `fallback` attributes. In the following example, after the `<amp-list>` makes the request for data from the server but has not yet heard back, it displays the element marked with the `placeholder` attribute. If the request to the server did not return in time or returned an error code, then the element with the `fallback` attribute would be displayed:

[sourcecode:html]
{% raw %}<amp-list src="https://foo.com/list.json">
    <div placeholder>Loading ...</div>
    <div fallback>Failed to load data.</div>
</amp-list>
{% endraw %}[/sourcecode]

Because dynamically loading and displaying data is so important to modern web development, `<amp-list>` has numerous features. It's worth spending some time reviewing the [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-list.md', locale=doc.locale).url.path}}) of `<amp-list>` to learn about some of the additional configuration options.

## Case Study: Building a Video Site

To get a better understanding of how to build sites with dynamic content from the server, let's consider a video site. Every visitor to a video site sees the same layout, but nearly all of the videos that fill in that layout are unique to the user. So, for example, all users might see the recommended video section, but the videos in that section are different for each user, provided by a server.

{{ image('/static/img/courses/advanced/image8.png', 624, 425, caption='A video site layout example') }}

A video site is generally made up of groups of videos that match a particular theme. One group is usually for an assortment of recommended videos, while other groups might be videos related to a trending topic or released by a particular content creator. Each of these groups contains a fixed number of videos. The group has a title, possibly an icon, and maybe a call to action (like a subscribe button or closing button). Each video shows a thumbnail, video length, title, creator, number of views, and date of publishing. Whichever videos we get from the server, the same data is displayed about those videos. This is the template of the data.

{{ image('/static/img/courses/advanced/image9.png', 962, 864, caption='Skeleton loading on a video site') }}

We can see the template more clearly when the video site first loads. Notice that all of the rows of videos are missing titles. Note, too, that all of the videos have empty thumbnails and solid boxes instead of titles, creator names, or any other information.

This type of strategy is called "skeleton loading." It is meant to give a preview of the site structure and to indicate where content will eventually be loaded, while the website contacts the server for the information. Once the server sends the names of the groups and videos that fill each group, the website updates to replace the skeleton loading blocks with the real data downloaded from the server.

So what's the main takeaway from our video site example? When developing a site that relies heavily on dynamic content, the objective is to focus on the structure of the site that is the same for all users. This includes the layout of the page, the navigation and menu system, and the look and feel of the containers that will hold the dynamic content. In AMP, once we have the static elements of the page laid out, we use `<amp-list>` to load the dynamic content into the slots that we've set up.

## Exercise 3: Recreate a Video Site

To start working with `<amp-list>`, let's recreate a small piece of a video site: the recommended video collection. Our collection of recommended videos is going to have six videos selected for our users by our server. We'll use `<amp-youtube>` for the videos on our site. While our site is contacting the server to retrieve the video information, we're going to use skeleton loading to show structure to our users and to indicate that something is happening.

We're not going to build this product page inside of our Chico's Cheese Bikes project. Instead, you can use [this](https://glitch.com/edit/#!/snapdragon-melody) Glitch as a starting point for this exercise. **Note**: Don't forget to remix it so you can edit! The Glitch contains:

* Some basic CSS and HTML to lay out the recommended video page.

* Sample video data in a JSON file.

* A pre-built server with a video data API endpoint and an `<amp-list>` component pre-configured to look at that endpoint.

[tip type="read-on"]
**Note**: While it is not necessary for you to create a server to complete this exercise, you do have to follow the instructions on the README included in the linked Glitch sample. The README will walk you through how to update the environment configuration that the server uses in its CORS configuration. If you find that your exercise solution isn't working even when everything else seems to be right,  you probably need to update the address in the environment variables as the README instructs. If you're interested in learning more about what CORS is and why it is important, read [this]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md', locale=doc.locale).url.path}}) documentation.
[/tip]

Let's discuss the structure of the video data that we retrieve from the server:

[sourcecode:json]
{
    "items": [
        {
            "id": "xEnifYNnDCA",
            "img": "https://...02.png",
            "title": "How to make Cheddar Cheese (Cloth Banded)",
            "creator": "Gavin Webber",
            "duration": "14:50",
            "date": "Jul 24, 2016"
        },
        ...
    ]
}
[/sourcecode]

The `id` field refers to the YouTube video ID for this video. The `img` field is a link to a thumbnail that can be used as a placeholder while the YouTube video initializes. The `title`, `creator`, and `duration` are details about the video itself. Finally, the `date` is the day the video was first published.

Using the documentation for [`<amp-list>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-list.md', locale=doc.locale).url.path}}), [`<amp-youtube>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}), and the descriptions above, update the recommended video page to meet the following requirements:

* The template for a recommended video should include an `<amp-youtube>` component, a title, the creator, the video duration, and the video's publication date.

* When the `<amp-youtube>` video is initializing, it should have a placeholder `<amp-img>` component whose `src` comes from the server data.

* The `<amp-list>` component should have a placeholder `<div>` that contains six skeleton loading video holders.

Recommended style guidelines:

* Wrap the inside of the `<amp-list>` template of the `<amp-list>` component in a `<div>` with assigned class `video`.

* The `<amp-youtube>` should have a `width` of 470px and a `height` of 280px with a `layout` of `responsive`.

* The template of a recommended video can use `<h2>` for the video title; `<p>` tags for the video date, creator, and duration; and an additional `<strong>` tag for the creator.

* The `<amp-list>` placeholder should contain a `<div>` with assigned class `placeholder-container`.

* The `placeholder-container` `<div>` should contain six `<div>` tags each with assigned class `placeholder-vid`.

* Each `placeholder-vid` `<div>` should contain three `<div>` tags. The first should have assigned class `vid-pl`, and the other two should have assigned class `title-pl`.

Once you've finished, your page should look like this:

{{ image('/static/img/courses/advanced/image3.png', 691, 611, caption='The result') }}

### Solution

The solution can be found in [this](https://glitch.com/edit/#!/potent-custard) Glitch example. The portion of the page containing the changes should look like this:

[sourcecode:html]
{% raw %}<main>
    <h2>Recommended</h2>
    <amp-list width="auto" height="600" layout="fixed-height" src="videos">
        <template type="amp-mustache">
            <div class="video">
                <amp-youtube data-videoid="{{id}}" layout="responsive" width="480" height="270">
                    <amp-img src="{{img}}" placeholder layout="fill"></amp-img>
                </amp-youtube>
                <h2>{{title}}</h2>
                <p>Published on {{date}}</p>
                <p>
                    <strong>{{creator}}</strong>
                </p>
                <p>Duration: {{duration}}</p>
            </div>
        </template>
    </amp-list>
</main>
{% endraw %}[/sourcecode]

If you added skeleton loading to your solution, it should look like this:

[sourcecode:html]
{% raw %}<main>
    <h2>Recommended</h2>
    <amp-list width="auto" height="600" layout="fixed-height" src="videos">
        <div placeholder>
            <div class="placeholder-container">
                <div class="placeholder-vid">
                <div class="vid-pl"></div>
                <div class="title-pl"></div>
                <div class="title-pl"></div>
            </div>
            <div class="placeholder-vid">
                <div class="vid-pl"></div>
                <div class="title-pl"></div>
                <div class="title-pl"></div>
            </div>
            <div class="placeholder-vid">
                <div class="vid-pl"></div>
                <div class="title-pl"></div>
                <div class="title-pl"></div>
            </div>
            <div class="placeholder-vid">
                <div class="vid-pl"></div>
                <div class="title-pl"></div>
                <div class="title-pl"></div>
            </div>
            <div class="placeholder-vid">
                <div class="vid-pl"></div>
                <div class="title-pl"></div>
                <div class="title-pl"></div>
            </div>
            <div class="placeholder-vid">
                <div class="vid-pl"></div>
                <div class="title-pl"></div>
                <div class="title-pl"></div>
            </div>
        </div>
        <template type="amp-mustache">
            <div class="video">
                <amp-youtube data-videoid="{{id}}" layout="responsive" width="480" height="270">
                    <amp-img src="{{img}}" placeholder layout="fill"></amp-img>
                </amp-youtube>
                <h2>{{title}}</h2>
                <p>Published on {{date}}</p>
                <p>
                    <strong>{{creator}}</strong>
                </p>
                <p>Duration: {{duration}}</p>
            </div>
        </template>
    </amp-list>
</main>
{% endraw %}[/sourcecode]

## Filtering and Sorting Server Data

So far, we have practiced the basics of using `<amp-list>` to add dynamic content to our websites, but there is still one more feature to discuss before we can add the products page to our Chico's Cheese Bikes site. We need a way to filter and sort content inside our `<amp-list>` components. We are going to rely on the server to help us out.

Based on what we've learned so far, a reasonable API endpoint address to retrieve all of our product information might be something like:

```
https://pathto.ourserver.com/api/v1/products
```

We need a way to ask the server to return only a particular product category. To do this, we can add a query string to the end of the API endpoint. This doesn't change the location at which we're requesting the information, but it does pass the additional information along for the server to handle. Such an address might look something like this:

```
https://pathto.ourserver.com/api/v1/products?category=bikes
```

[tip type="read-on"]
For more information about what goes into a URL, please check out [this](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL) documentation.
[/tip]

Next, we need a way to tell the server to sort the results it returns to us. We can accomplish this by extending the query string we used to filter the server results. Add a sort parameter that tells the server what type of sorting to use and whether to sort from high-to-low (descending) or low-to-high (ascending). Such an address might look something like this:

```
https://pathto.ourserver.com/api/v1/products?category=bikes&sort=price-asc
```

[tip type="read-on"]
**Note**: You don't have to use both parameters in your query string in order to use sort. Either the category or the sort could appear by themselves. When they are used together, they must be separated by an ampersand.
[/tip]

Now we know how to get the list of filtered and/or sorted products from the server, but it's still not clear what to put into the `src` property of the `<amp-list>` component. As users change the filtering and sorting settings, they expect the page to update automatically. We need to update the `src` property in response to user actions. This sounds like a perfect job for state variables and property bindings!

The following example shows how to combine `<amp-list>` with property bindings and state variables to complete the above examples:

[sourcecode:html]
{% raw %}
<amp-state id="productSettings">
    <script type="application/json">
        {
            "category": "bikes",
            "sort": "price-asc"
        }
    </script>
</amp-state>
<amp-list src="https://pathto.ourserver.com/api/v1/products"
          [src]="'https://pathto.ourserver.com/api/v1/products' +
                 ‘?category=' + productSettings.category +
                 ‘&sort=' + productSettings.sort">
    <template type="amp-mustache">
        ...
    </template>
</amp-list>
{% endraw %}[/sourcecode]

The first time the page loads, it will call the server to get all of the products. But, as the users select different filtering and sorting options, the state variables in `productSettings` are updated, and the `src` binding will evaluate and produce a new `src` value. Next, the `<amp-list>` component will reach out to the updated `src` address to download new data. Once the new data has been received, it will be applied to the template like the initial data was when the page first loaded. The new content will replace the old content on the screen.

## Exercise 4: Creating a Filterable Product List

Now it's time to add the products page to our Chico's Cheese Bikes example! If you're using any of the Chico's Cheese Bikes Glitch examples that we've linked throughout previous courses, you already have the server code necessary to complete this exercise. All you need to do is to make sure you've followed the README instructions to set the address in your environment variables. If you haven't done this yet, then the site we build won't be able to download information from the server.

The first thing we need to do is make our products page accessible from our homepage. We're going to add a link in the slide-out menu. In the navigation on `index.html`, below "Our Story," add the following code:

[sourcecode:html]
{% raw %}<li class="nav-item">
    <a href="/products.html">Our Products</a>
</li>
{% endraw %}[/sourcecode]

Examine the `products.html` page. The products page already includes:

* CSS necessary to complete this exercise.

* Parts of the layout that are common between the product and index pages, such as the header and slide-out menu.

* `<amp-state>` and options dropdowns to encompass all of the properties and option values that the server will expect.

* The AMP component scripts you should need to complete the exercise.

To complete this exercise, we have to connect the select inputs to their corresponding state variables, bind the state variables to the `<amp-list>` component, and develop the template for our products. For now, the template will include an image of the product, the product name, the customer rating of the product, and the price.

Let’s look at the structure of the product data that we retrieve from the server:

[sourcecode:json]
{
    "items": [
        {
            "id": "cheddar-chaser",
            "type": "bicycle",
            "url": "/pages/cheddar-chaser.html",
            "name": "Cheddar Chaser",
            "img": "https://...cheddar-chaser.jpg",
            "stars": "5.0",
            "price": 599,
            "description": "Lorem ipsum dolor sit amet, ..."
        },
        ...
    ]
}
[/sourcecode]

The `id` and `type` fields are only really used by the server, so you can ignore them for this exercise. The `url` field represents the address of the product page for this product. We won’t be implementing these pages in this exercise. The `img` field contains a URL to a picture of this product. The `stars` field indicates the starred user ratings for this product. The `price` field is the price of this product in dollars. Lastly, the `description` field is marketing copy that we will not use in this exercise, but which is used in one of the optional exercises for this training.

Using the documentation for [`<amp-bind>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}), [`<amp-list>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-list.md', locale=doc.locale).url.path}}), and all of the descriptions above, create a product listing page that fulfills the following requirements:

* When the Product Type select input is updated, it should store its new selected value into the `category` state variable in the `<amp-state>` component with ID `products`.

* When the Sort By select input is updated, it should store its new selected value into the `sort` state variable.

* Whenever the `category` or `sort` state variables are updated, the `<amp-list>` component should retrieve an updated list of products from the server. **Note**: The query parameters that should be sent to the server have the same name as the state variables (`category` and `sort`).

* The template for a product should include an image of the product, the product name, the user rating for the product, and the price.

Recommended style guidelines:

* The contents of the template should be wrapped in a `<div>` with assigned class `product-card`.

* Each product image should be 200 by 150 pixels in size.

* The text details about the product should be wrapped in a `<div>` with assigned class `product-details`.

* The product name, rating, and price can be placed in `<p>` tags with assigned classes `product-name`, `star-rank`, and `product-price`, respectively.

Once you’ve finished, your page should look like this:

{{ image('/static/img/courses/advanced/image7.png', 1512, 1162, caption='The result') }}

### Solution

The portion of the page containing the product list should now look like this:

[sourcecode:html]
{% raw %}<main>
    <div class="main-content">
        <h2 class="main-heading">Our Products</h2>
        <div class="filter-sort-selectors">
            <p>Product Type:</p>
            <select
                class="product-selector"
                on="change:AMP.setState({
                        products: {
                            category: event.value
                        }
                    })">
                <option value="all">All</option>
                <option value="bicycle">Bikes</option>
                <option value="helmet">Helmets</option>
                <option value="gloves">Gloves</option>
                <option value="basket">Baskets</option>
                <option value="bottle">Water Bottles</option>
            </select>
            <p class="sort-by">Sort By:</p>
            <select
                class="order-selector"
                on="change:AMP.setState({
                        products: {
                            sort: event.value
                        }
                    })">
                <option value="price-desc">Price: High-Low</option>
                <option value="price-asc">Price: Low-High</option>
            </select>
        </div>
        <amp-list id="amp-list-bikes" class="product-list" width="auto"
            height="600" layout="fixed-height" src="/products/filter"
            [src]="'/products/filter?sort=' + products.sort +
                   '&category=' + products.category">
            <template type="amp-mustache">
                <div class="product-card">
                    <amp-img
                        width="200"
                        height="150"
                        layout="responsive"
                        alt="{{name}}"
                        src="{{img}}">
                    </amp-img>
                    <div class="product-details">
                        <p class="product-name">{{name}}</p>
                        <p class="star-rank">{{stars}} ★</p>
                        <p class="product-price">
                            ${{price}}
                        </p>
                    </div>
                </div>
            </template>
        </amp-list>
    </div>
</main>
{% endraw %}[/sourcecode]
