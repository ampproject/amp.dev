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
const {nextNode, hasAttribute, firstChildByTag} =
  require('@ampproject/toolbox-optimizer').NodeUtils;
const rcs = require('rcs-core');

/* Class names which are safe to rewrite in the context of amp.dev */
const SAFE_CLASS_NAMES = [
  'ap--content',
  'ap--container',
  'ap--ctas',
  'ap--made-of',
  'ap--playground-link',
  'ap-a-divider',
  'ap-a-sidebar',
  'ap-m-banner',
  'ap-m-benefit',
  'ap-m-biggy',
  'ap-m-breadcrumbs',
  'ap-m-code-snippet',
  'ap-m-code-snippet',
  'ap-m-format-visual',
  'ap-m-info-button',
  'ap-m-language-selector',
  'ap-m-level-toggle',
  'ap-m-lnk',
  'ap-m-nav-link',
  'ap--quote',
  'ap-m-quote',
  'ap-m-rolling-formats',
  'ap-m-search-trigger',
  'ap-m-shift-card',
  'ap-m-teaser',
  'ap-m-visual-image',
  'ap-m-format-filter',
  'ap-o-benefits',
  'ap-o-benefits',
  'ap-o-burger-menu-item',
  'ap-o-burger-menu-link',
  'ap--case-grid',
  'ap-o-case-grid',
  'ap--case-band',
  'ap-o-case-band',
  'ap--component-visual',
  'ap-o-component-visual',
  'ap-o-consent',
  'ap-o-footer',
  'ap-o-help',
  'ap-o-news',
  'ap-o-search',
  'ap--sidebar',
  'ap--stage',
  'ap-o-stage',
  'ap--teaser-grid',
  'ap-o-teaser-grid',
  'ap-t-component-detail',
  'ap-t-component-overview',
  'ap-t-courses-overview',
  'ap-t-custom-content',
  'ap-t-default',
  'ap-t-docs-detail',
  'ap-t-docs-guides-overview',
  'ap-t-docs-overview',
  'ap-t-error',
  'ap-t-events',
  'ap-t-examples-manual',
  'ap-t-examples-preview',
  'ap-t-faq-detail',
  'ap-t-faq-overview',
  'ap-t-guide',
  'ap-t-home',
  'ap-t-meta',
  'ap-t-overview',
  'ap-t-roadmap',
  'ap-t-success-story',
  'ap-t-template',
  'ap-t-use-cases',
  'ap-t-what-is-amp',
  'ap-home-stage',
  'ap-stage',
  'ap-intro',
  'ap-teaser',
];

rcs.selectorsLibrary.setExclude(
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
    const html = firstChildByTag(tree, 'html');
    if (!html) return;

    const head = firstChildByTag(html, 'head');
    if (!head) return;

    // Find style[amp-custom] to rewrite selectors
    let style = null;
    for (const child of head.children) {
      if (child.tagName == 'style' && hasAttribute(child, 'amp-custom')) {
        style = child;
        break;
      }
    }
    if (!style) return;

    const body = firstChildByTag(html, 'body');
    if (!body) return;

    // Rewrite the selectors inside the CSS
    const css = style.children[0].data;
    rcs.fillLibraries(css, {prefix: '-', ignoreCssVariables: true});
    const styles = rcs.replace.css(css);
    style.children[0].data = styles;

    // Rewrite the selectors on the actual elements
    for (let node = body; node !== null; node = nextNode(node)) {
      if (!hasAttribute(node, 'class')) {
        continue;
      }

      node.attribs.class = node.attribs.class
        .split(' ')
        .map((className) => {
          return rcs.selectorsLibrary.get(className) || className;
        })
        .join(' ');
    }
  }
}

module.exports = CssTransformer;
