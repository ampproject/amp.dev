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

// TODO: Fetch instead
import data from '../../../index.json';

export default class RecommendationsView {
  constructor(doc) {
    this.container = doc.getElementById('recommendations');
    this.template = this.container.querySelector(
      '.ap-m-pixi-recommendations-item'
    );
    this.tag = this.container.querySelector('span');
  }

  render(recommendationIds) {
    console.log('recommendationIds', recommendationIds);

    for (const id of recommendationIds) {
      const value = data.recommendations[id];

      const recommendation = this.template.cloneNode(true);
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
      recommendation.id = `recommendation-${id}`;

      header.setAttribute(
        'on',
        `tap:recommendation-${id}.toggleClass(class=expanded)`
      );

      title.innerHTML = marked(value.title);
      body.innerHTML = marked(value.body);

      for (const tagId of value.tags) {
        const tag = this.tag.cloneNode(true);
        tag.textContent = data.staticText.tags[tagId];
        tagsBar.appendChild(tag);
      }

      this.container.appendChild(recommendation);
    }
  }
}
