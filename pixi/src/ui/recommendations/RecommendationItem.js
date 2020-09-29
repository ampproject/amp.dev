// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import i18n from '../I18n.js';
import {addTargetBlankToLinks, cleanCodeForInnerHtml} from '../../utils/texts';
import marked from 'marked';

export default class RecommendationItem {
  constructor(content, pageUrl, element) {
    this.content = content;
    this.pageUrl = pageUrl;

    this.element = element;
    this.element.id = `recommendation-${content.id}`;
    this.element.style = null;

    this.header = element.querySelector(
      '.ap-m-pixi-recommendations-item-header'
    );
    this.header.id = `header-${content.id}`;

    this.title = element.querySelector(
      '.ap-m-pixi-recommendations-item-header-title'
    );
    this.toggle = element.querySelector(
      '.ap-m-pixi-recommendations-item-header-toggle'
    );

    this.body = element.querySelector('.ap-m-pixi-recommendations-item-body');
    this.body.id = `body-${content.id}`;

    this.bodyText = element.querySelector(
      '.ap-m-pixi-recommendations-item-body-text'
    );

    this.nextButton = element.querySelector('a');
    this.nextButton.hidden = true;

    this.tagsBar = element.querySelector(
      '.ap-m-pixi-recommendations-item-tags'
    );

    this.render();

    // Recommendations with a body text can be expanded to show more
    // information
    if (this.content.body) {
      this.header.setAttribute('aria-controls', this.body.id);
      this.body.setAttribute('aria-labelledby', this.header.id);

      this.header.addEventListener('click', this.onClickHeader.bind(this));
    }
  }

  render() {
    this.title.innerHTML = this.content.title;

    // Remove body elements for recommendations that have no recommendation
    // text and force expand them
    if (!this.content.body) {
      this.element.removeChild(this.body);
      this.header.removeChild(this.toggle);
    } else {
      let body = cleanCodeForInnerHtml(this.content.body);
      body = body.replace(/\$\{URL\}/g, encodeURIComponent(this.pageUrl));
      body = addTargetBlankToLinks(body);

      // Render details if there are any and add them to the body text
      if (this.content.details) {
        let details = '\n';
        for (const detail of this.content.details.items) {
          details += `- \`${detail.url}\`\n`;
        }

        body += marked(details);
      }

      this.bodyText.innerHTML = body;
    }

    for (const tagId of this.content.tags) {
      // Add the tagId as class name to the parent element for
      // easy filtering in RecommendationsView
      this.element.classList.add(tagId);

      const tag = document.createElement('span');
      tag.textContent = i18n.getText(`tags.${tagId}`);

      this.tagsBar.appendChild(tag);
    }
  }

  set expanded(expanded) {
    this.element.classList.toggle('expanded', expanded);
    this.header.setAttribute('aria-expanded', expanded);

    this._expanded = expanded;
  }

  get expanded() {
    return this._expanded;
  }

  set next(nextRecommendation) {
    this.nextButton.hidden = false;
    this.nextButton.href = `#recommendation-${nextRecommendation.content.id}`;
    this.nextButton.addEventListener('click', this.onClickNext.bind(this));

    this._next = nextRecommendation;
  }

  get next() {
    return this._next;
  }

  set hidden(hidden) {
    this.element.hidden = hidden;
  }

  onClickHeader() {
    this.expanded = true;
  }

  onClickNext() {
    this.expanded = false;
    this.next.expanded = true;
  }
}
