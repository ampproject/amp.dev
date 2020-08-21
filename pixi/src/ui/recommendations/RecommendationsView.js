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

export default class RecommendationsView {
  constructor(doc) {
    this.container = doc.getElementById('recommendations');
    this.item = this.container.querySelector('.ap-m-pixi-recommendation');
  }

  render(reports) {
    for (const report of reports) {
      const recommendation = this.item.cloneNode(true);
      recommendation.style = null;
      recommendation.id = `recommendation-${report.id}`;

      recommendation
        .querySelector('header')
        .setAttribute(
          'on',
          `tap:recommendation-${report.id}.toggleClass(class=expanded)`
        );
      recommendation.querySelector('h3').textContent = report.title;
      recommendation.querySelector('p').innerHTML = marked(report.description);

      this.container.appendChild(recommendation);
    }
  }
}
