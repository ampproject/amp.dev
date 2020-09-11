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

const CATEGORIES = {
  fast: 'Good',
  average: 'Needs Improvement',
  slow: 'Poor',
};

class WeightedScale {
  constructor(container) {
    this.container = container;
    this.bars = container.querySelectorAll('.ap-a-pixi-scale-chart-bar');
    this.pitch = container.querySelector('.ap-a-pixi-scale-chart-pitch');
  }

  render(data, unit) {
    this.pitch.style.left = `${Math.min(
      100,
      (data.numericValue / data.proportion.slow) * 100
    )}%`;
    this.pitch.textContent = `${(data.numericValue / unit.conversion).toFixed(
      unit.digits
    )} ${unit.name}`;

    for (const bar of this.bars) {
      const label = bar.querySelector('span');
      const type = bar.getAttribute('data-type');
      const percent = Math.round(
        (data.proportion[type] / data.proportion.slow) * 100
      );

      bar.style.width = `${percent}%`;
      label.textContent = `${
        data.proportion[type] / unit.conversion.toFixed(unit.digits)
      } ${unit.name}`;
    }
  }
}

class SimpleScale {
  constructor(container) {
    this.container = container;
    this.bar = container.querySelector('.ap-a-pixi-scale-chart-bar');
    this.label = this.bar.querySelector('span');
    this.pitch = container.querySelector('aside');
  }

  render(data) {
    const percentile = Math.round(data.proportion * 100);

    this.bar.style.width = `${percentile}%`;
    this.label.textContent = `${percentile}% passed`;
    if (percentile < 30) {
      this.bar.classList.add('inversed');
    }
  }
}

class CoreWebVitalView {
  constructor(container) {
    this.container = container;
    this.type = container.id.split('.')[0];
    this.metric = container.id.split('.')[1];

    if (this.type == 'fieldData') {
      this.scale = new SimpleScale(container);
    } else {
      this.scale = new WeightedScale(container);
    }

    this.category = this.container.querySelector(
      '.ap-m-pixi-primary-metric-category'
    );
    this.score = this.container.querySelector(
      '.ap-m-pixi-primary-metric-score'
    );
    this.improvement = this.container.querySelector(
      '.ap-m-pixi-primary-metric-improvement'
    );
    this.recommendations = this.container.querySelector(
      '.ap-m-pixi-primary-metric-recommendations'
    );
  }

  render(metric, cacheMetric) {
    const {data, unit} = metric;

    this.scale.render(data, unit);

    const responseCategory = data.category.toLowerCase();
    const displayCategory = CATEGORIES[responseCategory];
    this.container.classList.add(responseCategory);
    this.category.textContent = displayCategory;

    const score = (data.numericValue / unit.conversion).toFixed(unit.digits);
    this.score.textContent = `${score} ${unit.name}`;

    if (
      !cacheMetric ||
      !cacheMetric.data ||
      cacheMetric.data.improvement == undefined
    ) {
      this.improvement.textContent = '---';
    } else if (cacheMetric.data.improvement === 0) {
      this.improvement.textContent = 'None';
    } else if (!Number.isNaN(cacheMetric.data.improvement)) {
      const improvement = (
        cacheMetric.data.improvement / unit.conversion
      ).toFixed(unit.digits);
      this.improvement.textContent = `${improvement} ${unit.name}`;
    } else {
      this.improvement.textContent = '---';
    }
    this.toggleLoading(false);
  }

  setRecommendations(text) {
    this.recommendations.textContent = text;
  }

  setHasStatus(force) {
    this.container.classList.toggle('has-status', force);
  }

  reset() {
    this.container.classList.remove(...Object.values(CATEGORIES));
    this.category.textContent = i18n.translate('Analyzing');
    this.score.textContent = i18n.translate('Analyzing');
    this.improvement.textContent = i18n.translate('Calculating');
    this.recommendations.textContent = i18n.translate('Analyzing');

    this.toggleLoading(true);
  }

  toggleLoading(force) {
    this.container.classList.toggle('loading', force);
  }
}

export default class CoreWebVitalsReportView {
  constructor(doc, id) {
    this.container = document.getElementById(id);
    this.pristine = true;

    this.coreWebVitalViews = {};
    // Initialize views before running the check to be able
    // to toggle the loading state
    for (const coreWebVitalsContainer of document.querySelectorAll(
      '.ap-m-pixi-primary-metric'
    )) {
      this.coreWebVitalViews[coreWebVitalsContainer.id] =
        this.coreWebVitalViews[coreWebVitalsContainer.id] ||
        new CoreWebVitalView(coreWebVitalsContainer);

      this.coreWebVitalViews[coreWebVitalsContainer.id].toggleLoading(true);
    }

    this.tabs = document.querySelectorAll('.ap-o-pixi-primary-checks-tabs-tab');
    this.tabContents = document.querySelectorAll(
      '.ap-o-pixi-primary-checks-data'
    );
    for (let i = 0; i < this.tabContents.length; i++) {
      this.tabs[i].addEventListener('click', () => {
        this.onClickTab(i);
      });
    }
  }

  onClickTab(index) {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].classList.toggle('active', i == index);
      this.tabContents[i].classList.toggle('active', i == index);
    }
  }

  render(report = {}, cacheReport = {}) {
    this.pristine = false;
    const results = this.getPageExperience(report);

    for (const coreWebVitalView of Object.values(this.coreWebVitalViews)) {
      const metric = this.getMetric(results, coreWebVitalView);
      if (metric) {
        const cacheMetric = this.getMetric(
          this.getPageExperience(cacheReport),
          coreWebVitalView
        );
        coreWebVitalView.render(metric, cacheMetric);
        continue;
      }

      // TODO: show no data
    }

    this.toggleLoading(false);
  }

  getPageExperience(result) {
    if (result && result.data) {
      return result.data.pageExperience;
    }
    return null;
  }

  getMetric(pageExperience, coreWebVitalView) {
    if (!pageExperience) {
      return null;
    }
    const type = pageExperience[coreWebVitalView.type];
    if (!type) {
      return null;
    }
    return type[coreWebVitalView.metric];
  }

  reset() {
    if (this.pristine) {
      return;
    }

    for (const coreWebVitalView of Object.values(this.coreWebVitalViews)) {
      coreWebVitalView.reset();
    }
  }

  toggleLoading(force) {
    for (const coreWebVitalView of Object.values(this.coreWebVitalViews)) {
      coreWebVitalView.toggleLoading(force);
    }
  }
}
