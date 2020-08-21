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

export default class CoreWebVitalsReport {
  constructor(container) {
    this.container = container;
    this.label = this.container.querySelector('label');

    this.scale = {
      bar: {
        positive: this.container.querySelector('.ap-a-pixi-scale-bar-positive'),
        negative: this.container.querySelector('.ap-a-pixi-scale-bar-negative'),
      },
      pitch: {
        positive: this.container.querySelector('.ap-a-pixi-scale-pitch-line-positive'),
        negative: this.container.querySelector('.ap-a-pixi-scale-pitch-line-negative')
      },
      indicator: this.container.querySelector('.ap-a-pixi-scale-indicator'),
      value: this.container.querySelector('.ap-a-pixi-scale-value'),
    }
  }

  render(report) {
    const unit = report.unit;
    const data = report.data;

    // Update bar to match distributions
    this.scale.bar.positive.style.transform = `scale3d(${ data.distributions[0].proportion}, 1, 1)`;
    this.scale.bar.negative.style.transform = `scale3d(${ data.distributions[2].proportion}, 1, 1)`;

    // Update pitch lines
    this.scale.pitch.positive.style.transform = `translateX(${data.distributions[0].proportion * 100}%)`;
    this.scale.pitch.positive.textContent = `${data.distributions[0].max / unit.conversion}${unit.name}`;

    this.scale.pitch.negative.style.transform = `translateX(${100 - data.distributions[2].proportion * 100}%)`;
    this.scale.pitch.negative.textContent = `${data.distributions[2].min / unit.conversion}${unit.name}`;

    // Add a value to the scale and position in distributions
    this.scale.value.textContent = `${data.percentile / unit.conversion}${unit.name}`;
    let distributionOffset = 0;
    for (const distribution of data.distributions) {
      if (data.percentile < distribution.max) {
        this.scale.value.style.width = `${data.percentile / distribution.max * 100}%`;
        break;
      }

      distributionOffset += distribution.proportion * 100;
    }
    this.scale.indicator.style.marginLeft = `${distributionOffset}%`;

    this.container.classList.add(data.category.toLowerCase());
    this.label.textContent = data.category;

    this.toggleLoading(false);
  }

  toggleLoading(force) {
    this.container.classList.toggle('loading', force);
  }
}
