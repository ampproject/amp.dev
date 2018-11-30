# Maintenance
This document holds all the information that is relevant to maintain and contribute the content for each if its packages.

## Documents
### Frontmatter
The documents inside the *pages* package are Grow documents that use the [built-in fields](http://grow.io/docs/documents/#built-in-fields) and some additional ones that are used to categorize them:

```yaml
- formats [default: websites,ads,email,stories]:
  - websites
  - ads
  - email
  - stories
- status [default: production]:
  - experimental
  - canary
  - production
- validAmp [default: true]
  - true
  - false
- draft [default: true]
  - true
  - false
- tags [default: '']
  - ads-analytics
  - dynamic-content
  - layout
  - media
  - presentation
  - social
  - personalization 
```
