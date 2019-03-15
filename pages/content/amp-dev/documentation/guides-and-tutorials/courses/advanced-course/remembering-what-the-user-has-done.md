---
$title: Remembering What The User Has Done
$order: 1
toc: true
---

## Rethinking The Carousel

Sometimes we want a single user interaction to affect multiple components simultaneously. In a simple case, we might have several closed accordions with a single button that says "Expand All Sections." If the user presses that button, we want to open all of the accordion menus at the same time. 

Meanwhile, in a more complicated scenario, we might be working on a checkout form for a shopping site. In that case, we want users to be able to reuse their shipping address as their billing address or to display an address entry form instead. We only want to show users the fields that are required to complete the form, so clicking a single checkbox might cause multiple address input fields to appear or disappear.

Recall that, while building our cheese bike site, we built two image carousels that were linked together with events and actions. Whenever we changed the slide in either carousel, we would update the other carousel to point to the same slide. This works well for actions and events, because the number of effects for each event was small. What if we wanted to add a third component that also needed to be updated whenever a new slide was chosen? Suddenly, things might get complicated. In the "Expand All Sections" example above, every time we added a new section, we’d have to update the event handler for the button to open the new accordion. 

In programming, when we need to use the same value in multiple places, we use a variable. Whenever a variable is referenced in code, it returns its value at the time the code executes. If you update the value of the variable, any code that references the variable sees the updated value. 

We can do something similar with our websites. We can store information in variables and reference them throughout our page. As we update those variables, the page will be updated with the new values.

So, for our carousel example, we could create a variable containing the currently selected slide. Whenever a user changes the slide on one of the carousels, we update the variable’s value. Finally, we rework each carousel to update their selected slide whenever the variable we created is updated. In our "Expand All Sections" example, we could cause the button press to update a variable, and we could update each accordion to be open whenever the variable was updated.

These types of variables are called "state variables," and the process of updating a component when a state variable is changed is called "binding." Fittingly, developers manage state variables in AMP using the `<amp-state>` [component]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}), and update components when state variables change using the `<amp-bind>` [component]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}).

## Storing Information in Application State



## Connecting State To Elements With Bindings

## Exercise 1: Using State to Keep our Carousels in Sync

### Solution

## Case Study: Analyzing an Online Shopping Page

## Exercise 2: Recreate an Online Product Page

### Solution