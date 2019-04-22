/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const URL = require('url').URL;
const config = require('@lib/config.js');

const FORMATS = ['websites', 'stories', 'ads', 'email'];

const FILTER_CLASSES = {
  'websites': 'ap--websites',
  'stories': 'ap--stories',
  'ads': 'ap--ads',
  'email': 'ap--email',
};

const FILTERED_ROUTES = [
  /\/documentation\/guides-and-tutorials.*/,
  /\/documentation\/components.*/,
  /\/documentation\/examples.*/,
];

/**
 * Applies the format filter to the dom
 *
 * @param {String} - format  One of FORMATS
 * @param {Object} - the DOM
 * @param {Boolean} - force  Flag if format should be validated
 */
function filterPage(format, dom, force) {
  if (!isAvailable(format, dom) && !force) {
    return false;
  }
  const filter = new Filter(format, dom);
  filter.apply();
  return true;
}

function isFilterableRoute(route) {
  let filterableRoute = false;
  for (const expression of FILTERED_ROUTES) {
    if (expression.test(route)) {
      filterableRoute = true;
      break;
    }
  }

  return filterableRoute;
}

/**
 * Checks if the constructed one is a actually valid format variant
 * @return {Boolean}
 */
function isAvailable(format, dom) {
  const body = dom('body');
  return (body.attr('data-available-formats') || '').includes(format);
}

class Filter {
  /**
   * @param {String} format  One of FORMATS
   * @param {String} content A valid HTML document string
   */
  constructor(format, dom) {
    this._format = format;
    this._dom = dom;
  }

  /**
   * Applies the filter
   */
  apply() {
    this._removeHiddenElements();
    this._rewriteUrls();
    this._setActiveFormatToggle();
    this._removeStaleFilterClass();
    this._removeEmptyFilterBubbles();
    this._addClassToBody();
  }

  /**
   * Adds a class to the <body> element that marks the current filtered format
   * to be able to apply styles based on filter
   * @return {undefined}
   */
  _addClassToBody() {
    this._dom('body').addClass(FILTER_CLASSES[this._format]);
  }

  /**
   * Tries to remove all elements that would otherwise be hidden by CSS
   * and then checks for empty lists afterwards
   * @return {undefined}
   */
  _removeHiddenElements() {
    let inactiveFormatClasses = Object.assign({}, FILTER_CLASSES);
    delete inactiveFormatClasses[this._format];
    inactiveFormatClasses = Object.values(inactiveFormatClasses);
    inactiveFormatClasses = '.' + inactiveFormatClasses.join(', .');

    const activeFormatClass = FILTER_CLASSES[this._format];

    // Find all hidden elements and remove them if they aren't matching
    // the current filter
    this._dom(inactiveFormatClasses).each((index, filteredElement) => {
      filteredElement = this._dom(filteredElement);

      // Check if the filtered element is also valid for the current format
      if (filteredElement.hasClass(activeFormatClass)) {
        return;
      }

      filteredElement.remove();
    });

    // Find possibly empty lists and remove them from sidebars
    this._dom('.nav-list.level-2')
        .each((index, navList) => {
          navList = this._dom(navList);

          if (navList.children().length == 0) {
            navList.parent().remove();
          }
        });

    // Remove empty top level categories from sidebar
    this._dom('.nav-item.level-1')
        .each((index, navItem) => {
          navItem = this._dom(navItem);

          // ... consider a category empty if there are no links in it
          if (!navItem.has('a').length) {
            navItem.remove();
          }
        });

    // Remove eventually unnecessary tutorial dividers left by the
    // previous transformation
    this._dom('.nav-item-tutorial-divider:last-child,' +
      '.nav-item-tutorial-divider:first-child').remove();
  }

  /**
   * Appends the currently active filter to all of the links
   * on the page
   * @return {undefined}
   */
  _rewriteUrls() {
    this._dom('a').each((index, a) => {
      a = this._dom(a);
      const url = new URL(a.attr('href') || '', config.hosts.platform.base);

      // Check if the link is pointing to a filtered route
      // and if the link already has a query parameter
      if (!url.searchParams.get('format') && isFilterableRoute(url.pathname)) {
        url.searchParams.set('format', this._format);
        a.attr('href', url.toString());
      }
    });
  }

  _setActiveFormatToggle() {
    // Rewrite the active state (which is websites per default) to
    // the current active format
    const activeFormat = this._dom('.ap-m-format-toggle-selected');
    if (activeFormat.length == 0) {
      const canonical = this._dom('[rel="canonical"]');
      console.error(`No active format: ${canonical.attr('href')}`);
      return;
    }

    activeFormat.html(activeFormat.html().replace(/websites/g, this._format));
    activeFormat.removeClass('ap-m-format-toggle-link-websites');
    activeFormat.addClass(`ap-m-format-toggle-link-${this._format}`);

    // Remove the current format from list of available ones
    this._dom(`a.ap-m-format-toggle-link-${this._format}`).remove();
  }

  /**
   * Remove the unneeded filter classes on the elements as they are not needed
   * anymore after static filtering has been applied
   * @return {undefined}
   */
  _removeStaleFilterClass() {
    let filteredElementsSelector = Object.values(FILTER_CLASSES);
    filteredElementsSelector = '.' + filteredElementsSelector.join(', .');

    const filterClasses = Object.values(FILTER_CLASSES).join(' ');

    this._dom(filteredElementsSelector).each((index, filteredElement) => {
      filteredElement = this._dom(filteredElement);

      filteredElement.removeClass(filterClasses);
    });
  }

  /**
   * Checks if there are filter bubbles on the page and checks for possible
   * matches for their filter, then removes them if there are none
   * @return {undefined}
   */
  _removeEmptyFilterBubbles() {
    this._dom('.ap-m-filter-bubble').each((index, filterBubble) => {
      filterBubble = this._dom(filterBubble);
      const category = filterBubble.data('category');
      if (!this._dom(`.ap-m-teaser[data-category="${category}"]`).length && category) {
        filterBubble.remove();
      }
    });
  }
}

module.exports.filterPage = filterPage;
module.exports.isFilterableRoute = isFilterableRoute;
module.exports.FORMATS = FORMATS;
