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

export default class RecommendationsView {
  constructor(doc) {
    this.container = doc.getElementById('recommendations');
    this.item = this.container.querySelector('h3');
  }

  render(reports) {
    for (const report of reports) {
      console.log(report);
      const node = this.item.cloneNode(true);
      this.container.appendChild(node);
    }
  }
}
