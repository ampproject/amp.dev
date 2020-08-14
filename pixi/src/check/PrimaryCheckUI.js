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

import {UNIT_DEC, UNIT_SEC, UNIT_MS} from './constants.js';

export default class PrimaryCheckUI {
  constructor(check) {
    const {id, unit} = check;
    this.unit = unit;

    this.container = document.getElementById(id);
    this.label = this.container.querySelector('label');
    this.indicator = this.container.querySelector('aside');
    this.indicatorLabel = this.indicator.querySelector('span');
  }

  render(result) {
    this.container.classList.add(result.category.toLowerCase());
    this.label.textContent = result.category;

    const indicatorX = result.percentile / result.distributions[2].min;
    this.indicator.style.transform = `translateX(${indicatorX * 100}%)`;
    this.indicatorLabel.textContent = `${result.percentile / this.unit.conversion} ${this.unit.name}`;
  }
}
