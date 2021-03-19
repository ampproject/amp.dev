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
import snarkdown from 'snarkdown';

const VALUE_TYPE_BYTES = 'bytes';
const VALUE_TYPE_MS = 'ms';
const VALUE_TYPE_TIMESPAN_MS = 'timespanMs';
const VALUE_TYPE_THUMBNAIL = 'thumbnail';
const VALUE_TYPE_URL = 'url';

const IMAGE_RECOMMENDATION_IDS = [
  'appropriately-sized-images',
  'optimized-images',
  'next-gen-images',
];

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
    this.title.innerHTML = this.content.title;

    this.toggle = element.querySelector(
      '.ap-m-pixi-recommendations-item-header-toggle'
    );

    // Get next button before rendering the body to make sure the
    // selector matches the correct element
    this.nextButton = element.querySelector('a');
    this.nextButton.hidden = true;

    this.body = element.querySelector('.ap-m-pixi-recommendations-item-body');
    this.bodyText = element.querySelector(
      '.ap-m-pixi-recommendations-item-body-text'
    );
    this.body.id = `body-${content.id}`;
    this.renderBody();

    this.details = this.body.querySelector(
      '.ap-m-pixi-recommendations-item-details'
    );
    this.detailsTitle = this.details.querySelector(
      '.ap-m-pixi-recommendations-item-details-title'
    );
    this.detailsTable = this.details.querySelector('table');
    this.renderDetails();

    this.tagsBar = element.querySelector(
      '.ap-m-pixi-recommendations-item-tags'
    );
    this.renderTags();

    // Recommendations with a body text can be expanded to show more
    // information
    if (this.content.body || this.content.details) {
      this.header.setAttribute('aria-controls', this.body.id);
      this.body.setAttribute('aria-labelledby', this.header.id);

      this.header.addEventListener('click', this.onClickHeader.bind(this));
    }
  }

  renderBody() {
    // Remove body elements for recommendations that have no recommendation
    // text and force expand them
    if (!this.content.body && !this.content.details) {
      this.element.removeChild(this.body);
      this.header.removeChild(this.toggle);
    } else {
      let body = cleanCodeForInnerHtml(this.content.body);
      body = body.replace(/\$\{URL\}/g, encodeURIComponent(this.pageUrl));
      body = addTargetBlankToLinks(body);

      this.bodyText.innerHTML = body;
    }
  }

  renderDetails() {
    if (!this.content.details) {
      this.body.removeChild(this.details);
      return;
    }

    if (IMAGE_RECOMMENDATION_IDS.includes(this.content.id)) {
      this.detailsTitle.textContent = i18n.getText('detailsHeadlineImages');
    } else {
      this.detailsTitle.textContent = i18n.getText('detailsHeadlineOther');
    }

    let details = '<thead>';
    const columns = [];
    console.log('content', this.content);
    for (const heading of this.content.details.headings) {
      details += `<th class="${heading.key}">${
        heading.label || heading.text || ''
      }</th>`;
      columns.push({
        key: heading.key,
        type: heading.valueType || heading.itemType,
      });
    }
    details += '</thead>';

    for (const item of this.content.details.items) {
      details += '<tr>';
      for (const column of columns) {
        let value = '';
        if (column.type == VALUE_TYPE_THUMBNAIL) {
          value = `<amp-img alt="${i18n.getText('thumbnail')}" src="${
            item[column.key]
          }" layout="fill"></amp-img>`;
        } else if (column.type == VALUE_TYPE_BYTES) {
          value = `${(item[column.key] / 1000).toFixed(2)}KB`;
        } else if (
          column.type == VALUE_TYPE_MS ||
          column.type == VALUE_TYPE_TIMESPAN_MS
        ) {
          value = `${item[column.key].toFixed(2)}ms`;
        } else if (column.type == VALUE_TYPE_URL) {
          value = `<a href="${
            item[column.key]
          }" target="_blank" rel="noopener">${item[column.key]}</a>`;
        } else {
          try {
            value = snarkdown(item[column.key]);
          } catch (e) {
            console.log(`Invalid detail value ${item[column.key]}`);
          }
        }

        details += `<td class="${column.type}">${value}</td>`;
      }
      details += '</tr>';
    }

    this.detailsTable.innerHTML = details;
  }

  renderTags() {
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
    this.expanded = !this.expanded;
  }

  onClickNext() {
    this.expanded = false;
    this.next.expanded = true;
  }
}
