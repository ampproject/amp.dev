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

const classNameMapping = {
  error: 'fail',
  success: 'pass',
};

export default class SatusIntroView {
  constructor(doc) {
    this.container = doc.getElementById('status-intro');
    this.banner = this.container.querySelector('#status-intro-banner');
    this.bannerTitle = this.banner.querySelector('h3');
    this.bannerText = this.banner.querySelector('p');

    this.shareTextarea = this.container.querySelector('#share-textarea');
  }

  /**
   * Load and render banner with the given id
   * @param  {array} errors List of errors occurred in the checks
   */
  async render(statusBannerId, pageUrl) {
    const statusBanner = i18n.getStatusBanner(statusBannerId);
    const shareUrl = new URL(await AMP.getState('pixi.baseUrl'));
    shareUrl.searchParams.set('url', pageUrl);
    AMP.setState({pixi: {shareUrl: shareUrl.toString()}});

    this.container.classList.add(classNameMapping[statusBanner.type]);
    this.bannerTitle.textContent = statusBanner.title;
    this.bannerText.innerHTML = marked(statusBanner.body);
  }
}
