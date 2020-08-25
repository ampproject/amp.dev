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

export default class SatusBannerView {
  constructor(doc) {
    this.banner = doc.getElementById('status-banner');
    this.bannerTitle = this.banner.querySelector('h3');
    this.bannerText = this.banner.querySelector('p');
  }

  /**
   * Check error array and render banner
   * @param  {array} errors List of errors occurred in the checks
   */
  render(errors) {
    if (!errors.length) {
      this.banner.classList.add('pass');
      this.bannerTitle.textContent =
        'Wow! Your AMP page has a great page experience!';
      this.bannerText.textContent =
        'This page creates a great page experience!';
    } else {
      this.banner.classList.add('fail');
      this.bannerTitle.textContent = 'Oops! Looks like something went wrong.';
      this.bannerText.textContent =
        "It seems like we weren't able to get reliable results. Please rerun the test.";
    }
  }
}
