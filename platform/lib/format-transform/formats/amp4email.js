/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
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

const config = require('@lib/config.js');
const host = config.hosts.platform;
const postcss = require('postcss');
const postcssCssVariables = require('postcss-css-variables');

module.exports = {
  validatorRuntime: 'AMP4EMAIL',
  transforms: {
    'html': (el) => {
      el.removeAttr('amp');
      el.removeAttr('⚡');
      el.attr('⚡4email', '');
      el.attr('data-css-strict', '');
    },
    'form, a': (el) => {
      el.removeAttr('target');
    },
    'form[action-xhr]': (el) => {
      el.attr('action-xhr', config.absoluteUrl(host, el.attr('action-xhr')));
    },
    'a[href]': (el) => {
      el.attr('href', config.absoluteUrl(host, el.attr('href')));
    },
    'amp-img[src], amp-anim[src], amp-list[src]': (el) => {
      el.attr('src', config.absoluteUrl(host, el.attr('src')));
    },
    'amp-accordion[disable-session-states]': (el) => {
      el.removeAttr('disable-session-states');
    },
    'style[amp-custom]': (el) => {
      const node = el[0].children[0];

      if (node) {
        node.data = postcss([postcssCssVariables()]).process(node.data).css;
      }
    },
    'head > style[amp-boilerplate]':
      '<style amp4email-boilerplate>body{visibility:hidden}</style>',

    'head > title': null,
    'head > link': null,
    'head > meta:not([charset])': null,
    'noscript': null,
  },
};
