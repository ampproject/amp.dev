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

import i18n from './I18n.js';

export default class SatusIntroView {
  constructor(doc) {
    this.container = doc.getElementById('status-intro');
    this.banner = this.container.querySelector('#status-intro-banner');
    this.bannerTitle = this.banner.querySelector('h3');
    this.bannerText = this.banner.querySelector('p');

    this.shareTextarea = this.container.querySelector('#share-textarea');
  }

  /**
   * Check error array and render banner
   * @param  {array} errors List of errors occurred in the checks
   */
  render(errors, pageUrl) {
    AMP.setState({ pixi: { shareUrl: pageUrl }});

    if (!errors.length) {
      this.container.classList.add('pass');
      this.bannerTitle.textContent = i18n.translate(
        'Wow! Your AMP page has a great page experience!'
      );
      this.bannerText.textContent = i18n.translate(
        'This page creates a great page experience!'
      );
    } else {
      this.container.classList.add('fail');
      this.bannerTitle.textContent = i18n.translate(
        'Oops! Looks like something went wrong.'
      );
      this.bannerText.textContent = i18n.translate(
        "It seems like we weren't able to get reliable results. Please rerun the test."
      );
    }
  }
}
