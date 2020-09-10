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
import i18n from './I18n';
import {fixedRecommendations} from '../checkAggregation/recommendations';

const classNameMapping = {
  error: 'fail',
  success: 'pass',
};

export default class StatusIntroView {
  constructor(doc, totalChecks) {
    this.container = doc.getElementById('status-intro');
    this.bannerLoading = this.container.querySelector(
      '#status-intro-banner-loading'
    );
    this.finishedChecks = this.bannerLoading.querySelector('#finished-checks');
    this.totalChecks = this.bannerLoading.querySelector('#total-checks');
    if (this.totalChecks) {
      this.totalChecks.innerHTML = totalChecks;
    }
  }

  resetView() {
    this.container.classList.remove('loading');
    this.container.classList.remove(classNameMapping.error);
    this.container.classList.remove(classNameMapping.success);
    this.bannerLoading.classList.remove('pristine');
    const banner = this.container.querySelector('#status-intro-banner');
    if (banner) {
      this.container.removeChild(banner);
    }
    if (this.totalChecks) {
      this.finishedChecks.innerHTML = '0';
    }
  }

  /**
   * Load and render banner with the given id
   * @param {statusBannerIdPromise} The promise for the banner id.
   * @param {recommendationIdsPromise} The promise for the recommendations.
   * @param {pageUrl} The URL of the checked page to be used in the share dialog.
   */
  async render(statusBannerIdPromise, recommendationIdsPromise, pageUrl) {
    this.resetView();
    this.container.classList.add('loading');
    let hideFixButton = true;
    recommendationIdsPromise.then((ids) => {
      hideFixButton = ids.length <= fixedRecommendations;
    });

    const statusBannerId = await this.determineBannerId(statusBannerIdPromise);
    const statusBanner = i18n.getStatusBanner(statusBannerId);
    const shareUrl = new URL(await AMP.getState('pixi.baseUrl'));
    shareUrl.searchParams.set('url', pageUrl);
    AMP.setState({pixi: {shareUrl: shareUrl.toString()}});

    this.finishedChecks = null;
    this.container.classList.remove('loading');
    this.container.classList.add(classNameMapping[statusBanner.type]);

    const banner = this.bannerLoading.cloneNode(true);
    banner.id = 'status-intro-banner';
    const bannerTitle = banner.querySelector('h3');
    const bannerText = banner.querySelector('p');
    bannerTitle.textContent = statusBanner.title;
    bannerText.innerHTML = marked(statusBanner.body);

    const buttons = banner.querySelectorAll('button');
    if (hideFixButton) {
      buttons[0].classList.add('pristine');
      // make second button primary
      buttons[1].classList.remove('ap-a-btn-light');
    }
    if (statusBanner.hideShare) {
      buttons[1].classList.add('pristine');
    }

    this.bannerLoading.classList.add('pristine');
    this.container.appendChild(banner);
  }

  async determineBannerId(statusBannerIdPromise) {
    try {
      return await statusBannerIdPromise;
    } catch (err) {
      return 'api-error';
    }
  }

  increaseFinishedChecks(amount) {
    if (this.finishedChecks) {
      this.finishedChecks.innerHTML =
        Number.parseInt(this.finishedChecks.innerHTML) + amount;
    }
  }
}
