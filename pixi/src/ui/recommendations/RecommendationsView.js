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

import marked from 'marked';
import i18n from '../I18n.js';

export default class RecommendationsView {
  constructor(doc) {
    this.container = doc.getElementById('recommendations');

    this.filter = this.container.querySelector(
      '.ap-o-pixi-recommendations-filter'
    );
    this.pill = this.filter.querySelector('.ap-a-pill');

    this.recommendation = this.container.querySelector(
      '.ap-m-pixi-recommendations-item'
    );
    this.tag = this.recommendation.querySelector('span');
  }

  resetView() {
    this.container.classList.add('pristine');
    const items = this.container.querySelectorAll(
      '.ap-m-pixi-recommendations-item'
    );
    for (let i = 1; i < items.length; i++) {
      this.container.removeChild(items[i]);
    }

    const length = this.filter.children.length;
    for (let i = 1; i < length; i++) {
      this.filter.removeChild(this.filter.lastChild);
    }
  }

  render(recommendationList, metricUis) {
    this.container.classList.remove('pristine');
    const recommendations = i18n.getSortedRecommendations(recommendationList);
    const tagIdCounts = {};

    this.recommendationNodes = [];
    this.filterPills = [];

    for (const value of recommendations) {
      const recommendation = this.recommendation.cloneNode(true);
      const header = recommendation.querySelector(
        '.ap-m-pixi-recommendations-item-header'
      );
      const title = recommendation.querySelector(
        '.ap-m-pixi-recommendations-item-header-title'
      );
      const body = recommendation.querySelector(
        '.ap-m-pixi-recommendations-item-body'
      );
      const tagsBar = recommendation.querySelector(
        '.ap-m-pixi-recommendations-item-tags'
      );

      recommendation.style = null;
      recommendation.id = `recommendation-${value.id}`;
      header.id = `header-${value.id}`;
      body.id = `body-${value.id}`;

      header.addEventListener('click', () => {
        const isExpanded = recommendation.classList.toggle('expanded');
        header.setAttribute('aria-expanded', String(isExpanded));
      });
      header.setAttribute('aria-controls', body.id);
      body.setAttribute('aria-labelledby', header.id);

      title.innerHTML = marked(value.title);
      body.innerHTML = marked(value.body);

      for (const tagId of value.tags) {
        const tag = this.tag.cloneNode(true);
        recommendation.classList.add(tagId);
        tag.textContent = i18n.getText(`tags.${tagId}`);
        tagsBar.appendChild(tag);
        const count = tagIdCounts[tagId] || 0;
        tagIdCounts[tagId] = count + 1;
      }

      this.recommendationNodes.push(recommendation);
      this.container.appendChild(recommendation);
    }

    for (const tagId of Object.keys(tagIdCounts)) {
      const pill = this.pill.cloneNode(true);
      pill.textContent = i18n.getText(`tags.${tagId}`);
      pill.id = `filter-pill-${tagId}`;
      pill.className = 'ap-a-pill';

      pill.addEventListener('click', () => {
        this.toggleFilter(tagId);
      });

      this.filterPills.push(pill);
      this.filter.appendChild(pill);
    }

    for (const key of Object.keys(metricUis)) {
      const metricUi = metricUis[key];
      const metricToUse = metricUi.metric === 'tbt' ? 'fid' : metricUi.metric;
      const count = tagIdCounts[metricToUse];
      metricUi.setRecommendationStatus(count);
    }

    this.pill.classList.add('filtered');
    this.pill.addEventListener('click', () => {
      this.resetFilter();
    });
  }

  resetFilter() {
    this.pill.classList.add('filtered');
    this.container.className = this.container.className.split(' ')[0];

    for (const pill of this.filterPills) {
      pill.classList.remove('filtered');
      for (const recommendation of this.recommendationNodes) {
        recommendation.hidden = false;
      }
    }
  }

  toggleFilter(tagId) {
    this.container.classList.toggle(tagId);
    this.pill.classList.remove('filtered');
    const pill = this.container.querySelector(`#filter-pill-${tagId}`);
    pill.classList.toggle('filtered');

    const activeFilter = this.container.className.split(' ');
    if (activeFilter.length == 1) {
      this.resetFilter();
      return;
    }

    for (const recommendation of this.recommendationNodes) {
      const commonValues = activeFilter.filter((value) => {
        return recommendation.classList.contains(value);
      });

      recommendation.hidden = !commonValues.length;
    }
  }
}
