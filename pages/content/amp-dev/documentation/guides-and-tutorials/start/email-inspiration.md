---
$title: Inspiration for AMP Email use cases
$order: 1
description: 'Inspiration for AMP Email use cases'
$category: Start
formats:
    - email
author: nainar
---

We know that diving into using a technology can be overwhelming so here are some ideas for which AMP Emails would be a great fit: 

## Collaboration
- Commenting on content via email:
    - AMP components used: 
        - Use `<amp-list>` to pull information in dynamically from an endpoint.
        - Use a generic `<input>` tag to leave a comment.
        - Use `<amp-form>` to submit an "Reply/Resolve" state to an end point. 
- Mentioning/tagging someone in a doc comment:
    - AMP components used: 
        - Use `<amp-list>` to pull information in dynamically from an endpoint.
        - Use `<amp-autocomplete>` to search through a list of possible emails/names to mention
- Granting access to a file/asset via email:
    - AMP components used:
        - Use `<button>` to display the action
        - Use `<amp-form>` to submit the form to an end point. 

## Approvals/reviews
- Expenses, Vacation, Content, Ticketing, workflows - Instant approvals, moving something along a workflow, commenting on or assign issues:
    - AMP components used: 
        - Use `<amp-list>` to pull information in dynamically from an endpoint.
        - Use a generic `<input>` tag to leave a comment.
        - Use `<amp-form>` to submit an "Reply/Resolve" state to an end point. 

## Triggering a failed service
- Trigger a failed service via an email notification:
    - AMP components used: 
        - Use `<amp-form>` to submit the form (with the button) to an end point.