/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://wwwapache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const rcs = require('rcs-core');

/* Class names which are safe to rewrite in the context of amp.dev */
const SAFE_CLASS_NAMES = [
  'ap--container',
  'ap--quote',
  'ap-m-banner',
  'ap-m-breadcrumbs',
  'ap-m-language-selector',
  'ap-m-rolling-formats',
  'ap-m-lnk',
  'ap-m-nav-link',
  'ap-m-shift-card',
  'ap-m-teaser',
  'ap-m-quote',
  'ap-m-benefit',
  'ap-m-code-snippet',
  'ap-m-code-snippet',
  'ap-m-level-toggle',
  'ap-m-info-button',
  'ap-o-component-visual',
  'ap-o-news-item',
  'ap-o-benefits',
  'ap-o-case-band',
  'ap-o-case-grid',
  'ap-o-consent',
  'ap-o-footer',
  'ap-o-header',
  'ap-o-stage',
  'ap-o-teaser-grid',
  'ap-t-what-is-amp',
];

rcs.selectorLibrary.setExclude(
    new RegExp('^(?!' + SAFE_CLASS_NAMES.join('|') + ').*$')
);

/**
 * A custom transformer for the @ampproject/toolbox-optimizer rewriting
 * CSS selectors to save bytes in <style amp-custom>.
 */
class CssTransformer {
  constructor(config) {
    this.log_ = config.log.tag('CSS_TRANSFORMER');
  }

  transform(tree) {
    const html = tree.root.firstChildByTag('html');
    if (!html) return;

    const head = html.firstChildByTag('head');
    if (!head) return;

    // Find style[amp-custom] to rewrite selectors
    let style = null;
    for (const child of head.children) {
      if (child.tagName == 'style' && child.hasAttribute('amp-custom')) {
        style = child;
        break;
      }
    }
    if (!style) return;

    const body = html.firstChildByTag('body');
    if (!body) return;

    // Rewrite the selectors inside the CSS
    const css = style.children[0].data;
    rcs.fillLibraries(css, {prefix: '-'});
    style.children[0].data = rcs.replace.css(css);

    // Rewrite the selectors on the actual elements
    for (let node = body; node !== null; node = node.nextNode()) {
      if (!node.hasAttribute('class')) {
        continue;
      }

      node.attribs.class = node.attribs.class.split(' ').map((className) => {
        return rcs.selectorLibrary.get(className) || className;
      }).join(' ');
    }
  }
}

module.exports = CssTransformer;
