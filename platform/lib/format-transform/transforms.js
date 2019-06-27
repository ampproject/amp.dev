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

const host = config.getHost(config.hosts.platform);

function absoluteUrl(url) {
  if (!url.match(/^https?:\/\//)) {
    url = host + url;
  }
  return url.replace('http:', 'https:');
}

const amp4emailTransform = {
  'html': (el) => {
    el.removeAttr('amp');
    el.removeAttr('⚡');
    el.attr('⚡4email', '');
  },
  'form, a': (el) => {
    el.removeAttr('target');
  },
  'amp-list': (el) => {
    el.removeAttr('reset-on-refresh');
    el.removeAttr('binding');
  },
  'form[action-xhr]': (el) => {
    el.attr('action-xhr', absoluteUrl(el.attr('action-xhr')));
  },
  'a[href]': (el) => {
    el.attr('href', absoluteUrl(el.attr('href')));
  },
  'amp-img[src], amp-anim[src], amp-list[src]': (el) => {
    el.attr('src', absoluteUrl(el.attr('src')));
  },
  'head > style[amp-boilerplate]': '<style amp4email-boilerplate>body{visibility:hidden}</style>',

  'form[method=get i][action]': null,
  'form[verify-xhr]': null,
  'amp-state[src]': null,
  'amp-img[srcset]': null,
  '[\\[src\\]]': null,
  'input[type=password]': null,
  'head > title': null,
  'head > link': null,
  'head > meta:not([charset])': null,
  'noscript': null,
};

module.exports = {
  email: amp4emailTransform,
};
