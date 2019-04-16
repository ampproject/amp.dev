---
$title: Remembering What The User Has Done
$order: 1
---

## Rethinking The Carousel

Sometimes we want a single user interaction to affect multiple components simultaneously. In a simple case, we might have several closed accordions with a single button that says "Expand All Sections." If the user presses that button, we want to open all of the accordion menus at the same time.

Meanwhile, in a more complicated scenario, we might be working on a checkout form for a shopping site. In that case, we want users to be able to reuse their shipping address as their billing address or to display an address entry form instead. We only want to show users the fields that are required to complete the form, so clicking a single checkbox might cause multiple address input fields to appear or disappear.

Recall that, while building our cheese bike site, we built two image carousels that were linked together with events and actions. Whenever we changed the slide in either carousel, we would update the other carousel to point to the same slide. This works well for actions and events, because the number of effects for each event was small. What if we wanted to add a third component that also needed to be updated whenever a new slide was chosen? Suddenly, things might get complicated. In the "Expand All Sections" example above, every time we added a new section, we'd have to update the event handler for the button to open the new accordion.

In programming, when we need to use the same value in multiple places, we use a variable. Whenever a variable is referenced in code, it returns its value at the time the code executes. If you update the value of the variable, any code that references the variable sees the updated value.

We can do something similar with our websites. We can store information in variables and reference them throughout our page. As we update those variables, the page will be updated with the new values.

So, for our carousel example, we could create a variable containing the currently selected slide. Whenever a user changes the slide on one of the carousels, we update the variable's value. Finally, we rework each carousel to update their selected slide whenever the variable we created is updated. In our "Expand All Sections" example, we could cause the button press to update a variable, and we could update each accordion to be open whenever the variable was updated.

These types of variables are called "state variables," and the process of updating a component when a state variable is changed is called "binding." Fittingly, developers manage state variables in AMP using the `<amp-state>` [component]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state), and update components when state variables change using the `<amp-bind>` [component]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}).

## Storing Information in Application State

State variables are updated in response to user actions. We could use them to track the number of times a user clicked a button, the text a user entered into a form field, information about the account a user logged into, or what slide an image carousel is set to.

But how do we set the value of a state variable? As we learned in the intermediate course, we respond to user actions through events and event handlers. To synchronize our two image carousels, we used an action (`goToSlide`) on the carousel components to change the selected slide. Similarly, the AMP runtime provides an action called `setState` that allows us to set our state variables. The `AMP.setState` action takes a JSON object representing the state variables to store. So, for example, the following code sets the `wasPressed` state variable to the value of `true`:

[sourcecode:html]
{% raw %}<button on="tap:AMP.setState({wasPressed: true})">
    Press Me
</button>
{% endraw %}[/sourcecode]

[tip type="read-on"]
**Note**: If your state contains more than one state variable, you only need to pass the `setState` method to the variable(s) that you want to update. AMP will intelligently merge the given JSON object into the existing state, so there's no need to try to merge the values yourself or pass every state variable each time. If you're interested, you can read more about how AMP merges these values in the [appendix]({{g.doc('/content/amp-dev/documentation/courses/advanced-course/appendix.md', locale=doc.locale).url.path}}).
[/tip]

It's possible to set initial values for your state variables. To do this, create an `<amp-state>` component with a particular ID. State we create in that `<amp-state>` component is stored as an object with that ID as a key. Next, inside of that `<amp-state>` component, add a script tag with a type of `application/json`. Then, you can add to that script tag a JSON object which represents the state's initial values.

The example below shows how to set initial state. Notice how we use the ID of the `<amp-state>` component when setting the state variable:

[sourcecode:html]
{% raw %}<amp-state id="accordionState"/>
    <script type="application/json">
        {
            "isOpen": false
        }
    </script>
<amp-state>
<button on="tap:AMP.setState({ accordionState: { isOpen: !accordionState.isOpen }})">
    Open/Close All Sections
</button>
{% endraw %}[/sourcecode]

The above code matches the earlier "Expand All Sections" example. We created a state variable (`isOpen`) for an accordion (not shown above). The ID of the `<amp-state>` component is `accordionState`. When we set the value of `isOpen`, we set it inside of an object with the name `accordionState`. When we reference the value of `isOpen`, we have to reference it as `accordionState.isOpen`. Clear naming conventions are important to helping your developers keep track of the meaning of your state variables. This clarity will make your code easier to understand and likelier to be error-free.

[tip type="read-on"]
**Note**: `<amp-state>` has additional features that are outside the scope of this training. It's even possible to set the initial values of state with data downloaded from a remote server! Or, you can print out the current value of the state to the developer console in your browser. Check out the [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state) on `<amp-state>` for more information.
[/tip]

## Connecting State To Elements With Bindings

Bindings are the means by which changes to our state variables can cause visible updates to our websites. In other words, bindings are the connections between properties on components and state variables.

In AMP, we define a bound property by surrounding it with brackets. We set that property equal to an expression. Whenever the value of a state variable in that expression is changed, the expression is evaluated against those new values, and the property is updated.

For example, if we want to control an element's text, we can bind to the `text` property of an element. In the code below, pressing the button will cause the paragraph tag to contain the text "Hello AMP!":

[sourcecode:html]
{% raw %}<button on="tap:AMP.setState({message: ‘Hello AMP!’})">
    Say Hello!
</button>
<p [text]="message"></p>
{% endraw %}[/sourcecode]

The `[text]` is the bound property that will be changed whenever the state variable `message` is changed. In this case, the expression simply sets the text of the paragraph element to the value of the `message` variable.

The `text` attribute is bindable on any element or component that supports text content. Other such attributes include `width`, `height`, `hidden`, and `class`. Most AMP components also provide custom properties that can be bound to state variables. For example, we can bind to the `slides` property of the `<amp-carousel>` component to control the active slide, the `selected` property of the `<amp-selector>` component to control the selected item, and the `src` property of the `<amp-img>` component to change the displayed image. The complete list of bindable properties can be found in the `<amp-bind>` [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}).

It’s important to note that bindings don't change until the values of state variables do. Bindings are not evaluated when the page is first loaded. In the previous "Hello AMP" example, the paragraph was empty on the initial page load, even if we loaded an initial value for the `message` state variable using an `<amp-state>` component. Therefore, to make sure your components look reasonable on page load, always include a default value for a bound property.

To add a default value for a bound property, include the property both with and without the brackets around it. When the page loads, it will use the default property. Whenever the binding is triggered by changes to relevant state variables, the default property will be overriden. For example, in the following code, the color of the text will be blue on initial page load, but change to red after the button is pressed.

[sourcecode:html]
{% raw %}<button on="tap:AMP.setState({messageClass: ‘text-color-red’})">
    Change to Red!
</button>
<p [class]="messageClass" class="text-color-blue">Hello AMP!</p>
{% endraw %}[/sourcecode]

So far, we’ve used basic expressions that directly referenced a single state variable, but we can get more elaborate. Expressions are a subset of JavaScript. They can include static values such as numbers or strings, state variables, and a set of white-listed functions. The [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#expressions) gives a rundown of the values that can be added to an expression.

The value of a bound property is set to the value that's returned when an expression is evaluated. For example, this code shows how to create an error message during account creation. The following case checks whether a user's two entered passwords match:

[sourcecode:html]
{% raw %}<input type="text" placeholder="Password"
    on="change:AMP.setState({ firstPassword: event.value })" />
<input type="text" placeholder="Re-Enter Password"
    on="change:AMP.setState({ secondPassword: event.value })" />
<p hidden [hidden]="firstPassword == secondPassword">
    The passwords don't match!
</p>
{% endraw %}[/sourcecode]

In the code above, the text that the user has entered for a password is stored in two state variables: `firstPassword` and `secondPassword`. The error message is hidden by default and remains that way if the two passwords match. In other words, the error is only shown if the password text doesn’t match!

Bindings are powerful tools for building dynamic, interactive websites. They help us split up how we handle user interaction into two distinct problems: how user interactions affect state variables and how changing state variables affect the content and/or look of our site. We can tackle each of these problems closest to the place where the problem is most relevant. We manage the effects of user interactions on state in event handlers using the `setState` action, and we update the content and look of our site by binding the properties of our components to state variables.

This approach to managing user interaction in your application can reduce errors, make it easier to change your components in the future, and make it easier for others to understand your code.

Bindings are powerful tools for building rich, dynamic, interactive websites. They allow us to tie a small number of state variables to several different properties. Additionally, they allow us to separate the update of state variables in events from the management of visible effects on the page in bound properties.

When using only events and actions, we had to know how a single user action would translate to effects throughout the page. With state and bindings, we now store information into state variables related to user actions. Then, we let our bindings decide how those state variables will affect the values of properties throughout our site.

## Exercise 1: Using State to Keep our Carousels in Sync

To practice what we’ve learned so far, let’s convert our carousels from using events and actions to using state and bindings to stay in sync with each other. **Hint**: We should no longer use the `<amp-carousel>` action `goToSlide` and the `<amp-selector>` action `toggle`, as we did in the previous course. Additionally, let’s add some text below the thumbnail that tracks what slide we have selected.

Using the [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}) for `<amp-state>` and `<amp-bind>`, try to complete each of the following requirements:

* When a user changes the slide in either the larger carousel or the thumbnail carousel, the slide of the other carousel should also change to the same slide.

* Store the current slide index (0, 1, or 2) in the state variable `selectedSlide`.

* Add a `<p>` tag after the `<amp-selector>` component.

* The new `<p>` tag should contain text in the format "Slide X of 3" where X is the currently selected slide. **Note**: The slide index starts with 0 but the slide counter text should start with 1. **Hint**: Don’t forget to add an initial value for the paragraph tag text!

* **[Optional]** Store the state variables in an `<amp-state>` component with ID `carousel`.

Once you have finished, the result should look like this:

{{ image('/static/img/courses/advanced/image4.png', 752, 1336, align='center third', caption='Image of the styled thumbnail carousel') }}

### Solution

The portion of the page containing the carousel should look like this:

[sourcecode:html]
{% raw %}
<amp-state id="carousel">
    <script type="application/json">
        {
            "selectedSlide": 0
        }
    </script>
</amp-state>
<amp-carousel on="slideChange:AMP.setState({carousel: {selectedSlide:event.index}})"
    [slide]="carousel.selectedSlide" lightbox id="imageSlides" layout="responsive"
    width="412" height="309" type="slides" loop>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser.jpg?1540228205366"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese.jpg?1540228223785"
        width="412" height="309" layout="responsive"></amp-img>
    <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse.jpg?1540228223963"
        width="412" height="309" layout="responsive"></amp-img>
</amp-carousel>
<amp-selector id="ampSelector" [selected]="carousel.selectedSlide"
    on="select:AMP.setState({carousel: {selectedSlide:event.targetOption}})">
    <amp-carousel layout="fixed-height" height="78" class="thumbnail-carousel">
        <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheddar-chaser-thumb.jpg?1540228250623"
            option="0" selected role="button" tabindex="1" width="96" height="72" layout="fixed"></amp-img>
        <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-thumb.jpg?1540228249992"
            option="1" role="button" tabindex="1"  width="96" height="72" layout="fixed"></amp-img>
        <amp-img src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fmouse-thumb.jpg?1540228249062"
            option="2" role="button" tabindex="1" width="96" height="72" layout="fixed"></amp-img>
    </amp-carousel>
</amp-selector>
<p [text]="’Slide ‘ + (carousel.selectedSlide + 1) + ‘ of 3’">
    Slide 1 of 3
</p>
{% endraw %}[/sourcecode]

Remember to include the `<amp-bind>` library in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
{% endraw %}[/sourcecode]

## Case Study: Analyzing an Online Shopping Page

Binding and state management are important to e-commerce pages. Imagine going to a shopping site looking to buy a new t-shirt. You search through the lists of options before settling on a style and brand that you really like. Navigating to the product page, you see lists of additional options. You might be able to select among different fits, sizes, or colors.

{{ image('/static/img/courses/advanced/image12.png', 1999, 1001, align='center', caption='Online shopping product page example') }}

Often, as we select these options, the page changes to match our selection. The picture might update to a green women’s shirt or to a red men’s shirt. The price might change as we pick a different t-shirt fit or size. Other options might be sold out entirely, causing an error message to appear!

Other parts of the page show dynamic content as well. Usually, when we log into our account for the e-commerce site, we might see our name displayed in the top-right corner. There is usually a shopping cart icon with a small number badge indicating how many products are in our cart. As we click a button to purchase more items, that number updates to the new total of items in our cart.

To start to get a feel for how much information is stored in state variables on e-commerce sites, think about someone else using the same site. They have different account information and a different shopping cart. They might be viewing different products or have different options enabled.  Each of the differences in how two users might see the same site will be described by one or more state variables.

With what we have learned about state variables and bindings, we now start to see how we could create such a page. We need to store the present value of each product option in its own state variable. Then, we need pricing and availability information that corresponds to the various product options (e.g., the price of a green men’s XL shirt vs. a women’s red S shirt). Finally, we bind the dynamic fields such as price, the out-of-stock error visibility, and the product image to account for each of the selected options.

## Exercise 2: Recreate an Online Product Page

Our next goal is to recreate a basic online product page such as the one we discussed in our case study. Our product is going to be a t-shirt that comes in various options: men’s or women’s; small, medium, or large; and red, blue, or green. The product’s base price will change based on the user’s selections. Finally, the image of the t-shirt product will update when the user selects a different color.

{{ image('/static/img/courses/advanced/image5.png', 1180, 942,  align='center', caption='The example product page we’re building') }}

We’re not going to build this product page inside of our Chico’s Cheese Bikes shop project. Instead, you can use [this](https://glitch.com/~rustic-musician) Glitch as a starting point for this exercise. **Note**: Don’t forget to remix it so you can edit! The Glitch contains:

* Some basic CSS and HTML to layout the static product page.

* State variables describing the cost of the product, the upcharges for various options, and the URLs for the various product images by color.

* An `<amp-state>` component to hold state variables with initial values.

Let’s discuss the structure of the product information that is loaded in an `<amp-state>` component in the given Glitch starter application. In a real e-commerce site, we might load this data directly from the server, but in our example, we will include the data directly in the site.

[sourcecode:html]
{% raw %}<amp-state id="productData">
    <script type="application/json">
        {
            "basePrice": 14
            "upcharges": {
                "fit": {
                    "Men": 0,
                    "Women": 3
                },
                "size": {
                    "Small": 0,
                    "Medium": 2,
                    "Large": 5
                },
                "color": {
                    "Red": 0,
                    "Blue": 1,
                    "Green": 0
                }
            },
            "images": {
                "Red": "https://...redtshirt.jpg",
                "Blue": "https://...Blue_Tshirt.jpg",
                "Green": "https://...greentshirt.png"
            }
        }
    </script>
</amp-state>
{% endraw %}[/sourcecode]

First, notice that the ID of the `<amp-state>` component is `productData`. That means that the base price of the item ($14) can be referenced in binding expressions as `productData.basePrice`. Next, in the `upcharges` section, we list the various options for the t-shirt and how they raise the price of the item.

For example, referencing `productData.upcharges.size.Medium` in an expression would return the upcharge price of a medium t-shirt ($2). (An upcharge is an additional price paid for a product customization.) We simply add the upcharge price to the base price of the t-shirt (`productData.basePrice` + `productData.upcharges.size.Medium` = $14 + $2 = $16) to get the final price for the shirt. Finally, the `images` section contains the different URLs that point to images for each color of our shirt.

Using the documentation for [`<amp-bind>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}), [`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state), and the descriptions above, update the given basic product page to meet the following requirements:

* When the fit, size, and color select boxes are updated, they should store their new selected value into the corresponding state variable in the `<amp-state>` component with ID `optionsData`.

* The image of the t-shirt should correspond to the currently selected color option.

* The `<p>` tag containing the product description (Fit: Men - Size: Small - Color: Red) should be updated to reflect the currently selected product options.

* The `<span>` tag containing the dollar portion of the product price should be updated to reflect the base price of the item and any upcharges related to currently selected product options.

[tip type="read-on"]
**Hint**: An important skill to complete this exercise is using one set of state variables to retrieve data from another state variable. In this case, we will frequently be using the variables in the `optionsData` state variable to retrieve information from the `productData` state variable. For example, to figure out what the upcharge is for the currently selected t-shirt size, we’d reference `productData.upcharges.size[optionsData.size]` in our binding expression. If `optionsData.size` is currently set to `Small`, then the previous expression is equivalent to `productData.upcharges.size.Small`. You can read more about this approach to referencing information in JSON [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors).
[/tip]

### Solution

The solution can be found in this Glitch example. The portion of the page containing the changes should look like this:

[sourcecode:html]
{% raw %}
<main>
    <h2>Tina's T-Shirts</h2>
    <div class="filter-sort-selectors">
        <p>Product Fit:</p>
        <select class="product-selector" on="change:AMP.setState({optionsData: { fit: event.value }})">
            <option value="Men">Men's</option>
            <option value="Women">Women's</option>
        </select>
        <p>Product Size:</p>
        <select class="product-selector" on="change:AMP.setState({optionsData: { size: event.value }})">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
        </select>
        <p>Product Color:</p>
        <select class="product-selector" on="change:AMP.setState({optionsData: { color: event.value }})">
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
        </select>
    </div>
    <div class="product">
      <amp-img src="https://cdn.glitch.com/f87df7df-18be-4e6e-8b0e-1145de279989%2Fredtshirt.jpg?1542275948053"
          [src]="productData.images[optionsData.color]" layout="responsive" width="350" height="350"></amp-img>
      <h2>T-Shirt</h2>
      <p [text]="'Fit: ' + optionsData.fit + ' - Size: ' + optionsData.size + ' - Color: ' + optionsData.color">
          Fit: Men - Size: Small - Color: Red
      </p>
      <p class="price">
          $<span [text]="productData.basePrice +
                         productData.upcharges.fit[optionsData.fit] +
                         productData.upcharges.size[optionsData.size] +
                         productData.upcharges.color[optionsData.color]"> 14</span>.00
      </p>
    </div>
</main>
{% endraw %}[/sourcecode]

