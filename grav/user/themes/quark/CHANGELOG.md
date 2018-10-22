# v1.2.0
## 08/23/2018

1. [](#new)
    * Added new "custom logo" support [#3](https://github.com/getgrav/grav-theme-quark/issues/3)
    * Added option JSON feed syndication support in sidebar [#47](https://github.com/getgrav/grav-theme-quark/pull/47)
    * Added basic form field `array` styling

# v1.1.0
## 07/25/2018

1. [](#new)
    * Responsive font sizing [#28](https://github.com/getgrav/grav-theme-quark/issues/28)
1. [](#improved)
    * Updated [Spectre.css](https://picturepan2.github.io/spectre/) to latest `0.5.3` version
    * Make blog settings toggleable [#38](https://github.com/getgrav/grav-theme-quark/pull/38)
1. [](#bugfix)
    * Proper fix for sticky footer in IE10 and IE11 [#21](https://github.com/getgrav/grav-theme-quark/issues/21)
    * Fix for lists wrapping weirdly due to `outside` attribute
    * Updated checkbox + radio to take into account `client_side_validation` form option
    * Fixes for fallback values [#37](https://github.com/getgrav/grav-theme-quark/pull/37)
    * Fix inheritance for images folder [#30](https://github.com/getgrav/grav-theme-quark/pull/30)
    * Added blueprint option for `continue_link` [#45](https://github.com/getgrav/grav-theme-quark/issues/45)
    * Added blueprint option for Feature `class` [#14](https://github.com/getgrav/grav-theme-quark/issues/14)
    * Fixed `Duplicate ID` issues with modular sections.  Might break CSS on first load, need to refresh to pick up new CSS [#24](https://github.com/getgrav/grav-theme-quark/issues/24)
    * Fixed Text feature alignment issue [#4](https://github.com/getgrav/grav-theme-quark/issues/4)
    * Overlapping menu and mobile button [#7](https://github.com/getgrav/grav-theme-quark/issues/7)

# v1.0.3
## 05/11/2018

1. [](#new)
    * Added new primary button mixin
1. [](#improved)
    * Updated [Spectre.css](https://picturepan2.github.io/spectre/) to latest `0.5.1` version
    * Improved default login styling
    * Removed core Spectre.css override to make upgrading Spectre easier
    * Added screenshot to README.md
    * Override focus to prevent overzealous blue blurs
1. [](#bugfix)
    * Fix for `highlight` plugin not changing background of code blocks 
    * Removed extraneous `dump()` in Twig output

# v1.0.2
## 02/19/2018

1. [](#new)
    * Added toggle options to enable Spectre.css _experimentals_ and _icons_ CSS files
    * Switched to a fork of LineAwesome icons compatible with FontAwesome 4.7.0
1. [](#improved)
    * Font tweaks
1. [](#bugfix)
    * Pagination fixes    
    
# v1.0.1
##  01/22/2018

1. [](#new)
    * Added blueprints for admin editing
1. [](#improved)
    * Use default lang from `site.yaml`
1. [](#bugfix)
    * Fixed Current path to address issues with extending Quark
    * Fixed parallax to start in same position as standard
    * Fixed modular image size

# v1.0.0
##  12/28/2017

1. [](#new)
    * ChangeLog started...
