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
  fast: 'fast',
  average: 'average',
  slow: 'slow',
};

class WeightedScale {
  constructor(container) {
    this.container = container;
    this.bars = container.querySelectorAll('.ap-a-pixi-scale-chart-bar');
    this.indicator = container.querySelector(
      '.ap-a-pixi-scale-chart-indicator'
    );
  }

  render(data, unit) {
    const score = Math.min(
      100,
      (data.numericValue / data.proportion.slow) * 100
    );
    this.indicator.style.left = `${Math.round(score)}%`;
    const value = data.numericValue / unit.conversion;
    this.indicator.textContent = `${
      value === 0 ? value.toFixed(0) : value.toFixed(unit.digits)
    } ${unit.name}`;

    this.resetStyles();
    this.indicator.classList.add(data.category.toLowerCase());
    if (score < 40) {
      this.indicator.classList.add('inversed');
    } else if (score === 100) {
      this.indicator.classList.add('max');
    }

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

  resetStyles() {
    this.indicator.classList.remove(...Object.keys(CATEGORIES));
    this.indicator.classList.remove('inversed');
    this.indicator.classList.remove('max');
  }
}

class SimpleScale {
  constructor(container) {
    this.container = container;
    this.bar = container.querySelector('.ap-a-pixi-scale-chart-bar');
    this.label = this.bar.querySelector('span');
  }

  render(data) {
    this.percentile = Math.round(data.proportion * 100);
    this.bar.style.width = `${this.percentile}%`;
    this.label.textContent = `${this.percentile}% ${i18n.getText(
      'status.passedAddition'
    )}`;
    if (this.percentile < 30) {
      this.bar.classList.add('inversed');
    } else if (this.percentile > 70) {
      this.bar.classList.remove('inversed');
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

    this.performanceCategory = null;
    this.category = this.container.querySelector(
      '.ap-m-pixi-primary-metric-category'
    );
    this.score = this.container.querySelector(
      '.ap-m-pixi-primary-metric-score'
    );
    this.secondaryScore = this.container.querySelector(
      '.ap-m-pixi-primary-metric-secondary-score'
    );
    this.recommendations = this.container.querySelector(
      '.ap-m-pixi-primary-metric-recommendations'
    );
    this.defaultHref = this.recommendations.getAttribute('href');
    this.recommendations.removeAttribute('href');
  }

  render(metric, cacheMetric) {
    const {data, unit} = metric;

    this.scale.render(data, unit);

    this.performanceCategory = data.category.toLowerCase();
    const displayCategory = i18n.getText(
      `categories.${this.performanceCategory}`
    );
    this.container.classList.add(this.performanceCategory);
    this.category.textContent = displayCategory;

    const value = data.numericValue / unit.conversion;
    const score = value === 0 ? value.toFixed(0) : value.toFixed(unit.digits);
    this.score.textContent = `${score} ${unit.name}`;

    if (this.scale.percentile !== undefined) {
      this.secondaryScore.textContent = `${this.scale.percentile}%`;
    } else if (
      !cacheMetric ||
      !cacheMetric.data ||
      cacheMetric.data.improvement == undefined
    ) {
      this.secondaryScore.textContent = '---';
    } else if (cacheMetric.data.improvement === 0) {
      this.secondaryScore.textContent = i18n.getText('status.none');
    } else if (!Number.isNaN(cacheMetric.data.improvement)) {
      const improvement = (
        cacheMetric.data.improvement / unit.conversion
      ).toFixed(unit.digits);
      this.secondaryScore.textContent = `${improvement} ${unit.name}`;
    } else {
      this.secondaryScore.textContent = '---';
    }
    this.toggleLoading(false);
  }

  renderError(errorClass) {
    this.container.parentNode.classList.add('error');
    this.container.parentNode.classList.add(errorClass);
  }

  setRecommendationStatus(count, issueUrl) {
    this.recommendations.parentNode.classList.remove('loading');

    if (!count) {
      if (this.performanceCategory === CATEGORIES.fast) {
        this.recommendations.innerHTML = i18n.getText('status.nothingToDo');
        return;
      }
      this.recommendations.setAttribute('href', issueUrl);
      this.recommendations.setAttribute('target', '_blank');
      this.recommendations.textContent = i18n.getText('status.fileAnIssue');
      return;
    }
    this.recommendations.setAttribute('href', this.defaultHref);
    if (count === 1) {
      this.recommendations.textContent = `${count} ${i18n.getText(
        'status.recommendation'
      )}`;
    } else {
      this.recommendations.textContent = `${count} ${i18n.getText(
        'status.recommendations'
      )}`;
    }
  }

  reset() {
    this.container.parentNode.classList.remove('error');
    this.container.classList.remove(...Object.keys(CATEGORIES));
    this.category.textContent = i18n.getText('status.analyzing');
    this.score.textContent = i18n.getText('status.analyzing');
    this.secondaryScore.textContent = i18n.getText('status.calculating');
    this.recommendations.textContent = i18n.getText('status.analyzing');
    this.recommendations.removeAttribute('href');
    this.recommendations.removeAttribute('target');
    this.recommendations.parentNode.classList.add('loading');

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
      this.tabs[i].setAttribute('aria-selected', i == index);
    }
  }

  render(report = {}, cacheReport = {}) {
    this.pristine = false;
    const results = this.getPageExperience(report);

    for (const coreWebVitalView of Object.values(this.coreWebVitalViews)) {
      const metric = this.getMetric(results, coreWebVitalView);
      if (report.error) {
        coreWebVitalView.renderError('api-error');
        continue;
      }

      if (!metric) {
        coreWebVitalView.renderError('missing-field-data');
        continue;
      }

      const cacheMetric = this.getMetric(
        this.getPageExperience(cacheReport),
        coreWebVitalView
      );
      coreWebVitalView.render(metric, cacheMetric);
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
